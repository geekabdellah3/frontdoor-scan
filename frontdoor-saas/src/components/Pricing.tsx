import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Pricing() {
  return (
    <section id="pricing" className="container flex flex-col items-center" style={{ padding: '80px 24px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Simple, <span className="text-gradient">Transparent Pricing</span></h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '64px', textAlign: 'center' }}>
        Get the data you need to make an informed decision.
      </p>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px', width: '100%' }}>
        <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', aspectRatio: '4/3', order: 2 }}>
          <Image 
            src="/couple-reviewing.jpg" 
            alt="Couple reviewing a report" 
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div style={{ order: 1 }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Why homebuyers and renters use Front Door Fax</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '24px', lineHeight: 1.6 }}>
            Buyers have used these reports to negotiate price reductions, request remediation, or walk away from properties with serious hidden risks.
          </p>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0 }}>
            <li className="flex items-center" style={{ gap: '12px', color: 'var(--text-secondary)' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Identify unseen risks</span></li>
            <li className="flex items-center" style={{ gap: '12px', color: 'var(--text-secondary)' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Strengthen your negotiating position</span></li>
            <li className="flex items-center" style={{ gap: '12px', color: 'var(--text-secondary)' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Ensure safety for your family</span></li>
          </ul>
        </div>
      </div>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', width: '100%', maxWidth: '900px' }}>
        
        {/* Single Report */}
        <div className="glass-panel" style={{ padding: '40px', position: 'relative' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Single Property Report</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 700 }}>$49</span>
            <span style={{ color: 'var(--text-secondary)', textDecoration: 'line-through', marginBottom: '8px' }}>$69</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            One full environmental health report with PDF download, valid forever.
          </p>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', listStyle: 'none', padding: 0 }}>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Water & Air Quality</span></li>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Flood & Soil Risk</span></li>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Superfund & Radon</span></li>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Negotiation Points</span></li>
          </ul>
          
          <Link href="/get-started" className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>Get Single Report</Link>
        </div>
        
        {/* Bundle */}
        <div className="glass-panel" style={{ padding: '40px', position: 'relative', borderColor: 'var(--accent-primary)', boxShadow: '0 0 30px rgba(16, 185, 129, 0.1)' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '4px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 }}>
            MOST POPULAR
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>5-Property Bundle</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '24px' }}>
            <span style={{ fontSize: '3rem', fontWeight: 700 }}>$199</span>
            <span style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>($39.80 each)</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Compare up to 5 homes side-by-side. Credits valid 6 months.
          </p>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px', listStyle: 'none', padding: 0 }}>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Everything in Single</span></li>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>5 Report Credits</span></li>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>Side-by-side Comparison</span></li>
            <li className="flex items-center" style={{ gap: '12px' }}><CheckCircle2 color="var(--accent-primary)" size={20} /><span>30-day money-back guarantee</span></li>
          </ul>
          
          <Link href="/get-started" className="btn btn-accent" style={{ width: '100%', padding: '16px' }}>Get Bundle</Link>
        </div>
        
      </div>
    </section>
  );
}
