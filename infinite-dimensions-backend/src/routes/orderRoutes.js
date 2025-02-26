const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createOrder, updateOrder } = require('../controllers/orderController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/',
  authenticateToken,
  [
    body('client_id').notEmpty().withMessage('Client ID is required'),
    body('delivery_address').notEmpty().withMessage('Delivery address is required'),
    body('postal_code').notEmpty().withMessage('Postal code is required'),
    body('city').notEmpty().withMessage('City is required')
  ],
  createOrder
);

router.put('/:id',
  authenticateToken,
  authorizeRoles('ADMIN', 'EMPLOYEE'),
  updateOrder
);

module.exports = router;
