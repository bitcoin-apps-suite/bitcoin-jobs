'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X } from 'lucide-react'
import BitcoinLogo from './BitcoinLogo'

interface DropdownItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
  target?: string
}

interface DropdownMenu {
  label: string
  items: DropdownItem[]
}

interface BitcoinApp {
  name: string
  color: string
  url: string
  current?: boolean
  action?: () => void
}

export default function Taskbar() {
  const { data: session } = useSession()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBitcoinSuite, setShowBitcoinSuite] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleOpenExchange = () => {
    window.dispatchEvent(new CustomEvent('openExchange'))
  }

  const handleOpenMarketplace = () => {
    window.location.href = '/marketplace'
  }

  const menus: DropdownMenu[] = [
    {
      label: 'Bitcoin Jobs',
      items: [
        { label: 'Home', shortcut: '⌘H', action: () => window.location.href = '/' },
        { divider: true },
        { label: 'About Bitcoin Jobs', action: () => alert('Bitcoin Jobs v1.0\n\nDecentralized Job Marketplace on BSV blockchain\n\nBuilt with Next.js and BSV SDK') },
        { divider: true },
        { label: 'Preferences...', shortcut: '⌘,', action: () => console.log('Preferences') },
        { label: 'Job Settings...', action: () => console.log('Job settings') },
        { divider: true },
        { label: session ? 'Sign Out' : 'Sign In', shortcut: '⌘Q', action: session ? () => signOut() : () => document.querySelector<HTMLButtonElement>('[data-signin]')?.click() }
      ]
    },
    {
      label: 'Jobs',
      items: [
        { label: 'Post New Job', shortcut: '⌘N', action: () => window.location.href = '/jobs/new' },
        { label: 'Browse Jobs', shortcut: '⌘B', action: () => window.location.href = '/jobs' },
        { label: 'My Applications', action: () => window.location.href = '/applications' },
        { divider: true },
        { label: 'Save Job Draft', shortcut: '⌘S', action: () => console.log('Save job') },
        { label: 'Import Jobs CSV...', action: () => console.log('Import jobs') },
        { divider: true },
        { label: 'Export Jobs...', shortcut: '⌘E', action: () => console.log('Export jobs') },
        { label: 'Generate Report...', action: () => console.log('Generate report') }
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', action: () => document.execCommand('undo') },
        { label: 'Redo', shortcut: '⇧⌘Z', action: () => document.execCommand('redo') },
        { divider: true },
        { label: 'Cut', shortcut: '⌘X', action: () => document.execCommand('cut') },
        { label: 'Copy', shortcut: '⌘C', action: () => document.execCommand('copy') },
        { label: 'Paste', shortcut: '⌘V', action: () => document.execCommand('paste') },
        { label: 'Delete', shortcut: '⌫', action: () => console.log('Delete') },
        { divider: true },
        { label: 'Select All', shortcut: '⌘A', action: () => document.execCommand('selectAll') },
        { label: 'Deselect All', shortcut: '⇧⌘A', action: () => console.log('Deselect all') },
        { divider: true },
        { label: 'Split at Playhead', shortcut: '⌘T', action: () => console.log('Split') },
        { label: 'Join Clips', shortcut: '⌘J', action: () => console.log('Join') }
      ]
    },
    {
      label: 'Contracts',
      items: [
        { label: 'Create Contract', shortcut: '⌥⌘C', action: () => window.location.href = '/contracts/new' },
        { label: 'View Contracts', shortcut: '⌥⌘V', action: () => window.location.href = '/contracts' },
        { label: 'My Contracts', action: () => window.location.href = '/contracts/my' },
        { divider: true },
        { label: 'Duplicate Contract', shortcut: '⌘D', action: () => console.log('Duplicate contract') },
        { label: 'Cancel Contract', action: () => console.log('Cancel contract') },
        { divider: true },
        { label: 'Mark Complete', shortcut: '⌘K', action: () => console.log('Mark complete') },
        { label: 'Request Review', action: () => console.log('Request review') }
      ]
    },
    {
      label: 'Payments',
      items: [
        { label: 'Make Payment', shortcut: '⌘P', action: () => console.log('Make payment') },
        { label: 'Request Payment', action: () => console.log('Request payment') },
        { label: 'Payment History', action: () => console.log('Payment history') },
        { divider: true },
        { label: 'Escrow Service', action: () => console.log('Escrow') },
        { label: 'Milestones', action: () => console.log('Milestones') },
        { divider: true },
        { label: 'Withdraw Funds', action: () => console.log('Withdraw') },
        { label: 'Deposit Funds', action: () => console.log('Deposit') }
      ]
    },
    {
      label: 'Marketplace',
      items: [
        { label: 'Browse Jobs', shortcut: '⌘M', action: () => window.location.href = '/contracts' },
        { label: 'Freelancers', action: () => window.location.href = '/freelancers' },
        { label: 'Companies', action: () => window.location.href = '/companies' },
        { label: 'Tasks', action: () => window.location.href = '/tasks' },
        { divider: true },
        { label: 'Post Job', shortcut: '⌘U', action: () => console.log('Post job') },
        { label: 'Create Profile', action: () => console.log('Create profile') },
        { divider: true },
        { label: 'Browse Skills', action: () => console.log('Browse skills') },
        { label: 'Trending', action: () => console.log('Trending jobs') }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Arrange View', shortcut: '⌘1', action: () => console.log('Arrange view') },
        { label: 'Mixer View', shortcut: '⌘2', action: () => console.log('Mixer view') },
        { label: 'List View', shortcut: '⌘3', action: () => console.log('List view') },
        { label: 'Grid View', shortcut: '⌘4', action: () => console.log('Grid view') },
        { divider: true },
        { label: 'Show Inspector', shortcut: '⌥⌘I', action: () => console.log('Toggle inspector') },
        { label: 'Show Browser', shortcut: '⌥⌘B', action: () => console.log('Toggle browser') },
        { label: 'Show Console', shortcut: '⌥⌘C', action: () => console.log('Toggle console') },
        { divider: true },
        { label: 'Zoom In', shortcut: '⌘+', action: () => console.log('Zoom in') },
        { label: 'Zoom Out', shortcut: '⌘-', action: () => console.log('Zoom out') },
        { label: 'Zoom to Fit', shortcut: '⌘0', action: () => console.log('Zoom fit') },
        { divider: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: () => document.documentElement.requestFullscreen() }
      ]
    },
    {
      label: 'Token',
      items: [
        { label: 'bJobs Token', shortcut: '⌥⌘T', action: () => window.location.href = '/token' },
        { label: 'Buy Tokens', action: () => window.location.href = '/exchange' },
        { divider: true },
        { label: 'Staking Rewards', action: () => console.log('Staking') },
        { label: 'Token Distribution', action: () => console.log('Distribution') },
        { label: 'Governance', action: () => console.log('Governance') },
        { divider: true },
        { label: 'My Balance', action: () => console.log('View balance') },
        { label: 'Exchange', action: handleOpenExchange },
        { label: 'Transaction History', action: () => console.log('Transaction history') }
      ]
    },
    {
      label: 'Blockchain',
      items: [
        { label: 'Register Contract', action: () => console.log('Register contract') },
        { label: 'Timestamp Job', action: () => console.log('Timestamp on chain') },
        { divider: true },
        { label: 'Encrypt Data', action: () => console.log('Encrypt data') },
        { label: 'Set Paywall', action: () => console.log('Set paywall') },
        { label: 'Revenue Share', action: () => console.log('Setup revenue sharing') },
        { divider: true },
        { label: 'Exchange', action: handleOpenExchange },
        { label: 'Job Exchange', action: () => window.location.href = '/exchange' },
        { divider: true },
        { label: 'Verify on Chain', action: () => console.log('Verify') },
        { label: 'View on Explorer', href: 'https://whatsonchain.com', target: '_blank' }
      ]
    },
    {
      label: 'Collaborate',
      items: [
        { label: 'Start Session', shortcut: '⌥⌘S', action: () => console.log('Start collab session') },
        { label: 'Join Session...', action: () => console.log('Join session') },
        { divider: true },
        { label: 'Share Project...', action: () => {
          navigator.clipboard.writeText(window.location.href)
          alert('Project link copied!')
        }},
        { label: 'Invite Collaborator...', action: () => console.log('Invite') },
        { divider: true },
        { label: 'Chat', action: () => console.log('Open chat') },
        { label: 'Comments', action: () => console.log('Show comments') },
        { divider: true },
        { label: 'Export for Collaboration', action: () => console.log('Export collab') }
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', action: () => console.log('Minimize') },
        { label: 'Zoom', action: () => console.log('Zoom') },
        { divider: true },
        { label: 'Jobs', action: () => window.location.href = '/contracts' },
        { label: 'Marketplace', action: handleOpenMarketplace },
        { label: 'Exchange', action: handleOpenExchange },
        { label: 'Tasks', action: () => window.location.href = '/tasks' },
        { divider: true },
        { label: 'Bring All to Front', action: () => console.log('Bring to front') }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Bitcoin Jobs Help', shortcut: '⌘?', action: () => alert('Bitcoin Jobs v1.0\n\nDecentralized Job Marketplace on BSV') },
        { label: 'Keyboard Shortcuts', action: () => console.log('Show shortcuts') },
        { label: 'Getting Started', action: () => console.log('Getting started guide') },
        { divider: true },
        { label: 'API Documentation', href: '/api/docs', target: '_blank' },
        { label: 'Job Board Docs', href: 'https://docs.bitcoin-jobs.com', target: '_blank' },
        { label: 'BSV SDK Docs', href: 'https://docs.bsvblockchain.org', target: '_blank' },
        { divider: true },
        { label: 'What\'s New', action: () => alert('New Features:\n\n• Smart Contract Jobs\n• Escrow Payments\n• Reputation System\n• Skills Verification\n• Token Rewards') },
        { divider: true },
        { label: 'Report Issue', href: 'https://github.com/bitcoin-apps-suite/bitcoin-jobs/issues', target: '_blank' },
        { label: 'Contact Support', href: 'https://twitter.com/b0ase', target: '_blank' }
      ]
    }
  ]

  const bitcoinApps: BitcoinApp[] = [
    { name: 'Bitcoin Auth', color: '#ef4444', url: '#' },
    { name: 'Bitcoin Chat', color: '#ff6500', url: '#' },
    { name: 'Bitcoin Domains', color: '#eab308', url: '#' },
    { name: 'Bitcoin Draw', color: '#10b981', url: '#' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Email', color: '#06b6d4', url: '#' },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: '#', action: handleOpenExchange },
    { name: 'Bitcoin Jobs', color: '#10b981', url: '#', current: true },
    { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
    { name: 'Bitcoin Pics', color: '#ec4899', url: '#' },
    { name: 'Bitcoin Registry', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Video', color: '#65a30d', url: '#' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: '#' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
        setShowBitcoinSuite(false)
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div 
      ref={menuRef}
      className="taskbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '28px',
        background: 'linear-gradient(180deg, #6b7280 0%, #4b5563 100%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        fontSize: '13px',
        fontWeight: '500',
        color: '#ffffff',
        userSelect: 'none',
        position: 'fixed',
        top: '32px', // Below POC banner
        left: 0,
        right: 0,
        zIndex: 10000
      }}
    >
      {/* Left side - Bitcoin Logo and menus */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Mobile Bitcoin Logo (no dropdown) */}
        <div className="sm:hidden" style={{ 
          padding: '0 12px',
          fontSize: '18px',
          fontWeight: '500',
          color: '#10b981'
        }}>
          ₿
        </div>

        {/* Bitcoin Logo container - Desktop only with dropdown */}
        <div className="hidden sm:block" style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowBitcoinSuite(!showBitcoinSuite)
              setActiveMenu(null)
            }}
            onDoubleClick={() => {
              window.location.href = '/'
            }}
            style={{
              padding: '0 12px',
              fontSize: '18px',
              fontWeight: '500',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              height: '28px',
              background: showBitcoinSuite ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            title="Bitcoin Suite Apps (double-click for home)"
          >
            ₿
          </button>

          {/* Bitcoin Suite Dropdown */}
          {showBitcoinSuite && (
            <div style={{
              position: 'absolute',
              top: '28px',
              left: 0,
              minWidth: '220px',
              background: 'rgba(45, 45, 45, 0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
              padding: '8px 0',
              zIndex: 1000
            }}>
            <div style={{
              padding: '8px 16px',
              fontSize: '12px',
              color: '#10b981',
              fontWeight: '400',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '4px'
            }}>
              Bitcoin Apps
            </div>
            
            {bitcoinApps.map((app) => {
              const isAction = 'action' in app && app.action
              return isAction ? (
                <button
                  key={app.name}
                  onClick={() => {
                    app.action?.()
                    setShowBitcoinSuite(false)
                  }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    color: app.current ? '#ffffff' : '#ffffff',
                    background: 'transparent',
                    border: 'none',
                    textDecoration: 'none',
                    fontSize: '13px',
                    transition: 'background 0.15s ease',
                    cursor: 'pointer',
                    fontWeight: app.current ? '500' : '400',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span 
                    style={{ 
                      color: app.color,
                      marginRight: '12px',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  >
                    ₿
                  </span>
                  <span>
                    {app.name}
                    {app.current && <span style={{ marginLeft: '8px', fontSize: '11px', opacity: 0.6 }}>(current)</span>}
                  </span>
                </button>
              ) : (
                <a
                  key={app.name}
                  href={app.url}
                  target={app.url.startsWith('http') ? '_blank' : undefined}
                  rel={app.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '6px 16px',
                    color: app.current ? '#ffffff' : '#ffffff',
                    background: 'transparent',
                    textDecoration: 'none',
                    fontSize: '13px',
                    transition: 'background 0.15s ease',
                    cursor: 'pointer',
                    fontWeight: app.current ? '500' : '400'
                  }}
                  onClick={() => setShowBitcoinSuite(false)}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                <span 
                  style={{ 
                    color: app.color,
                    marginRight: '12px',
                    fontSize: '16px',
                    fontWeight: '500'
                  }}
                >
                  ₿
                </span>
                <span>
                  {app.name}
                  {app.current && <span style={{ marginLeft: '8px', fontSize: '11px', opacity: 0.6 }}>(current)</span>}
                </span>
              </a>
            )
            })}
          </div>
        )}
        </div>

        {/* Menu Items - Hidden on mobile */}
        <div className="hidden sm:flex" style={{ alignItems: 'center', height: '100%' }}>
        {menus.map((menu) => (
          <div key={menu.label} style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setActiveMenu(activeMenu === menu.label ? null : menu.label)
                setShowBitcoinSuite(false)
              }}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
              style={{
                padding: '0 12px',
                height: '24px',
                background: activeMenu === menu.label ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: '400',
                transition: 'background 0.15s ease'
              }}
            >
              {menu.label === 'Bitcoin Jobs' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BitcoinLogo size={16} />
                  <span>{menu.label}</span>
                </div>
              ) : menu.label}
            </button>

            {/* Dropdown Menu */}
            {activeMenu === menu.label && (
              <div style={{
                position: 'absolute',
                top: '28px',
                left: 0,
                minWidth: '200px',
                background: 'rgba(45, 45, 45, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                padding: '4px 0',
                zIndex: 9999,
                overflow: 'hidden'
              }}>
                {menu.items.map((item, index) => (
                  item.divider ? (
                    <div 
                      key={index}
                      style={{
                        height: '1px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        margin: '4px 0'
                      }}
                    />
                  ) : item.href ? (
                    <a
                      key={index}
                      href={item.href}
                      target={item.target || '_blank'}
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '4px 12px',
                        color: '#ffffff',
                        textDecoration: 'none',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span style={{ opacity: 0.6, fontSize: '12px' }}>{item.shortcut}</span>
                      )}
                    </a>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.action?.()
                        setActiveMenu(null)
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        padding: '4px 12px',
                        background: 'transparent',
                        border: 'none',
                        color: '#ffffff',
                        fontSize: '13px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span style={{ opacity: 0.6, fontSize: '12px' }}>{item.shortcut}</span>
                      )}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Mobile: Center title */}
      <button 
        className="sm:hidden flex-1" 
        onClick={() => {
          window.location.href = '/'
        }}
        style={{ 
          fontSize: '14px',
          fontWeight: '400',
          color: '#10b981',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}
        title="Return to home"
      >
        <BitcoinLogo size={18} />
        <span>Bitcoin Jobs</span>
      </button>

      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        className="flex sm:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        style={{
          padding: '0 12px',
          height: '28px',
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Right side - Links and Status items */}
      <div className="hidden sm:flex" style={{
        marginLeft: 'auto',
        alignItems: 'center',
        gap: '16px',
        paddingRight: '16px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        {/* GitHub Link */}
        <a
          href="https://github.com/bitcoin-apps-suite/bitcoin-jobs"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            fontWeight: '400'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#40e0d0'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          GitHub
        </a>
        
        {/* Docs Link */}
        <a
          href="/tasks"
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            fontWeight: '400'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#40e0d0'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          Developers
        </a>
        
        {/* Token Link */}
        <a
          href="/token"
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            fontWeight: '400'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#40e0d0'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          $bJobs
        </a>
        
        {/* Divider */}
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        
        {/* Connection Status */}
        {session ? (
          <>
            <span>{session.user?.email || 'Connected'}</span>
            <span style={{ color: '#40e0d0' }}>●</span>
          </>
        ) : (
          <>
            <span>Not Connected</span>
            <span style={{ color: '#ff4444', opacity: 0.6 }}>●</span>
          </>
        )}
      </div>

      {/* Mobile Menu Overlay - Optimized for touch */}
      {showMobileMenu && (
        <div 
          className="block sm:hidden"
          style={{
            position: 'fixed',
            top: '60px', // Below POC banner (32px) and taskbar (28px)
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(26, 26, 26, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 9999,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <div style={{ padding: '16px' }}>
            {/* User Status */}
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {session ? (
                <>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>{session.user?.email || 'Connected'}</span>
                  <span style={{ color: '#40e0d0' }}>●</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>Not Connected</span>
                  <span style={{ color: '#ff4444', opacity: 0.6 }}>●</span>
                </>
              )}
            </div>


            {/* Menu Sections */}
            {menus.map((menu) => (
              <div key={menu.label} style={{
                marginBottom: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  fontSize: '13px',
                  fontWeight: '400',
                  color: '#ffffff',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {menu.label}
                </div>
                <div style={{ padding: '8px' }}>
                  {menu.items.map((item, index) => (
                    item.divider ? (
                      <div 
                        key={index}
                        style={{
                          height: '1px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          margin: '8px 0'
                        }}
                      />
                    ) : item.href ? (
                      <a
                        key={index}
                        href={item.href}
                        target={item.target || '_blank'}
                        rel="noopener noreferrer"
                        onClick={() => setShowMobileMenu(false)}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontSize: '13px',
                          borderRadius: '4px',
                          transition: 'background 0.15s ease'
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        key={index}
                        onClick={() => {
                          item.action?.()
                          setShowMobileMenu(false)
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 12px',
                          background: 'transparent',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '13px',
                          cursor: 'pointer',
                          borderRadius: '4px',
                          transition: 'background 0.15s ease'
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {item.label}
                      </button>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}