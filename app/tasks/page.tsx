'use client'

import React, { useState } from 'react'
import { Briefcase, CheckSquare, Clock, User, Github, Coins } from 'lucide-react'

export default function TasksPage() {
  const [selectedPriority, setSelectedPriority] = useState('all')
  
  const tasks = [
    {
      id: 'CRM-001',
      title: 'Implement Customer Dashboard',
      description: 'Create a responsive dashboard showing customer metrics and recent activities',
      priority: 'high',
      reward: '5,000,000',
      status: 'open',
      labels: ['frontend', 'react', 'dashboard'],
      estimatedHours: 40,
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-crm/issues/1'
    },
    {
      id: 'CRM-002', 
      title: 'Bitcoin Payment Integration',
      description: 'Integrate BSV payments for premium features and API usage',
      priority: 'high',
      reward: '8,000,000',
      status: 'open',
      labels: ['backend', 'payments', 'bsv'],
      estimatedHours: 60,
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-crm/issues/2'
    },
    {
      id: 'CRM-003',
      title: 'Contact Import/Export',
      description: 'Build CSV and vCard import/export functionality for contacts',
      priority: 'medium',
      reward: '3,000,000',
      status: 'in-progress',
      assignee: 'dev@example.com',
      labels: ['feature', 'data', 'csv'],
      estimatedHours: 25,
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-crm/issues/3'
    },
    {
      id: 'CRM-004',
      title: 'Email Template Engine',
      description: 'Create customizable email templates with merge fields',
      priority: 'low',
      reward: '4,000,000',
      status: 'open',
      labels: ['email', 'templates', 'marketing'],
      estimatedHours: 35,
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-crm/issues/4'
    },
    {
      id: 'CRM-005',
      title: 'Mobile Responsive Design',
      description: 'Optimize all interfaces for mobile and tablet devices',
      priority: 'medium',
      reward: '6,000,000',
      status: 'completed',
      assignee: 'mobile@example.com',
      labels: ['ui/ux', 'mobile', 'responsive'],
      estimatedHours: 50,
      githubIssue: 'https://github.com/bitcoin-apps-suite/bitcoin-crm/issues/5'
    }
  ]

  const getPriorityColor = (priority: string) => {
    return {
      color: '#40e0d0',
      background: 'rgba(64, 224, 208, 0.1)',
      border: '1px solid rgba(64, 224, 208, 0.3)'
    }
  }

  const getStatusColor = (status: string) => {
    return {
      color: '#40e0d0',
      background: 'rgba(64, 224, 208, 0.1)',
      border: '1px solid rgba(64, 224, 208, 0.3)'
    }
  }

  const filteredTasks = selectedPriority === 'all' 
    ? tasks 
    : tasks.filter(task => task.priority === selectedPriority)

  const taskStats = {
    total: tasks.length,
    open: tasks.filter(t => t.status === 'open').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    totalReward: tasks.reduce((sum, task) => sum + parseInt(task.reward), 0)
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="p-6 rounded-full" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
              <CheckSquare className="w-12 h-12 text-black" />
            </div>
          </div>
          <h1 className="mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: '200', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Bitcoin Jobs <span className="turquoise-gradient">Tasks</span>
          </h1>
          <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', letterSpacing: '0.01em', lineHeight: '1.4' }}>
            Open source development tasks with $bJobs rewards
          </p>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Total Tasks</div>
            <div className="text-2xl font-bold text-white">{taskStats.total}</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Open</div>
            <div className="text-2xl font-bold" style={{ color: '#40e0d0' }}>{taskStats.open}</div>
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
            <div className="text-2xl font-bold" style={{ color: '#40e0d0' }}>{taskStats.inProgress}</div>
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
            <div className="text-2xl font-bold" style={{ color: '#40e0d0' }}>{taskStats.completed}</div>
          </div>
          <div 
            className="rounded-xl p-6 border backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="text-sm text-gray-400 mb-1">Total Rewards</div>
            <div className="text-lg font-bold" style={{ color: '#40e0d0' }}>{(taskStats.totalReward / 1000000).toFixed(1)}M $bJobs</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="border rounded-lg px-4 py-2 text-white focus:outline-none"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.12)'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#40e0d0'}
            onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Task List */}
        <div className="space-y-6">
          {filteredTasks.map((task) => (
            <div 
              key={task.id} 
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
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="font-mono text-sm mr-3" style={{ color: '#40e0d0' }}>{task.id}</span>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={getPriorityColor(task.priority)}
                    >
                      {task.priority}
                    </span>
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-medium ml-2"
                      style={getStatusColor(task.status)}
                    >
                      {task.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-light text-white mb-2" style={{ letterSpacing: '-0.01em' }}>{task.title}</h3>
                  <p className="mb-4" style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>{task.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.labels.map((label) => (
                      <span 
                        key={label} 
                        className="px-3 py-1 rounded-full text-sm"
                        style={{
                          background: 'rgba(64, 224, 208, 0.1)',
                          color: '#40e0d0',
                          border: '1px solid rgba(64, 224, 208, 0.3)',
                          fontWeight: '400'
                        }}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="flex items-center text-2xl font-bold text-white mb-2">
                    <Coins className="w-6 h-6 mr-2" style={{ color: '#40e0d0' }} />
                    {(parseInt(task.reward) / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm" style={{ color: '#40e0d0' }}>$bJobs</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{task.estimatedHours}h estimated</span>
                  </div>
                  
                  {task.assignee && (
                    <div className="flex items-center text-gray-400">
                      <User className="w-4 h-4 mr-2" />
                      <span className="text-sm">{task.assignee}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-4">
                  <a
                    href={task.githubIssue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center transition-all"
                    style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#40e0d0'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                  >
                    <Github className="w-5 h-5 mr-2" />
                    <span className="text-sm">View on GitHub</span>
                  </a>
                  
                  {task.status === 'open' && (
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
                      Claim Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div 
          className="mt-12 rounded-xl p-8 border backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 className="text-2xl font-light text-white mb-6" style={{ letterSpacing: '-0.01em' }}>How Task Rewards Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="p-4 rounded-full w-fit mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
                <Github className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2" style={{ letterSpacing: '-0.01em' }}>1. Pick a Task</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>Choose from available GitHub issues with $bJobs rewards</p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-full w-fit mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
                <CheckSquare className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2" style={{ letterSpacing: '-0.01em' }}>2. Complete Work</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>Submit a pull request that meets requirements</p>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-full w-fit mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #40e0d0 0%, #00ced1 100%)' }}>
                <Coins className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2" style={{ letterSpacing: '-0.01em' }}>3. Get Paid</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: '300' }}>Receive $bJobs tokens after PR is merged</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}