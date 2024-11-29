// src/components/Footer.jsx
export function Footer() {
  return (
    <footer style={{
      backgroundColor: 'rgba(255,255,255,0.05)',
      padding: '40px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <img 
            src="/lionheart-logo-white.png" // You'll need to add your white logo
            alt="Lionheart Business Logo"
            style={{ height: '30px' }}
          />
          <p style={{ marginTop: '12px' }}>© 2024 Lionheart Business. All rights reserved.</p>
        </div>
        <div style={{
          display: 'flex',
          gap: '40px'
        }}>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Contact Us</a>
        </div>
      </div>
    </footer>
  );
}