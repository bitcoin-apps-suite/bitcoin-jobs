'use client'

import React from 'react'
import CentralChat from '../components/CentralChat'

export default function HomePage() {
  // Debug: Log when component mounts
  React.useEffect(() => {
    console.log('HomePage mounted at:', window.location.pathname)
    console.log('Full URL:', window.location.href)
  }, [])

  return (
    <div className="min-h-screen">
      <CentralChat />
    </div>
  )
}