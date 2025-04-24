const pool = require('../config/db');
const { validationResult } = require('express-validator');

// Get all printers
exports.getPrinters = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM printers");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get a specific printer by ID
exports.getPrinterById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM printers WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).send("Printer not found");
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Create a new printer
exports.createPrinter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, model, type, power_usage, buying_cost, lifespan, operational_status } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO printers (name, model, type, power_usage, buying_cost, lifespan, operational_status) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, model, type, power_usage, buying_cost, lifespan, operational_status]
    );
    res.status(201).json({ id: result.insertId, name, model, type, power_usage, buying_cost, lifespan, operational_status });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


// Update a printer
exports.updatePrinter = async (req, res) => {
  const { id } = req.params;
  const { name, model, type, power_usage, buying_cost, lifespan, operational_status } = req.body;
  
  // Validate input data
  if (!name || !model || !type || !power_usage || !buying_cost || !lifespan || !operational_status) {
    return res.status(400).send("All fields are required");
  }

  try {
    // Update the printer details in the database
    const [result] = await pool.query(
      "UPDATE printers SET name = ?, model = ?, type = ?, power_usage = ?, buying_cost = ?, lifespan = ?, operational_status = ? WHERE id = ?",
      [name, model, type, power_usage, buying_cost, lifespan, operational_status, id]
    );

    // If no rows were affected, return a 404 error (printer not found)
    if (result.affectedRows === 0) {
      return res.status(404).send("Printer not found");
    }

    // Return the updated printer data as a response
    res.json({
      id,
      name,
      model,
      type,
      power_usage,
      buying_cost,
      lifespan,
      operational_status,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


// Delete a printer
exports.deletePrinter = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM printers WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).send("Printer not found");
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
