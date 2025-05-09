// src/routes/employeeRoutes.js
const express = require('express');
const { body } = require('express-validator');
const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// All endpoints in this router require a valid JWT AND the ADMIN role
router.use(authenticateToken, authorizeRoles('ADMIN'));

router.get('/', getEmployees);
router.get('/:id', getEmployeeById);

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password ≥ 6 chars'),
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('cin').notEmpty().withMessage('CIN is required'),
  ],
  createEmployee
);

router.put(
  '/:id',
  [
    // you can optionally validate whichever fields you allow changing
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 6 }),
    body('cin').optional().notEmpty(),
  ],
  updateEmployee
);

router.delete('/:id', deleteEmployee);

module.exports = router;
