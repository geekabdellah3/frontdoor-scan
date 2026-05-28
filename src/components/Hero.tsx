'use client';

import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2, Home, AlertTriangle, Droplets, Wind, Mountain, Waves, Factory, Activity, Server, Sun, MessageSquare, Shield, CheckCircle2, Lock, Tag, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

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
  '100 Universal City Plaza, Universal City, CA 91608'
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

  // GSAP Refs
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const mockupInnerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  // Search transition animation & step loader state
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Handle GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Setup initial states
      gsap.set([titleRef.current, subtitleRef.current, formCardRef.current, badgesRef.current], {
        y: 40,
        opacity: 0,
        rotateX: -15,
        transformPerspective: 1000,
        transformOrigin: "center top"
      });

      gsap.set(mockupRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        rotateX: 10,
        rotateY: -10,
        transformPerspective: 1500
      });

      // Animate left column elements sequentially
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });
      
      tl.to(titleRef.current, { y: 0, opacity: 1, rotateX: 0 }, 0.2)
        .to(subtitleRef.current, { y: 0, opacity: 1, rotateX: 0 }, 0.3)
        .to(formCardRef.current, { y: 0, opacity: 1, rotateX: 0 }, 0.4)
        .to(badgesRef.current, { y: 0, opacity: 1, rotateX: 0 }, 0.5)
        // Animate the mockup with a slightly different feel
        .to(mockupRef.current, { y: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0, duration: 1.5, ease: "expo.out" }, 0.3);
        
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // GSAP 3D Hover Effect on Mockup Card
  useEffect(() => {
    if (!mockupRef.current || !mockupInnerRef.current) return;
    
    const container = mockupRef.current;
    const inner = mockupInnerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (max 8 degrees)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      gsap.to(inner, {
        rotateX: rotateX,
        rotateY: rotateY,
        ease: "power2.out",
        duration: 0.4,
        transformPerspective: 1000
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        ease: "elastic.out(1, 0.3)",
        duration: 1.2
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Debounced search for address suggestions
  useEffect(() => {
    const query = address.trim();
    if (isValidAddress || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fallbackMatches = FALLBACK_ADDRESSES.filter(addr => 
      addr.toLowerCase().includes(query.toLowerCase())
    ).map((addr, index) => ({
      place_id: 1000000 + index,
      display_name: addr
    }));

    const queryClean = query.replace(/,\s*$/, '');
    const dynamicMatches = [
      `${queryClean}, Austin, TX`,
      `${queryClean}, New York, NY`,
      `${queryClean}, Los Angeles, CA`
    ].map((addr, index) => ({
      place_id: 2000000 + index,
      display_name: addr
    }));

    setSuggestions([...fallbackMatches, ...dynamicMatches].slice(0, 5));
    setShowSuggestions(true);
  }, [address, isValidAddress]);

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    const query = address.trim();
    if (!query || query.length < 5) {
      setError('Please enter a valid US address (at least 5 characters).');
      return;
    }
    
    setIsTransitioning(true);
    
    // Antigravity transition effect before redirect
    gsap.to(heroRef.current, {
      scale: 1.05,
      opacity: 0,
      filter: 'blur(10px)',
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(`/get-started?address=${encodeURIComponent(query)}`);
      }
    });
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setAddress(suggestion.display_name);
    setIsValidAddress(true);
    setShowSuggestions(false);
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
    setIsValidAddress(false);
    setError('');
  };

  return (
    <section ref={heroRef} className="hero-section" style={{ 
      background: '#f8fafc', 
      minHeight: '100vh',
      padding: '100px 24px 80px 24px',
      position: 'relative',
      overflow: 'hidden',
      color: '#09090b',
      display: 'flex',
      alignItems: 'center'
    }}>
      {/* GSAP Parallax Ambient Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '80vw', height: '80vw', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)', filter: 'blur(100px)' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
        
        {/* Left Column */}
        <div className="hero-left-content" style={{ perspective: '1000px' }}>
          <h1 ref={titleRef} className="hero-title" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '24px', color: '#09090b', letterSpacing: '-0.03em', willChange: 'transform, opacity' }}>
            Is Your Home Hiding <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text',
              display: 'inline-block',
              paddingRight: '8px'
            }}>Environmental Risks?</span>
          </h1>
          <p ref={subtitleRef} className="hero-paragraph" style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '40px', lineHeight: 1.6, maxWidth: '580px', willChange: 'transform, opacity' }}>
            Whether you&apos;re buying or renting — what you don&apos;t know <strong>can</strong> hurt you. Get all of the facts on your home&apos;s health instantly.
          </p>

          {/* Glassmorphic Form Card */}
          <div ref={formCardRef} className="hero-form-card" style={{ 
            background: 'rgba(255, 255, 255, 0.65)', 
            border: '1px solid rgba(255, 255, 255, 0.8)', 
            borderRadius: '28px', 
            padding: '36px', 
            marginBottom: '32px', 
            backdropFilter: 'blur(24px)', 
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.08), 0 0 1px 0 rgba(0,0,0,0.1) inset',
            willChange: 'transform, opacity',
            position: 'relative'
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)' }} />
            
            <div style={{ color: '#10b981', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Shield size={16} /> INSTANT PARCEL INTELLIGENCE
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px', color: '#09090b', letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              Enter any US address to scan EPA, FEMA, and USGS databases
            </h2>

            <form onSubmit={handleSearch} style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }} ref={dropdownRef}>
                <div style={{ position: 'relative' }}>
                  <MapPin color="#10b981" size={22} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 10 }} />
                  <input 
                    type="text" 
                    placeholder="Enter home or property address..." 
                    value={address}
                    onChange={handleInputChange}
                    disabled={isTransitioning}
                    style={{ 
                      width: '100%', 
                      background: 'rgba(255, 255, 255, 0.9)', 
                      border: error ? '2px solid #ef4444' : '2px solid transparent', 
                      padding: '20px 20px 20px 52px', 
                      color: '#09090b',
                      borderRadius: '16px',
                      outline: 'none',
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05) inset',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      fontWeight: 500
                    }}
                    onFocus={(e) => {
                      if (!error) {
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.15), 0 0 0 2px #10b981 inset';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!error) {
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.05) inset';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                    required
                  />
                </div>

                {error && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '10px', fontWeight: 600, paddingLeft: '4px' }}>
                    ⚠️ {error}
                  </div>
                )}

                {showSuggestions && suggestions.length > 0 && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 'calc(100% + 12px)', 
                    left: 0, 
                    width: '100%', 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    backdropFilter: 'blur(16px)',
                    zIndex: 50, 
                    borderRadius: '16px', 
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.1)',
                    padding: '8px'
                  }}>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {suggestions.map((suggestion) => (
                        <li 
                          key={suggestion.place_id} 
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{ 
                            padding: '14px 16px', 
                            borderRadius: '10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            color: '#0f172a',
                            transition: 'all 0.2s ease',
                            fontWeight: 500
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                            e.currentTarget.style.transform = 'translateX(4px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          <MapPin size={16} color="#10b981" />
                          <span>{suggestion.display_name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                disabled={isTransitioning}
                style={{ 
                  width: '100%', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  color: 'white', 
                  padding: '20px', 
                  borderRadius: '16px', 
                  fontWeight: 800, 
                  fontSize: '1.1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '10px', 
                  border: 'none', 
                  cursor: isTransitioning ? 'wait' : 'pointer', 
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 12px 24px -8px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                  position: 'relative',
                  overflow: 'hidden'
                }} 
                onMouseEnter={e => {
                  if (isTransitioning) return;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 30px -10px rgba(16, 185, 129, 0.6), inset 0 1px 0 rgba(255,255,255,0.3)';
                }} 
                onMouseLeave={e => {
                  if (isTransitioning) return;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(16, 185, 129, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)';
                }}
              >
                {isTransitioning ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <>
                    <FileText size={22} /> Run Environmental Scan
                  </>
                )}
              </button>
            </form>

            <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', color: '#64748b', justifyContent: 'center', marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                 <CheckCircle2 size={16} color="#10b981" /> Emailed in minutes
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                 <Lock size={16} color="#10b981" /> 256-bit SSL
              </div>
            </div>
          </div>

          <div ref={badgesRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', willChange: 'transform, opacity' }}>
             {[
               { icon: <Shield size={24} color="#3b82f6" />, title: 'Official Data', desc: 'Public records', bg: 'rgba(59, 130, 246, 0.08)' },
               { icon: <Home size={24} color="#10b981" />, title: 'Any Home', desc: '48 US states', bg: 'rgba(16, 185, 129, 0.08)' },
               { icon: <AlertTriangle size={24} color="#8b5cf6" />, title: 'Risk Facts', desc: 'Know before signing', bg: 'rgba(139, 92, 246, 0.08)' }
             ].map((b, i) => (
               <div key={i} style={{ 
                 background: 'rgba(255, 255, 255, 0.5)', 
                 backdropFilter: 'blur(12px)',
                 borderRadius: '20px', 
                 padding: '20px 16px', 
                 textAlign: 'center', 
                 border: '1px solid rgba(255, 255, 255, 0.6)',
                 boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)',
                 transition: 'transform 0.3s ease'
               }}
               onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
               onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
               >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                    {b.icon}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '6px', color: '#0f172a', lineHeight: 1.2 }}>{b.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>{b.desc}</div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Interactive 3D Mockup */}
        <div ref={mockupRef} style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '20px 0', willChange: 'transform, opacity' }}>
          
          {/* Main Card Inner Container for 3D Tilt */}
          <div ref={mockupInnerRef} style={{ 
            width: '100%', 
            maxWidth: '440px', 
            background: 'rgba(255, 255, 255, 0.85)', 
            backdropFilter: 'blur(20px)',
            borderRadius: '32px', 
            overflow: 'hidden', 
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.6) inset', 
            color: '#09090b',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}>
            
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)', pointerEvents: 'none', zIndex: 10, borderRadius: '32px' }} />

            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', padding: '32px 28px', color: 'white', position: 'relative', overflow: 'hidden' }}>
              {/* Subtle glass reflection in header */}
              <div style={{ position: 'absolute', top: '-50%', left: '-50%', right: '-50%', bottom: '-50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 40%)', transform: 'rotate(-15deg)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#94a3b8' }}>Risk Report</div>
                <div style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '999px', color: '#10b981', fontWeight: 700 }}>Verified</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px', fontSize: '1rem', color: '#f8fafc', fontWeight: 500, position: 'relative', zIndex: 1 }}>
                <MapPin size={20} color="#10b981" />
                412 Maple Avenue, Austin, TX
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', zIndex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px', fontWeight: 700 }}>Overall Score</div>
                  <div style={{ fontSize: '4rem', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.03em' }}>82<span style={{ fontSize: '1.5rem', color: '#64748b' }}>/100</span></div>
                </div>
                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.2)' }}>
                  <svg style={{ position: 'absolute', top: 0, left: 0, width: '80px', height: '80px', transform: 'rotate(-90deg)' }}>
                    <circle cx="40" cy="40" r="38" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="238" strokeDashoffset="45" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.5))' }} />
                  </svg>
                  <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#ffffff' }}>B+</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '28px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                {[
                  { icon: <Droplets size={18} color="#3b82f6" />, label: 'Water Quality', grade: 'A-', color: '#10b981' },
                  { icon: <Wind size={18} color="#06b6d4" />, label: 'Air Quality', grade: 'B+', color: '#10b981' },
                  { icon: <Mountain size={18} color="#8b5cf6" />, label: 'Soil Contamination', grade: 'C', color: '#f59e0b' },
                  { icon: <Waves size={18} color="#3b82f6" />, label: 'Flood Risk', grade: 'B', color: '#10b981' },
                  { icon: <Factory size={18} color="#ef4444" />, label: 'Superfund & Hazards', grade: 'A', color: '#10b981' }
                ].map((item, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    fontSize: '0.95rem',
                    background: 'rgba(255, 255, 255, 0.6)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#334155', fontWeight: 600 }}>
                      {item.icon} {item.label}
                    </div>
                    <div style={{ fontWeight: 800, color: item.color }}>{item.grade}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1.5px', color: '#64748b', marginBottom: '16px' }}>
                  <MessageSquare size={16} color="#10b981" /> NEGOTIATION POINTS
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#475569', fontWeight: 500 }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.5)', padding: '10px 12px', borderRadius: '8px' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                    <span>Request water filtration credit ($300 value)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.5)', padding: '10px 12px', borderRadius: '8px' }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>•</span>
                    <span>Verify lead paint testing prior to moving in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Decorators */}
          <div style={{ position: 'absolute', top: '-10px', right: '-20px', background: 'white', padding: '12px 16px', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)', border: '1px solid rgba(0,0,0,0.05)', zIndex: 20, transform: 'translateZ(50px)' }}>
            <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
            <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>15+ Federal Databases</span>
          </div>
        </div>
      </div>
    </section>
  );
}
