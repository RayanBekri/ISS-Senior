// src/controllers/itemController.js
const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.getItems = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM item');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createItem = async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, description, price } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO item (name, description, price) VALUES (?, ?, ?)',
      [name, description, price]
    );
    res.status(201).json({ message: 'Item created', itemId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    await pool.query(
      'UPDATE item SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description, price, id]
    );
    res.json({ message: 'Item updated' });
  } catch (err) {
    next(err);
  }
};

exports.deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM item WHERE id = ?', [id]);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};
