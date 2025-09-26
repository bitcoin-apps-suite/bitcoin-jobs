import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import LayoutClient from '@/components/LayoutClient'

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
      <body className={inter.className} style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        <Providers>
          <LayoutClient>
            {children}
          </LayoutClient>
        </Providers>
      </body>
    </html>
  )
}