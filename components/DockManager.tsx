'use client';

import React, { useState, useEffect } from 'react';
import BitcoinDock from './BitcoinDock';
import MinimalDock from './MinimalDock';

interface DockManagerProps {
  currentApp?: string; // ID of the current app (e.g., 'bitcoin-identity', 'bitcoin-writer')
}

const DockManager: React.FC<DockManagerProps> = ({ currentApp = 'bitcoin-jobs' }) => {
  const [dockStyle, setDockStyle] = useState<string>('minimal');

  useEffect(() => {
    // Get initial dock style from localStorage, default to minimal
    const savedStyle = localStorage.getItem('dockStyle') || 'minimal';
    setDockStyle(savedStyle);

    // Listen for dock style changes
    const handleDockStyleChange = (event: CustomEvent) => {
      setDockStyle(event.detail);
    };

    window.addEventListener('dockStyleChanged', handleDockStyleChange as EventListener);

    return () => {
      window.removeEventListener('dockStyleChanged', handleDockStyleChange as EventListener);
    };
  }, []);

  return (
    <>
      {dockStyle === 'minimal' ? <MinimalDock currentApp={currentApp} /> : <BitcoinDock currentApp={currentApp} />}
    </>
  );
};

export default DockManager;