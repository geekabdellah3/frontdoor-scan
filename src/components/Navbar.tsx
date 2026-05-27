import Link from 'next/link';
import { ShieldCheck, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <>
      <style>{`
        .nav-wrapper {
          padding: 14px 24px;
          position: relative;
          z-index: 10;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.15rem;
          font-weight: 700;
          text-decoration: none;
          color: inherit;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .nav-logo-icon { flex-shrink: 0; }
        .nav-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .nav-signin { display: flex; align-items: center; gap: 6px; white-space: nowrap; }
        .nav-signin-text { display: inline; }
        .nav-btn-get { white-space: nowrap; }

        @media (max-width: 500px) {
          .nav-wrapper { padding: 12px 14px; }
          .nav-logo { font-size: 0.95rem; gap: 6px; }
          .nav-logo-icon { width: 22px; height: 22px; }
          .nav-signin-text { display: none; }
          .nav-signin { padding: 8px 10px !important; }
          .nav-btn-get { padding: 8px 12px !important; font-size: 0.82rem !important; }
        }
      `}</style>
      <nav className="container flex items-center justify-between nav-wrapper">
        <Link href="/" className="nav-logo">
          <ShieldCheck className="nav-logo-icon" color="var(--accent-primary)" size={24} />
          <span>Front Door Scan</span>
        </Link>

        <div className="nav-actions">
          <Link href="/signin" className="btn btn-outline nav-signin">
            <LogIn size={16} />
            <span className="nav-signin-text">Sign In</span>
          </Link>
          <Link href="/signup" className="btn btn-accent nav-btn-get">
            Get Started
          </Link>
        </div>
      </nav>
    </>
  );
}

