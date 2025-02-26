const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.requestConsultation = async (req, res, next) => {
  const { userId, timeslot } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO consultations (user_id, timeslot, status) VALUES (?, ?, ?)',
      [userId, timeslot, 'pending']
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
