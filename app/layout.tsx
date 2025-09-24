import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import AppWrapper from '@/components/AppWrapper' 
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bitcoin Jobs',
  description: 'Decentralized Job Marketplace on Bitcoin SV',
  keywords: ['Bitcoin', 'BSV', 'Jobs', 'Blockchain', 'Decentralized'],
  authors: [{ name: 'The Bitcoin Corporation LTD.' }],
  creator: 'The Bitcoin Corporation LTD.',
  publisher: 'The Bitcoin Corporation LTD.',
  openGraph: {
    title: 'Bitcoin Jobs',
    description: 'Decentralized Job Marketplace on Bitcoin SV',
    type: 'website',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Providers>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <AppWrapper>
              {children}
            </AppWrapper>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}