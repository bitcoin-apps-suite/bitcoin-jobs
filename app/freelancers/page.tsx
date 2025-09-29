'use client'

import React, { useState } from 'react'
import { Users, Search, Filter, Star, Award, MapPin } from 'lucide-react'

export default function FreelancersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  const freelancers = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Bitcoin Core Developer',
      location: 'San Francisco, CA',
      hourlyRate: '150',
      rating: 4.9,
      completedJobs: 42,
      skills: ['Bitcoin', 'C++', 'Cryptography', 'P2P Networks'],
      availability: 'Available',
      image: '/api/placeholder/100/100'
    },
    {
      id: 2,
      name: 'Marcus Williams',
      title: 'Smart Contract Engineer',
      location: 'Remote',
      hourlyRate: '120',
      rating: 4.8,
      completedJobs: 28,
      skills: ['BSV', 'sCrypt', 'TypeScript', 'Node.js'],
      availability: 'Available',
      image: '/api/placeholder/100/100'
    },
    {
      id: 3,
      name: 'Elena Rodriguez',
      title: 'Blockchain Architect',
      location: 'London, UK',
      hourlyRate: '200',
      rating: 5.0,
      completedJobs: 67,
      skills: ['Bitcoin SV', 'System Design', 'Microservices', 'Docker'],
      availability: 'Busy',
      image: '/api/placeholder/100/100'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Lightning Network Developer',
      location: 'Seoul, Korea',
      hourlyRate: '130',
      rating: 4.7,
      completedJobs: 35,
      skills: ['Lightning', 'Golang', 'React', 'GraphQL'],
      availability: 'Available',
      image: '/api/placeholder/100/100'
    }
  ]

  const allSkills = Array.from(new Set(freelancers.flatMap(f => f.skills)))

  const filteredFreelancers = freelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          freelancer.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSkills = selectedSkills.length === 0 || 
                          selectedSkills.some(skill => freelancer.skills.includes(skill))
    return matchesSearch && matchesSkills
  })

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
            Find <span className="turquoise-gradient">Freelancers</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Connect with top Bitcoin developers worldwide
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
              <input
                type="text"
                placeholder="Search freelancers..."
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
            <button className="px-6 py-3 border text-white rounded-lg font-medium transition-all inline-flex items-center"
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
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {allSkills.map(skill => (
              <button
                key={skill}
                onClick={() => {
                  setSelectedSkills(prev =>
                    prev.includes(skill) 
                      ? prev.filter(s => s !== skill)
                      : [...prev, skill]
                  )
                }}
                className="px-3 py-1 rounded-full text-sm transition-all"
                style={{
                  background: selectedSkills.includes(skill) 
                    ? 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                    : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid',
                  borderColor: selectedSkills.includes(skill) 
                    ? 'transparent'
                    : 'rgba(255, 255, 255, 0.12)',
                  color: selectedSkills.includes(skill) ? 'black' : 'white'
                }}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map(freelancer => (
            <div 
              key={freelancer.id}
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
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-turquoise-400 to-cyan-500" />
                <div className="flex-1">
                  <h3 className="text-lg font-light text-white mb-1" style={{ letterSpacing: '-0.01em' }}>
                    {freelancer.name}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                    {freelancer.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                    <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {freelancer.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" style={{ color: '#40e0d0', fill: '#40e0d0' }} />
                  <span className="text-white font-light">{freelancer.rating}</span>
                  <span className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    ({freelancer.completedJobs} jobs)
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-light text-white">
                    ${freelancer.hourlyRate}/hr
                  </div>
                  <div className="text-xs" style={{ 
                    color: freelancer.availability === 'Available' ? '#40e0d0' : 'rgba(255, 255, 255, 0.5)' 
                  }}>
                    {freelancer.availability}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {freelancer.skills.slice(0, 3).map(skill => (
                  <span 
                    key={skill}
                    className="px-2 py-1 text-xs rounded"
                    style={{ 
                      background: 'rgba(64, 224, 208, 0.1)',
                      border: '1px solid rgba(64, 224, 208, 0.3)',
                      color: '#40e0d0'
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {freelancer.skills.length > 3 && (
                  <span className="px-2 py-1 text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    +{freelancer.skills.length - 3}
                  </span>
                )}
              </div>

              <button className="w-full mt-4 px-4 py-2 border text-white rounded-lg text-sm transition-all"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.color = 'black'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.color = 'white'
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}