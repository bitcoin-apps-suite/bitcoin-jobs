'use client'

import React from 'react'
import { Activity, CheckCircle, AlertTriangle, XCircle, Server, Database, Shield, Globe } from 'lucide-react'

export default function StatusPage() {
  const services = [
    { name: 'API', status: 'operational', uptime: '99.99%', responseTime: '45ms', icon: <Server className="w-5 h-5" /> },
    { name: 'Database', status: 'operational', uptime: '99.97%', responseTime: '12ms', icon: <Database className="w-5 h-5" /> },
    { name: 'Smart Contracts', status: 'operational', uptime: '100%', responseTime: '200ms', icon: <Shield className="w-5 h-5" /> },
    { name: 'CDN', status: 'operational', uptime: '99.99%', responseTime: '25ms', icon: <Globe className="w-5 h-5" /> },
    { name: 'Authentication', status: 'degraded', uptime: '99.95%', responseTime: '150ms', icon: <Shield className="w-5 h-5" /> }
  ]

  const incidents = [
    { date: '2024-01-24', type: 'resolved', message: 'Database connection timeout resolved', duration: '15 min' },
    { date: '2024-01-20', type: 'resolved', message: 'API rate limiting issue fixed', duration: '30 min' },
    { date: '2024-01-15', type: 'resolved', message: 'CDN configuration updated', duration: '5 min' }
  ]

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'operational': return <CheckCircle className="w-5 h-5" style={{ color: '#40e0d0' }} />
      case 'degraded': return <AlertTriangle className="w-5 h-5" style={{ color: '#ffa500' }} />
      case 'down': return <XCircle className="w-5 h-5" style={{ color: '#ff4444' }} />
      default: return <Activity className="w-5 h-5" style={{ color: '#40e0d0' }} />
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'operational': return '#40e0d0'
      case 'degraded': return '#ffa500'
      case 'down': return '#ff4444'
      default: return '#40e0d0'
    }
  }

  const overallStatus = services.every(s => s.status === 'operational') ? 'operational' : 
                       services.some(s => s.status === 'down') ? 'partial' : 'degraded'

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Activity className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            System <span className="turquoise-gradient">Status</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Current system performance and uptime
          </p>
        </div>

        <div className="rounded-xl p-8 border backdrop-blur-sm mb-8"
          style={{
            background: overallStatus === 'operational' ? 'rgba(64, 224, 208, 0.05)' : 'rgba(255, 165, 0, 0.05)',
            borderColor: overallStatus === 'operational' ? 'rgba(64, 224, 208, 0.2)' : 'rgba(255, 165, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
                {overallStatus === 'operational' ? 'All Systems Operational' : 
                 overallStatus === 'degraded' ? 'Degraded Performance' : 'Partial Outage'}
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-light" style={{ color: '#40e0d0' }}>99.98%</div>
              <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>30-day uptime</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <div key={index} 
              className="rounded-xl p-6 border backdrop-blur-sm transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                e.currentTarget.style.borderColor = `${getStatusColor(service.status)}40`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div style={{ color: getStatusColor(service.status) }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-white" style={{ letterSpacing: '-0.01em' }}>
                      {service.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(service.status)}
                      <span className="text-sm capitalize" style={{ color: getStatusColor(service.status) }}>
                        {service.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">{service.uptime}</div>
                  <div className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>uptime</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Response time</span>
                <span className="text-sm font-medium" style={{ color: '#40e0d0' }}>{service.responseTime}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl p-8 border backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>
            Recent Incidents
          </h2>
          <div className="space-y-3">
            {incidents.map((incident, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4" style={{ color: '#40e0d0' }} />
                  <div>
                    <p className="text-sm text-white">{incident.message}</p>
                    <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                      {incident.date} • Duration: {incident.duration}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded"
                  style={{ 
                    background: 'rgba(64, 224, 208, 0.1)',
                    color: '#40e0d0'
                  }}
                >
                  Resolved
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}