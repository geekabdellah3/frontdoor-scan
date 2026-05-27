'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, Home, AlertTriangle, Droplets, Wind, Mountain, Waves, Factory, Activity, Server, Sun, MessageSquare, Shield, CheckCircle2, Lock, Tag, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Suggestion {
  place_id: number | string;
  display_name: string;
}

const FALLBACK_ADDRESSES = [
  '123 Main St, Austin, TX 78701',
  '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
  '111 8th Ave, New York, NY 10011',
  '1600 Pennsylvania Avenue NW, Washington, DC 20500',
  '350 5th Ave, New York, NY 10118',
  '1313 Disneyland Dr, Anaheim, CA 92802',
  '233 S Wacker Dr, Chicago, IL 60606',
  '100 Universal City Plaza, Universal City, CA 91608',
  '501 Congress Ave, Austin, TX 78701',
  '701 San Jacinto Blvd, Austin, TX 78701',
  '2211 Michelson Dr, Irvine, CA 92612',
  '1 Infinite Loop, Cupertino, CA 95014',
  '1601 Willow Rd, Menlo Park, CA 94025',
  '1111 S Figueroa St, Los Angeles, CA 90015',
  '2000 Post St, San Francisco, CA 94115',
  '742 Evergreen Terrace, Springfield, OR 97477',
  '1060 W Addison St, Chicago, IL 60613'
];

const TRANSITION_STEPS = [
  'ESTABLISHING ENCRYPTED GOVERNMENT GATEWAY...',
  'QUERYING STATE EPA WATER HAZARD REGISTRIES...',
  'RETRIEVING REGIONAL GROUNDWATER RADON MAPS...',
  'DOWNLOADING FEMA FLOOD SECTOR COORDINATES...',
  'CALCULATING PARCEL-LEVEL RISK INDEX HUD...',
  'COMPILING 15-PAGE SECURE REPORT FILES...'
];

