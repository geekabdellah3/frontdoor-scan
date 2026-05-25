import Link from 'next/link';
import { ShieldCheck, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="container flex items-center justify-between" style={{ padding: '20px 24px', position: 'relative', zIndex: 10 }}>
      <Link href="/" className="flex items-center" style={{ gap: '10px', fontSize: '1.25rem', fontWeight: 700 }}>
        <ShieldCheck color="var(--accent-primary)" size={28} />
        <span>Front Door Fax</span>
      </Link>
      
      <div className="flex items-center" style={{ gap: '24px' }}>
        <div className="flex items-center" style={{ gap: '20px', display: 'none' }} /* Desktop only links */>
          <Link href="#features">Features</Link>
          <Link href="#pricing">Pricing</Link>
          <Link href="#faq">FAQ</Link>
        </div>
        
        <div className="flex items-center" style={{ gap: '12px' }}>
          <Link href="/signin" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogIn size={18} />
            <span>Sign In</span>
          </Link>
          <Link href="/signup" className="btn btn-accent">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
