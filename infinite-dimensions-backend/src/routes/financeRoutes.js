const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { 
  recordTransaction, 
  getFinanceRecords, 
  updateFinanceRecord, 
  deleteFinanceRecord,
  getOverview,
  getSalesProfit,
  getCategoriesProfit,
  getPrinterProductions,
  getCustomerProfitabilityScatter,
  getMaterialsConsumption
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

router.get('/overview', authenticateToken, authorizeRoles('ADMIN'), getOverview);
router.get('/sales-profit', authenticateToken, authorizeRoles('ADMIN'), getSalesProfit);
router.get('/shop/categories-profit', authenticateToken, authorizeRoles('ADMIN'), getCategoriesProfit);
router.get('/printers/productions-year', authenticateToken, authorizeRoles('ADMIN'), getPrinterProductions);
router.get('/customers/sales-profit-scatter', authenticateToken, authorizeRoles('ADMIN'), getCustomerProfitabilityScatter);
router.get('/printers/materials', authenticateToken, authorizeRoles('ADMIN'), getMaterialsConsumption);

module.exports = router;
