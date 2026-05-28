import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Front Door Scan',
  description: 'Privacy policy for Front Door Scan users.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: '140px 24px 100px', position: 'relative', overflow: 'hidden' }}>
        {/* Background Decorative Glows */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '600px',
          background: 'radial-gradient(circle at center, var(--accent-tertiary) 0%, transparent 70%)',
          zIndex: 0,
          opacity: 0.2
        }} />

        <div className="container" style={{ margin: '0 auto', maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <div className="glass-card" style={{ padding: '64px 48px', borderRadius: '40px' }}>
            
            <div className="inline-flex items-center glass-card" style={{ padding: '8px 16px', borderRadius: '999px', display: 'inline-flex', gap: '8px', marginBottom: '24px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-tertiary)' }}>
              Legal Documentation
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '64px' }}>
              Effective Date: May 2026
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              
              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>01</span>
                  Information We Collect
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  We collect information you provide directly to us when using Front Door Scan, including:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Name and contact information (email address)', 'Billing address and payment details', 'Property addresses you search for'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>02</span>
                  How We Use Information
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  We use the collected information to:
                </p>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Generate and deliver environmental health reports',
                    'Process payments and manage your account',
                    'Communicate with you regarding your reports',
                    'Improve and optimize our platform'
                  ].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>03</span>
                  Data Sources
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Our reports are generated using publicly available data from federal databases, including EPA ECHO, FEMA NFIP, USGS, and CDC ATSDR. We do not use proprietary sensors or private investigators.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>04</span>
                  Data Sharing
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  We respect your privacy and <span style={{ color: 'var(--text-primary)', fontWeight: 700, borderBottom: '2px solid var(--accent-primary-glow)' }}>do not sell your personal data</span> to third parties. We only share information with trusted third-party service providers (like payment processors) necessary to operate our service.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>05</span>
                  Data Security
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  We implement industry-standard security measures to protect your information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
                </p>
              </section>

              <section style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>Contact Information</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Support Email</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>support@frontdoorscan.com</div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
