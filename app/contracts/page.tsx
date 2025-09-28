'use client'

import React, { useState } from 'react'
import { Briefcase, FileText, Clock, CheckCircle, AlertCircle, Coins } from 'lucide-react'

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState('available')

  const contracts: Record<string, any[]> = {
    available: [
      {
        id: 1,
        title: 'Frontend UI Development',
        description: 'Build responsive React components for jobs interface',
        reward: '5,000,000',
        difficulty: 'Medium',
        deadline: '2 weeks',
        skills: ['React', 'TypeScript', 'Tailwind CSS']
      },
      {
        id: 2,
        title: 'API Integration',
        description: 'Integrate Bitcoin SV blockchain API for payments and data storage',
        reward: '8,000,000',
        difficulty: 'Hard',
        deadline: '3 weeks',
        skills: ['Node.js', 'BSV SDK', 'REST APIs']
      },
      {
        id: 3,
        title: 'Smart Contract Development',
        description: 'Build sCrypt smart contracts for automated jobs workflows',
        reward: '10,000,000',
        difficulty: 'Expert',
        deadline: '4 weeks',
        skills: ['sCrypt', 'Smart Contracts', 'BSV']
      }
    ],
    inProgress: [
      {
        id: 4,
        title: 'Database Schema Design',
        description: 'Design and implement PostgreSQL schema for jobs data',
        reward: '3,000,000',
        difficulty: 'Easy',
        progress: 60,
        contractor: 'dev@example.com'
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Project Setup',
        description: 'Initialize Next.js project with TypeScript and Tailwind',
        reward: '1,000,000',
        difficulty: 'Easy',
        contractor: 'setup@example.com',
        completedDate: '2024-12-01'
      }
    ]
  }

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-400'
      case 'Medium': return 'text-yellow-400'  
      case 'Hard': return 'text-orange-400'
      case 'Expert': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <FileText className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Development <span className="turquoise-gradient">Contracts</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Earn $bJobs tokens by contributing to Bitcoin Jobs
          </p>
        </div>

        {/* Contract Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Total Allocated</div>
            <div className="text-2xl font-bold text-white">0 $bJobs</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>Max: 100M (10%)</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Available Contracts</div>
            <div className="text-2xl font-bold text-white">{contracts.available.length}</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>Ready to start</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-white">{contracts.inProgress.length}</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>Active work</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Completed</div>
            <div className="text-2xl font-bold text-white">{contracts.completed.length}</div>
            <div className="text-xs" style={{ color: '#40e0d0' }}>Paid out</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {['available', 'inProgress', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-6 py-3 rounded-lg font-medium transition-all"
              style={{
                background: activeTab === tab 
                  ? 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                  : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === tab ? '#000' : '#fff',
                border: activeTab === tab 
                  ? 'none' 
                  : '1px solid rgba(255, 255, 255, 0.12)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }
              }}
            >
              {tab === 'available' && 'Available'}
              {tab === 'inProgress' && 'In Progress'}  
              {tab === 'completed' && 'Completed'}
            </button>
          ))}
        </div>

        {/* Contract Lists */}
        <div className="space-y-6">
          {contracts[activeTab].map((contract) => (
            <div 
              key={contract.id} 
              className="rounded-xl p-8 border backdrop-blur-sm transition-all"
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
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{contract.title}</h3>
                  <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>{contract.description}</p>
                  
                  {contract.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {contract.skills.map((skill: string) => (
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
                  )}
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold text-white mb-2">
                    <Coins className="w-6 h-6 mr-2" style={{ color: '#40e0d0' }} />
                    {contract.reward} $bJobs
                  </div>
                  {contract.difficulty && (
                    <div className="text-sm" style={{ color: getDifficultyColor(contract.difficulty) }}>
                      {contract.difficulty}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  {contract.deadline && (
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{contract.deadline}</span>
                    </div>
                  )}
                  
                  {contract.progress && (
                    <div className="flex items-center text-gray-400">
                      <div className="w-32 h-2 bg-gray-700 rounded-full mr-3">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${contract.progress}%`,
                            background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                          }}
                        ></div>
                      </div>
                      <span className="text-sm">{contract.progress}%</span>
                    </div>
                  )}
                  
                  {contract.contractor && (
                    <div className="flex items-center text-gray-400">
                      <span className="text-sm">{contract.contractor}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  {activeTab === 'available' && (
                    <button 
                      className="text-black px-6 py-2 rounded-lg font-medium transition-all"
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
                      Apply
                    </button>
                  )}
                  
                  {activeTab === 'inProgress' && (
                    <div className="flex items-center" style={{ color: '#40e0d0' }}>
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span>In Progress</span>
                    </div>
                  )}
                  
                  {activeTab === 'completed' && (
                    <div className="flex items-center" style={{ color: '#40e0d0' }}>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Completed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rules */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Contract Rules & Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4" style={{ letterSpacing: '-0.01em' }}>Token Allocation</h3>
              <ul className="space-y-2" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                <li>• Maximum 10% of total supply (100M tokens) for all contracts</li>
                <li>• Maximum 1% per individual task (10M tokens)</li>
                <li>• Payments released upon milestone completion</li>
                <li>• Smart contract enforced distributions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4" style={{ letterSpacing: '-0.01em' }}>Quality Requirements</h3>
              <ul className="space-y-2" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                <li>• Code must pass all tests and reviews</li>
                <li>• Documentation required for all deliverables</li>
                <li>• Follow project coding standards</li>
                <li>• Open source contributions under Open-BSV license</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}