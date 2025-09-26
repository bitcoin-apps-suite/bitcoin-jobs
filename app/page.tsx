'use client'

import React from 'react'
import { Briefcase, Search, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-green-500 p-6 rounded-full mr-6">
              <Briefcase className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Bitcoin Jobs
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Decentralized Job Marketplace on Bitcoin SV
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/token" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center transition-colors">
              View $bJobs Token <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link href="/contracts" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold flex items-center transition-colors">
              Development Contracts <Search className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="bg-green-500 p-4 rounded-full w-fit mb-6">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Bitcoin Native</h3>
            <p className="text-gray-300">Built on Bitcoin SV with native micropayment support and blockchain verification.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="bg-green-500 p-4 rounded-full w-fit mb-6">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Decentralized</h3>
            <p className="text-gray-300">No central authority. Your data, your control, your sovereignty.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="bg-green-500 p-4 rounded-full w-fit mb-6">
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Token Incentives</h3>
            <p className="text-gray-300">Earn $bJobs tokens by contributing to development and using the platform.</p>
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