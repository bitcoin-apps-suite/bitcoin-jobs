export interface BitcoinApp {
  id: string
  name: string
  url: string
  icon?: string
  color: string
  description?: string
  chromeAppId?: string // Chrome app ID for launching Chrome apps
  isLocal?: boolean // For apps running on same domain
  isExternal?: boolean // For apps that should open in new tab
}

export const bitcoinApps: BitcoinApp[] = [
  {
    id: 'bapps-store',
    name: 'Bitcoin Apps Store',
    url: 'https://www.bitcoinapps.store/',
    color: '#ff6b35',
    description: 'Bitcoin Apps Store',
    isExternal: true
  },
  {
    id: 'bitcoin-wallet',
    name: 'Bitcoin Wallet',
    url: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://bitcoin-wallet-sable.vercel.app',
    chromeAppId: 'bitcoin-wallet',
    color: '#ffd700',
    description: 'Manage your Bitcoin'
  },
  {
    id: 'bitcoin-email',
    name: 'Bitcoin Email',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3002'
      : 'https://bitcoin-email.vercel.app',
    chromeAppId: 'bitcoin-email',
    color: '#ef4444',
    description: 'Email with Bitcoin integration'
  },
  {
    id: 'bitcoin-music',
    name: 'Bitcoin Music',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3003'
      : 'https://bitcoin-music.vercel.app',
    chromeAppId: 'bitcoin-music',
    color: '#8b5cf6',
    description: 'Stream and support artists with Bitcoin'
  },
  {
    id: 'bitcoin-writer',
    name: 'Bitcoin Writer',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3004'
      : 'https://bitcoin-writer.vercel.app',
    chromeAppId: 'bitcoin-writer',
    color: '#ff9500',
    description: 'Write and publish with Bitcoin'
  },
  {
    id: 'bitcoin-code',
    name: 'Bitcoin Code',
    url: 'https://bitcoin-code.vercel.app',
    color: '#0ea5e9',
    description: 'Code development environment',
    isExternal: true
  },
  {
    id: 'bitcoin-drive',
    name: 'Bitcoin Drive',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3005'
      : 'https://bitcoin-drive.vercel.app',
    chromeAppId: 'bitcoin-drive',
    color: '#22c55e',
    description: 'Decentralized file storage'
  },
  {
    id: 'bitcoin-calendar',
    name: 'Bitcoin Calendar',
    url: 'https://bitcoin-calendar.vercel.app',
    color: '#d946ef',
    description: 'Schedule and manage events',
    isExternal: true
  },
  {
    id: 'bitcoin-exchange',
    name: 'Bitcoin Exchange',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3007'
      : 'https://bitcoin-exchange.vercel.app',
    chromeAppId: 'bitcoin-exchange',
    color: '#10b981',
    description: 'Trade Bitcoin and other assets'
  },
  {
    id: 'bitcoin-search',
    name: 'Bitcoin Search',
    url: 'https://bitcoin-search.vercel.app',
    color: '#6b7280',
    description: 'Search the Bitcoin ecosystem',
    isExternal: true
  },
  {
    id: 'bitcoin-spreadsheet',
    name: 'Bitcoin Spreadsheet',
    url: 'https://bitcoin-spreadsheet.vercel.app',
    color: '#3b82f6',
    description: 'Spreadsheets with Bitcoin integration',
    isExternal: true
  },
  {
    id: 'bitcoin-video',
    name: 'Bitcoin Video',
    url: 'https://bitcoin-video-nine.vercel.app',
    color: '#65a30d',
    description: 'Video creation and streaming',
    isExternal: true
  },
  {
    id: 'bitcoin-photos',
    name: 'Bitcoin Photos',
    url: 'https://bitcoin-photos.vercel.app',
    color: '#ec4899',
    description: 'Photo management and sharing',
    isExternal: true
  },
  {
    id: 'bitcoin-maps',
    name: 'Bitcoin Maps',
    url: 'https://bitcoin-maps.vercel.app',
    color: '#f59e0b',
    description: 'Bitcoin location services',
    isExternal: true
  },
  {
    id: 'bitcoin-chat',
    name: 'Bitcoin Chat',
    url: 'https://bitcoin-chat.vercel.app',
    color: '#ff6500',
    description: 'Chat with Bitcoin integration',
    isExternal: true
  },
  {
    id: 'bitcoin-social',
    name: 'Bitcoin Social',
    url: 'https://bitcoin-social.vercel.app',
    color: '#f43f5e',
    description: 'Social networking for Bitcoin users',
    isExternal: true
  },
  {
    id: 'bitcoin-games',
    name: 'Bitcoin Games',
    url: 'https://bitcoin-gaming.vercel.app',
    color: '#8b5cf6',
    description: 'Gaming with Bitcoin rewards',
    isExternal: true
  },
  {
    id: 'bitcoin-books',
    name: 'Bitcoin Books',
    url: 'https://bitcoin-books-bay.vercel.app',
    color: '#10b981',
    description: 'Digital book publishing and reading',
    isExternal: true
  },
  {
    id: 'bitcoin-domains',
    name: 'Bitcoin Domains',
    url: 'https://bitcoin-dns.vercel.app',
    color: '#eab308',
    description: 'Domain name services',
    isExternal: true
  },
  {
    id: 'bitcoin-3d',
    name: 'Bitcoin 3D',
    url: 'https://bitcoin-3d.vercel.app',
    color: '#ec4899',
    description: '3D modeling and visualization',
    isExternal: true
  },
  {
    id: 'bitcoin-jobs',
    name: 'Bitcoin Jobs',
    url: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3006'
      : 'https://bitcoin-jobs.vercel.app',
    chromeAppId: 'bitcoin-jobs',
    color: '#40e0d0',
    description: 'Find jobs in the Bitcoin ecosystem'
  },
  {
    id: 'bitcoin-paint',
    name: 'Bitcoin Paint',
    url: 'https://bitcoin-paint.vercel.app',
    color: '#a855f7',
    description: 'Digital art creation and NFTs',
    isExternal: true
  }
]

// Get app by ID
export const getAppById = (id: string): BitcoinApp | undefined => {
  return bitcoinApps.find(app => app.id === id)
}

// Get app by name
export const getAppByName = (name: string): BitcoinApp | undefined => {
  return bitcoinApps.find(app => app.name === name)
}