import { Link } from 'react-router-dom';

/**
 * AboutPage - /about route
 * Fix for Search Console: 'Discovered - currently not indexed'
 * Google found https://vyapai.in/about via external links but it had no route.
 * This page provides real indexable content for /about.
 */
export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Canonical meta is set dynamically - this page is https://vyapai.in/about */}

      {/* Header Nav */}
      <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e293b' }}>
        <Link to="/" style={{ color: '#6366f1', fontWeight: 700, fontSize: '1.25rem', textDecoration: 'none' }}>Vyapai</Link>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link>
          <Link to="/services/KickStartPack" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Services</Link>
          <Link to="/about" style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>About</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2, marginBottom: '1rem' }}>
          Vyapai — AI Growth Engine for MSMEs
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '700px' }}>
          Vyapai is a product by <strong style={{ color: '#f1f5f9' }}>Sudarshan AI Labs Pvt. Ltd.</strong>, based in Lucknow, Uttar Pradesh.
          We build AI-first growth systems for small and medium businesses (MSMEs) across India.
        </p>

        {/* Mission */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: '#0f172a', borderRadius: '1rem', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#6366f1', marginBottom: '0.75rem' }}>Our Mission</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
            To make AI-powered marketing, automation, and local SEO accessible to every MSME in India —
            starting at just ₹89. We believe every dukaan, every business deserves to grow with intelligent tools.
          </p>
        </div>

        {/* What We Do */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: '#0f172a', borderRadius: '1rem', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#6366f1', marginBottom: '1rem' }}>What We Do</h2>
          <ul style={{ color: '#94a3b8', lineHeight: 2, paddingLeft: '1.25rem' }}>
            <li>WhatsApp Business Automation & Chatbots</li>
            <li>Local SEO & Google My Business Optimization</li>
            <li>AI-Powered Content & Social Media Marketing</li>
            <li>Custom Business Websites & Landing Pages</li>
            <li>SaaS Development & Excel Automation</li>
            <li>Business Growth Consultation & Strategy</li>
          </ul>
        </div>

        {/* Location & Contact */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: '#0f172a', borderRadius: '1rem', border: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#6366f1', marginBottom: '0.75rem' }}>Contact Us</h2>
          <p style={{ color: '#94a3b8', lineHeight: 2 }}>
            📍 Indira Nagar, Lucknow, Uttar Pradesh — 226016<br />
            📞 +91-7388833006<br />
            ✉️ hello@sudarshan.ai<br />
            🌐 <a href="https://vyapai.in" style={{ color: '#6366f1' }}>vyapai.in</a>
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/services/KickStartPack"
            style={{ background: '#6366f1', color: '#fff', padding: '0.875rem 1.75rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}
          >
            View Our Services
          </Link>
          <Link
            to="/"
            style={{ background: 'transparent', color: '#6366f1', border: '1px solid #6366f1', padding: '0.875rem 1.75rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 600 }}
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Footer with Internal Links */}
      <footer style={{ borderTop: '1px solid #1e293b', padding: '2rem', textAlign: 'center', color: '#475569', fontSize: '0.85rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <Link to="/" style={{ color: '#6366f1', textDecoration: 'none' }}>Home</Link>
          <Link to="/about" style={{ color: '#6366f1', textDecoration: 'none' }}>About</Link>
          <Link to="/services/KickStartPack" style={{ color: '#6366f1', textDecoration: 'none' }}>KickStart Pack</Link>
          <Link to="/services/WhatsAppBusinessBot" style={{ color: '#6366f1', textDecoration: 'none' }}>WhatsApp Bot</Link>
          <Link to="/services/SEOContentBoost" style={{ color: '#6366f1', textDecoration: 'none' }}>SEO Boost</Link>
          <Link to="/services/SaaSDevelopment" style={{ color: '#6366f1', textDecoration: 'none' }}>SaaS Dev</Link>
        </div>
        <p>© 2026 Sudarshan AI Labs Pvt. Ltd. | Lucknow, UP, India</p>
      </footer>
    </div>
  );
}
