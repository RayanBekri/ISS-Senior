/**
 * Handles the request to create a new consultation.
 * 
 * @async
 * @function requestConsultation
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {number} req.body.userId - The ID of the user requesting the consultation.
 * @param {string} req.body.timeslot - The requested timeslot for the consultation.
 * @param {string} [req.body.notes] - Optional notes for the consultation.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} Sends a JSON response with a success message and the consultation ID.
 */

/**
 * Handles the request to update the status of an existing consultation.
 * 
 * @async
 * @function updateConsultation
 * @param {Object} req - The request object.
 * @param {Object} req.params - The route parameters.
 * @param {number} req.params.id - The ID of the consultation to update.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.status - The new status of the consultation.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} Sends a JSON response with a success message.
 */

/**
 * Retrieves a list of distinct requested timeslots for consultations.
 * 
 * @async
 * @function getTimeslots
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} Sends a JSON response with an array of distinct timeslots.
 */

const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.requestConsultation = async (req, res, next) => {
  const { userId, timeslot, notes } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO consultation (user_id, timeslot, status, notes) VALUES (?, ?, ?, ?)',
      [userId, timeslot, 'pending', notes || null]
    );
    res.status(201).json({ message: 'Consultation requested', consultationId: result.insertId });
  } catch (err) {
    next(err);
  }
};

exports.updateConsultation = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE consultations SET status = ? WHERE id = ?', [status, id]);
    res.json({ message: 'Consultation updated' });
  } catch (err) {
    next(err);
  }
};

exports.getTimeslots = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT requested_time FROM consultation');
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};
