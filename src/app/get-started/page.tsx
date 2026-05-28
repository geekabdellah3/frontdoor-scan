'use client';

import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  FileText, 
  ChevronRight, 
  MapPin, 
  Star,
  Download,
  Terminal,
  ArrowRight,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import gsap from 'gsap';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const REVIEWS = [
  {
    result: '$23,000 off the asking price — deal done in 48 hours',
    stars: 5, name: 'Marcus T.', loc: 'Austin, TX', initials: 'MT', color: '#1a7a4a', badge: 'Verified Buyer',
    text: 'Found an active Superfund site 0.4 miles from the front door. Brought the EPA documents to the table. Sellers had no counter. Got $23K off, no negotiation drama, no realtor pushback.',
  },
  {
    result: 'Radon 3× the EPA limit — caught before my kids moved in',
    stars: 5, name: 'Jennifer R.', loc: 'Phoenix, AZ', initials: 'JR', color: '#2563eb', badge: 'Homeowner',
    text: "Radon came back at zone 1 — well above 4 pCi/L. Called mitigation the next morning. Should be mandatory before any home purchase.",
  },
  {
    result: 'Avoided 2 toxic deals that would have cost me six figures',
    stars: 5, name: 'Derek C.', loc: 'Columbus, OH', initials: 'DC', color: '#7c3aed', badge: 'Real Estate Investor',
    text: "Both properties looked clean on paper. One had a brownfield site within the boundary. The legal liability exposure would've been catastrophic.",
  },
];

function GetStartedContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';
  const mainRef = useRef<HTMLDivElement>(null);

  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  // Get user location for biased search
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => console.log('Geolocation permission denied')
      );
    }
  }, []);

  const attributionRef = useRef<Record<string, string>>({});
  useEffect(() => {
    const stored = sessionStorage.getItem('fds_attribution');
    if (stored) {
      attributionRef.current = JSON.parse(stored);
    } else {
      const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','ttclid','msclkid'];
      const attrs: Record<string,string> = {};
      keys.forEach(k => { const v = searchParams.get(k); if (v) attrs[k] = v; });
      attributionRef.current = attrs;
      sessionStorage.setItem('fds_attribution', JSON.stringify(attrs));
    }
  }, [searchParams]);

  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window === 'undefined') return 579;
    const saved = sessionStorage.getItem('fds_countdown');
    return saved ? parseInt(saved, 10) : 579;
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev <= 1 ? 0 : prev - 1;
        sessionStorage.setItem('fds_countdown', String(next));
        if (next === 0) clearInterval(interval);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) =>
    `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  const [selectedPackage, setSelectedPackage] = useState<'single'|'bundle'>('single');
  const [purchaseType, setPurchaseType] = useState<'save'|'onetime'>('onetime');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [shippingState, setShippingState] = useState('');
  const [zipCode, setZipCode] = useState('');

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const autocompleteController = useRef<AbortController | null>(null);

  useEffect(() => {
    const val = addressLine1.trim();
    if (val.length >= 3) {
      if (autocompleteController.current) autocompleteController.current.abort();
      autocompleteController.current = new AbortController();
      
      const fetch_ = async () => {
        setIsLoadingSuggestions(true);
        try {
          let url = `/api/places?input=${encodeURIComponent(val)}`;
          if (userLocation) {
            url += `&lat=${userLocation.lat}&lon=${userLocation.lon}`;
          }
          const res = await fetch(url, { signal: autocompleteController.current?.signal });
          if (res.ok) {
            const data = await res.json();
            if (data.predictions) { 
              setSuggestions(data.predictions); 
              setShowSuggestions(data.predictions.length > 0); 
            }
          }
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') console.error('Autocomplete error:', err);
        } finally { setIsLoadingSuggestions(false); }
      };
      
      const t = setTimeout(fetch_, 300);
      return () => { clearTimeout(t); autocompleteController.current?.abort(); };
    } else { 
      setSuggestions([]); 
      setShowSuggestions(false); 
    }
  }, [addressLine1, userLocation]);

  const handleSuggestionClick = (prediction: any) => {
    const p = prediction.properties;
    setAddressLine1(p.name || p.street || '');
    setCity(p.city || p.town || p.village || '');
    setShippingState(p.state || '');
    setZipCode(p.postcode || '');
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest('.autocomplete-container')) setShowSuggestions(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    if (!address) return;
    const parts = address.split(',').map(p => p.trim());
    setAddressLine1(parts[0] || '');
    setCity(parts[1] || '');
    // Simplified pre-fill
  }, [address]);

  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setPromoDiscountAmount] = useState(0);

  const getPackagePriceInfo = () => {
    if (selectedPackage === 'single') return { price:49, reg:69, saving:20, name:'Front Door Scan Environmental Report (1 Property)' };
    return { price:199, reg:345, saving:146, name:'Front Door Scan Environmental Report Bundle (5 Properties)' };
  };
  
  const priceInfo = getPackagePriceInfo();
  const finalPrice = Math.max(0, priceInfo.price - discountAmount);

  const [checkoutState, setCheckoutState] = useState<'idle'|'processing'|'success'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const terminalLogsEndRef = useRef<HTMLDivElement>(null);

  const logSteps = [
    'Establishing secure 256-bit encrypted connection...',
    'Geocoding target coordinates via GIS mapping telemetry...',
    'Connecting to US EPA ECHO & EJScreen database registry...',
    'Scanning CDC & local municipal public groundwater registries...',
    'Analyzing water contaminants (PFAS, nitrates, heavy metals)...',
    'Querying FEMA regional flood maps & disaster history matrices...',
    'Locating active Superfunds, Brownfields & toxic waste sites within 2 miles...',
    'Indexing county FIPS radon gas classifications...',
    'Generating custom buyer price negotiation talking points...',
    'Successfully compiling high-resolution property diagnostic PDF...',
  ];

  useEffect(() => {
    if (checkoutState === 'processing') {
      let currentStep = 0;
      const interval = setInterval(() => {
        if (currentStep < logSteps.length) {
          setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logSteps[currentStep]}`]);
          currentStep++;
        } else {
          clearInterval(interval);
          setTimeout(() => setCheckoutState('success'), 1000);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [checkoutState]);

  const handleTabChange = (tab: 'save'|'onetime') => {
    setPurchaseType(tab);
    setSelectedPackage(tab === 'save' ? 'bundle' : 'single');
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'WELCOME10') { 
      setPromoApplied(true); 
      setPromoDiscountAmount(10); 
      setPromoSuccess('✓ WELCOME10 applied! $10.00 off.'); 
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try WELCOME10');
      setPromoSuccess('');
    }
  };

  const SHOPIFY_CHECKOUT_URL = 'https://frontdoorscan.myshopify.com/cart';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !addressLine1 || !city || !shippingState || !zipCode) return;
    
    setCheckoutState('processing');
    
    // Simulate some logic delay then redirect
    setTimeout(() => {
      const params = new URLSearchParams({
        'checkout[email]': email,
        'checkout[shipping_address][first_name]': firstName,
        'checkout[shipping_address][last_name]': lastName,
        'checkout[shipping_address][address1]': addressLine1,
        'checkout[shipping_address][city]': city,
        'checkout[shipping_address][province]': shippingState,
        'checkout[shipping_address][zip]': zipCode,
        'checkout[shipping_address][country]': 'United States',
        ref: selectedPackage,
      });
      window.location.href = `${SHOPIFY_CHECKOUT_URL}?${params.toString()}`;
    }, 9000); // After logs finish
  };

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stagger-in', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]" ref={mainRef}>
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {checkoutState === 'processing' ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
              <div className="w-full max-w-2xl glass-panel bg-zinc-900 border-zinc-800 p-8 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                  <Terminal className="text-emerald-500" size={24} />
                  <h2 className="text-zinc-100 font-mono text-lg font-bold">SafeScan™ System Initialization</h2>
                </div>
                <div className="font-mono text-sm space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar text-emerald-500/90">
                  {terminalLogs.map((log, i) => (
                    <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                      <span className="opacity-40 text-xs mt-0.5">{i + 1}</span>
                      <p>{log}</p>
                    </div>
                  ))}
                  <div ref={terminalLogsEndRef} />
                  <div className="flex items-center gap-2 mt-4">
                    <span className="w-2 h-4 bg-emerald-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Context & Trust */}
              <div className="lg:col-span-7 space-y-8 stagger-in">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck size={14} />
                    Verified Environmental Data
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                    Complete Your <span className="text-emerald-600">Property Audit</span>
                  </h1>
                  <p className="text-lg text-zinc-600 max-w-xl">
                    Standard home inspections don&apos;t look for what we find. Protect your family and your investment with a deep-tier environmental scan.
                  </p>
                </div>

                {/* Fear/Alert Block */}
                <div className="glass-panel p-6 bg-rose-50 border-rose-100 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-rose-500/10 transition-colors" />
                  <div className="flex flex-col md:flex-row gap-6 relative">
                    <div className="flex-shrink-0 flex flex-col items-center justify-center text-center px-6 border-b md:border-b-0 md:border-r border-rose-200/50">
                      <ShieldAlert className="text-rose-500 mb-2" size={32} />
                      <div className="text-4xl font-black text-rose-600 font-mono">633×</div>
                      <div className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter leading-tight mt-1">More Expensive<br/>if you&apos;re wrong</div>
                    </div>
                    <div className="flex-1 space-y-3">
                      <h3 className="text-lg font-bold text-rose-900">The Liability Trap</h3>
                      <p className="text-sm text-rose-800/80 leading-relaxed">
                        Sellers aren&apos;t required to disclose hazards they haven&apos;t tested for. Once the deed transfers, Superfund cleanup costs and toxic soil liabilities become <strong>your legal responsibility</strong>.
                      </p>
                      <div className="flex flex-wrap gap-4 pt-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                          <Check size={14} /> EPA Regulated
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                          <Check size={14} /> No Recourse After Closing
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" size={20} />
                    Recent Success Stories
                  </h3>
                  <div className="grid gap-4">
                    {REVIEWS.map((rev, i) => (
                      <div key={i} className="glass-panel p-5 bg-white rounded-2xl border-zinc-200/60 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner"
                              style={{ background: rev.color }}
                            >
                              {rev.initials}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-zinc-900">{rev.name}</div>
                              <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-medium">{rev.loc} • {rev.badge}</div>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, j) => (
                              <Star key={j} size={12} className="text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                        </div>
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 py-2 px-3 rounded-r-lg mb-3">
                          <p className="text-xs font-bold text-emerald-900 leading-tight">
                            &quot;{rev.result}&quot;
                          </p>
                        </div>
                        <p className="text-sm text-zinc-600 leading-relaxed italic">
                          &quot;{rev.text}&quot;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust Seals */}
                <div className="flex flex-wrap items-center justify-center gap-8 py-6 opacity-40 grayscale hover:grayscale-0 transition-all">
                  <span className="font-bold text-sm tracking-tighter">EPA DATA SOURCE</span>
                  <span className="font-bold text-sm tracking-tighter">CDC ATSDR</span>
                  <span className="font-bold text-sm tracking-tighter">FEMA NFIP</span>
                  <span className="font-bold text-sm tracking-tighter">USGS WATER INFO</span>
                </div>
              </div>

              {/* Right Column: Checkout Form */}
              <div className="lg:col-span-5 stagger-in">
                <div className="sticky top-28 space-y-6">
                  
                  {/* Timer */}
                  <div className="glass-panel bg-emerald-950 text-white p-4 rounded-2xl flex items-center justify-between border-emerald-500/20 shadow-xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-3 relative">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Clock className="text-emerald-400 animate-pulse" size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-400">Limited Availability</div>
                        <div className="text-xl font-black font-mono tracking-wider">{formatTime(timeLeft)}</div>
                      </div>
                    </div>
                    <div className="text-right relative">
                      <div className="text-[10px] text-emerald-300 font-medium mb-0.5">Price Locked For</div>
                      <div className="text-xs font-bold px-2 py-0.5 bg-emerald-500 rounded text-emerald-950">Active Session</div>
                    </div>
                  </div>

                  {/* Checkout Panel */}
                  <div className="glass-panel bg-white border-zinc-200 rounded-3xl shadow-2xl shadow-zinc-200/50 overflow-hidden">
                    
                    {/* Package Selector */}
                    <div className="p-1 bg-zinc-100 flex rounded-t-3xl">
                      <button 
                        onClick={() => handleTabChange('onetime')}
                        className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all ${purchaseType === 'onetime' ? 'bg-white text-zinc-900 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                      >
                        Single Report
                      </button>
                      <button 
                        onClick={() => handleTabChange('save')}
                        className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all relative ${purchaseType === 'save' ? 'bg-white text-emerald-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                      >
                        Comparison Bundle
                        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-emerald-500 text-white text-[8px] font-black rounded-full uppercase">Best Value</span>
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Pricing Info */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-bold text-zinc-900">Report Package</div>
                          <div className="text-xs text-zinc-500 truncate max-w-[200px]">{priceInfo.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-rose-500 line-through font-bold">${priceInfo.reg}</div>
                          <div className="text-2xl font-black text-zinc-900 tracking-tighter">${priceInfo.price}</div>
                        </div>
                      </div>

                      {/* Promo Code */}
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Promo Code" 
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all uppercase"
                          />
                          <button 
                            onClick={handleApplyPromo}
                            className="px-4 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl hover:bg-black transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {promoError && <p className="text-[10px] text-rose-500 font-bold ml-1">{promoError}</p>}
                        {promoSuccess && <p className="text-[10px] text-emerald-600 font-bold ml-1">{promoSuccess}</p>}
                      </div>

                      <div className="h-px bg-zinc-100" />

                      {/* Form */}
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">First Name</label>
                            <input 
                              required
                              placeholder="John"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Last Name</label>
                            <input 
                              required
                              placeholder="Doe"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                          />
                        </div>

                        <div className="space-y-1.5 autocomplete-container relative">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Property Address</label>
                          <div className="relative">
                            <input 
                              required
                              placeholder="Search for property..."
                              value={addressLine1}
                              onChange={(e) => setAddressLine1(e.target.value)}
                              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                            />
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                            {isLoadingSuggestions && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                              </div>
                            )}
                          </div>
                          
                          {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 glass-panel bg-white border-zinc-200 rounded-2xl shadow-2xl z-[100] max-height-[240px] overflow-y-auto">
                              {suggestions.map((s, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => handleSuggestionClick(s)}
                                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-emerald-50 transition-colors border-b border-zinc-50 last:border-0"
                                >
                                  <MapPin size={14} className="text-emerald-500 flex-shrink-0" />
                                  <span className="truncate">{s.description}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <input 
                            required
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input 
                              required
                              placeholder="State"
                              value={shippingState}
                              onChange={(e) => setShippingState(e.target.value)}
                              className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                            />
                            <input 
                              required
                              placeholder="Zip"
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                              className="bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                            />
                          </div>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-2xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-3 transition-all active:scale-[0.98] group mt-4"
                        >
                          <Zap size={20} className="fill-white" />
                          GET MY REPORT NOW
                          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="flex items-center justify-center gap-4 pt-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                            <Lock size={12} />
                            SSL SECURE
                          </div>
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                            <ShieldCheck size={12} />
                            TRUSTED SCAN
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Guarantee Footer */}
                  <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-zinc-200 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="text-emerald-600" size={24} />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900">30-Day Money Back Guarantee</div>
                      <p className="text-[10px] text-zinc-500 leading-relaxed">
                        If you&apos;re not satisfied with the depth of our scan, we&apos;ll refund your $49 immediately. No questions asked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      
      <style jsx global>{`
        .glass-panel {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

export default function GetStartedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    }>
      <GetStartedContent />
    </Suspense>
  );
}
