const express = require('express');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');
const { 
  createCustomOrder, 
  estimatePrice, 
  uploadForCreate, 
  uploadForEstimate 
} = require('../controllers/customOrderController');

const router = express.Router();

// POST /api/custom-orders: Final custom order creation (requires authentication)
router.post(
  '/',
  authenticateToken,
  uploadForCreate,
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('delivery_address').notEmpty().withMessage('Delivery address is required'),
    body('postal_code').notEmpty().withMessage('Postal code is required'),
    body('city').notEmpty().withMessage('City is required')
  ],
  createCustomOrder
);

// POST /api/custom-orders/estimate: Provides a price/time estimate for a custom order (public endpoint)
router.post(
  '/estimate',
  uploadForEstimate,
  estimatePrice
);

module.exports = router;
