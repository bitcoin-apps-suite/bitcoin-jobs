'use client'

import React, { useState, useEffect } from 'react'

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ 
        paddingTop: '60px',
        flex: 1,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}>
        {children}
      </div>
    )
  }

  return (
    <div 
      className="app-container"
      style={{ 
        paddingTop: '60px',
        flex: 1,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)'
      }}
    >
      {children}
    </div>
  )
}