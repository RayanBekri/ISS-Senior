// src/routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const { body, query, param } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const inventoryController = require('../controllers/inventoryController');

// All inventory management endpoints are Admin-only
router.use(authenticateToken, authorizeRoles('ADMIN'));

// 1. Get All Inventory Items (with pagination, sorting)
router.get(
  '/',
  [
    query('page').optional().isInt({ gt: 0 }),
    query('limit').optional().isInt({ gt: 0 }),
    query('sort').optional().isString(),
    query('order').optional().isIn(['asc','desc'])
  ],
  inventoryController.getAllInventory
);

// 2. Get Single Inventory Item
router.get(
  '/:id',
  [ param('id').isInt() ],
  inventoryController.getInventoryById
);

// 3. Create Inventory Item
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('quantity').isFloat({ gt: 0 }),
    body('measurement_unit').notEmpty(),
    body('provider').notEmpty()
  ],
  inventoryController.createInventoryItem
);

// 4. Update Inventory Item
router.put(
  '/:id',
  [
    param('id').isInt(),
    body('name').optional().notEmpty(),
    body('quantity').optional().isFloat({ gt: 0 }),
    body('measurement_unit').optional().notEmpty(),
    body('provider').optional().notEmpty()
  ],
  inventoryController.updateInventoryItem
);

// 5. Delete Inventory Item
router.delete(
  '/:id',
  [ param('id').isInt() ],
  inventoryController.deleteInventoryItem
);

// 6. Update Inventory Quantity (set/add/subtract)
router.patch(
  '/:id/quantity',
  [
    param('id').isInt(),
    body('quantity').isFloat(),
    body('operation').isIn(['set','add','subtract'])
  ],
  inventoryController.updateInventoryQuantity
);

// 7. Get Low Stock Items
router.get(
  '/low-stock',
  [ query('threshold').optional().isFloat({ min: 0 }) ],
  inventoryController.getLowStockItems
);

// 8. Batch Update Inventory
router.put(
  '/batch',
  [ body('items').isArray({ min: 1 }) ],
  inventoryController.batchUpdateInventory
);

// 9. Search Inventory
router.get(
  '/search',
  [ query('q').notEmpty(), query('page').optional().isInt({ gt: 0 }), query('limit').optional().isInt({ gt: 0 }) ],
  inventoryController.searchInventory
);

// 10. Filter Inventory
router.get(
  '/filter',
  [
    query('provider').optional().isString(),
    query('measurement_unit').optional().isString(),
    query('min_quantity').optional().isFloat({ min: 0 }),
    query('max_quantity').optional().isFloat({ min: 0 }),
    query('created_after').optional().isISO8601(),
    query('created_before').optional().isISO8601(),
    query('page').optional().isInt({ gt: 0 }),
    query('limit').optional().isInt({ gt: 0 })
  ],
  inventoryController.filterInventory
);

// 11. Get Inventory Statistics
router.get('/stats', inventoryController.getInventoryStats);

// 12. Get Inventory History
router.get(
  '/:id/history',
  [ param('id').isInt(), query('start_date').optional().isISO8601(), query('end_date').optional().isISO8601() ],
  inventoryController.getInventoryHistory
);

// 13. Export Inventory
router.get(
  '/export',
  [
    query('format').isIn(['csv','xlsx','pdf']),
    query('provider').optional().isString(),
    query('measurement_unit').optional().isString(),
    query('min_quantity').optional().isFloat({ min: 0 }),
    query('max_quantity').optional().isFloat({ min: 0 }),
    query('created_after').optional().isISO8601(),
    query('created_before').optional().isISO8601()
  ],
  inventoryController.exportInventory
);

module.exports = router;
