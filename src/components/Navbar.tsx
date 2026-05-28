'use client';

import Link from 'next/link';
import { ShieldCheck, LogIn, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 1000, 
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      width: '100%',
      padding: '12px 0'
    }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '1200px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', fontWeight: 800, textDecoration: 'none', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
          <ShieldCheck color="var(--accent-primary)" size={28} className="nav-logo-icon" />
          <span className="nav-logo-text">Front Door Scan</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '24px' }}>
            {["Features", "Pricing", "FAQ"].map((item) => (
              <Link 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                style={{ 
                  textDecoration: 'none', 
                  color: 'var(--text-secondary)', 
                  fontWeight: 600, 
                  fontSize: '0.95rem',
                  transition: 'color 0.2s ease' 
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {item}
              </Link>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/signin" className="btn-antigravity-outline" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LogIn size={18} />
              <span className="nav-btn-text">Sign In</span>
            </Link>
            <Link href="/get-started" className="btn-antigravity" style={{ padding: '8px 20px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Order Report</span>
              <ArrowRight size={16} className="nav-btn-icon" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Desktop Default is flex */
        .nav-links-desktop {
          display: flex;
        }
        .nav-logo-text, .nav-btn-text {
          display: inline;
        }

        /* Tablet Breakpoint */
        @media (max-width: 992px) {
          .nav-links-desktop {
            display: none;
          }
        }

        /* Mobile Breakpoint */
        @media (max-width: 640px) {
          .nav-logo-text {
            display: none;
          }
          .nav-btn-text {
            display: none;
          }
          .nav-btn-icon {
            display: none;
          }
          .container {
            padding: 0 16px !important;
          }
          nav {
            padding: 8px 0 !important;
          }
        }
      `}</style>
    </nav>
  );
}
