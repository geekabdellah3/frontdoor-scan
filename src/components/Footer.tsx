'use client';

import Link from 'next/link';
import { ShieldCheck, Mail, MapPin, Globe, Code } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ marginTop: '100px', padding: '100px 24px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background glow */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '300px', background: 'radial-gradient(circle, var(--accent-primary-glow) 0%, transparent 70%)', zIndex: -1, opacity: 0.5 }}></div>
      
      <div className="container glass-card" style={{ margin: '0 auto', maxWidth: '1200px', padding: '64px', borderRadius: '40px', background: 'rgba(255,255,255,0.4)' }}>
        <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', display: 'grid', gap: '64px', marginBottom: '80px' }}>
          
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" className="flex items-center" style={{ gap: '10px', fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', display: 'flex' }}>
              <ShieldCheck color="var(--accent-primary)" size={32} />
              <span className="text-gradient">Front Door Scan</span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem', maxWidth: '340px', marginBottom: '32px' }}>
              We provide professional environmental health data for every US home. Know exactly what you&apos;re moving into.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[Globe, Code].map((Icon, i) => (
                <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', transition: 'all 0.3s ease' }} className="hover:bg-accent">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Product</h4>
            <Link href="#features" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Features</Link>
            <Link href="#pricing" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Pricing</Link>
            <Link href="/get-started" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Order Report</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Resources</h4>
            <Link href="/faq" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>FAQ</Link>
            <Link href="/blog" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Blog</Link>
            <Link href="/climate-health" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Climate Health</Link>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px', color: 'var(--text-primary)' }}>Legal</h4>
            <Link href="/terms" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Terms</Link>
            <Link href="/privacy" style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Privacy</Link>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '24px', paddingTop: '40px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
            © {new Date().getFullYear()} Front Door Scan. Built for peace of mind.
          </div>
          <div style={{ display: 'flex', gap: '32px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> support@frontdoorscan.com</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Austin, Texas</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
