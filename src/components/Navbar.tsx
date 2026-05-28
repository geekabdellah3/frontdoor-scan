'use client';

import Link from 'next/link';
import { ShieldCheck, LogIn, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .nav-fixed-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-glass {
          max-width: 1280px;
          margin: 0 auto;
          background: ${isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0)'};
          backdrop-filter: ${isScrolled ? 'blur(16px)' : 'none'};
          -webkit-backdrop-filter: ${isScrolled ? 'blur(16px)' : 'none'};
          border: 1px solid ${isScrolled ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)'};
          border-radius: 20px;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: ${isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)' : 'none'};
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-weight: 800;
          text-decoration: none;
          color: #09090b;
          letter-spacing: -0.02em;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .nav-link {
          font-size: 0.9rem;
          font-weight: 600;
          color: #64748b;
          text-decoration: none;
          transition: color 0.2s ease;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .nav-link:hover {
          color: #09090b;
          background: rgba(0,0,0,0.03);
        }
        .nav-btn-signin {
          font-size: 0.9rem;
          font-weight: 700;
          color: #09090b;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }
        .nav-btn-signin:hover {
          background: rgba(0,0,0,0.04);
        }
        .nav-btn-primary {
          background: #10b981;
          color: white;
          font-size: 0.9rem;
          font-weight: 800;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
          transition: all 0.3s ease;
        }
        .nav-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          background: #059669;
        }

        @media (max-width: 768px) {
          .nav-fixed-container { padding: 12px 16px; }
          .nav-glass { padding: 8px 16px; }
          .nav-logo span { font-size: 1rem; }
          .nav-links-desktop { display: none !important; }
          .nav-btn-signin { padding: 8px 10px; }
          .nav-btn-signin span { display: none; }
          .nav-btn-primary { padding: 8px 16px; font-size: 0.85rem; }
        }
      `}</style>

      <div className="nav-fixed-container">
        <nav className="nav-glass">
          <Link href="/" className="nav-logo">
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '6px', borderRadius: '10px' }}>
              <ShieldCheck color="#10b981" size={20} />
            </div>
            <span>Front Door Scan</span>
          </Link>

          <div className="nav-links-desktop" style={{ display: 'flex', gap: '8px' }}>
            <Link href="/#features" className="nav-link">Features</Link>
            <Link href="/#pricing" className="nav-link">Pricing</Link>
            <Link href="/#faq" className="nav-link">FAQ</Link>
          </div>

          <div className="nav-actions">
            <Link href="/signin" className="nav-btn-signin">
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link href="/signup" className="nav-btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

