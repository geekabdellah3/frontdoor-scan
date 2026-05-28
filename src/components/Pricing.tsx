'use client';

import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Pricing() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(splitRef.current?.children || [], {
        scrollTrigger: {
          trigger: splitRef.current,
          start: 'top 80%',
        },
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out'
      });

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        clearProps: 'all'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -4;
    const rotateY = ((x - cx) / cx) * 4;
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <section ref={containerRef} id="pricing" style={{ padding: '120px 24px', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          #pricing { padding: 80px 16px !important; }
          .pricing-split { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .pricing-split div:first-child { order: 2; }
          .pricing-split div:last-child { order: 1; }
          .pricing-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .pricing-header h2 { font-size: 2.2rem !important; }
        }
      `}</style>

      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div ref={headerRef} className="pricing-header" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '20px', color: '#09090b' }}>
            Simple, <span style={{ color: '#10b981' }}>Transparent Pricing</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}>
            Get the data you need to make an informed decision without the hidden fees.
          </p>
        </div>

        <div ref={splitRef} className="pricing-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
          <div style={{ position: 'relative', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 40px 100px -20px rgba(0,0,0,0.15)', aspectRatio: '16/10' }}>
            <Image 
              src="/couple-reviewing.jpg" 
              alt="Couple reviewing a report" 
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '24px', color: '#09090b', letterSpacing: '-0.02em', lineHeight: 1.2 }}>Why homebuyers and renters use Front Door Scan</h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
              Buyers have used these reports to negotiate price reductions, request remediation, or walk away from properties with serious hidden risks.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0 }}>
              {[
                { text: 'Identify unseen environmental risks', color: '#10b981' },
                { text: 'Strengthen your negotiating position', color: '#3b82f6' },
                { text: 'Ensure long-term safety for your family', color: '#8b5cf6' }
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#334155', fontWeight: 600, fontSize: '1.05rem' }}>
                  <div style={{ background: `${item.color}15`, padding: '6px', borderRadius: '50%', display: 'flex' }}>
                    <CheckCircle2 color={item.color} size={18} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div ref={cardsRef} className="pricing-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '32px', width: '100%', maxWidth: '1000px', margin: '0 auto', perspective: '1500px' }}>
          
          {/* Single Report */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              padding: '48px 40px', 
              background: 'rgba(255, 255, 255, 0.7)', 
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              borderRadius: '32px',
              boxShadow: '0 20px 50px -15px rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              transformStyle: 'preserve-3d',
              transition: 'border-color 0.3s ease'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#09090b', letterSpacing: '-0.01em' }}>Single Property</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#09090b', letterSpacing: '-0.04em' }}>$49</span>
              <span style={{ color: '#94a3b8', textDecoration: 'line-through', marginBottom: '14px', fontSize: '1.2rem', fontWeight: 600 }}>$69</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
              One full environmental health report with PDF download, valid forever.
            </p>
            
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', listStyle: 'none', padding: 0 }}>
              {['Water & Air Quality', 'Flood & Soil Risk', 'Superfund & Radon', 'Negotiation Points'].map((feat, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>
                  <CheckCircle2 color="#10b981" size={18} /> {feat}
                </li>
              ))}
            </ul>
            
            <Link href="/get-started" style={{ 
              background: '#09090b', 
              color: 'white', 
              padding: '18px', 
              borderRadius: '16px', 
              textAlign: 'center', 
              fontWeight: 800, 
              textDecoration: 'none',
              marginTop: 'auto',
              boxShadow: '0 10px 20px -5px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >Get Single Report</Link>
          </div>
          
          {/* Bundle */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ 
              padding: '48px 40px', 
              background: 'rgba(255, 255, 255, 0.8)', 
              backdropFilter: 'blur(24px)',
              border: '2px solid #10b981',
              borderRadius: '32px',
              boxShadow: '0 30px 60px -20px rgba(16, 185, 129, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              transformStyle: 'preserve-3d'
            }}
          >
            <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%) translateZ(30px)', background: '#10b981', color: 'white', padding: '6px 20px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>
              MOST POPULAR
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#09090b', letterSpacing: '-0.01em' }}>5-Property Bundle</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '3.5rem', fontWeight: 800, color: '#09090b', letterSpacing: '-0.04em' }}>$199</span>
              <span style={{ color: '#64748b', marginBottom: '14px', fontSize: '1rem', fontWeight: 700 }}>($39.80 / report)</span>
            </div>
            <p style={{ color: '#64748b', marginBottom: '32px', lineHeight: 1.6, fontWeight: 500 }}>
              Compare up to 5 homes side-by-side. Credits valid for 6 months.
            </p>
            
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px', listStyle: 'none', padding: 0 }}>
              {['Everything in Single', '5 Report Credits', 'Side-by-side Comparison', 'Priority Email Support'].map((feat, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#475569', fontWeight: 600, fontSize: '0.95rem' }}>
                  <CheckCircle2 color="#10b981" size={18} /> {feat}
                </li>
              ))}
            </ul>
            
            <Link href="/get-started" style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              color: 'white', 
              padding: '18px', 
              borderRadius: '16px', 
              textAlign: 'center', 
              fontWeight: 800, 
              textDecoration: 'none',
              marginTop: 'auto',
              boxShadow: '0 12px 24px -8px rgba(16, 185, 129, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >Get Bundle Now</Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
