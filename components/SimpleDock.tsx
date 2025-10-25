import React from 'react';
import { Home, Briefcase, FileText, Users, Settings, HelpCircle } from 'lucide-react';
import './Dock.css';

const SimpleDock = () => {
  const dockApps = [
    { name: 'Home', icon: Home, color: '#F7931A', href: '/' },
    { name: 'Jobs', icon: Briefcase, color: '#40e0d0', href: '/jobs' },
    { name: 'Contracts', icon: FileText, color: '#4CAF50', href: '/contracts' },
    { name: 'Network', icon: Users, color: '#9333EA', href: '/network' },
    { name: 'Settings', icon: Settings, color: '#6B7280', href: '/settings' },
    { name: 'Help', icon: HelpCircle, color: '#3B82F6', href: '/help' },
  ];

  const handleAppClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  };

  return (
    <div className="dock-container">
      <div className="dock">
        {dockApps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.name}
              className="dock-item"
              onClick={() => handleAppClick(app.href)}
              title={app.name}
            >
              <div className="dock-icon" style={{ color: app.color }}>
                <Icon size={24} />
              </div>
              <span className="dock-label">{app.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleDock;