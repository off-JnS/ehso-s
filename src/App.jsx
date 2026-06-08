
export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0a0a0a',
      color: '#e5e5e5',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: '700',
          color: '#f97316',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}>
          Error 404
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
          color: '#a3a3a3',
        }}>
          Website nicht gefunden
        </p>
      </div>
      <footer style={{
        paddingBottom: '2rem',
        fontSize: '0.85rem',
        color: '#525252',
      }}>
        Brauchen Sie eine Website?{' '}
        <a
          href="https://prj1.de"
          style={{ color: '#f97316', textDecoration: 'underline' }}
        >
          prj1.de
        </a>
      </footer>
    </div>
  )
}
