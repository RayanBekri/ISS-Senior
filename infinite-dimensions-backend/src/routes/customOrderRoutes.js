// src/routes/customOrderRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createCustomOrder } = require('../controllers/customOrderController');
const { body } = require('express-validator');
const { authenticateToken } = require('../middleware/auth');

// Configure multer storage (ensure the "uploads" folder exists)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

router.post('/',
  authenticateToken,
  upload.single('model'),
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('material').notEmpty().withMessage('Material is required'),
    body('estimatedCost').isFloat({ gt: 0 }).withMessage('Estimated cost must be greater than 0')
  ],
  createCustomOrder
);

module.exports = router;
