'use client';

import { useState, useEffect } from 'react';
import { Search, Check, ShieldCheck, Activity, Droplets, Wind, Waves, MapPin } from 'lucide-react';

export default function Hero() {
  const [address, setAddress] = useState('');
  const [addressLine1, setAddressLine1] = useState('Checking location...');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionStep, setTransitionStep] = useState(0);

  // Silent localization logic
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.city && data.region_code) {
          setAddressLine1(`${data.city}, ${data.region_code}`);
        } else {
          setAddressLine1('Search any US address');
        }
      } catch (err) {
        setAddressLine1('Search any US address');
      }
    };
    fetchLocation();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const startTime = Date.now();
    const duration = 1800;

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setTransitionProgress(progress);

      if (progress < 0.3) setTransitionStep(0);
      else if (progress < 0.6) setTransitionStep(1);
      else if (progress < 0.9) setTransitionStep(2);
      else setTransitionStep(3);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        window.location.href = `/get-started?address=${encodeURIComponent(address)}`;
      }
    };

    requestAnimationFrame(update);
  }, [isTransitioning, address]);

  const steps = [
    "Analyzing local water tables...",
    "Querying EPA Superfund databases...",
    "Calculating flood risk projections...",
    "Finalizing report..."
  ];

  return (
    <section className="relative overflow-hidden" style={{ padding: '100px 24px 140px' }}>
      {/* Background Glows */}
      <div className="bg-glow" style={{ top: '-10%', left: '-10%', opacity: 0.5 }}></div>
      <div className="bg-glow" style={{ bottom: '-10%', right: '-10%', opacity: 0.3, background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)' }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1, margin: '0 auto', maxWidth: '1200px' }}>
        <div className="responsive-grid lg:grid-cols-2 items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', display: 'grid', gap: '64px' }}>
          
          <div className="reveal-up">
            <div className="inline-flex items-center glass-card" style={{ padding: '8px 16px', borderRadius: '999px', display: 'inline-flex', gap: '8px', marginBottom: '24px', fontSize: '0.9rem', fontWeight: 500 }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-primary)' }}></span>
              Know Before You Sign
            </div>
            
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.03em' }}>
              The Hidden Health of Your <span className="text-gradient">Next Home.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '600px' }}>
              We scan 90+ federal datasets to reveal air quality, water contaminants, and environmental hazards that standard inspections miss.
            </p>

            <div className="glass-card" style={{ padding: '12px', borderRadius: '24px', maxWidth: '540px' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="sm:flex-row">
                <div style={{ position: 'relative', flex: 1 }}>
                  <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder={addressLine1}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px 16px 16px 48px',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      background: 'rgba(255,255,255,0.5)',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>
                <button type="submit" className="btn-antigravity" disabled={isTransitioning}>
                  {isTransitioning ? 'Analyzing...' : 'Scan Address'}
                </button>
              </form>
            </div>
            
            <div style={{ display: 'flex', gap: '24px', marginTop: '32px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> EPA Verified Data</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={16} color="var(--accent-primary)" /> Instant Results</div>
            </div>
          </div>

          {/* Spatial 3D Report Preview */}
          <div className="isometric-view reveal-up" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="isometric-card" style={{ position: 'relative' }}>
              <div className="glass-card floating" style={{ padding: '32px', borderRadius: '32px', width: '100%', maxWidth: '420px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '32px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                      Environmental Scan
                    </div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{address || "412 Maple Avenue"}</div>
                  </div>
                  <ShieldCheck color="var(--accent-primary)" size={32} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {[
                    { label: "Water Purity", value: 94, color: 'var(--accent-secondary)' },
                    { label: "Air Quality Index", value: 88, color: 'var(--accent-primary)' },
                    { label: "Flood Resilience", value: 92, color: 'var(--accent-tertiary)' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '8px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                        <span style={{ fontWeight: 700 }}>{stat.value}%</span>
                      </div>
                      <div style={{ height: '6px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${stat.value}%`, background: stat.color, borderRadius: '3px' }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '32px', pt: '32px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity size={20} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Overall Safety Grade</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>A - Exceptional</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements for depth */}
              <div className="glass-card" style={{ position: 'absolute', width: '200px', height: '200px', bottom: '-40px', left: '-40px', zIndex: 1, borderRadius: '24px', background: 'rgba(255,255,255,0.3)' }}></div>
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', borderRadius: '50%', background: 'var(--accent-primary-glow)', filter: 'blur(30px)', zIndex: 0 }}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Transition Loader */}
      {isTransitioning && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(252, 253, 254, 0.95)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div className="glass-card" style={{ padding: '48px', borderRadius: '32px', maxWidth: '400px', width: '100%' }}>
            <div className="relative mb-8" style={{ width: '80px', height: '80px', margin: '0 auto', position: 'relative' }}>
              <div className="spin-border" style={{ 
                position: 'absolute', 
                inset: 0, 
                borderRadius: '50%', 
                border: '4px solid var(--bg-secondary)',
                borderTopColor: 'var(--accent-primary)'
              }}></div>
              <ShieldCheck size={40} color="var(--accent-primary)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
            
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>Analyzing Address</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', height: '24px' }}>
              {steps[transitionStep]}
            </p>

            <div style={{ marginTop: '32px', height: '4px', width: '100%', background: 'var(--bg-secondary)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${transitionProgress * 100}%`, background: 'var(--accent-primary)', transition: 'width 0.2s ease' }}></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .spin-border {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 640px) {
          .sm\\:flex-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
