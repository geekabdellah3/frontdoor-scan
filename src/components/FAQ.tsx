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
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'expo.out'
      });

      gsap.from('.faq-item', {
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="faq" className="section-padding bg-white relative overflow-hidden">
      <div className="bg-glow top-1/2 -right-24 w-96 h-96 opacity-30" />
      
      <div className="container mx-auto max-w-4xl relative">
        <div className="faq-title text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="text-lg text-zinc-500 font-medium">Everything you need to know about Front Door Scan reports.</p>
        </div>
        
        <div className="faq-list space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`faq-item glass-panel-spatial overflow-hidden transition-all duration-500 ${
                openIndex === i ? 'bg-white/90 border-emerald-200' : 'bg-white/50 border-white hover:border-zinc-200'
              }`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between gap-6 text-left"
              >
                <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                  openIndex === i ? 'text-zinc-900' : 'text-zinc-700'
                }`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  openIndex === i ? 'bg-emerald-500 text-white' : 'bg-zinc-100 text-zinc-400'
                }`}>
                  {openIndex === i ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                </div>
              </button>
              
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex === i ? 'max-h-[500px] opacity-100 pb-8 px-6 md:px-8' : 'max-h-0 opacity-0 px-6 md:px-8'
              }`}>
                <p className="text-zinc-500 font-medium leading-relaxed">
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
