'use client'

import React, { useState, useMemo } from 'react'
import { Search, MapPin, DollarSign, Clock, Filter, Briefcase, Users, Building, Globe } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

interface Job {
  id: number
  title: string
  company: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  salary: string
  description: string
  requirements: string[]
  posted: Date
  category: string
  experience: string
  skills: string[]
  bitcoin: boolean
}

const mockJobs: Job[] = [
  {
    id: 1,
    title: 'Senior Bitcoin Developer',
    company: 'Bitcoin Corp',
    location: 'Remote',
    type: 'Full-time',
    salary: '500,000 - 800,000 sats/month',
    description: 'We are looking for an experienced Bitcoin developer to join our team and work on cutting-edge blockchain applications.',
    requirements: ['5+ years experience with Bitcoin/BSV', 'Smart contract development', 'Node.js expertise'],
    posted: new Date('2024-01-15'),
    category: 'Engineering',
    experience: 'Senior',
    skills: ['Bitcoin', 'BSV', 'sCrypt', 'Node.js'],
    bitcoin: true
  },
  {
    id: 2,
    title: 'Blockchain Product Manager',
    company: 'Satoshi Labs',
    location: 'London, UK',
    type: 'Full-time',
    salary: '£70,000 - £90,000',
    description: 'Lead product development for our suite of Bitcoin applications.',
    requirements: ['3+ years PM experience', 'Blockchain knowledge', 'Agile methodology'],
    posted: new Date('2024-01-20'),
    category: 'Product',
    experience: 'Mid-level',
    skills: ['Product Management', 'Blockchain', 'Agile'],
    bitcoin: true
  },
  {
    id: 3,
    title: 'Smart Contract Developer',
    company: 'DeFi Solutions',
    location: 'San Francisco, CA',
    type: 'Contract',
    salary: '$150/hour',
    description: 'Develop and audit smart contracts for DeFi protocols on Bitcoin SV.',
    requirements: ['sCrypt expertise', 'Security auditing experience', 'DeFi protocol knowledge'],
    posted: new Date('2024-01-22'),
    category: 'Engineering',
    experience: 'Senior',
    skills: ['sCrypt', 'Smart Contracts', 'DeFi', 'Security'],
    bitcoin: true
  }
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesType = typeFilter === 'all' || job.type === typeFilter
      const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter
      
      return matchesSearch && matchesLocation && matchesType && matchesCategory
    })
  }, [searchTerm, locationFilter, typeFilter, categoryFilter])

  const categories = ['all', 'Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations']
  const jobTypes = ['all', 'Full-time', 'Part-time', 'Contract', 'Remote']

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Find Your Next <span className="turquoise-gradient">Bitcoin</span> Job
          </h1>
          <p className="mb-8" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Discover opportunities in the Bitcoin ecosystem
          </p>
        </div>

        {/* Search and Filters */}
        <div 
          className="rounded-xl p-6 mb-8 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg text-white focus:outline-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#40e0d0';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full md:w-48 pl-10 pr-4 py-3 border rounded-lg text-white focus:outline-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#40e0d0';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 text-black rounded-lg font-medium flex items-center gap-2 transition-all"
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
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/20">
              <div>
                <label className="block text-gray-300 mb-2">Job Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Payment Type</label>
                <select 
                  className="w-full px-4 py-2 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  <option>All</option>
                  <option>Bitcoin Only</option>
                  <option>Fiat & Bitcoin</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8" style={{ color: '#40e0d0' }} />
              <div>
                <div className="text-2xl font-bold text-white">{filteredJobs.length}</div>
                <div className="text-gray-400">Active Jobs</div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3">
              <Building className="w-8 h-8" style={{ color: '#40e0d0' }} />
              <div>
                <div className="text-2xl font-bold text-white">125</div>
                <div className="text-gray-400">Companies</div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8" style={{ color: '#40e0d0' }} />
              <div>
                <div className="text-2xl font-bold text-white">3,450</div>
                <div className="text-gray-400">Freelancers</div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8" style={{ color: '#40e0d0' }} />
              <div>
                <div className="text-2xl font-bold text-white">52</div>
                <div className="text-gray-400">Countries</div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map(job => (
            <div 
              key={job.id} 
              className="rounded-xl p-6 border transition-all backdrop-blur-sm cursor-pointer"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(64, 224, 208, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-light text-white mb-1" style={{ letterSpacing: '-0.01em' }}>{job.title}</h3>
                      <div className="flex items-center gap-4 text-gray-300">
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format(job.posted, 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                    {job.bitcoin && (
                      <div 
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          background: 'rgba(64, 224, 208, 0.2)',
                          color: '#40e0d0',
                          border: '1px solid rgba(64, 224, 208, 0.3)'
                        }}
                      >
                        ₿ Bitcoin
                      </div>
                    )}
                  </div>

                  <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map(skill => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          background: 'rgba(64, 224, 208, 0.1)',
                          color: '#40e0d0',
                          border: '1px solid rgba(64, 224, 208, 0.3)',
                          fontWeight: '400'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-gray-300">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </span>
                      <span className="text-sm text-gray-400">
                        {job.experience}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="px-4 py-2 border text-white rounded-lg transition-all"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                          e.currentTarget.style.borderColor = '#40e0d0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        }}
                      >
                        View Details
                      </Link>
                      <button 
                        className="px-4 py-2 text-black rounded-lg font-medium transition-all"
                        style={{
                          background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 5px 15px rgba(64, 224, 208, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {filteredJobs.length > 0 && (
          <div className="text-center mt-8">
            <button 
              className="px-8 py-3 border text-white rounded-lg font-medium transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.borderColor = '#40e0d0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Load More Jobs
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No jobs found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}