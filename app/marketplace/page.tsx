'use client'

import React, { useState } from 'react'
import { ShoppingBag, Code, Palette, Globe, Package, TrendingUp, Star, Clock } from 'lucide-react'

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const products = [
    {
      id: 1,
      name: 'Bitcoin Payment Gateway SDK',
      description: 'Complete payment processing solution for Bitcoin applications',
      category: 'Development',
      price: '2,500,000 $bJobs',
      rating: 4.8,
      sales: 142,
      author: 'CryptoDevs',
      icon: <Code className="w-6 h-6" />
    },
    {
      id: 2,
      name: 'Lightning Network UI Kit',
      description: 'Beautiful React components for Lightning applications',
      category: 'Design',
      price: '1,000,000 $bJobs',
      rating: 4.9,
      sales: 89,
      author: 'DesignLabs',
      icon: <Palette className="w-6 h-6" />
    },
    {
      id: 3,
      name: 'BSV Smart Contract Templates',
      description: 'Production-ready smart contracts for common use cases',
      category: 'Templates',
      price: '3,500,000 $bJobs',
      rating: 4.7,
      sales: 67,
      author: 'SmartContracts.io',
      icon: <Package className="w-6 h-6" />
    },
    {
      id: 4,
      name: 'Bitcoin Analytics Dashboard',
      description: 'Real-time blockchain analytics and monitoring tools',
      category: 'Analytics',
      price: '5,000,000 $bJobs',
      rating: 4.9,
      sales: 234,
      author: 'DataChain',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      id: 5,
      name: 'Multi-Sig Wallet Template',
      description: 'Secure multi-signature wallet implementation',
      category: 'Security',
      price: '4,000,000 $bJobs',
      rating: 5.0,
      sales: 156,
      author: 'SecureWallets',
      icon: <Package className="w-6 h-6" />
    },
    {
      id: 6,
      name: 'Bitcoin API Wrapper',
      description: 'Simplified API for Bitcoin node interactions',
      category: 'Development',
      price: '1,500,000 $bJobs',
      rating: 4.6,
      sales: 312,
      author: 'APIBuilder',
      icon: <Globe className="w-6 h-6" />
    }
  ]

  const categories = ['All', 'Development', 'Design', 'Templates', 'Analytics', 'Security']

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  )

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <ShoppingBag className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Bitcoin <span className="turquoise-gradient">Marketplace</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Buy and sell Bitcoin development tools and resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total Products</div>
            <div className="text-2xl font-light text-white mt-2">1,234</div>
          </div>
          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Active Sellers</div>
            <div className="text-2xl font-light" style={{ color: '#40e0d0' }}>456</div>
          </div>
          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total Sales</div>
            <div className="text-2xl font-light text-white mt-2">5,678</div>
          </div>
          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Volume (24h)</div>
            <div className="text-2xl font-light text-white mt-2">89M $bJobs</div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap"
              style={{
                background: selectedCategory === category 
                  ? 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                  : 'rgba(255, 255, 255, 0.03)',
                border: '1px solid',
                borderColor: selectedCategory === category 
                  ? 'transparent'
                  : 'rgba(255, 255, 255, 0.12)',
                color: selectedCategory === category ? 'black' : 'white'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className="rounded-xl p-6 border backdrop-blur-sm transition-all cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(64, 224, 208, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg" style={{ background: 'rgba(64, 224, 208, 0.1)' }}>
                  <div style={{ color: '#40e0d0' }}>
                    {product.icon}
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded"
                  style={{ 
                    background: 'rgba(64, 224, 208, 0.1)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    color: '#40e0d0'
                  }}
                >
                  {product.category}
                </span>
              </div>

              <h3 className="text-lg font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
                {product.name}
              </h3>
              <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-lg font-light" style={{ color: '#40e0d0' }}>
                    {product.price}
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    by {product.author}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ color: '#40e0d0', fill: '#40e0d0' }} />
                    <span className="text-sm text-white">{product.rating}</span>
                  </div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    {product.sales} sales
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 text-black rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  Buy Now
                </button>
                <button className="px-4 py-2 border text-white rounded-lg text-sm transition-all"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                    e.currentTarget.style.borderColor = '#40e0d0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl border backdrop-blur-sm text-center"
          style={{
            background: 'rgba(64, 224, 208, 0.05)',
            borderColor: 'rgba(64, 224, 208, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
            Want to sell your products?
          </h3>
          <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Join our marketplace and reach thousands of Bitcoin developers
          </p>
          <button className="px-6 py-3 text-black rounded-lg font-medium transition-all"
            style={{
              background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(64, 224, 208, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Become a Seller
          </button>
        </div>
      </div>
    </div>
  )
}