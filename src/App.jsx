import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Calculator } from './components/Calculator';
import { Instructions } from './components/Instructions';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#030B2E',
      fontFamily: 'Roboto, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

          body {
            margin: 0;
            padding: 0;
          }
        `}
      </style>
      <Header />
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Instructions />
          <Calculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;