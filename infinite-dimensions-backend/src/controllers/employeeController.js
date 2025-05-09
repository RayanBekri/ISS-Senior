// src/controllers/employeeController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const saltRounds = 10;

/**
 * GET /employees
 * Admin only: list all employees with their CIN
 */
exports.getEmployees = async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         u.user_id,
         u.email,
         u.first_name,
         u.last_name,
         u.created_at,
         u.updated_at,
         ec.cin
       FROM \`user\` u
       LEFT JOIN employee_cin ec ON u.user_id = ec.user_id
       WHERE u.role = 'EMPLOYEE'`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * GET /employees/:id
 * Admin only: get one employee by id (with CIN)
 */
exports.getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [[user]] = await pool.query(
      `SELECT 
         u.user_id,
         u.email,
         u.first_name,
         u.last_name,
         u.created_at,
         u.updated_at,
         ec.cin
       FROM \`user\` u
       LEFT JOIN employee_cin ec ON u.user_id = ec.user_id
       WHERE u.role = 'EMPLOYEE' AND u.user_id = ?`,
      [id]
    );
    if (!user) return res.status(404).json({ message: 'Employee not found' });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /employees
 * Admin only: create a new employee, hash password, store CIN
 * Expected body: { email, password, first_name, last_name, cin }
 */
exports.createEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { email, password, first_name, last_name, cin } = req.body;
  try {
    // ensure no duplicate
    const [existing] = await pool.query(
      'SELECT 1 FROM `user` WHERE email = ?',
      [email]
    );
    if (existing.length)
      return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, saltRounds);

    // 1) insert into user table
    const [result] = await pool.query(
      `INSERT INTO \`user\`
         (email, password, role, is_company, is_approved, first_name, last_name)
       VALUES (?, ?, 'EMPLOYEE', false, true, ?, ?)`,
      [email, hashed, first_name, last_name]
    );
    const userId = result.insertId;

    // 2) insert CIN
    await pool.query(
      `INSERT INTO employee_cin (user_id, cin) VALUES (?, ?)`,
      [userId, cin]
    );

    res.status(201).json({
      message: 'Employee created',
      user_id: userId
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /employees/:id
 * Admin only: update user info and CIN
 * Expected body may include any of: { email, password, first_name, last_name, cin }
 */
exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const { email, password, first_name, last_name, cin } = req.body;
  try {
    // 1) optionally update user fields
    const fields = [];
    const values = [];
    if (email) {
      fields.push('email = ?');
      values.push(email);
    }
    if (password) {
      const hashed = await bcrypt.hash(password, saltRounds);
      fields.push('password = ?');
      values.push(hashed);
    }
    if (first_name) {
      fields.push('first_name = ?');
      values.push(first_name);
    }
    if (last_name) {
      fields.push('last_name = ?');
      values.push(last_name);
    }
    if (fields.length) {
      values.push(id);
      await pool.query(
        `UPDATE \`user\` SET ${fields.join(', ')} WHERE user_id = ? AND role = 'EMPLOYEE'`,
        values
      );
    }

    // 2) upsert CIN in employee_cin
    if (cin !== undefined) {
      // try update
      const [upd] = await pool.query(
        'UPDATE employee_cin SET cin = ? WHERE user_id = ?',
        [cin, id]
      );
      if (upd.affectedRows === 0) {
        // insert if none existed
        await pool.query(
          'INSERT INTO employee_cin (user_id, cin) VALUES (?, ?)',
          [id, cin]
        );
      }
    }

    res.json({ message: 'Employee updated' });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /employees/:id
 * Admin only: delete employee (and their CIN via cascade)
 */
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query(
      'DELETE FROM `user` WHERE user_id = ? AND role = \'EMPLOYEE\'',
      [id]
    );
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    next(err);
  }
};
