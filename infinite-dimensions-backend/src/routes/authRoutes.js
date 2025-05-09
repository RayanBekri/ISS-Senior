const express = require('express');
const { body } = require('express-validator');
const {
  registerClient,
  login,
  loginStaff,
  requestPasswordReset,
  resetPassword,
  updatePassword,
  me
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/register',
  [
    body('email')
      .isEmail().withMessage('A valid email is required'),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('first_name')
      .notEmpty().withMessage('First name is required'),
    body('last_name')
      .notEmpty().withMessage('Last name is required'),

    body('is_company')
      .optional()
      .isBoolean().withMessage('is_company must be a boolean')
      .toBoolean(),

    body('company_name')
      .optional()
      .isString().withMessage('Company name must be text'),

    body('company_tax_number')
      .optional()
      .isString().withMessage('Company tax number must be text'),
  ],
  registerClient
);

router.post(
  '/login/staff',
  [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
  ],
  loginStaff
);


router.post(
  '/login',
  [ body('email').isEmail(), body('password').notEmpty() ],
  login
);


router.post('/request-password-reset',
  [
    body('email').isEmail().withMessage('A valid email is required')
  ],
  requestPasswordReset
);

router.post('/reset-password',
  [
    body('resetToken').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  resetPassword
);

router.post('/update-password',
  authenticateToken,
  [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
  ],
  updatePassword
);

router.get('/me', authenticateToken, me);

module.exports = router;
