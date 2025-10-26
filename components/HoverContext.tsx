'use client'

import React, { createContext, useContext, useState } from 'react'

interface HoveredApp {
  name: string
  color: string
}

interface HoverContextType {
  hoveredApp: HoveredApp | null
  setHoveredApp: (app: HoveredApp | null) => void
}

const HoverContext = createContext<HoverContextType | undefined>(undefined)

export function HoverProvider({ children }: { children: React.ReactNode }) {
  const [hoveredApp, setHoveredApp] = useState<HoveredApp | null>(null)

  return (
    <HoverContext.Provider value={{ hoveredApp, setHoveredApp }}>
      {children}
    </HoverContext.Provider>
  )
}

export function useHover() {
  const context = useContext(HoverContext)
  if (context === undefined) {
    throw new Error('useHover must be used within a HoverProvider')
  }
  return context
}