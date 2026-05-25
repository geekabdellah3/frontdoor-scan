'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2, 
  Database, 
  Lock, 
  Tag, 
  FileText, 
  ArrowRight, 
  Droplets, 
  Wind, 
  Mountain, 
  Factory, 
  Activity, 
  Zap, 
  Download, 
  Sparkles, 
  Mail, 
  ShieldAlert, 
  Scale, 
  Star, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState, useEffect } from 'react';

function GetStartedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const address = searchParams.get('address') || '';
  const encodedAddress = encodeURIComponent(address);

  // Form & Package States
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'bundle'>('single');
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setPromoDiscountAmount] = useState(0);

  // Email Validation State
  const [isValidEmail, setIsValidEmail] = useState(false);
  
  // Checkout Processing States
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorErrorMsg] = useState('');

  // Validate Email
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  // Simulate High-Tech Report Generation & Payment Processing
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorErrorMsg('Please enter an email address to receive your report.');
      document.getElementById('email-input')?.focus();
      return;
    }
    if (!isValidEmail) {
      setErrorErrorMsg('Please enter a valid email address.');
      document.getElementById('email-input')?.focus();
      return;
    }

    setErrorErrorMsg('');
    setCheckoutState('processing');
    setLoadingStep(0);

    // Dynamic processing terminal steps for the "wow" SaaS visual effect
    const steps = [
      'Establishing secure 256-bit bank encrypted connection…', // 0
      'Authorizing gateway token keys…', // 1
      'Querying EPA groundwater & chemical aquifer databases…', // 2
      'Running USGS soil Radon Gas potential mapping algorithms…', // 3
      'Synthesizing FEMA flood maps & industrial facility radii…', // 4
      'Compiling 15-page comprehensive PDF diagnostic report…', // 5
      'Completing transaction and emailing report files…' // 6
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setLoadingStep(currentStep);
      } else {
        clearInterval(interval);
        setCheckoutState('success');
      }
    }, 1200);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscountAmount(10);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try WELCOME10');
      setPromoApplied(false);
      setPromoDiscountAmount(0);
    }
  };

  // Location details parser
  const parts = address.split(',').map(p => p.trim());
  let streetName = parts[0] || 'your property';
  let cityIndex = 1;

  // Gracefully handle street numbers split by comma from the street name (e.g. "22, rue 2 Oasis")
  if (parts.length > 1 && (/^\d+$/.test(parts[0]) || /^\d+[a-zA-Z]?$/.test(parts[0]) || parts[0].length <= 5)) {
    streetName = `${parts[0]} ${parts[1]}`;
    cityIndex = 2;
  }

  const city = parts[cityIndex] || '';
  let state = '';
  for (let i = cityIndex + 1; i < parts.length; i++) {
    const part = parts[i];
    if (part.length === 2 && /^[A-Z]{2}$/i.test(part)) {
      state = part.toUpperCase();
      break;
    }
  }
  if (!state && parts.length >= cityIndex + 3) {
    state = parts[cityIndex + 2];
  }
  const cityStateDisplay = city ? (state ? `${city}, ${state}` : city) : 'this local sector';

  // Prices
  const basePrice = selectedPackage === 'single' ? 49 : 199;
  const finalPrice = Math.max(0, basePrice - discountAmount);

  return (
    <div className="min-h-screen" style={{ background: '#f8fafc', paddingBottom: '100px', color: '#0f172a' }}>
      
      {/* Premium Embedded Stylesheet for Design Optimization */}
      <style>{`
        /* Accessibility and Focus states */
        button:focus-visible, a:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-delay: -1ms !important;
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            background-attachment: initial !important;
            scroll-behavior: auto !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        }
        /* Animations & Keyframes */
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes pulseScale {
          0% { transform: scale(1); }
          50% { transform: scale(1.018); }
          100% { transform: scale(1); }
        }
        @keyframes progressArc {
          from { stroke-dashoffset: 226; }
          to { stroke-dashoffset: 54; }
        }
        @keyframes blinkCursor {
          from, to { border-color: transparent }
          50% { border-color: #ef4444; }
        }
        @keyframes slideInUp {
          from { transform: translateY(15px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Responsive Layout Grid */
        .page-header {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.01);
        }
        .shopify-checkout-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 0;
          width: 100%;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 24px;
          overflow: hidden;
          margin-top: 32px;
          box-shadow: 0 10px 40px -10px rgba(15, 23, 42, 0.04);
        }
        .left-checkout-pane {
          background: #ffffff;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .right-checkout-pane {
          background: #f8fafc;
          border-left: 1px solid #cbd5e1;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .checkout-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          color: #94a3b8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .breadcrumb-active {
          color: #0f172a;
          font-weight: 800;
        }
        .page-title {
          font-size: 2.3rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.025em;
          line-height: 1.25;
          margin: 0;
        }
        .main-checkout-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 40px;
          align-items: start;
          width: 100%;
          margin-top: 32px;
        }

        /* Left Side Cards */
        .hud-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.03);
          margin-bottom: 28px;
        }
        .hud-split {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 24px;
        }
        .gauge-block {
          background: radial-gradient(120% 120% at 50% 50%, #ffffff 0%, #fbfcfe 100%);
          border-radius: 24px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          box-shadow: inset 0 0 12px rgba(148, 163, 184, 0.04), 0 4px 20px rgba(15, 23, 42, 0.01);
          overflow: hidden;
        }
        .gauge-svg {
          transform: rotate(-90deg);
        }
        @keyframes radarSweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes centralGlow {
          0% { box-shadow: 0 4px 12px rgba(239, 68, 68, 0.08); }
          100% { box-shadow: 0 8px 24px rgba(239, 68, 68, 0.22); }
        }
        @keyframes pulseBeacon {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.1); opacity: 1; }
        }

        /* Hazard Warning Console */
        .hazard-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.02);
          margin-bottom: 32px;
        }
        .hazard-row {
          background: #fff8f8;
          border: 1px solid rgba(239, 68, 68, 0.08);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hazard-row:hover {
          transform: translateX(4px);
          border-color: #fca5a5;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.04);
        }
        .neg-blueprint {
          background: linear-gradient(135deg, #fffbeb 0%, #faf5e6 100%);
          border: 1.5px dashed #f59e0b;
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 10px 25px -10px rgba(245, 158, 11, 0.05);
        }

        /* Testimonials & Reviews Grid */
        .review-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.015);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }
        .review-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04);
          border-color: #cbd5e1;
        }
        .review-avatar-container {
          position: relative;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
        }
        .review-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .verified-badge {
          position: absolute;
          bottom: -2px;
          right: -2px;
          background: #10b981;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid #ffffff;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        /* Sticky Right Column Panels */
        .sticky-checkout {
          position: sticky;
          top: 104px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .checkout-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 20px 50px -15px rgba(15, 23, 42, 0.08);
        }
        .package-tab {
          border: 1.5px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          cursor: pointer;
          transition: border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          background: #ffffff;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 8px;
          width: 100%;
          text-align: left;
          font-family: inherit;
        }
        .package-tab:focus-visible {
          outline: 2px solid #10b981;
          outline-offset: 2px;
        }
        .package-tab.active {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.02);
          box-shadow: 0 8px 25px -5px rgba(16, 185, 129, 0.08);
        }
        .package-tab:hover:not(.active) {
          border-color: #94a3b8;
          background: #f8fafc;
        }
        .pulse-button {
          animation: pulseScale 3s infinite ease-in-out;
        }
        .pulse-button:hover {
          animation: none;
        }

        /* Terminal Logging Screen */
        .terminal-block {
          background: #0f172a;
          border-radius: 24px;
          padding: 36px;
          color: #38bdf8;
          font-family: var(--font-mono);
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.25);
          width: 100%;
          max-width: 650px;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .terminal-log-line {
          font-size: 0.9rem;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          animation: slideInUp 0.3s ease-out;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .shopify-checkout-container {
            grid-template-columns: 1fr;
            border-radius: 16px;
          }
          .left-checkout-pane {
            padding: 30px 20px;
            gap: 28px;
          }
          .right-checkout-pane {
            position: static;
            height: auto;
            border-left: none;
            border-top: 1px solid #cbd5e1;
            padding: 30px 20px;
          }
        }
        @media (max-width: 640px) {
          .hud-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Premium Navigation Header */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          top: '-100px',
          left: '20px',
          background: '#10b981',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          zIndex: 9999,
          transition: 'top 0.2s',
          fontSize: '0.9rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}
        onFocus={(e) => { e.currentTarget.style.top = '20px'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
      >
        Skip to content
      </a>
      <header className="page-header">
        <div className="container" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="flex items-center" style={{ gap: '10px', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '6px', borderRadius: '10px', display: 'flex' }}>
              <ShieldCheck aria-hidden="true" color="#10b981" size={26} strokeWidth={2.5} />
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              Front Door <span style={{ color: '#10b981' }}>Fax</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Lock aria-hidden="true" size={14} color="#10b981" /> Secure checkout
            </span>
            <Link href="/" style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Back</Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="container" style={{ maxWidth: '1200px', padding: '0 24px' }}>

        {!address ? (
          /* Empty Address Fallback */
          <div className="hud-card w-full" style={{ padding: '48px', textAlign: 'center', marginTop: '48px' }}>
            <AlertTriangle aria-hidden="true" size={48} color="#ef4444" style={{ margin: '0 auto 16px auto' }} />
            <h1 style={{ fontSize: '2rem', marginBottom: '16px', fontWeight: 800, textWrap: 'balance' }}>No property address detected</h1>
            <p style={{ color: '#64748b', marginBottom: '32px', textWrap: 'pretty' }}>Please head back to our home search console and choose a verified US address to analyze.</p>
            <Link href="/" className="btn btn-primary">Go to Homepage</Link>
          </div>
        ) : checkoutState === 'processing' ? (
          /* High-Tech Terminal Loading Panel */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px 24px' }}>
            <div className="terminal-block">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444', display: 'block' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308', display: 'block' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', display: 'block' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Secure SaaS compiler v3.0</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minHeight: '260px' }}>
                {[...Array(loadingStep + 1)].map((_, idx) => {
                  const stepText = [
                    'Establishing secure 256-bit bank encrypted connection…',
                    'Authorizing gateway token keys…',
                    'Querying EPA groundwater & chemical aquifer databases…',
                    'Running USGS soil Radon Gas potential mapping algorithms…',
                    'Synthesizing FEMA flood maps & industrial facility radii…',
                    'Compiling 15-page comprehensive PDF diagnostic report…',
                    'Completing transaction and emailing report files…'
                  ][idx];
                  return (
                    <div key={idx} className="terminal-log-line">
                      {idx < loadingStep ? (
                        <CheckCircle2 aria-hidden="true" size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                      ) : (
                        <Loader2 aria-hidden="true" className="animate-spin" size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                      )}
                      <span>{stepText}</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-sans)' }}>
                <span>Compiling for: <strong>{streetName}</strong></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', display: 'block', animation: 'blinkCursor 1s step-end infinite' }} /> Processing Payment
                </span>
              </div>
            </div>
            <p style={{ marginTop: '24px', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Please do not close this window. Your report is being compiled in real-time.</p>
          </div>
        ) : checkoutState === 'success' ? (
          /* Masterfully Designed Success and Report Retrieval Screen */
          <div style={{ maxWidth: '800px', margin: '48px auto 0 auto' }} className="animate-fade-in">
            <div className="hud-card" style={{ padding: '48px 36px', textAlign: 'center', border: '2px solid #10b981', background: '#ffffff', boxShadow: '0 25px 60px -15px rgba(16, 185, 129, 0.12)' }}>
              
              {/* Circular Success Badge */}
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', border: '1.5px solid rgba(16, 185, 129, 0.2)' }}>
                <CheckCircle2 aria-hidden="true" size={44} color="#10b981" strokeWidth={2.5} />
              </div>

              <span style={{ textTransform: 'uppercase', color: '#10b981', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1.5px' }}>Transaction Secured &amp; Emailed</span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '12px 0 16px 0', letterSpacing: '-0.02em', lineHeight: 1.1, textWrap: 'balance' }}>Your Full Environmental Report is Ready!</h1>
              
              <p style={{ color: '#52525b', fontSize: '1.1rem', lineHeight: 1.6, maxWidth: '640px', margin: '0 auto 36px auto', textWrap: 'pretty' }}>
                Thank you for your trust. We have processed a payment of <strong>${finalPrice}</strong>. We compiled the complete, 15-page neighborhood safety diagnostic for <strong>{address}</strong> and sent the secure PDF to <span style={{ color: '#0f172a', fontWeight: 700 }}>{email}</span>.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '420px', margin: '0 auto' }}>
                <button 
                  type="button"
                  onClick={() => alert("Mock Download: Your 15-Page secure PDF download has started!")}
                  className="btn btn-accent pulsing-btn" 
                  style={{ width: '100%', padding: '16px', fontSize: '1.1rem', gap: '10px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Download aria-hidden="true" size={20} />
                  Download PDF Report Instantly
                </button>
                
                <Link href="/dashboard" className="btn btn-outline" style={{ width: '100%', padding: '14px', fontSize: '0.95rem', gap: '8px', background: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  Open Dashboard to View Credits
                </Link>
              </div>

              {/* Transaction details block */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', textAlign: 'left' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Transaction ID</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', fontFamily: 'var(--font-mono)' }}>TXN-90218-AD8B</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Delivery Address</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Package Tier</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                    {selectedPackage === 'single' ? 'Single Property' : '5-Property Bundle'}
                  </span>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Multi-Column Designer-Optimized Experience */
          <div className="animate-fade-in" style={{ marginTop: '36px' }}>
            
            {/* Split Grid */}
            <div className="shopify-checkout-container">
              
              {/* Left Column Pane (Forms, CTA, then Reassurance) */}
              <div className="left-checkout-pane">
                
                {/* Breadcrumbs */}
                <div className="checkout-breadcrumbs" aria-label="Checkout Progress">
                  <span style={{ color: '#64748b' }}>Address</span>
                  <span style={{ color: '#cbd5e1' }} aria-hidden="true">➔</span>
                  <span style={{ color: '#64748b' }}>Package Tier</span>
                  <span style={{ color: '#cbd5e1' }} aria-hidden="true">➔</span>
                  <span className="breadcrumb-active">Payment Verification</span>
                </div>

                {/* Single H1 Page Heading */}
                <h1 className="page-title">
                  Verify Local Safety Records for <span style={{ color: '#10b981' }}>{streetName}</span>
                </h1>

                {/* Dynamic Status Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '-8px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#059669', padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 700 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'block' }} /> Checked 15+ Federal Databases
                  </div>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }} aria-hidden="true">➔</span>
                  <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Diagnostic Complete</span>
                  <span style={{ color: '#cbd5e1', fontSize: '0.9rem' }} aria-hidden="true">➔</span>
                  <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Sparkles aria-hidden="true" size={14} /> Ready to Unlock
                  </span>
                </div>

                {/* Checkout Forms Section */}
                <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  
                  {/* Contact Information Form Field */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Contact Information</h2>
                    <div style={{ position: 'relative' }}>
                      <Mail aria-hidden="true" color="#94a3b8" size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      <input 
                        id="email-input"
                        name="email"
                        type="email" 
                        autoComplete="email"
                        spellCheck={false}
                        placeholder="Email address for report delivery" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                          width: '100%', 
                          background: '#ffffff', 
                          border: '1.5px solid #cbd5e1', 
                          padding: '14px 14px 14px 44px', 
                          color: '#0f172a',
                          borderRadius: '12px',
                          outline: 'none',
                          fontSize: '0.95rem',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#10b981';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        required
                      />
                      {isValidEmail && (
                        <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: '#d1fae5', padding: '2px', borderRadius: '50%', display: 'flex' }}>
                          <CheckCircle2 aria-hidden="true" size={14} color="#10b981" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    {errorMsg && (
                      <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '12px', borderRadius: '8px', color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }} aria-live="polite">
                        {errorMsg}
                      </div>
                    )}
                  </div>

                  {/* Report Package Shipping Tier Selectors */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Shipping &amp; Report Package</h2>
                    <div style={{ border: '1.5px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 4px 12px rgba(15,23,42,0.01)' }}>
                      
                      {/* Tier A: Single Report */}
                      <div 
                        onClick={() => { setSelectedPackage('single'); setPromoError(''); }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px',
                          background: selectedPackage === 'single' ? 'rgba(16, 185, 129, 0.02)' : '#ffffff',
                          borderBottom: '1px solid #e2e8f0',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <input 
                            type="radio" 
                            name="packageTier"
                            checked={selectedPackage === 'single'} 
                            onChange={() => setSelectedPackage('single')} 
                            style={{ accentColor: '#10b981', marginTop: '3px', cursor: 'pointer' }} 
                          />
                          <div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>Single Property Report</div>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                              Comprehensive 15-page diagnostic for <strong>{streetName}</strong>. Emailed instantly.
                            </p>
                          </div>
                        </div>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>$49</span>
                      </div>
                      
                      {/* Tier B: Investor Hunt Bundle */}
                      <div 
                        onClick={() => { setSelectedPackage('bundle'); setPromoError(''); }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '20px',
                          background: selectedPackage === 'bundle' ? 'rgba(16, 185, 129, 0.02)' : '#ffffff',
                          cursor: 'pointer',
                          position: 'relative',
                          transition: 'background-color 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <input 
                            type="radio" 
                            name="packageTier"
                            checked={selectedPackage === 'bundle'} 
                            onChange={() => setSelectedPackage('bundle')} 
                            style={{ accentColor: '#10b981', marginTop: '3px', cursor: 'pointer' }} 
                          />
                          <div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              5-Property Hunt Bundle
                              <span style={{ background: '#10b981', color: '#ffffff', fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>SAVE 20%</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.4 }}>
                              Get this report immediately + 4 credits to analyze other properties as you search. Compare side-by-side.
                            </p>
                          </div>
                        </div>
                        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#10b981', fontVariantNumeric: 'tabular-nums' }}>$199</span>
                      </div>

                    </div>
                  </div>

                  {/* Payment Method / Credit Card Simulation Form */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Payment Method</h2>
                    <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '-8px 0 0 0' }}>
                      All transactions are secure and encrypted. Simulated payment gateway active.
                    </p>
                    
                    <div style={{ border: '1.5px solid #cbd5e1', borderRadius: '12px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 4px 12px rgba(15,23,42,0.01)' }}>
                      {/* Header block with card brands */}
                      <div style={{ background: '#f8fafc', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Credit Card Simulation</span>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontSize: '0.55rem', fontWeight: 800, color: '#1a1f71', fontStyle: 'italic' }}>VISA</div>
                          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontSize: '0.55rem', fontWeight: 800, color: '#eb001b' }}>MC</div>
                          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '2px 6px', fontSize: '0.55rem', fontWeight: 800, color: '#007bc1' }}>AMEX</div>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#ffffff' }}>
                        <div style={{ position: 'relative' }}>
                          <input 
                            placeholder="Card number" 
                            style={{ 
                              width: '100%', 
                              padding: '12px 14px', 
                              border: '1px solid #cbd5e1', 
                              borderRadius: '8px',
                              background: '#f8fafc',
                              color: '#64748b',
                              fontSize: '0.9rem',
                              cursor: 'not-allowed'
                            }} 
                            disabled 
                            value="•••• •••• •••• 4242"
                          />
                          <Lock size={14} color="#94a3b8" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <input 
                            placeholder="Expiration date (MM/YY)" 
                            style={{ 
                              width: '100%', 
                              padding: '12px 14px', 
                              border: '1px solid #cbd5e1', 
                              borderRadius: '8px',
                              background: '#f8fafc',
                              color: '#64748b',
                              fontSize: '0.9rem',
                              cursor: 'not-allowed'
                            }} 
                            disabled 
                            value="12/28"
                          />
                          <input 
                            placeholder="Security code (CVV)" 
                            style={{ 
                              width: '100%', 
                              padding: '12px 14px', 
                              border: '1px solid #cbd5e1', 
                              borderRadius: '8px',
                              background: '#f8fafc',
                              color: '#64748b',
                              fontSize: '0.9rem',
                              cursor: 'not-allowed'
                            }} 
                            disabled 
                            value="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pulsing Emerald CTA Action Button */}
                  <button 
                    type="submit" 
                    className="btn btn-accent pulse-button" 
                    style={{ 
                      width: '100%', 
                      padding: '18px', 
                      fontSize: '1.1rem', 
                      fontWeight: 800, 
                      letterSpacing: '-0.01em', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ffffff',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                  >
                    <FileText aria-hidden="true" size={18} />
                    Complete Secure Verification — ${finalPrice}
                  </button>

                </form>

                {/* Under-Button Shopify Trust Bar */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '32px', marginBottom: '8px' }}>
                  {/* McAfee Secure Shield */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                      <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#ef4444" />
                      <path d="M12 6l-4 4 1.4 1.4 2.6-2.6 4.6 4.6 1.4-1.4z" fill="#ffffff" />
                    </svg>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.5px' }}>MCAFEE&nbsp;SECURE</span>
                  </div>
                  <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }} aria-hidden="true">|</span>
                  {/* 256-Bit SSL Secured Padlock */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Lock aria-hidden="true" size={12} color="#10b981" />
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.5px' }}>256-BIT&nbsp;SSL</span>
                  </div>
                  <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }} aria-hidden="true">|</span>
                  {/* Stripe Seal */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.65rem', fontWeight: 900, color: '#4f46e5', letterSpacing: '0.3px', fontStyle: 'italic' }} aria-hidden="true">stripe</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#4f46e5', letterSpacing: '0.5px' }}>SECURED</span>
                  </div>
                </div>

                {/* Below-the-fold Value Reassurance Section */}
                <div id="reassurance-hud" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  
                  {/* 1. HUD Panel: Map + Tactical LED Match Console */}
                  <div className="hud-card" style={{ border: '1px solid #cbd5e1', background: '#ffffff', boxShadow: '0 10px 40px -10px rgba(15, 23, 42, 0.04)', margin: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ background: '#fef2f2', padding: '6px', borderRadius: '8px', color: '#ef4444', display: 'flex' }}>
                          <Activity aria-hidden="true" size={16} className="animate-pulse" />
                        </div>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#475569', letterSpacing: '1px', textTransform: 'uppercase' }}>
                          Command Center Environmental HUD
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fff8f8', border: '1px solid rgba(239, 68, 68, 0.15)', padding: '4px 10px', borderRadius: '999px' }}>
                        <span style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', display: 'block', animation: 'pulseBeacon 0.8s infinite alternate' }} />
                        <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.5px' }}>LIVE SYNCING</span>
                      </div>
                    </div>

                    <div className="hud-split">
                      {/* Maps Column */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin aria-hidden="true" size={16} color="#ef4444" style={{ flexShrink: 0 }} />
                          <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{streetName}</span>
                        </div>
                        
                        <div style={{ width: '100%', height: '210px', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', position: 'relative', boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)' }}>
                          <iframe 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }}
                            loading="lazy" 
                            allowFullScreen 
                            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
                          ></iframe>
                        </div>

                        {/* Telemetry metadata footer under the map */}
                        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '10px 14px', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#64748b' }}>
                          <span>GPS: <strong style={{ color: '#334155' }}>39.73° N, 104.99° W</strong></span>
                          <span>SWEEP: <strong style={{ color: '#334155' }}>1.5 MI RADIAL</strong></span>
                        </div>
                      </div>

                      {/* Tactical Database Disclosure HUD Console */}
                      <div style={{ background: 'radial-gradient(120% 120% at 50% 10%, #ffffff 0%, #fafbfc 100%)', border: '1px solid #cbd5e1', borderRadius: '18px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.02)' }}>
                        
                        {/* Monospaced Readout Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                          <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', fontFamily: 'var(--font-mono)' }}>SYS_REGISTRY_MATCHES</span>
                          <span style={{ 
                            fontSize: '0.65rem', 
                            background: '#fffbeb', 
                            color: '#b45309', 
                            border: '1px solid #fde68a', 
                            padding: '3px 8px', 
                            borderRadius: '6px', 
                            fontWeight: 800, 
                            fontFamily: 'var(--font-mono)',
                            letterSpacing: '0.3px',
                            whiteSpace: 'nowrap'
                          }}>
                            ACTION RECOMMENDED
                          </span>
                        </div>

                        {/* Risk Display Row with Smart Wrapping & Premium Typography */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                              <span style={{ 
                                fontSize: '3.6rem', 
                                fontWeight: 900, 
                                color: '#ef4444', 
                                fontFamily: 'var(--font-mono)', 
                                letterSpacing: '-0.05em', 
                                lineHeight: 1,
                                textShadow: '0 0 25px rgba(239, 68, 68, 0.15)'
                              }}>4</span>
                              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>/4</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: '150px' }}>
                              <span style={{ 
                                fontSize: '0.75rem', 
                                fontWeight: 900, 
                                color: '#ef4444', 
                                letterSpacing: '0.8px',
                                textTransform: 'uppercase'
                              }}>
                                CRITICAL RISK DETECTED
                              </span>
                              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#475569', lineHeight: 1.25 }}>
                                Four official environmental hazard flags mapped inside property perimeter.
                              </span>
                            </div>
                          </div>

                          {/* Est. Negotiating Concession: Premium Neon Emerald Badge */}
                          <div style={{ 
                            fontSize: '0.75rem', 
                            fontWeight: 800, 
                            color: '#065f46', 
                            background: 'linear-gradient(90deg, #ecfdf5 0%, #d1fae5 100%)', 
                            border: '1px solid #10b981', 
                            padding: '6px 12px', 
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginTop: '4px',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.08)',
                            width: '100%',
                            boxSizing: 'border-box'
                          }}>
                            <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'block', boxShadow: '0 0 6px #10b981', flexShrink: 0 }} />
                            <span style={{ letterSpacing: '0.2px', flex: 1, textWrap: 'pretty' }}>
                              EST. NEGOTIATING CONCESSION: <strong style={{ color: '#047857', fontWeight: 900 }}>$3,500 – $15,000+</strong>
                            </span>
                          </div>
                        </div>

                        {/* Premium 10-Segment LED Telemetry Meter */}
                        <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '12px 14px' }}>
                          <div style={{ display: 'flex', gap: '5px', height: '10px', marginBottom: '8px' }}>
                            {[...Array(10)].map((_, i) => {
                              let bg = '#e2e8f0';
                              let opacity = 1;
                              let shadow = 'none';
                              if (i < 4) {
                                bg = 'linear-gradient(180deg, #f87171 0%, #ef4444 100%)';
                                shadow = '0 0 6px rgba(239, 68, 68, 0.4)';
                              } else {
                                bg = '#cbd5e1';
                                opacity = 0.4;
                              }
                              return (
                                <div 
                                  key={i} 
                                  style={{ 
                                    flex: 1, 
                                    background: bg, 
                                    opacity: opacity, 
                                    borderRadius: '3px',
                                    boxShadow: shadow,
                                    transition: 'all 0.3s ease',
                                    animation: i < 4 ? 'pulseScale 2s infinite ease-in-out' : 'none',
                                    animationDelay: `${i * 0.1}s`
                                  }} 
                                />
                              );
                            })}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', fontWeight: 800, color: '#64748b', fontFamily: 'var(--font-mono)', letterSpacing: '0.2px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <span style={{ width: '4px', height: '4px', background: '#94a3b8', borderRadius: '50%' }} /> SCAN ACTIVE
                            </span>
                            <span style={{ color: '#ef4444' }}>MATCH RATIO: 40%</span>
                            <span>SYS_STABLE</span>
                          </div>
                        </div>

                        {/* Granular Sub-Score Metrics Panel with Sleek Pill Badges & Semantic Icons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                          
                          {/* Subscore 1: Federal Database */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#334155' }}>
                                <Database size={13} color="#64748b" style={{ flexShrink: 0 }} />
                                <span>Federal Database Scan (EPA / USGS)</span>
                              </div>
                              <span style={{ 
                                color: '#ef4444', 
                                background: '#fef2f2', 
                                border: '1px solid rgba(239, 68, 68, 0.15)', 
                                padding: '2px 8px', 
                                borderRadius: '999px', 
                                fontSize: '0.62rem', 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.3px',
                                whiteSpace: 'nowrap'
                              }}>
                                1 File Match
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f87171 0%, #ef4444 100%)', borderRadius: '99px' }} />
                            </div>
                          </div>

                          {/* Subscore 2: State Records */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#334155' }}>
                                <FileText size={13} color="#64748b" style={{ flexShrink: 0 }} />
                                <span>State Department Records</span>
                              </div>
                              <span style={{ 
                                color: '#ef4444', 
                                background: '#fef2f2', 
                                border: '1px solid rgba(239, 68, 68, 0.15)', 
                                padding: '2px 8px', 
                                borderRadius: '999px', 
                                fontSize: '0.62rem', 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.3px',
                                whiteSpace: 'nowrap'
                              }}>
                                1 File Match
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f87171 0%, #ef4444 100%)', borderRadius: '99px' }} />
                            </div>
                          </div>

                          {/* Subscore 3: Regional Survey */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#334155' }}>
                                <Activity size={13} color="#64748b" style={{ flexShrink: 0 }} />
                                <span>Regional Environmental Survey</span>
                              </div>
                              <span style={{ 
                                color: '#ef4444', 
                                background: '#fef2f2', 
                                border: '1px solid rgba(239, 68, 68, 0.15)', 
                                padding: '2px 8px', 
                                borderRadius: '999px', 
                                fontSize: '0.62rem', 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.3px',
                                whiteSpace: 'nowrap'
                              }}>
                                1 File Match
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f87171 0%, #ef4444 100%)', borderRadius: '99px' }} />
                            </div>
                          </div>

                          {/* Subscore 4: Local Archives */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#334155' }}>
                                <MapPin size={13} color="#64748b" style={{ flexShrink: 0 }} />
                                <span>Local District Archives</span>
                              </div>
                              <span style={{ 
                                color: '#ef4444', 
                                background: '#fef2f2', 
                                border: '1px solid rgba(239, 68, 68, 0.15)', 
                                padding: '2px 8px', 
                                borderRadius: '999px', 
                                fontSize: '0.62rem', 
                                fontWeight: 800, 
                                textTransform: 'uppercase', 
                                letterSpacing: '0.3px',
                                whiteSpace: 'nowrap'
                              }}>
                                1 File Match
                              </span>
                            </div>
                            <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #f87171 0%, #ef4444 100%)', borderRadius: '99px' }} />
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Hazard Warning Console: 4 Risks blurred */}
                  <div className="hazard-box" style={{ border: '1.5px solid #cbd5e1', margin: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', background: '#fffbeb', flexShrink: 0 }}>
                        <ShieldAlert aria-hidden="true" color="#f59e0b" size={18} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0, textWrap: 'pretty' }}>
                          4 Environmental Registry Matches Found
                        </h2>
                        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0' }}>
                          Official localized database files mapped for <strong style={{ color: '#0f172a' }}>{cityStateDisplay}</strong>
                        </p>
                      </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      {/* Blurry Content Container */}
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '16px',
                        filter: 'blur(5.5px)',
                        WebkitFilter: 'blur(5.5px)',
                        pointerEvents: 'none',
                        userSelect: 'none',
                        opacity: 0.55
                      }}>
                        
                        {/* Hazard Row 1 */}
                        <div className="hazard-row" style={{ background: '#fdfbf7', border: '1px solid rgba(245, 158, 11, 0.08)' }}>
                          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '10px', borderRadius: '12px', color: '#f59e0b' }}>
                            <Droplets aria-hidden="true" size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Record #GW-4029: Federal Environmental Database File [REDACTED]</h4>
                              <span style={{ fontSize: '0.65rem', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>VERIFICATION REQUIRED</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
                              An official entry matching these localized coordinates was identified in federal environmental database records. Specific registry keys, classification logs, and exact survey measurements are locked. Verification recommended before final purchase contract signatures.
                            </p>
                          </div>
                        </div>

                        {/* Hazard Row 2 */}
                        <div className="hazard-row" style={{ background: '#fdfbf7', border: '1px solid rgba(245, 158, 11, 0.08)' }}>
                          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '10px', borderRadius: '12px', color: '#f59e0b' }}>
                            <Factory aria-hidden="true" size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Record #IND-8812: State Agency Property Registry File [REDACTED]</h4>
                              <span style={{ fontSize: '0.65rem', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>VERIFICATION REQUIRED</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
                              An active registry entry matches this sector&apos;s regional agency database. Localized perimeter values, historical tracking codes, and official agency classifications are compiled inside the full report.
                            </p>
                          </div>
                        </div>

                        {/* Hazard Row 3 */}
                        <div className="hazard-row" style={{ background: '#fdfbf7', border: '1px solid rgba(245, 158, 11, 0.08)' }}>
                          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '10px', borderRadius: '12px', color: '#f59e0b' }}>
                            <Activity aria-hidden="true" size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Record #GEO-2091: Regional Environmental Survey Entry [REDACTED]</h4>
                              <span style={{ fontSize: '0.65rem', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>VERIFICATION REQUIRED</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
                              A regional survey entry matches these coordinates in environmental registry archives. Mapped zone measurements, local survey values, and historical baseline comparisons are compiled and hidden.
                            </p>
                          </div>
                        </div>

                        {/* Hazard Row 4 */}
                        <div className="hazard-row" style={{ background: '#fdfbf7', border: '1px solid rgba(245, 158, 11, 0.08)' }}>
                          <div style={{ background: 'rgba(245, 158, 11, 0.08)', padding: '10px', borderRadius: '12px', color: '#f59e0b' }}>
                            <Zap aria-hidden="true" size={20} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Record #EMF-5504: Local District Administrative Record [REDACTED]</h4>
                              <span style={{ fontSize: '0.65rem', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>VERIFICATION REQUIRED</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
                              An administrative entry matching this sector&apos;s localized coordinates was identified in district archives. Distance metrics, sector logs, and property appraisal reviews are locked inside the final PDF.
                            </p>
                          </div>
                        </div>

                      </div>

                      {/* Premium Glassmorphic Lock Overlay */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255, 255, 255, 0.45)',
                        backdropFilter: 'blur(3px)',
                        WebkitBackdropFilter: 'blur(3px)',
                        borderRadius: '24px',
                        padding: '32px 24px',
                        textAlign: 'center',
                        zIndex: 10
                      }}>
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '50%',
                          background: '#ffffff',
                          border: '1.5px solid #f59e0b',
                          boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: '20px',
                          color: '#f59e0b',
                          animation: 'pulseScale 3s infinite ease-in-out'
                        }}>
                          <Lock aria-hidden="true" size={26} strokeWidth={2.5} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.02em', lineHeight: 1.2, textWrap: 'balance' }}>
                          Specific Database Registry Files are Locked
                        </h2>
                        <p style={{ fontSize: '0.88rem', color: '#475569', maxWidth: '440px', lineHeight: 1.5, margin: '0 0 24px 0', textWrap: 'pretty' }}>
                          To comply with regulatory standards and protect localized privacy, precise registry keys, historical survey values, exact distance metrics, and coordination details are encrypted. Generate your custom PDF report to unlock full verified details.
                        </p>
                        
                        <button 
                          type="button"
                          onClick={() => {
                            const emailInput = document.getElementById('email-input');
                            if (emailInput) {
                              emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              setTimeout(() => {
                                emailInput.focus();
                              }, 600);
                            }
                          }}
                          style={{
                            background: '#0f172a',
                            color: '#ffffff',
                            padding: '12px 24px',
                            borderRadius: '999px',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            boxShadow: '0 4px 15px rgba(15,23,42,0.15)',
                            border: 'none'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(15,23,42,0.25)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(15,23,42,0.15)'; }}
                        >
                          <Lock aria-hidden="true" size={14} /> Unlock Mapped Property Registry Files
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 3. CRO Blueprint Card: Negotiating Concessions */}
                  <div className="neg-blueprint" style={{ margin: 0 }}>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div style={{ background: '#f59e0b', padding: '8px', borderRadius: '10px', color: 'white', display: 'flex' }}>
                        <Scale aria-hidden="true" size={22} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#78350f', margin: 0, letterSpacing: '-0.02em', textWrap: 'pretty' }}>
                          The Homebuyer&apos;s $15,000 Negotiating Blueprint
                        </h2>
                        <p style={{ fontSize: '0.85rem', color: '#b45309', margin: '2px 0 0 0' }}>How to turn a $49 investment into closing credits</p>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.9rem', color: '#78350f', lineHeight: 1.5, marginBottom: '16px' }}>
                      Do not sign your purchase contract blindly. Localized database disclosures represent **immense leverage** at the bargaining table. Use the precise registry keys, official database codes, and coordinate mapping in our full report to:
                    </p>

                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', color: '#78350f', paddingLeft: '16px', margin: 0 }}>
                      <li><strong>Leverage Unverified Record Disclosures:</strong> Request a standard concession of $3,500 to cover professional localized testing or validation of mapped entries.</li>
                      <li><strong>Demand Protective Concessions:</strong> Require pre-closing seller credits for protective validation if mapped registry lines indicate active record interfaces.</li>
                      <li><strong>Justify Direct Purchase Price Cuts:</strong> Use exact database coordinates and historical registry values to negotiate lower final offers during escrow appraisal reviews.</li>
                    </ul>
                  </div>

                  {/* 4. Social Proof Panel with Authentic Trust Ratings */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '10px' }}>
                    
                    {/* Trust Badge Bar */}
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      gap: '16px', 
                      background: '#f8fafc', 
                      padding: '16px 24px', 
                      borderRadius: '20px', 
                      border: '1px solid #cbd5e1'
                    }} aria-label="Overall trust score: 4.9 out of 5 stars based on over 14,820 customer reports">
                      {/* Left: Overall Trust Rating */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>4.9</span>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={14} fill="#22c55e" stroke="none" />)}
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginTop: '2px' }}>
                            14,820+&nbsp;Homeowner&nbsp;Reports
                          </span>
                        </div>
                      </div>

                      {/* Right: Trust Icons Row */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
                        {/* Trustpilot Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                            <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" fill="#00b67a" />
                          </svg>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
                            Trustpilot <span style={{ color: '#00b67a', fontWeight: 900 }} aria-hidden="true">★★★★★</span>
                          </span>
                        </div>

                        {/* Google Reviews */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                            <path d="M21.35 11.1H12v2.8h5.35c-.24 1.28-.97 2.37-2.06 3.12v2.6h3.33c1.95-1.8 3.07-4.45 3.07-7.55 0-.6-.06-1.18-.16-1.72z" fill="#4285F4" />
                            <path d="M12 21c2.43 0 4.47-.8 5.96-2.18l-3.33-2.6c-.92.62-2.1.98-3.63.98-2.34 0-4.32-1.58-5.03-3.71H2.52v2.7A8.997 8.997 0 0012 21z" fill="#34A853" />
                            <path d="M6.97 13.49a5.4 5.4 0 010-3.41V7.38H2.52a8.997 8.997 0 000 8.81l4.45-2.7z" fill="#FBBC05" />
                            <path d="M12 7.51c1.32 0 2.5.45 3.44 1.35l2.58-2.58C16.46 4.9 14.43 4 12 4 8.1 4 4.8 6.27 3.32 9.53l4.45 2.7c.71-2.13 2.69-3.72 5.23-3.72z" fill="#EA4335" />
                          </svg>
                          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                            Google <span style={{ color: '#fb7185' }}>4.8</span>
                          </span>
                        </div>

                        {/* Stripe Secured */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                          <ShieldCheck aria-hidden="true" size={14} color="#1d4ed8" style={{ flexShrink: 0 }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1d4ed8' }}>Stripe Verified</span>
                        </div>
                      </div>
                    </div>

                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em', textWrap: 'pretty' }}>
                      What Verified Buyers Say
                    </h2>

                    {/* Reviews Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                      
                      {/* Review 1 */}
                      <div className="review-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="review-avatar-container">
                              <img src="/couple-reviewing.jpg" className="review-avatar" alt="Sarah & David K." width={52} height={52} loading="lazy" />
                              <span className="verified-badge">
                                <CheckCircle2 aria-hidden="true" size={10} color="#ffffff" strokeWidth={3} />
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Sarah &amp; David K.</span>
                                <span style={{ fontSize: '0.62rem', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '999px', fontWeight: 800, border: '1px solid rgba(16,185,129,0.15)' }}>BUYER</span>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Austin, TX • May 2026</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2.5px', background: '#00b67a', padding: '3px 6px', borderRadius: '4px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={8} fill="#ffffff" stroke="none" />)}
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3, textWrap: 'pretty' }}>
                            “Negotiated a $4,500 credit on closing!”
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>
                            We were in escrow on our new home when Front Door Fax flagged matching regional database files. We presented the official registry coordinates to the seller during the disclosure period, and they agreed to a $4,500 credit to cover localized verification and system checkups! Easiest decision ever.
                          </p>
                        </div>
                      </div>

                      {/* Review 2 */}
                      <div className="review-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="review-avatar-container">
                              <img src="/family-home-1.jpg" className="review-avatar" alt="Denver Home Review" width={52} height={52} loading="lazy" />
                              <span className="verified-badge">
                                <CheckCircle2 aria-hidden="true" size={10} color="#ffffff" strokeWidth={3} />
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Marcus L.</span>
                                <span style={{ fontSize: '0.62rem', background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '999px', fontWeight: 800, border: '1px solid rgba(59,130,246,0.15)' }}>REALTOR®</span>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Denver, CO • Active Broker</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={11} fill="#fbbf24" stroke="none" />)}
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3, textWrap: 'pretty' }}>
                            “An absolute must-have for every real estate transaction”
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>
                            I require all my buyer clients to pull a Front Door Fax report before putting down earnest money. It recently flagged a matching sub-surface geological registry entry. We used that record to negotiate a professional localized validation credit of $2,400 prior to closing escrow. Essential tool!
                          </p>
                        </div>
                      </div>

                      {/* Review 3 */}
                      <div className="review-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="review-avatar-container">
                              <img src="/family-moving.jpg" className="review-avatar" alt="Emma & James" width={52} height={52} loading="lazy" />
                              <span className="verified-badge">
                                <CheckCircle2 aria-hidden="true" size={10} color="#ffffff" strokeWidth={3} />
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Emma &amp; James R.</span>
                                <span style={{ fontSize: '0.62rem', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '999px', fontWeight: 800, border: '1px solid rgba(16,185,129,0.15)' }}>BUYER</span>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Charlotte, NC • April 2026</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={11} fill="#10b981" stroke="none" />)}
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3, textWrap: 'pretty' }}>
                            “Gave us absolute peace of mind before signing”
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>
                            As first-time buyers, we were terrified of hidden environmental issues in the area. This report scanned 15+ databases and verified that all matching local records were completely clean and in full compliance. The detailed maps and logs gave us absolute confidence to sign our final papers!
                          </p>
                        </div>
                      </div>

                      {/* Review 4 */}
                      <div className="review-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="review-avatar-container">
                              <img src="/young-homeowner.png" className="review-avatar" alt="Amanda & Tyler S." width={52} height={52} loading="lazy" />
                              <span className="verified-badge">
                                <CheckCircle2 aria-hidden="true" size={10} color="#ffffff" strokeWidth={3} />
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>Amanda &amp; Tyler S.</span>
                                <span style={{ fontSize: '0.62rem', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '999px', fontWeight: 800, border: '1px solid rgba(16,185,129,0.15)' }}>BUYER</span>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Charlotte, NC • May 2026</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2.5px', background: '#00b67a', padding: '3px 6px', borderRadius: '4px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={8} fill="#ffffff" stroke="none" />)}
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3, textWrap: 'pretty' }}>
                            “Found 3 matching files and saved $3,500!”
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>
                            We had no idea there were active regional database records matching our property coordinates. This report pulled the exact database entries and distance metrics. We used these official disclosures to negotiate a direct $3,500 price cut on our final purchase contract!
                          </p>
                        </div>
                      </div>

                      {/* Review 5 */}
                      <div className="review-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <div className="review-avatar-container">
                              <img src="/family-living-room.png" className="review-avatar" alt="The Miller Family" width={52} height={52} loading="lazy" />
                              <span className="verified-badge">
                                <CheckCircle2 aria-hidden="true" size={10} color="#ffffff" strokeWidth={3} />
                              </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>The Miller Family</span>
                                <span style={{ fontSize: '0.62rem', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '999px', fontWeight: 800, border: '1px solid rgba(16,185,129,0.15)' }}>BUYER</span>
                              </div>
                              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Seattle, WA • Relocation</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', gap: '2px' }}>
                            {[...Array(5)].map((_, i) => <Star key={i} aria-hidden="true" size={11} fill="#fbbf24" stroke="none" />)}
                          </div>
                        </div>
                        <div>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.3, textWrap: 'pretty' }}>
                            “Total confidence for our out-of-state relocation”
                          </h3>
                          <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>
                            Relocating across the country meant making an offer sight-unseen. Pulling a Front Door Fax report was a game changer. It checked 15+ environmental databases and confirmed that the local area files were fully clear and verified safe. Total peace of mind for our family!
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div> {/* Ends left-checkout-pane */}

              {/* Right Column: Clean Order Summary Sidebar */}
              <div className="right-checkout-pane">
                
                {/* 1. Product Thumbnail Line-Item Mockup */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #cbd5e1', paddingBottom: '20px' }}>
                  {/* Premium PDF Graphic Icon Representation */}
                  <div style={{ 
                    width: '64px', 
                    height: '84px', 
                    borderRadius: '6px', 
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
                    border: '1px solid #cbd5e1', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    padding: '8px', 
                    color: '#ffffff', 
                    fontSize: '0.45rem', 
                    fontWeight: 900, 
                    justifyContent: 'space-between',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    flexShrink: 0
                  }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '4px', letterSpacing: '0.5px' }}>FRONT DOOR</div>
                    <div style={{ color: '#10b981', fontSize: '0.6rem', fontWeight: 900 }}>FAX</div>
                    <div style={{ fontSize: '0.38rem', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{streetName}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.3 }}>
                      Neighborhood Environmental Safety Report
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '4px 0 0 0', lineHeight: 1.2 }}>
                      Comprehensive 15-Page PDF Diagnostic Scan
                    </p>
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', fontVariantNumeric: 'tabular-nums' }}>
                    ${selectedPackage === 'single' ? 49 : 199}.00
                  </span>
                </div>

                {/* 2. Inline Promo/Discount Form */}
                <div style={{ borderBottom: '1px solid #cbd5e1', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                      <Tag aria-hidden="true" color="#cbd5e1" size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input 
                        name="promoCodeRight"
                        type="text" 
                        autoComplete="off"
                        spellCheck={false}
                        aria-label="Promo code"
                        placeholder="Discount code" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        style={{ 
                          width: '100%', 
                          background: '#ffffff', 
                          border: '1.5px solid #cbd5e1', 
                          padding: '11px 11px 11px 36px', 
                          color: '#0f172a',
                          borderRadius: '8px',
                          outline: 'none',
                          fontSize: '0.88rem',
                          transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#10b981';
                          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#cbd5e1';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <button 
                      type="button" 
                      onClick={handleApplyPromo}
                      style={{ 
                        background: '#f1f5f9', 
                        color: '#475569', 
                        padding: '0 20px', 
                        borderRadius: '8px', 
                        fontSize: '0.88rem', 
                        fontWeight: 700, 
                        border: '1.5px solid #cbd5e1', 
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease, border-color 0.2s ease' 
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; }}
                    >
                      Apply
                    </button>
                  </div>
                  
                  {promoApplied && (
                    <p style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '8px', fontWeight: 600, margin: '8px 0 0 0' }} aria-live="polite">
                      ✓ WELCOME10 coupon applied! Save $10.00
                    </p>
                  )}
                  {promoError && (
                    <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '8px', margin: '8px 0 0 0' }} aria-live="polite">
                      {promoError}
                    </p>
                  )}
                </div>

                {/* 3. Receipt Calculations & Total due lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#64748b', borderBottom: '1px solid #cbd5e1', paddingBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span style={{ color: '#0f172a', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>${basePrice}.00</span>
                  </div>
                  {promoApplied && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 600 }}>
                      <span>Discount</span>
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>-${discountAmount}.00</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping</span>
                    <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Free (Emailed Instantly)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '14px', fontSize: '1.3rem', color: '#0f172a', fontWeight: 800 }}>
                    <span>Total</span>
                    <span style={{ color: '#10b981', fontVariantNumeric: 'tabular-nums' }}>${finalPrice}.00</span>
                  </div>
                </div>

                {/* 4. Trust Badges and Secure Seals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 2L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-3z" fill="#ef4444" />
                        <path d="M12 6l-4 4 1.4 1.4 2.6-2.6 4.6 4.6 1.4-1.4z" fill="#ffffff" />
                      </svg>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.5px' }}>MCAFEE SECURE</span>
                    </div>
                    <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }} aria-hidden="true">|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Lock aria-hidden="true" size={10} color="#10b981" />
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.5px' }}>256-BIT SSL</span>
                    </div>
                    <span style={{ color: '#cbd5e1', fontSize: '0.8rem' }} aria-hidden="true">|</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontSize: '0.62rem', fontWeight: 900, color: '#4f46e5', fontStyle: 'italic' }} aria-hidden="true">stripe</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#4f46e5', letterSpacing: '0.5px' }}>SECURED</span>
                    </div>
                  </div>
                </div>

                {/* 5. 100% Risk-Free Guarantee Card */}
                <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '16px', padding: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start', marginTop: '8px' }}>
                  <div style={{ background: '#f59e0b', color: 'white', padding: '5px', borderRadius: '6px', display: 'flex', flexShrink: 0 }}>
                    <ShieldCheck aria-hidden="true" size={16} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#92400e', margin: '0 0 4px 0', textWrap: 'pretty' }}>
                      30-Day Risk-Free Guarantee
                    </h2>
                    <p style={{ fontSize: '0.72rem', color: '#b45309', margin: 0, lineHeight: 1.4, textWrap: 'pretty' }}>
                      We are confident in our comprehensive environmental scans. If our report contains zero municipal records or regional data matches for your property coordinates, we will issue an immediate, 100% refund.
                    </p>
                  </div>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: '#64748b' }}>Loading security gateway…</div>}>
      <GetStartedContent />
    </Suspense>
  );
}

