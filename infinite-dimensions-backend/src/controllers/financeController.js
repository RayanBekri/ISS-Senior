const pool = require('../config/db');
const { validationResult } = require('express-validator');


exports.recordTransaction = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { order_id, transaction_type, amount, description, saved_by } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO finance (order_id, transaction_type, amount, description, saved_by) VALUES (?, ?, ?, ?, ?)',
      [order_id || null, transaction_type, amount, description, saved_by || null]
    );
    res.status(201).json({ message: 'Transaction recorded', transactionId: result.insertId });
  } catch (err) {
    next(err);
  }
};


exports.getFinanceRecords = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM finance');
    res.json(rows);
  } catch (err) {
    next(err);
  }
};


exports.updateFinanceRecord = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const { order_id, transaction_type, amount, description, saved_by } = req.body;
  try {
    await pool.query(
      'UPDATE finance SET order_id = ?, transaction_type = ?, amount = ?, description = ?, saved_by = ? WHERE finance_id = ?',
      [order_id || null, transaction_type, amount, description, saved_by || null, id]
    );
    res.json({ message: 'Finance record updated successfully' });
  } catch (err) {
    next(err);
  }
};

exports.deleteFinanceRecord = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM finance WHERE finance_id = ?', [id]);
    res.json({ message: 'Finance record deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.getOverview = async (req, res, next) => {
  const year = parseInt(req.query.year, 10);
  const month = req.query.month ? parseInt(req.query.month, 10) : null;
  const m = month; // allow null
  try {
    const sql = `
      SELECT
        (SELECT COALESCE(SUM(amount),0)
           FROM finance
          WHERE transaction_type='INCOME'
            AND YEAR(creation_time)=?
            AND (? IS NULL OR MONTH(creation_time)=?)) AS totalSales,
        
        (SELECT COALESCE(SUM(CASE WHEN transaction_type='INCOME' THEN amount ELSE -amount END),0)
           FROM finance
          WHERE YEAR(creation_time)=?
            AND (? IS NULL OR MONTH(creation_time)=?)) AS operatingProfit,
        
        (SELECT COALESCE(SUM(
             CASE 
               WHEN transaction_type='INCOME' THEN amount
               WHEN description LIKE '%cost of goods%' THEN -amount
               ELSE 0
             END),0)
           FROM finance
          WHERE YEAR(creation_time)=?
            AND (? IS NULL OR MONTH(creation_time)=?)) AS grossProfit,
        
        (SELECT COALESCE(SUM(
             CASE
               WHEN transaction_type='INCOME' THEN amount
               WHEN description NOT LIKE '%interest%' 
                    AND description NOT LIKE '%tax%' 
                    AND description NOT LIKE '%depreciation%' 
                    AND description NOT LIKE '%amortization%' 
                 THEN -amount
               ELSE 0
             END),0)
           FROM finance
          WHERE YEAR(creation_time)=?
            AND (? IS NULL OR MONTH(creation_time)=?)) AS ebitda,
        
        (SELECT COALESCE(SUM(CASE WHEN transaction_type='INCOME' THEN amount ELSE -amount END),0)
           FROM finance
          WHERE YEAR(creation_time)=?
            AND (? IS NULL OR MONTH(creation_time)=?)) AS netProfit
    `;
    const params = [
      year,m,m,
      year,m,m,
      year,m,m,
      year,m,m,
      year,m,m
    ];
    const [rows] = await pool.query(sql, params);
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

exports.getSalesProfit = async (req, res, next) => {
  const year = parseInt(req.query.year, 10);
  const period = req.query.period || 'monthly'; // 'weekly'|'monthly'|'quarterly'|'yearly'
  try {
    const sql = `
      WITH date_periods AS (
        SELECT
          CASE
            WHEN ?='weekly' THEN CONCAT('Week ', WEEK(creation_time))
            WHEN ?='monthly' THEN DATE_FORMAT(creation_time,'%b')
            WHEN ?='quarterly' THEN CONCAT('Q',QUARTER(creation_time))
            ELSE YEAR(creation_time)
          END AS period_name,
          CASE
            WHEN ?='weekly' THEN WEEK(creation_time)
            WHEN ?='monthly' THEN MONTH(creation_time)
            WHEN ?='quarterly' THEN QUARTER(creation_time)
            ELSE YEAR(creation_time)
          END AS period_sort
        FROM finance
        WHERE YEAR(creation_time)=?
        GROUP BY period_name,period_sort
        ORDER BY period_sort
      )
      SELECT
        dp.period_name AS period,
        COALESCE(SUM(CASE WHEN f.transaction_type='INCOME' THEN f.amount ELSE 0 END),0) AS sales,
        COALESCE(SUM(CASE WHEN f.transaction_type='INCOME' THEN f.amount WHEN f.transaction_type='EXPENSE' THEN -f.amount ELSE 0 END),0) AS profit
      FROM date_periods dp
      LEFT JOIN finance f
        ON (
          CASE
            WHEN ?='weekly' THEN WEEK(f.creation_time)=dp.period_sort
            WHEN ?='monthly' THEN MONTH(f.creation_time)=dp.period_sort
            WHEN ?='quarterly' THEN QUARTER(f.creation_time)=dp.period_sort
            ELSE YEAR(f.creation_time)=dp.period_sort
          END
        )
        AND YEAR(f.creation_time)=?
      GROUP BY dp.period_name,dp.period_sort
      ORDER BY dp.period_sort
    `;
    const params = [
      period, period, period, period, year,
      period, period, period, year
    ];
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getCategoriesProfit = async (req, res, next) => {
  const year = parseInt(req.query.year, 10);
  try {
    const sql = `
      WITH item_categories AS (
        SELECT item_id,
               SUBSTRING_INDEX(name,' ',1) AS category
          FROM item
      )
      SELECT
        ic.category,
        SUM(oi.quantity * oi.unit_price) AS revenue,
        SUM(oi.quantity * oi.unit_price)
          - COALESCE((
              SELECT SUM(omu.amount_used *
                          (SELECT AVG(f.amount/inv.quantity)
                             FROM finance f
                             JOIN inventory inv
                               ON f.description LIKE CONCAT('%',inv.name,'%')
                            WHERE f.transaction_type='EXPENSE'
                              AND YEAR(f.creation_time)=?))
                FROM order_material_usage omu
               WHERE omu.order_id=o.order_id),0) AS profit
      FROM order_item oi
      JOIN \`order\` o ON oi.order_id=o.order_id
      JOIN item_categories ic ON oi.item_id=ic.item_id
      WHERE YEAR(o.created_at)=?
      GROUP BY ic.category
      ORDER BY profit DESC
    `;
    const [rows] = await pool.query(sql, [year, year]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getPrinterProductions = async (req, res, next) => {
  const year = parseInt(req.query.year, 10);
  try {
    const sql = `
      WITH quarters AS (
        SELECT 1 AS quarter_num,'Q1' AS quarter_name UNION
        SELECT 2,'Q2' UNION
        SELECT 3,'Q3' UNION
        SELECT 4,'Q4'
      )
      SELECT
        q.quarter_name AS quarter,
        COUNT(DISTINCT CASE WHEN p.printer_type='MULTICOLOR'
                             AND YEAR(pa.start_time)=?
                             AND QUARTER(pa.start_time)=q.quarter_num
                          THEN pa.assignment_id END) AS multicolor,
        COUNT(DISTINCT CASE WHEN p.printer_type='SINGLE_COLOR'
                             AND YEAR(pa.start_time)=?
                             AND QUARTER(pa.start_time)=q.quarter_num
                          THEN pa.assignment_id END) AS singleColor,
        COUNT(DISTINCT CASE WHEN p.printer_type='MULTICOLOR'
                             AND YEAR(pa.start_time)=? - 1
                             AND QUARTER(pa.start_time)=q.quarter_num
                          THEN pa.assignment_id END) AS multicolorLastYear,
        COUNT(DISTINCT CASE WHEN p.printer_type='SINGLE_COLOR'
                             AND YEAR(pa.start_time)=? - 1
                             AND QUARTER(pa.start_time)=q.quarter_num
                          THEN pa.assignment_id END) AS singleColorLastYear,
        COUNT(DISTINCT CASE WHEN p.printer_type='MULTICOLOR'
                             AND YEAR(pa.start_time)=? - 2
                             AND QUARTER(pa.start_time)=q.quarter_num
                          THEN pa.assignment_id END) AS multicolorTwoYearsAgo,
        COUNT(DISTINCT CASE WHEN p.printer_type='SINGLE_COLOR'
                             AND YEAR(pa.start_time)=? - 2
                             AND QUARTER(pa.start_time)=q.quarter_num
                          THEN pa.assignment_id END) AS singleColorTwoYearsAgo
      FROM quarters q
      LEFT JOIN printer_assignment pa ON QUARTER(pa.start_time)=q.quarter_num
      LEFT JOIN printer p ON pa.printer_id=p.printer_id
      GROUP BY q.quarter_name,q.quarter_num
      ORDER BY q.quarter_num
    `;
    const params = [year, year, year, year, year, year];
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getCustomerProfitabilityScatter = async (req, res, next) => {
  const year = parseInt(req.query.year, 10);
  try {
    const sql = `
      WITH customer_metrics AS (
        SELECT
          u.user_id,
          CONCAT(COALESCE(u.first_name,''),' ',COALESCE(u.last_name,''), 
                 CASE WHEN u.is_company THEN CONCAT(' (',u.company_name,')') ELSE '' END
          ) AS name,
          SUM(o.total_cost) AS sales,
          SUM(o.total_cost)
            - COALESCE((
                SELECT SUM(omu.amount_used *
                            (SELECT AVG(f.amount/inv.quantity)
                               FROM finance f
                               JOIN inventory inv
                                 ON f.description LIKE CONCAT('%',inv.name,'%')
                              WHERE f.transaction_type='EXPENSE'
                                AND YEAR(f.creation_time)=?))
                  FROM order_material_usage omu
                 WHERE omu.order_id=o.order_id),0) AS profit,
          COUNT(o.order_id) AS order_count
        FROM \`order\` o
        JOIN user u ON o.client_id=u.user_id
        WHERE YEAR(o.created_at)=?
        GROUP BY u.user_id,name
      )
      SELECT
        name AS customer,
        sales AS x,
        profit AS y,
        order_count*5 AS z
      FROM customer_metrics
      ORDER BY sales DESC
    `;
    const [rows] = await pool.query(sql, [year, year]);
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.getMaterialsConsumption = async (req, res, next) => {
  const year = parseInt(req.query.year, 10);
  const material = req.query.material || null;
  try {
    // 1) Total consumption by material
    const consumptionSql = `
      SELECT
        i.name AS material,
        SUM(omu.amount_used) AS amount,
        i.measurement_unit AS unit
      FROM order_material_usage omu
      JOIN inventory i ON omu.inventory_id=i.inventory_id
      JOIN \`order\` o ON omu.order_id=o.order_id
      WHERE YEAR(o.created_at)=?
        AND (? IS NULL OR i.name=?)
      GROUP BY i.name,i.measurement_unit
      ORDER BY amount DESC
    `;
    // 2) Monthly cost
    const costSql = `
      WITH monthly_periods AS (
        SELECT 1 AS month_num,'Jan' AS month_name UNION
        SELECT 2,'Feb' UNION
        SELECT 3,'Mar' UNION
        SELECT 4,'Apr' UNION
        SELECT 5,'May' UNION
        SELECT 6,'Jun' UNION
        SELECT 7,'Jul' UNION
        SELECT 8,'Aug' UNION
        SELECT 9,'Sep' UNION
        SELECT 10,'Oct' UNION
        SELECT 11,'Nov' UNION
        SELECT 12,'Dec'
      )
      SELECT
        mp.month_name AS month,
        COALESCE(SUM(
          omu.amount_used *
          (SELECT AVG(f.amount/inv.quantity)
             FROM finance f
             JOIN inventory inv
               ON f.description LIKE CONCAT('%',i.name,'%')
            WHERE f.transaction_type='EXPENSE'
              AND YEAR(f.creation_time)=?)
        ),0) AS cost
      FROM monthly_periods mp
      LEFT JOIN \`order\` o
        ON MONTH(o.created_at)=mp.month_num
        AND YEAR(o.created_at)=?
      LEFT JOIN order_material_usage omu
        ON omu.order_id=o.order_id
      LEFT JOIN inventory i
        ON omu.inventory_id=i.inventory_id
      WHERE (? IS NULL OR i.name=?)
      GROUP BY mp.month_name,mp.month_num
      ORDER BY mp.month_num
    `;

    const [consumption] = await pool.query(consumptionSql, [year, material, material]);
    const [cost] = await pool.query(costSql, [year, year, material, material]);

    res.json({ consumption, monthlyCost: cost });
  } catch (err) {
    next(err);
  }
};

