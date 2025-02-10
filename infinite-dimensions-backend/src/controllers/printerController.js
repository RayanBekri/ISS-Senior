// src/controllers/printerController.js
const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.getPrinters = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM printers');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createPrinter = async (req, res, next) => {
  const { name, status, usage } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO printers (name, status, usage) VALUES (?, ?, ?)',
      [name, status || 'available', usage || 0]
    );
    res.status(201).json({ message: 'Printer created', printerId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.updatePrinter = async (req, res, next) => {
  const { id } = req.params;
  const { name, status, usage } = req.body;
  try {
    await pool.query(
      'UPDATE printers SET name = ?, status = ?, usage = ? WHERE id = ?',
      [name, status, usage, id]
    );
    res.json({ message: 'Printer updated' });
  } catch (err) {
    next(err);
  }
};

exports.deletePrinter = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM printers WHERE id = ?', [id]);
    res.json({ message: 'Printer deleted' });
  } catch (err) {
    next(err);
  }
};
