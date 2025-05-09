const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  uploadImages
} = require('../controllers/itemController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', getItems);

router.post(
  '/',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  // first handle the multipart upload & S3
  uploadImages,
  // then validate the rest of the payload
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
  ],
  createItem
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  // allow replacing or adding new images
  uploadImages,
  updateItem
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  deleteItem
);

module.exports = router;
