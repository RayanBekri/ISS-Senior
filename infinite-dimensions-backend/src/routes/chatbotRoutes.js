// src/routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { queryChatbot, streamChatbot } = require('../controllers/chatbotController');

// POST /api/chatbot/query - Process a chat message and return AI-generated response.
// This endpoint logs all messages to a file.
router.post('/query', queryChatbot);

// (Optional) POST /api/chatbot/stream - Stream the AI response back to the client.
// Uncomment the following line if you want to enable streaming.
router.post('/stream', streamChatbot);

module.exports = router;
