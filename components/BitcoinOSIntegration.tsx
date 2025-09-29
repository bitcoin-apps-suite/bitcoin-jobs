'use client'

import React from 'react'
import { TopMenuBar, DevSidebar, Dock, BitcoinOSProvider } from '@bitcoin-os/bridge'
import ProofOfConceptBar from './ProofOfConceptBar'

interface BitcoinOSIntegrationProps {
  children: React.ReactNode
}

export default function BitcoinOSIntegration({ children }: BitcoinOSIntegrationProps) {
  const appContext = {
    appName: 'Bitcoin Jobs',
    appVersion: '1.0.0',
    appIcon: '💼',
    theme: 'default' as const,
    primaryColor: '#40e0d0',
    user: null,
    onLogout: () => {
      console.log('Logging out...')
      // Add logout logic here
    }
  }

  const handleOpenApp = (appName: string) => {
    // Map app names to URLs
    const appUrls: Record<string, string> = {
      'Bitcoin Wallet': 'https://bitcoin-wallet-sable.vercel.app',
      'Bitcoin Email': 'https://bitcoin-email.vercel.app',
      'Bitcoin Writer': 'https://bitcoin-writer.vercel.app',
      'Bitcoin Drive': 'https://bitcoin-drive.vercel.app',
      'Bitcoin Jobs': 'https://bitcoin-jobs.vercel.app',
      'Bitcoin OS': 'https://bitcoin-os.vercel.app'
    }
    
    const url = appUrls[appName]
    if (url) {
      // Open in new window with specific dimensions
      const width = 1200
      const height = 800
      const left = (window.screen.width - width) / 2
      const top = (window.screen.height - height) / 2
      
      window.open(url, appName.replace(/\s+/g, '_'), 
        `width=${width},height=${height},left=${left},top=${top},` +
        'toolbar=no,menubar=no,location=no,status=no,scrollbars=yes,resizable=yes'
      )
    }
  }

  return (
    <div style={{ paddingTop: '60px' }}> {/* Space for fixed bars */}
      <ProofOfConceptBar />
      <TopMenuBar 
        context={appContext}
        onOpenApp={handleOpenApp}
        showBAppsMenu={true}
        githubUrl="https://github.com/bitcoin-apps-suite/bitcoin-jobs"
        docsUrl="/docs"
      />
      {children}
      <Dock context={appContext} />
    </div>
  )
}