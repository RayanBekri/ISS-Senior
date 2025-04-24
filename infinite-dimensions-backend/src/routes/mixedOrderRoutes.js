const express = require('express');
const { body } = require('express-validator');
const { createMixedOrder, uploadMixed } = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

/*
  POST /api/orders/mixed
  Handles mixed orders where the client may purchase predefined shop items, upload a custom order STL file 
  (using field "customModel"), or provide custom order data (e.g., material and color).
*/
router.post(
  '/mixed',
  authenticateToken,
  uploadMixed,
  [
    body('client_id').notEmpty().withMessage('Client ID is required'),
    body('delivery_address').notEmpty().withMessage('Delivery address is required'),
    body('postal_code').notEmpty().withMessage('Postal code is required'),
    body('city').notEmpty().withMessage('City is required')
    // Additional validations as needed (e.g., for items array)
  ],
  createMixedOrder
);

module.exports = router;
