'use client'

import React, { useState } from 'react'
import { Terminal, Code2, Copy, Check, ChevronRight } from 'lucide-react'

export default function APIPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const endpoints = [
    {
      method: 'GET',
      path: '/api/jobs',
      description: 'List all available jobs'
    },
    {
      method: 'POST',
      path: '/api/jobs',
      description: 'Create a new job listing'
    },
    {
      method: 'GET',
      path: '/api/contracts',
      description: 'Get active contracts'
    },
    {
      method: 'POST',
      path: '/api/contracts',
      description: 'Create a new contract'
    },
    {
      method: 'GET',
      path: '/api/applications',
      description: 'View job applications'
    },
    {
      method: 'POST',
      path: '/api/applications',
      description: 'Submit an application'
    }
  ]

  const codeExamples = {
    javascript: `const response = await fetch('https://api.bitcoinjobs.com/v1/jobs', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const jobs = await response.json();
console.log(jobs);`,
    python: `import requests

response = requests.get(
    'https://api.bitcoinjobs.com/v1/jobs',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

jobs = response.json()
print(jobs)`,
    curl: `curl -X GET https://api.bitcoinjobs.com/v1/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
  }

  const getMethodColor = (method: string) => {
    switch(method) {
      case 'GET': return '#40e0d0'
      case 'POST': return '#00ced1'
      case 'PUT': return '#48d1cc'
      case 'DELETE': return '#ff6b6b'
      default: return '#40e0d0'
    }
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Terminal className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            API <span className="turquoise-gradient">Reference</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Build powerful integrations with Bitcoin Jobs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="rounded-xl p-8 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h2 className="text-xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>
              API Endpoints
            </h2>
            <div className="space-y-3">
              {endpoints.map((endpoint, index) => (
                <div key={index} 
                  className="flex items-center justify-between p-3 rounded-lg transition-all cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    e.currentTarget.style.borderColor = 'rgba(64, 224, 208, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="px-2 py-1 text-xs rounded font-medium"
                        style={{ 
                          background: `${getMethodColor(endpoint.method)}20`,
                          color: getMethodColor(endpoint.method),
                          border: `1px solid ${getMethodColor(endpoint.method)}40`
                        }}
                      >
                        {endpoint.method}
                      </span>
                      <code className="text-sm text-white font-mono">{endpoint.path}</code>
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      {endpoint.description}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-8 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white" style={{ letterSpacing: '-0.01em' }}>
                Quick Start
              </h2>
              <div className="flex gap-2">
                {Object.keys(codeExamples).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className="px-3 py-1 text-xs rounded-lg transition-all capitalize"
                    style={{
                      background: selectedLanguage === lang 
                        ? 'rgba(64, 224, 208, 0.2)' 
                        : 'rgba(255, 255, 255, 0.03)',
                      color: selectedLanguage === lang ? '#40e0d0' : 'white',
                      border: '1px solid',
                      borderColor: selectedLanguage === lang 
                        ? 'rgba(64, 224, 208, 0.4)' 
                        : 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <pre className="p-4 rounded-lg overflow-x-auto"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <code className="text-sm" style={{ color: '#40e0d0', fontFamily: 'monospace' }}>
                  {codeExamples[selectedLanguage as keyof typeof codeExamples]}
                </code>
              </pre>
              <button
                onClick={() => copyToClipboard(codeExamples[selectedLanguage as keyof typeof codeExamples], 'quickstart')}
                className="absolute top-2 right-2 p-2 rounded-lg transition-all"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(64, 224, 208, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                }}
              >
                {copiedEndpoint === 'quickstart' 
                  ? <Check className="w-4 h-4" style={{ color: '#40e0d0' }} />
                  : <Copy className="w-4 h-4 text-white" />
                }
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Code2 className="w-8 h-8 mb-3" style={{ color: '#40e0d0' }} />
            <h3 className="text-lg font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
              Rate Limits
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              1000 requests per hour for standard API keys
            </p>
          </div>

          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Terminal className="w-8 h-8 mb-3" style={{ color: '#40e0d0' }} />
            <h3 className="text-lg font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
              SDKs
            </h3>
            <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Official SDKs for JavaScript, Python, Go, and more
            </p>
          </div>

          <div className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(64, 224, 208, 0.05)',
              borderColor: 'rgba(64, 224, 208, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="mb-3">🔑</div>
            <h3 className="text-lg font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>
              Get API Key
            </h3>
            <button className="text-sm" style={{ color: '#40e0d0' }}>
              Generate your key →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}