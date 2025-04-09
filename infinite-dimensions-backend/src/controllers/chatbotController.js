// src/controllers/chatbotController.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

/**
 * Initialize the Gemini API client using the API key from .env.
 * Ensure that your .env file contains: GOOGLE_API_KEY=<your_api_key>
 */
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

/**
 * Obtain the Gemini model (for complete responses).
 * Adjust the model parameter as needed for your project.
 */
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

/**
 * isQueryValid - Advanced RAG system check.
 * This function uses an extensive list of allowed keywords related to 3D printing.
 * It also disallows queries that mention competitors or non-related companies (e.g., those operating in Tunisia).
 * The function first checks if any disallowed keywords (e.g., competitor names, "tunisia", "other company") are present;
 * if so, it immediately returns false. Otherwise, it counts how many allowed keywords exist in the query,
 * and only returns true if the count meets a defined threshold.
 */
const isQueryValid = (query) => {
  const allowedKeywords = [
    "3d printer", "3d printing", "stl", "filament", "slicer", "additive manufacturing",
    "3d model", "printing", "printer", "fdm", "sla", "resin", "cad", "openscad", "mesh",
    "layer height", "infill", "support", "extruder", "gcode", "prototype", "3d design",
    "rapid prototyping", "print quality", "print speed"
  ];
  
  const disallowedKeywords = [
    "competitor", "competitors", "other company", "others", "tunisia",
    "ultimaker", "makerbot", "xyzprinting", "prusa", "formlabs", "stratasys"
  ];
  
  const lowerQuery = query.toLowerCase();
  
  // Check for any disallowed keywords
  for (const word of disallowedKeywords) {
    if (lowerQuery.includes(word)) {
      return false;
    }
  }
  
  // Count how many allowed keywords are present
  let count = 0;
  allowedKeywords.forEach(keyword => {
    if (lowerQuery.includes(keyword)) count++;
  });
  
  // Require at least 2 allowed keyword matches for the query to be considered valid
  return count >= 2;
};

/**
 * queryChatbot
 * Accepts a chat message from the client and returns an AI-generated response.
 * It performs an advanced RAG check to ensure the query relates to 3D printing and does not mention
 * competitors or unrelated companies. A system prompt is injected into the conversation to restrict the domain.
 * The conversation (user message and bot response) is logged to "chat_log.txt" with ISO-formatted timestamps.
 *
 * Expected request JSON:
 *   { chat: string, history?: Array<{ author: string, content: string }> }
 * Response JSON:
 *   { text: string }
 */
exports.queryChatbot = async (req, res, next) => {
  try {
    const { chat, history } = req.body;
    if (!chat) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Advanced RAG check: ensure the query relates to 3D printing
    if (!isQueryValid(chat)) {
      return res.status(400).json({ error: "This chatbot only answers questions about 3D printing and does not provide information about competitors or other companies." });
    }
    
    const systemContext = "You are a specialist in 3D printing and design. Answer only questions related to 3D printing, 3D modeling, STL files, slicing, and additive manufacturing. If asked about competitors or other companies, respond with 'I only answer questions about 3D printing.'";
    
    let messages = [{ author: 'system', content: systemContext }];
    if (history && Array.isArray(history)) {
      messages = messages.concat(history);
    }
    messages.push({ author: 'user', content: chat });
    
    const chatInstance = model.startChat({ messages });
    const result = await chatInstance.sendMessage({});
    const response = await result.response;
    const botResponse = response.text();
    
    // Log the conversation with timestamps
    const now = new Date().toISOString();
    const logEntry = `${now} - User: ${chat}\n${now} - Bot: ${botResponse}\n\n`;
    const logFile = path.join(__dirname, '../../chat_log.txt');
    fs.appendFile(logFile, logEntry, (err) => {
      if (err) console.error('Error writing to chat log:', err);
    });
    
    return res.status(200).json({ text: botResponse });
  } catch (error) {
    console.error("Chatbot query error:", error);
    return res.status(500).json({ error: "Error processing chatbot query" });
  }
};

/**
 * streamChatbot
 * (Optional) Streams the AI-generated response back to the client.
 * It performs the same advanced RAG check and system prompt injection as queryChatbot.
 */
exports.streamChatbot = async (req, res, next) => {
  try {
    const { chat, history } = req.body;
    if (!chat) {
      return res.status(400).json({ error: "Message is required" });
    }
    
    if (!isQueryValid(chat)) {
      return res.status(400).json({ error: "This chatbot only answers questions about 3D printing and does not provide information about competitors or other companies." });
    }
    
    const systemContext = "You are a specialist in 3D printing and design. Answer only questions related to 3D printing, 3D modeling, STL files, slicing, and additive manufacturing. If asked about competitors or other companies, respond with 'I only answer questions about 3D printing.'";
    
    let messages = [{ author: 'system', content: systemContext }];
    if (history && Array.isArray(history)) {
      messages = messages.concat(history);
    }
    messages.push({ author: 'user', content: chat });
    
    const chatInstance = model.startChat({ messages });
    const result = await chatInstance.sendMessageStream({});
    res.writeHead(200, { "Content-Type": "text/plain" });
    for await (const chunk of result.stream) {
      res.write(chunk.text());
    }
    res.end();
  } catch (error) {
    console.error("Chatbot streaming error:", error);
    return res.status(500).json({ error: "Error processing chatbot streaming query" });
  }
};
