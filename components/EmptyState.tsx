import React from 'react';

/** Honest placeholder for a feature that is not live yet. No sample data. */
export default function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 640, margin: '64px auto', padding: '0 16px', textAlign: 'center', color: '#ddd' }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>{title}</h1>
      <p style={{ color: '#999', lineHeight: 1.6 }}>{children ?? 'Nothing here yet. This part of the app is not live.'}</p>
    </div>
  );
}
