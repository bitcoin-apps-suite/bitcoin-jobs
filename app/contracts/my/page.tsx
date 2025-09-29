'use client'

import React from 'react'
import { FileText, Clock, CheckCircle, AlertCircle, Coins } from 'lucide-react'
import Link from 'next/link'

export default function MyContractsPage() {
  const myContracts = [
    {
      id: 1,
      title: 'Frontend UI Development',
      status: 'active',
      progress: 60,
      reward: '5,000,000',
      deadline: '5 days left',
      client: 'Bitcoin Corp'
    },
    {
      id: 2,
      title: 'API Integration',
      status: 'completed',
      progress: 100,
      reward: '8,000,000',
      completedDate: '2024-01-15',
      client: 'DeFi Solutions'
    },
    {
      id: 3,
      title: 'Smart Contract Audit',
      status: 'pending',
      progress: 0,
      reward: '3,000,000',
      deadline: 'Awaiting approval',
      client: 'Crypto Ventures'
    }
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return '#40e0d0'
      case 'completed': return '#40e0d0'
      case 'pending': return 'rgba(255, 255, 255, 0.5)'
      default: return 'rgba(255, 255, 255, 0.7)'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <FileText className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            My <span className="turquoise-gradient">Contracts</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Manage your active development contracts
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <Link
            href="/contracts/new"
            className="px-6 py-3 text-black rounded-lg font-medium transition-all inline-flex items-center"
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
            Create New Contract
          </Link>
        </div>

        <div className="space-y-6">
          {myContracts.map((contract) => (
            <div 
              key={contract.id}
              className="rounded-xl p-8 border backdrop-blur-sm transition-all"
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
                    {contract.title}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                    Client: {contract.client}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xl font-light text-white mb-2">
                    <Coins className="w-5 h-5 mr-2" style={{ color: '#40e0d0' }} />
                    {contract.reward} $bJobs
                  </div>
                  <div className="text-sm" style={{ color: getStatusColor(contract.status) }}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {contract.progress !== undefined && (
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-700 rounded-full mr-3">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${contract.progress}%`,
                            background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)'
                          }}
                        />
                      </div>
                      <span className="text-sm text-white">{contract.progress}%</span>
                    </div>
                  )}
                  
                  {contract.deadline && (
                    <div className="flex items-center text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      <Clock className="w-4 h-4 mr-2" />
                      {contract.deadline}
                    </div>
                  )}
                  
                  {contract.completedDate && (
                    <div className="flex items-center text-sm" style={{ color: '#40e0d0' }}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed on {new Date(contract.completedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {contract.status === 'active' && (
                  <button className="px-4 py-2 border text-white rounded-lg text-sm transition-all"
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
                    Submit Work
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}