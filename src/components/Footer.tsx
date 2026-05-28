import Link from 'next/link';
import { ShieldCheck, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#09090b', color: 'white', padding: '100px 24px 40px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Decor */}
      <div style={{ position: 'absolute', bottom: '-10%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '300px', background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 70%)', filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '60px', marginBottom: '80px' }}>
          <div className="footer-brand">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem', fontWeight: 800, color: 'white', textDecoration: 'none', marginBottom: '24px', letterSpacing: '-0.02em' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '8px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                <ShieldCheck color="#10b981" size={24} />
              </div>
              <span>Front Door Scan</span>
            </Link>
            <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem', fontWeight: 500, maxWidth: '320px', marginBottom: '32px' }}>
              Comprehensive environmental health reports for US residential properties. Empowering homebuyers with data.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" style={{ color: '#64748b', transition: 'color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#10b981'} onMouseLeave={e => e.currentTarget.style.color = '#64748b'}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          {[
            { 
              title: 'Product', 
              links: [{label: 'Features', href: '#features'}, {label: 'Pricing', href: '#pricing'}, {label: 'Success Stories', href: '#'}, {label: 'Get Started', href: '/get-started'}] 
            },
            { 
              title: 'Company', 
              links: [{label: 'About Us', href: '#'}, {label: 'Our Data', href: '#'}, {label: 'Blog', href: '#'}, {label: 'Contact', href: '#'}] 
            },
            { 
              title: 'Legal', 
              links: [{label: 'Terms of Service', href: '/terms'}, {label: 'Privacy Policy', href: '/privacy'}, {label: 'Cookie Policy', href: '#'}, {label: 'Disclaimer', href: '#'}] 
            }
          ].map((col, i) => (
            <div key={i} className="footer-col">
              <h4 style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '1px' }}>{col.title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map((link, j) => (
                  <Link key={j} href={link.href} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600, transition: 'all 0.2s ease' }} onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateX(4px)'; }} onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
            © {new Date().getFullYear()} Front Door Scan Inc. Built for transparency.
          </p>
          <div style={{ display: 'flex', gap: '24px', color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Privacy Preferred</span>
            <span>U.S. Data Only</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer div.container > div:first-child { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          footer div.container > div:first-child { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .footer-brand { display: flex; flex-direction: column; align-items: center; }
          .footer-brand p { margin-left: auto; margin-right: auto; }
          .footer-brand div { justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
