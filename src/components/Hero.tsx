'use client';

import { useState, useEffect } from 'react';
import { Search, ShieldCheck, MapPin, CheckCircle2, Activity } from 'lucide-react';

export default function Hero() {
  const [address, setAddress] = useState('');
  const [addressPlaceholder] = useState('Search any US address');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionStep, setTransitionStep] = useState(0);
  const [suggestions, setSuggestions] = useState<{ description: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Autocomplete search
  useEffect(() => {
    if (address.length < 3 || isSearching) {
      const timeout = setTimeout(() => {
        setSuggestions(prev => prev.length > 0 ? [] : prev);
      }, 0);
      return () => clearTimeout(timeout);
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?input=${encodeURIComponent(address)}`);
        const data = await res.json();
        if (data.predictions) {
          setSuggestions(data.predictions);
          setShowSuggestions(true);
        }
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [address, isSearching]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) return;
    setIsTransitioning(true);
  };

  const selectSuggestion = (desc: string) => {
    setAddress(desc);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
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
      if (progress < 1) requestAnimationFrame(update);
      else window.location.href = `/get-started?address=${encodeURIComponent(address)}`;
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
    <section style={{ padding: '160px 0 100px', background: 'radial-gradient(circle at 50% -20%, var(--accent-primary-glow) 0%, transparent 50%)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
          
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
              <div className="badge-trust"><CheckCircle2 size={14} color="var(--accent-primary)" /> EPA Verified Data</div>
              <div className="badge-trust"><CheckCircle2 size={14} color="var(--accent-primary)" /> Instant Results</div>
              <div className="badge-trust"><CheckCircle2 size={14} color="var(--accent-primary)" /> Professional Grade</div>
            </div>

            <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1, marginBottom: '24px', letterSpacing: '-0.04em' }}>
              Know Before <br /><span style={{ color: 'var(--accent-secondary)' }}>You Sign.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.5, fontWeight: 500 }}>
              The hidden health of your next home. We reveal air quality, water contaminants, and hazards that standard inspections miss.
            </p>

            <div style={{ position: 'relative', maxWidth: '540px' }}>
              <form onSubmit={handleSearch} style={{ display: 'flex', padding: '8px', background: 'white', border: '1px solid var(--border-color)', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', gap: '8px' }} className="search-form">
                <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Search size={20} style={{ marginLeft: '12px', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    placeholder={addressPlaceholder}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    onFocus={() => address.length >= 3 && setShowSuggestions(true)}
                    style={{
                      width: '100%',
                      padding: '12px 12px',
                      border: 'none',
                      fontSize: '1rem',
                      outline: 'none',
                      fontWeight: 500
                    }}
                  />
                </div>
                <button type="submit" className="btn-primary" disabled={isTransitioning} style={{ padding: '12px 24px' }}>
                  {isTransitioning ? 'Analyzing...' : 'Scan Address'}
                </button>
              </form>

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="glass-card" style={{ 
                  position: 'absolute', 
                  top: 'calc(100% + 12px)', 
                  left: 0, 
                  right: 0, 
                  zIndex: 100, 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  background: 'white'
                }}>
                  {suggestions.map((s, i) => (
                    <div 
                      key={i} 
                      onClick={() => selectSuggestion(s.description)}
                      style={{ 
                        padding: '12px 16px', 
                        cursor: 'pointer', 
                        fontSize: '0.9rem', 
                        borderBottom: i === suggestions.length - 1 ? 'none' : '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}
                      className="suggestion-item"
                    >
                      <MapPin size={16} color="var(--text-muted)" />
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{s.description}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Premium Report Preview Card */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="premium-shadow" style={{ 
              background: 'white', 
              padding: '40px', 
              borderRadius: '32px', 
              width: '100%', 
              maxWidth: '440px',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '32px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '6px' }}>
                    Environmental Scan
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{address ? address.split(',')[0] : "412 Maple Avenue"}</div>
                </div>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck color="var(--accent-primary)" size={28} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  { label: "Water Purity", value: 94, color: 'var(--accent-secondary)' },
                  { label: "Air Quality Index", value: 88, color: 'var(--accent-primary)' },
                  { label: "Flood Resilience", value: 92, color: '#6366f1' }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '10px', fontWeight: 600 }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
                      <span style={{ color: 'var(--text-primary)' }}>{stat.value}%</span>
                    </div>
                    <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${stat.value}%`, background: stat.color, borderRadius: '10px' }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={28} color="var(--accent-primary)" />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Overall Safety Grade</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)' }}>A - Exceptional</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Transition Loader */}
      {isTransitioning && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(255, 255, 255, 0.98)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', textAlign: 'center' }}>
          <div className="premium-shadow" style={{ padding: '48px', borderRadius: '40px', maxWidth: '440px', width: '100%', background: 'white', border: '1px solid var(--border-color)' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 32px', position: 'relative' }}>
              <div className="spin-border" style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: 'var(--accent-primary)' }}></div>
              <ShieldCheck size={40} color="var(--accent-primary)" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>Analyzing Address</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', height: '24px', fontWeight: 500 }}>{steps[transitionStep]}</p>
            <div style={{ marginTop: '40px', height: '6px', width: '100%', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${transitionProgress * 100}%`, background: 'var(--accent-primary)', transition: 'width 0.2s ease' }}></div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .spin-border { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .suggestion-item:hover { background: var(--bg-secondary) !important; }
        @media (max-width: 640px) {
          .search-form { flex-direction: column !important; padding: 12px !important; }
          .btn-primary { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
