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
      <main style={{ padding: '120px 24px 64px', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)' }}>
        <div style={{ 
          background: 'rgba(255,255,255,0.7)', 
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '48px', 
          borderRadius: '16px',
          boxShadow: '0 4px 24px -1px rgba(0,0,0,0.05)',
          border: '1px solid var(--border-color)'
        }}>
          <h1 style={{ fontSize: '2.5rem', color: '#09090b', marginBottom: '8px', fontWeight: 700 }}>Terms of Service</h1>
          <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>Last Updated: May 2026</p>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>1. Acceptance of Terms</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              By accessing and using Front Door Scan ("we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>2. Description of Service</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              Front Door Scan provides environmental health reports for US residential properties. We aggregate public data from federal agencies including the EPA, FEMA, USGS, and CDC. Our service is designed to give you a broad overview of potential environmental hazards near a specific address.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>3. Report Accuracy & Disclaimers</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px', fontWeight: 500, color: '#991B1B', background: '#FFF5F5', padding: '16px', borderRadius: '8px' }}>
              <strong>IMPORTANT:</strong> Front Door Scan reports are informational only and do not constitute professional environmental inspections, legal advice, or guaranteed safety assessments. 
            </p>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              While we strive to provide accurate data by sourcing from government databases, we do not independently verify this data and cannot guarantee its absolute accuracy, completeness, or timeliness. You should always consult licensed environmental professionals before making significant real estate decisions.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>4. Pricing & Payment</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              We offer reports in various packages, including Single Property ($49), 5-Property Bundle ($199), and 25-Property Pack ($499). All fees are non-refundable once a report has been successfully generated and delivered to your account.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>5. User Accounts</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>6. Contact Information</h2>
            <p style={{ lineHeight: 1.6 }}>
              If you have any questions about these Terms, please contact us at: <br/>
              <strong>Email:</strong> support@frontdoorscan.com
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
