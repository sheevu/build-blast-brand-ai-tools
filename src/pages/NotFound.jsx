import { Link } from 'react-router-dom';

/**
 * NotFound - 404 Page Component
 * Priority 4 fix from SEO audit: Proper 404 handling for unknown paths
 * This page returns a real 404 HTTP status (handled by Cloudflare via wrangler.jsonc)
 * and gives users a helpful navigation back to valid pages.
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#020617',
        color: '#f8fafc',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '6rem', fontWeight: 700, color: '#6366f1', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '1rem' }}>
        Yeh page nahi mila!
      </h2>
      <p style={{ color: '#94a3b8', maxWidth: '400px', marginTop: '0.5rem' }}>
        Aapne jo page dhundha wo exist nahi karta. Neeche jakar apne kaam ki service choose karein.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            background: '#6366f1',
            color: '#fff',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Home Jaiye
        </Link>
        <Link
          to="/services/KickStartPack"
          style={{
            background: 'transparent',
            color: '#6366f1',
            border: '1px solid #6366f1',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Services Dekhen
        </Link>
      </div>
    </div>
  );
}
