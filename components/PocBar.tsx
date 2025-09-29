'use client';

import React from 'react';
import Link from 'next/link';

interface PocBarProps {
  color?: string;
}

export default function PocBar({ color = '#40e0d0' }: PocBarProps) {
  return (
    <div 
      className="bitcoin-jobs-poc-bar"
      style={{
        position: 'fixed',
        top: 0, // Above taskbar
        left: 0,
        right: 0,
        height: '32px',
        backgroundColor: color,
        background: `linear-gradient(135deg, ${color}, #20b2aa) !important`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Left aligned
        zIndex: 10001,
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
            href="/contracts" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Contracts
          </Link>
          <Link 
            href="/tasks" 
            style={{ 
              color: 'white', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Tasks
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
            href="https://github.com/bitcoin-apps-suite/bitcoin-jobs"
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