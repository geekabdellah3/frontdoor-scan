import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Front Door Scan',
  description: 'Terms of service and legal agreement for Front Door Scan users.',
};

export default function TermsPage() {
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
          background: 'radial-gradient(circle at center, var(--accent-primary-glow) 0%, transparent 70%)',
          zIndex: 0,
          opacity: 0.4
        }} />

        <div className="container" style={{ margin: '0 auto', maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <div className="glass-card" style={{ padding: '64px 48px', borderRadius: '40px' }}>
            
            <div className="inline-flex items-center glass-card" style={{ padding: '8px 16px', borderRadius: '999px', display: 'inline-flex', gap: '8px', marginBottom: '24px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-primary)' }}>
              Legal Documentation
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
              Terms of <span className="text-gradient">Service</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '64px' }}>
              Last Updated: May 2026
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
              
              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>01</span>
                  Acceptance of Terms
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  By accessing and using Front Door Scan (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>02</span>
                  Description of Service
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Front Door Scan provides environmental health reports for US residential properties. We aggregate public data from federal agencies including the EPA, FEMA, USGS, and CDC. Our service is designed to give you a broad overview of potential environmental hazards near a specific address.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>03</span>
                  Report Accuracy & Disclaimers
                </h2>
                <div style={{ padding: '24px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.1)', borderRadius: '24px', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Critical Disclosure</span>
                  </div>
                  <p style={{ color: '#991b1b', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.5 }}>
                    Front Door Scan reports are informational only and do not constitute professional environmental inspections, legal advice, or guaranteed safety assessments.
                  </p>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  While we strive to provide accurate data by sourcing from government databases, we do not independently verify this data and cannot guarantee its absolute accuracy, completeness, or timeliness. You should always consult licensed environmental professionals before making significant real estate decisions.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>04</span>
                  Pricing & Payment
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  We offer reports in various packages, including Single Property ($49), 5-Property Bundle ($199), and 25-Property Pack ($499). All fees are non-refundable once a report has been successfully generated and delivered to your account.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary-glow)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 800 }}>05</span>
                  User Accounts
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section style={{ padding: '32px', background: 'var(--bg-secondary)', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '12px' }}>Contact Information</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Legal Support</div>
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
