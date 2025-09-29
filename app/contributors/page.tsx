'use client'

import React from 'react'
import { Users, Github, Award, Code, Coffee, Star } from 'lucide-react'

export default function ContributorsPage() {
  const topContributors = [
    {
      name: 'Satoshi Nakamoto',
      role: 'Core Developer',
      contributions: 1247,
      avatar: '/api/placeholder/100/100',
      github: 'satoshi'
    },
    {
      name: 'Alice Chen',
      role: 'Frontend Lead',
      contributions: 892,
      avatar: '/api/placeholder/100/100',
      github: 'alice'
    },
    {
      name: 'Bob Williams',
      role: 'Smart Contract Dev',
      contributions: 734,
      avatar: '/api/placeholder/100/100',
      github: 'bob'
    },
    {
      name: 'Charlie Davis',
      role: 'DevOps',
      contributions: 567,
      avatar: '/api/placeholder/100/100',
      github: 'charlie'
    }
  ]

  const stats = [
    { label: 'Total Contributors', value: '234', icon: <Users className="w-5 h-5" style={{ color: '#40e0d0' }} /> },
    { label: 'Active This Month', value: '89', icon: <Code className="w-5 h-5" style={{ color: '#40e0d0' }} /> },
    { label: 'Pull Requests', value: '1,456', icon: <Github className="w-5 h-5" style={{ color: '#40e0d0' }} /> },
    { label: 'Issues Resolved', value: '892', icon: <Award className="w-5 h-5" style={{ color: '#40e0d0' }} /> }
  ]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Users className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            <span className="turquoise-gradient">Contributors</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            The amazing people building Bitcoin Jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-xl p-6 border backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                {stat.icon}
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{stat.label}</span>
              </div>
              <div className="text-2xl font-light text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-8 border backdrop-blur-sm mb-8"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Top Contributors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topContributors.map((contributor, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-turquoise-400 to-cyan-500" />
                <h3 className="text-lg font-light text-white mb-1" style={{ letterSpacing: '-0.01em' }}>
                  {contributor.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {contributor.role}
                </p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Star className="w-4 h-4" style={{ color: '#40e0d0', fill: '#40e0d0' }} />
                  <span className="text-sm" style={{ color: '#40e0d0' }}>
                    {contributor.contributions} commits
                  </span>
                </div>
                <button className="px-3 py-1 border text-white rounded-full text-sm transition-all inline-flex items-center"
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
                  <Github className="w-3 h-3 mr-1" />
                  {contributor.github}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl p-8 border backdrop-blur-sm text-center"
          style={{
            background: 'rgba(64, 224, 208, 0.05)',
            borderColor: 'rgba(64, 224, 208, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Coffee className="w-12 h-12 mx-auto mb-4" style={{ color: '#40e0d0' }} />
          <h3 className="text-xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
            Become a Contributor
          </h3>
          <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Join us in building the future of Bitcoin Jobs
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
            View on GitHub
          </button>
        </div>
      </div>
    </div>
  )
}