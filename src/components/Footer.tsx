'use client';

import Link from 'next/link';
import { ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '100px 0 60px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '64px', marginBottom: '80px' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)', marginBottom: '24px' }}>
              <div style={{ background: 'var(--text-primary)', padding: '6px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck color="white" size={24} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Front Door Scan</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '320px', fontSize: '1rem' }}>
              We provide professional environmental health data for every US home. Know exactly what you’re moving into.
            </p>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Product</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {["Features", "Pricing", "Order Report"].map((item) => (
                <Link key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{item}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Resources</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {["FAQ", "Blog", "Climate Health"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase().replace(' ', '-')}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{item}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Legal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {["Terms", "Privacy"].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>{item}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, marginBottom: '24px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <Mail size={16} /> support@frontdoorscan.com
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                <MapPin size={16} /> Austin, Texas
              </div>
            </div>
          </div>

        </div>

        <div style={{ paddingTop: '40px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            © 2026 Front Door Scan. Built for peace of mind.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Social links placeholder if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
}
