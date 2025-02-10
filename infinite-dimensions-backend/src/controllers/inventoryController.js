// src/controllers/inventoryController.js
const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.getInventory = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM inventory');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.updateInventory = async (req, res, next) => {
  const { id, stock } = req.body;
  try {
    await pool.query('UPDATE inventory SET stock = ? WHERE id = ?', [stock, id]);
    res.json({ message: 'Inventory updated' });
  } catch (err) {
    next(err);
  }
};
