'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Code, 
  GitBranch, 
  Bug, 
  FileText, 
  DollarSign, 
  Users, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
  Terminal,
  Activity,
  Briefcase
} from 'lucide-react';
import './DevBar.css';

interface DevBarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const DevBar: React.FC<DevBarProps> = ({ onCollapsedChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); // Changed to true by default
  const [mounted, setMounted] = useState(false);
  const [issueCount, setIssueCount] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devBarCollapsed');
      // If no saved preference, default to collapsed (true)
      setIsCollapsed(saved !== null ? saved === 'true' : true);
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('devBarCollapsed', isCollapsed.toString());
      onCollapsedChange?.(isCollapsed);
    }
  }, [isCollapsed, onCollapsedChange, mounted]);

  useEffect(() => {
    // Fetch GitHub issue count for bitcoin-jobs
    fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-jobs/issues?state=open')
      .then(res => res.json())
      .then(issues => setIssueCount(Array.isArray(issues) ? issues.length : 0))
      .catch(() => setIssueCount(0));
  }, []);

  const menuItems: Array<{
    path?: string;
    icon?: any;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
  }> = [
    { path: '/contracts', icon: FileText, label: 'Contracts', badge: issueCount > 0 ? String(issueCount) : '0' },
    { path: '/tasks', icon: Terminal, label: 'Tasks', badge: issueCount > 0 ? String(issueCount) : '0' },
    { path: '/contributors', icon: Users, label: 'Contributors', badge: '2' },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/token', icon: DollarSign, label: '$bJobs', badge: 'NEW' },
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-jobs', icon: GitBranch, label: 'GitHub', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-jobs/issues', icon: Bug, label: 'Issues', external: true, badge: issueCount > 0 ? String(issueCount) : undefined },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-jobs/pulls', icon: Code, label: 'Pull Requests', external: true },
    { divider: true },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: '/changelog', icon: FileText, label: 'Changelog' },
    { path: '/status', icon: Activity, label: 'Status', badge: '🟢' }
  ];

  const stats = {
    totalTokens: '1,000,000,000',
    distributed: '150,000',
    freelancers: '12',
    openTasks: '15+'
  };

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <>
        {/* Top POC Banner */}
        <div className="dev-poc-banner">
          <div className="dev-poc-content">
            <span className="dev-poc-icon">⚠️</span>
            <span className="dev-poc-title">PROOF OF CONCEPT:</span>
            <span className="dev-poc-text">This is a demonstration version of Bitcoin Jobs.</span>
            <div className="dev-poc-links">
              <Link href="/studio">Studio</Link>
              <Link href="/community">Community</Link>
              <Link href="/token">Token</Link>
              <a 
                href="https://github.com/bitcoin-apps-suite/bitcoin-music"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        {/* Side Developer Bar - static initial state */}
        <div className="dev-bar">
          <div className="dev-bar-header">
            <div className="dev-bar-title">
              <Briefcase className="dev-bar-logo" />
              <span>Developer Hub</span>
            </div>
            <button className="dev-bar-toggle" aria-label="Collapse sidebar">
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Top POC Banner */}
      <div className="dev-poc-banner">
        <div className="dev-poc-content">
          <span className="dev-poc-icon">⚠️</span>
          <span className="dev-poc-title">PROOF OF CONCEPT:</span>
          <span className="dev-poc-text">This is a demonstration version of Bitcoin Jobs.</span>
          <div className="dev-poc-links">
            <Link href="/studio">Studio</Link>
            <Link href="/community">Community</Link>
            <Link href="/token">Token</Link>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-jobs"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Side Developer Bar */}
      <div className={`dev-bar ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="dev-bar-header">
          {!isCollapsed && (
            <div className="dev-bar-title">
              <Briefcase className="dev-bar-logo" />
              <span>Developer Hub</span>
            </div>
          )}
          <button 
            className="dev-bar-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <nav className="dev-bar-nav">
          {menuItems.map((item, index) => {
            if (item.divider) {
              return <div key={index} className="dev-bar-divider" />;
            }

            const Icon = item.icon;
            const isActive = pathname === item.path;

            if (item.external) {
              return (
                <a
                  key={item.path}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`dev-bar-item ${isActive ? 'active' : ''}`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <>
                      <span className="dev-bar-label">{item.label}</span>
                      {item.badge && <span className="dev-bar-badge">{item.badge}</span>}
                    </>
                  )}
                </a>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path || '/'}
                className={`dev-bar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!isCollapsed && (
                  <>
                    <span className="dev-bar-label">{item.label}</span>
                    {item.badge && <span className="dev-bar-badge">{item.badge}</span>}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="dev-bar-stats">
            <h4>Jobs Stats</h4>
            <div className="dev-stat">
              <span className="dev-stat-label">Total Supply</span>
              <span className="dev-stat-value">{stats.totalTokens}</span>
            </div>
            <div className="dev-stat">
              <span className="dev-stat-label">Distributed</span>
              <span className="dev-stat-value">{stats.distributed}</span>
            </div>
            <div className="dev-stat">
              <span className="dev-stat-label">Freelancers</span>
              <span className="dev-stat-value">{stats.freelancers}</span>
            </div>
            <div className="dev-stat">
              <span className="dev-stat-label">Open Tasks</span>
              <span className="dev-stat-value">{stats.openTasks}</span>
            </div>
          </div>
        )}

        {!isCollapsed && (
          <div className="dev-bar-footer">
            <div className="dev-bar-cta">
              <p>Start Contributing</p>
              <Link href="/tasks" className="dev-bar-cta-button">
                View Tasks
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DevBar;