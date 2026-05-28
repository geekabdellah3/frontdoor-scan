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
          start: 'top 90%',
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'expo.out'
      });

      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 90%',
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'expo.out'
      });

      gsap.from(splitRef.current?.children || [], {
        scrollTrigger: {
          trigger: splitRef.current,
          start: 'top 90%',
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out'
      });

      gsap.from(cardsRef.current?.children || [], {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          once: true
        },
        y: 30,
        opacity: 0,
        filter: 'blur(10px)',
        stagger: 0.15,
        duration: 1.4,
        ease: 'expo.out',
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
    <section ref={containerRef} id="pricing" className="section-padding bg-zinc-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="bg-glow -top-24 -left-24 w-[600px] h-[600px] opacity-40" />
      <div className="bg-glow -bottom-24 -right-24 w-[600px] h-[600px] opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={headerRef} className="pricing-header text-center mb-16 lg:mb-24">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6">
            Simple, <span className="text-emerald-600">Transparent Pricing</span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
            Get the data you need to make an informed decision without the hidden fees.
          </p>
        </div>

        <div ref={splitRef} className="pricing-split grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-24 lg:mb-32">
          <div className="lg:col-span-7 relative group">
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[16/10]">
              <Image 
                src="/couple-reviewing.jpg" 
                alt="Couple reviewing a report" 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -z-10" />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-tight">
              Why homebuyers and renters use Front Door Scan
            </h2>
            <p className="text-lg text-zinc-500 font-medium leading-relaxed">
              Buyers have used these reports to negotiate price reductions, request remediation, or walk away from properties with serious hidden risks.
            </p>
            <ul className="space-y-4">
              {[
                { text: 'Identify unseen environmental risks', color: 'emerald' },
                { text: 'Strengthen your negotiating position', color: 'blue' },
                { text: 'Ensure long-term safety for your family', color: 'purple' }
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-700 font-bold text-lg">
                  <div className={`p-1.5 rounded-full bg-${item.color}-500/10 text-${item.color}-500`}>
                    <CheckCircle2 size={20} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div ref={cardsRef} className="pricing-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto perspective-container">
          
          {/* Single Report */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-panel-spatial p-10 md:p-12 flex flex-col items-start bg-white/70 hover:bg-white transition-all duration-500"
          >
            <h3 className="text-xl font-black text-zinc-900 uppercase tracking-widest mb-4">Single Property</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl font-black text-zinc-900 tracking-tighter">$49</span>
              <span className="text-xl text-zinc-400 font-bold line-through">$69</span>
            </div>
            <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
              One full environmental health report with PDF download, valid forever.
            </p>
            
            <ul className="space-y-4 mb-12 w-full">
              {['Water & Air Quality', 'Flood & Soil Risk', 'Superfund & Radon', 'Negotiation Points'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-bold text-sm">
                  <CheckCircle2 className="text-emerald-500" size={18} /> {feat}
                </li>
              ))}
            </ul>
            
            <Link href="/signup" className="btn btn-accent px-6 py-2.5 text-xs tracking-widest uppercase">
              Get Started
            </Link>
          </div>
          
          {/* Bundle */}
          <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="glass-panel-spatial p-10 md:p-12 flex flex-col items-start bg-white border-emerald-500/50 relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-black text-emerald-600 uppercase tracking-widest mb-4">5-Property Bundle</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-6xl font-black text-zinc-900 tracking-tighter">$199</span>
              <span className="text-sm text-zinc-400 font-bold">($39.80 / report)</span>
            </div>
            <p className="text-zinc-500 font-medium mb-10 leading-relaxed">
              Compare up to 5 homes side-by-side. Credits valid for 6 months.
            </p>
            
            <ul className="space-y-4 mb-12 w-full">
              {['Everything in Single', '5 Report Credits', 'Side-by-side Comparison', 'Priority Email Support'].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-zinc-700 font-bold text-sm">
                  <CheckCircle2 className="text-emerald-500" size={18} /> {feat}
                </li>
              ))}
            </ul>
            
            <Link href="/get-started" className="w-full btn btn-accent py-5 text-lg">
              Get Bundle Now
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
