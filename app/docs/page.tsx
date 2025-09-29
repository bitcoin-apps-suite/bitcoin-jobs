'use client'

import React, { useState } from 'react'
import { Book, Code, FileText, Terminal, Package, Shield, Zap, ChevronRight } from 'lucide-react'

export default function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState('getting-started')

  const categories = [
    { id: 'getting-started', name: 'Getting Started', icon: <Zap className="w-4 h-4" /> },
    { id: 'api', name: 'API Reference', icon: <Code className="w-4 h-4" /> },
    { id: 'guides', name: 'Guides', icon: <FileText className="w-4 h-4" /> },
    { id: 'contracts', name: 'Smart Contracts', icon: <Terminal className="w-4 h-4" /> },
    { id: 'tokens', name: '$bJobs Token', icon: <Package className="w-4 h-4" /> },
    { id: 'security', name: 'Security', icon: <Shield className="w-4 h-4" /> }
  ]

  const docs = {
    'getting-started': [
      { title: 'Introduction', time: '5 min read' },
      { title: 'Quick Start', time: '3 min read' },
      { title: 'Installation', time: '2 min read' },
      { title: 'Configuration', time: '4 min read' }
    ],
    'api': [
      { title: 'Authentication', time: '6 min read' },
      { title: 'Jobs Endpoint', time: '8 min read' },
      { title: 'Contracts Endpoint', time: '7 min read' },
      { title: 'Webhooks', time: '5 min read' }
    ],
    'guides': [
      { title: 'Post Your First Job', time: '4 min read' },
      { title: 'Create a Contract', time: '6 min read' },
      { title: 'Managing Applications', time: '5 min read' },
      { title: 'Payment Integration', time: '10 min read' }
    ],
    'contracts': [
      { title: 'Smart Contract Architecture', time: '15 min read' },
      { title: 'Deploy Your Contract', time: '8 min read' },
      { title: 'Testing Contracts', time: '7 min read' },
      { title: 'Best Practices', time: '12 min read' }
    ],
    'tokens': [
      { title: 'Tokenomics', time: '10 min read' },
      { title: 'Earning $bJobs', time: '5 min read' },
      { title: 'Staking Guide', time: '7 min read' },
      { title: 'Governance', time: '8 min read' }
    ],
    'security': [
      { title: 'Security Overview', time: '8 min read' },
      { title: 'Best Practices', time: '10 min read' },
      { title: 'Audit Reports', time: '5 min read' },
      { title: 'Bug Bounty Program', time: '3 min read' }
    ]
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Book className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span className="turquoise-gradient">Documentation</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Everything you need to build with Bitcoin Jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="rounded-xl border backdrop-blur-sm sticky top-6"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <h3 className="font-light text-white" style={{ letterSpacing: '-0.01em' }}>Categories</h3>
              </div>
              <div className="p-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-left"
                    style={{
                      background: selectedCategory === category.id 
                        ? 'rgba(64, 224, 208, 0.1)' 
                        : 'transparent',
                      color: selectedCategory === category.id 
                        ? '#40e0d0' 
                        : 'rgba(255, 255, 255, 0.8)'
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.background = 'transparent'
                      }
                    }}
                  >
                    {category.icon}
                    <span className="font-light text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="rounded-xl p-8 border backdrop-blur-sm mb-6"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              
              <div className="space-y-4">
                {docs[selectedCategory as keyof typeof docs].map((doc, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border transition-all cursor-pointer group"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                      e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
                      e.currentTarget.style.transform = 'translateX(4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                      e.currentTarget.style.transform = 'translateX(0)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-light text-white mb-1" style={{ letterSpacing: '-0.01em' }}>
                          {doc.title}
                        </h3>
                        <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                          {doc.time}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                        style={{ color: '#40e0d0' }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 border backdrop-blur-sm"
                style={{
                  background: 'rgba(64, 224, 208, 0.05)',
                  borderColor: 'rgba(64, 224, 208, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 className="text-lg font-light text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
                  Popular Resources
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: '#40e0d0' }} />
                    <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>API Playground</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: '#40e0d0' }} />
                    <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Code Examples</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: '#40e0d0' }} />
                    <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Video Tutorials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" style={{ color: '#40e0d0' }} />
                    <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>SDK Downloads</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl p-6 border backdrop-blur-sm"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <h3 className="text-lg font-light text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
                  Need Help?
                </h3>
                <p className="text-sm mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Can't find what you're looking for? Our community is here to help.
                </p>
                <button className="px-4 py-2 text-black rounded-lg text-sm font-medium transition-all"
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
                  Join Discord
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}