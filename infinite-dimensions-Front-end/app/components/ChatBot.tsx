"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { MessageSquare, X, RefreshCw, Send, ArrowDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { chatbotApi } from "../api/apiService"

// Types for our chat messages
type MessageType = "user" | "bot" | "greeting" | "error" | "system"

interface Message {
  id: string
  type: MessageType
  text: string
  timestamp: Date
}

// Suggested questions with predefined answers
const SUGGESTED_QUESTIONS = [
  {
    question: "What 3D printing services do you offer?",
    answer:
      "At Infinite Dimensions, we offer a wide range of 3D printing services including:\n\n• Custom prototyping\n• Small batch production\n• 3D design services\n• Various printing technologies (FDM, SLA, SLS)\n• Multiple material options\n• Post-processing and finishing\n\nYou can explore our services in detail on our website or ask me about any specific service!",
  },
  {
    question: "How much does 3D printing cost?",
    answer:
      "The cost of 3D printing varies based on several factors:\n\n• Size and complexity of the model\n• Material used (PLA, ABS, PETG, Resin, etc.)\n• Print quality and layer height\n• Post-processing requirements\n• Quantity ordered\n\nSmall items typically start at 20-50 TND, while larger or more complex items can range from 100-500+ TND. For an accurate quote, you can upload your 3D model on our slicer page or contact us with your specific requirements.",
  },
  {
    question: "What materials can you print with?",
    answer:
      "We offer a variety of materials to suit different project needs:\n\n• PLA - Standard, biodegradable, good for most projects\n• PLA+ - Enhanced durability and strength\n• ABS - Heat resistant, good for functional parts\n• PETG - Strong, flexible, and water-resistant\n• TPU - Flexible material for elastic parts\n• Nylon - Tough and durable for mechanical parts\n• Resin - High detail for precision models\n\nEach material has different properties and is suitable for different applications. I'd be happy to recommend the best material for your specific project!",
  },
  {
    question: "How long does 3D printing take?",
    answer:
      "The printing time depends on several factors:\n\n• Size of the model - Larger models take longer\n• Complexity - Intricate details require more time\n• Print quality - Higher quality (lower layer height) takes longer\n• Material used - Some materials print slower than others\n\nTypical timeframes:\n• Small items (< 10cm): 2-8 hours\n• Medium items: 8-24 hours\n• Large or complex items: 1-3+ days\n\nWe also need to factor in design time, post-processing, and shipping if applicable. For urgent orders, we do offer expedited services at an additional cost.",
  },
  {
    question: "Can you help with custom designs?",
    answer:
      "Yes, we offer comprehensive custom design services!\n\nOur team of experienced designers can:\n\n• Create 3D models from your sketches or ideas\n• Convert 2D drawings into 3D models\n• Modify existing 3D models to meet your requirements\n• Optimize designs for 3D printing\n• Provide design consultation\n\nThe design process typically involves an initial consultation, concept development, design iterations based on your feedback, and final optimization for printing. You can book a design consultation through our website or provide details about your project directly to us.",
  },
]

// Initial greeting messages
const GREETING_MESSAGES = [
  "👋 Hi there! How can I help you today?",
  "I can answer questions about our 3D printing services, materials, or help you get started with your project.",
]

