// src/controllers/financeController.js
const pool = require('../config/db');
const { validationResult } = require('express-validator');

/**
 * Create a new finance record (record a transaction).
 */
exports.recordTransaction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { order_id, transaction_type, amount, description, saved_by } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO finance (order_id, transaction_type, amount, description, saved_by) VALUES (?, ?, ?, ?, ?)',
      [order_id || null, transaction_type, amount, description, saved_by || null]
    );
    res.status(201).json({ message: 'Transaction recorded', transactionId: result.insertId });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all finance records.
 */
exports.getFinanceRecords = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM finance');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

/**
 * Update an existing finance record.
 */
exports.updateFinanceRecord = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { order_id, transaction_type, amount, description, saved_by } = req.body;
  try {
    await pool.query(
      'UPDATE finance SET order_id = ?, transaction_type = ?, amount = ?, description = ?, saved_by = ? WHERE finance_id = ?',
      [order_id || null, transaction_type, amount, description, saved_by || null, id]
    );
    res.json({ message: 'Finance record updated successfully' });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a finance record.
 */
exports.deleteFinanceRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM finance WHERE finance_id = ?', [id]);
    res.json({ message: 'Finance record deleted successfully' });
  } catch (err) {
    next(err);
  }
};
