'use client';

import React, { useEffect } from 'react';
import { useWallet } from '@/lib/bwallet';

const gold = '#F5B800';

/** Sign in with bWalletX (or any BRC-100 wallet). Identity = the wallet's identity key. */
export default function WalletAuth({ onAuthChange }: { onAuthChange?: (signedIn: boolean) => void } = {}) {
  const { user, connecting, error, connect, disconnect } = useWallet();
  useEffect(() => { onAuthChange?.(!!user); }, [user, onAuthChange]);

  if (user) {
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <span title={user.identityKey} style={{ color: gold, fontWeight: 600 }}>{user.name}</span>
        <button onClick={disconnect} style={{ background: 'transparent', color: '#aaa', border: '1px solid #444', borderRadius: 6, padding: '3px 8px', cursor: 'pointer', fontSize: 12 }}>
          Sign out
        </button>
      </div>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={() => { void connect(); }}
        disabled={connecting}
        style={{ background: gold, color: '#1a1300', border: 0, borderRadius: 6, padding: '5px 12px', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}
      >
        {connecting ? 'Connecting…' : 'Sign in with bWalletX'}
      </button>
      {error && <span role="alert" style={{ color: '#f87171', fontSize: 12, maxWidth: 260 }}>{error}</span>}
    </span>
  );
}
