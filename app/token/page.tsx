'use client'

import React from 'react'
import { Briefcase, Search, TrendingUp, Coins, Award, Target } from 'lucide-react'

export default function TokenPage() {
  const tokenStats = {
    name: "Bitcoin Jobs Token",
    symbol: "$bJobs",
    totalSupply: "1,000,000,000",
    price: "$0.0001", 
    marketCap: "$100,000",
    contractsAllocated: "0%",
    maxContractsAllocation: "10%",
    maxTaskAllocation: "1%",
    holders: "1",
    transactions: "0"
  }

  const tokenAllocation = [
    { category: "Development Contracts", percentage: 10, amount: "100,000,000", color: "bg-green-500" },
    { category: "Team & Advisors", percentage: 15, amount: "150,000,000", color: "bg-green-500" },
    { category: "Community Rewards", percentage: 25, amount: "250,000,000", color: "bg-gray-500" },
    { category: "Liquidity Pool", percentage: 20, amount: "200,000,000", color: "bg-orange-500" },
    { category: "Marketing & Partnerships", percentage: 10, amount: "100,000,000", color: "bg-pink-500" },
    { category: "Reserve Fund", percentage: 20, amount: "200,000,000", color: "bg-gray-500" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full mr-4">
              <Briefcase className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{tokenStats.symbol}</h1>
              <p className="text-xl text-gray-300">{tokenStats.name}</p>
            </div>
          </div>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            The native utility token for Bitcoin Jobs, enabling decentralized job marketplace on bitcoin sv 
            with blockchain verification, smart contracts, and micropayment capabilities.
          </p>
        </div>

        {/* Token Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Total Supply</div>
            <div className="text-2xl font-bold text-white">{tokenStats.totalSupply}</div>
            <div className="text-xs text-green-400">Fixed Supply</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Current Price</div>
            <div className="text-2xl font-bold text-white">{tokenStats.price}</div>
            <div className="text-xs text-green-400">+0% (24h)</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
            <div className="text-2xl font-bold text-white">{tokenStats.marketCap}</div>
            <div className="text-xs text-gray-400">Circulating Supply</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Contracts Allocated</div>
            <div className="text-2xl font-bold text-white">{tokenStats.contractsAllocated}</div>
            <div className="text-xs text-yellow-400">Max: {tokenStats.maxContractsAllocation}</div>
          </div>
        </div>

        {/* Contract Rules */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Development Contract Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Token Allocation Limits</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Maximum 10% of total supply for all contracts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Maximum 1% of total supply per individual task
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                  Smart contract enforced payment releases
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Current Allocation</h3>
              <div className="space-y-4">
                {tokenAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                      <span className="text-white text-sm">{item.category}</span>
                    </div>
                    <span className="text-white font-semibold">{item.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}