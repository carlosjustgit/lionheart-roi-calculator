// src/components/Header.jsx
export function Header() {
  return (
    <header style={{
      backgroundColor: 'white',
      padding: '20px 40px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* Logo */}
          <img 
            src="/logo-lionheart.png" // You'll need to add your logo file
            alt="Lionheart Business Logo"
            style={{ height: '40px' }}
          />

          {/* Navigation Links */}
          <nav style={{
            display: 'flex',
            gap: '32px'
          }}>
            <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '500' }}>About us</a>
            <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '500' }}>AI Adoption for SMEs</a>
            <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '500' }}>Innovation & Growth</a>
            <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '500' }}>Data Services</a>
            <a href="#" style={{ color: '#1a1a1a', textDecoration: 'none', fontWeight: '500' }}>Free Data & AI PoC</a>
          </nav>
        </div>

        <button style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Send message
        </button>
      </div>
    </header>
  );
}