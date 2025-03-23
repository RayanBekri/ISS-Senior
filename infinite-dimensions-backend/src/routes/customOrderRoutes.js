const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { 
  createCustomOrder, 
  estimatePrice, 
  uploadForCreate, 
  uploadForEstimate 
} = require('../controllers/customOrderController');

const router = express.Router();

// POST /api/custom-orders (final order creation)
router.post('/',
  authenticateToken,
  uploadForCreate,
  createCustomOrder
);

// POST /api/custom-orders/estimate (for slicing & price/time estimate)
router.post('/estimate',
  uploadForEstimate,
  estimatePrice
);

module.exports = router;
