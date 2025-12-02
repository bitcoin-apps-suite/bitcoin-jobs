'use client'

import React, { useState } from 'react'
import BidAskMarketplace from '../../components/BidAskMarketplace'
import { Shield, TrendingUp, Users, Zap, Lock, DollarSign } from 'lucide-react'

export default function MarketplacePage() {
  const [userType, setUserType] = useState<'client' | 'freelancer'>('freelancer')
  const [userAddress] = useState('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa') // Mock BSV address

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-turquoise">Blockchain</span> Job Marketplace
          </h1>
          <p className="text-gray-400">
            Decentralized job contracts with BSV escrow protection
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-turquoise/10 border-y border-turquoise/30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-turquoise" />
                <span className="text-sm text-gray-300">
                  <span className="font-semibold text-turquoise">100%</span> Escrow Protected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-300">
                  <span className="font-semibold text-green-500">Smart Contract</span> Secured
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-300">
                  <span className="font-semibold text-yellow-500">Instant</span> BSV Payments
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">View as:</span>
              <button
                onClick={() => setUserType('freelancer')}
                className={`px-3 py-1 rounded ${
                  userType === 'freelancer' 
                    ? 'bg-turquoise text-black font-semibold' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Freelancer
              </button>
              <button
                onClick={() => setUserType('client')}
                className={`px-3 py-1 rounded ${
                  userType === 'client' 
                    ? 'bg-turquoise text-black font-semibold' 
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                Client
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-lg font-semibold text-white mb-4">How Escrow Contracts Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="w-10 h-10 bg-turquoise/20 border border-turquoise rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-turquoise font-bold">1</span>
              </div>
              <p className="text-xs text-gray-400">Client posts job & deposits escrow</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-turquoise/20 border border-turquoise rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-turquoise font-bold">2</span>
              </div>
              <p className="text-xs text-gray-400">Freelancers submit competitive bids</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-turquoise/20 border border-turquoise rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-turquoise font-bold">3</span>
              </div>
              <p className="text-xs text-gray-400">Client accepts bid, funds locked</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-turquoise/20 border border-turquoise rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-turquoise font-bold">4</span>
              </div>
              <p className="text-xs text-gray-400">Work performed per milestones</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-turquoise/20 border border-turquoise rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-turquoise font-bold">5</span>
              </div>
              <p className="text-xs text-gray-400">Client approves, funds released</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-turquoise/20 border border-turquoise rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-turquoise font-bold">6</span>
              </div>
              <p className="text-xs text-gray-400">Both parties rate each other</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-900/30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-turquoise">$125,430</div>
              <div className="text-xs text-gray-400">Total Volume Locked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">342</div>
              <div className="text-xs text-gray-400">Active Contracts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">1,247</div>
              <div className="text-xs text-gray-400">Completed Jobs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">98.5%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Marketplace */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <BidAskMarketplace 
          userAddress={userAddress}
          userType={userType}
        />
      </div>

      {/* Features Section */}
      <div className="bg-gray-900/50 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-turquoise">Trustless</span> Contract Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <Shield className="w-8 h-8 text-turquoise mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Multi-Sig Escrow</h3>
              <p className="text-sm text-gray-400">
                2-of-3 multi-signature contracts ensure funds are secure. Client, freelancer, 
                and optional arbitrator control fund release.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Milestone Payments</h3>
              <p className="text-sm text-gray-400">
                Break projects into milestones with partial payments. Get paid as you 
                complete each phase of the work.
              </p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <Users className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Reputation System</h3>
              <p className="text-sm text-gray-400">
                On-chain reputation scores based on completed contracts. Build trust 
                through successful job completions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}