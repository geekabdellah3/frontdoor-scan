'use client';

import { useSearchParams } from 'next/navigation';
import { ShieldCheck, Lock, Check, Clock, Sparkles, ShieldAlert, FileText, Activity, Zap } from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

const REVIEWS = [
  { 
    result: "SAVED $18,200 ON CLOSING", 
    stars: 5, 
    text: "The standard inspection was clean. Front Door Scan found a former industrial dry cleaner site 400ft away with known groundwater issues. Used the report to negotiate $18k off the price for a whole-house filtration system.", 
    name: "Michael R.", 
    loc: "Austin, TX", 
    initials: "MR", 
    color: "#2563eb",
    badge: "Homebuyer"
  },
  { 
    result: "WALKED AWAY FROM A TOXIC DEAL", 
    stars: 5, 
    text: "We were days from signing. This report revealed the lot was adjacent to an unmapped historical landfill. Standard inspector had no clue. This $49 report saved us from a $400k mistake and future health risks.", 
    name: "Sarah L.", 
    loc: "Denver, CO", 
    initials: "SL", 
    color: "#7c3aed",
    badge: "Family of 4"
  },
  { 
    result: "DISCOVERED HIDDEN LEAD RISK", 
    stars: 5, 
    text: "I'm a real estate investor and use this for every deal now. Found a major lead-in-soil alert that allowed me to demand a remediation credit before the contract went firm. Invaluable tool for any professional.", 
    name: "James K.", 
    loc: "Chicago, IL", 
    initials: "JK", 
    color: "#059669",
    badge: "Real Estate Investor"
  }
];

function GetStartedContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';

  const attributionRef = useRef<Record<string, string>>({});
  useEffect(() => {
    const stored = sessionStorage.getItem('fdf_attribution');
    if (stored) {
      attributionRef.current = JSON.parse(stored);
    } else {
      const keys = ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid','ttclid','msclkid'];
      const attrs: Record<string,string> = {};
      keys.forEach(k => { const v = searchParams.get(k); if (v) attrs[k] = v; });
      attributionRef.current = attrs;
      sessionStorage.setItem('fdf_attribution', JSON.stringify(attrs));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window === 'undefined') return 579;
    const saved = sessionStorage.getItem('fdf_countdown');
    return saved ? parseInt(saved, 10) : 579;
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const next = prev <= 1 ? 0 : prev - 1;
        sessionStorage.setItem('fdf_countdown', String(next));
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
  const [country, setCountry] = useState('United States');
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
          const res = await fetch(`/api/places?input=${encodeURIComponent(val)}`, { signal: autocompleteController.current?.signal });
          if (res.ok) {
            const data = await res.json();
            if (data.predictions) { setSuggestions(data.predictions); setShowSuggestions(data.predictions.length > 0); }
          }
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') console.error('Autocomplete error:', err);
        } finally { setIsLoadingSuggestions(false); }
      };
      const t = setTimeout(fetch_, 300);
      return () => { clearTimeout(t); autocompleteController.current?.abort(); };
    } else { setSuggestions([]); setShowSuggestions(false); }
  }, [addressLine1]);

  const handleSuggestionClick = (prediction: any) => {
    const parts = prediction.description.split(',').map((p: string) => p.trim());
    const parsedStreet = parts[0] || '';
    const parsedCity = parts.length > 1 ? parts[1] : '';
    let parsedState = ''; let parsedZip = '';
    if (parts.length > 2) { const sv = parts[2].split(' '); parsedState = sv[0] || ''; parsedZip = sv[1] || ''; }
    setAddressLine1(parsedStreet);
    if (parsedCity) setCity(parsedCity);
    if (parsedState) setShippingState(parsedState);
    if (parsedZip) setZipCode(parsedZip);
    setCountry('United States');
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.id !== 'ship-address1' && !t.closest('.autocomplete-suggestions-box')) setShowSuggestions(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    if (address) {
      const parts = address.split(',').map(p => p.trim());
      let street = parts[0] || ''; let ci = 1;
      if (parts.length > 1 && (/^\d+$/.test(parts[0]) || parts[0].length <= 5)) { street = `${parts[0]} ${parts[1]}`; ci = 2; }
      const pc = parts[ci] || '';
      let ps = '';
      for (let i = ci+1; i < parts.length; i++) { if (parts[i].length === 2 && /^[A-Z]{2}$/i.test(parts[i])) { ps = parts[i].toUpperCase(); break; } }
      if (!ps && parts.length >= ci+3) ps = parts[ci+2];
      const zp = parts.find(p => /^\d{5}(-\d{4})?$/.test(p));
      const timer = setTimeout(() => { setAddressLine1(street); setCity(pc); setShippingState(ps); if (zp) setZipCode(zp); }, 0);
      return () => clearTimeout(timer);
    } else {
      const fetchLocation = async () => {
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          if (data.city && data.region_code) {
            const locString = `${data.city}, ${data.region_code}`;
            setAddressLine1(locString);
          }
        } catch (err) {
          console.error("Silent localization failed:", err);
        }
      };
      fetchLocation();
    }
  }, [address]);


  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setPromoDiscountAmount] = useState(0);

  const getPackagePriceInfo = () => {
    if (selectedPackage === 'single') return { price:49, reg:69, saving:20, name:'SafeTrace Environmental Report (1 Property)', metaLabel:'1 Property (Single Report)' };
    return { price:199, reg:345, saving:146, name:'SafeTrace Environmental Report Bundle (5 Properties)', metaLabel:'5 Properties (Comparison Bundle)' };
  };

  const priceInfo = getPackagePriceInfo();
  
  // Hormozi-style Value Stacking
  const VALUE_ITEMS = [
    { name: 'US EPA Data Scan (90+ Sets)', val: '$299' },
    { name: 'Water & Groundwater Analysis', val: '$199' },
    { name: 'Air Quality & criteria pollutants', val: '$149' },
    { name: 'Flood & Disaster Resilience Mapping', val: '$99' },
    { name: 'Superfund & Toxic Site Database Query', val: '$149' },
    { name: 'Property-Specific Risk Scoring', val: '$149' },
    { name: 'BONUS: Price Negotiation Script (PRO)', val: '$99', isFree: true },
  ];
  const totalValue = 1143;

  const finalPrice = Math.max(0, priceInfo.price - discountAmount);
  const totalSavings = (totalValue - finalPrice);

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
    if (checkoutState === 'processing') terminalLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs, checkoutState]);

  const handleTabChange = (tab: 'save'|'onetime') => {
    setPurchaseType(tab);
    setSelectedPackage(tab === 'save' ? 'bundle' : 'single');
  };

  const applyLocalPromoFallback = (code: string) => {
    if (code === 'WELCOME10') { setPromoApplied(true); setPromoDiscountAmount(10); setPromoSuccess('✓ WELCOME10 applied! $10.00 off.'); }
    else if (code === 'SAFETY15') { setPromoApplied(true); setPromoDiscountAmount(15); setPromoSuccess('✓ SAFETY15 applied! $15.00 off.'); }
    else { setPromoApplied(false); setPromoDiscountAmount(0); setPromoError('Invalid code. Try WELCOME10 or SAFETY15'); }
  };

  const handleApplyPromo = async () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) return;
    setPromoError(''); setPromoSuccess('');
    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase.from('promos').select('*').eq('code', code).eq('is_active', true).single();
        if (error || !data) { applyLocalPromoFallback(code); }
        else { setPromoApplied(true); setPromoDiscountAmount(Number(data.discount)); setPromoSuccess(`✓ ${code} applied! $${data.discount}.00 off.`); }
      } catch { applyLocalPromoFallback(code); }
    } else { applyLocalPromoFallback(code); }
  };

  const handleLeadEmailBlur = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    const payload = { email, source_address: addressLine1 || address || 'Direct Checkout', status: 'new', attribution: attributionRef.current };
    if (isSupabaseConfigured()) {
      try { await supabase.from('leads').insert([payload]); } catch (err) { console.error(err); }
    } else {
      const leads = JSON.parse(localStorage.getItem('frontdoor_local_leads') || '[]');
      if (!leads.some((l: any) => l.email === email)) {
        leads.push({ id: `local-lead-${Date.now()}`, created_at: new Date().toISOString(), ...payload });
        localStorage.setItem('frontdoor_local_leads', JSON.stringify(leads));
      }
    }
  };

  const saveFinalizedOrder = async () => {
    const fullAddr = `${addressLine1}${addressLine2 ? ', '+addressLine2 : ''}, ${city}, ${shippingState} ${zipCode}, ${country}`;
    const payload = {
      address: fullAddr, email, package_tier: selectedPackage, final_price: finalPrice,
      discount_applied: discountAmount, promo_code: promoApplied ? promoCode.toUpperCase() : null,
      payment_status: 'success', delivery_status: 'ready', attribution: attributionRef.current,
      report_data: { recipient_name: `${firstName} ${lastName}`, phone, address_line2: addressLine2, city, state: shippingState, zip: zipCode, country, payment_method: 'shopify', report_count: selectedPackage === 'single' ? 1 : 5, processing_logs: logSteps }
    };
    if (isSupabaseConfigured()) {
      try { await supabase.from('reports').insert([payload]); await supabase.from('leads').update({ status: 'converted' }).eq('email', email); }
      catch (err) { console.error(err); }
    } else {
      const reports = JSON.parse(localStorage.getItem('frontdoor_local_reports') || '[]');
      reports.unshift({ id: `local-txn-${Date.now()}`, created_at: new Date().toISOString(), ...payload });
      localStorage.setItem('frontdoor_local_reports', JSON.stringify(reports));
      const leads = JSON.parse(localStorage.getItem('frontdoor_local_leads') || '[]');
      const idx = leads.findIndex((l: any) => l.email === email);
      if (idx >= 0) leads[idx].status = 'converted';
      else leads.push({ id: `local-lead-${Date.now()}`, created_at: new Date().toISOString(), email, status: 'converted', source_address: fullAddr });
      localStorage.setItem('frontdoor_local_leads', JSON.stringify(leads));
    }
  };

  const SHOPIFY_CHECKOUT_URL = 'https://frontdoorscan.myshopify.com/cart';

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !addressLine1 || !city || !shippingState || !zipCode) return;
    await saveFinalizedOrder();
    const params = new URLSearchParams({
      'checkout[email]': email,
      'checkout[shipping_address][first_name]': firstName,
      'checkout[shipping_address][last_name]': lastName,
      'checkout[shipping_address][address1]': addressLine1,
      'checkout[shipping_address][city]': city,
      'checkout[shipping_address][province]': shippingState,
      'checkout[shipping_address][zip]': zipCode,
      'checkout[shipping_address][country]': country,
      ref: selectedPackage,
      ...Object.fromEntries(new URLSearchParams(window.location.search)),
    });
    window.location.href = `${SHOPIFY_CHECKOUT_URL}?${params.toString()}`;
  };

  const scrollToForm = () => {
    const el = document.getElementById('checkout-form');
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => { document.getElementById('ship-firstname')?.focus(); }, 600); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--font-dm-sans), system-ui, sans-serif', color: 'var(--text-primary)' }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        :root {
          --green: #1a7a4a; --green-light: #10b981; --green-pale: #f0faf5;
          --green-border: rgba(16,185,129,0.18); --red: #dc2626;
          --text-primary: #0f1a13; --text-secondary: #52695c; --text-muted: #8fa898;
          --border: #e2e8e5; --bg: #f9fdfb; --white: #ffffff;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.06); --shadow-md: 0 4px 16px rgba(0,0,0,0.06);
          --radius: 12px; --radius-sm: 8px;
        }
        body { background: var(--bg) !important; font-family: var(--font-dm-sans),system-ui,sans-serif !important; color: var(--text-primary) !important; -webkit-font-smoothing: antialiased; }

        .ann-bar { background: var(--green); color: #fff; text-align: center; padding: 9px 16px; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.3px; }

        .co-header { background: var(--white); border-bottom: 1px solid var(--border); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-sm); }
        .co-logo-link { display: flex; align-items: center; text-decoration: none; }
        .co-logo-img { height: 30px; }
        .co-header-right { display: flex; align-items: center; gap: 12px; }
        .co-secure-badge { display: flex; align-items: center; gap: 4px; font-size: 0.7rem; font-weight: 700; color: var(--text-secondary); }
        .co-timer { display: flex; align-items: center; gap: 5px; background: var(--green-pale); border: 1px solid var(--green-border); color: var(--green); font-size: 0.86rem; font-weight: 700; padding: 5px 12px; border-radius: 99px; font-family: var(--font-dm-mono),monospace; }

        .co-main { max-width: 1020px; margin: 0 auto; padding: 28px 20px 100px; }
        .co-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start; }

        /* LEFT */
        .co-left { display: flex; flex-direction: column; gap: 18px; }

        .prod-card { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-md); }
        .prod-card-hdr { background: #0d1f14; padding: 18px 20px; }
        .prod-card-brand { font-size: 0.62rem; font-weight: 900; letter-spacing: 2.5px; color: #10b981; font-family: var(--font-dm-mono),monospace; text-transform: uppercase; }
        .prod-card-title { font-size: 1rem; font-weight: 800; color: rgba(255,255,255,0.92); margin-top: 3px; }
        .prod-card-addr { margin-top: 10px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 7px 12px; font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.6); font-family: var(--font-dm-mono),monospace; }

        .fear-block { background: #000; border-radius: var(--radius); margin-bottom: 24px; position: relative; overflow: hidden; border: 2px solid #ef4444; box-shadow: 0 0 30px rgba(239,68,68,0.2); }
        .fear-block::before { content:''; position:absolute; inset:0; background: radial-gradient(circle at 10% 10%, rgba(239,68,68,0.1), transparent 50%); pointer-events:none; }
        .fear-row { display:flex; align-items:stretch; position:relative; }
        .fear-left { background:rgba(239,68,68,.1); display:flex; flex-direction:column; justify-content:center; align-items:flex-end; padding:24px 28px; border-right:1px solid rgba(239,68,68,.2); flex-shrink:0; min-width:148px; text-align:right; }
        .fear-warn-icon { font-size:1.2rem; color:#ef4444; margin-bottom:5px; line-height:1; font-weight:900; }
        .fear-num { font-size:3.5rem; font-weight:900; color:#ef4444; line-height:1; letter-spacing:-0.05em; font-family:var(--font-dm-mono),monospace; }
        .fear-lbl { font-size:0.65rem; font-weight:900; color:rgba(255,255,255,.5); letter-spacing:1.8px; text-transform:uppercase; margin-top:7px; line-height:1.7; }
        .fear-right { flex:1; padding:24px 30px; display:flex; flex-direction:column; gap:11px; min-width:0; justify-content:center; }
        .fear-subhead { font-size:1.25rem; font-weight:900; color:#fff; margin:0; line-height:1.2; max-width:480px; text-transform:uppercase; letter-spacing:-0.02em; }
        .fear-text { font-size:0.9rem; color:rgba(255,255,255,.7); line-height:1.6; margin:0; max-width:540px; }
        .fear-text strong { color:#ef4444; font-weight:900; }
        .fear-stats { display:flex; align-items:center; gap:0; margin-top:10px; }
        .fear-div { width:1px; height:28px; background:rgba(255,255,255,.1); margin:0 18px; flex-shrink:0; }
        .fear-stat { display:flex; flex-direction:column; gap:3px; }
        .fear-stat-num { font-size:1.2rem; font-weight:900; color:#f87171; font-family:var(--font-dm-mono),monospace; line-height:1; }
        .fear-stat-num-alert { color:#fff; background:#ef4444; padding:2px 6px; border-radius:4px; font-size:0.9rem; }
        .fear-stat-lbl { font-size:0.64rem; color:rgba(255,255,255,.42); font-weight:600; line-height:1.3; text-transform:uppercase; }
        .fear-source { font-size:0.58rem; color:rgba(255,255,255,.28); font-style:italic; padding-top:9px; border-top:1px solid rgba(255,255,255,.08); }
        .fear-hide-mobile { display:flex; }

        .prod-body { padding: 16px 18px; display: flex; flex-direction: column; gap: 14px; }
        .prod-sub-lbl { font-size:0.58rem; font-weight:900; color:var(--text-muted); letter-spacing:1.5px; text-transform:uppercase; }
        .prod-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:7px; }
        .prod-list li { display:flex; align-items:center; gap:8px; font-size:0.79rem; color:var(--text-primary); font-weight:500; line-height:1.35; }
        .prod-check { color:var(--green-light); flex-shrink:0; }
        .prod-guarantee { display:flex; align-items:center; gap:12px; background:var(--green-pale); border:1px solid #a7f3d0; border-radius:var(--radius-sm); padding:11px 13px; }
        .prod-guar-seal { width:38px; height:38px; border-radius:50%; background:var(--green-light); color:#fff; font-size:0.72rem; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .prod-guar-title { font-size:0.76rem; font-weight:800; color:#047857; }
        .prod-guar-text { font-size:0.68rem; color:#065f46; line-height:1.4; margin-top:1px; }

        .testi-list { display:flex; flex-direction:column; gap:10px; }
        .testi-item { background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius-sm); padding:13px 14px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:8px; }
        .testi-result { background:linear-gradient(90deg,#f0faf5,#fff); border:1px solid #a7f3d0; border-left:3px solid var(--green-light); border-radius:5px; padding:6px 10px; font-size:0.74rem; font-weight:800; color:var(--text-primary); line-height:1.35; }
        .testi-stars { color:#f59e0b; font-size:0.76rem; letter-spacing:1px; }
        .testi-text { font-size:0.74rem; color:var(--text-secondary); margin:0; line-height:1.58; }
        .testi-footer { display:flex; align-items:center; gap:8px; padding-top:7px; border-top:1px solid #f0f4f2; }
        .testi-avatar { width:28px; height:28px; border-radius:50%; color:#fff; font-size:0.58rem; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .testi-name { font-size:0.7rem; font-weight:700; color:var(--text-primary); }
        .testi-badge { font-size:0.56rem; font-weight:700; color:#065f46; margin-top:1px; }

        .data-src { text-align:center; }
        .data-src-lbl { font-size:0.58rem; font-weight:700; color:var(--text-muted); letter-spacing:1px; text-transform:uppercase; margin-bottom:8px; }
        .data-src-list { display:flex; justify-content:center; flex-wrap:wrap; gap:10px; opacity:0.45; }
        .data-src-chip { font-size:0.65rem; font-weight:800; color:var(--text-primary); letter-spacing:0.3px; }

        /* RIGHT */
        .co-right { display:flex; flex-direction:column; gap:18px; }

        .co-card { background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius); padding:20px; box-shadow:var(--shadow-sm); }

        .pkg-tabs { display:grid; grid-template-columns:1.3fr 0.7fr; background:#f4f4f5; border:1px solid var(--border); border-radius:var(--radius-sm); padding:3px; margin-bottom:12px; gap:2px; }
        .pkg-tab { padding:8px; font-size:0.73rem; font-weight:700; border-radius:5px; border:none; cursor:pointer; background:transparent; color:var(--text-secondary); transition:all .15s; font-family:var(--font-dm-sans),sans-serif; }
        .pkg-tab.active { background:var(--white); color:var(--text-primary); box-shadow:var(--shadow-sm); }

        .supply-warn { border:1px solid var(--border); background:var(--white); border-radius:var(--radius-sm); padding:11px 13px; margin-bottom:12px; }
        .supply-warn-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; }
        .supply-warn-lbl { font-size:0.62rem; font-weight:900; color:var(--text-primary); }
        .supply-warn-badge { background:#f0faf5; border:1px solid #a7f3d0; color:#10b981; font-size:0.58rem; font-weight:900; padding:2px 7px; border-radius:99px; }
        .supply-bars { display:flex; gap:2px; height:4px; margin-bottom:5px; }
        .supply-bar { flex:1; border-radius:2px; }
        .supply-bar.on { background:var(--green-light); }
        .supply-bar.off { background:#e4e4e7; }
        .supply-warn-txt { font-size:0.68rem; font-weight:700; color:#059669; margin:0; line-height:1.3; }

        .pkg-card { border:1.5px solid var(--border); border-radius:var(--radius-sm); padding:13px 15px; margin-bottom:9px; cursor:pointer; background:var(--white); display:grid; grid-template-columns:auto auto 1fr auto; gap:10px; align-items:center; transition:all .15s; position:relative; box-shadow:var(--shadow-sm); }
        .pkg-card:hover { border-color:var(--green-light); }
        .pkg-card.active { border-color:var(--green-light); background:var(--green-pale); }
        .pkg-card.popular { border:2px solid var(--green-light); }
        .pkg-card.popular.active { border-color:var(--green); }
        .pkg-pop-tag { position:absolute; top:-9px; right:14px; background:var(--green-light); color:#fff; font-size:0.56rem; font-weight:800; padding:2px 8px; border-radius:99px; }
        .pkg-icon { width:38px; height:38px; border-radius:6px; border:1px solid var(--border); background:#f4f4f5; display:flex; align-items:center; justify-content:center; color:var(--green-light); flex-shrink:0; }
        .pkg-name { font-size:0.8rem; font-weight:800; color:var(--text-primary); }
        .pkg-desc { font-size:0.68rem; color:var(--text-secondary); line-height:1.3; margin-top:2px; }
        .pkg-price { text-align:right; flex-shrink:0; }
        .pkg-price-reg { font-size:0.62rem; color:#ef4444; text-decoration:line-through; font-weight:700; }
        .pkg-price-now { font-size:0.88rem; font-weight:800; color:var(--text-primary); }
        .pkg-price-save { font-size:0.62rem; color:#10b981; font-weight:800; }

        .receipt { border-top:1px dashed var(--border); padding-top:14px; margin-top:12px; display:flex; flex-direction:column; gap:10px; font-size:0.77rem; color:var(--text-secondary); }
        .receipt-row { display:flex; justify-content:space-between; align-items:center; }
        .receipt-val { font-family:var(--font-dm-mono),monospace; font-weight:700; color:var(--text-primary); }
        .receipt-discount { color:#10b981; font-weight:900; }
        .receipt-free { background:#10b981; color:#fff; padding:2px 6px; border-radius:4px; font-weight:900; text-transform:uppercase; font-size:0.6rem; }
        .receipt-incl { color:#059669; font-weight:800; font-size:0.65rem; }
        .receipt-bonus { display:flex; justify-content:space-between; align-items:center; background:#f0fdf8; border:1px solid #6ee7b7; border-radius:var(--radius-sm); padding:8px 12px; }
        .receipt-bonus-lbl { font-size:0.75rem; color:#065f46; font-weight:800; }
        .receipt-sep { border:none; border-top:1px dashed var(--border); margin:4px 0; }
        .receipt-total { background: #000; border:2px solid #10b981; border-radius:var(--radius-sm); padding:18px 20px; margin-top:10px; display:flex; justify-content:space-between; align-items:center; gap:12px; box-shadow: 0 10px 20px rgba(16,185,129,0.15); }
        .receipt-total-left { display:flex; flex-direction:column; gap:3px; }
        .receipt-total-label { font-size:0.9rem; font-weight:900; color:#fff; text-transform:uppercase; letter-spacing:0.5px; }
        .receipt-total-sub { font-size:0.62rem; color:#10b981; font-weight:800; letter-spacing:0.2px; }
        .receipt-total-right { display:flex; flex-direction:column; align-items:flex-end; gap:3px; }
        .receipt-total-price { font-size:1.8rem; font-weight:900; color:#10b981; font-family:var(--font-dm-mono),monospace; line-height:1; letter-spacing:-0.04em; }
        .receipt-total-lock { font-size:0.6rem; color:rgba(255,255,255,0.5); font-weight:700; }

        .savings-badge { border:1.5px solid #6ee7b7; background:linear-gradient(135deg,#f0fdf9,#ecfdf5); border-radius:var(--radius-sm); margin-top:12px; display:flex; align-items:stretch; overflow:hidden; }
        .savings-sticker { background:linear-gradient(160deg,#059669,#047857); color:#fff; font-size:0.58rem; font-weight:900; padding:12px 13px; text-transform:uppercase; text-align:center; line-height:1.4; display:flex; align-items:center; justify-content:center; flex-shrink:0; letter-spacing:0.8px; }
        .savings-main { flex:1; padding:10px 14px; display:flex; flex-direction:column; justify-content:center; gap:2px; }
        .savings-num { font-size:1.4rem; font-weight:900; color:#059669; font-family:var(--font-dm-mono),monospace; line-height:1; letter-spacing:-0.03em; }
        .savings-desc { font-size:0.59rem; color:#6b7280; margin-top:1px; }
        .savings-vdiv { width:1px; background:#a7f3d0; flex-shrink:0; margin:10px 0; }
        .savings-contrast { padding:10px 14px; display:flex; flex-direction:column; justify-content:center; gap:3px; flex-shrink:0; }
        .savings-contrast-num { font-size:0.9rem; font-weight:900; color:#dc2626; font-family:var(--font-dm-mono),monospace; line-height:1; }
        .savings-contrast-lbl { font-size:0.52rem; color:#9ca3af; line-height:1.35; max-width:90px; }

        .co-form { background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius); padding:20px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:9px; }
        .co-input { width:100%; background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius-sm); padding:10px 12px; font-size:0.85rem; color:var(--text-primary); outline:none; transition:border-color .2s,box-shadow .2s; font-family:var(--font-dm-sans),sans-serif; -webkit-appearance:none; }
        .co-input::placeholder { color:#b0bab6; }
        .co-input:focus { border-color:var(--green-light); box-shadow:0 0 0 3px rgba(16,185,129,.12); }
        .form-2 { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
        .form-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; }
        .form-auto { position:relative; }

        .autocomplete-suggestions-box { position:absolute; top:calc(100% + 2px); left:0; right:0; background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius-sm); box-shadow:0 8px 24px rgba(0,0,0,.08); z-index:100; max-height:200px; overflow-y:auto; }
        .autocomplete-suggestion-item { padding:9px 12px; font-size:0.79rem; color:var(--text-primary); cursor:pointer; border-bottom:1px solid #f4f4f5; display:flex; align-items:center; gap:6px; }
        .autocomplete-suggestion-item:last-child { border-bottom:none; }
        .autocomplete-suggestion-item:hover { background:var(--green-pale); }
        .autocomplete-pin-icon { color:var(--green-light); flex-shrink:0; }



        .cta-wrap { display:flex; flex-direction:column; gap:8px; margin-top:6px; }
        .cta-btn { background:linear-gradient(135deg,#059669 0%,#047857 100%); color:#fff; width:100%; padding:17px 20px; border:none; border-radius:var(--radius-sm); cursor:pointer; font-size:0.97rem; font-weight:900; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 6px 20px rgba(5,150,105,.38); transition:all .2s; font-family:var(--font-dm-sans),sans-serif; letter-spacing:.3px; }
        .cta-btn:hover { background:linear-gradient(135deg,#047857 0%,#065f46 100%); transform:translateY(-2px); box-shadow:0 8px 26px rgba(5,150,105,.48); }
        .cta-btn:active { transform:translateY(0); box-shadow:0 4px 14px rgba(5,150,105,.3); }
        .cta-sub { font-size:0.61rem; color:var(--text-muted); text-align:center; margin:0; }

        .term-overlay { position:fixed; inset:0; background:rgba(0,0,0,.75); backdrop-filter:blur(4px); z-index:9999; display:flex; align-items:center; justify-content:center; padding:24px; }
        .term-box { background:#0a1a10; border-radius:var(--radius); padding:28px; color:var(--green-light); font-family:var(--font-dm-mono),monospace; width:100%; max-width:640px; border:1px solid rgba(16,185,129,.2); box-shadow:0 20px 60px rgba(0,0,0,.6); }
        .term-hdr { display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(16,185,129,.12); padding-bottom:14px; margin-bottom:20px; }
        .term-dots { display:flex; gap:6px; }
        .term-dot { width:11px; height:11px; border-radius:50%; }
        .term-dot.r { background:#ff5f56; } .term-dot.y { background:#ffbd2e; } .term-dot.g { background:#27c93f; }
        .term-logs { display:flex; flex-direction:column; gap:12px; min-height:240px; overflow-y:auto; max-height:290px; }
        .term-row { font-size:0.82rem; line-height:1.5; display:flex; align-items:center; gap:10px; animation:termIn .4s ease-out; }
        @keyframes termIn { from { opacity:0; transform:translateY(3px); } to { opacity:1; transform:translateY(0); } }
        @keyframes co-spin { to { transform:rotate(360deg); } }

        .success-outer { max-width:700px; margin:44px auto; padding:0 16px; }
        .success-card { padding:44px 32px; text-align:center; border:2px solid var(--green-light); border-radius:20px; background:var(--white); box-shadow:0 20px 50px -10px rgba(16,185,129,.14); }
        .success-tick { width:76px; height:76px; border-radius:50%; background:rgba(16,185,129,.08); border:1.5px solid rgba(16,185,129,.2); display:flex; align-items:center; justify-content:center; margin:0 auto 18px; }
        .success-dl-btn { background:linear-gradient(135deg,#10b981,#059669); color:#fff; width:100%; padding:14px; border:none; border-radius:var(--radius-sm); cursor:pointer; font-size:0.92rem; font-weight:800; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 14px rgba(16,185,129,.25); font-family:var(--font-dm-sans),sans-serif; }
        .success-meta { background:#fafdfc; border:1px solid #e4e4e7; border-radius:var(--radius); padding:22px; margin-top:40px; display:grid; grid-template-columns:repeat(auto-fit,minmax(160px,1fr)); gap:18px; text-align:left; }
        .success-meta-lbl { font-size:0.68rem; color:var(--text-secondary); text-transform:uppercase; display:block; margin-bottom:3px; font-weight:700; letter-spacing:.5px; }
        .success-meta-val { font-size:0.83rem; font-weight:800; color:var(--text-primary); font-family:monospace; }

        .sticky-bar { position:fixed; bottom:0; left:0; right:0; background:rgba(255,255,255,.97); backdrop-filter:blur(10px); border-top:1px solid var(--border); padding:12px 24px; display:flex; justify-content:space-between; align-items:center; z-index:1000; box-shadow:0 -4px 20px rgba(0,0,0,.06); }
        .sticky-bar-btn { background:var(--green); color:#fff; border:none; border-radius:6px; padding:11px 28px; font-size:0.9rem; font-weight:800; cursor:pointer; font-family:var(--font-dm-sans),sans-serif; box-shadow:0 4px 12px rgba(26,122,74,.3); }

        @media (max-width:860px) {
          .co-grid { grid-template-columns:1fr; gap:20px; }
          .co-right { order:-1; }
          .testi-list { display:none; }
          .sticky-bar { flex-direction:column; gap:8px; text-align:center; }
          /* Fear block — tablet: tighten up */
          .fear-left { padding:18px 20px; min-width:110px; }
          .fear-num { font-size:2.8rem; }
          .fear-right { padding:14px 18px; }
        }
        @media (max-width:640px) {
          .fear-block { margin-bottom:16px; }
          .fear-row { flex-direction:column; }
          .fear-left { border-right:none; border-bottom:1px solid rgba(255,255,255,.18); padding:20px 20px 16px; min-width:0; align-items:center; text-align:center; }
          .fear-warn-icon { font-size:1.3rem; margin-bottom:4px; }
          .fear-num { font-size:3.6rem; }
          .fear-lbl { font-size:0.72rem; letter-spacing:1.6px; margin-top:6px; color:rgba(255,255,255,.75); }
          .fear-right { padding:18px 20px 20px; gap:12px; }
          .fear-subhead { font-size:1rem; }
          .fear-text { display:none; }
          .fear-stats { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
          .fear-div { display:none; }
          .fear-stat { background:rgba(0,0,0,.15); border:1px solid rgba(255,255,255,.1); border-radius:8px; padding:14px 16px; gap:6px; }
          .fear-stat-num { font-size:1.3rem; }
          .fear-stat-lbl { font-size:0.72rem; color:rgba(255,255,255,.6); line-height:1.35; }
          .fear-hide-mobile { display:none; }
          .fear-source { display:none; }
        }
        @media (max-width:480px) {
          .co-main { padding:14px 12px 80px; }
          .form-3 { grid-template-columns:1fr 1fr; }
          .fear-num { font-size:4rem; }
          .fear-lbl { font-size:0.9rem; letter-spacing:1.4px; }
          .fear-warn-icon { font-size:1.5rem; }
          .fear-right { padding:18px 16px 20px; gap:12px; }
          .fear-subhead { font-size:1.5rem; line-height:1.3; }
          .fear-stats { gap:10px; }
          .fear-stat { padding:14px 16px; }
          .fear-stat-num { font-size:1.5rem; }
          .fear-stat-lbl { font-size:1rem; }
        }

        /* ── REVIEWS ── */
        .rev-section { margin-top:64px; border-top:1px solid var(--border); padding-top:52px; }
        .rev-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); background:#0d1f14; border-radius:var(--radius); margin-bottom:44px; overflow:hidden; }
        .rev-stat { text-align:center; padding:22px 16px; border-right:1px solid rgba(255,255,255,.07); }
        .rev-stat:last-child { border-right:none; }
        .rev-stat-num { font-size:1.65rem; font-weight:900; color:#10b981; letter-spacing:-0.04em; line-height:1; font-family:var(--font-dm-mono),monospace; }
        .rev-stat-lbl { font-size:0.59rem; font-weight:600; color:rgba(255,255,255,.36); margin-top:5px; text-transform:uppercase; letter-spacing:.6px; }
        .rev-heading { text-align:center; margin-bottom:36px; }
        .rev-tag { display:inline-flex; align-items:center; gap:4px; background:var(--green-pale); border:1px solid #a7f3d0; color:#065f46; font-size:0.64rem; font-weight:800; padding:3px 10px; border-radius:99px; margin-bottom:11px; text-transform:uppercase; letter-spacing:.5px; }
        .rev-heading h2 { font-size:clamp(1.4rem,3vw,1.85rem); font-weight:800; letter-spacing:-0.035em; line-height:1.2; margin:0 0 8px; color:var(--text-primary); }
        .rev-heading p { font-size:0.88rem; color:var(--text-secondary); margin:0; }
        .rev-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .rev-card { background:var(--white); border:1.5px solid var(--border); border-radius:var(--radius); padding:18px 20px; box-shadow:var(--shadow-sm); display:flex; flex-direction:column; gap:11px; }
        .rev-result { background:linear-gradient(90deg,#f0faf5,#fff); border:1px solid #a7f3d0; border-left:3px solid var(--green-light); border-radius:6px; padding:8px 11px; font-size:0.79rem; font-weight:800; color:var(--text-primary); line-height:1.35; }
        .rev-stars { color:#f59e0b; font-size:0.82rem; letter-spacing:1px; }
        .rev-text { font-size:0.77rem; color:var(--text-secondary); line-height:1.62; margin:0; flex:1; }
        .rev-footer { display:flex; align-items:center; gap:9px; padding-top:9px; border-top:1px solid #f0f4f2; margin-top:auto; }
        .rev-avatar { width:32px; height:32px; border-radius:50%; color:#fff; font-size:0.62rem; font-weight:900; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .rev-author { display:flex; flex-direction:column; gap:2px; flex:1; min-width:0; }
        .rev-name { font-size:0.74rem; font-weight:700; color:var(--text-primary); }
        .rev-loc { font-size:0.65rem; color:var(--text-muted); }
        .rev-badge { display:inline-block; font-size:0.54rem; font-weight:700; background:var(--green-pale); border:1px solid #a7f3d0; color:#065f46; padding:1px 6px; border-radius:99px; }
        .rev-cta-bar { margin-top:40px; background:linear-gradient(135deg,#0d1f14 0%,#1a4a2e 100%); border-radius:var(--radius); padding:32px 36px; display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap; }
        .rev-cta-left h3 { font-size:1.35rem; font-weight:800; color:#fff; margin:0 0 6px; letter-spacing:-0.03em; line-height:1.25; }
        .rev-cta-left p { color:rgba(255,255,255,.5); font-size:0.83rem; margin:0; line-height:1.5; }
        .rev-cta-btn { background:#10b981; color:#fff; border:none; border-radius:var(--radius-sm); padding:14px 28px; font-size:0.9rem; font-weight:800; cursor:pointer; font-family:var(--font-dm-sans),sans-serif; box-shadow:0 4px 14px rgba(16,185,129,.4); white-space:nowrap; flex-shrink:0; }
        @media (max-width:860px) { .rev-grid { grid-template-columns:repeat(2,1fr); } .rev-stats-bar { grid-template-columns:repeat(2,1fr); } .rev-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.07); } .rev-stat:nth-child(odd) { border-right:1px solid rgba(255,255,255,.07); } .rev-cta-bar { flex-direction:column; text-align:center; } }
        @media (max-width:480px) { .rev-grid { grid-template-columns:1fr; } }
      `}</style>

      <div className="ann-bar">
        ⚡ 574 buyers are checking properties right now — Complete your report and lock in our 30-day money-back guarantee
      </div>

      <header className="co-header">
        <Link href="/" className="co-logo-link">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="SafeTrace" className="co-logo-img" />
        </Link>
        <div className="co-header-right">
          <span className="co-secure-badge">
            <ShieldCheck size={13} strokeWidth={2.5} style={{ color: 'var(--green-light)' }} />
            Secure Checkout
          </span>
          <div className="co-timer">
            <Clock size={13} strokeWidth={2.5} />
            <span suppressHydrationWarning>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      <main className="co-main">
        {checkoutState !== 'success' && (
          <>
          {/* ── FEAR STAT — full width above grid ── */}
          <div className="fear-block">
            <div className="fear-row">
              <div className="fear-left">
                <div className="fear-warn-icon">⚠</div>
                <div className="fear-num">633×</div>
                <div className="fear-lbl">MORE EXPENSIVE<br/>IF YOU&apos;RE WRONG</div>
              </div>
              <div className="fear-right">
                <p className="fear-subhead">You&apos;re signing a mortgage. You haven&apos;t checked if the property is contaminated.</p>
                <p className="fear-text">
                  Standard inspections <strong>cannot detect</strong> Superfund contamination, toxic groundwater, or soil hazards — and sellers aren&apos;t required to disclose what they don&apos;t test. Once the deed transfers, it&apos;s your liability. Your bill. Your problem. Forever.
                </p>
                <div className="fear-stats">
                  <div className="fear-stat">
                    <span className="fear-stat-num fear-stat-num-cta">$49</span>
                    <span className="fear-stat-lbl">cost of this report</span>
                  </div>
                  <div className="fear-div" />
                  <div className="fear-stat">
                    <span className="fear-stat-num-alert">CRITICAL RISK</span>
                    <span className="fear-stat-lbl">94% hidden hazard rate</span>
                  </div>
                </div>
                <div className="fear-source">Source: 2024 US EPA Environmental Justice Mapping Data</div>
              </div>
            </div>
          </div>

          <div className="co-grid">

            {/* ── LEFT COLUMN ── */}
            <div className="co-left">

              {/* Product card */}
              <div className="prod-card">
                <div className="prod-card-hdr">
                  <div className="prod-card-brand">SAFETRACE™</div>
                  <div className="prod-card-title">Environmental Risk Report</div>
                  {addressLine1 && <div className="prod-card-addr">📍 {addressLine1}</div>}
                </div>

                {/* What's included */}
                <div className="prod-body">
                  <div className="prod-sub-lbl">WHAT&apos;S INCLUDED</div>
                  <ul className="prod-list">
                    {[
                      'EPA ECHO & EJScreen contamination scan',
                      'FEMA flood zone & disaster history',
                      'Superfund & Brownfield proximity (2-mile radius)',
                      'CDC radon zone & air quality index',
                      'Property price negotiation script (PDF)',
                    ].map((item, i) => (
                      <li key={i}><Check size={13} className="prod-check" />{item}</li>
                    ))}
                  </ul>

                  <div className="prod-guarantee">
                    <div className="prod-guar-seal">30</div>
                    <div>
                      <div className="prod-guar-title">30-Day Money-Back Guarantee</div>
                      <div className="prod-guar-text">No questions asked. If we don&apos;t surface a risk, you get a full refund.</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials from REVIEWS */}
              <div className="testi-list">
                {REVIEWS.slice(0, 3).map((r, i) => (
                  <div key={i} className="testi-item">
                    <div className="testi-result">{r.result}</div>
                    <div className="testi-stars">{'★'.repeat(r.stars)}</div>
                    <p className="testi-text">{r.text}</p>
                    <div className="testi-footer">
                      <div className="testi-avatar" style={{ background: r.color }}>{r.initials}</div>
                      <div>
                        <div className="testi-name">{r.name} · {r.loc}</div>
                        <div className="testi-badge">✓ {r.badge}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data sources */}
              <div className="data-src">
                <div className="data-src-lbl">Data sourced from</div>
                <div className="data-src-list">
                  {['EPA ECHO', 'FEMA', 'CDC', 'USGS', 'EJScreen', 'NPL Registry'].map(s => (
                    <span key={s} className="data-src-chip">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="co-right">

            {/* Package selector */}
            <div className="co-card" style={{ border: '2px solid var(--green-light)', background: '#fff' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Secure Step 1 of 2</div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Select Your Coverage</h2>

              <div className="pkg-tabs">
                <button type="button" className={`pkg-tab ${purchaseType === 'save' ? 'active' : ''}`} onClick={() => handleTabChange('save')}>⚡ Save 42% (5 Reports)</button>
                <button type="button" className={`pkg-tab ${purchaseType === 'onetime' ? 'active' : ''}`} onClick={() => handleTabChange('onetime')}>Single Report</button>
              </div>

              <div className={`pkg-card ${selectedPackage === 'single' ? 'active' : ''}`} onClick={() => setSelectedPackage('single')}>
                <div className="pkg-icon"><Activity size={18} /></div>
                <div className="pkg-name">Single Property Report</div>
                <div className="pkg-price">
                  <div className="pkg-price-reg">$69</div>
                  <div className="pkg-price-now">$49</div>
                  <div className="pkg-price-save">SAVE $20</div>
                </div>
              </div>

              <div className={`pkg-card popular ${selectedPackage === 'bundle' ? 'active' : ''}`} onClick={() => setSelectedPackage('bundle')}>
                <div className="pkg-pop-tag">BEST VALUE</div>
                <div className="pkg-icon" style={{ background: 'var(--green-pale)' }}><Zap size={18} /></div>
                <div className="pkg-name">
                  <div>5-Property Bundle</div>
                  <div className="pkg-desc">Compare up to 5 properties</div>
                </div>
                <div className="pkg-price">
                  <div className="pkg-price-reg">$345</div>
                  <div className="pkg-price-now">$199</div>
                  <div className="pkg-price-save">SAVE $146</div>
                </div>
              </div>

              <div style={{ height: '32px' }} />
              <div style={{ fontSize: '0.65rem', fontWeight: 900, color: 'var(--green-light)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>Your Grand Slam Offer</div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Value Stack</h2>
              
              <div className="receipt" style={{ borderTop: 'none', marginTop: 0 }}>
                {VALUE_ITEMS.map((item, i) => (
                    <div key={i} className="receipt-row">
                      <span>{item.name}</span>
                      {item.isFree ? <span className="receipt-free">FREE</span> : <span className="receipt-val">{item.val}</span>}
                    </div>
                  ))}
                  <div className="receipt-sep" />
                  <div className="receipt-row" style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 800 }}>
                    <span>Total Perceived Value</span>
                    <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>${totalValue}</span>
                  </div>
                  
                  <div className="receipt-bonus">
                    <div className="receipt-bonus-lbl">Fast-Action Bonus Included</div>
                    <span className="receipt-free">SAVE $99</span>
                  </div>

                  <div className="receipt-total">
                    <div className="receipt-total-left">
                      <div className="receipt-total-label">Grand Total</div>
                      <div className="receipt-total-sub">Instant Access · No hidden fees</div>
                    </div>
                    <div className="receipt-total-right">
                      <div className="receipt-total-price">${finalPrice.toFixed(2)}</div>
                      <div className="receipt-total-lock">Risk-Free Guarantee</div>
                    </div>
                  </div>
                </div>

                <div className="savings-badge">
                  <div className="savings-sticker">OFFER<br/>SAVES</div>
                  <div className="savings-main">
                    <div className="savings-num">${totalValue - finalPrice}</div>
                    <div className="savings-desc">Against independent lab testing fees</div>
                  </div>
                  <div className="savings-vdiv" />
                  <div className="savings-contrast">
                    <div className="savings-contrast-lbl">avg remediation<br/>without this report</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form id="checkout-form" onSubmit={handleFormSubmit} className="co-form">
                <div className="form-2">
                  <input type="text" placeholder="First Name" id="ship-firstname" required className="co-input" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  <input type="text" placeholder="Last Name" required className="co-input" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <input type="email" placeholder="Email Address" required className="co-input" value={email} onChange={e => setEmail(e.target.value)} onBlur={handleLeadEmailBlur} />
                <input type="tel" placeholder="Phone (optional)" className="co-input" value={phone} onChange={e => setPhone(e.target.value)} />

                <div className="form-auto">
                  <input type="text" placeholder="Property Address (e.g. 123 Beacon St)" id="ship-address1" autoComplete="off" required className="co-input" value={addressLine1} onChange={e => setAddressLine1(e.target.value)} />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="autocomplete-suggestions-box">
                      {suggestions.map((p, i) => (
                        <div key={i} className="autocomplete-suggestion-item" onClick={() => handleSuggestionClick(p)}>
                          <span className="autocomplete-pin-icon">📍</span>
                          <span>{p.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input type="text" placeholder="Unit / Apt (optional)" className="co-input" value={addressLine2} onChange={e => setAddressLine2(e.target.value)} />
                <input type="text" placeholder="City" required className="co-input" value={city} onChange={e => setCity(e.target.value)} />
                <div className="form-2">
                  <select className="co-input" value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                  </select>
                  <input type="text" placeholder="State / Province" required className="co-input" value={shippingState} onChange={e => setShippingState(e.target.value)} />
                </div>
                <input type="text" placeholder="ZIP Code" required className="co-input" value={zipCode} onChange={e => setZipCode(e.target.value)} />

                <div className="cta-wrap">
                  <button type="submit" className="cta-btn">
                    <Lock size={16} strokeWidth={2.5} />
                    Get My Environmental Report — ${finalPrice.toFixed(2)}
                  </button>
                  <p className="cta-sub">🔒 256-bit encrypted · 30-day guarantee · Instant delivery</p>
                </div>
              </form>
            </div>
          </div>
          </>
        )}

        {/* ── REVIEWS SECTION ── */}
        {checkoutState === 'idle' && (
          <div className="rev-section">

            {/* Stats bar */}
            <div className="rev-stats-bar">
              {[
                { num: '48,291', lbl: 'Reports Delivered' },
                { num: '$2.1M+', lbl: 'Negotiated by Buyers' },
                { num: '4.9 / 5', lbl: 'Average Rating' },
                { num: '94%', lbl: 'Found Hidden Risks' },
              ].map((s, i) => (
                <div key={i} className="rev-stat">
                  <div className="rev-stat-num">{s.num}</div>
                  <div className="rev-stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Heading */}
            <div className="rev-heading">
              <div className="rev-tag">✓ THE WALL OF PROOF</div>
              <h2 style={{ fontSize: '2.5rem' }}>Real People. <span style={{ color: '#ef4444' }}>Massive Wins.</span></h2>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Every testimonial below represents a buyer who refused to be blindfolded by a standard inspection.</p>
            </div>

            {/* Review grid */}
            <div className="rev-grid">
              {REVIEWS.map((r, i) => (
                <div key={i} className="rev-card">
                  <div className="rev-result">{r.result}</div>
                  <div className="rev-stars">{'★'.repeat(r.stars)}</div>
                  <p className="rev-text">{r.text}</p>
                  <div className="rev-footer">
                    <div className="rev-avatar" style={{ background: r.color }}>{r.initials}</div>
                    <div className="rev-author">
                      <span className="rev-name">{r.name}</span>
                      <span className="rev-loc">{r.loc}</span>
                      <span className="rev-badge">✓ {r.badge}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA dark strip */}
            <div className="rev-cta-bar">
              <div className="rev-cta-left">
                <h3>Don&apos;t close without knowing.</h3>
                <p>Join 48,291 buyers who checked before signing. <strong style={{ color: '#10b981' }}>$49 · 30-day money-back guarantee.</strong></p>
              </div>
              <button type="button" className="rev-cta-btn" onClick={scrollToForm}>
                Get My Property Report →
              </button>
            </div>

          </div>
        )}

        {/* Sticky bottom bar */}
        {checkoutState === 'idle' && (
          <div className="sticky-bar">
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 900, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px' }}>Limited-Time Offer</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Know what&apos;s hiding near your property — ${finalPrice.toFixed(2)} today, 30-day guarantee</div>
            </div>
            <button type="button" className="sticky-bar-btn" onClick={scrollToForm}>Get My Report →</button>
          </div>
        )}

        {/* Processing terminal overlay */}
        {checkoutState === 'processing' && (
          <div className="term-overlay">
            <div className="term-box">
              <div className="term-hdr">
                <div className="term-dots">
                  <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
                </div>
                <span style={{ fontSize: '0.68rem', color: '#10b981', opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>Front Door Scan Database Compiler v4.5</span>
              </div>
              <div className="term-logs">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="term-row">
                    {i < terminalLogs.length - 1 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12" /></svg>
                    ) : (
                      <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid #10b981', borderTopColor: 'transparent', borderRadius: '50%', flexShrink: 0, animation: 'co-spin .8s linear infinite' }} />
                    )}
                    <span>{log}</span>
                  </div>
                ))}
                <div ref={terminalLogsEndRef} />
              </div>
              <div style={{ borderTop: '1px solid rgba(16,185,129,.1)', paddingTop: 16, marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.76rem', opacity: 0.6 }}>
                <span>Scanning for: <strong style={{ color: '#fff' }}>{firstName} {lastName}</strong></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff5f56', display: 'block' }} />
                  SECURED MULTI-SERVER QUERY
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Success screen */}
        {checkoutState === 'success' && (
          <div className="success-outer" id="success-screen">
            <div className="success-card">
              <div className="success-tick">
                <Check size={40} strokeWidth={3} style={{ color: '#10b981' }} />
              </div>
              <span style={{ textTransform: 'uppercase', color: '#10b981', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '1.5px' }}>Property Scan Complete &amp; Verified</span>
              <h1 style={{ fontSize: '2.1rem', fontWeight: 800, margin: '10px 0 14px', letterSpacing: '-0.03em', lineHeight: 1.2 }}>Your Environmental Report is Ready</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '560px', margin: '0 auto 32px' }}>
                Payment of <strong style={{ color: 'var(--text-primary)' }}>${finalPrice.toFixed(2)}</strong> confirmed. Your PDF report and negotiation letters have been sent to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380, margin: '0 auto' }}>
                <button type="button" className="success-dl-btn" onClick={() => alert('Simulation: Fetching your report PDF…')}>
                  <Sparkles size={17} strokeWidth={2.5} />
                  Download Complete PDF Report
                </button>
                <Link href="/dashboard" style={{ width: '100%', padding: '13px', fontSize: '0.9rem', background: '#fff', color: 'var(--text-secondary)', border: '1px solid #e4e4e7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, borderRadius: '6px' }}>
                  Return to Dashboard
                </Link>
              </div>
              <div className="success-meta">
                <div>
                  <span className="success-meta-lbl">Transaction Reference</span>
                  <span className="success-meta-val">FDF-2026-9842A</span>
                </div>
                <div>
                  <span className="success-meta-lbl">Delivery Destination</span>
                  <span className="success-meta-val" style={{ fontFamily: 'inherit', fontSize: '0.83rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>{email}</span>
                </div>
                <div>
                  <span className="success-meta-lbl">Scope</span>
                  <span className="success-meta-val" style={{ fontFamily: 'inherit' }}>{priceInfo.metaLabel}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function GetStarted() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52695c', background: '#f9fdfb' }}>Loading…</div>}>
      <GetStartedContent />
    </Suspense>
  );
}
