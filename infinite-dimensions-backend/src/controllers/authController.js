const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

const saltRounds = 10;

exports.registerClient = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, is_company, first_name, last_name, company_name, company_tax_number } = req.body;
  const role = "CLIENT";

  try {
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (is_company) {
      if (!company_name || !company_tax_number) {
        return res.status(400).json({ message: 'Company name and tax number are required for company registration.' });
      }
    }
    const approved = is_company ? false : true;

    await pool.query(
      'INSERT INTO `user` (email, password, role, is_company, is_approved, first_name, last_name, company_name, company_tax_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        email,
        hashedPassword,
        role,
        is_company || false,
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
        : 'Company registration received. Your account will be activated after admin approval.'
    });
  } catch (err) {
    next(err);
  }
};


exports.registerPrivileged = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, role, is_company, first_name, last_name, company_name, company_tax_number } = req.body;
  
  try {
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const approved = true;

    await pool.query(
      'INSERT INTO `user` (email, password, role, is_company, is_approved, first_name, last_name, company_name, company_tax_number) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        email,
        hashedPassword,
        role,
        is_company || false,
        approved,
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
};


exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];

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
};


exports.requestPasswordReset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(200).json({ message: 'If the email exists, a password reset token has been sent.' });
    }
    const user = rows[0];
    const resetToken = crypto.randomBytes(20).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); 
    await pool.query(
      'INSERT INTO `password_reset` (user_id, reset_token, expires_at) VALUES (?, ?, ?)',
      [user.user_id, resetToken, expiresAt]
    );
    res.status(200).json({ message: 'Password reset token generated.', resetToken });
  } catch (err) {
    next(err);
  }
};


exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { resetToken, newPassword } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM `password_reset` WHERE reset_token = ?', [resetToken]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }
    const resetEntry = rows[0];
    if (new Date(resetEntry.expires_at) < new Date()) {
      return res.status(400).json({ message: 'Reset token has expired.' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await pool.query('UPDATE `user` SET password = ? WHERE user_id = ?', [hashedPassword, resetEntry.user_id]);
    await pool.query('DELETE FROM `password_reset` WHERE reset_id = ?', [resetEntry.reset_id]);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  const userId = req.user.user_id;
  const { oldPassword, newPassword } = req.body;
  
  try {
    const [rows] = await pool.query('SELECT * FROM `user` WHERE user_id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const user = rows[0];
    
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }
    
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    
    await pool.query('UPDATE `user` SET password = ? WHERE user_id = ?', [hashedNewPassword, userId]);
    
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
};

exports.me = async (req, res, next) => {
  try {
    // The authentication middleware should have already added req.user
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    // Retrieve token from header
    const authHeader = req.headers.authorization;
    let token = "";
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    return res.status(200).json({ user: req.user, token });
  } catch (err) {
    next(err);
  }
};
