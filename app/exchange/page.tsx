'use client'

import React, { useState } from 'react'
import { Briefcase, ArrowUpDown, TrendingUp, DollarSign, Activity } from 'lucide-react'

export default function ExchangePage() {
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('BSV')
  const [toCurrency, setToCurrency] = useState('bJobs')

  const exchangeRates: Record<string, Record<string, number>> = {
    'BSV': { 'bJobs': 10000, 'USD': 50 },
    'bJobs': { 'BSV': 0.0001, 'USD': 0.005 },
    'USD': { 'BSV': 0.02, 'bJobs': 200 }
  }

  const handleExchange = () => {
    console.log(`Exchanging ${fromAmount} ${fromCurrency} for ${toAmount} ${toCurrency}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-700 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full mr-4">
              <ArrowUpDown className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Bitcoin Jobs Exchange</h1>
              <p className="text-xl text-gray-300">Trade BSV, $bJobs, and other cryptocurrencies</p>
            </div>
          </div>
        </div>

        {/* Exchange Interface */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Currency Exchange</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* From Currency */}
            <div>
              <label className="block text-white mb-2">From</label>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <select 
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full bg-transparent text-white mb-3 focus:outline-none"
                >
                  <option value="BSV">BSV - Bitcoin SV</option>
                  <option value="bJobs">bJobs - Bitcoin Jobs Token</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none"
                />
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-white mb-2">To</label>
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <select 
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full bg-transparent text-white mb-3 focus:outline-none"
                >
                  <option value="bJobs">bJobs - Bitcoin Jobs Token</option>
                  <option value="BSV">BSV - Bitcoin SV</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
                <div className="w-full text-white text-2xl font-bold">
                  {fromAmount ? (parseFloat(fromAmount) * (exchangeRates[fromCurrency]?.[toCurrency] || 1)).toFixed(6) : '0.00'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleExchange}
              className="bg-green-600 hover:bg-green-700 text-white px-12 py-4 rounded-lg font-semibold flex items-center transition-colors"
            >
              Exchange Now <ArrowUpDown className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-white">bJobs Price</h3>
            </div>
            <div className="text-2xl font-bold text-white">$0.005</div>
            <div className="text-sm text-green-400">+5.2% (24h)</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-white">24h Volume</h3>
            </div>
            <div className="text-2xl font-bold text-white">$12,450</div>
            <div className="text-sm text-blue-400">125 BSV traded</div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-lg font-semibold text-white">Market Cap</h3>
            </div>
            <div className="text-2xl font-bold text-white">$5.2M</div>
            <div className="text-sm text-gray-400">1B tokens</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { from: 'BSV', to: 'bJobs', amount: '0.1', value: '1,000', time: '2 min ago' },
              { from: 'bJobs', to: 'USD', amount: '5,000', value: '25', time: '5 min ago' },
              { from: 'USD', to: 'BSV', amount: '100', value: '2', time: '8 min ago' },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <ArrowUpDown className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-white font-medium">{tx.amount} {tx.from} → {tx.to}</div>
                    <div className="text-gray-400 text-sm">{tx.time}</div>
                  </div>
                </div>
                <div className="text-white font-semibold">$${tx.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}