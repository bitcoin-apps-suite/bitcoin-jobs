// Lucide Icons (existing)
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
  Palette,
  GraduationCap,
  UserCheck,
  Sparkles,
  Circle,
  Monitor
} from 'lucide-react'

// React Icons (Material Design)
import { 
  MdAccountBalanceWallet,
  MdEmail,
  MdLibraryMusic,
  MdDescription,
  MdStorage,
  MdLanguage,
  MdTerminal,
  MdSettings,
  MdCalendarToday,
  MdSearch,
  MdTrendingUp,
  MdWork,
  MdTableChart,
  MdShare,
  MdAttachMoney,
  MdStore,
  MdCode,
  MdShowChart,
  MdVideoLibrary,
  MdPhotoCamera,
  MdLocationOn,
  MdChat,
  MdGroup,
  MdSportsEsports,
  MdMenuBook,
  MdViewInAr,
  MdPalette,
  MdSchool,
  MdVerifiedUser,
  MdCircle,
  MdMonitor
} from 'react-icons/md'

export interface IconMapping {
  lucide: any
  'react-icons': any
}

export const iconMappings: { [key: string]: IconMapping } = {
  'bitcoin-wallet': { lucide: Wallet, 'react-icons': MdAccountBalanceWallet },
  'bitcoin-email': { lucide: Mail, 'react-icons': MdEmail },
  'bitcoin-music': { lucide: Music, 'react-icons': MdLibraryMusic },
  'bitcoin-writer': { lucide: FileText, 'react-icons': MdDescription },
  'bitcoin-code': { lucide: Code2, 'react-icons': MdCode },
  'bitcoin-drive': { lucide: HardDrive, 'react-icons': MdStorage },
  'bitcoin-calendar': { lucide: Calendar, 'react-icons': MdCalendarToday },
  'bitcoin-exchange': { lucide: TrendingUp, 'react-icons': MdShowChart },
  'bitcoin-search': { lucide: Search, 'react-icons': MdSearch },
  'bitcoin-spreadsheet': { lucide: Table, 'react-icons': MdTableChart },
  'bitcoin-video': { lucide: Video, 'react-icons': MdVideoLibrary },
  'bitcoin-photos': { lucide: Camera, 'react-icons': MdPhotoCamera },
  'bitcoin-maps': { lucide: MapPin, 'react-icons': MdLocationOn },
  'bitcoin-chat': { lucide: MessageCircle, 'react-icons': MdChat },
  'bitcoin-social': { lucide: Users, 'react-icons': MdGroup },
  'bitcoin-games': { lucide: Gamepad2, 'react-icons': MdSportsEsports },
  'bitcoin-books': { lucide: BookOpen, 'react-icons': MdMenuBook },
  'bitcoin-domains': { lucide: Globe, 'react-icons': MdLanguage },
  'bitcoin-3d': { lucide: Box, 'react-icons': MdViewInAr },
  'bitcoin-jobs': { lucide: Briefcase, 'react-icons': MdWork },
  'bitcoin-paint': { lucide: Palette, 'react-icons': MdPalette },
  'bapps-store': { lucide: Store, 'react-icons': MdStore },
  'bitcoin-education': { lucide: GraduationCap, 'react-icons': MdSchool },
  'bitcoin-identity': { lucide: UserCheck, 'react-icons': MdVerifiedUser },
  'bitcoin-os': { lucide: Monitor, 'react-icons': MdMonitor },
  
  // Desktop icons
  'wallet': { lucide: Wallet, 'react-icons': MdAccountBalanceWallet },
  'email': { lucide: Mail, 'react-icons': MdEmail },
  'music': { lucide: Music, 'react-icons': MdLibraryMusic },
  'writer': { lucide: FileText, 'react-icons': MdDescription },
  'drive': { lucide: HardDrive, 'react-icons': MdStorage },
  'calendar': { lucide: Calendar, 'react-icons': MdCalendarToday },
  'exchange': { lucide: TrendingUp, 'react-icons': MdShowChart },
  'spreadsheet': { lucide: Table, 'react-icons': MdTableChart },
  'search': { lucide: Search, 'react-icons': MdSearch },
  'identity': { lucide: UserCheck, 'react-icons': MdVerifiedUser },
  'jobs': { lucide: Briefcase, 'react-icons': MdWork },
  'video': { lucide: Video, 'react-icons': MdVideoLibrary },
  'education': { lucide: GraduationCap, 'react-icons': MdSchool },
  'code': { lucide: Code2, 'react-icons': MdCode },
  'paint': { lucide: Palette, 'react-icons': MdPalette },
  'domains': { lucide: Globe, 'react-icons': MdLanguage },
  '3d': { lucide: Box, 'react-icons': MdViewInAr },
  'photos': { lucide: Camera, 'react-icons': MdPhotoCamera },
  'maps': { lucide: MapPin, 'react-icons': MdLocationOn },
  'chat': { lucide: MessageCircle, 'react-icons': MdChat },
  'social': { lucide: Users, 'react-icons': MdGroup },
  'games': { lucide: Gamepad2, 'react-icons': MdSportsEsports },
  'books': { lucide: BookOpen, 'react-icons': MdMenuBook },
  'senseii': { lucide: Sparkles, 'react-icons': MdTrendingUp },
  'cashboard': { lucide: TrendingUp, 'react-icons': MdShowChart },
  'bapps-store-right': { lucide: Store, 'react-icons': MdStore },
  'home': { lucide: Circle, 'react-icons': MdCircle },
  'os': { lucide: Monitor, 'react-icons': MdMonitor },
}

// Import the complete mappings
import { getCompleteThemedIcon, completeIconMappings } from './icon-mappings-complete'

export const getThemedIcon = (iconId: string, theme: string = 'lucide') => {
  // Use the complete icon mappings for all themes
  return getCompleteThemedIcon(iconId, theme)
}

export const getCurrentTheme = (): string => {
  if (typeof window === 'undefined') return 'lucide'
  const theme = localStorage.getItem('bitcoinOS-icon-theme') || 'lucide'
  // Now supports all icon themes
  const validThemes = ['lucide', 'react-icons', 'tabler', 'heroicons', 'feather', 'phosphor', 'remix', 'bootstrap']
  if (!validThemes.includes(theme)) {
    return 'lucide'
  }
  return theme
}