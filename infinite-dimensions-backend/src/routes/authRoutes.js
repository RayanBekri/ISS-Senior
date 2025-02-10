// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  registerClient, 
  registerPrivileged, 
  login, 
  requestPasswordReset, 
  resetPassword,
  updatePassword 
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public registration endpoint for clients
router.post('/register',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    // Optional field: is_company (if true, account will await admin approval)
    body('is_company').optional().isBoolean().withMessage('is_company must be a boolean'),
    // If is_company is true, then company_name and company_tax_number become required:
    body('company_name')
      .if((value, { req }) => req.body.is_company === true || req.body.is_company === 'true')
      .notEmpty()
      .withMessage('Company name is required when registering as a company'),
    body('company_tax_number')
      .if((value, { req }) => req.body.is_company === true || req.body.is_company === 'true')
      .notEmpty()
      .withMessage('Company tax number is required when registering as a company')
  ],
  registerClient
);

// Secret registration endpoint for admin/employee users.
// The URL (e.g., /6f4a1d3b8c) is intentionally obscure.
router.post('/6f4a1d3b8c',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').notEmpty().withMessage('Role is required').isIn(['ADMIN','EMPLOYEE']).withMessage('Invalid role'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required')
    // Company fields are optional here.
  ],
  registerPrivileged
);

// Login endpoint
router.post('/login',
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  login
);

// Request Password Reset endpoint
router.post('/request-password-reset',
  [
    body('email').isEmail().withMessage('A valid email is required')
  ],
  requestPasswordReset
);

// Reset Password endpoint
router.post('/reset-password',
  [
    body('resetToken').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  resetPassword
);

// Update Password endpoint (requires authentication)
router.post('/update-password',
  authenticateToken,
  [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  updatePassword
);

module.exports = router;
