'use client';

import { 
  Droplets, 
  Wind, 
  Waves, 
  Mountain, 
  Factory, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Scale
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: <Droplets size={24} />,
    title: "Water Quality",
    description: "Lead, PFAS, nitrates, disinfection byproducts, and 90+ contaminants benchmarked against EPA limits.",
    color: 'emerald'
  },
  {
    icon: <Wind size={24} />,
    title: "Air Quality",
    description: "Real-time AQI plus 5-year historical averages of EPA criteria pollutants — PM2.5, ozone, NO2.",
    color: 'emerald'
  },
  {
    icon: <Waves size={24} />,
    title: "Flood Risk",
    description: "FEMA flood zone designation, recent disaster history, and proximity to NOAA stream gauges.",
    color: 'emerald'
  },
  {
    icon: <Mountain size={24} />,
    title: "Soil Contamination",
    description: "Brownfield and remediation site proximity within 2 miles using EPA ECHO and EJScreen data.",
    color: 'emerald'
  },
  {
    icon: <Factory size={24} />,
    title: "Superfund & Hazards",
    description: "EPA National Priorities List sites, power plants, and industrial emitters within 50 miles.",
    color: 'emerald'
  },
  {
    icon: <Activity size={24} />,
    title: "Radon Risk",
    description: "EPA Radon Zone classification mapped to your county FIPS code.",
    color: 'emerald'
  }
];

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Entrance
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

      // Cards Entrance
      gsap.from(cardRefs.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        stagger: 0.1,
        duration: 1.4,
        ease: 'expo.out',
        clearProps: 'all'
      });

      // Split Section Entrance
      gsap.from('.feature-split-content > *', {
        scrollTrigger: {
          trigger: '.feature-split-content',
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

      gsap.from('.feature-split-visual', {
        scrollTrigger: {
          trigger: '.feature-split-content',
          start: 'top 85%',
          once: true
        },
        y: 20,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.6,
        ease: 'expo.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="features" className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-[0.2em] mb-6">
            <Zap size={14} className="fill-emerald-500" />
            The Intelligence Gap
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-[1.1] mb-6">
            Standard inspections check the <span className="text-emerald-600">building.</span>
          </h2>
          <p className="text-lg text-zinc-500 font-medium">
            They don&apos;t cover water contamination, air pollution, Superfund proximity, or flood risk. Front Door Scan fills that gap with the same federal data used by institutional investors.
          </p>
        </div>

        {/* Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="feature-split-content space-y-8">
            <h3 className="text-3xl lg:text-4xl font-black text-zinc-900 tracking-tight leading-[1.1]">
              Know before you sign. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Negotiate with facts.</span>
            </h3>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Every report includes a dedicated negotiation section with property-specific talking points designed to help you lower the price or secure testing concessions.
            </p>
            
            <div className="space-y-4">
              {[
                { label: 'Identify hidden environmental risks', icon: <ShieldCheck size={20} /> },
                { label: 'Strengthen your negotiating position', icon: <Scale size={20} /> },
                { label: 'Track long-term environmental trends', icon: <TrendingUp size={20} /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 glass-panel bg-zinc-50 border-zinc-100 rounded-2xl group hover:bg-white hover:border-emerald-200 transition-all">
                  <div className="text-emerald-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-bold text-zinc-900">{item.label}</span>
                </div>
              ))}
            </div>

            <a href="/get-started" className="inline-flex items-center gap-2 text-emerald-600 font-black text-lg group">
              Run a free scan preview 
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="feature-split-visual relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative glass-panel-spatial p-2 bg-white/50 border-white shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/family-moving.jpg"
                  alt="Family moving into home"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel bg-white/90 border-white rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black">
                    82%
                  </div>
                  <div>
                    <div className="text-xs font-black text-zinc-900">Audit Status: Complete</div>
                    <div className="text-[10px] font-bold text-zinc-500">412 Maple Ave · Austin, TX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
            What&apos;s in a <span className="text-emerald-600">Scan</span>
          </h2>
        </div>

        {/* 3D Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="glass-panel-spatial p-8 bg-white/70 border-white hover:border-emerald-200 transition-all group"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-zinc-500 font-medium leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-8 h-1 w-12 bg-emerald-100 group-hover:w-full group-hover:bg-emerald-500 transition-all duration-700 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
