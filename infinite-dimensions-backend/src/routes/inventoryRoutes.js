// src/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { getInventory, updateInventory } = require('../controllers/inventoryController');
const { body } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  getInventory
);

router.put('/',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  [
    body('id').notEmpty().withMessage('Inventory ID is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer')
  ],
  updateInventory
);

module.exports = router;
