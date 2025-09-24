'use client'

export default function Footer() {
  return (
    <footer style={{
      background: '#1a1a1a',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '20px 0',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
      }}>
        <div style={{
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.9)',
          fontWeight: '600',
          letterSpacing: '0.5px'
        }}>
          © 2025 The Bitcoin Corporation LTD.
        </div>
        <div style={{
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center'
        }}>
          Registered in England and Wales • Company No. 16735102
        </div>
        <div style={{
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.6)',
          marginTop: '5px'
        }}>
          Building the future of jobs on Bitcoin BSV
        </div>
      </div>
    </footer>
  )
}