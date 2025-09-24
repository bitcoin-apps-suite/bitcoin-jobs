import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">₿ Bitcoin Spreadsheet</h3>
            <p className="footer-tagline">Secure, encrypted spreadsheets on the blockchain</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="/docs">Documentation</a>
              <a href="/token">$BSHEETS Token</a>
              <a href="/exchange">Exchange</a>
              <a href="/3d">3D View</a>
            </div>
            
            <div className="footer-column">
              <h4>Developers</h4>
              <a href="/contracts">Contracts</a>
              <a href="/tasks">Open Tasks</a>
              <a href="/contributions">Contributors</a>
              <a href="https://github.com/bitcoin-apps-suite/bitcoin-spreadsheet" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/bap">About BAP</a>
              <a href="https://bitcoinapps.store" target="_blank" rel="noopener noreferrer">Bitcoin Apps</a>
              <a href="https://twitter.com/b0ase" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="mailto:support@bitcoinapps.store">Contact</a>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="/license">Open BSV License</a>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="https://find-and-update.company-information.service.gov.uk/company/16735102" target="_blank" rel="noopener noreferrer">Company Info</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© 2025 The Bitcoin Corporation LTD</p>
            <p>UK Company No. 16735102 | All rights reserved</p>
          </div>
          
          <div className="footer-badges">
            <span className="badge">Open BSV License</span>
            <span className="badge">Built on BSV</span>
            <span className="badge">HandCash Connect</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;