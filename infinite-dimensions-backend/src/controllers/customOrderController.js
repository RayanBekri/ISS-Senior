const pool = require('../config/db');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// For final custom order creation (store file with original filename)
const storageCreate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadForCreate = multer({ storage: storageCreate }).single('model');

// For the estimate route (store file with original filename)
const storageEstimate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadForEstimate = multer({ storage: storageEstimate }).single('model');

/**
 * createCustomOrder
 * Inserts a new custom order record into the custom_orders table.
 * Expects req.body to contain userId, material, color, strength, additionalInfo.
 * Expects an uploaded STL file in req.file (field name "model").
 */
const createCustomOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, material, color, strength, additionalInfo } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: '3D model file is required.' });
    }
    const [result] = await pool.query(
      'INSERT INTO custom_orders (user_id, material, model_path, status, color, strength, additional_info) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, material, req.file.path, 'pending', color || null, strength || null, additionalInfo || null]
    );
    return res.status(201).json({
      message: 'Custom order created',
      orderId: result.insertId
    });
  } catch (err) {
    next(err);
  }
};

/**
 * estimatePrice
 * Accepts an STL file (field "model") to produce a price/time estimate.
 * Verifies the file extension is ".stl".
 * Runs CuraEngine to slice the file, redirecting terminal output to a temporary text file.
 * Reads that text file and parses for a line starting with ";TIME:".
 * Converts the time (in seconds) to hours and calculates a placeholder price (e.g., $5 per hour).
 * Deletes temporary files (output and the uploaded STL) after processing.
 * Returns a JSON object { time, price }.
 */
const estimatePrice = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No STL file uploaded.' });
    }
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (fileExtension !== '.stl') {
      await fs.unlink(req.file.path).catch(err => console.error('Error removing non-STL file:', err));
      return res.status(400).json({ message: 'Only STL files are allowed.' });
    }
    const curaDir = process.env.CURA_DIR || 'C:\\Program Files\\UltiMaker Cura 5.7.2';
    const configPath = process.env.CURA_CONFIG_PATH || 'C:\\Users\\bekri\\Downloads\\ender6_config.json';
    const outputGcodePath = process.env.CURA_OUTPUT_PATH || 'C:\\Users\\bekri\\Downloads\\output.gcode';
    const stlFilePath = path.resolve(req.file.path);

    // Generate a temporary text file to capture terminal output
    const tempOutputFile = path.join('uploads', `slicer_output_${Date.now()}.txt`);

    // Build the curaengine command, using the cwd option to simulate "cd" into curaDir
    const command = `curaengine slice -j "${configPath}" -l "${stlFilePath}" > "${tempOutputFile}"`;
    console.log('CuraEngine command:', command);
    const { stdout, stderr } = await execPromise(command, { cwd: curaDir });
    console.log('CuraEngine stdout:', stdout);
    if (stderr) console.error('CuraEngine stderr:', stderr);

    // Read the temporary output file to extract the time information
    const outputText = await fs.readFile(tempOutputFile, 'utf8');
    let timeInSeconds = 0;
    const lines = outputText.split('\n');
    for (const line of lines) {
      if (line.startsWith(';TIME:')) {
        const numericPart = line.replace(';TIME:', '').trim();
        console.log('Extracted time (seconds):', numericPart);
        timeInSeconds = parseFloat(numericPart) || 0;
        break;
      }
    }

    const timeInHours = parseFloat((timeInSeconds / 3600).toFixed(2));
    const price = timeInHours * 5; // Placeholder: $5 per hour

    console.log('Time in hours:', timeInHours);
    console.log('Calculated price:', price);

    // Clean up: delete temporary output file, output G-code file, and the uploaded STL file
    await fs.unlink(tempOutputFile).catch(err => console.error('Cleanup error (temp file):', err));
    await fs.unlink(outputGcodePath).catch(err => console.error('Cleanup error (output file):', err));
    await fs.unlink(stlFilePath).catch(err => console.error('Cleanup error (uploaded STL):', err));

    return res.status(200).json({ time: timeInHours, price });
  } catch (error) {
    console.error('Error in estimatePrice:', error);
    return res.status(500).json({ message: 'Internal server error during price estimation.' });
  }
};

exports.uploadForCreate = uploadForCreate;
exports.uploadForEstimate = uploadForEstimate;
exports.createCustomOrder = createCustomOrder;
exports.estimatePrice = estimatePrice;
