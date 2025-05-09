const pool               = require('../config/db');
const jwt                = require('jsonwebtoken');
const bcrypt             = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto             = require('crypto');

const saltRounds = 10;

/**
 * Helper to throw 400 on validation errors
 */
function checkValidation(req, res) {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    res.status(400).json({ errors: errs.array() });
    return false;
  }
  return true;
}

async function registerClient(req, res, next) {
  if (!checkValidation(req, res)) return;

  const {
    email,
    password,
    is_company = false,
    first_name,
    last_name,
    company_name = null,
    company_tax_number = null
  } = req.body;

  try {
    const [exists] = await pool.query(
      'SELECT 1 FROM `user` WHERE email = ?', [email]
    );
    if (exists.length) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (is_company && (!company_name || !company_tax_number)) {
      return res.status(400).json({
        message: 'company_name and company_tax_number required for a company'
      });
    }

    const hashed   = await bcrypt.hash(password, saltRounds);
    const approved = !is_company ? 1 : 0;

    await pool.query(
      `INSERT INTO \`user\`
         (email,password,role,is_company,is_approved,
          first_name,last_name,company_name,company_tax_number)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        email,
        hashed,
        'CLIENT',
        is_company ? 1 : 0,
        approved,
        first_name,
        last_name,
        is_company ? company_name : null,
        is_company ? company_tax_number : null
      ]
    );

    res.status(201).json({
      message: approved
        ? 'Client registered successfully'
        : 'Company registration received; pending approval.'
    });
  } catch (err) {
    next(err);
  }
}

async function registerPrivileged(req, res, next) {
  if (!checkValidation(req, res)) return;

  const {
    email,
    password,
    role,
    is_company = false,
    first_name,
    last_name,
    company_name = null,
    company_tax_number = null
  } = req.body;

  try {
    const [exists] = await pool.query(
      'SELECT 1 FROM `user` WHERE email = ?', [email]
    );
    if (exists.length) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, saltRounds);

    await pool.query(
      `INSERT INTO \`user\`
         (email,password,role,is_company,is_approved,
          first_name,last_name,company_name,company_tax_number)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        email,
        hashed,
        role,
        is_company ? 1 : 0,
        1, // always approved
        first_name,
        last_name,
        is_company ? company_name : null,
        is_company ? company_tax_number : null
      ]
    );

    res.status(201).json({ message: 'Privileged user registered successfully' });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  if (!checkValidation(req, res)) return;

  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `user` WHERE email = ?', [email]
    );
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    if (user.role !== 'CLIENT') {
      return res
        .status(403)
        .json({ message: 'Please use the /login/staff endpoint for staff.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

async function loginStaff(req, res, next) {
  if (!checkValidation(req, res)) return;

  const { email, password } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `user` WHERE email = ?', [email]
    );
    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    if (!['ADMIN','EMPLOYEE'].includes(user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    next(err);
  }
}

async function requestPasswordReset(req, res, next) {
  if (!checkValidation(req, res)) return;

  const { email } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT user_id FROM `user` WHERE email = ?', [email]
    );
    if (!rows.length) {
      return res
        .status(200)
        .json({ message: 'If email exists, a token was sent.' });
    }

    const userId     = rows[0].user_id;
    const resetToken = crypto.randomBytes(20).toString('hex');
    const expiresAt  = new Date(Date.now() + 3600 * 1000);

    await pool.query(
      'INSERT INTO `password_reset` (user_id,reset_token,expires_at) VALUES (?,?,?)',
      [userId, resetToken, expiresAt]
    );

    res.json({ message: 'Reset token generated', resetToken });
  } catch (err) {
    next(err);
  }
}

async function resetPassword(req, res, next) {
  if (!checkValidation(req, res)) return;

  const { resetToken, newPassword } = req.body;
  try {
    const [rows] = await pool.query(
      'SELECT reset_id,user_id,expires_at FROM `password_reset` WHERE reset_token = ?',
      [resetToken]
    );
    if (!rows.length) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const { reset_id, user_id, expires_at } = rows[0];
    if (new Date(expires_at) < new Date()) {
      return res.status(400).json({ message: 'Token expired' });
    }

    const hashed = await bcrypt.hash(newPassword, saltRounds);
    await pool.query('UPDATE `user` SET password = ? WHERE user_id = ?', [
      hashed,
      user_id
    ]);
    await pool.query('DELETE FROM `password_reset` WHERE reset_id = ?', [
      reset_id
    ]);

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
}

async function updatePassword(req, res, next) {
  if (!checkValidation(req, res)) return;

  const userId      = req.user.user_id;
  const { oldPassword, newPassword } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT password FROM `user` WHERE user_id = ?', [userId]
    );
    if (!rows.length) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(oldPassword, rows[0].password);
    if (!match) {
      return res.status(400).json({ message: 'Wrong old password' });
    }

    const hashed = await bcrypt.hash(newPassword, saltRounds);
    await pool.query('UPDATE `user` SET password = ? WHERE user_id = ?', [
      hashed,
      userId
    ]);

    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
}

function me(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  res.json({ user: req.user, token });
}

async function getPendingCompanies(req, res, next) {
  try {
    const [rows] = await pool.query(
      'SELECT user_id,company_name,company_tax_number,created_at FROM `user` WHERE is_company = ? AND is_approved = ?',
      [1, 0]
    );
    res.json({ companies: rows });
  } catch (err) {
    next(err);
  }
}

async function updateCompanyApproval(req, res, next) {
  if (!checkValidation(req, res)) return;

  const userId = req.params.id;
  const { action } = req.body;

  try {
    if (action === 'accept') {
      await pool.query(
        'UPDATE `user` SET is_approved = ? WHERE user_id = ?',
        [1, userId]
      );
      res.json({ message: 'Company approved.' });
    } else {
      await pool.query(
        'UPDATE `user` SET is_company = ? WHERE user_id = ?',
        [0, userId]
      );
      res.json({ message: 'Company registration rejected.' });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  registerClient,
  registerPrivileged,
  login,
  loginStaff,
  requestPasswordReset,
  resetPassword,
  updatePassword,
  me,
  getPendingCompanies,
  updateCompanyApproval
};
