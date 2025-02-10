// src/routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { body } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', getItems);

router.post('/',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  createItem
);

router.put('/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  updateItem
);

router.delete('/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  deleteItem
);

module.exports = router;
