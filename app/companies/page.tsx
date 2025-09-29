'use client'

import React, { useState } from 'react'
import { Building2, Search, Users, MapPin, Briefcase, ExternalLink } from 'lucide-react'

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const companies = [
    {
      id: 1,
      name: 'Bitcoin Corp',
      description: 'Leading Bitcoin infrastructure and development company',
      category: 'Infrastructure',
      location: 'San Francisco, CA',
      size: '50-200 employees',
      openPositions: 8,
      founded: '2019',
      website: 'bitcoincorp.com'
    },
    {
      id: 2,
      name: 'Satoshi Labs',
      description: 'Hardware wallet manufacturer and Bitcoin security solutions',
      category: 'Security',
      location: 'Prague, Czech Republic',
      size: '200-500 employees',
      openPositions: 5,
      founded: '2013',
      website: 'satoshilabs.com'
    },
    {
      id: 3,
      name: 'DeFi Solutions',
      description: 'Decentralized finance protocols built on Bitcoin',
      category: 'DeFi',
      location: 'Remote',
      size: '10-50 employees',
      openPositions: 12,
      founded: '2021',
      website: 'defisolutions.io'
    },
    {
      id: 4,
      name: 'CryptoTech',
      description: 'Enterprise blockchain solutions and consulting',
      category: 'Enterprise',
      location: 'London, UK',
      size: '100-200 employees',
      openPositions: 3,
      founded: '2017',
      website: 'cryptotech.com'
    },
    {
      id: 5,
      name: 'Lightning Labs',
      description: 'Building the Lightning Network for instant Bitcoin payments',
      category: 'Payments',
      location: 'San Francisco, CA',
      size: '20-50 employees',
      openPositions: 6,
      founded: '2016',
      website: 'lightning.engineering'
    },
    {
      id: 6,
      name: 'nChain',
      description: 'Blockchain research and development',
      category: 'Research',
      location: 'London, UK',
      size: '100-200 employees',
      openPositions: 10,
      founded: '2015',
      website: 'nchain.com'
    }
  ]

  const categories = ['All', 'Infrastructure', 'Security', 'DeFi', 'Enterprise', 'Payments', 'Research']

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          company.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || company.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Building2 className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Bitcoin <span className="turquoise-gradient">Companies</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Discover companies building the Bitcoin ecosystem
          </p>
        </div>

        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-white focus:outline-none"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map(company => (
            <div 
              key={company.id}
              className="rounded-xl p-6 border backdrop-blur-sm transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(64, 224, 208, 0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
                    {company.name}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                    {company.description}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs rounded"
                  style={{ 
                    background: 'rgba(64, 224, 208, 0.1)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    color: '#40e0d0'
                  }}
                >
                  {company.category}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {company.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                  <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    {company.size}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" style={{ color: '#40e0d0' }} />
                  <span className="text-sm font-medium" style={{ color: '#40e0d0' }}>
                    {company.openPositions} open positions
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Founded {company.founded}
                  </span>
                  <button className="p-2 rounded-lg transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(64, 224, 208, 0.1)'
                      e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                    }}
                  >
                    <ExternalLink className="w-4 h-4" style={{ color: '#40e0d0' }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}