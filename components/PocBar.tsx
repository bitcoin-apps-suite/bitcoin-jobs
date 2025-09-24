'use client';

import React from 'react';
import Link from 'next/link';

interface PocBarProps {
  color?: string;
}

export default function PocBar({ color = '#8b5cf6' }: PocBarProps) {
  return (
    <div 
      className="poc-banner"
      style={{
        position: 'fixed',
        top: 0, // Above taskbar
        left: 0,
        right: 0,
        height: '32px',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Left aligned
        zIndex: 9999,
        fontSize: '13px',
        fontWeight: '500',
        color: 'white',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        padding: '0 12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px' }}>⚠️</span>
        <span style={{ fontWeight: '600' }}>PROOF OF CONCEPT:</span>
        <span style={{ opacity: 0.9 }}>This is a demonstration version.</span>
        <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', fontSize: '12px' }}>
          <Link 
            href="/studio" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Studio
          </Link>
          <Link 
            href="/community" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Community
          </Link>
          <Link 
            href="/token" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Token
          </Link>
          <a 
            href="https://github.com/bitcoin-apps-suite/bitcoin-music"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}