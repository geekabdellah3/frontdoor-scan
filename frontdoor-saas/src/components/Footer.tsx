import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: '80px', padding: '64px 24px 24px' }}>
      <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '64px' }}>
        <div>
          <Link href="/" className="flex items-center" style={{ gap: '10px', fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>
            <ShieldCheck color="var(--accent-primary)" size={28} />
            <span>Front Door Fax</span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Comprehensive environmental health reports for most US addresses. Know before you sign.
          </p>
        </div>
        
        <div className="flex flex-col" style={{ gap: '12px' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Product</h4>
          <Link href="#features" style={{ color: 'var(--text-secondary)' }}>Features</Link>
          <Link href="#pricing" style={{ color: 'var(--text-secondary)' }}>Pricing</Link>
          <Link href="/get-started" style={{ color: 'var(--text-secondary)' }}>Order a Report</Link>
        </div>
        
        <div className="flex flex-col" style={{ gap: '12px' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Resources</h4>
          <Link href="/faq" style={{ color: 'var(--text-secondary)' }}>FAQ</Link>
          <Link href="/blog" style={{ color: 'var(--text-secondary)' }}>Blog</Link>
          <Link href="/climate-health" style={{ color: 'var(--text-secondary)' }}>Climate & Health</Link>
        </div>
        
        <div className="flex flex-col" style={{ gap: '12px' }}>
          <h4 style={{ fontWeight: 600, marginBottom: '8px' }}>Legal</h4>
          <Link href="/terms" style={{ color: 'var(--text-secondary)' }}>Terms of Service</Link>
          <Link href="/privacy" style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link>
        </div>
      </div>
      
      <div className="container" style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
        © {new Date().getFullYear()} Front Door Fax. All rights reserved.
      </div>
    </footer>
  );
}
