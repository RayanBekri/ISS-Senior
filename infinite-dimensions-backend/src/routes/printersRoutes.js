const express = require('express');
const router = express.Router();
const printersController = require('../controllers/printersController');
const { getPrinters, createPrinter, updatePrinter, deletePrinter } = require('../controllers/printersController');
const { body } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');


router.get('/',
  //authenticateToken,
  //authorizeRoles('EMPLOYEE', 'ADMIN'),
  printersController.getPrinters
);

router.get("/:id", 
  //authenticateToken,
  //authorizeRoles('EMPLOYEE', 'ADMIN'),
  printersController.getPrinterById);

router.post('/',
  //authenticateToken,
  //authorizeRoles('EMPLOYEE', 'ADMIN'),
  [
    body('name').notEmpty().withMessage('Printer name is required')
  ],
  printersController.createPrinter
);

router.put('/:id',
  //authenticateToken,
  //authorizeRoles('EMPLOYEE', 'ADMIN'),
  printersController.updatePrinter
);

router.delete('/:id',
  //authenticateToken,
  //authorizeRoles('EMPLOYEE', 'ADMIN'),
  printersController.deletePrinter
);

module.exports = router;
