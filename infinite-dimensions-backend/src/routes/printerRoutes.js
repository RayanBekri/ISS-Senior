const express = require('express');
const router = express.Router();
const { getPrinters, createPrinter, updatePrinter, deletePrinter } = require('../controllers/printerController');
const { body } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  getPrinters
);

router.post('/',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  [
    body('name').notEmpty().withMessage('Printer name is required')
  ],
  createPrinter
);

router.put('/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  updatePrinter
);

router.delete('/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  deletePrinter
);

module.exports = router;
