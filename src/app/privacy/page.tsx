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
          <h1 style={{ fontSize: '2.5rem', color: '#09090b', marginBottom: '8px', fontWeight: 700 }}>Privacy Policy</h1>
          <p style={{ marginBottom: '32px', color: 'var(--text-secondary)' }}>Last Updated: May 2026</p>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>1. Information We Collect</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              We collect information you provide directly to us when using Front Door Scan, including:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '24px', lineHeight: 1.6, marginBottom: '16px' }}>
              <li>Name and contact information (email address)</li>
              <li>Billing address and payment details</li>
              <li>Property addresses you search for and compile reports on</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>2. How We Use Information</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              We use the collected information to:
            </p>
            <ul style={{ listStyleType: 'disc', paddingLeft: '24px', lineHeight: 1.6, marginBottom: '16px' }}>
              <li>Generate and deliver environmental health reports</li>
              <li>Process payments and manage your account</li>
              <li>Communicate with you regarding your reports or our service</li>
              <li>Improve and optimize our platform</li>
            </ul>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>3. Data Sources</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              Our reports are generated using publicly available data from federal databases, including EPA ECHO, FEMA NFIP, USGS, and CDC ATSDR. We do not use proprietary sensors or private investigators.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>4. Data Sharing</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              We respect your privacy and <strong>do not sell your personal data</strong> to third parties. We only share information with trusted third-party service providers (like payment processors) necessary to operate our service.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>5. Data Security</h2>
            <p style={{ lineHeight: 1.6, marginBottom: '16px' }}>
              We implement industry-standard security measures to protect your information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#09090b', marginBottom: '16px', fontWeight: 600 }}>6. Contact Us</h2>
            <p style={{ lineHeight: 1.6 }}>
              If you have any questions or concerns about this Privacy Policy, please contact us at: <br/>
              <strong>Email:</strong> support@frontdoorscan.com
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
