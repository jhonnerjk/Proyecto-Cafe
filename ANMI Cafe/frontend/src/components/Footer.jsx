import React from 'react';

const Footer = () => {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--card)', color: 'var(--text)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontSize: 14 }}>© {new Date().getFullYear()} ANMI Amboró</p>
        <nav style={{ display: 'flex', gap: 16 }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>Privacidad</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.9 }}>Términos</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
