import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MenuItem {
  label?: string;
  action?: () => void;
  href?: string;
  divider?: boolean;
  shortcut?: string;
}

interface MenuData {
  label: string;
  items: MenuItem[];
}

interface TaskbarProps {
  isAuthenticated: boolean;
  currentUser: any;
  onLogout: () => void;
  toggleDarkMode?: () => void;
  isDarkMode?: boolean;
}

const JobsTaskbar: React.FC<TaskbarProps> = ({ 
  isAuthenticated, 
  currentUser, 
  onLogout,
  toggleDarkMode,
  isDarkMode
}) => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showBitcoinSuite, setShowBitcoinSuite] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setShowBitcoinSuite(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menus: { [key: string]: MenuData } = {
    file: {
      label: '📄 Jobs',
      items: [
        { label: 'Post New Job', action: () => navigate('/post-job'), shortcut: '⌘N' },
        { label: 'Browse Jobs', action: () => navigate('/jobs'), shortcut: '⌘O' },
        { label: 'My Listings', action: () => navigate('/my-jobs'), shortcut: '⌘M' },
        { divider: true },
        { label: 'Import Jobs Data', action: () => console.log('Import'), shortcut: '⌘I' },
        { label: 'Export Jobs Data', action: () => console.log('Export'), shortcut: '⌘E' },
      ]
    },
    edit: {
      label: '✏️ Teams',
      items: [
        { label: 'Create Team', action: () => navigate('/create-team') },
        { label: 'Join Team', action: () => navigate('/join-team') },
        { label: 'My Teams', action: () => navigate('/my-teams') },
        { divider: true },
        { label: 'Team Settings', action: () => navigate('/team-settings') }
      ]
    },
    view: {
      label: '👁️ View',
      items: [
        { label: isDarkMode ? 'Light Mode' : 'Dark Mode', action: toggleDarkMode, shortcut: '⌘D' },
        { divider: true },
        { label: 'Jobs Board', action: () => navigate('/jobs') },
        { label: 'Token Exchange', action: () => navigate('/exchange') },
        { label: 'Developer Profiles', action: () => navigate('/developers') }
      ]
    },
    tools: {
      label: '🔧 Tools',
      items: [
        { label: 'Salary Calculator', action: () => navigate('/calculator') },
        { label: 'Contract Templates', action: () => navigate('/contracts') },
        { label: 'Token Analytics', action: () => navigate('/analytics') },
        { divider: true },
        { label: 'API Docs', action: () => navigate('/api-docs') }
      ]
    },
    window: {
      label: '🪟 Window',
      items: [
        { label: 'Jobs Exchange', action: () => navigate('/exchange') },
        { label: 'Developer Portal', action: () => navigate('/developers') },
        { label: 'Documentation', action: () => navigate('/docs') },
        { divider: true },
        { label: 'Full Screen', action: () => document.documentElement.requestFullscreen() }
      ]
    },
    help: {
      label: '❓ Help',
      items: [
        { label: 'Getting Started', action: () => navigate('/docs/getting-started') },
        { label: 'API Documentation', action: () => navigate('/docs/api') },
        { divider: true },
        { label: 'About Bitcoin Jobs', action: () => navigate('/about') },
        { label: 'Contact Support', action: () => navigate('/support') }
      ]
    }
  };

  const handleMenuClick = (menuKey: string) => {
    setActiveMenu(activeMenu === menuKey ? null : menuKey);
  };

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.href) {
      window.open(item.href, '_blank');
    }
    setActiveMenu(null);
  };

  const openBitcoinApp = (appName: string) => {
    const baseUrl = window.location.hostname === 'localhost' 
      ? `http://localhost:${getPortForApp(appName)}`
      : `https://${appName}.bitcoinapps.store`;
    window.open(baseUrl, '_blank');
    setShowBitcoinSuite(false);
  };

  const getPortForApp = (appName: string) => {
    const ports: { [key: string]: number } = {
      'bitcoin-spreadsheet': 3000,
      'bitcoin-jobs': 2060,
      'bitcoin-docs': 3002,
      'bitcoin-wallet': 3003,
      'bitcoin-exchange': 3004
    };
    return ports[appName] || 3000;
  };

  return (
    <div className="bitcoin-taskbar" ref={menuRef}>
      <div className="taskbar-left">
        <button 
          className="bitcoin-button"
          onClick={() => setShowBitcoinSuite(!showBitcoinSuite)}
        >
          <img 
            src="/favicon.png" 
            alt="Bitcoin" 
            className="bitcoin-logo"
          />
        </button>

        {!isMobile && (
          <div className="taskbar-menus">
            {Object.entries(menus).map(([key, menu]) => (
              <div key={key} className="menu-item">
                <button 
                  className={`menu-button ${activeMenu === key ? 'active' : ''}`}
                  onClick={() => handleMenuClick(key)}
                >
                  {menu.label}
                </button>
                {activeMenu === key && (
                  <div className="menu-dropdown">
                    {menu.items.map((item, index) => (
                      item.divider ? (
                        <div key={index} className="menu-divider" />
                      ) : (
                        <button
                          key={index}
                          className="menu-dropdown-item"
                          onClick={() => handleMenuItemClick(item)}
                        >
                          <span>{item.label}</span>
                          {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="taskbar-center">
        <span className="taskbar-title">Bitcoin Jobs Exchange</span>
      </div>

      <div className="taskbar-right">
        <span className="taskbar-time">
          {new Date().toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
          })}
        </span>
      </div>

      {showBitcoinSuite && (
        <div className="bitcoin-suite-menu">
          <div className="suite-header">
            <img src="/favicon.png" alt="Bitcoin" className="suite-logo" />
            <span>Bitcoin Apps Suite</span>
          </div>
          <div className="suite-apps">
            <button onClick={() => openBitcoinApp('bitcoin-spreadsheet')} className="suite-app">
              📊 Bitcoin Spreadsheet
            </button>
            <button onClick={() => navigate('/exchange')} className="suite-app active">
              💼 Bitcoin Jobs
            </button>
            <button onClick={() => openBitcoinApp('bitcoin-docs')} className="suite-app">
              📚 Bitcoin Docs
            </button>
            <button onClick={() => openBitcoinApp('bitcoin-wallet')} className="suite-app">
              💰 Bitcoin Wallet
            </button>
            <button onClick={() => openBitcoinApp('bitcoin-exchange')} className="suite-app">
              💱 Bitcoin Exchange
            </button>
          </div>
          <div className="suite-footer">
            {isAuthenticated ? (
              <button onClick={onLogout} className="suite-logout">
                Sign Out
              </button>
            ) : (
              <button onClick={() => navigate('/login')} className="suite-login">
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsTaskbar;