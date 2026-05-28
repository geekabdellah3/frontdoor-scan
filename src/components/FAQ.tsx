'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What exactly is in a Front Door Scan report?",
    answer: "Each report aggregates 90+ federal and state datasets covering water quality, air quality, flood risk, soil contamination, Superfund and Brownfield proximity, industrial hazards, and radon risk. It also includes property-specific negotiation talking points."
  },
  {
    question: "How long does it take to get my report?",
    answer: "Reports are generated instantly after the address scan and are available as a downloadable PDF."
  },
  {
    question: "Is this the same as a standard home inspection?",
    answer: "No. A standard inspection checks the physical condition of the home. Front Door Scan focuses on environmental and public-health risks around the property."
  },
  {
    question: "Where do you get your data from?",
    answer: "Front Door Scan uses verified federal, state, and local datasets, including sources such as EPA, FEMA, NOAA, ECHO, EJScreen, and radon zone data."
  },
  {
    question: "Can I use this report to negotiate with a seller?",
    answer: "Yes. The report includes property-specific talking points that can help you ask better questions, request remediation, negotiate price, or reconsider the property."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Everything you need to know.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: '20px', 
                overflow: 'hidden',
                background: openIndex === i ? 'var(--bg-secondary)' : 'white',
                transition: 'all 0.3s ease'
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
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)'
                }}
              >
                <span>{faq.question}</span>
                {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
              </button>
              
              <div style={{ 
                maxHeight: openIndex === i ? '300px' : '0', 
                overflow: 'hidden', 
                transition: 'max-height 0.3s ease-out',
                padding: openIndex === i ? '0 32px 32px' : '0 32px'
              }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1.05rem' }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
