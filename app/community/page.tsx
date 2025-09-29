'use client'

import React from 'react'
import { Users, MessageSquare, Calendar, Trophy, Heart, Github, Twitter, Youtube } from 'lucide-react'

export default function CommunityPage() {
  const events = [
    {
      title: 'Bitcoin Jobs Hackathon',
      date: 'February 15-17, 2024',
      location: 'Online',
      participants: '500+',
      prize: '1,000,000 $bJobs'
    },
    {
      title: 'Developer Workshop',
      date: 'February 5, 2024',
      location: 'San Francisco',
      participants: '50',
      prize: 'Free'
    },
    {
      title: 'Community AMA',
      date: 'January 30, 2024',
      location: 'Discord',
      participants: '200+',
      prize: 'Q&A'
    }
  ]

  const stats = [
    { label: 'Community Members', value: '12,456', icon: <Users className="w-6 h-6" /> },
    { label: 'Discord Members', value: '8,234', icon: <MessageSquare className="w-6 h-6" /> },
    { label: 'GitHub Stars', value: '3,456', icon: <Github className="w-6 h-6" /> },
    { label: 'Contributors', value: '234', icon: <Heart className="w-6 h-6" /> }
  ]

  const channels = [
    { name: 'Discord', members: '8,234', icon: <MessageSquare className="w-5 h-5" />, color: '#7289DA' },
    { name: 'GitHub', stars: '3,456', icon: <Github className="w-5 h-5" />, color: '#333' },
    { name: 'Twitter', followers: '15,678', icon: <Twitter className="w-5 h-5" />, color: '#1DA1F2' },
    { name: 'YouTube', subscribers: '5,432', icon: <Youtube className="w-5 h-5" />, color: '#FF0000' }
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
            <span className="turquoise-gradient">Community</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Join the Bitcoin Jobs ecosystem
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
              <div style={{ color: '#40e0d0' }} className="mb-3">
                {stat.icon}
              </div>
              <div className="text-2xl font-light text-white mb-1">{stat.value}</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl p-8 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6" style={{ color: '#40e0d0' }} />
              <h2 className="text-xl font-light text-white" style={{ letterSpacing: '-0.01em' }}>
                Upcoming Events
              </h2>
            </div>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} 
                  className="p-4 rounded-lg transition-all cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
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
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-white font-light mb-1" style={{ letterSpacing: '-0.01em' }}>
                        {event.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {event.date} • {event.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm" style={{ color: '#40e0d0' }}>
                        {event.participants}
                      </div>
                      <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {event.prize}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 px-4 py-3 border text-white rounded-lg font-medium transition-all"
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
              View All Events
            </button>
          </div>

          <div className="rounded-xl p-8 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6" style={{ color: '#40e0d0' }} />
              <h2 className="text-xl font-light text-white" style={{ letterSpacing: '-0.01em' }}>
                Join Our Channels
              </h2>
            </div>
            <div className="space-y-3">
              {channels.map((channel, index) => (
                <button key={index} 
                  className="w-full p-4 rounded-lg transition-all flex items-center justify-between"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div style={{ color: channel.color }}>
                      {channel.icon}
                    </div>
                    <span className="text-white font-light">{channel.name}</span>
                  </div>
                  <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {channel.members || channel.stars || channel.followers || channel.subscribers}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl p-12 border backdrop-blur-sm text-center"
          style={{
            background: 'rgba(64, 224, 208, 0.05)',
            borderColor: 'rgba(64, 224, 208, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Trophy className="w-16 h-16 mx-auto mb-6" style={{ color: '#40e0d0' }} />
          <h2 className="text-2xl font-light text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
            Become a Community Leader
          </h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Help shape the future of Bitcoin Jobs by becoming an active community member. 
            Earn rewards, gain recognition, and connect with developers worldwide.
          </p>
          <div className="flex gap-4 justify-center">
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
              Join Discord
            </button>
            <button className="px-6 py-3 border text-white rounded-lg font-medium transition-all"
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
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}