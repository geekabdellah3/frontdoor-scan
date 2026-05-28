'use client';

import { CheckCircle2, ArrowRight, Zap, Trophy, ShieldCheck } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" style={{ background: 'var(--bg-secondary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>Simple, transparent pricing.</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Get the data you need to make an informed decision about your future home.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 440px))', gap: '32px', justifyContent: 'center' }}>
          
          {/* Single Property */}
          <div className="glass-card" style={{ padding: '48px', borderRadius: '32px', background: 'white', position: 'relative' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Single Property</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '32px' }}>One full environmental health report with instant PDF download. Valid forever.</p>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '40px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800 }}>$49</span>
              <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>$69</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
              {[
                "Water & Air Analysis",
                "Flood & Soil Risks",
                "Superfund Proximity",
                "Negotiation Guide"
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={20} color="var(--accent-primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn-outline" style={{ width: '100%', padding: '16px' }}>
              Order Single Report
            </button>
          </div>

          {/* 5-Property Bundle */}
          <div className="premium-shadow" style={{ 
            padding: '48px', 
            borderRadius: '32px', 
            background: 'var(--text-primary)', 
            color: 'white',
            position: 'relative',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--accent-primary)', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={14} /> BEST VALUE
            </div>

            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>5-Property Bundle</div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', marginBottom: '32px' }}>Compare up to 5 properties side-by-side. Credits valid for 6 months.</p>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800 }}>$199</span>
            </div>
            <div style={{ color: 'var(--accent-primary)', fontWeight: 700, fontSize: '1rem', marginBottom: '40px' }}>$39 per report</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
              {[
                "Everything in Single",
                "5 Report Credits",
                "Side-by-side Comparison",
                "Priority Support"
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600 }}>
                  <CheckCircle2 size={20} color="var(--accent-primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '16px', background: 'var(--accent-primary)', color: 'var(--text-primary)' }}>
              <span>Get 5-Property Bundle</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>

        {/* Trust Badges */}
        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', opacity: 0.6 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, fontSize: '0.9rem' }}>
              <Zap size={20} /> 30-Day Money Back
           </div>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, fontSize: '0.9rem' }}>
              <ShieldCheck size={20} /> Secure Checkout
           </div>
        </div>
      </div>
    </section>
  );
}
