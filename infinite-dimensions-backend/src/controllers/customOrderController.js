// src/controllers/customOrderController.js

const pool = require('../config/db');
const { validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Multer storage for creation (saving the file with its original filename)
const storageCreate = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const uploadForCreate = multer({ storage: storageCreate }).single('model');

// Multer storage for the estimate route (saving the file with its original filename)
const storageEstimate = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const uploadForEstimate = multer({ storage: storageEstimate }).single('model');

/**
 * createCustomOrder
 *
 * Inserts a new custom order record into the custom_orders table.
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
 * advancedParseHeader
 *
 * Parses the G-code header text and searches for a line starting with ";TIME:".
 * Returns the extracted print time (in seconds) as a number.
 */
const advancedParseHeader = (headerText) => {
  let printTimeS = null;
  const lines = headerText.split('\n');
  for (let line of lines) {
    line = line.trim();
    // Try to match a line like ";TIME: 9027"
    const match = line.match(/^;TIME:\s*(\d+(\.\d+)?)/);
    if (match) {
      printTimeS = parseFloat(match[1]);
      break;
    }
    // If you need to support an alternate format (e.g., "Print time (s): 9027"),
    // uncomment the following:
    // const altMatch = line.match(/^Print time \(s\):\s*(\d+(\.\d+)?)/);
    // if (altMatch) {
    //   printTimeS = parseFloat(altMatch[1]);
    //   break;
    // }
  }
  return { printTimeS };
};

/**
 * estimatePrice
 *
 * Processes an uploaded STL file to generate an estimated print time and price.
 * This function:
 *   - Verifies that the uploaded file is an STL.
 *   - Executes the CuraEngine command with the verbose flag so that the resulting G-code file
 *     contains the header information.
 *   - Reads the output G-code file and parses it to extract the print time.
 *   - Converts the print time (in seconds) into hours and calculates a price using a fixed rate.
 *   - Deletes the output G-code file and the uploaded STL file.
 */
const estimatePrice = async (req, res, next) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No STL file uploaded.' });
    }

    // Check file extension
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (fileExtension !== '.stl') {
      await fs.unlink(req.file.path).catch(err => console.error('Error removing non-STL file:', err));
      return res.status(400).json({ message: 'Only STL files are allowed.' });
    }

    // Define file paths.
    // You may override these by setting the corresponding environment variables.
    const configPath = process.env.CURA_CONFIG_PATH ||
      path.join('/workspaces/ISS-Senior/infinite-dimensions-backend/Printer_Config', 'ender6_config.json');
    const outputGcodePath = process.env.CURA_OUTPUT_PATH ||
      path.join('/workspaces/ISS-Senior/infinite-dimensions-backend/uploads', 'output.gcode');
    const stlFilePath = path.resolve(req.file.path);

    // Build and execute the CuraEngine command.
    // We do not use any output redirection here because CuraEngine writes the header into the G-code file.
    const command = `CuraEngine slice -v -j "${configPath}" -l "${stlFilePath}" -o "${outputGcodePath}"`;
    console.log('Executing CuraEngine command:', command);
    const { stdout, stderr } = await execPromise(command);
    console.log('CuraEngine stdout:', stdout);
    if (stderr) console.error('CuraEngine stderr:', stderr);

    // Read the generated G-code file (which contains the header).
    const gcodeContent = await fs.readFile(outputGcodePath, 'utf8');
    // Log the first 20 lines for debugging.
    console.log('G-code header preview:\n', gcodeContent.split('\n').slice(0, 20).join('\n'));

    // Parse the header to extract print time (in seconds)
    const { printTimeS } = advancedParseHeader(gcodeContent);
    if (printTimeS === null) {
      console.warn('No print time found in the G-code header.');
      return res.status(500).json({ message: 'Could not determine print time from slicing output.' });
    }

    // Convert print time (s) to hours and calculate price.
    const timeInHours = parseFloat((printTimeS / 3600).toFixed(2));
    const machineRate = 5; // Dollars per hour (adjust as needed)
    const price = parseFloat((timeInHours * machineRate).toFixed(2));

    console.log('Extracted print time (s):', printTimeS);
    console.log('Print time (hr):', timeInHours);
    console.log('Total estimated price: $', price);

    // Cleanup: delete the output G-code file and the uploaded STL file.
    await fs.unlink(outputGcodePath).catch(err => console.error('Cleanup error (G-code file):', err));
    await fs.unlink(stlFilePath).catch(err => console.error('Cleanup error (uploaded STL):', err));

    return res.status(200).json({
      time: timeInHours,
      price
    });
  } catch (error) {
    console.error('Error in estimatePrice:', error);
    return res.status(500).json({ message: 'Internal server error during price estimation.' });
  }
};

exports.uploadForCreate = uploadForCreate;
exports.uploadForEstimate = uploadForEstimate;
exports.createCustomOrder = createCustomOrder;
exports.estimatePrice = estimatePrice;
