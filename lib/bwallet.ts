'use client';

/**
 * bWalletX sign-in and payments over the open BRC-100 wallet interface.
 *
 * WalletClient('auto') picks the right transport: XDM when this page is framed inside
 * bWalletX, window.CWI when a browser extension injects it, otherwise a local wallet on
 * localhost:3321 (bWalletX desktop / `bwalletx serve`). Any BRC-100 wallet works.
 *
 * No keys and no balances live in this app: identity is the wallet's identity key and every
 * paid action is a createAction the wallet shows on its own approval sheet.
 */
import { useCallback, useEffect, useState } from 'react';
import { WalletClient, P2PKH, PublicKey, Utils } from '@bsv/sdk';

export const ORIGINATOR = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const STORE = 'bwallet:identity';
const PAYMAIL_LOOKUP = 'https://pay.bwallet.space/api/paymail/lookup';

export type WalletUser = { identityKey: string; paymail?: string; name: string };

let client: WalletClient | null = null;
export const wallet = (): WalletClient => {
  if (!client) client = new WalletClient('auto', ORIGINATOR);
  return client;
};

const short = (k: string) => `${k.slice(0, 6)}…${k.slice(-4)}`;

export async function lookupPaymail(identityKey: string): Promise<string | undefined> {
  try {
    const r = await fetch(`${PAYMAIL_LOOKUP}?key=${identityKey}`);
    if (!r.ok) return undefined;
    const j = await r.json();
    return typeof j?.paymail === 'string' ? j.paymail : undefined;
  } catch {
    return undefined;
  }
}

export async function connectWallet(): Promise<WalletUser> {
  const w = wallet();
  const { publicKey } = await w.getPublicKey({ identityKey: true });
  const paymail = await lookupPaymail(publicKey);
  const user: WalletUser = { identityKey: publicKey, paymail, name: paymail ? `$${paymail.split('@')[0]}` : short(publicKey) };
  try { localStorage.setItem(STORE, JSON.stringify(user)); } catch {}
  emit(user);
  return user;
}

export function disconnectWallet() {
  try { localStorage.removeItem(STORE); } catch {}
  emit(null);
}

function stored(): WalletUser | null {
  try {
    const s = localStorage.getItem(STORE);
    return s ? (JSON.parse(s) as WalletUser) : null;
  } catch {
    return null;
  }
}

const listeners = new Set<(u: WalletUser | null) => void>();
function emit(u: WalletUser | null) { listeners.forEach((l) => l(u)); }

/** React hook: current wallet user plus connect/disconnect. */
export function useWallet() {
  const [user, setUser] = useState<WalletUser | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setUser(stored());
    listeners.add(setUser);
    return () => { listeners.delete(setUser); };
  }, []);
  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      return await connectWallet();
    } catch (e) {
      setError(e instanceof Error && e.message ? e.message : 'No BRC-100 wallet found. Open this app inside bWalletX, or run bWalletX on this computer.');
      return null;
    } finally {
      setConnecting(false);
    }
  }, []);
  return { user, connecting, error, connect, disconnect: disconnectWallet };
}

/** Pay satoshis to an identity key (P2PKH to its address). The wallet shows its own approval sheet. */
export async function payIdentity(toIdentityKey: string, satoshis: number, description: string) {
  const address = PublicKey.fromString(toIdentityKey).toAddress();
  return wallet().createAction({
    description: description.slice(0, 50).padEnd(5, ' '),
    outputs: [{ lockingScript: new P2PKH().lock(address).toHex(), satoshis, outputDescription: 'payment' }],
    options: { randomizeOutputs: false },
  });
}

/** Write data on-chain as an OP_FALSE OP_RETURN output (0 sats; the wallet pays the fee). Fields are utf8 strings or raw bytes. */
export function opReturnScript(fields: Array<string | number[] | Uint8Array>): string {
  const out: number[] = [0x00, 0x6a];
  for (const f of fields) {
    const bytes = typeof f === 'string' ? Utils.toArray(f, 'utf8') : Array.from(f);
    const n = bytes.length;
    if (n < 76) out.push(n);
    else if (n < 0x100) out.push(0x4c, n);
    else if (n < 0x10000) out.push(0x4d, n & 0xff, n >> 8);
    else out.push(0x4e, n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >>> 24) & 0xff);
    for (let i = 0; i < n; i++) out.push(bytes[i]);
  }
  return Utils.toHex(out);
}

export async function publishRecord(fields: Array<string | number[] | Uint8Array>, description: string) {
  return wallet().createAction({
    description: description.slice(0, 50).padEnd(5, ' '),
    outputs: [{ lockingScript: opReturnScript(fields), satoshis: 0, outputDescription: 'record' }],
  });
}
