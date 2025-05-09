const pool = require('../config/db');
const { parseAsync } = require('json2csv');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

// 1. Get All Inventory Items
exports.getAllInventory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sort = req.query.sort || 'created_at';
    const order = req.query.order === 'asc' ? 'ASC' : 'DESC';
    const offset = (page - 1) * limit;

    // total count
    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM inventory');
    const [rows] = await pool.query(
      `SELECT * FROM inventory ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

// 2. Get Single Inventory Item
exports.getInventoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM inventory WHERE inventory_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
};

// 3. Create Inventory Item
exports.createInventoryItem = async (req, res, next) => {
  try {
    const { name, quantity, measurement_unit, provider } = req.body;
    const [result] = await pool.query(
      'INSERT INTO inventory (name, quantity, measurement_unit, provider) VALUES (?, ?, ?, ?)',
      [name, quantity, measurement_unit, provider]
    );
    const [rows] = await pool.query('SELECT * FROM inventory WHERE inventory_id = ?', [result.insertId]);
    res.status(201).json({ success: true, data: rows[0], message: 'Inventory item created successfully' });
  } catch (err) {
    next(err);
  }
};

// 4. Update Inventory Item
exports.updateInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity, measurement_unit, provider } = req.body;
    await pool.query(
      'UPDATE inventory SET name = ?, quantity = ?, measurement_unit = ?, provider = ? WHERE inventory_id = ?',
      [name, quantity, measurement_unit, provider, id]
    );
    const [rows] = await pool.query('SELECT * FROM inventory WHERE inventory_id = ?', [id]);
    res.json({ success: true, data: rows[0], message: 'Inventory item updated successfully' });
  } catch (err) {
    next(err);
  }
};

// 5. Delete Inventory Item
exports.deleteInventoryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM inventory WHERE inventory_id = ?', [id]);
    res.json({ success: true, message: 'Inventory item deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// 6. Update Inventory Quantity
exports.updateInventoryQuantity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, operation } = req.body; // operation: 'set', 'add', 'subtract'
    const [[current]] = await pool.query('SELECT quantity FROM inventory WHERE inventory_id = ?', [id]);
    if (!current) return res.status(404).json({ success: false, message: 'Item not found' });

    let newQuantity;
    switch (operation) {
      case 'add':
        newQuantity = parseFloat(current.quantity) + parseFloat(quantity);
        break;
      case 'subtract':
        newQuantity = parseFloat(current.quantity) - parseFloat(quantity);
        break;
      default:
        newQuantity = parseFloat(quantity);
    }

    await pool.query('UPDATE inventory SET quantity = ? WHERE inventory_id = ?', [newQuantity, id]);
    res.json({
      success: true,
      data: {
        inventory_id: id,
        previous_quantity: current.quantity,
        quantity: newQuantity,
        measurement_unit: current.measurement_unit
      },
      message: 'Inventory quantity updated successfully'
    });
  } catch (err) {
    next(err);
  }
};

// 7. Get Low Stock Items
exports.getLowStockItems = async (req, res, next) => {
  try {
    const threshold = parseFloat(req.query.threshold) || 0;
    const [rows] = await pool.query(
      'SELECT * FROM inventory WHERE quantity <= ? ORDER BY quantity ASC',
      [threshold]
    );
    res.json({ success: true, data: rows, count: rows.length });
  } catch (err) {
    next(err);
  }
};

// 8. Batch Update Inventory
exports.batchUpdateInventory = async (req, res, next) => {
  const items = req.body.items; // [{ inventory_id, quantity }]
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const updated = [];

    for (const itm of items) {
      const [[curr]] = await conn.query('SELECT quantity FROM inventory WHERE inventory_id = ?', [itm.inventory_id]);
      if (!curr) continue;
      const prevQty = curr.quantity;
      await conn.query('UPDATE inventory SET quantity = ? WHERE inventory_id = ?', [itm.quantity, itm.inventory_id]);
      updated.push({ inventory_id: itm.inventory_id, previous_quantity: prevQty, quantity: itm.quantity });
    }

    await conn.commit();
    res.json({ success: true, data: { updated: updated.length, failed: items.length - updated.length, items: updated }, message: 'Batch update completed successfully' });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
};

// 9. Search Inventory
exports.searchInventory = async (req, res, next) => {
  try {
    const q = `%${req.query.q || ''}%`;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [[{ total }]] = await pool.query(
      'SELECT COUNT(*) AS total FROM inventory WHERE name LIKE ? OR provider LIKE ?',
      [q, q]
    );
    const [rows] = await pool.query(
      'SELECT * FROM inventory WHERE name LIKE ? OR provider LIKE ? LIMIT ? OFFSET ?',
      [q, q, limit, offset]
    );

    res.json({ success: true, data: rows, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
};

// 10. Filter Inventory
exports.filterInventory = async (req, res, next) => {
  try {
    const { provider, measurement_unit, min_quantity, max_quantity, created_after, created_before } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const conditions = [];
    const values = [];

    if (provider) { conditions.push('provider = ?'); values.push(provider); }
    if (measurement_unit) { conditions.push('measurement_unit = ?'); values.push(measurement_unit); }
    if (min_quantity) { conditions.push('quantity >= ?'); values.push(min_quantity); }
    if (max_quantity) { conditions.push('quantity <= ?'); values.push(max_quantity); }
    if (created_after) { conditions.push('created_at >= ?'); values.push(created_after); }
    if (created_before) { conditions.push('created_at <= ?'); values.push(created_before); }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM inventory ${where}`, values
    );
    const [rows] = await pool.query(
      `SELECT * FROM inventory ${where} LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    res.json({ success: true, data: rows, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
};

// 11. Get Inventory Statistics
exports.getInventoryStats = async (req, res, next) => {
  try {
    const threshold = parseFloat(req.query.threshold) || 0;

    const [[{ total_items }]] = await pool.query('SELECT COUNT(*) AS total_items FROM inventory');
    const [[{ total_quantity }]] = await pool.query('SELECT COALESCE(SUM(quantity),0) AS total_quantity FROM inventory');
    const [[{ low_stock_count }]] = await pool.query('SELECT COUNT(*) AS low_stock_count FROM inventory WHERE quantity <= ?', [threshold]);
    const [[{ out_of_stock_count }]] = await pool.query('SELECT COUNT(*) AS out_of_stock_count FROM inventory WHERE quantity = 0');
    const [by_measurement_unit] = await pool.query('SELECT measurement_unit, COUNT(*) AS count FROM inventory GROUP BY measurement_unit');
    const [by_provider] = await pool.query('SELECT provider, COUNT(*) AS count FROM inventory GROUP BY provider');

    res.json({
      success: true,
      data: { total_items, total_quantity, low_stock_count, out_of_stock_count, by_measurement_unit, by_provider }
    });
  } catch (err) {
    next(err);
  }
};

// 12. Get Inventory History
exports.getInventoryHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start_date, end_date } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const conditions = ['inventory_id = ?'];
    const values = [id];
    if (start_date) { conditions.push('created_at >= ?'); values.push(start_date); }
    if (end_date) { conditions.push('created_at <= ?'); values.push(end_date); }

    const where = `WHERE ${conditions.join(' AND ')}`;

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM inventory_history ${where}`, values
    );
    const [history] = await pool.query(
      `SELECT * FROM inventory_history ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    res.json({ success: true, data: { inventory_id: id, history }, pagination: { total, page, limit, pages: Math.ceil(total / limit) } });
  } catch (err) {
    next(err);
  }
};

// 13. Export Inventory
exports.exportInventory = async (req, res, next) => {
  try {
    const format = (req.query.format || 'csv').toLowerCase();
    const [rows] = await pool.query('SELECT * FROM inventory');

    if (format === 'csv') {
      const csv = await parseAsync(rows);
      res.header('Content-Type', 'text/csv');
      res.attachment('inventory.csv');
      return res.send(csv);
    }

    if (format === 'xlsx') {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('Inventory');
      sheet.columns = Object.keys(rows[0] || {}).map(key => ({ header: key, key }));
      rows.forEach(r => sheet.addRow(r));
      const buffer = await workbook.xlsx.writeBuffer();
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.attachment('inventory.xlsx');
      return res.send(buffer);
    }

    if (format === 'pdf') {
      const doc = new PDFDocument();
      res.header('Content-Type', 'application/pdf');
      res.attachment('inventory.pdf');
      doc.pipe(res);
      // simple table
      const headers = Object.keys(rows[0] || {});
      doc.text(headers.join(' | '));
      rows.forEach(r => {
        doc.text(headers.map(h => r[h]).join(' | '));
      });
      doc.end();
      return;
    }

    res.status(400).json({ success: false, message: 'Unsupported export format' });
  } catch (err) {
    next(err);
  }
};
