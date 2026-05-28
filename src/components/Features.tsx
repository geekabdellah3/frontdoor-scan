'use client';

import { Droplets, Wind, Waves, Mountain, Factory, Activity, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Droplets size={32} color="var(--accent-secondary)" />,
    title: "Water Quality",
    description: "Lead, PFAS, nitrates, disinfection byproducts, and 90+ contaminants benchmarked against EPA limits."
  },
  {
    icon: <Wind size={32} color="var(--accent-primary)" />,
    title: "Air Quality",
    description: "Real-time AQI plus 5-year historical averages of EPA criteria pollutants — PM2.5, ozone, NO2."
  },
  {
    icon: <Waves size={32} color="var(--accent-secondary)" />,
    title: "Flood Risk",
    description: "FEMA flood zone designation, recent disaster history, and proximity to NOAA stream gauges."
  },
  {
    icon: <Mountain size={32} color="#d97706" />,
    title: "Soil Contamination",
    description: "Brownfield and remediation site proximity within 2 miles using EPA ECHO and EJScreen data."
  },
  {
    icon: <Factory size={32} color="#ef4444" />,
    title: "Superfund & Hazards",
    description: "EPA National Priorities List sites, power plants, and industrial emitters within 50 miles."
  },
  {
    icon: <Activity size={32} color="var(--accent-tertiary)" />,
    title: "Radon Risk",
    description: "EPA Radon Zone classification mapped to your county FIPS code."
  }
];

export default function Features() {
  return (
    <section id="features" style={{ padding: '100px 24px' }}>
      <div className="container" style={{ margin: '0 auto', maxWidth: '1200px' }}>
        
        {/* Visual Content Section */}
        <div style={{ marginBottom: '120px' }}>
          <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', display: 'grid', gap: '64px', alignItems: 'center' }}>
            <div>
              <div className="inline-flex items-center glass-card" style={{ padding: '8px 16px', borderRadius: '999px', display: 'inline-flex', gap: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 500 }}>
                <CheckCircle2 size={16} color="var(--accent-primary)" />
                Professional Grade Data
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2 }}>
                Standard inspections check the <span className="text-gradient">building.</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '24px', lineHeight: 1.6 }}>
                They do not cover water contamination, air pollution, Superfund proximity, radon, or flood risk. Front Door Scan fills that gap with the same federal data environmental consultants use.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={14} color="var(--accent-primary)" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>Property-specific negotiation talking points</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 size={14} color="var(--accent-primary)" />
                  </div>
                  <p style={{ color: 'var(--text-secondary)' }}>Verified federal and local datasets</p>
                </div>
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
              <div className="isometric-view">
                <div className="isometric-card glass-card" style={{ borderRadius: '32px', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
                  <Image 
                    src="/family-moving.jpg" 
                    alt="Family moving into a new home" 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)' }}></div>
                  <div style={{ position: 'absolute', bottom: '24px', left: '24px', color: 'white' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>Peace of Mind</div>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Know before you move in</div>
                  </div>
                </div>
              </div>
              {/* Decorative background element */}
              <div style={{ position: 'absolute', width: '100%', height: '100%', top: '20px', left: '20px', background: 'var(--accent-primary-glow)', borderRadius: '32px', zIndex: -1 }}></div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
            What&apos;s in a <span className="text-gradient">Report</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            We aggregate massive environmental datasets into one easy-to-understand report for your specific address.
          </p>
        </div>
        
        <div className="responsive-grid">
          {features.map((feature, index) => (
            <div key={index} className="glass-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.5)', borderRadius: '20px', width: 'fit-content', boxShadow: 'inset 0 0 0 1px var(--border-color)' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
