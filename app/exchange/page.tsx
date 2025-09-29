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
    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      alert('Please enter a valid amount to exchange')
      return
    }
    const calculatedAmount = (parseFloat(fromAmount) * (exchangeRates[fromCurrency]?.[toCurrency] || 1)).toFixed(6)
    alert(`Exchange initiated: ${fromAmount} ${fromCurrency} → ${calculatedAmount} ${toCurrency}`)
  }

  // Update toAmount when fromAmount, fromCurrency, or toCurrency changes
  React.useEffect(() => {
    if (fromAmount && parseFloat(fromAmount) > 0) {
      const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1
      const calculated = (parseFloat(fromAmount) * rate).toFixed(6)
      setToAmount(calculated)
    } else {
      setToAmount('')
    }
  }, [fromAmount, fromCurrency, toCurrency])

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <ArrowUpDown className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Bitcoin Jobs <span className="turquoise-gradient">Exchange</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Trade BSV, $bJobs, and other cryptocurrencies
          </p>
        </div>

        {/* Exchange Interface */}
        <div 
          className="rounded-xl p-8 border backdrop-blur-sm mb-8"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Currency Exchange</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* From Currency */}
            <div>
              <label className="block text-white mb-2">From</label>
              <div 
                className="rounded-lg p-4 border"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.12)'
                }}
              >
                <select 
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full text-white mb-3 focus:outline-none cursor-pointer"
                  style={{
                    fontWeight: '300',
                    background: 'rgba(26, 26, 26, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="BSV" style={{ background: '#1a1a1a' }}>BSV - Bitcoin SV</option>
                  <option value="bJobs" style={{ background: '#1a1a1a' }}>bJobs - Bitcoin Jobs Token</option>
                  <option value="USD" style={{ background: '#1a1a1a' }}>USD - US Dollar</option>
                </select>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full text-white text-2xl focus:outline-none"
                  style={{
                    fontWeight: '300',
                    background: 'transparent',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: '4px',
                    marginTop: '8px'
                  }}
                />
              </div>
            </div>

            {/* To Currency */}
            <div>
              <label className="block text-white mb-2">To</label>
              <div 
                className="rounded-lg p-4 border"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.12)'
                }}
              >
                <select 
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full text-white mb-3 focus:outline-none cursor-pointer"
                  style={{
                    fontWeight: '300',
                    background: 'rgba(26, 26, 26, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    fontSize: '14px'
                  }}
                >
                  <option value="bJobs" style={{ background: '#1a1a1a' }}>bJobs - Bitcoin Jobs Token</option>
                  <option value="BSV" style={{ background: '#1a1a1a' }}>BSV - Bitcoin SV</option>
                  <option value="USD" style={{ background: '#1a1a1a' }}>USD - US Dollar</option>
                </select>
                <div className="w-full text-white text-2xl" style={{ 
                  fontWeight: '300',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '4px',
                  marginTop: '8px',
                  minHeight: '36px'
                }}>
                  {toAmount || '0.00'}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleExchange}
              className="text-black px-12 py-4 rounded-lg font-medium flex items-center transition-all"
              style={{
                background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(64, 224, 208, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Exchange Now <ArrowUpDown className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 mr-3" style={{ color: '#40e0d0' }} />
              <h3 className="text-lg font-medium text-white" style={{ letterSpacing: '-0.01em' }}>bJobs Price</h3>
            </div>
            <div className="text-2xl font-bold text-white">$0.005</div>
            <div className="text-sm" style={{ color: '#40e0d0' }}>+5.2% (24h)</div>
          </div>

          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center mb-4">
              <Activity className="w-8 h-8 mr-3" style={{ color: '#40e0d0' }} />
              <h3 className="text-lg font-medium text-white" style={{ letterSpacing: '-0.01em' }}>24h Volume</h3>
            </div>
            <div className="text-2xl font-bold text-white">$12,450</div>
            <div className="text-sm" style={{ color: '#40e0d0' }}>125 BSV traded</div>
          </div>

          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center mb-4">
              <DollarSign className="w-8 h-8 mr-3" style={{ color: '#40e0d0' }} />
              <h3 className="text-lg font-medium text-white" style={{ letterSpacing: '-0.01em' }}>Market Cap</h3>
            </div>
            <div className="text-2xl font-bold text-white">$5.2M</div>
            <div className="text-sm text-gray-400">1B tokens</div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div 
          className="rounded-xl p-8 border backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { from: 'BSV', to: 'bJobs', amount: '0.1', value: '1,000', time: '2 min ago' },
              { from: 'bJobs', to: 'USD', amount: '5,000', value: '25', time: '5 min ago' },
              { from: 'USD', to: 'BSV', amount: '100', value: '2', time: '8 min ago' },
            ].map((tx, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div className="flex items-center">
                  <ArrowUpDown className="w-5 h-5 mr-3" style={{ color: '#40e0d0' }} />
                  <div>
                    <div className="text-white font-light">{tx.amount} {tx.from} → {tx.to}</div>
                    <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: '300' }}>{tx.time}</div>
                  </div>
                </div>
                <div className="text-white font-light">${tx.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}