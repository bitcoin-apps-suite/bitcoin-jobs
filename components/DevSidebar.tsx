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
  Briefcase
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

  const menuItems = [
    { path: '/contracts', icon: Briefcase, label: 'Contracts' },
    { path: '/tasks', icon: ListTodo, label: 'Tasks' },
    { path: '/contributors', icon: Users, label: 'Contributors' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/token', icon: Coins, label: '$bOS Token' },
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS', icon: Github, label: 'Repository', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/issues', icon: FileCode, label: 'Issues', badge: issueCount, external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-OS/pulls', icon: GitPullRequest, label: 'Pull Requests', external: true },
    { divider: true },
    { path: '/api', icon: FileText, label: 'API Reference' },
    { path: '/changelog', icon: History, label: 'Changelog' },
    { path: '/status', icon: CheckCircle, label: 'Status' },
  ]

  const stats = {
    supply: '1,000,000,000,000',
    distributed: '12,456,789',
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
            <Monitor className="w-5 h-5 text-bitcoin-orange" />
            <span className="font-semibold text-white">Developer Hub</span>
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
          <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-3">bOS Stats</h4>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-gray-400">Total Supply</div>
              <div className="text-sm font-mono text-white">{stats.supply}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Distributed</div>
              <div className="text-sm font-mono text-white">{stats.distributed}</div>
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
            Start Contributing
          </button>
        </div>
      )}
    </div>
  )
}