const pool = require('../config/db');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// 1) Multer storage for final custom order creation using original filename
const storageCreate = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadForCreate = multer({ storage: storageCreate }).single('model');

// 2) Multer storage for estimate route using original filename
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
 * - Inserts a new custom order into the DB.
 * - Expects userId, material, color, strength, additionalInfo in req.body.
 * - Expects the uploaded STL file in req.file (named "model").
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
 * - Accepts an STL file named "model" in req.file.
 * - Checks that the file has a .stl extension.
 * - Runs CuraEngine to slice the STL file, directing its terminal output to a text file.
 * - Reads that text file and parses for a line starting with ";TIME:".
 * - Converts the extracted time (in seconds) to hours.
 * - Calculates a placeholder price and returns { time, price }.
 * - Deletes the temporary text file and output file after processing.
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
    // Retrieve environment configuration
    const curaDir = process.env.CURA_DIR || 'C:\\Program Files\\UltiMaker Cura 5.7.2';
    const configPath = process.env.CURA_CONFIG_PATH || 'C:\\Users\\bekri\\Downloads\\ender6_config.json';
    const outputGcodePath = process.env.CURA_OUTPUT_PATH || 'C:\\Users\\bekri\\Downloads\\output.gcode';
    const stlFilePath = path.resolve(req.file.path);
    // Create a temporary text file for terminal output
    const tempOutputFile = path.join('C:\\Users\\bekri\\Downloads\\Infinite Dimensions\\infinite-dimensions-backend\\uploads', `slicer_output_${Date.now()}.txt`);
    // Build the curaengine command.
    // Instead of combining "cd" and the command in one, we use the cwd option to simulate "cd"
    const command = `curaengine slice -j "${configPath}" -l "${stlFilePath}" > "${tempOutputFile}"`;
    console.log('CuraEngine command:', command);
    // Execute the command with cwd set to curaDir so it's equivalent to running "cd curaDir" first.
    const { stdout, stderr } = await execPromise(command, { cwd: curaDir });
    console.log('CuraEngine stdout:', stdout);
    if (stderr) console.error('CuraEngine stderr:', stderr);
    // Read the temporary output text file
    const outputText = await fs.readFile(tempOutputFile, 'utf8');
    // Parse for a line starting with ";TIME:" (e.g., ";TIME:1645")
    let timeInSeconds = 0;
    const lines = outputText.split('\n');
    console.log('Output text lines:', lines);
    for (const line of lines) {
      if (line.startsWith(';TIME:')) {
        const numericPart = line.replace(';TIME:', '').trim();
        console.log('Extracted time (seconds)', numericPart);
        timeInSeconds = parseFloat(numericPart) || 0;
        break;
      }
    }
    // Convert time from seconds to hours (rounded to two decimals)
    const timeInHours = parseFloat((timeInSeconds / 3600).toFixed(2));
    // Placeholder formula for price (e.g., $5 per hour)
    const price = timeInHours * 5;
    console.log('Extracted time (seconds):', timeInSeconds);
    console.log('Time in hours:', timeInHours);
    console.log('Calculated price:', price);
    // Cleanup: delete temporary text file and output file
    await fs.unlink(tempOutputFile).catch(err => console.error('Cleanup error (temp file):', err));
    // Optionally remove the uploaded STL file if not needed.
    return res.status(200).json({ time: timeInHours, price });
  } catch (error) {
    console.error('Error in estimatePrice:', error);
    return res.status(500).json({ message: 'Internal server error during price estimation.' });
  }
};

module.exports = {
  uploadForCreate,
  uploadForEstimate,
  createCustomOrder,
  estimatePrice
};
