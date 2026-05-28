'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Loader2, 
  Home, 
  AlertTriangle, 
  Droplets, 
  Wind, 
  Mountain, 
  Waves, 
  Factory, 
  Activity, 
  Shield, 
  CheckCircle2, 
  Lock, 
  FileText,
  Sparkles,
  Zap,
  ArrowRight,
  Search,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import gsap from 'gsap';

interface Suggestion {
  place_id: number | string;
  description: string;
  properties?: any;
}

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

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  // Detect touch device & get location for bias
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      }, null, { enableHighAccuracy: false, timeout: 5000 });
    }
  }, []);

  // Handle clicking outside the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      
      tl.from(titleRef.current, { y: 60, opacity: 0, skewY: 2 }, 0.2)
        .from(subtitleRef.current, { y: 40, opacity: 0 }, 0.4)
        .from(formCardRef.current, { y: 50, opacity: 0, rotateX: -15, transformPerspective: 1000 }, 0.5)
        .from('.trust-badge', { y: 20, opacity: 0, stagger: 0.1 }, 0.7)
        .from(mockupRef.current, { x: 100, opacity: 0, rotateY: -20, transformPerspective: 1500 }, 0.3);
        
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // 3D Tilt Effect
  useEffect(() => {
    if (!mockupRef.current || !mockupInnerRef.current || isTouchDevice) return;
    
    const container = mockupRef.current;
    const inner = mockupInnerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height/2) / (rect.height/2)) * -10;
      const rotateY = ((x - rect.width/2) / (rect.width/2)) * 10;
      
      gsap.to(inner, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
      });
    };
    
    const resetTilt = () => {
      gsap.to(inner, { rotateX: 0, rotateY: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', resetTilt);
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', resetTilt);
    };
  }, [isTouchDevice]);

  // Address Suggestions (Photon API via our /api/places)
  useEffect(() => {
    const query = address.trim();
    if (isValidAddress || query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        let url = `/api/places?input=${encodeURIComponent(query)}`;
        if (userLocation) {
          url += `&lat=${userLocation.lat}&lon=${userLocation.lon}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (data.predictions) {
          setSuggestions(data.predictions);
          setShowSuggestions(data.predictions.length > 0);
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [address, isValidAddress, userLocation]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (address.length < 5) {
      setError('Please enter a valid property address.');
      return;
    }
    setIsTransitioning(true);
    router.push(`/get-started?address=${encodeURIComponent(address)}`);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setAddress(suggestion.description);
    setIsValidAddress(true);
    setShowSuggestions(false);
    setError('');
  };

  return (
    <section ref={heroRef} className="hero-section relative min-h-screen flex items-center pt-32 lg:pt-20 overflow-hidden bg-[#fafafa]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest animate-fade-in">
                  <Sparkles size={14} className="fill-emerald-500" />
                  2024 Spatial Intelligence Active
                </div>
                <h1 ref={titleRef} className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-zinc-900 leading-[1.1] lg:leading-[1.05] text-balance">
                  Is Your Home <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">Hiding Risks?</span>
                </h1>
                <p ref={subtitleRef} className="hero-paragraph text-lg lg:text-xl text-zinc-600 max-w-xl leading-relaxed">
                  Standard inspections miss what we find. Scan 15+ federal databases for toxic hazards, air quality, and superfund proximity instantly.
                </p>
              </div>

            {/* Form Card */}
            <div ref={formCardRef} className="hero-form-card glass-panel-spatial p-8 bg-white/70 border-white relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-transparent pointer-events-none" />
              
              <div className="space-y-6 relative">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 flex items-center gap-2">
                    <Zap size={14} className="fill-emerald-600" />
                    Instant Parcel Intelligence
                  </div>
                  <div className="text-[10px] font-bold text-zinc-400">48 US STATES ACTIVE</div>
                </div>

                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative autocomplete-container" ref={dropdownRef}>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                      <input 
                        type="text" 
                        placeholder="Enter property address..." 
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          setIsValidAddress(false);
                          setError('');
                        }}
                        className={`w-full bg-white border ${error ? 'border-rose-500' : 'border-zinc-200'} rounded-2xl py-5 pl-12 pr-4 text-lg font-medium shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all`}
                      />
                      {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                          <Loader2 size={20} className="animate-spin text-emerald-500" />
                        </div>
                      )}
                    </div>

                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-3 glass-panel-spatial bg-white border-zinc-200 shadow-2xl z-50 p-2 max-h-[300px] overflow-y-auto">
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleSuggestionClick(s)}
                            className="w-full flex items-center gap-4 px-4 py-4 text-left hover:bg-emerald-50 rounded-xl transition-colors group"
                          >
                            <MapPin size={18} className="text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                            <span className="text-sm font-semibold text-zinc-700">{s.description}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {error && <p className="text-xs font-bold text-rose-500 ml-2">{error}</p>}

                  <button 
                    type="submit"
                    disabled={isTransitioning}
                    className="w-full bg-zinc-900 hover:bg-black text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-zinc-900/10 group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <FileText size={22} className="relative z-10" />
                    <span className="relative z-10">RUN ENVIRONMENTAL SCAN</span>
                    <ArrowRight size={22} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>

                <div className="flex items-center justify-center gap-8 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <CheckCircle2 size={14} className="text-emerald-500" />
                    Emailed in minutes
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <Lock size={14} className="text-emerald-500" />
                    Secure Data Vault
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'EPA Data Source', icon: <Shield size={18} /> },
                { label: 'FEMA Flood Maps', icon: <Waves size={18} /> },
                { label: 'Soil Toxicity', icon: <Mountain size={18} /> },
              ].map((item, i) => (
                <div key={i} className="trust-badge flex flex-col items-center justify-center gap-2 p-4 bg-white border border-zinc-100 rounded-2xl text-center shadow-sm">
                  <div className="text-emerald-600">{item.icon}</div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Mockup */}
          <div ref={mockupRef} className="lg:col-span-5 hidden lg:block perspective-container">
            <div ref={mockupInnerRef} className="glass-panel-spatial bg-white shadow-2xl relative overflow-hidden group">
              <div className="bg-zinc-900 p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                <div className="flex justify-between items-center mb-6 relative">
                  <div className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">RISK REPORT #FDS-829</div>
                  <div className="px-2 py-0.5 rounded bg-emerald-500 text-[9px] font-black text-zinc-900">VERIFIED</div>
                </div>
                <div className="flex items-center gap-3 mb-8 relative">
                  <MapPin className="text-emerald-500" size={20} />
                  <span className="font-bold text-lg">412 Maple Avenue, Austin, TX</span>
                </div>
                <div className="flex justify-between items-end relative">
                  <div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase mb-1">Safety Score</div>
                    <div className="text-5xl font-black">82<span className="text-xl text-zinc-600">/100</span></div>
                  </div>
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex items-center justify-center text-2xl font-black shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                    B+
                  </div>
                </div>
              </div>

              <div className="p-8 space-y-4">
                {[
                  { label: 'Water Quality', score: 'A-', color: 'text-emerald-500', icon: <Droplets size={16} /> },
                  { label: 'Air Toxicity', score: 'B+', color: 'text-emerald-500', icon: <Wind size={16} /> },
                  { label: 'Soil Hazards', score: 'C', color: 'text-amber-500', icon: <Mountain size={16} /> },
                  { label: 'Superfund Sites', score: 'A', color: 'text-emerald-500', icon: <Factory size={16} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="flex items-center gap-3 text-sm font-bold text-zinc-700">
                      <span className="text-emerald-600">{item.icon}</span>
                      {item.label}
                    </div>
                    <span className={`text-sm font-black ${item.color}`}>{item.score}</span>
                  </div>
                ))}

                <div className="pt-4 border-t border-zinc-100">
                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-3">Key Negotiation Points</div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-zinc-500 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                      Request lead paint testing credit ($450)
                    </div>
                    <div className="text-xs font-semibold text-zinc-500 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1" />
                      Industrial site proximity disclosure required
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 glass-panel-spatial bg-white p-4 shadow-xl flex items-center gap-3 border-emerald-100 animate-bounce duration-[3000ms]">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <ShieldCheck className="text-emerald-600" size={20} />
              </div>
              <div>
                <div className="text-[10px] font-black text-zinc-900 uppercase">FIPS Validated</div>
                <div className="text-[9px] text-zinc-500">Official County Records</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
