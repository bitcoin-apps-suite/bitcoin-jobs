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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full mr-4">
              <FileText className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Development Contracts</h1>
              <p className="text-xl text-gray-300">Earn $bJobs tokens by contributing to Bitcoin Jobs</p>
            </div>
          </div>
        </div>

        {/* Contract Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Total Allocated</div>
            <div className="text-2xl font-bold text-white">0 $bJobs</div>
            <div className="text-xs text-green-400">Max: 100M (10%)</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Available Contracts</div>
            <div className="text-2xl font-bold text-white">{contracts.available.length}</div>
            <div className="text-xs text-green-400">Ready to start</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-white">{contracts.inProgress.length}</div>
            <div className="text-xs text-yellow-400">Active work</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Completed</div>
            <div className="text-2xl font-bold text-white">{contracts.completed.length}</div>
            <div className="text-xs text-blue-400">Paid out</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {['available', 'inProgress', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-green-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
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
            <div key={contract.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{contract.title}</h3>
                  <p className="text-gray-300 mb-4">{contract.description}</p>
                  
                  {contract.skills && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {contract.skills.map((skill: string) => (
                        <span key={skill} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <div className="flex items-center text-2xl font-bold text-white mb-2">
                    <Coins className="w-6 h-6 mr-2 text-green-400" />
                    {contract.reward} $bJobs
                  </div>
                  {contract.difficulty && (
                    <div className={`text-sm ${getDifficultyColor(contract.difficulty)}`}>
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
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${contract.progress}%` }}
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
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Apply
                    </button>
                  )}
                  
                  {activeTab === 'inProgress' && (
                    <div className="flex items-center text-yellow-400">
                      <AlertCircle className="w-5 h-5 mr-2" />
                      <span>In Progress</span>
                    </div>
                  )}
                  
                  {activeTab === 'completed' && (
                    <div className="flex items-center text-green-400">
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
          <h2 className="text-2xl font-bold text-white mb-6">Contract Rules & Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Token Allocation</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Maximum 10% of total supply (100M tokens) for all contracts</li>
                <li>• Maximum 1% per individual task (10M tokens)</li>
                <li>• Payments released upon milestone completion</li>
                <li>• Smart contract enforced distributions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Quality Requirements</h3>
              <ul className="space-y-2 text-gray-300">
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