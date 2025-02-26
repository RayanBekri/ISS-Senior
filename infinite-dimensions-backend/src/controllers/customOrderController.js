const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.createCustomOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, material, estimatedCost } = req.body;
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: '3D model file is required' });
  }
  try {
    const [result] = await pool.query(
      'INSERT INTO custom_orders (user_id, material, estimated_cost, model_path, status) VALUES (?, ?, ?, ?, ?)',
      [userId, material, estimatedCost, file.path, 'pending']
    );
    res.status(201).json({ message: 'Custom order created', orderId: result.insertId });
  } catch (err) {
    next(err);
  }
};
