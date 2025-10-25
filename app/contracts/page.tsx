'use client'

import React, { useState } from 'react'
import WorkQueue, { Contract } from '../../components/WorkQueue'
import { ArrowLeft, DollarSign, Clock, TrendingUp, Users } from 'lucide-react'
import Link from 'next/link'

export default function ContractsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [acceptedContracts, setAcceptedContracts] = useState<Contract[]>([])
  const [earnings, setEarnings] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)

  const handleAcceptContract = async (contract: Contract) => {
    console.log('Contract accepted:', contract)
    
    // In production, this would:
    // 1. Fork the GitHub repo
    // 2. Create a branch for the contract
    // 3. Start the timer
    // 4. Update blockchain state
    // 5. Send notification to user
    
    setAcceptedContracts([...acceptedContracts, { 
      ...contract, 
      status: 'in_progress',
      acceptedBy: userId || 'anonymous',
      acceptedAt: new Date().toISOString()
    }])
    
    // Simulate GitHub fork
    alert(`Contract "${contract.title}" accepted!\n\nNext steps:\n1. GitHub repo will be forked\n2. Your IDE will open with the task\n3. You have ${contract.timeEstimate.max} hours to complete\n4. Submit PR when done\n5. Get paid $${contract.compensation.amount} + ${contract.compensation.equity}% equity`)
  }

  const handleLogin = () => {
    // In production, this would connect to HandCash or other auth
    setIsAuthenticated(true)
    setUserId('demo-user-' + Math.random().toString(36).substr(2, 9))
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <h1 className="text-2xl font-bold">
                <span className="text-turquoise">Contract</span> Queue
              </h1>
            </div>
            
            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                className="px-6 py-2 bg-turquoise text-black font-semibold rounded-lg hover:bg-turquoise/90 transition-colors"
              >
                Sign In to Accept Contracts
              </button>
            ) : (
              <div className="flex items-center gap-6">
                <div className="text-sm">
                  <span className="text-gray-400">Signed in as:</span>
                  <span className="ml-2 text-turquoise font-semibold">{userId}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-xs text-gray-400">Potential Earnings</div>
                <div className="text-lg font-bold text-white">${earnings}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-xs text-gray-400">Active Contracts</div>
                <div className="text-lg font-bold text-white">{acceptedContracts.length}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-turquoise" />
              <div>
                <div className="text-xs text-gray-400">Completed</div>
                <div className="text-lg font-bold text-white">{completedCount}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <div className="text-xs text-gray-400">Global Rank</div>
                <div className="text-lg font-bold text-white">-</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Work Queue */}
      <div className="flex">
        {/* Left Sidebar - Quick Stats */}
        <div className="w-64 bg-gray-900/30 border-r border-gray-800 p-4 hidden lg:block">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300">
              💻 Development Only
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300">
              ✍️ Writing Only
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300">
              🎨 Design Only
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300">
              🧪 Testing Only
            </button>
          </div>

          <h3 className="text-sm font-semibold text-gray-400 mb-4 mt-8 uppercase tracking-wider">
            Your Stats
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Success Rate</span>
              <span className="text-white">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Time</span>
              <span className="text-white">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Equity</span>
              <span className="text-turquoise">0%</span>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-turquoise/20 to-blue-500/20 rounded-lg border border-turquoise/30">
            <h4 className="text-sm font-semibold text-turquoise mb-2">Pro Tip</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Complete contracts faster to unlock higher-paying expert contracts and bonus multipliers!
            </p>
          </div>
        </div>

        {/* Main Queue */}
        <div className="flex-1">
          <WorkQueue
            userId={userId || undefined}
            isAuthenticated={isAuthenticated}
            onAcceptContract={handleAcceptContract}
          />
        </div>

        {/* Right Sidebar - Live Activity */}
        <div className="w-64 bg-gray-900/30 border-l border-gray-800 p-4 hidden xl:block">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
            Live Activity
          </h3>
          <div className="space-y-3">
            <div className="text-xs">
              <div className="text-green-500 font-semibold">✓ Completed</div>
              <div className="text-gray-300">Add Dark Mode Toggle</div>
              <div className="text-gray-500">by dev_alice • 2m ago</div>
            </div>
            <div className="text-xs">
              <div className="text-yellow-500 font-semibold">⚡ Accepted</div>
              <div className="text-gray-300">Create Logo Design</div>
              <div className="text-gray-500">by designer_bob • 5m ago</div>
            </div>
            <div className="text-xs">
              <div className="text-blue-500 font-semibold">+ New</div>
              <div className="text-gray-300">Write API Docs</div>
              <div className="text-gray-500">$30 contract • just now</div>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-gray-400 mb-4 mt-8 uppercase tracking-wider">
            Leaderboard
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">🥇</span>
                <span className="text-gray-300">alice_dev</span>
              </div>
              <span className="text-turquoise font-semibold">$1,250</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🥈</span>
                <span className="text-gray-300">bob_coder</span>
              </div>
              <span className="text-turquoise font-semibold">$980</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-orange-600">🥉</span>
                <span className="text-gray-300">charlie_ui</span>
              </div>
              <span className="text-turquoise font-semibold">$875</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}