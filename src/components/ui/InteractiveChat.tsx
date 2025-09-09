'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from './Card'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    },
    {
      id: '2',
      text: "Can you help with customer orders?",
      isUser: true,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isDemoComplete, setIsDemoComplete] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    // Use the chat container's scroll instead of scrollIntoView to avoid page scroll
    if (chatContainerRef.current) {
      // Small delay to ensure DOM has updated
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
        }
      }, 10)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Demo sequence on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTyping(false)
      const demoAiMessage: Message = {
        id: '3',
        text: "Absolutely! I can track orders, update customers, and handle support 24/7.",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, demoAiMessage])
      setIsDemoComplete(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading || !isDemoComplete) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)
    setIsLoading(true)

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      })

      const data = await response.json()
      
      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, aiMessage])
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting right now. Please try again!",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-white/90 to-white/70 dark:from-secondary-900/90 dark:to-secondary-800/70 backdrop-blur-xl border border-white/30 dark:border-secondary-700/30 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-xs text-secondary-500 font-mono bg-secondary-100 dark:bg-secondary-800 px-2 py-1 rounded relative overflow-hidden group animate-ai-badge hover:animate-glow-pulse transition-all duration-300">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-live-blink"></div>
              <span className="relative z-10">AI AGENT LIVE</span>
              <div className="flex gap-0.5 ml-1">
                <div className="w-0.5 h-0.5 bg-secondary-500 rounded-full animate-bounce"></div>
                <div className="w-0.5 h-0.5 bg-secondary-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-0.5 h-0.5 bg-secondary-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </div>
        
        {/* Messages */}
        <div 
          ref={chatContainerRef}
          className="space-y-3 max-h-64 overflow-y-auto chat-scrollbar pr-2"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">AI</span>
                </div>
              )}
              
              <div className={`px-4 py-2 rounded-lg text-sm max-w-xs ${
                message.isUser
                  ? 'bg-secondary-100 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-200 rounded-tr-none'
                  : 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-tl-none'
              }`}>
                {message.text}
              </div>
              
              {message.isUser && (
                <div className="w-8 h-8 bg-secondary-300 dark:bg-secondary-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary-600 dark:text-secondary-300 text-xs font-bold">U</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-lg rounded-tl-none text-sm">
                <div className="flex items-center space-x-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animation-delay-200"></div>
                    <div className="w-2 h-2 bg-primary-600 rounded-full animation-delay-400"></div>
                  </div>
                  <span className="text-xs opacity-70">AI is typing...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="flex space-x-2 border-t border-secondary-200/50 dark:border-secondary-700/50 pt-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isDemoComplete ? "Type your message..." : "Watch the demo..."}
            disabled={isLoading || !isDemoComplete}
            className="flex-1 px-3 py-2 text-sm bg-white/50 dark:bg-secondary-800/50 border border-secondary-200/50 dark:border-secondary-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isLoading || !isDemoComplete}
            className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium rounded-lg hover:from-primary-600 hover:to-accent-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </Card>
  )
}
