"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { MessageSquare, Send, X, Bot, User, Trash2, ArrowDown, Volume2, VolumeX } from "lucide-react"
import { usePathname } from "next/navigation"
import { chatbotApi } from "../api/apiService"
import { motion, AnimatePresence } from "framer-motion"

// Types for our chat messages
type MessageType = "user" | "bot" | "greeting" | "error" | "system"

interface Message {
  id: string
  type: MessageType
  text: string
  timestamp: Date
}

// Suggested questions for quick selection
const SUGGESTED_QUESTIONS = [
  "What 3D printing services do you offer?",
  "How much does 3D printing cost?",
  "What materials can you print with?",
  "How long does 3D printing take?",
  "Can you help with custom designs?",
]

// Initial greeting messages
const GREETING_MESSAGES = [
  "👋 Hello! Welcome to Infinite Dimensions. How can I help you today?",
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
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messageSound = useRef<HTMLAudioElement | null>(null)
  const pathname = usePathname()

  // Initialize audio element
  useEffect(() => {
    messageSound.current = new Audio("/message-sound.mp3")
    return () => {
      if (messageSound.current) {
        messageSound.current = null
      }
    }
  }, [])

  // Play sound when new bot message arrives
  const playMessageSound = useCallback(() => {
    if (soundEnabled && messageSound.current) {
      messageSound.current.currentTime = 0
      messageSound.current.play().catch((err) => console.error("Error playing sound:", err))
    }
  }, [soundEnabled])

  // Load usage data from localStorage
  useEffect(() => {
    const today = new Date().toDateString()
    const storedUsage = localStorage.getItem(STORAGE_KEY)
    const storedSoundSetting = localStorage.getItem("chatbot_sound")

    if (storedSoundSetting !== null) {
      setSoundEnabled(JSON.parse(storedSoundSetting))
    }

    if (storedUsage) {
      const { date, count } = JSON.parse(storedUsage)

      if (date === today) {
        setUsageCount(count)
        setIsLimitReached(count >= DAILY_MESSAGE_LIMIT)
      } else {
        // Reset for new day
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }))
    }
  }, [])

  // Show greeting when chat opens for the first time
  useEffect(() => {
    if (isOpen && !hasGreeted && messages.length === 0) {
      const greetingMessages = GREETING_MESSAGES.map((text, index) => ({
        id: `greeting-${index}`,
        type: "greeting" as MessageType,
        text,
        timestamp: new Date(),
      }))

      // Add greeting messages with a delay between them
      const timer1 = setTimeout(() => {
        setMessages([greetingMessages[0]])
      }, 500)

      const timer2 = setTimeout(() => {
        setMessages((prev) => [...prev, greetingMessages[1]])
        playMessageSound()
      }, 2000)

      setHasGreeted(true)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [isOpen, hasGreeted, messages.length, playMessageSound])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
    }
  }, [isOpen])

  // Handle scroll and show scroll button when needed
  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return

      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current
      const isScrolledUp = scrollHeight - scrollTop - clientHeight > 100

      setShowScrollButton(isScrolledUp)
    }

    const container = chatContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
      return () => container.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom()
    }
  }, [messages])

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Load chat history from localStorage on mount
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatbot_messages")
    const storedHasGreeted = localStorage.getItem("chatbot_greeted")

    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages)
        // Convert string timestamps back to Date objects
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      } catch (e) {
        console.error("Failed to parse stored messages:", e)
      }
    }

    if (storedHasGreeted) {
      setHasGreeted(JSON.parse(storedHasGreeted))
    }
  }, [])

  // Save messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatbot_messages", JSON.stringify(messages))
    }
  }, [messages])

  // Save hasGreeted state
  useEffect(() => {
    localStorage.setItem("chatbot_greeted", JSON.stringify(hasGreeted))
  }, [hasGreeted])

  // Save sound setting
  useEffect(() => {
    localStorage.setItem("chatbot_sound", JSON.stringify(soundEnabled))
  }, [soundEnabled])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key to close chat
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Clear chat history
  const clearChat = () => {
    setMessages([])
    setHasGreeted(false)
    localStorage.removeItem("chatbot_messages")
    localStorage.removeItem("chatbot_greeted")

    // Add system message
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      type: "system",
      text: "Chat history has been cleared.",
      timestamp: new Date(),
    }
    setMessages([systemMessage])
  }

  // Toggle sound
  const toggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  // Handle suggested question click
  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    setShowSuggestions(false)
    // Focus the input
    inputRef.current?.focus()
  }

  // Update the handleSendMessage function to match the API's expected format
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!inputValue.trim() || isTyping || isLimitReached) return

    // Create user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      text: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)

    let responseText = "" // Declare responseText here

    try {
      // Update usage count
      const newCount = usageCount + 1
      setUsageCount(newCount)

      const today = new Date().toDateString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: newCount }))

      if (newCount >= DAILY_MESSAGE_LIMIT) {
        setIsLimitReached(true)
      }

      // Get previous messages for context
      const previousMessages = messages
        .filter((msg) => msg.type === "user" || msg.type === "bot")
        .slice(-5)
        .map((msg) => msg.text)

      // Call the chatbot API service
      try {
        const data = await chatbotApi.sendMessage(userMessage.text, previousMessages)
        responseText = data.text || "I'm sorry, I couldn't process your request at this time."
      } catch (apiError) {
        console.error("API call failed:", apiError)
        responseText = "I'm having trouble connecting to my knowledge base. Please try again in a moment."
      }

      // Create bot response
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        text: responseText,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      playMessageSound()
    } catch (error) {
      console.error("Error processing message:", error)

      // Error message
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        type: "error",
        text: "Sorry, I encountered an error processing your request. Please try again later.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed z-50 bottom-6 right-6 p-4 rounded-full shadow-lg transition-colors ${
          isOpen ? "bg-red-500" : "bg-[#a408c3]"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="h-6 w-6 text-white" />
            {!hasGreeted && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </div>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-40 bottom-24 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat header */}
            <div className="bg-[#a408c3] text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-white/20 p-1.5 rounded-full mr-2">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Infinite Dimensions Assistant</h3>
                  <p className="text-xs text-white/70">Ask me anything about 3D printing</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSound}
                  className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  title={soundEnabled ? "Mute sound" : "Enable sound"}
                >
                  {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <button
                  onClick={clearChat}
                  className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  title="Clear chat history"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
                  title="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50" ref={chatContainerRef}>
              {messages.length === 0 && !isTyping && (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 text-center">
                  <div className="bg-[#a408c3]/10 p-3 rounded-full mb-3">
                    <Bot className="h-8 w-8 text-[#a408c3]" />
                  </div>
                  <p className="font-medium text-gray-600 mb-2">Welcome to Infinite Dimensions</p>
                  <p className="text-sm text-gray-500 mb-6">How can I help you today?</p>

                  <div className="w-full max-w-xs">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="w-full text-left mb-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-[#a408c3] hover:bg-[#a408c3]/5 transition-colors text-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`mb-4 ${
                    message.type === "user"
                      ? "flex justify-end"
                      : message.type === "system"
                        ? "flex justify-center"
                        : "flex justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {message.type === "system" ? (
                    <div className="bg-gray-100 text-gray-600 text-xs py-1 px-3 rounded-full">{message.text}</div>
                  ) : (
                    <>
                      {message.type !== "user" && message.type !== "error" && (
                        <div className="w-8 h-8 rounded-full bg-[#a408c3]/10 flex items-center justify-center flex-shrink-0 mr-2">
                          <Bot className="h-4 w-4 text-[#a408c3]" />
                        </div>
                      )}

                      <div
                        className={`max-w-[75%] rounded-2xl p-3 shadow-sm ${
                          message.type === "user"
                            ? "bg-[#a408c3] text-white rounded-br-none"
                            : message.type === "error"
                              ? "bg-red-100 text-red-800 rounded-bl-none"
                              : "bg-white border border-gray-100 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</p>
                      </div>

                      {message.type === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 ml-2">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex justify-start mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#a408c3]/10 flex items-center justify-center flex-shrink-0 mr-2">
                    <Bot className="h-4 w-4 text-[#a408c3]" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 bg-[#a408c3] rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#a408c3] rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#a408c3] rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-24 right-4 bg-[#a408c3] text-white p-2 rounded-full shadow-md hover:bg-[#8a06a3] transition-colors"
                aria-label="Scroll to bottom"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            )}

            {/* Suggested questions */}
            {showSuggestions && messages.length > 0 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2">
                  {SUGGESTED_QUESTIONS.slice(0, 3).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs hover:border-[#a408c3] hover:bg-[#a408c3]/5 transition-colors flex-shrink-0"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Usage limit warning */}
            {usageCount > DAILY_MESSAGE_LIMIT * 0.7 && !isLimitReached && (
              <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-100">
                <p className="text-xs text-yellow-800">
                  You have used {usageCount}/{DAILY_MESSAGE_LIMIT} messages today. For detailed assistance, please
                  consider scheduling a consultation.
                </p>
              </div>
            )}

            {/* Limit reached message */}
            {isLimitReached && (
              <div className="px-4 py-2 bg-red-50 border-t border-red-100">
                <p className="text-xs text-red-800">
                  You've reached your daily message limit. Please contact us directly or schedule a consultation for
                  further assistance.
                </p>
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-4 flex items-center">
              <input
                type="text"
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder={isLimitReached ? "Message limit reached" : "Type your message..."}
                className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#a408c3] focus:border-transparent"
                disabled={isTyping || isLimitReached}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
              />
              <button
                type="submit"
                className={`bg-[#a408c3] text-white px-4 py-3 rounded-r-lg transition-all ${
                  isTyping || !inputValue.trim() || isLimitReached
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#8a06a3] hover:shadow-md"
                }`}
                disabled={isTyping || !inputValue.trim() || isLimitReached}
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