// Usage limit settings
const DAILY_MESSAGE_LIMIT = 20
const STORAGE_KEY = "chatbot_usage"

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load previous messages from localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatbot_messages")
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages)
        // Convert strings back to Date objects
        const validMessages = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(validMessages)
        setHasGreeted(true)
      } catch (error) {
        console.error("Error parsing stored messages:", error)
      }
    }

    // Check usage limit
    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const storedUsage = localStorage.getItem(STORAGE_KEY)

    if (storedUsage) {
      try {
        const usage = JSON.parse(storedUsage)
        if (usage.date === today) {
          setUsageCount(usage.count)
          setIsLimitReached(usage.count >= DAILY_MESSAGE_LIMIT)
        } else {
          // Reset for new day
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
        }
      } catch (error) {
        console.error("Error checking usage:", error)
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
    }
  }, [])

  // Show greeting if chat is opened and no messages exist
  useEffect(() => {
    if (isOpen && !hasGreeted && messages.length === 0) {
      const greetings = GREETING_MESSAGES.map((text, index) => ({
        id: `greeting-${Date.now() + index}`,
        type: "greeting" as MessageType,
        text,
        timestamp: new Date(Date.now() + index * 800),
      }))

      // Add greeting messages with delay
      setTimeout(() => {
        setMessages(greetings)
        setHasGreeted(true)
      }, 500)
    }
  }, [isOpen, hasGreeted, messages.length])

  // Save messages to localStorage when updated
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages))
    }
  }, [messages])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping])

  // Check if we need to show the scroll button
  useEffect(() => {
    const checkScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
        setShowScrollButton(!isNearBottom)
      }
    }

    const container = chatContainerRef.current
    if (container) {
      container.addEventListener("scroll", checkScroll)
      return () => container.removeEventListener("scroll", checkScroll)
    }
  }, [isOpen])

  // Handle form submission
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    // Trim input and validate
    const message = inputValue.trim()
    if (!message || isTyping || isLimitReached) return

    // Check usage limit
    if (usageCount >= DAILY_MESSAGE_LIMIT) {
      setIsLimitReached(true)
      const limitMessage: Message = {
        id: `system-${Date.now()}`,
        type: "system",
        text: "You've reached the daily message limit. Please try again tomorrow or contact us directly.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, limitMessage])
      return
    }

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text: message,
      timestamp: new Date(),
    }

    // Update UI
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)
    setMessages((prev) => [...prev, userMessage])

    // Get 5 most recent messages for context
    const recentMessages = [...messages.slice(-5), userMessage]
      .filter((msg) => msg.type === "user" || msg.type === "bot")
      .map((msg) => msg.text)

    try {
      // Increment usage
      const newCount = usageCount + 1
      setUsageCount(newCount)

      // Update localStorage
      const now = new Date()
      const today = now.toISOString().split("T")[0]
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: newCount }))

      // Call the API
      const response = await chatbotApi.sendMessage(message, recentMessages)

      // Create bot message
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: response.text || "I'm sorry, I couldn't process your request at this time.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "error",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (questionObj: (typeof SUGGESTED_QUESTIONS)[0]) => {
    // Create user message with the question
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text: questionObj.question,
      timestamp: new Date(),
    }

    // Create bot message with the predefined answer
    const botMessage: Message = {
      id: `bot-${Date.now() + 1000}`, // Add offset to ensure unique ID
      type: "bot",
      text: questionObj.answer,
      timestamp: new Date(Date.now() + 1000), // Add 1 second to ensure it appears after
    }

    // Add both messages
    setMessages((prev) => [...prev, userMessage, botMessage])
    setShowSuggestions(false)
  }

  // Clear chat history
  const handleClearChat = () => {
    setMessages([])
    localStorage.removeItem("chatbot_messages")
    setShowSuggestions(true)
    setHasGreeted(false)
  }

  // Scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Format message text with newlines
  const formatMessageText = (text: string) => {
    return text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 bg-[#a408c3] text-white p-4 rounded-full shadow-lg hover:bg-[#8a06a3] transition-all"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-full max-w-md bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col"
            style={{ maxHeight: "calc(100vh - 140px)" }}
          >
            {/* Chat header */}
            <div className="flex items-center justify-between bg-[#a408c3] text-white p-4 rounded-t-lg">
              <div>
                <h3 className="font-semibold">Infinite Dimensions Chat</h3>
                <p className="text-xs opacity-80">Ask about our 3D printing services</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleClearChat}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Clear chat"
                >
                  <RefreshCw size={18} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: "400px" }}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-[#a408c3] text-white rounded-tr-none"
                        : message.type === "error"
                          ? "bg-red-100 text-red-800 rounded-tl-none"
                          : message.type === "system"
                            ? "bg-yellow-100 text-yellow-800 rounded-tl-none"
                            : "bg-gray-100 text-gray-800 rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm">{formatMessageText(message.text)}</p>
                    <span className="text-xs opacity-70 mt-1 block text-right">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions */}
              {showSuggestions && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="mt-4"
                >
                  <p className="text-sm text-gray-500 mb-2">Frequently asked questions:</p>
                  <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
                    {SUGGESTED_QUESTIONS.map((q, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="whitespace-nowrap flex-shrink-0 px-3 py-2 bg-[#f9e8ff] text-[#a408c3] rounded-full text-sm hover:bg-[#f0d1ff] transition-colors"
                      >
                        {q.question}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute bottom-20 right-4 p-2 bg-[#a408c3] text-white rounded-full shadow-md"
                onClick={scrollToBottom}
                aria-label="Scroll to bottom"
              >
                <ArrowDown size={18} />
              </motion.button>
            )}

            {/* Input area */}
            <div className="p-4 border-t border-gray-200">
              {isLimitReached ? (
                <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm">
                  You've reached the daily message limit. Please try again tomorrow or contact us directly.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#a408c3]"
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-[#a408c3] text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

