'use client'

import React from 'react'
import { GitBranch, Tag, Zap, Bug, Shield, Package } from 'lucide-react'

export default function ChangelogPage() {
  const releases = [
    {
      version: 'v2.1.0',
      date: '2024-01-25',
      type: 'feature',
      changes: [
        'Added smart contract integration for automated payments',
        'New marketplace for development tools and resources',
        'Enhanced freelancer profiles with portfolio showcase',
        'Real-time notifications for contract updates'
      ]
    },
    {
      version: 'v2.0.3',
      date: '2024-01-18',
      type: 'bugfix',
      changes: [
        'Fixed authentication issues with OAuth providers',
        'Resolved contract status sync problems',
        'Improved mobile responsive design',
        'Fixed timezone issues in application deadlines'
      ]
    },
    {
      version: 'v2.0.0',
      date: '2024-01-10',
      type: 'major',
      changes: [
        'Complete UI redesign with turquoise theme',
        'Migration to Bitcoin SV blockchain',
        'Introduction of $bJobs token economy',
        'New decentralized identity system'
      ]
    },
    {
      version: 'v1.9.5',
      date: '2023-12-20',
      type: 'security',
      changes: [
        'Patched XSS vulnerability in job descriptions',
        'Updated dependencies to latest secure versions',
        'Enhanced API rate limiting',
        'Improved wallet connection security'
      ]
    }
  ]

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'feature': return <Zap className="w-5 h-5" style={{ color: '#40e0d0' }} />
      case 'bugfix': return <Bug className="w-5 h-5" style={{ color: '#ffa500' }} />
      case 'major': return <Package className="w-5 h-5" style={{ color: '#40e0d0' }} />
      case 'security': return <Shield className="w-5 h-5" style={{ color: '#ff4444' }} />
      default: return <Tag className="w-5 h-5" style={{ color: '#40e0d0' }} />
    }
  }

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'feature': return 'New Features'
      case 'bugfix': return 'Bug Fixes'
      case 'major': return 'Major Release'
      case 'security': return 'Security Update'
      default: return 'Update'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <GitBranch className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span className="turquoise-gradient">Changelog</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Track our progress and improvements
          </p>
        </div>

        <div className="space-y-6">
          {releases.map((release, index) => (
            <div key={index} 
              className="rounded-xl p-6 border backdrop-blur-sm transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getTypeIcon(release.type)}
                  <div>
                    <h3 className="text-xl font-light text-white" style={{ letterSpacing: '-0.01em' }}>
                      {release.version}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {new Date(release.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 text-xs rounded-full"
                  style={{ 
                    background: 'rgba(64, 224, 208, 0.1)',
                    border: '1px solid rgba(64, 224, 208, 0.3)',
                    color: '#40e0d0'
                  }}
                >
                  {getTypeLabel(release.type)}
                </span>
              </div>
              
              <ul className="space-y-2">
                {release.changes.map((change, changeIndex) => (
                  <li key={changeIndex} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5" 
                      style={{ background: '#40e0d0', flexShrink: 0 }} 
                    />
                    <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {change}
                    </span>
                  </li>
                ))}
              </ul>
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
          <h3 className="text-lg font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
            Stay Updated
          </h3>
          <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Get notified about new releases and features
          </p>
          <button className="px-6 py-2 text-black rounded-lg text-sm font-medium transition-all"
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
            Subscribe to Updates
          </button>
        </div>
      </div>
    </div>
  )
}