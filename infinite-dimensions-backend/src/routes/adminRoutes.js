const express = require('express');
const { body } = require('express-validator');
const {
  getPendingCompanies,
  updateCompanyApproval,
  registerPrivileged
} = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// 1️⃣ List pending company registrations
router.get(
  '/companies/pending',
  authenticateToken,
  authorizeRoles('ADMIN'),
  getPendingCompanies
);

// 2️⃣ Create new ADMIN/EMPLOYEE
router.post(
  '/privileged',
  authenticateToken,
  authorizeRoles('ADMIN'),
  [
    body('email').isEmail().withMessage('A valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['ADMIN','EMPLOYEE']).withMessage('Invalid role'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
  ],
  registerPrivileged
);

// 3️⃣ Approve or reject a company
router.put(
  '/companies/:id/approval',
  authenticateToken,
  authorizeRoles('ADMIN'),
  [
    body('action')
      .isIn(['accept','reject'])
      .withMessage("Action must be 'accept' or 'reject'")
  ],
  updateCompanyApproval
);

module.exports = router;
