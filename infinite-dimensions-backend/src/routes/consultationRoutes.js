const express = require('express');
const router = express.Router();
const { requestConsultation, updateConsultation, getTimeslots } = require('../controllers/consultationController');
const { body } = require('express-validator');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.post(
  '/',
  authenticateToken,
  [
    body('userId').notEmpty().withMessage('User ID is required'),
    body('timeslot').notEmpty().withMessage('Timeslot is required'),
    body('notes').optional()
  ],
  requestConsultation
);

router.put('/:id',
  authenticateToken,
  authorizeRoles('EMPLOYEE', 'ADMIN'),
  updateConsultation
);

router.get('/timeslots', getTimeslots);

module.exports = router;
