'use client'

import { useState, useRef, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

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
      label: 'File',
      items: [
        { label: 'New Job Post', shortcut: '⌘N', action: () => window.location.href = '/post' },
        { label: 'Open Applications...', shortcut: '⌘O', action: () => window.location.href = '/applications' },
        { label: 'Recent Jobs', action: () => console.log('Recent jobs') },
        { divider: true },
        { label: 'Save Job', shortcut: '⌘S', action: () => console.log('Save job') },
        { label: 'Export Resume...', shortcut: '⌘E', action: () => console.log('Export resume') }
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
        { label: 'Find Jobs...', shortcut: '⌘F', action: () => window.location.href = '/search' }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Show All Jobs', shortcut: '⌘1', action: () => window.location.href = '/' },
        { label: 'My Applications', shortcut: '⌘2', action: () => window.location.href = '/applications' },
        { label: 'Show Job Details', shortcut: '⌥⌘I', action: () => console.log('Toggle job details') },
        { divider: true },
        { label: 'Zoom In', shortcut: '⌘+', action: () => console.log('Zoom in') },
        { label: 'Zoom Out', shortcut: '⌘-', action: () => console.log('Zoom out') },
        { label: 'Actual Size', shortcut: '⌘0', action: () => console.log('Actual size') },
        { divider: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: () => document.documentElement.requestFullscreen() }
      ]
    },
    {
      label: 'Jobs',
      items: [
        { label: 'Post New Job', action: () => window.location.href = '/post' },
        { label: 'Browse Jobs', action: () => window.location.href = '/' },
        { label: 'My Applications', action: () => window.location.href = '/applications' },
        { label: 'Saved Jobs', action: () => window.location.href = '/saved' },
        { divider: true },
        { label: 'Job Categories', action: () => window.location.href = '/categories' },
        { label: 'Search Jobs...', action: () => window.location.href = '/search' }
      ]
    },
    {
      label: 'Blockchain',
      items: [
        { label: 'Create Transaction', action: () => console.log('Create transaction') },
        { label: 'Sign Message', action: () => console.log('Sign message') },
        { divider: true },
        { label: 'Wallet', action: () => window.open('https://bitcoin-wallet-sable.vercel.app', '_blank') },
        { label: 'Explorer', href: 'https://whatsonchain.com', target: '_blank' },
        { divider: true },
        { label: 'Network Status', action: () => console.log('Network status') }
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', action: () => console.log('Minimize') },
        { label: 'Zoom', action: () => console.log('Zoom') },
        { divider: true },
        { label: 'Bring All to Front', action: () => console.log('Bring to front') }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Bitcoin Jobs Help', shortcut: '⌘?', action: () => alert('Bitcoin Jobs v1.0\n\nDecentralized Job Marketplace on BSV') },
        { label: 'Keyboard Shortcuts', action: () => console.log('Show shortcuts') },
        { label: 'Getting Started Guide', action: () => console.log('Getting started guide') },
        { divider: true },
        { label: 'Report Issue', href: 'https://github.com/bitcoin-corp/bitcoin-OS/issues', target: '_blank' },
        { label: 'Contact Support', action: () => console.log('Contact support') }
      ]
    }
  ]

  const bitcoinApps: BitcoinApp[] = [
    { name: 'Bitcoin OS', color: '#3b82f6', url: 'https://bitcoin-os.vercel.app/' },
    { name: 'Bitcoin Apps Store', color: '#f97316', url: 'https://www.bitcoinapps.store/' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', color: '#ef4444', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', color: '#a855f7', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', color: '#f97316', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Code', color: '#10b981', url: 'https://bitcoin-code.vercel.app' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', color: '#ec4899', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: 'https://bitcoin-exchange-iota.vercel.app' },
    { name: 'Bitcoin Search', color: '#6b7280', url: 'https://bitcoin-search.vercel.app' },
    { name: 'Bitcoin Spreadsheet', color: '#38bdf8', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Jobs', color: '#10b981', url: 'https://bitcoin-jobs.vercel.app', current: true },
    { name: 'Bitcoin Education', color: '#eab308', url: 'https://bitcoin-education-theta.vercel.app' },
    { name: 'Bitcoin Paint', color: '#a855f7', url: 'https://bitcoin-paint.vercel.app' },
    { name: 'Bitcoin Identity', color: '#3b82f6', url: 'https://bitcoin-identity.vercel.app' }
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
          color: '#40e0d0'
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
              color: '#40e0d0',
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
              color: '#40e0d0',
              fontWeight: '400',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              marginBottom: '4px'
            }}>
              Bitcoin Apps
            </div>
            
            {bitcoinApps.map((app) => (
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
            ))}
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
              {menu.label}
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
          color: '#40e0d0',
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
        <span>₿ Bitcoin Jobs</span>
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

      {/* Right side - Status items */}
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
          href="https://github.com/bitcoin-corp/bitcoin-OS"
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
          href="/docs"
          style={{
            color: 'rgba(255, 255, 255, 0.8)',
            textDecoration: 'none',
            transition: 'color 0.15s ease',
            fontWeight: '400'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#40e0d0'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)'}
        >
          Docs
        </a>
        
        {/* Divider */}
        <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
        
        {/* Connection Status */}
        <span>Bitcoin Jobs</span>
        <span style={{ color: '#40e0d0' }}>●</span>
      </div>

      {/* Mobile Menu Overlay */}
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