const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  recordTransaction, 
  getFinanceRecords, 
  updateFinanceRecord, 
  deleteFinanceRecord 
} = require('../controllers/financeController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post('/',
  authenticateToken,
  authorizeRoles('ADMIN'),
  [
    body('transaction_type')
      .notEmpty().withMessage('Transaction type is required')
      .isIn(['INCOME','EXPENSE']).withMessage('Transaction type must be INCOME or EXPENSE'),
    body('amount')
      .isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
  ],
  recordTransaction
);

router.get('/',
  authenticateToken,
  authorizeRoles('ADMIN'),
  getFinanceRecords
);

router.put('/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  [
    body('transaction_type')
      .optional().isIn(['INCOME','EXPENSE']).withMessage('Transaction type must be INCOME or EXPENSE'),
    body('amount')
      .optional().isFloat({ gt: 0 }).withMessage('Amount must be greater than 0')
  ],
  updateFinanceRecord
);

router.delete('/:id',
  authenticateToken,
  authorizeRoles('ADMIN'),
  deleteFinanceRecord
);

module.exports = router;
