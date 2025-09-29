'use client'

import React from 'react'
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function ApplicationsPage() {
  const applications = [
    {
      id: 1,
      jobTitle: 'Senior Bitcoin Developer',
      company: 'Bitcoin Corp',
      appliedDate: '2024-01-20',
      status: 'pending',
      salary: '500,000 sats/month'
    },
    {
      id: 2,
      jobTitle: 'Smart Contract Developer',
      company: 'DeFi Solutions',
      appliedDate: '2024-01-18',
      status: 'reviewing',
      salary: '$150/hour'
    },
    {
      id: 3,
      jobTitle: 'Blockchain Product Manager',
      company: 'Satoshi Labs',
      appliedDate: '2024-01-15',
      status: 'accepted',
      salary: '£70,000 - £90,000'
    },
    {
      id: 4,
      jobTitle: 'Frontend Developer',
      company: 'CryptoTech',
      appliedDate: '2024-01-10',
      status: 'rejected',
      salary: '300,000 sats/month'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="w-5 h-5" style={{ color: '#40e0d0' }} />
      case 'reviewing': return <AlertCircle className="w-5 h-5" style={{ color: '#40e0d0' }} />
      case 'accepted': return <CheckCircle className="w-5 h-5" style={{ color: '#40e0d0' }} />
      case 'rejected': return <XCircle className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
      default: return <Clock className="w-5 h-5" style={{ color: '#40e0d0' }} />
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Application Sent'
      case 'reviewing': return 'Under Review'
      case 'accepted': return 'Accepted'
      case 'rejected': return 'Not Selected'
      default: return status
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <FileText className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            My <span className="turquoise-gradient">Applications</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Track your job application status
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Total Applications</div>
            <div className="text-2xl font-light text-white mt-2">4</div>
          </div>
          
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Under Review</div>
            <div className="text-2xl font-light text-white mt-2">2</div>
          </div>
          
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Accepted</div>
            <div className="text-2xl font-light" style={{ color: '#40e0d0' }}>1</div>
          </div>
          
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Response Rate</div>
            <div className="text-2xl font-light text-white mt-2">75%</div>
          </div>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {applications.map((app) => (
            <div 
              key={app.id}
              className="rounded-xl p-6 border backdrop-blur-sm transition-all"
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
                    {app.jobTitle}
                  </h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>
                    {app.company} • {app.salary}
                  </p>
                  <p className="text-sm mt-2" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                    Applied on {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(app.status)}
                  <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: '300' }}>
                    {getStatusText(app.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: 'rgba(255, 255, 255, 0.3)' }} />
            <h3 className="text-xl font-light text-white mb-2">No Applications Yet</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              Start applying to jobs to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}