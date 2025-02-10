// src/controllers/authController.js
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const crypto = require('crypto');

const saltRounds = 10;

/**
 * Public Registration Endpoint for Clients
 * - Automatically assigns the CLIENT role.
 * - If registering as a company (is_company === true), then:
 *     • The fields company_name and company_tax_number are required.
 *     • is_approved is automatically set to false until an admin approves the account.
 */
exports.registerClient = async (req, res, next) => {
  // Validate incoming data using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract required fields; force role = "CLIENT"
  const { email, password, is_company, first_name, last_name, company_name, company_tax_number } = req.body;
  const role = "CLIENT";

  try {
    // Check if a user with this email already exists
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // If the client registers as a company, require company fields and set is_approved to false.
    if (is_company) {
      if (!company_name || !company_tax_number) {
        return res.status(400).json({ message: 'Company name and tax number are required for company registration.' });
      }
    }
    const approved = is_company ? false : true;

    // Insert the new client into the database (including company details if applicable)
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

/**
 * Privileged Registration Endpoint for Admin/Employee Users
 * - This endpoint is hidden behind a secret URL.
 * - It allows specifying the role (ADMIN or EMPLOYEE).
 */
exports.registerPrivileged = async (req, res, next) => {
  // Validate incoming data using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract fields; the caller can specify the role (ADMIN or EMPLOYEE)
  const { email, password, role, is_company, first_name, last_name, company_name, company_tax_number } = req.body;
  
  try {
    // Check if a user with this email already exists
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // For privileged accounts, mark them as approved by default.
    const approved = true;

    // Insert the new privileged user into the database.
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

/**
 * Login Endpoint
 * Authenticates a user by email and password, then issues a JWT.
 */
exports.login = async (req, res, next) => {
  // Validate login input
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { email, password } = req.body;

  try {
    // Look up the user by email
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Remove the password field from the user object before signing the token
    delete user.password;

    // Create a JWT token valid for 1 hour
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

/**
 * Request Password Reset Endpoint
 * Clients provide their email, and a secure reset token is generated and stored.
 * (For demo purposes, the token is returned in the API response.)
 */
exports.requestPasswordReset = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.body;
  try {
    // Look up the user by email
    const [rows] = await pool.query('SELECT * FROM `user` WHERE email = ?', [email]);
    if (rows.length === 0) {
      // Do not reveal that the email doesn't exist
      return res.status(200).json({ message: 'If the email exists, a password reset token has been sent.' });
    }
    const user = rows[0];
    // Generate a secure token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Set token to expire in 1 hour
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now
    // Store the token in the password_reset table
    await pool.query(
      'INSERT INTO `password_reset` (user_id, reset_token, expires_at) VALUES (?, ?, ?)',
      [user.user_id, resetToken, expiresAt]
    );
    // For demonstration, return the token. In production, email the token.
    res.status(200).json({ message: 'Password reset token generated.', resetToken });
  } catch (err) {
    next(err);
  }
};

/**
 * Reset Password Endpoint
 * Clients provide the reset token and a new password. The token is verified,
 * and if valid, the user's password is updated.
 */
exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { resetToken, newPassword } = req.body;
  try {
    // Look up the reset token in the password_reset table
    const [rows] = await pool.query('SELECT * FROM `password_reset` WHERE reset_token = ?', [resetToken]);
    if (rows.length === 0) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }
    const resetEntry = rows[0];
    // Check if the token has expired
    if (new Date(resetEntry.expires_at) < new Date()) {
      return res.status(400).json({ message: 'Reset token has expired.' });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    // Update the user's password
    await pool.query('UPDATE `user` SET password = ? WHERE user_id = ?', [hashedPassword, resetEntry.user_id]);
    // Invalidate the token by deleting its record
    await pool.query('DELETE FROM `password_reset` WHERE reset_id = ?', [resetEntry.reset_id]);
    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * Update Password Endpoint
 * Allows an authenticated client to change his/her password
 * by providing the old password and a new password.
 */
exports.updatePassword = async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  // The route is protected, so we expect req.user to be populated by the authentication middleware.
  const userId = req.user.user_id;
  const { oldPassword, newPassword } = req.body;
  
  try {
    // Retrieve the current user's password hash from the database
    const [rows] = await pool.query('SELECT * FROM `user` WHERE user_id = ?', [userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const user = rows[0];
    
    // Compare the provided old password with the stored hash
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Old password is incorrect.' });
    }
    
    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update the user's password in the database
    await pool.query('UPDATE `user` SET password = ? WHERE user_id = ?', [hashedNewPassword, userId]);
    
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
};
