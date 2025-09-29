'use client'

import React, { useState } from 'react'
import { Cpu, Code, Play, Settings, Terminal, Save, RefreshCw } from 'lucide-react'

export default function StudioPage() {
  const [code, setCode] = useState(`// Bitcoin Jobs Smart Contract
contract JobListing {
  address public employer;
  address public developer;
  uint256 public reward;
  bool public completed;
  
  constructor(uint256 _reward) {
    employer = msg.sender;
    reward = _reward;
    completed = false;
  }
  
  function assignDeveloper(address _dev) public {
    require(msg.sender == employer);
    developer = _dev;
  }
  
  function completeJob() public {
    require(msg.sender == developer);
    completed = true;
    // Transfer reward to developer
  }
}`)

  const [output, setOutput] = useState('')
  const [isCompiling, setIsCompiling] = useState(false)

  const handleCompile = () => {
    setIsCompiling(true)
    setOutput('Compiling contract...')
    setTimeout(() => {
      setOutput(`✓ Contract compiled successfully
✓ No errors found
✓ Gas estimation: 245,892
✓ Ready for deployment`)
      setIsCompiling(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <Cpu className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Contract <span className="turquoise-gradient">Studio</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Build and test smart contracts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl border backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5" style={{ color: '#40e0d0' }} />
                  <span className="font-light text-white">Code Editor</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Save className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 rounded-lg transition-all"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <Settings className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 text-sm font-mono text-white focus:outline-none"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  minHeight: '400px',
                  resize: 'vertical',
                  color: '#40e0d0'
                }}
                spellCheck={false}
              />
            </div>

            <div className="rounded-xl border backdrop-blur-sm mt-6"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                <div className="flex items-center gap-3">
                  <Terminal className="w-5 h-5" style={{ color: '#40e0d0' }} />
                  <span className="font-light text-white">Output Console</span>
                </div>
                <button 
                  onClick={() => setOutput('')}
                  className="p-1 rounded transition-all"
                  style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#40e0d0'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 font-mono text-sm" style={{ minHeight: '150px' }}>
                <pre style={{ color: output.includes('✓') ? '#40e0d0' : 'rgba(255, 255, 255, 0.8)' }}>
                  {output || 'Ready to compile...'}
                </pre>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl p-6 border backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 className="text-lg font-light text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
                Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="w-full px-4 py-3 text-black rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)',
                    opacity: isCompiling ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isCompiling) {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(64, 224, 208, 0.3)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Play className="w-4 h-4" />
                  {isCompiling ? 'Compiling...' : 'Compile Contract'}
                </button>
                
                <button className="w-full px-4 py-3 border text-white rounded-lg font-medium transition-all"
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
                  Deploy to Testnet
                </button>
                
                <button className="w-full px-4 py-3 border text-white rounded-lg font-medium transition-all"
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
                  Run Tests
                </button>
              </div>
            </div>

            <div className="rounded-xl p-6 border backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <h3 className="text-lg font-light text-white mb-4" style={{ letterSpacing: '-0.01em' }}>
                Templates
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(64, 224, 208, 0.1)'
                    e.currentTarget.style.color = '#40e0d0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Job Listing Contract
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(64, 224, 208, 0.1)'
                    e.currentTarget.style.color = '#40e0d0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Escrow Contract
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(64, 224, 208, 0.1)'
                    e.currentTarget.style.color = '#40e0d0'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  Token Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}