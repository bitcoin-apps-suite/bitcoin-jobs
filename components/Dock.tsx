import React, { useState, useEffect } from 'react';
import { Wallet, Mail, Music, FileText, HardDrive, Calendar, Search, Table, Share2, Briefcase, Store, Wifi, Volume2, Battery, Clock, TrendingUp } from 'lucide-react';
import './Dock.css';

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

const Dock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getIconColor = (colorClass: string): string => {
    const colorMap: { [key: string]: string } = {
      'text-orange-500': '#f97316',
      'text-yellow-500': '#eab308',
      'text-red-500': '#ef4444',
      'text-purple-500': '#a855f7',
      'text-fuchsia-500': '#d946ef',
      'text-green-500': '#22c55e',
      'text-blue-500': '#3b82f6',
      'text-gray-500': '#6b7280',
      'text-sky-400': '#38bdf8',
      'text-cyan-500': '#06b6d4',
      'text-emerald-400': '#34d399'
    };
    return colorMap[colorClass] || '#ffffff';
  };

  const dockApps: DockApp[] = [
    { id: 'bapps-store', name: 'Bitcoin Apps Store', icon: Store, color: 'text-orange-500', url: 'https://www.bitcoinapps.store/', isImage: true },
    { name: 'Bitcoin Wallet', icon: Wallet, color: 'text-yellow-500', url: 'https://bitcoin-wallet-sable.vercel.app' },
    { name: 'Bitcoin Email', icon: Mail, color: 'text-red-500', url: 'https://bitcoin-email.vercel.app' },
    { name: 'Bitcoin Music', icon: Music, color: 'text-purple-500', url: 'https://bitcoin-music.vercel.app' },
    { name: 'Bitcoin Writer', icon: FileText, color: 'text-orange-500', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Drive', icon: HardDrive, color: 'text-green-500', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Calendar', icon: Calendar, color: 'text-fuchsia-500', url: 'https://bitcoin-calendar.vercel.app' },
    { name: 'Bitcoin Exchange', icon: TrendingUp, color: 'text-blue-500', url: 'https://bitcoin-exchange.vercel.app' },
    { name: 'Bitcoin Search', icon: Search, color: 'text-gray-500', url: 'https://bitcoin-search.vercel.app', disabled: true },
    { name: 'Bitcoin Shares', icon: Share2, color: 'text-gray-500', url: 'https://bitcoin-shares.vercel.app', disabled: true },
    { name: 'Bitcoin Jobs', icon: Briefcase, color: 'text-emerald-400', url: 'https://bitcoin-jobs.vercel.app', current: true },
  ];

  const handleAppClick = (app: DockApp) => {
    if (!app.disabled && app.url && !app.current) {
      window.location.href = app.url;
    }
  };

  return (
    <div className="bitcoin-dock">
      <div className="dock-container">
        {/* App icons on the left */}
        <div className="dock-apps">
          {dockApps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.name}
              className={`dock-app ${app.current ? 'active' : ''} ${app.disabled ? 'disabled' : ''}`}
              onClick={() => handleAppClick(app)}
              title={app.name}
              disabled={app.disabled}
            >
              {app.id === 'bapps-store' ? (
                <div className="dock-app-icon">
                  <img src="/bapps-icon.jpg" alt="BAPPS" className="dock-app-image" />
                </div>
              ) : (
                <Icon className="dock-app-icon" style={{ color: getIconColor(app.color) }} />
              )}
              {app.current && <span className="dock-indicator" />}
            </button>
          );
        })}
        </div>
        
        {/* Status icons on the right */}
        <div className="dock-status">
          <div className="dock-divider" />
          <button className="status-button" title="Connected">
            <Wifi className="status-icon connected" />
          </button>
          <button className="status-button" title="Volume">
            <Volume2 className="status-icon" />
          </button>
          <button className="status-button" title="Battery: 100%">
            <Battery className="status-icon connected" />
          </button>
          <div className="status-time" title={mounted ? currentTime.toLocaleDateString() : ''}>
            <Clock className="status-icon" />
            <span>{mounted ? currentTime.toLocaleTimeString() : '12:00:00 AM'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dock;