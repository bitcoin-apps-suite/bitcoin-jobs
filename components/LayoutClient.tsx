'use client'

import React, { useState, useEffect } from 'react'
import PocBar from '@/components/PocBar'
import Taskbar from '@/components/Taskbar'
import DevBar from '@/components/DevBar'
import AppWrapper from '@/components/AppWrapper'
import Footer from '@/components/Footer'
import DockManager from '@/components/DockManager'
import TickerSidebar from '@/components/TickerSidebar'
import { HoverProvider } from '@/components/HoverContext'

interface LayoutClientProps {
  children: React.ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isDevBarCollapsed, setIsDevBarCollapsed] = useState(true)
  const [isTickerCollapsed, setIsTickerCollapsed] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get initial state from localStorage
    const saved = localStorage.getItem('devBarCollapsed')
    setIsDevBarCollapsed(saved !== null ? saved === 'true' : true)

    // Listen for ticker toggle events
    const handleTickerToggle = (event: CustomEvent) => {
      setIsTickerCollapsed(event.detail)
    }

    window.addEventListener('tickerToggled', handleTickerToggle as EventListener)

    return () => {
      window.removeEventListener('tickerToggled', handleTickerToggle as EventListener)
    }
  }, [])

  const handleDevBarCollapsedChange = (collapsed: boolean) => {
    setIsDevBarCollapsed(collapsed)
  }

  // Calculate margins based on DevBar and Ticker states
  const contentMarginLeft = isDevBarCollapsed ? '60px' : '260px'
  const contentMarginRight = isTickerCollapsed ? '60px' : '280px'

  if (!mounted) {
    // Return a placeholder with the default collapsed state during SSR
    return (
      <HoverProvider>
        <PocBar />
        <Taskbar />
        <DevBar />
        <div style={{ 
          marginTop: '72px',
          marginLeft: '60px', // Default to collapsed
          marginRight: '60px', // Default to ticker collapsed
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease, margin-right 0.3s ease'
        }}>
          <AppWrapper>
            <main style={{ flex: 1 }}>
              {children}
            </main>
          </AppWrapper>
          <Footer />
        </div>
        <DockManager currentApp="bitcoin-jobs" />
        <TickerSidebar />
      </HoverProvider>
    )
  }

  return (
    <HoverProvider>
      <PocBar />
      <Taskbar />
      <DevBar onCollapsedChange={handleDevBarCollapsedChange} />
      <div style={{ 
        marginTop: '72px', // Space for POC bar (32px) + Taskbar (28px) + some padding
        marginLeft: contentMarginLeft, // Dynamic margin based on DevBar state
        marginRight: contentMarginRight, // Dynamic margin based on Ticker state
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease, margin-right 0.3s ease',
        paddingBottom: '100px' // Space for the Dock
      }}>
        <AppWrapper>
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </AppWrapper>
        <Footer />
      </div>
      <DockManager currentApp="bitcoin-jobs" />
      <TickerSidebar />
    </HoverProvider>
  )
}