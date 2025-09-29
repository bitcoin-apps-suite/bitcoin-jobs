'use client'

import React, { useState } from 'react'
import { FileText, ArrowLeft, DollarSign, Clock, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function NewContractPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    deadline: '',
    requirements: '',
    skills: '',
    difficulty: 'Medium'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Contract will be created once smart contract integration is complete!')
    console.log('Contract data:', formData)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/contracts" className="inline-flex items-center mb-6 text-white hover:text-turquoise-400 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Contracts
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <FileText className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Create New <span className="turquoise-gradient">Contract</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.01em' }}>
            Define development tasks and earn $bJobs tokens
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="rounded-xl p-8 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 className="text-xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Contract Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Contract Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Implement Payment Gateway"
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>

              <div>
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Description *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the work to be done..."
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2" style={{ fontWeight: '300' }}>
                    <DollarSign className="inline w-4 h-4 mr-1" />
                    Reward (in $bJobs) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.reward}
                    onChange={(e) => setFormData({...formData, reward: e.target.value})}
                    placeholder="e.g., 5,000,000"
                    className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.12)'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                  />
                </div>

                <div>
                  <label className="block text-white mb-2" style={{ fontWeight: '300' }}>
                    <Clock className="inline w-4 h-4 mr-1" />
                    Deadline
                  </label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                    placeholder="e.g., 2 weeks"
                    className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.12)'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Difficulty Level</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Requirements</label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="List specific requirements..."
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>

              <div>
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Required Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  placeholder="e.g., React, TypeScript, BSV SDK"
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(64, 224, 208, 0.1)', border: '1px solid rgba(64, 224, 208, 0.3)' }}>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: '#40e0d0' }} />
                <div>
                  <p className="text-sm" style={{ color: '#40e0d0', fontWeight: '400' }}>Important Note</p>
                  <p className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                    Contracts are enforced by smart contracts on the Bitcoin SV blockchain. 
                    Maximum allocation is 1% of total supply (10M tokens) per contract.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Link 
                href="/contracts"
                className="px-8 py-3 border text-white rounded-lg font-medium transition-all inline-block"
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
                Cancel
              </Link>
              <button
                type="submit"
                className="px-8 py-3 text-black rounded-lg font-medium transition-all"
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
                Create Contract
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}