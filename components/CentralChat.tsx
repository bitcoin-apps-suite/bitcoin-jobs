'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Briefcase, DollarSign, FileText, Users } from 'lucide-react'
import BAppsMarketplace from './BAppsMarketplace'
import { useHover } from './HoverContext'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const CentralChat = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [selectedApp, setSelectedApp] = useState<{ id: string; role: 'maker' | 'taker' } | null>(null)
  const [mode, setMode] = useState<'offer' | 'find'>('find')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const suggestedPrompts = [
    { icon: Briefcase, text: "Show me available jobs", color: "#40e0d0" },
    { icon: Users, text: "I want to post a job", color: "#10B981" }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('developer') || lowerMessage.includes('bitcoin developer')) {
      return "I found several Bitcoin developer positions available:\n\n• **Senior Bitcoin Core Developer** - Remote, $150k-200k\n• **Smart Contract Engineer** - London/Remote, £80k-120k\n• **Blockchain Backend Developer** - San Francisco, $130k-180k\n\nAll positions offer payment in Bitcoin SV with milestone-based smart contracts. Would you like to see more details?"
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "Payments on Bitcoin Jobs are revolutionary:\n\n💰 **100% Bitcoin SV** - All transactions on-chain\n⚡ **Instant micropayments** - Pay per hour or milestone\n🔒 **Smart contract escrow** - Funds locked until work approved\n✅ **No intermediaries** - Direct peer-to-peer payments\n\nEmployers deposit BSV into smart contracts, and it's automatically released when milestones are met!"
    }
    
    if (lowerMessage.includes('smart contract') || lowerMessage.includes('contract')) {
      return "Our smart contracts are built on Bitcoin SV:\n\n📝 **Immutable agreements** - Terms cannot be changed once signed\n🔐 **Automated escrow** - Funds held securely until conditions met\n⏰ **Time-locked releases** - Payments trigger on milestones\n🌍 **Global accessibility** - No banks or borders\n\nEvery job posting creates a unique smart contract that both parties sign digitally."
    }
    
    if (lowerMessage.includes('hire') || lowerMessage.includes('talent') || lowerMessage.includes('employer')) {
      return "Hiring on Bitcoin Jobs is simple:\n\n1️⃣ **Post your job** - Describe role and set BSV budget\n2️⃣ **Review applications** - See verified work history on-chain\n3️⃣ **Create contract** - Set milestones and payment terms\n4️⃣ **Fund escrow** - Deposit BSV to activate contract\n5️⃣ **Approve & pay** - Release funds as work is completed\n\nOur $bJobs token holders get reduced fees!"
    }
    
    if (lowerMessage.includes('job') || lowerMessage.includes('work') || lowerMessage.includes('find')) {
      return "Let me help you find the perfect opportunity! We have specialized apps for different types of work:\n\n✍️ **Bitcoin Writer** - Content creation, articles, documentation\n💻 **Bitcoin Code** - Development tasks, features, bug fixes\n📸 **Bitcoin Photos** - Photography, image editing\n🎬 **Bitcoin Video** - Video editing, production\n🎨 **Bitcoin Design** - UI/UX, graphics, branding\n🎵 **Bitcoin Music** - Audio production, music creation\n\n👇 Check out the apps below and choose whether you want to **create jobs** (as a maker) or **complete jobs** (as a taker)!"
    }
    
    if (lowerMessage.includes('token') || lowerMessage.includes('bjobs')) {
      return "The $bJobs token powers our ecosystem:\n\n🎯 **Staking rewards** - Earn passive income\n💎 **Fee discounts** - Up to 50% off platform fees\n🗳️ **Governance** - Vote on platform decisions\n🚀 **Early access** - First to see premium jobs\n\nCurrent price: 0.0042 BSV | Market cap: $2.1M"
    }
    
    return "Great question! Bitcoin Jobs is the **'Uber for Developers'** - a marketplace where complex projects get broken down into atomic contracts that developers (enhanced with AI tools) can claim and complete for instant BSV payment.\n\n🚀 **Key Features:**\n• Every task has a human in the loop\n• Use AI tools (ChatGPT, Claude) to 10x your productivity\n• Get paid instantly in BSV for completed work\n• Choose your specialty from our suite of apps\n\n👇 **Select an app below** to get started as a job creator (maker) or job completer (taker)!"
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
    setHasInteracted(true)

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }
  
  const handleAppSelect = (appId: string, role: 'maker' | 'taker') => {
    setSelectedApp({ id: appId, role })
    
    // Add a message to the chat about the selection
    const appName = appId.replace('bitcoin-', '').replace('-', ' ')
    const roleText = role === 'maker' ? 'post jobs' : 'complete jobs'
    
    const botMessage: Message = {
      id: messages.length + 1,
      text: `Excellent! You've selected **Bitcoin ${appName.charAt(0).toUpperCase() + appName.slice(1)}** to ${roleText}. \n\nThis app specializes in ${appName} tasks with instant BSV payments. ${role === 'maker' ? 'You can post jobs and have AI-enhanced freelancers complete them quickly.' : 'You can browse available jobs and use AI tools to complete them faster for more earnings.'}\n\nWould you like to see available ${role === 'maker' ? 'freelancers' : 'jobs'} now?`,
      sender: 'bot',
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, botMessage])
    setHasInteracted(true)
  }

  const handlePromptClick = (prompt: string) => {
    setInputText(prompt)
    handleSend()
  }

  return (
    <div className="central-chat">
      
      {!hasInteracted ? (
        // Initial state - Grok/Gemini style
        <div className="chat-welcome">
          <div className="chat-logo">
            <Briefcase size={48} />
            <span className="logo-text">Bitcoin<span className="highlight">Jobs</span></span>
            <span className="beta-tag">BETA</span>
          </div>
          
          <div className="welcome-title-toggle">
            <button 
              onClick={() => setMode('offer')}
              className={`title-option title-option-hover ${mode === 'offer' ? 'active' : ''}`}
            >
              Offer a Job
            </button>
            <span className="title-divider">or</span>
            <button 
              onClick={() => setMode('find')}
              className={`title-option title-option-hover ${mode === 'find' ? 'active' : ''}`}
            >
              Find a Job
            </button>
          </div>
          
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about jobs, payments, or smart contracts..."
              className="main-input main-input-hover"
              autoFocus
            />
            <button
              onClick={handleSend}
              className="send-button"
              disabled={inputText.trim() === ''}
            >
              <Send size={20} />
            </button>
          </div>


        </div>
      ) : (
        // Conversation state
        <div className="chat-conversation">
          <div className="conversation-header">
            <Briefcase size={24} />
            <span>Bitcoin Jobs Assistant</span>
          </div>

          <div className="messages-container">
            {messages.map(message => (
              <div
                key={message.id}
                className={`message ${message.sender}`}
              >
                <div className="message-content">
                  {message.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="conversation-input-wrapper">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a follow-up question..."
              className="conversation-input"
            />
            <button
              onClick={handleSend}
              className="send-button"
              disabled={inputText.trim() === ''}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .central-chat {
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }

        /* Welcome State Styles */
        .chat-welcome {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 500px;
        }

        .chat-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2rem;
          color: #40e0d0;
        }

        .logo-text {
          font-size: 3rem;
          font-weight: 300;
          color: white;
          letter-spacing: -0.5px;
        }

        .logo-text .highlight {
          font-weight: 600;
          color: #40e0d0;
        }

        .beta-tag {
          padding: 4px 8px;
          background: rgba(64, 224, 208, 0.2);
          border: 1px solid rgba(64, 224, 208, 0.3);
          border-radius: 4px;
          font-size: 10px;
          font-weight: 600;
          color: #40e0d0;
          letter-spacing: 1px;
        }


        .welcome-title-toggle {
          font-size: 2.5rem;
          font-weight: 300;
          color: white;
          margin-bottom: 2rem;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .title-option {
          background: transparent;
          border: 2px solid transparent;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
        }
        
        .title-option-hover {
          color: var(--dock-hover-color, rgba(255, 255, 255, 0.4));
          background: color-mix(in srgb, var(--dock-hover-color) 20%, transparent);
          border-color: var(--dock-hover-color, transparent);
          transition: all 0.3s ease;
          transition: all 0.3s;
          padding: 0.5rem 1.5rem;
          font-size: inherit;
          font-weight: inherit;
          border-radius: 2rem;
          position: relative;
        }

        .title-option:hover:not(.active) {
          color: rgba(255, 255, 255, 0.7);
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
        }

        .title-option.active {
          color: #40e0d0;
          border-color: #40e0d0;
          background: rgba(64, 224, 208, 0.1);
          box-shadow: 0 0 20px rgba(64, 224, 208, 0.3);
        }

        .title-divider {
          color: rgba(255, 255, 255, 0.3);
          font-size: 1.8rem;
        }

        .chat-input-wrapper {
          display: flex;
          width: 100%;
          max-width: 700px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 28px;
          padding: 4px;
          transition: all 0.3s;
          margin-bottom: 2rem;
        }

        .chat-input-wrapper:focus-within {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(64, 224, 208, 0.5);
          box-shadow: 0 0 0 4px rgba(64, 224, 208, 0.1);
        }

        .main-input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 16px 20px;
          color: white;
          font-size: 16px;
          outline: none;
        }

        .main-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.3s ease;
        }
        
        .main-input-hover::placeholder {
          color: var(--dock-hover-color, rgba(255, 255, 255, 0.4));
        }

        .send-button {
          width: 48px;
          height: 48px;
          border-radius: 24px;
          background: linear-gradient(135deg, #40e0d0 0%, #00ced1 100%);
          border: none;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .send-button:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(64, 224, 208, 0.4);
        }

        .send-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .suggested-prompts {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          width: 100%;
          max-width: 700px;
          margin-bottom: 2rem;
        }

        .prompt-card {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }

        .prompt-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(64, 224, 208, 0.3);
          transform: translateY(-2px);
        }

        .feature-tags {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(64, 224, 208, 0.1);
          border: 1px solid rgba(64, 224, 208, 0.2);
          border-radius: 20px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Conversation State Styles */
        .chat-conversation {
          display: flex;
          flex-direction: column;
          height: 600px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
        }

        .conversation-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: rgba(64, 224, 208, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          color: #40e0d0;
          font-weight: 500;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .message {
          max-width: 70%;
          animation: fadeIn 0.3s ease;
        }

        .message.user {
          align-self: flex-end;
        }

        .message.bot {
          align-self: flex-start;
        }

        .message-content {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.5;
          white-space: pre-wrap;
        }

        .message.user .message-content {
          background: linear-gradient(135deg, #40e0d0 0%, #00ced1 100%);
          color: black;
          border-top-right-radius: 4px;
        }

        .message.bot .message-content {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-top-left-radius: 4px;
        }

        .message-content p {
          margin: 0.5em 0;
        }

        .message-content p:first-child {
          margin-top: 0;
        }

        .message-content p:last-child {
          margin-bottom: 0;
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

        .conversation-input-wrapper {
          display: flex;
          padding: 16px;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .conversation-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 12px 20px;
          color: white;
          font-size: 14px;
          outline: none;
          margin-right: 8px;
        }

        .conversation-input:focus {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(64, 224, 208, 0.5);
        }

        /* Scrollbar */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(64, 224, 208, 0.3);
          border-radius: 3px;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }

          .suggested-prompts {
            grid-template-columns: 1fr;
          }

          .chat-conversation {
            height: 500px;
          }
        }
      `}</style>
      
      {/* BApps Marketplace below chat */}
      <div className="bapps-section">
        {(() => {
          const marketplaceMode = mode === 'offer' ? 'post' : 'earn';
          return (
            <BAppsMarketplace 
              onSelectApp={handleAppSelect} 
              initialMode={marketplaceMode} 
            />
          );
        })()}
      </div>
      
      <style jsx>{`
        .bapps-section {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
        }
      `}</style>
    </div>
  )
}

export default CentralChat