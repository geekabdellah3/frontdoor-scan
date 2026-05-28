'use client';

import { useState, useRef, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import gsap from 'gsap';

const faqs = [
  {
    q: "How quickly will I receive my report?",
    a: "Most reports are generated within 5–10 minutes after purchase. You'll receive an email with a link to view and download your report as soon as it's ready."
  },
  {
    q: "What data sources do you use?",
    a: "Official government sources including the EPA, FEMA, USGS, AirNow, Census Bureau, CDC, and state environmental agencies — 15+ federal databases in total."
  },
  {
    q: "Can I use this to negotiate my home price or lease?",
    a: "Yes. Each report includes a dedicated negotiation section with property-specific talking points for sellers, landlords, and realtors."
  },
  {
    q: "Is this useful for renters?",
    a: "Yes. Renters benefit just as much — knowing about water, air, or contamination issues helps inform lease decisions and landlord negotiations."
  },
  {
    q: "What if my address isn't found?",
    a: "If we can't find data for your specific address, we'll search using the nearest available location data and indicate this in your report. If no meaningful data can be found, we offer a full refund."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-title', {
        scrollTrigger: {
          trigger: '.faq-title',
          start: 'top 90%',
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="faq" style={{ padding: '120px 24px', background: 'white', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', right: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.03) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      
      <div className="container" style={{ maxWidth: '900px', position: 'relative' }}>
        <div className="faq-title" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', color: '#09090b', marginBottom: '16px' }}>Frequently Asked Questions</h2>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Everything you need to know about Front Door Scan reports.</p>
        </div>
        
        <div className="faq-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="faq-item"
              style={{ 
                background: openIndex === i ? 'rgba(255, 255, 255, 0.9)' : 'rgba(248, 250, 252, 0.5)',
                border: '1px solid',
                borderColor: openIndex === i ? 'rgba(16, 185, 129, 0.2)' : 'rgba(226, 232, 240, 0.8)',
                borderRadius: '24px',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: openIndex === i ? '0 15px 30px -10px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{ 
                  width: '100%',
                  padding: '24px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '20px'
                }}
              >
                <span style={{ fontSize: '1.15rem', fontWeight: 700, color: openIndex === i ? '#09090b' : '#334155', transition: 'color 0.3s ease' }}>
                  {faq.q}
                </span>
                <div style={{ 
                  background: openIndex === i ? '#10b981' : 'rgba(226, 232, 240, 0.8)', 
                  padding: '8px', 
                  borderRadius: '12px', 
                  color: openIndex === i ? 'white' : '#64748b',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }}>
                  {openIndex === i ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
              </button>
              
              <div style={{ 
                maxHeight: openIndex === i ? '300px' : '0',
                opacity: openIndex === i ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: openIndex === i ? '0 32px 32px 32px' : '0 32px'
              }}>
                <p style={{ color: '#64748b', lineHeight: 1.7, fontSize: '1rem', fontWeight: 500 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
