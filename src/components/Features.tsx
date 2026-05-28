'use client';

import { Droplets, Wind, Waves, Mountain, Factory, Activity, CheckCircle2, ShieldCheck, MapPin, Search } from 'lucide-react';

const reportFeatures = [
  {
    icon: <Droplets size={28} color="var(--accent-secondary)" />,
    title: "Water Quality",
    desc: "Lead, PFAS, nitrates, disinfection byproducts, and 90+ contaminants benchmarked against EPA limits."
  },
  {
    icon: <Wind size={28} color="var(--accent-primary)" />,
    title: "Air Quality",
    desc: "Real-time AQI plus 5-year historical averages of EPA criteria pollutants including PM2.5 and ozone."
  },
  {
    icon: <Waves size={28} color="#6366f1" />,
    title: "Flood Risk",
    desc: "FEMA flood zone designation, recent disaster history, and proximity to NOAA stream gauges."
  },
  {
    icon: <Mountain size={28} color="#f59e0b" />,
    title: "Soil Contamination",
    desc: "Brownfield and remediation site proximity within 2 miles using EPA ECHO and EJScreen data."
  },
  {
    icon: <Factory size={28} color="#ef4444" />,
    title: "Superfund & Hazards",
    desc: "EPA National Priorities List sites, power plants, and industrial emitters within 50 miles."
  },
  {
    icon: <Activity size={28} color="#8b5cf6" />,
    title: "Radon Risk",
    desc: "EPA Radon Zone classification mapped to county FIPS code for precise risk assessment."
  }
];

export default function Features() {
  return (
    <div id="features">
      {/* Problem Section */}
      <section style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Standard inspections check the building. <br /><span style={{ color: 'var(--accent-primary)' }}>We check the environment around it.</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              A traditional home inspection may reveal roof, plumbing, or electrical issues, but it rarely tells you whether the property is near contaminated soil, poor air quality, or flood risk areas.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {[
              "Water contamination risks",
              "Air pollution exposure",
              "FEMA flood zone history",
              "Superfund & Hazard proximity",
              "County-level radon risk",
              "Soil & Brownfield data"
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: '24px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '16px', background: 'white' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center', marginBottom: '120px' }}>
            <div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                Professional-grade environmental data, <span style={{ color: 'var(--accent-secondary)' }}>simplified.</span>
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
                Front Door Scan transforms complex federal and local environmental datasets into a clear, address-specific report that helps buyers and renters understand hidden risks before committing.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  { title: "Negotiation Tips", desc: "Talking points for sellers" },
                  { title: "Verified Data", desc: "EPA & FEMA sources" },
                  { title: "Risk Scores", desc: "Easy-to-read metrics" },
                  { title: "Instant PDF", desc: "Download instantly" }
                ].map((card, i) => (
                  <div key={i} style={{ padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '4px' }}>{card.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
               <div style={{ padding: '32px', borderRadius: '32px', background: 'var(--text-primary)', color: 'white', position: 'relative', zIndex: 1 }} className="premium-shadow">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                      <ShieldCheck size={20} color="var(--accent-primary)" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '1rem' }}>Safe-Move Dashboard</span>
                  </div>
                  <div style={{ height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ height: '12px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}></div>
                    <div style={{ height: '12px', width: '80%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}></div>
                    <div style={{ height: '12px', width: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px' }}></div>
                    <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                       <div style={{ flex: 1, height: '40px', background: 'var(--accent-primary)', borderRadius: '10px' }}></div>
                       <div style={{ flex: 1, height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}></div>
                    </div>
                  </div>
               </div>
               <div style={{ position: 'absolute', top: '20px', left: '-20px', right: '20px', bottom: '-20px', background: 'var(--accent-primary-glow)', borderRadius: '40px', zIndex: 0, filter: 'blur(40px)' }}></div>
            </div>
          </div>

          {/* What's in a Report Section */}
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, marginBottom: '20px' }}>What’s in a Front Door Scan report?</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
              We aggregate massive environmental datasets into one easy-to-understand report for your specific address.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {reportFeatures.map((feature, index) => (
              <div key={index} className="glass-card" style={{ padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'white' }}>
                <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '16px', width: 'fit-content' }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Negotiation Section */}
      <section style={{ background: 'var(--text-primary)', color: 'white', overflow: 'hidden', position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ color: 'var(--accent-primary)', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px' }}>NEGOTIATION READY</div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
                Leverage professional <br /><span style={{ color: 'var(--accent-primary)' }}>data before you commit.</span>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '40px' }}>
                Our users use Front Door Scan reports to negotiate price reductions, request remediation, ask better questions, or walk away from properties with serious hidden risks.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  "Identify unseen environmental risks instantly",
                  "Strengthen your negotiating position with sellers",
                  "Ask smarter questions before signing",
                  "Ensure a safer environment for your family"
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1.1rem', fontWeight: 600 }}>
                    <CheckCircle2 size={24} color="var(--accent-primary)" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ position: 'relative' }}>
               <div style={{ padding: '40px', borderRadius: '32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '32px' }}>Negotiation Guide</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ display: 'flex', gap: '16px' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-primary)', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>{i}</div>
                        <div style={{ height: '12px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', alignSelf: 'center' }}></div>
                      </div>
                    ))}
                  </div>
               </div>
               <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'var(--accent-primary)', opacity: 0.1, filter: 'blur(100px)', zIndex: 0 }}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
