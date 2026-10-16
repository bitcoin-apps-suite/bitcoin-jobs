'use client'

import React, { useState } from 'react'
import { Briefcase, ArrowLeft, Upload, DollarSign, MapPin, Clock } from 'lucide-react'
import Link from 'next/link'
import { useWallet, publishRecord } from '@/lib/bwallet'

export default function NewJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
    requirements: '',
    skills: ''
  })

  const { user, connect } = useWallet()
  const [posting, setPosting] = useState(false)
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null)

  // Publish the job on-chain under your wallet identity. The wallet shows the fee before you approve.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) { await connect(); return }
    setPosting(true)
    setResult(null)
    try {
      const job = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        salary: formData.salary,
        description: formData.description,
        requirements: formData.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
        skills: formData.skills.split(',').map((s) => s.trim()).filter(Boolean),
      }
      const r = await publishRecord(['bJobs', 'job', user.identityKey, JSON.stringify(job)], 'Post a job on Bitcoin Jobs')
      const posted = { ...job, id: r.txid ?? String(Date.now()), txid: r.txid, posted: new Date().toISOString(), category: 'Engineering', experience: '', bitcoin: true }
      try {
        const list = JSON.parse(localStorage.getItem('bjobs:posted') || '[]')
        localStorage.setItem('bjobs:posted', JSON.stringify([posted, ...list]))
      } catch {}
      setResult({ ok: true, text: r.txid ? `Posted on-chain: ${r.txid}` : 'Posted on-chain.' })
    } catch (err) {
      setResult({ ok: false, text: err instanceof Error ? err.message : 'The wallet did not sign.' })
    } finally {
      setPosting(false)
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Link href="/jobs" className="inline-flex items-center mb-6 text-white hover:text-turquoise-400 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Jobs
        </Link>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Briefcase className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Post a New <span className="turquoise-gradient">Job</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '0.01em' }}>
            Find the perfect talent for your Bitcoin project
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div 
            className="rounded-xl p-8 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 className="text-xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>Job Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
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
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
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
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Remote, San Francisco, London"
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
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Job Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Salary Range</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({...formData, salary: e.target.value})}
                  placeholder="e.g., 100,000 - 150,000 sats/month"
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Job Description *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Requirements</label>
                <textarea
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  placeholder="List key requirements, one per line"
                  className="w-full px-4 py-3 border rounded-lg text-white focus:outline-none"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-white mb-2" style={{ fontWeight: '300' }}>Skills (comma separated)</label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                  placeholder="e.g., Bitcoin, BSV, Smart Contracts, Node.js"
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

            <div className="flex justify-end gap-4 mt-8">
              <Link 
                href="/jobs"
                className="px-8 py-3 border text-white rounded-lg font-medium transition-all"
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
                {posting ? 'Waiting for wallet…' : user ? 'Post Job on-chain' : 'Sign in with bWalletX to post'}
              </button>
            </div>
          </div>
          {result && (
            <p style={{ color: result.ok ? '#22c55e' : '#f87171', wordBreak: 'break-all' }}>{result.text}</p>
          )}
        </form>
      </div>
    </div>
  )
}