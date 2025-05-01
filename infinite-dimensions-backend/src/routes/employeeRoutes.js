const express = require('express');
const router = express.Router();

const {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

// Protect all routes
router.use(verifyToken);
router.use(isAdmin);

router.post('/', createEmployee);          // Create employee
router.get('/', getAllEmployees);          // Get all employees
router.put('/:id', updateEmployee);        // Update employee
router.delete('/:id', deleteEmployee);     // Delete employee

module.exports = router;
