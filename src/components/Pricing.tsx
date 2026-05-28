'use client';

import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: '100px 24px' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '1200px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
            Simple, <span className="text-gradient">Transparent Pricing</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Get the data you need to make an informed decision about your future home.
          </p>
        </div>

        <div className="responsive-grid lg:grid-cols-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', display: 'grid', gap: '64px', alignItems: 'center', marginBottom: '100px' }}>
          <div className="reveal-up" style={{ order: 2 }}>
            <div className="isometric-view">
              <div className="isometric-card glass-card" style={{ borderRadius: '32px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                <Image 
                  src="/couple-reviewing.jpg" 
                  alt="Couple reviewing a report" 
                  fill
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: 'white' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <ShieldCheck size={20} color="var(--accent-primary)" />
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Negotiation Ready</span>
                  </div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Leverage Professional Data</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="reveal-up" style={{ order: 1 }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px' }}>Why homebuyers and renters use Front Door Scan</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6 }}>
              Our users have used these reports to negotiate price reductions, request remediation, or walk away from properties with serious hidden risks.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: <ShieldCheck size={20} color="var(--accent-primary)" />, text: "Identify unseen environmental risks instantly" },
                { icon: <ShieldCheck size={20} color="var(--accent-secondary)" />, text: "Strengthen your negotiating position with sellers" },
                { icon: <ShieldCheck size={20} color="var(--accent-tertiary)" />, text: "Ensure a safe environment for your entire family" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Single Report */}
          <div className="glass-card reveal-up" style={{ padding: '48px', borderRadius: '32px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Single Property</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900 }}>$49</span>
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '1.25rem' }}>$69</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
              One full environmental health report with instant PDF download. Valid forever.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', flex: 1 }}>
              {["Water & Air Analysis", "Flood & Soil Risks", "Superfund Proximity", "Negotiation Guide"].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle2 size={18} color="var(--accent-primary)" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
            
            <Link href="/get-started" className="btn-antigravity-outline" style={{ textAlign: 'center' }}>
              Order Single Report
            </Link>
          </div>
          
          {/* Bundle */}
          <div className="glass-card reveal-up floating" style={{ padding: '48px', borderRadius: '32px', display: 'flex', flexDirection: 'column', borderColor: 'var(--accent-primary)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-primary)', color: 'white', padding: '6px 20px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }}>
              BEST VALUE
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>5-Property Bundle</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 900 }}>$199</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 600 }}>($39/ea)</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
              Compare up to 5 properties side-by-side. Credits valid for 6 months.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', flex: 1 }}>
              {["Everything in Single", "5 Report Credits", "Side-by-side Comparison", "Priority Support"].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Zap size={18} color="var(--accent-primary)" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item}</span>
                </div>
              ))}
            </div>
            
            <Link href="/get-started" className="btn-antigravity" style={{ textAlign: 'center', background: 'var(--accent-primary)' }}>
              Get 5-Property Bundle
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
