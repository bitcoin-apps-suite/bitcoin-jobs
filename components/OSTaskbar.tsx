'use client'

import { Bitcoin, Grid, Clock, Wifi, Battery, Volume2, Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Globe, Terminal, Settings, Store } from 'lucide-react'
import { useState, useEffect } from 'react'

interface TaskbarProps {
  openWindows: string[]
  activeWindow: string | null
  onWindowClick: (window: string) => void
}

export default function Taskbar({ openWindows, activeWindow, onWindowClick }: TaskbarProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const dockApps = [
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', isImage: true },
    { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', icon: Music, color: 'text-gray-500', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-gray-500', url: 'https://bitcoin-calendar.vercel.app', disabled: true },
    { name: 'Bitcoin Search', icon: Search, color: 'text-gray-500', url: 'https://bitcoin-search.vercel.app', disabled: true },
    { name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-emerald-400', url: 'https://bitcoin-jobs.vercel.app' },
    { name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true },
  ]

  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-14 flex items-center justify-between px-4 hidden md:flex">
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-white/10 rounded transition-colors">
          <Bitcoin className="w-5 h-5 text-bitcoin-orange" />
        </button>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        {/* Dock Apps */}
        <div className="flex items-center space-x-1">
          {dockApps.map((app) => {
            const Icon = app.icon
            return (
              <button
                key={app.name}
                className={`p-2 hover:bg-white/10 rounded transition-all ${
                  app.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'
                }`}
                onClick={() => {
                  if (!app.disabled && app.url) {
                    // Open in sized window
                    const width = 1200
                    const height = 800
                    const left = (window.screen.width - width) / 2
                    const top = (window.screen.height - height) / 2
                    
                    const windowFeatures = [
                      `width=${width}`,
                      `height=${height}`,
                      `left=${left}`,
                      `top=${top}`,
                      'toolbar=no',
                      'menubar=no',
                      'location=no',
                      'status=no',
                      'scrollbars=yes',
                      'resizable=yes'
                    ].join(',')
                    
                    window.open(app.url, app.name.replace(/\s+/g, '_'), windowFeatures)
                  }
                }}
                title={app.name}
              >
                {app.id === 'bapps-store' ? (
                  <div className="w-6 h-6 rounded overflow-hidden">
                    <img src="/bapps-icon.jpg" alt="BAPPS" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <Icon className={`w-5 h-5 ${app.color}`} />
                )}
              </button>
            )
          })}
        </div>
        
        <div className="border-l border-gray-700 h-8 mx-2" />
        
        {/* Open Windows */}
        <div className="flex space-x-1">
          {openWindows.map((window) => (
            <button
              key={window}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                activeWindow === window 
                  ? 'bg-bitcoin-orange text-black' 
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => onWindowClick(window)}
            >
              {window}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4 text-sm">
        <Wifi className="w-4 h-4 text-green-500" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4 text-green-500" />
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>{mounted ? currentTime.toLocaleTimeString() : '12:00:00 AM'}</span>
        </div>
      </div>
    </div>
  )
}