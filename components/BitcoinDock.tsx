import React, { useState, useEffect } from 'react';
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Briefcase, Store, Wifi, Volume2, Battery, Clock, TrendingUp, Building2, Shield, Video, Code2, Camera, MapPin, MessageCircle, Users, Gamepad2, BookOpen, Globe, Box, FolderOpen, Minimize2, Monitor, Home, GraduationCap, Paintbrush, UserCheck, Sparkles } from 'lucide-react';
import { getThemedIcon, getCurrentTheme } from '../lib/icon-themes';
import { useHover } from './HoverContext';
import './BitcoinDock.css';

interface DockApp {
  id?: string;
  name: string;
  icon: any;
  color: string;
  url?: string;
  disabled?: boolean;
  current?: boolean;
  isImage?: boolean;
}

interface DockProps {
  currentApp?: string; // ID of the current app (e.g., 'bitcoin-identity', 'bitcoin-writer')
}

const BitcoinDock: React.FC<DockProps> = ({ currentApp = 'bitcoin-jobs' }) => {
  const { setHoveredApp } = useHover();
  const [mounted, setMounted] = useState(false);
  const [iconTheme, setIconTheme] = useState<string>('lucide');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [minimizeTimeout, setMinimizeTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Set initial theme
    setIconTheme(getCurrentTheme());
    
    // Listen for theme changes
    const handleThemeChange = (event: any) => {
      setIconTheme(event.detail);
    };
    
    window.addEventListener('iconThemeChanged', handleThemeChange);
    
    // Timer for clock
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      window.removeEventListener('iconThemeChanged', handleThemeChange);
      clearInterval(timer);
      if (minimizeTimeout) {
        clearTimeout(minimizeTimeout);
      }
    };
  }, [minimizeTimeout]);

  const getRainbowColor = (index: number): string => {
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

  const getIconColor = (colorClass: string, index: number = 0): string => {
    if (colorClass === 'rainbow') {
      return getRainbowColor(index);
    }
    
    const colorMap: { [key: string]: string } = {
      'text-orange-500': '#f97316',
      'text-bitcoin-orange': '#f7931a',
      'text-yellow-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-purple-500': '#a855f7',
      'text-fuchsia-500': '#d946ef',
      'text-pink-500': '#ec4899',
      'text-green-500': '#22c55e',
      'text-blue-500': '#3b82f6',
      'text-gray-500': '#6b7280',
      'text-sky-400': '#38bdf8',
      'text-cyan-500': '#06b6d4',
      'text-cyan-400': '#22d3ee',
      'text-emerald-500': '#10b981',
      'text-blue-600': '#2563eb'
    };
    return colorMap[colorClass] || '#ffffff';
  };

  const dockApps: DockApp[] = [
    { id: 'bitcoin-os', name: 'Bitcoin OS', icon: Monitor, color: 'rainbow', url: 'https://bitcoin-os.vercel.app/', current: currentApp === 'bitcoin-os' },
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'rainbow', url: 'https://www.bitcoinapps.store/', isImage: true, current: currentApp === 'bapps-store' },
    { id: 'bitcoin-wallet', name: 'Bitcoin Wallet', icon: Wallet, color: 'rainbow', url: 'https://bitcoin-wallet-sable.vercel.app', current: currentApp === 'bitcoin-wallet' },
    { id: 'bitcoin-email', name: 'Bitcoin Email', icon: Mail, color: 'rainbow', url: 'https://bitcoin-email.vercel.app', current: currentApp === 'bitcoin-email' },
    { id: 'bitcoin-music', name: 'Bitcoin Music', icon: Music, color: 'rainbow', url: 'https://bitcoin-music.vercel.app', current: currentApp === 'bitcoin-music' },
    { id: 'bitcoin-writer', name: 'Bitcoin Writer', icon: FileText, color: 'rainbow', url: 'https://bitcoin-writer.vercel.app', current: currentApp === 'bitcoin-writer' },
    { id: 'bitcoin-code', name: 'Bitcoin Code', icon: Code2, color: 'rainbow', url: 'https://bitcoin-code.vercel.app', current: currentApp === 'bitcoin-code' },
    { id: 'bitcoin-drive', name: 'Bitcoin Drive', icon: HardDrive, color: 'rainbow', url: 'https://bitcoin-drive.vercel.app', current: currentApp === 'bitcoin-drive' },
    { id: 'bitcoin-calendar', name: 'Bitcoin Calendar', icon: Calendar, color: 'rainbow', url: 'https://bitcoin-calendar.vercel.app', current: currentApp === 'bitcoin-calendar' },
    { id: 'bitcoin-exchange', name: 'Bitcoin Exchange', icon: TrendingUp, color: 'rainbow', url: 'https://bitcoin-exchange-iota.vercel.app', current: currentApp === 'bitcoin-exchange' },
    { id: 'bitcoin-search', name: 'Bitcoin Search', icon: Search, color: 'rainbow', url: 'https://bitcoin-search.vercel.app', current: currentApp === 'bitcoin-search' },
    { id: 'bitcoin-spreadsheet', name: 'Bitcoin Spreadsheet', icon: Table, color: 'rainbow', url: 'https://bitcoin-spreadsheet.vercel.app', current: currentApp === 'bitcoin-spreadsheet' },
    { id: 'bitcoin-video', name: 'Bitcoin Video', icon: Video, color: 'rainbow', url: 'https://bitcoin-video-nine.vercel.app', current: currentApp === 'bitcoin-video' },
    { id: 'bitcoin-photos', name: 'Bitcoin Photos', icon: Camera, color: 'rainbow', url: 'https://bitcoin-photos.vercel.app', current: currentApp === 'bitcoin-photos' },
    { id: 'bitcoin-maps', name: 'Bitcoin Maps', icon: MapPin, color: 'rainbow', url: 'https://bitcoin-maps.vercel.app', current: currentApp === 'bitcoin-maps' },
    { id: 'bitcoin-chat', name: 'Bitcoin Chat', icon: MessageCircle, color: 'rainbow', url: 'https://bitcoin-chat.vercel.app', current: currentApp === 'bitcoin-chat' },
    { id: 'bitcoin-social', name: 'Bitcoin Social', icon: Users, color: 'rainbow', url: 'https://bitcoin-social.vercel.app', current: currentApp === 'bitcoin-social' },
    { id: 'bitcoin-games', name: 'Bitcoin Games', icon: Gamepad2, color: 'rainbow', url: 'https://bitcoin-gaming.vercel.app', current: currentApp === 'bitcoin-games' },
    { id: 'bitcoin-books', name: 'Bitcoin Books', icon: BookOpen, color: 'rainbow', url: 'https://bitcoin-books-bay.vercel.app', current: currentApp === 'bitcoin-books' },
    { id: 'bitcoin-domains', name: 'Bitcoin Domains', icon: Globe, color: 'rainbow', url: 'https://bitcoin-dns.vercel.app', current: currentApp === 'bitcoin-domains' },
    { id: 'bitcoin-3d', name: 'Bitcoin 3D', icon: Box, color: 'rainbow', url: 'https://bitcoin-3d.vercel.app', current: currentApp === 'bitcoin-3d' },
    { id: 'bitcoin-jobs', name: 'Bitcoin Jobs', icon: Briefcase, color: 'rainbow', url: 'https://bitcoin-jobs.vercel.app/', current: currentApp === 'bitcoin-jobs' },
    { id: 'bitcoin-education', name: 'Bitcoin Education', icon: GraduationCap, color: 'rainbow', url: 'https://bitcoin-education-theta.vercel.app', current: currentApp === 'bitcoin-education' },
    { id: 'bitcoin-paint', name: 'Bitcoin Paint', icon: Paintbrush, color: 'rainbow', url: 'https://bitcoin-paint.vercel.app/', current: currentApp === 'bitcoin-paint' },
    { id: 'bitcoin-identity', name: 'Bitcoin Identity', icon: UserCheck, color: 'rainbow', url: 'https://bitcoin-identity.vercel.app/', current: currentApp === 'bitcoin-identity' },
  ];

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url;
    }
  };

  const toggleDockSize = () => {
    const newDockStyle = 'minimal';
    localStorage.setItem('dockStyle', newDockStyle);
    window.dispatchEvent(new CustomEvent('dockStyleChanged', { detail: newDockStyle }));
  };

  const handleMouseEnter = () => {
    if (minimizeTimeout) {
      clearTimeout(minimizeTimeout);
      setMinimizeTimeout(null);
    }
  };

  const handleMouseLeave = () => {
    // Minimize after 300ms of not hovering
    const timeout = setTimeout(() => {
      toggleDockSize();
    }, 300);
    setMinimizeTimeout(timeout);
  };

  return (
    <div className="bitcoin-dock" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="dock-container">
        {/* App icons on the left */}
        <div className="dock-apps">
          {dockApps.map((app, index) => {
          // Get themed icon, but force Monitor for bitcoin-os and Shield for bitcoin-identity
          let Icon;
          if (app.id === 'bapps-store') {
            Icon = app.icon;
          } else if (app.id === 'bitcoin-os') {
            Icon = Monitor; // Force Monitor icon for bitcoin-os
          } else if (app.id === 'bitcoin-identity') {
            Icon = Shield; // Force Shield icon for bitcoin-identity
          } else {
            Icon = getThemedIcon(app.id || app.name.toLowerCase().replace('bitcoin ', ''), iconTheme);
          }
          return (
            <button
              key={app.name}
              className={`dock-app ${app.current ? 'active' : ''} ${app.disabled ? 'disabled' : ''}`}
              onClick={() => handleAppClick(app)}
              onMouseEnter={() => setHoveredApp({ name: app.name, color: getIconColor(app.color, index) })}
              onMouseLeave={() => setHoveredApp(null)}
              disabled={app.disabled}
            >
              {app.id === 'bapps-store' ? (
                <div className="dock-app-icon">
                  <img src="/bapps-icon.jpg" alt="BAPPS" className="dock-app-image" />
                </div>
              ) : (
                <Icon className="dock-app-icon" style={{ color: getIconColor(app.color, index) }} />
              )}
              {app.current && <span className="dock-indicator" />}
            </button>
          );
        })}
        </div>
        
        {/* Status icons on the right */}
        <div className="dock-status">
          <div className="dock-divider" />
          <button 
            className="status-button" 
            title="Switch to Minimal Dock"
            onClick={toggleDockSize}
          >
            <Minimize2 className="status-icon" style={{ color: '#6b7280' }} />
          </button>
          <button 
            className="status-button" 
            title="Bitcoin Corporation"
            onClick={() => window.location.href = 'https://bitcoin-corp.vercel.app/'}
          >
            <Building2 className="status-icon" style={{ color: '#f7931a' }} />
          </button>
          <button 
            className="status-button" 
            title="Trust"
            onClick={() => window.location.href = 'https://bitcoin-corp.vercel.app/trust'}
          >
            <Shield className="status-icon" style={{ color: '#3b82f6' }} />
          </button>
          <button 
            className="status-button" 
            title="Bitcoin Apps Store"
            onClick={() => window.open('https://www.bitcoinapps.store/', '_blank')}
          >
            <Store className="status-icon" style={{ color: '#f97316' }} />
          </button>
          <button 
            className="status-button" 
            title="CashBoard"
            onClick={() => window.open('https://www.cashboard.website/', '_blank')}
          >
            <svg className="status-icon" style={{ color: '#ffffff' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M15.5 9.5C14.815 8.574 13.743 8 12.5 8c-2.21 0-4 1.79-4 4s1.79 4 4 4c1.243 0 2.315-.574 3-1.5" />
            </svg>
          </button>
          <button 
            className="status-button" 
            title="Senseii"
            onClick={() => window.open('https://senseii-zeta.vercel.app/', '_blank')}
          >
            <svg className="status-icon" style={{ color: '#ef4444' }} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 5h18" />
              <path d="M6 5v14" />
              <path d="M18 5v14" />
              <path d="M3 9h18" />
            </svg>
          </button>
          <button 
            className="status-button" 
            title="NPG"
            onClick={() => window.location.href = 'https://www.ninjapunkgirls.website'}
          >
            <Sparkles className="status-icon" style={{ color: '#ec4899' }} />
          </button>
          <button 
            className="status-button" 
            title="Connected"
          >
            <Wifi className="status-icon" style={{ color: '#22c55e' }} />
          </button>
          <button 
            className="status-button" 
            title="Battery: 100%"
          >
            <Battery className="status-icon" style={{ color: '#22c55e' }} />
          </button>
          <div className="status-button" title={mounted ? currentTime.toLocaleDateString() : ''} style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff', fontSize: '12px' }}>
            <Clock className="status-icon" style={{ color: '#ffffff' }} />
            <span>{mounted ? currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '12:00'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BitcoinDock;