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
    { category: "Development Contracts", percentage: 10, amount: "100,000,000", color: "#40e0d0" },
    { category: "Team & Advisors", percentage: 15, amount: "150,000,000", color: "#40e0d0" },
    { category: "Community Rewards", percentage: 25, amount: "250,000,000", color: "rgba(64, 224, 208, 0.7)" },
    { category: "Liquidity Pool", percentage: 20, amount: "200,000,000", color: "rgba(64, 224, 208, 0.5)" },
    { category: "Marketing & Partnerships", percentage: 10, amount: "100,000,000", color: "rgba(64, 224, 208, 0.3)" },
    { category: "Reserve Fund", percentage: 20, amount: "200,000,000", color: "rgba(255, 255, 255, 0.5)" }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Briefcase className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span className="turquoise-gradient">{tokenStats.symbol}</span> Token
          </h1>
          <p className="mb-6" style={{ fontSize: 'clamp(1.2rem, 2.8vw, 1.8rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.01em', lineHeight: '1.3' }}>
            {tokenStats.name}
          </p>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.01em', lineHeight: '1.5', maxWidth: '900px', margin: '0 auto' }}>
            The native utility token for Bitcoin Jobs, enabling decentralized job marketplace on Bitcoin SV 
            with blockchain verification, smart contracts, and micropayment capabilities.
          </p>
        </div>

        {/* Token Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Total Supply</div>
            <div className="text-2xl font-bold text-white">{tokenStats.totalSupply}</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>Fixed Supply</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Current Price</div>
            <div className="text-2xl font-bold text-white">{tokenStats.price}</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>+0% (24h)</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
            <div className="text-2xl font-bold text-white">{tokenStats.marketCap}</div>
            <div className="text-xs text-gray-400">Circulating Supply</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Contracts Allocated</div>
            <div className="text-2xl font-bold text-white">{tokenStats.contractsAllocated}</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>Max: {tokenStats.maxContractsAllocation}</div>
          </div>
        </div>

        {/* Contract Rules */}
        <div 
          className="rounded-xl p-8 border backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Development Contract Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4" style={{ letterSpacing: '-0.01em' }}>Token Allocation Limits</h3>
              <ul className="space-y-3" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ background: '#40e0d0' }}></div>
                  Maximum 10% of total supply for all contracts
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ background: '#40e0d0' }}></div>
                  Maximum 1% of total supply per individual task
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ background: 'rgba(255, 255, 255, 0.5)' }}></div>
                  Smart contract enforced payment releases
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4" style={{ letterSpacing: '-0.01em' }}>Current Allocation</h3>
              <div className="space-y-4">
                {tokenAllocation.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full mr-3" style={{ background: item.color }}></div>
                      <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: '300' }}>{item.category}</span>
                    </div>
                    <span className="font-medium" style={{ color: '#40e0d0' }}>{item.percentage}%</span>
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