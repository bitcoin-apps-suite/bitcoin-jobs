import { 
  Wallet, 
  Mail, 
  Music, 
  FileText, 
  HardDrive, 
  Globe, 
  Terminal, 
  Settings, 
  Calendar, 
  Search, 
  LineChart, 
  Briefcase, 
  Table, 
  Share2,
  DollarSign,
  Store,
  Code2,
  TrendingUp,
  Video,
  Camera,
  MapPin,
  MessageCircle,
  Users,
  Gamepad2,
  BookOpen,
  Box,
  Palette
} from 'lucide-react'

import { getThemedIcon, getCurrentTheme } from './icon-themes'

export const appIcons = {
  'bitcoin-wallet': { icon: Wallet, color: '#ffd700' }, // Gold yellow from wallet app
  'bitcoin-email': { icon: Mail, color: '#ef4444' },
  'bitcoin-music': { icon: Music, color: '#8b5cf6' },
  'bitcoin-writer': { icon: FileText, color: '#ff9500' }, // Warm orange from writer app
  'bitcoin-code': { icon: Code2, color: '#0ea5e9' },
  'bitcoin-drive': { icon: HardDrive, color: '#22c55e' },
  'bitcoin-calendar': { icon: Calendar, color: '#d946ef' },
  'bitcoin-exchange': { icon: TrendingUp, color: '#10b981' },
  'bitcoin-search': { icon: Search, color: '#6b7280' },
  'bitcoin-spreadsheet': { icon: Table, color: '#3b82f6' },
  'bitcoin-video': { icon: Video, color: '#65a30d' },
  'bitcoin-photos': { icon: Camera, color: '#ec4899' },
  'bitcoin-maps': { icon: MapPin, color: '#f59e0b' },
  'bitcoin-chat': { icon: MessageCircle, color: '#ff6500' },
  'bitcoin-social': { icon: Users, color: '#f43f5e' },
  'bitcoin-games': { icon: Gamepad2, color: '#8b5cf6' },
  'bitcoin-books': { icon: BookOpen, color: '#10b981' },
  'bitcoin-domains': { icon: Globe, color: '#eab308' },
  'bitcoin-3d': { icon: Box, color: '#ec4899' },
  'bitcoin-jobs': { icon: Briefcase, color: '#40e0d0' }, // Turquoise
  'bitcoin-paint': { icon: Palette, color: '#a855f7' },
  'bapps-store': { icon: Store, color: '#ff6b35' }, // For BAPPS store
}

export const getRainbowColor = (index: number): string => {
  const rainbowColors = [
    '#ff0000', // Red
    '#ff8000', // Orange  
    '#ffff00', // Yellow
    '#80ff00', // Lime
    '#00ff00', // Green
    '#00ff80', // Spring Green
    '#00ffff', // Cyan
    '#0080ff', // Blue
    '#0000ff', // Deep Blue
    '#8000ff', // Purple
    '#ff00ff', // Magenta
    '#ff0080'  // Rose
  ];
  return rainbowColors[index % rainbowColors.length];
};

export const getAppIcon = (appId: string, index?: number, useRainbow?: boolean, theme?: string) => {
  const currentTheme = theme || getCurrentTheme()
  const defaultIcon = appIcons[appId as keyof typeof appIcons] || { icon: Globe, color: '#6b7280' }
  
  // Get themed icon
  const ThemedIcon = getThemedIcon(appId, currentTheme)
  
  const result = {
    ...defaultIcon,
    icon: ThemedIcon
  }
  
  if (useRainbow && typeof index === 'number') {
    return {
      ...result,
      color: getRainbowColor(index)
    }
  }
  
  return result
}