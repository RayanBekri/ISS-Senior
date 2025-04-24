// In src/controllers/orderController.js

const pool = require('../config/db');
const { validationResult } = require('express-validator');
const axios = require('axios');

// Existing functions: createOrder, updateOrder, etc.

exports.createOrder = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { client_id, status, payment_method, delivery_address, postal_code, city, comments, total_cost } = req.body;
  try {
    // Insert the main order record into the `order` table
    const [result] = await pool.query(
      `INSERT INTO \`order\` (client_id, status, payment_method, delivery_address, postal_code, city, comments, total_cost)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [client_id, status || 'PENDING', payment_method || 'CASH', delivery_address, postal_code, city, comments || null, total_cost || null]
    );
    const orderId = result.insertId;
    
    // Check if there are predefined shop items provided
    let items = [];
    if (req.body.items) {
      items = typeof req.body.items === 'string' ? JSON.parse(req.body.items) : req.body.items;
    }
    if (items.length > 0) {
      const orderItemsPromises = items.map(item =>
        pool.query(
          'INSERT INTO order_item (order_id, item_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
          [orderId, item.item_id, item.quantity, item.unit_price]
        )
      );
      await Promise.all(orderItemsPromises);
    }
    
    res.status(201).json({ message: 'Order created', orderId });
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

/**
 * getAllOrders
 * Retrieves all orders from the `order` table.
 * This endpoint is for Admin and Employee use.
 * Returns an array of order records.
 */
exports.getAllOrders = async (req, res, next) => {
  try {
    const [orders] = await pool.query('SELECT * FROM `order` ORDER BY created_at DESC');
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error fetching orders" });
  }
};

// Exports using exports.method
exports.createOrder = exports.createOrder;
exports.updateOrder = exports.updateOrder;
exports.getAllOrders = exports.getAllOrders;
