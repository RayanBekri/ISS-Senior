// src/routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { queryChatbot, streamChatbot } = require('../controllers/chatbotController');

// POST /api/chatbot/query
// Accepts a JSON body: { chat: string, history?: Array<{ author: string, content: string }> }
// Returns a complete AI-generated response. Logs user & bot messages to "chat_log.txt".
router.post('/query', queryChatbot);

// POST /api/chatbot/stream (Optional)
// Streams partial AI responses back to the client.
router.post('/stream', streamChatbot);

module.exports = router;
