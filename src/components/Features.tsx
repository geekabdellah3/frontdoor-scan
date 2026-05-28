'use client';

import { Droplets, Wind, Waves, Mountain, Factory, Activity, CheckCircle2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const features = [
  {
    icon: <Droplets size={28} color="#3b82f6" />,
    title: "Water Quality",
    description: "Lead, PFAS, nitrates, disinfection byproducts, and 90+ contaminants benchmarked against EPA limits.",
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,0.12)'
  },
  {
    icon: <Wind size={28} color="#10b981" />,
    title: "Air Quality",
    description: "Real-time AQI plus 5-year historical averages of EPA criteria pollutants — PM2.5, ozone, NO2.",
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.12)'
  },
  {
    icon: <Waves size={28} color="#0ea5e9" />,
    title: "Flood Risk",
    description: "FEMA flood zone designation, recent disaster history, and proximity to NOAA stream gauges.",
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.12)'
  },
  {
    icon: <Mountain size={28} color="#d97706" />,
    title: "Soil Contamination",
    description: "Brownfield and remediation site proximity within 2 miles using EPA ECHO and EJScreen data.",
    accent: '#d97706',
    glow: 'rgba(217,119,6,0.12)'
  },
  {
    icon: <Factory size={28} color="#ef4444" />,
    title: "Superfund & Hazards",
    description: "EPA National Priorities List sites, power plants, and industrial emitters within 50 miles.",
    accent: '#ef4444',
    glow: 'rgba(239,68,68,0.12)'
  },
  {
    icon: <Activity size={28} color="#8b5cf6" />,
    title: "Radon Risk",
    description: "EPA Radon Zone classification mapped to your county FIPS code.",
    accent: '#8b5cf6',
    glow: 'rgba(139,92,246,0.12)'
  }
];

export default function Features() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // 3D tilt on mousemove
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="features" style={{ padding: '100px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background ambient glow */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', padding: '6px 16px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, color: '#10b981', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '20px' }}>
            <CheckCircle2 size={14} /> What&apos;s Inside
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '16px' }}>
            Standard inspections check the{' '}
            <span className="text-gradient">building.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto' }}>
            They don&apos;t cover water contamination, air pollution, Superfund proximity, radon, or flood risk. Front Door Scan fills that gap with the same federal data environmental consultants use.
          </p>
        </div>

        {/* Image + Text split */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px', alignItems: 'center', marginBottom: '100px' }}>
          <div>
            <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '20px' }}>
              Know before you sign. <br /><span className="text-gradient">Negotiate with facts.</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '20px', lineHeight: 1.7 }}>
              Each report includes a dedicated negotiation section with property-specific talking points you can use with sellers, landlords, or agents.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', listStyle: 'none', padding: 0, marginBottom: '28px' }}>
              {['Identify hidden environmental risks', 'Strengthen your negotiating position', 'Ensure long-term safety for your family'].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                  {item}
                </li>
              ))}
            </ul>
            <a href="/get-started" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none' }}>
              Run a free scan preview <ArrowRight size={16} />
            </a>
          </div>

          <div style={{ position: 'relative', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 40px 80px -15px rgba(0,0,0,0.14), 0 0 1px rgba(0,0,0,0.08)', aspectRatio: '4/3', perspective: '1000px' }} className="float-card-interactive">
            <Image
              src="/family-moving.jpg"
              alt="Family moving into a new home"
              fill
              style={{ objectFit: 'cover' }}
            />
            {/* Overlay badge */}
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', borderRadius: '16px', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
              <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16,185,129,0.25)', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#09090b' }}>412 Maple Ave, Austin TX — Scanned</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>15 federal databases · Report ready in 4 min</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid heading */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            What&apos;s in a <span className="text-gradient">Report</span>
          </h2>
        </div>

        {/* 3D Feature Cards Grid */}
        <div style={{ perspective: '1200px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.8)',
                borderRadius: '24px',
                boxShadow: `0 10px 30px -10px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.08)`,
                transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease',
                willChange: 'transform',
                cursor: 'default',
                opacity: 0,
                transform: 'translateY(32px) scale(0.97)',
                transitionDelay: `${index * 0.08}s`
              }}
              className="feature-card"
            >
              <div style={{
                width: '56px',
                height: '56px',
                background: feature.glow,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${feature.accent}22`
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#09090b', letterSpacing: '-0.01em' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, fontSize: '0.95rem' }}>{feature.description}</p>
              <div style={{ height: '2px', width: '32px', background: `linear-gradient(90deg, ${feature.accent}, transparent)`, borderRadius: '999px', marginTop: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
