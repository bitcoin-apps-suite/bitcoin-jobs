'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { 
  ChevronLeft,
  ChevronRight,
  Monitor,
  FileCode,
  Users,
  FileText,
  Coins,
  Github,
  GitPullRequest,
  ExternalLink,
  BookOpen,
  History,
  CheckCircle,
  ListTodo,
  Briefcase,
  Search,
  DollarSign,
  Building2,
  Award,
  TrendingUp,
  Gavel,
  ShoppingCart
} from 'lucide-react'

export default function DevSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true) // Always start collapsed
  const [mounted, setMounted] = useState(false)
  const [issueCount, setIssueCount] = useState<number | null>(null)

  // Fetch GitHub issues count
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-OS/issues?state=open')
        const data = await response.json()
        setIssueCount(Array.isArray(data) ? data.length : null)
      } catch (error) {
        console.error('Error fetching issues:', error)
      }
    }
    fetchIssues()
  }, [])

  // Load collapsed state from localStorage after mount
  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('devSidebarCollapsed')
    // Default to collapsed (true) if no saved preference
    setIsCollapsed(saved !== null ? saved === 'true' : true)
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('devSidebarCollapsed', newState.toString())
  }

  const menuItems: Array<{
    path?: string;
    icon?: any;
    label?: string;
    badge?: string | number | null;
    divider?: boolean;
    section?: string;
    external?: boolean;
  }> = [
    // Token & NFT Features at top
    { path: '/token', icon: Coins, label: '$BJOBS Token', badge: 'NEW' },
    { path: '/exchange', icon: TrendingUp, label: 'Jobs Exchange' },
    { path: '/marketplace', icon: ShoppingCart, label: 'NFT Marketplace' },
    
    // Job Seekers Section
    { divider: true },
    { section: 'JOB SEEKERS' },
    { path: '/', icon: Search, label: 'Find Jobs' },
    { path: '/freelancers', icon: Users, label: 'Freelancer Board' },
    { path: '/docs', icon: BookOpen, label: 'Career Guides' },
    
    // Employers Section
    { divider: true },
    { section: 'EMPLOYERS' },
    { path: '/jobs/new', icon: Briefcase, label: 'Post Job Offer' },
    { path: '/contracts/new', icon: Gavel, label: 'Create Contract' },
    { path: '/companies', icon: Building2, label: 'Company Directory' },
    
    // Blockchain & NFT Section
    { divider: true },
    { section: 'BLOCKCHAIN' },
    { path: '/contracts', icon: FileCode, label: 'Smart Contracts' },
    { path: '/contracts/my', icon: DollarSign, label: 'My Contracts' },
    { path: '/exchange', icon: TrendingUp, label: 'Jobs Exchange' },
    
    // Developers Section
    { divider: true },
    { section: 'DEVELOPERS' },
    { path: '/tasks', icon: ListTodo, label: 'Development Tasks' },
    { path: '/contributors', icon: Users, label: 'Contributors' },
    { path: '/applications', icon: Award, label: 'Grant Applications' },
    
    // System
    { divider: true },
    { path: '/api', icon: FileText, label: 'API Reference' },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-jobs', icon: Github, label: 'GitHub', external: true },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'Status', badge: 'OK' }
  ]

  const stats = {
    totalJobs: '1,250',
    activeJobs: '342',
    jobsNFTs: '1,250',
    contributors: '42',
    openTasks: issueCount || 0
  }

  // Use mounted state to ensure consistent rendering between server and client
  const sidebarCollapsed = mounted ? isCollapsed : true

  return (
    <div className={`fixed left-0 top-16 bottom-14 ${sidebarCollapsed ? 'w-16' : 'w-[260px]'} bg-gray-900 border-r border-gray-800 transition-all duration-300 z-40 flex flex-col`}>
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-bitcoin-orange" />
            <span className="font-semibold text-white">Jobs Hub</span>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="my-2 border-t border-gray-800" />
          }

          if (item.section) {
            return !sidebarCollapsed ? (
              <div key={index} className="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {item.section}
              </div>
            ) : null;
          }

          const Icon = item.icon!
          const isActive = pathname === item.path
          const isExternal = item.external

          if (isExternal) {
            return (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors ${
                  sidebarCollapsed ? 'justify-center' : ''
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 text-gray-400" />
                {!sidebarCollapsed && (
                  <>
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="ml-auto bg-bitcoin-orange text-black px-2 py-0.5 rounded text-xs font-bold">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </a>
            )
          }

          return (
            <a
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 border-l-2 border-bitcoin-orange' : ''
              } ${sidebarCollapsed ? 'justify-center' : ''}`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-bitcoin-orange' : 'text-gray-400'}`} />
              {!sidebarCollapsed && (
                <>
                  <span className={isActive ? 'text-white font-medium' : 'text-gray-300'}>
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span className="ml-auto bg-bitcoin-orange text-black px-2 py-0.5 rounded text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </a>
          )
        })}
      </nav>

      {/* Quick Stats */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">Platform Stats</h4>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-400">Total Jobs Posted</div>
              <div className="text-sm font-mono text-white">{stats.totalJobs}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Active Job Offers</div>
              <div className="text-sm font-mono text-white">{stats.activeJobs}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Job NFTs Minted</div>
              <div className="text-sm font-mono text-white">{stats.jobsNFTs}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Contributors</div>
              <div className="text-sm font-mono text-white">{stats.contributors}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Open Tasks</div>
              <div className="text-sm font-mono text-white">{stats.openTasks}</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      {!sidebarCollapsed && (
        <div className="p-4 border-t border-gray-800">
          <button className="w-full bg-bitcoin-orange text-black py-2 px-4 rounded-lg hover:bg-bitcoin-orange/90 transition-colors font-medium text-sm">
            Post Your First Job
          </button>
        </div>
      )}
    </div>
  )
}