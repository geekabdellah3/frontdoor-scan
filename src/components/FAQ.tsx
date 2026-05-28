'use client';

import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What exactly is in a Front Door Scan report?",
    answer: "Each report aggregates 90+ federal and state datasets covering water quality (PFAS, lead, contaminants), air quality (historical PM2.5/Ozone), flood risk (FEMA & NOAA), soil contamination (Superfund/Brownfield proximity), and radon risk. We also provide property-specific negotiation talking points."
  },
  {
    question: "How long does it take to get my report?",
    answer: "Delivery is near-instant. Once you complete the payment and enter your email at checkout, our system compiles the live data and emails you a professional 15-page PDF report, typically within 2-5 minutes."
  },
  {
    question: "Is this the same as a standard home inspection?",
    answer: "No. Standard inspections focus on the structure of the building (roof, HVAC, plumbing). They almost never cover environmental factors like water purity, air pollution, or nearby industrial hazards. We provide the environmental data that standard inspectors miss."
  },
  {
    question: "Where do you get your data from?",
    answer: "We source our data directly from verified public records including the EPA (ECHO, EJScreen), FEMA, NOAA, USGS, and local state health departments. Our system updates daily to ensure you have the most current information available."
  },
  {
    question: "Can I use this report to negotiate with a seller?",
    answer: "Yes. Many of our users use the specific findings (like high lead levels in local water or proximity to a Superfund site) to negotiate price reductions, request remediation credits, or justify walking away from a high-risk property."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: '100px 24px' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '800px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div className="inline-flex items-center glass-card" style={{ padding: '8px 16px', borderRadius: '999px', display: 'inline-flex', gap: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 500 }}>
            <HelpCircle size={16} color="var(--accent-primary)" />
            Frequently Asked Questions
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
            Everything you need to <span className="text-gradient">know</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass-card" 
              style={{ 
                borderRadius: '20px', 
                overflow: 'hidden',
                borderColor: openIndex === index ? 'var(--accent-primary)' : 'var(--glass-border)'
              }}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{ 
                  width: '100%', 
                  padding: '24px 32px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: openIndex === index ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                  {faq.question}
                </span>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '10px', 
                  background: openIndex === index ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}>
                  {openIndex === index ? <Minus size={18} color="white" /> : <Plus size={18} color="var(--text-primary)" />}
                </div>
              </button>
              
              <div style={{ 
                maxHeight: openIndex === index ? '500px' : '0',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                opacity: openIndex === index ? 1 : 0
              }}>
                <div style={{ padding: '0 32px 32px 32px', color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '1rem' }}>
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
