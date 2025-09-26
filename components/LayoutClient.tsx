'use client'

import React, { useState, useEffect } from 'react'
import PocBar from '@/components/PocBar'
import Taskbar from '@/components/Taskbar'
import DevBar from '@/components/DevBar'
import AppWrapper from '@/components/AppWrapper'
import Footer from '@/components/Footer'
import Dock from '@/components/Dock'

interface LayoutClientProps {
  children: React.ReactNode
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [isDevBarCollapsed, setIsDevBarCollapsed] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Get initial state from localStorage
    const saved = localStorage.getItem('devBarCollapsed')
    setIsDevBarCollapsed(saved !== null ? saved === 'true' : true)
  }, [])

  const handleDevBarCollapsedChange = (collapsed: boolean) => {
    setIsDevBarCollapsed(collapsed)
  }

  // Calculate margin based on DevBar state
  const contentMarginLeft = isDevBarCollapsed ? '60px' : '260px'

  if (!mounted) {
    // Return a placeholder with the default collapsed state during SSR
    return (
      <>
        <PocBar />
        <Taskbar />
        <DevBar />
        <div style={{ 
          marginTop: '72px',
          marginLeft: '60px', // Default to collapsed
          minHeight: 'calc(100vh - 72px)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'margin-left 0.3s ease'
        }}>
          <AppWrapper>
            <main style={{ flex: 1 }}>
              {children}
            </main>
          </AppWrapper>
          <Footer />
        </div>
        <Dock />
      </>
    )
  }

  return (
    <>
      <PocBar />
      <Taskbar />
      <DevBar onCollapsedChange={handleDevBarCollapsedChange} />
      <div style={{ 
        marginTop: '72px', // Space for POC bar (32px) + Taskbar (28px) + some padding
        marginLeft: contentMarginLeft, // Dynamic margin based on DevBar state
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'margin-left 0.3s ease',
        paddingBottom: '100px' // Space for the Dock
      }}>
        <AppWrapper>
          <main style={{ flex: 1 }}>
            {children}
          </main>
        </AppWrapper>
        <Footer />
      </div>
      <Dock />
    </>
  )
}