'use client'

import React from 'react'
import { Briefcase, Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  // Debug: Log when component mounts
  React.useEffect(() => {
    console.log('HomePage mounted at:', window.location.pathname)
    console.log('Full URL:', window.location.href)
  }, [])

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="flex items-center justify-center mb-12">
            <div className="p-8 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Briefcase className="w-20 h-20 text-black" />
            </div>
          </div>
          <h1 className="mb-6" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1' }}>
            <span className="turquoise-gradient">Bitcoin</span>{' '}
            <span style={{ fontWeight: '100' }}>Jobs</span>
          </h1>
          <p className="mb-8 max-w-3xl mx-auto" style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Decentralized Job Marketplace on Bitcoin SV
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/jobs" 
              className="inline-flex items-center px-8 py-4 font-medium text-black rounded-xl transition-all" 
              style={{ 
                background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)',
                fontSize: '16px',
                letterSpacing: '0.02em',
                fontWeight: '500'
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
              Browse Jobs <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link 
              href="/token" 
              className="inline-flex items-center px-8 py-4 font-medium text-white rounded-xl border transition-all"
              style={{ 
                background: 'transparent',
                borderColor: 'rgba(64, 224, 208, 0.5)',
                fontSize: '16px',
                letterSpacing: '0.02em',
                fontWeight: '400'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(64, 224, 208, 0.1)';
                e.currentTarget.style.borderColor = '#40e0d0';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.5)';
              }}
            >
              $bJobs Token <Search className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div 
            className="rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(64, 224, 208, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="p-4 rounded-full w-fit mb-6" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Briefcase className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-light text-white mb-4">Bitcoin Native</h3>
            <p style={{ fontWeight: '300', color: 'rgba(255, 255, 255, 0.7)' }}>Built on Bitcoin SV with native micropayment support and blockchain verification.</p>
          </div>
          
          <div 
            className="rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(64, 224, 208, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="p-4 rounded-full w-fit mb-6" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Search className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-light text-white mb-4">Decentralized</h3>
            <p style={{ fontWeight: '300', color: 'rgba(255, 255, 255, 0.7)' }}>No central authority. Your data, your control, your sovereignty.</p>
          </div>
          
          <div 
            className="rounded-2xl p-8 transition-all duration-300 backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(64, 224, 208, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div className="p-4 rounded-full w-fit mb-6" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <ArrowRight className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-2xl font-light text-white mb-4">Token Incentives</h3>
            <p style={{ fontWeight: '300', color: 'rgba(255, 255, 255, 0.7)' }}>Earn $bJobs tokens by contributing to development and using the platform.</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Explore Bitcoin Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link href="/token" className="bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg transition-colors">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-semibold">$bJobs Token</div>
            </Link>
            <Link href="/exchange" className="bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg transition-colors">
              <div className="text-2xl mb-2">🔄</div>
              <div className="font-semibold">Exchange</div>
            </Link>
            <Link href="/contracts" className="bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg transition-colors">
              <div className="text-2xl mb-2">📋</div>
              <div className="font-semibold">Contracts</div>
            </Link>
            <Link href="/tasks" className="bg-white/5 hover:bg-white/10 text-white p-6 rounded-lg transition-colors">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-semibold">Tasks</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}