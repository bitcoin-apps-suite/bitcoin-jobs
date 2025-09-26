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
    switch(priority) {
      case 'high': return 'text-red-400 bg-red-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'low': return 'text-green-400 bg-green-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'text-blue-400 bg-blue-500/20'
      case 'in-progress': return 'text-yellow-400 bg-yellow-500/20'
      case 'completed': return 'text-green-400 bg-green-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-700 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full mr-4">
              <CheckSquare className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Bitcoin Jobs Tasks</h1>
              <p className="text-xl text-gray-300">Open source development tasks with $bJobs rewards</p>
            </div>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Total Tasks</div>
            <div className="text-2xl font-bold text-white">{taskStats.total}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Open</div>
            <div className="text-2xl font-bold text-blue-400">{taskStats.open}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">In Progress</div>
            <div className="text-2xl font-bold text-yellow-400">{taskStats.inProgress}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-400">{taskStats.completed}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="text-sm text-gray-400 mb-1">Total Rewards</div>
            <div className="text-lg font-bold text-green-400">{(taskStats.totalReward / 1000000).toFixed(1)}M $bJobs</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
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
            <div key={task.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-green-400 font-mono text-sm mr-3">{task.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
                  <p className="text-gray-300 mb-4">{task.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.labels.map((label) => (
                      <span key={label} className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full text-sm">
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-right ml-6">
                  <div className="flex items-center text-2xl font-bold text-white mb-2">
                    <Coins className="w-6 h-6 mr-2 text-green-400" />
                    {(parseInt(task.reward) / 1000000).toFixed(1)}M
                  </div>
                  <div className="text-sm text-green-400">$bJobs</div>
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
                    className="flex items-center text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    <span className="text-sm">View on GitHub</span>
                  </a>
                  
                  {task.status === 'open' && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Claim Task
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-6">How Task Rewards Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full w-fit mx-auto mb-4">
                <Github className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">1. Pick a Task</h3>
              <p className="text-gray-300">Choose from available GitHub issues with $bJobs rewards</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full w-fit mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">2. Complete Work</h3>
              <p className="text-gray-300">Submit a pull request that meets requirements</p>
            </div>
            <div className="text-center">
              <div className="bg-green-500 p-4 rounded-full w-fit mx-auto mb-4">
                <Coins className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">3. Get Paid</h3>
              <p className="text-gray-300">Receive $bJobs tokens after PR is merged</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}