// src/routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notificationController');
const { authenticateToken } = require('../middleware/auth');

router.post('/',
  authenticateToken,
  sendNotification
);

module.exports = router;
