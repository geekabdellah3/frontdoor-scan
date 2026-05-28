import Link from 'next/link';
import { ShieldCheck, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between" style={{ 
      padding: '16px 24px', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      width: '100%'
    }}>
      <div className="container flex items-center justify-between" style={{ padding: 0 }}>
        <Link href="/" className="flex items-center" style={{ gap: '10px', fontSize: '1.25rem', fontWeight: 700 }}>
          <ShieldCheck color="var(--accent-primary)" size={28} />
          <span>Front Door Scan</span>
        </Link>
        
        <div className="flex items-center" style={{ gap: '24px' }}>
          <div className="flex items-center" style={{ gap: '20px', display: 'none' }} /* Desktop only links */>
            <Link href="#features">Features</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#faq">FAQ</Link>
          </div>
          
          <div className="flex items-center" style={{ gap: '12px' }}>
            <Link href="/signin" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px' }}>
              <LogIn size={18} />
              <span>Sign In</span>
            </Link>
            <Link href="/signup" className="btn btn-accent" style={{ padding: '8px 20px' }}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
