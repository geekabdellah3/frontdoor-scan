'use client';

import Link from 'next/link';
import { ShieldCheck, ArrowRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0,
      right: 0,
      zIndex: 1000, 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '16px 0'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'var(--text-primary)' }}>
          <div style={{ background: 'var(--text-primary)', padding: '6px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck color="white" size={24} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>Front Door Scan</span>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="nav-main-wrapper">
          <div className="nav-links-desktop" style={{ display: 'flex', gap: '32px' }}>
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
            <Link href="/signin" style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem', padding: '0 12px' }} className="nav-signin-link">
              Sign In
            </Link>
            <Link href="/get-started" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <span>Order Report</span>
              <ArrowRight size={16} className="nav-btn-icon" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 992px) {
          .nav-links-desktop {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .nav-signin-link {
            display: none !important;
          }
          .nav-main-wrapper {
            gap: 12px !important;
          }
          .btn-primary {
            padding: 8px 16px !important;
            font-size: 0.85rem !important;
          }
          .nav-btn-icon {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