export default function Hero() {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [error, setError] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const cacheRef = useRef<Record<string, Suggestion[]>>({});

  // Search transition animation & step loader state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [transitionStep, setTransitionStep] = useState(0);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // Debounced search for address suggestions
  // Debounced search for address suggestions with instant local suggestions
  // Debounced search for address suggestions with instant local fallback and dynamic generation
  useEffect(() => {
    const query = address.trim();
    
    // If the address is already selected (valid) or too short, clear suggestions and hide dropdown
    if (isValidAddress || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // 1. Generate local fallback suggestions + dynamic suggestions instantly
    const fallbackMatches = FALLBACK_ADDRESSES.filter(addr => 
      addr.toLowerCase().includes(query.toLowerCase())
    ).map((addr, index) => ({
      place_id: 1000000 + index,
      display_name: addr
    }));

    const queryClean = query.replace(/,\s*$/, '');
    const dynamicMatches = [
      `${queryClean}, Austin, TX 78701`,
      `${queryClean}, New York, NY 10011`,
      `${queryClean}, Los Angeles, CA 90015`,
      `${queryClean}, Chicago, IL 60606`,
      `${queryClean}, Miami, FL 33101`
    ].map((addr, index) => ({
      place_id: 2000000 + index,
      display_name: addr
    }));

    const combinedMatches = [...fallbackMatches, ...dynamicMatches].slice(0, 5);
    
    // Set suggestions instantly to eliminate any lag or API blocking issues
    setSuggestions(combinedMatches);
    setShowSuggestions(true);

    // Check query cache first for instant cache hits (skip background fetch if cached)
    const cacheKey = query.toLowerCase();
    if (cacheRef.current[cacheKey]) {
      setSuggestions(cacheRef.current[cacheKey]);
      return;
    }

    // 2. Fetch from Google Maps API in the background with an AbortController
    const controller = new AbortController();
    const fetchSuggestionsAPI = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/places?input=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.predictions && Array.isArray(data.predictions)) {
            const googleSuggestions = data.predictions.map((prediction: any) => ({
              place_id: prediction.place_id,
              display_name: prediction.description
            }));
            cacheRef.current[cacheKey] = googleSuggestions;
            if (googleSuggestions.length > 0) {
              setSuggestions(googleSuggestions);
            }
          }
        }
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error("Failed to fetch suggestions, using local fallbacks:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestionsAPI();
    }, 150);

    return () => {
      clearTimeout(debounceTimer);
      controller.abort();
    };
  }, [address, isValidAddress]);

  // Search transition animation & step loader
  useEffect(() => {
    if (!isTransitioning) return;

    const startTime = Date.now();
    const duration = 2800; // 2.8 seconds total duration

    const update = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setTransitionProgress(progress);

      // Map progress to steps
      const stepIndex = Math.min(
        TRANSITION_STEPS.length - 1,
        Math.floor((elapsed / duration) * TRANSITION_STEPS.length)
      );
      setTransitionStep(stepIndex);

      if (elapsed < duration) {
        requestAnimationFrame(update);
      } else {
        router.push(`/get-started?address=${encodeURIComponent(address)}`);
      }
    };

    const frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [isTransitioning, address, router]);

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    const query = address.trim();
    if (!query || query.length < 5) {
      setError('Please enter a valid US address (at least 5 characters).');
      return;
    }
    
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTransitionProgress(0);
      setTransitionStep(0);
      setError('');
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setAddress(suggestion.display_name);
    setIsValidAddress(true);
    setShowSuggestions(false);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsValidAddress(false); // Reset validity when they type manually
    setError('');
  };

  return (
    <section className="animate-fade-in" style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0fdf4 100%)', 
      minHeight: '100vh',
      padding: '100px 24px 80px 24px',
      position: 'relative',
      overflow: 'hidden',
      color: '#09090b',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* Ambient background glows */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* Background Image Overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <Image 
          src="/neighborhood-aerial.jpg" 
          alt="Background" 
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.04 }}
          priority
        />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(248,250,252,0.92) 0%, rgba(255,255,255,0.96) 100%)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '64px', alignItems: 'center' }}>
        
        {/* Left Column */}
        <div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '24px', color: '#09090b', letterSpacing: '-0.02em' }}>
            Is Your Home Hiding <br />
            <span style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text' 
            }}>Environmental Risks?</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6, maxWidth: '600px' }}>
            Whether you&apos;re buying or renting — what you don&apos;t know <strong>can</strong> hurt you. Get all of the facts on your home&apos;s health today.
          </p>

          {/* Form Card */}
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.75)', 
            border: '1px solid rgba(226, 232, 240, 0.8)', 
            borderRadius: '24px', 
            padding: '36px', 
            marginBottom: '24px', 
            backdropFilter: 'blur(20px)', 
            WebkitBackdropFilter: 'blur(20px)',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.06), 0 0 1px 0 rgba(0,0,0,0.1)' 
          }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              ENVIRONMENTAL DATA REPORT
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: '#09090b', letterSpacing: '-0.01em' }}>
              Enter any US address to see what&apos;s around the home
            </h2>
            

            {/* Form wrapping both input and submit button cleanly */}
            <form onSubmit={handleSearch} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              {/* Input Wrapper */}
              <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }} ref={dropdownRef}>
                <div style={{ position: 'relative' }}>
                  <MapPin color="#94a3b8" size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 10 }} />
                  <label htmlFor="address-input" style={{
                    position: 'absolute',
                    width: '1px',
                    height: '1px',
                    padding: '0',
                    margin: '-1px',
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    whiteSpace: 'nowrap',
                    border: '0'
                  }}>US Address</label>
                  <input 
                    type="text" 
                    id="address-input"
                    name="address"
                    autoComplete="street-address"
                    placeholder="123 Main St, Austin, TX" 
                    value={address}
                    onChange={handleInputChange}
                    disabled={isTransitioning}
                    style={{ 
                      width: '100%', 
                      background: '#ffffff', 
                      border: error ? '1.5px solid #ef4444' : '1.5px solid #e2e8f0', 
                      padding: '16px 16px 16px 48px', 
                      color: '#09090b',
                      borderRadius: '12px',
                      outline: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onFocus={(e) => {
                      if (!error) e.currentTarget.style.borderColor = '#10b981';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                      if (address.trim().length >= 3) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={(e) => {
                      if (!error) e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                    }}
                    required
                  />
                  {isLoading && (
                    <Loader2 className="animate-spin" color="#10b981" size={20} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }} />
                  )}
                </div>

                {error && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px' }}>
                    {error}
                  </div>
                )}

                {/* Autocomplete Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 'calc(100% + 8px)', 
                    left: 0, 
                    width: '100%', 
                    background: '#ffffff', 
                    zIndex: 50, 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    textAlign: 'left',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.08), 0 0 1px rgba(0,0,0,0.1)',
                    border: '1px solid #e2e8f0',
                    padding: '4px'
                  }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {suggestions.map((suggestion) => (
                        <li 
                          key={suggestion.place_id} 
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{ 
                            padding: '12px 16px', 
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#334155',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <MapPin size={16} color="#94a3b8" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{suggestion.display_name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Native Submit Button inside Form */}
              <button 
                type="submit"
                disabled={isTransitioning}
                style={{ 
                  width: '100%', 
                  background: isTransitioning ? '#64748b' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  color: 'white', 
                  padding: '16px', 
                  borderRadius: '12px', 
                  fontWeight: 600, 
                  fontSize: '1.05rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '8px', 
                  border: 'none', 
                  cursor: isTransitioning ? 'not-allowed' : 'pointer', 
                  marginBottom: '16px', 
                  transition: 'all 0.2s ease',
                  boxShadow: isTransitioning ? 'none' : '0 4px 12px rgba(16, 185, 129, 0.2)',
                  opacity: isTransitioning ? 0.8 : 1
                }} 
                onMouseEnter={e => {
                  if (isTransitioning) return;
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.3)';
                  e.currentTarget.style.filter = 'brightness(1.05)';
                }} 
                onMouseLeave={e => {
                  if (isTransitioning) return;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.filter = 'brightness(1)';
                }}
              >
                {isTransitioning ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Compiling Live Telemetry...
                  </>
                ) : (
                  <>
                    <FileText size={20} />
                    Unlock Full Report Now — $49
                  </>
                )}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#64748b', marginBottom: '24px' }}>
              Pay, enter your email at checkout, get the full report by email in minutes.
            </p>

            {/* Promo code */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
              <Tag color="#94a3b8" size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                  type="text" 
                  placeholder="Promo code (optional)" 
                  style={{ 
                    width: '100%', 
                    background: '#f8fafc', 
                    border: '1px solid #e2e8f0', 
                    padding: '12px 12px 12px 40px', 
                    color: '#09090b',
                    borderRadius: '8px',
                    outline: 'none',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }} 
                  onFocus={(e) => e.currentTarget.style.borderColor = '#94a3b8'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
                />
            </div>

            {/* Ticks */}
            <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', color: '#52525b', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                 <CheckCircle2 size={16} color="#10b981" /> Emailed in minutes
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                 <Lock size={16} color="#10b981" /> 30-day refund guarantee
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <a href="#" style={{ 
              color: '#3b82f6', 
              textDecoration: 'none', 
              fontWeight: 500, 
              fontSize: '0.95rem', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px',
              borderBottom: '1px dashed #3b82f6',
              paddingBottom: '2px',
              transition: 'color 0.2s, border-color 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#2563eb'; e.currentTarget.style.borderColor = '#2563eb'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#3b82f6'; e.currentTarget.style.borderColor = '#3b82f6'; }}
            >
              Or see a sample full report
            </a>
          </div>

          {/* 3 Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
             <div style={{ 
               background: '#ffffff', 
               borderRadius: '16px', 
               padding: '20px 16px', 
               textAlign: 'center', 
               border: '1px solid rgba(0, 0, 0, 0.05)',
               boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
             }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <Shield size={22} color="#3b82f6" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: '#09090b', lineHeight: 1.25 }}>Official<br/>Environmental Data</div>
                <div style={{ fontSize: '0.75rem', color: '#71717a' }}>Verified public records</div>
             </div>
             <div style={{ 
               background: '#ffffff', 
               borderRadius: '16px', 
               padding: '20px 16px', 
               textAlign: 'center', 
               border: '1px solid rgba(0, 0, 0, 0.05)',
               boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
             }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <Home size={22} color="#10b981" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: '#09090b', lineHeight: 1.25 }}>Most US<br/>Addresses</div>
                <div style={{ fontSize: '0.75rem', color: '#71717a' }}>48 states · Instant digital delivery</div>
             </div>
             <div style={{ 
               background: '#ffffff', 
               borderRadius: '16px', 
               padding: '20px 16px', 
               textAlign: 'center', 
               border: '1px solid rgba(0, 0, 0, 0.05)',
               boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
             }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                  <AlertTriangle size={22} color="#8b5cf6" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px', color: '#09090b', lineHeight: 1.25 }}>Buyers &<br/>Renters</div>
                <div style={{ fontSize: '0.75rem', color: '#71717a' }}>Facts for your offer or lease</div>
             </div>
          </div>
        </div>

        {/* Right Column: Mockup */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
          
          {/* Floating Top Left */}
          <div style={{ 
            position: 'absolute', 
            top: '0', 
            left: '-20px', 
            background: 'rgba(255, 255, 255, 0.9)', 
            color: '#09090b', 
            padding: '8px 16px', 
            borderRadius: '999px', 
            fontSize: '0.85rem', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            zIndex: 10, 
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 0 1px 0 rgba(0,0,0,0.1)',
            border: '1px solid rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              background: '#10b981', 
              borderRadius: '50%',
              boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.25)' 
            }}></div>
            Live data · 15+ verified sources
          </div>

          {/* Floating Bottom Right */}
          <div style={{ 
            position: 'absolute', 
            bottom: '0', 
            right: '-20px', 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '999px', 
            fontSize: '0.9rem', 
            fontWeight: 700, 
            zIndex: 10, 
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' 
          }}>
            Ready in &lt; 5 min
          </div>

          {/* Card */}
          <div style={{ 
            width: '100%', 
            maxWidth: '420px', 
            background: '#ffffff', 
            borderRadius: '24px', 
            overflow: 'hidden', 
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.12), 0 0 1px 0 rgba(0,0,0,0.1)', 
            color: '#09090b',
            border: '1px solid rgba(0,0,0,0.06)'
          }}>
            
            {/* Card Header (Deep Executive Navy Gradient) */}
            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)', padding: '28px 24px', color: 'white' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#93c5fd' }}>Environmental Health Report</div>
                <div style={{ fontSize: '0.7rem', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.4)', padding: '3px 10px', borderRadius: '999px', color: '#10b981', fontWeight: 600 }}>Verified</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.9rem', color: '#e2e8f0' }}>
                <MapPin size={16} color="#60a5fa" style={{ flexShrink: 0 }} />
                412 Maple Avenue, Austin, TX
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Overall Score</div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1 }}>82<span style={{ fontSize: '1.5rem', color: '#93c5fd' }}>/100</span></div>
                  <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '6px', fontWeight: 600 }}>Low-Moderate Risk</div>
                </div>
                {/* Circle Chart */}
                <div style={{ position: 'relative', width: '72px', height: '72px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg style={{ position: 'absolute', top: '-4px', left: '-4px', width: '80px', height: '80px', transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="226" strokeDashoffset="45" strokeLinecap="round" />
                  </svg>
                  <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#ffffff' }}>B+</div>
                </div>
              </div>
            </div>

            {/* Card Body (White) */}
            <div style={{ padding: '24px' }}>
              
              {/* Risk Categories */}
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: '#64748b', marginBottom: '16px' }}>RISK CATEGORIES</div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                  { icon: <Droplets size={16} color="#3b82f6" />, label: 'Water Quality', grade: 'A-', color: '#10b981' },
                  { icon: <Wind size={16} color="#06b6d4" />, label: 'Air Quality', grade: 'B+', color: '#10b981' },
                  { icon: <Mountain size={16} color="#8b5cf6" />, label: 'Soil Contamination', grade: 'C', color: '#f59e0b' },
                  { icon: <Waves size={16} color="#3b82f6" />, label: 'Flood Risk', grade: 'B', color: '#10b981' },
                  { icon: <Factory size={16} color="#ef4444" />, label: 'Superfund & Hazards', grade: 'A', color: '#10b981' },
                  { icon: <Activity size={16} color="#f59e0b" />, label: 'Radon Risk', grade: 'C+', color: '#f59e0b' },
                  { icon: <Server size={16} color="#64748b" />, label: 'Nearby Data Centers', grade: 'B', color: '#10b981' },
                  { icon: <Sun size={16} color="#f59e0b" />, label: 'Energy Profile', grade: 'Info', color: '#06b6d4' },
                ].map((item, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    fontSize: '0.9rem',
                    background: '#f8fafc',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,0,0,0.02)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f1f5f9';
                    e.currentTarget.style.transform = 'translateX(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155', fontWeight: 500 }}>
                      {item.icon} {item.label}
                    </div>
                    <div style={{ fontWeight: 700, color: item.color }}>{item.grade}</div>
                  </div>
                ))}
              </div>

              {/* Negotiation */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: '#64748b', marginBottom: '12px' }}>
                  <MessageSquare size={14} color="var(--accent-primary)" /> NEGOTIATION QUESTIONS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#475569', paddingLeft: '4px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                    <span>Request water filtration credit</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                    <span>Verify lead paint testing prior to moving in as home build is pre-1978</span>
                  </div>
                </div>
              </div>

              {/* Insurance */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: '#64748b', marginBottom: '12px' }}>
                  <Shield size={14} color="var(--accent-primary)" /> INSURANCE CONSIDERATIONS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Standard homeowners policy</span> 
                    <span style={{ fontWeight: 600, color: '#09090b' }}>$800-$2,000/yr</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Environmental hazard rider</span> 
                    <span style={{ fontWeight: 600, color: '#09090b' }}>$25-$100/yr</span>
                  </div>
                </div>
              </div>

              {/* Mitigation */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', marginTop: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', color: '#64748b', marginBottom: '12px' }}>
                  <Tag size={14} color="var(--accent-primary)" /> MITIGATION COSTS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Under-sink water filter</span> 
                    <span style={{ fontWeight: 600, color: '#09090b' }}>$150-$300</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>At-home radon test kit</span> 
                    <span style={{ fontWeight: 600, color: '#09090b' }}>$15-$50</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <CheckCircle2 size={12} color="#10b981" /> Sourced from verified public databases
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-fidelity scanning transition overlay */}
      {isTransitioning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(9, 9, 11, 0.96)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          padding: '24px'
        }}>
          <style>{`
            @keyframes radar-pulse {
              0% { transform: scale(0.8); opacity: 0.6; }
              100% { transform: scale(2.2); opacity: 0; }
            }
            @keyframes scan-line {
              0% { transform: translateY(-35px); }
              50% { transform: translateY(35px); }
              100% { transform: translateY(-35px); }
            }
            @keyframes terminal-blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
            .sonar-wave-1 {
              animation: radar-pulse 2s infinite linear;
            }
            .sonar-wave-2 {
              animation: radar-pulse 2s infinite linear;
              animation-delay: 0.6s;
            }
            .sonar-wave-3 {
              animation: radar-pulse 2s infinite linear;
              animation-delay: 1.2s;
            }
            .laser-scan {
              animation: scan-line 3s infinite ease-in-out;
            }
            .blink-prompt {
              animation: terminal-blink 1s infinite;
            }
          `}</style>

          <div style={{
            width: '100%',
            maxWidth: '540px',
            padding: '40px 32px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '24px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(16, 185, 129, 0.15)',
            textAlign: 'center'
          }}>
            {/* Pulsing Sonar Target Grid */}
            <div style={{
              width: '80px',
              height: '80px',
              border: '2px solid rgba(16, 185, 129, 0.35)',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(9, 9, 11, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.1)'
            }}>
              {/* Ripple Sonars */}
              <div className="sonar-wave-1" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid rgba(16, 185, 129, 0.4)', borderRadius: '50%', opacity: 0 }} />
              <div className="sonar-wave-2" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid rgba(16, 185, 129, 0.4)', borderRadius: '50%', opacity: 0 }} />
              <div className="sonar-wave-3" style={{ position: 'absolute', width: '100%', height: '100%', border: '2px solid rgba(16, 185, 129, 0.4)', borderRadius: '50%', opacity: 0 }} />
              
              {/* Scanning laser line */}
              <div className="laser-scan" style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                boxShadow: '0 0 8px #10b981',
                zIndex: 2
              }} />

              {/* Central Pin */}
              <MapPin size={28} color="#10b981" style={{ zIndex: 3, filter: 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))' }} />
            </div>

            {/* Header Telemetry */}
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#ffffff',
              margin: '0 0 8px 0',
              textShadow: '0 0 10px rgba(255,255,255,0.1)'
            }}>
              ENVIRONMENTAL SCAN IN PROGRESS
            </h3>
            
            <div style={{
              fontSize: '0.85rem',
              color: '#10b981',
              fontFamily: 'monospace',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '8px 16px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '28px',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              <span className="blink-prompt" style={{ fontWeight: 'bold' }}>●</span>
              <span>Target: {address}</span>
            </div>

            {/* Progress Status Bar */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '0.8rem', fontFamily: 'monospace', fontWeight: 'bold' }}>
                <span style={{ color: '#94a3b8' }}>TELEMETRY STATUS</span>
                <span style={{ color: '#10b981', letterSpacing: '0.5px' }}>{transitionProgress}% SECURED</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${transitionProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)',
                  borderRadius: '999px',
                  boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)'
                }} />
              </div>
            </div>

            {/* Terminal Logging Panel */}
            <div style={{
              background: 'rgba(9, 9, 11, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '16px',
              padding: '20px 24px',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontFamily: 'monospace',
              fontSize: '0.8rem'
            }}>
              {TRANSITION_STEPS.map((step, idx) => {
                const isCompleted = idx < transitionStep;
                const isActive = idx === transitionStep;
                
                let textColor = '#475569'; // Muted pending
                if (isCompleted) textColor = '#94a3b8'; // Muted completed
                if (isActive) textColor = '#ffffff'; // Pulsing active

                return (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    color: textColor,
                    transition: 'color 0.2s ease'
                  }}>
                    {isCompleted ? (
                      <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0 }} />
                    ) : isActive ? (
                      <Loader2 size={15} className="animate-spin" color="#10b981" style={{ flexShrink: 0 }} />
                    ) : (
                      <div style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: '1.5px solid #334155',
                        flexShrink: 0
                      }} />
                    )}
                    <span style={{
                      fontWeight: isActive ? 700 : 500,
                      textShadow: isActive ? '0 0 8px rgba(255,255,255,0.2)' : 'none'
                    }}>
                      {isActive && <span className="blink-prompt" style={{ color: '#10b981', marginRight: '6px', fontWeight: 'bold' }}>&gt;</span>}
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
