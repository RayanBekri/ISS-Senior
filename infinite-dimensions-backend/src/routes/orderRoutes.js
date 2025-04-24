// In src/routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createOrder, updateOrder, getAllOrders } = require('../controllers/orderController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

// POST /api/orders
// Creates a new order. Requires authentication.
router.post(
  '/',
  authenticateToken,
  [
    body('client_id').notEmpty().withMessage('Client ID is required'),
    body('delivery_address').notEmpty().withMessage('Delivery address is required'),
    body('postal_code').notEmpty().withMessage('Postal code is required'),
    body('city').notEmpty().withMessage('City is required')
  ],
  createOrder
);

// PUT /api/orders/:id
// Updates an order. Requires authentication and either ADMIN or EMPLOYEE role.
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'EMPLOYEE'),
  [
    body('status').notEmpty().withMessage('Status is required'),
    body('delivery_address').notEmpty().withMessage('Delivery address is required'),
    body('postal_code').notEmpty().withMessage('Postal code is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('total_cost').optional().isNumeric().withMessage('Total cost must be a number'),
    body('processed_by').notEmpty().withMessage('Processed by is required')
  ],
  updateOrder
);

// GET /api/orders/all
// Retrieves all orders for Admin and Employee (requires authentication and proper roles).
router.get(
  '/all',
  authenticateToken,
  authorizeRoles('ADMIN', 'EMPLOYEE'),
  getAllOrders
);

module.exports = router;
