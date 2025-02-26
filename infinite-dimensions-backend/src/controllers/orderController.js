const pool = require('../config/db');
const { validationResult } = require('express-validator');
const axios = require('axios');

exports.createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { client_id, status, payment_method, delivery_address, postal_code, city, comments, total_cost } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO \`order\` (client_id, status, payment_method, delivery_address, postal_code, city, comments, total_cost)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [client_id, status || 'PENDING', payment_method || 'CASH', delivery_address, postal_code, city, comments || null, total_cost || null]
    );
    res.status(201).json({ message: 'Order created', orderId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  const { id } = req.params;
  const { status, delivery_address, postal_code, city, comments, total_cost, processed_by } = req.body;
  try {
    await pool.query(
      `UPDATE \`order\` 
       SET status = ?, delivery_address = ?, postal_code = ?, city = ?, comments = ?, total_cost = ?, processed_by = ? 
       WHERE order_id = ?`,
      [status, delivery_address, postal_code, city, comments, total_cost, processed_by, id]
    );
    
    if (status === 'DONE') {
      try {
        await axios.post('http://localhost:3000/api/finance', {
          order_id: id,
          transaction_type: 'INCOME',
          amount: total_cost,
          description: `Automatic transaction for delivered order ${id}`,
          saved_by: processed_by
        }, {

        });
      } catch (financeError) {
        console.error('Error recording finance transaction:', financeError.message);
      }
    }
    
    res.json({ message: 'Order updated successfully' });
  } catch (err) {
    next(err);
  }
};
