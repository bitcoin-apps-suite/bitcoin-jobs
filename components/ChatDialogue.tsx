'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Briefcase } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const ChatDialogue = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Bitcoin Jobs! 🚀 I'm here to help you find your perfect job or hire amazing talent on the Bitcoin blockchain. What brings you here today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('hire')) {
      return "Great! We have various opportunities in blockchain development, smart contracts, and Bitcoin-related projects. Would you like to browse current openings or post a job?"
    }
    
    if (lowerMessage.includes('post') || lowerMessage.includes('employer')) {
      return "Perfect! Posting a job on Bitcoin Jobs is simple. You can create smart contract-based agreements with automatic payments. Click 'Post a Job' to get started!"
    }
    
    if (lowerMessage.includes('browse') || lowerMessage.includes('find') || lowerMessage.includes('search')) {
      return "Excellent choice! We have jobs in development, design, marketing, and more. All payments are handled through Bitcoin SV. Check out our Jobs page to see current listings!"
    }
    
    if (lowerMessage.includes('bitcoin') || lowerMessage.includes('bsv') || lowerMessage.includes('blockchain')) {
      return "Bitcoin Jobs leverages Bitcoin SV's blockchain for transparent, secure job contracts and instant micropayments. Every agreement is immutable and verifiable!"
    }
    
    if (lowerMessage.includes('pay') || lowerMessage.includes('salary') || lowerMessage.includes('rate')) {
      return "All payments on our platform are in Bitcoin SV. Employers can set up milestone-based payments, hourly rates, or fixed project fees - all handled through smart contracts!"
    }
    
    if (lowerMessage.includes('contract') || lowerMessage.includes('agreement')) {
      return "Our smart contracts ensure both parties are protected. Funds are locked when a contract is created and released automatically upon milestone completion. No middleman needed!"
    }
    
    if (lowerMessage.includes('start') || lowerMessage.includes('begin') || lowerMessage.includes('how')) {
      return "Getting started is easy! Sign up with your Bitcoin wallet, complete your profile, and you can immediately start browsing jobs or posting opportunities. Want me to guide you through it?"
    }
    
    return "That's interesting! Feel free to explore our platform. You can browse jobs, check out the marketplace, or learn more about our $bJobs token. What would you like to know more about?"
  }

  const handleSend = () => {
    if (inputText.trim() === '') return

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-dialogue">
      <div className="chat-header">
        <Briefcase size={24} className="chat-icon" />
        <div className="chat-header-text">
          <h3>Bitcoin Jobs Assistant</h3>
          <span className="chat-status">Always online</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-avatar">
              {message.sender === 'user' ? (
                <User size={20} />
              ) : (
                <Bot size={20} />
              )}
            </div>
            <div className="message-content">
              <div className="message-bubble">
                {message.text}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-avatar">
              <Bot size={20} />
            </div>
            <div className="message-content">
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about jobs, contracts, or Bitcoin payments..."
          className="chat-input"
        />
        <button
          onClick={handleSend}
          className="chat-send-button"
          disabled={inputText.trim() === ''}
        >
          <Send size={20} />
        </button>
      </div>

      <style jsx>{`
        .chat-dialogue {
          width: 100%;
          max-width: 500px;
          height: 600px;
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(64, 224, 208, 0.3);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(64, 224, 208, 0.2);
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: linear-gradient(135deg, #40e0d0 0%, #00ced1 100%);
          color: black;
        }

        .chat-icon {
          color: black;
        }

        .chat-header-text h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .chat-status {
          font-size: 12px;
          opacity: 0.8;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          display: flex;
          gap: 10px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .user-message {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bot-message .message-avatar {
          background: linear-gradient(135deg, #40e0d0 0%, #00ced1 100%);
          color: black;
        }

        .user-message .message-avatar {
          background: rgba(255, 255, 255, 0.1);
          color: #40e0d0;
        }

        .message-content {
          max-width: 70%;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 14px;
          line-height: 1.4;
        }

        .bot-message .message-bubble {
          background: rgba(64, 224, 208, 0.1);
          color: white;
          border: 1px solid rgba(64, 224, 208, 0.2);
          border-top-left-radius: 4px;
        }

        .user-message .message-bubble {
          background: linear-gradient(135deg, #40e0d0 0%, #00ced1 100%);
          color: black;
          border-top-right-radius: 4px;
        }

        .message-time {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.4);
          padding: 0 4px;
        }

        .user-message .message-time {
          text-align: right;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 16px;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #40e0d0;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-10px);
          }
        }

        .chat-input-container {
          display: flex;
          gap: 8px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .chat-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 12px 20px;
          color: white;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
        }

        .chat-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(64, 224, 208, 0.5);
        }

        .chat-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .chat-send-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #40e0d0 0%, #00ced1 100%);
          border: none;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .chat-send-button:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .chat-send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Scrollbar styling */
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }

        .chat-messages::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(64, 224, 208, 0.3);
          border-radius: 3px;
        }

        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: rgba(64, 224, 208, 0.5);
        }

        @media (max-width: 640px) {
          .chat-dialogue {
            max-width: 100%;
            height: 500px;
          }
        }
      `}</style>
    </div>
  )
}

export default ChatDialogue