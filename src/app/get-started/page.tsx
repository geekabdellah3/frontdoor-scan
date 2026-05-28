'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Clock, 
  Check, 
  ArrowRight, 
  Lock, 
  Star, 
  Zap, 
  FileText, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  Sparkles,
  ChevronRight,
  CreditCard,
  Mail,
  User
} from 'lucide-react';

// --- DATA: Trusted Sources ---
const DATA_SOURCES = [
  { name: 'EPA ECHO', detail: 'Enforcement and Compliance History Online' },
  { name: 'FEMA', detail: 'National Flood Insurance Program Data' },
  { name: 'CDC', detail: 'Environmental Public Health Tracking' },
  { name: 'USGS', detail: 'United States Geological Survey' },
  { name: 'EJScreen', detail: 'Environmental Justice Mapping' },
  { name: 'NOAA', detail: 'National Oceanic and Atmospheric Admin' },
];

// --- DATA: Reviews ---
const REVIEWS = [
  {
    title: "Used the report during closing negotiations",
    text: "The standard inspection looked clean, but the report flagged a nearby former industrial site. We used the information to ask better questions and negotiate a credit for additional water testing and filtration.",
    author: "Michael R.",
    location: "Austin, TX",
    role: "Homebuyer",
    initials: "MR"
  },
  {
    title: "Helped us walk away from uncertainty",
    text: "We were close to signing, but the report showed environmental concerns near the property that we had not considered. It helped us pause, ask for more information, and ultimately choose a safer option.",
    author: "Sarah L.",
    location: "Denver, CO",
    role: "Family Buyer",
    initials: "SL"
  },
  {
    title: "Now part of my due diligence process",
    text: "As an investor, I use this before making offers. It helps me identify environmental risk signals early and decide whether to negotiate, investigate further, or move on.",
    author: "James K.",
    location: "Chicago, IL",
    role: "Real Estate Investor",
    initials: "JK"
  }
];

function GetStartedContent() {
  const searchParams = useSearchParams();
  const rawAddress = searchParams.get('address') || '';
  const addressLine1 = rawAddress.split(',')[0] || '';

  // --- STATE ---
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'bundle'>('single');
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(600); // 10 min urgency
  
  // Form State
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState(addressLine1);
  const [unit, setUnit] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('United States');
  
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Terminal Animation State
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const terminalLogsEndRef = useRef<HTMLDivElement>(null);

  // ROI Module State
  const [roiState, setRoiState] = useState<'calculating' | 'ready'>('calculating');
  const [riskData, setRiskData] = useState({
    score: 'Elevated',
    leverage: '$1,500–$5,000',
    roi: '31×–102×'
  });

  useEffect(() => {
    if (!rawAddress) {
      setRoiState('ready');
      return;
    }

    // Simulate property-specific analysis
    const timer = setTimeout(() => {
      // Deterministic risk score based on address length/chars for demo consistency
      const hash = rawAddress.length % 4;
      const data = [
        { score: 'Moderate', leverage: '$500–$1,500', roi: '10×–31×' },
        { score: 'Elevated', leverage: '$1,500–$5,000', roi: '31×–102×' },
        { score: 'High', leverage: '$5,000–$15,000+', roi: '102×–306×+' },
        { score: 'Low', leverage: '$0–$500', roi: '0×–10×' }
      ][hash];
      
      setRiskData(data);
      setRoiState('ready');
    }, 2800);

    return () => clearTimeout(timer);
  }, [rawAddress]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const prices = {
    single: 49,
    bundle: 199
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFinalSubmit();
  };

  const handleFinalSubmit = () => {
    setCheckoutState('processing');
    const logs = [
      "Connecting to EPA ECHO gateway...",
      "Extracting Enforcement & Compliance History...",
      "Querying FEMA National Flood Hazard Layer...",
      "Mapping local EJScreen indicators...",
      "Detecting Superfund (NPL) sites within 2-mile radius...",
      "Compiling CDC Environmental Health Tracking data...",
      "Generating property-specific risk score...",
      "Finalizing PDF report and negotiation scripts..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTerminalLogs(prev => [...prev, logs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setCheckoutState('success'), 800);
      }
    }, 600);
  };

  useEffect(() => {
    terminalLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <div className="checkout-container">
      {/* ── 1. TOP TRUST BAR ── */}
      <nav className="top-trust-bar">
        <div className="container trust-flex">
          <Link href="/" className="brand-logo">
            <ShieldCheck className="logo-icon" size={20} />
            <span>Front Door Scan</span>
          </Link>
          <div className="trust-badges-desktop">
            <div className="trust-item"><Lock size={14} /> Secure Checkout</div>
            <div className="trust-item"><ShieldCheck size={14} /> 30-Day Guarantee</div>
            <div className="trust-item"><Zap size={14} /> Instant Delivery</div>
          </div>
        </div>
      </nav>

      {/* ── 2. URGENCY BANNER ── */}
      <div className="ann-bar">
        <span className="ann-badge">Demand Alert</span>
        <span>⚡ 574 buyers are checking properties right now — Complete your report to lock in our 30-day money-back guarantee.</span>
      </div>

      <main className="main-content">
        {checkoutState !== 'success' ? (
          <div className="container grid-layout">
            
            {/* ── LEFT COLUMN ── */}
            <div className="content-left">
              

              {/* ── 4. MAIN CHECKOUT HERO ── */}
              <section className="hero-section">
                <h1 className="hero-title">Don&apos;t sign blind.</h1>
                <p className="hero-subtitle">
                  Before you commit to a mortgage, check for environmental risk signals standard inspections may miss.
                </p>
                <div className="hero-copy">
                  Standard inspections focus on the physical condition of the home. They may not evaluate nearby Superfund sites, Brownfields, flood exposure, radon zones, industrial emitters, or public environmental risk indicators. SafeTrace helps you review these signals before closing.
                </div>

                {/* Risk Comparison visual */}
                <div className="risk-visual">
                  <div className="risk-box safe">
                    <span className="risk-label">Investment</span>
                    <span className="risk-price">$49</span>
                    <span className="risk-desc">Front Door Scan Report</span>
                  </div>
                  <div className="risk-divider">vs</div>
                  <div className="risk-box danger">
                    <span className="risk-label">Potential Liability</span>
                    <span className="risk-price">High Cost</span>
                    <span className="risk-desc">Remediation, Resale & Testing</span>
                  </div>
                </div>
              </section>

              {/* ── 4. WHAT'S INCLUDED ── */}
              <section className="included-section">
                <h2 className="section-title">Your Environmental Risk Report Includes:</h2>
                <div className="included-grid">
                  <div className="included-item">
                    <div className="icon-wrap"><Zap size={18} /></div>
                    <div>
                      <span className="included-label">EPA ECHO & EJScreen</span>
                      <p className="included-text">Detailed scan of federal contamination databases and enforcement history.</p>
                    </div>
                  </div>
                  <div className="included-item">
                    <div className="icon-wrap"><Droplets size={18} /></div>
                    <div>
                      <span className="included-label">FEMA Flood & Disaster</span>
                      <p className="included-text">Flood zone mapping and historical disaster declarations for the property.</p>
                    </div>
                  </div>
                  <div className="included-item">
                    <div className="icon-wrap"><AlertTriangle size={18} /></div>
                    <div>
                      <span className="included-label">Hazard Proximity</span>
                      <p className="included-text">Proximity to Superfund (NPL) and Brownfield sites within a 2-mile radius.</p>
                    </div>
                  </div>
                  <div className="included-item">
                    <div className="icon-wrap"><Wind size={18} /></div>
                    <div>
                      <span className="included-label">Air & Radon Zones</span>
                      <p className="included-text">CDC and EPA radon risk levels and localized air quality indicators.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── 5. GUARANTEE SECTION ── */}
              <section className="guarantee-section">
                <div className="guarantee-card">
                  <div className="guarantee-seal">
                    <ShieldCheck size={40} />
                  </div>
                  <div className="guarantee-content">
                    <h3>30-Day Money-Back Guarantee</h3>
                    <p>Review your report risk-free. If you are not satisfied with the value of your report within 30 days, contact us for a full refund.</p>
                  </div>
                </div>
              </section>

              {/* ── 6. TESTIMONIALS ── */}
              <section className="testimonials-section">
                <h2 className="section-title">Verified Customer Experiences</h2>
                <div className="testimonials-list">
                  {REVIEWS.map((r, i) => (
                    <div key={i} className="testi-card">
                      <div className="testi-stars">
                        {[...Array(5)].map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
                      </div>
                      <h4 className="testi-title">{r.title}</h4>
                      <p className="testi-text">&ldquo;{r.text}&rdquo;</p>
                      <div className="testi-user">
                        <div className="testi-avatar">{r.initials}</div>
                        <div>
                          <div className="testi-name">{r.author}</div>
                          <div className="testi-meta">{r.role} • {r.location}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── 7. DATA SOURCES ── */}
              <section className="sources-section">
                <h2 className="section-title">Aggregated from Trusted Public Databases</h2>
                <div className="sources-grid">
                  {DATA_SOURCES.map((s, i) => (
                    <div key={i} className="source-item">
                      <span className="source-name">{s.name}</span>
                      <span className="source-detail">{s.detail}</span>
                    </div>
                  ))}
                </div>
                <p className="disclaimer">
                  Front Door Scan summarizes public and federal datasets. It does not replace professional environmental testing, legal advice, or a certified environmental assessment.
                </p>
              </section>
            </div>

            {/* ── RIGHT COLUMN: CHECKOUT FLOW ── */}
            <aside className="checkout-sidebar">
              <div className="sticky-sidebar">
                
                {/* 3. ROI PREVIEW MODULE (Relocated to Sidebar) */}
                <section className="roi-module sidebar-mode">
                  {roiState === 'calculating' ? (
                    <div className="roi-loading-card">
                      <div className="pulse-ring"></div>
                      <div className="roi-loading-text">
                        <span className="spinner-sm"></span>
                        Analyzing address...
                      </div>
                      <div className="roi-loading-addr">{addressLine1 || 'Detecting...'}</div>
                    </div>
                  ) : (
                    <div className="roi-ready-card">
                      <div className="roi-hdr">
                        <span className="roi-tag">Property Analysis</span>
                        <h3 className="roi-title-sm">{addressLine1 || 'Selected Property'}</h3>
                      </div>

                      <div className="roi-stats-grid vertical">
                        <div className="roi-stat-box">
                          <span className="roi-stat-label">Risk Signal Score</span>
                          <div className={`roi-badge ${riskData.score.toLowerCase()}`}>
                            {riskData.score}
                          </div>
                        </div>
                        <div className="roi-stat-box">
                          <span className="roi-stat-label">Est. Negotiation Leverage</span>
                          <div className="roi-stat-val-sm">{riskData.leverage}</div>
                        </div>
                        <div className="roi-stat-box highlight">
                          <span className="roi-stat-label">Potential ROI</span>
                          <div className="roi-stat-val-sm accent">{riskData.roi}</div>
                        </div>
                      </div>

                      {/* Locked Findings Preview (Compact) */}
                      <div className="locked-findings-sm">
                        <div className="locked-hdr">
                          <Lock size={12} />
                          <span>Locked Records Near Address</span>
                        </div>
                        <div className="locked-rows">
                          <div className="locked-row blur"><Check size={12} /> EPA Hazard Scan</div>
                          <div className="locked-row blur"><Check size={12} /> Flood Risk Analysis</div>
                          <div className="locked-row blur"><Check size={12} /> Proximity Map</div>
                        </div>
                      </div>
                    </div>
                  )}
                </section>

                {/* ── 8. SELECT YOUR COVERAGE ── */}
                <div className="plan-selector">
                  <h3 className="sidebar-title">1. Select Your Coverage</h3>
                  <div 
                    className={`plan-card ${selectedPlan === 'single' ? 'active' : ''}`}
                    onClick={() => setSelectedPlan('single')}
                  >
                    <div className="plan-radio"><div className="radio-outer">{selectedPlan === 'single' && <div className="radio-inner" />}</div></div>
                    <div className="plan-info">
                      <div className="plan-name">Single Property Report</div>
                      <div className="plan-desc">$49 One-time</div>
                    </div>
                    <div className="plan-price-wrap"><span className="price-new">$49</span></div>
                  </div>

                  <div 
                    className={`plan-card ${selectedPlan === 'bundle' ? 'active' : ''} best-value`}
                    onClick={() => setSelectedPlan('bundle')}
                  >
                    <div className="badge-best">Best Value</div>
                    <div className="plan-radio"><div className="radio-outer">{selectedPlan === 'bundle' && <div className="radio-inner" />}</div></div>
                    <div className="plan-info">
                      <div className="plan-name">5-Property Bundle</div>
                      <div className="plan-desc">$199 One-time</div>
                    </div>
                    <div className="plan-price-wrap"><span className="price-new">$199</span></div>
                  </div>
                </div>

                {/* ── 9. CHECKOUT FORM (Matched to Screenshot) ── */}
                <div className="checkout-form-card">
                  <form onSubmit={handleSubmit}>
                    <div className="input-row">
                      <div className="input-group">
                        <input type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="input-group">
                        <input type="text" placeholder="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>

                    <div className="input-group">
                      <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="input-group">
                      <input type="text" placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <div className="input-group">
                      <input type="text" placeholder="Street Address" required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="input-group">
                      <input type="text" placeholder="Unit / Apt (optional)" value={unit} onChange={(e) => setUnit(e.target.value)} />
                    </div>

                    <div className="input-group">
                      <input type="text" placeholder="City" required value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="input-row">
                      <div className="input-group">
                        <input type="text" placeholder="United States" value={country} disabled />
                      </div>
                      <div className="input-group">
                        <input type="text" placeholder="State / Province" required value={state} onChange={(e) => setState(e.target.value)} />
                      </div>
                    </div>

                    <div className="input-group">
                      <input type="text" placeholder="ZIP Code" required value={zip} onChange={(e) => setZip(e.target.value)} />
                    </div>

                    {/* Simple Card Row for Demo */}
                    <div className="input-group">
                      <div className="input-wrap">
                        <CreditCard size={14} className="input-icon" />
                        <input type="text" placeholder="Card Number (Demo Only)" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                      </div>
                    </div>

                    <button type="submit" className="cta-button final-cta">
                      <Lock size={18} fill="currentColor" />
                      Get My Environmental Report — ${prices[selectedPlan].toFixed(2)}
                    </button>
                  </form>
                  
                  <div className="security-badges-row">
                    <Lock size={10} style={{ color: '#94a3b8' }} />
                    <span>256-bit encrypted · 30-day guarantee · Instant delivery</span>
                  </div>
                </div>

              </div>
            </aside>

          </div>
        ) : (
          /* ── SUCCESS SCREEN ── */
          <div className="success-container">
            <div className="success-card">
              <div className="success-tick"><Check size={40} strokeWidth={3} /></div>
              <span className="success-badge">Report Ready & Verified</span>
              <h1 className="success-title">Your Environmental Report is Ready</h1>
              <p className="success-text">
                Payment of <strong>${prices[selectedPlan].toFixed(2)}</strong> confirmed. Your property-specific report has been sent to <strong>{email}</strong>.
              </p>
              <div className="success-actions">
                <button className="cta-button success-btn" onClick={() => alert('Downloading Report...')}>
                  <FileText size={18} /> Download PDF Report
                </button>
                <Link href="/" className="secondary-link">Return to Home</Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── TERMINAL OVERLAY ── */}
      {checkoutState === 'processing' && (
        <div className="term-overlay">
          <div className="term-box">
            <div className="term-hdr">
              <div className="term-dots">
                <span className="term-dot r" /><span className="term-dot y" /><span className="term-dot g" />
              </div>
              <span className="term-title">Front Door Scan Database Compiler v4.5</span>
            </div>
            <div className="term-logs">
              {terminalLogs.map((log, i) => (
                <div key={i} className="term-row">
                  <Check size={14} className="term-check" />
                  <span>{log}</span>
                </div>
              ))}
              <div ref={terminalLogsEndRef} />
              <div className="term-row active">
                <div className="spinner" />
                <span>Processing data request for {firstName} {lastName}...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .checkout-container { background: #f8fafc; min-height: 100vh; font-family: var(--font-sans); color: var(--text-primary); }
        .container { width: 100%; max-width: 1280px; margin: 0 auto; padding: 0 24px; }
        
        /* ── TRUST BAR ── */
        .top-trust-bar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 0; position: sticky; top: 0; z-index: 100; }
        .trust-flex { display: flex; justify-content: space-between; align-items: center; }
        .brand-logo { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 1.1rem; color: var(--text-primary); text-decoration: none; font-family: var(--font-heading); }
        .logo-icon { color: var(--accent-primary); }
        .trust-badges-desktop { display: flex; gap: 24px; }
        .trust-item { display: flex; align-items: center; gap: 6px; font-size: 0.75rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; }

        /* ── ANN BAR ── */
        .ann-bar { background: var(--text-primary); color: #fff; text-align: center; padding: 12px 24px; font-size: 0.8rem; font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 12px; }
        .ann-badge { background: var(--accent-primary); color: var(--text-primary); padding: 2px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; }

        /* ── LAYOUT ── */
        .main-content { padding: 40px 0 100px; }
        .grid-layout { display: grid; grid-template-columns: 1fr 400px; gap: 60px; }

        /* ── ROI MODULE ── */
        .roi-module { margin-bottom: 60px; perspective: 1000px; }
        
        .roi-loading-card { background: #fff; padding: 60px 40px; border-radius: 24px; border: 1px solid #e2e8f0; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; }
        .roi-loading-text { font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; display: flex; align-items: center; gap: 10px; }
        .roi-loading-addr { font-size: 0.9rem; color: var(--accent-primary); font-weight: 600; opacity: 0.7; }
        .spinner-sm { width: 18px; height: 18px; border: 2px solid var(--accent-primary); border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }
        
        .roi-ready-card { background: #fff; border-radius: 24px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); }
        .roi-hdr { padding: 32px 32px 24px; border-bottom: 1px solid #f1f5f9; }
        .roi-tag { background: #f0fdf4; color: var(--accent-primary); padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; margin-bottom: 12px; display: inline-block; }
        .roi-title { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 8px; }
        .roi-subtitle { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }

        .roi-addr-display { margin: 24px 32px; padding: 16px 24px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; }
        .roi-addr-label { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; display: block; margin-bottom: 4px; }
        .roi-addr-val { font-size: 1.1rem; font-weight: 800; color: var(--text-primary); }

        .roi-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #e2e8f0; margin: 0 32px 24px; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; }
        .roi-stat-box { background: #fff; padding: 24px 16px; text-align: center; }
        .roi-stat-box.highlight { background: #f0fdf4; }
        .roi-stat-label { display: block; font-size: 0.7rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; }
        .roi-stat-val { font-size: 1.4rem; font-weight: 900; letter-spacing: -0.02em; }
        .roi-stat-val.accent { color: var(--accent-primary); }
        .roi-stat-desc { font-size: 0.65rem; color: var(--text-muted); margin: 6px 0 0; font-weight: 600; }
        
        .roi-badge { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; }
        .roi-badge.low { background: #f1f5f9; color: #64748b; }
        .roi-badge.moderate { background: #fef9c3; color: #a16207; }
        .roi-badge.elevated { background: #ffedd5; color: #9a3412; }
        .roi-badge.high { background: #fee2e2; color: #991b1b; }

        .roi-support-copy { margin: 0 32px 32px; font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; font-style: italic; }

        .locked-findings { margin: 0 32px 32px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; padding: 24px; position: relative; }
        .locked-hdr { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; margin-bottom: 16px; }
        .locked-rows { display: flex; flex-direction: column; gap: 10px; }
        .locked-row { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); }
        .locked-row.blur { filter: blur(4px); opacity: 0.5; pointer-events: none; user-select: none; }
        
        .locked-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(255,255,255,1) 40%, rgba(255,255,255,0.7)); display: flex; flex-direction: column; align-items: center; justify-content: flex-end; padding: 32px; text-align: center; }
        .locked-overlay p { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
        .unlock-btn { background: var(--text-primary); color: #fff; border: none; padding: 14px 24px; border-radius: 10px; font-size: 0.9rem; font-weight: 800; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .unlock-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 15px rgba(0,0,0,0.15); }
        .micro-row { display: flex; gap: 12px; font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-top: 12px; }

        /* Sidebar ROI Specifics */
        .roi-module.sidebar-mode { margin-bottom: 20px; }
        .roi-title-sm { font-size: 1.1rem; font-weight: 800; margin: 0; }
        .roi-stat-val-sm { font-size: 1.1rem; font-weight: 900; }
        .roi-stats-grid.vertical { display: flex; flex-direction: column; margin: 0; border-radius: 0; border: none; border-top: 1px solid #f1f5f9; }
        .roi-stats-grid.vertical .roi-stat-box { padding: 16px 24px; text-align: left; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; }
        .roi-stats-grid.vertical .roi-stat-label { margin-bottom: 0; }
        .locked-findings-sm { padding: 16px 24px; background: #f8fafc; }
        .locked-findings-sm .locked-hdr { margin-bottom: 10px; opacity: 0.7; }
        .locked-findings-sm .locked-row { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px; }

        /* ── HERO ── */
        .hero-section { margin-bottom: 60px; }
        .hero-title { font-size: clamp(2.5rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.05em; margin-bottom: 16px; line-height: 1; }
        .hero-subtitle { font-size: 1.25rem; color: var(--text-secondary); font-weight: 600; line-height: 1.4; margin-bottom: 24px; }
        .hero-copy { font-size: 1rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 40px; max-width: 600px; }
        .risk-visual { display: flex; align-items: center; gap: 24px; background: #fff; padding: 32px; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .risk-box { flex: 1; display: flex; flex-direction: column; text-align: center; }
        .risk-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px; }
        .risk-price { font-size: 1.75rem; font-weight: 900; margin-bottom: 4px; }
        .risk-desc { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }
        .risk-box.safe .risk-price { color: var(--accent-primary); }
        .risk-box.danger .risk-price { color: #f59e0b; }
        .risk-divider { font-weight: 800; color: var(--text-muted); font-size: 0.8rem; }

        /* ── INCLUDED ── */
        .included-section { margin-bottom: 60px; }
        .section-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 32px; letter-spacing: -0.03em; }
        .included-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .included-item { display: flex; gap: 16px; }
        .icon-wrap { width: 40px; height: 40px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: var(--accent-primary); flex-shrink: 0; }
        .included-label { display: block; font-size: 0.95rem; font-weight: 800; margin-bottom: 4px; }
        .included-text { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }

        /* ── GUARANTEE ── */
        .guarantee-section { margin-bottom: 60px; }
        .guarantee-card { background: #f0fdf4; border: 1px solid #10b981; padding: 32px; border-radius: 24px; display: flex; gap: 24px; align-items: center; }
        .guarantee-seal { color: #10b981; }
        .guarantee-content h3 { font-size: 1.1rem; font-weight: 800; margin-bottom: 4px; color: #065f46; }
        .guarantee-content p { font-size: 0.9rem; line-height: 1.5; color: #065f46; margin: 0; font-weight: 500; opacity: 0.8; }

        /* ── TESTIMONIALS ── */
        .testimonials-section { margin-bottom: 60px; }
        .testimonials-list { display: flex; flex-direction: column; gap: 24px; }
        .testi-card { background: #fff; padding: 24px; border-radius: 20px; border: 1px solid #e2e8f0; }
        .testi-stars { color: #f59e0b; display: flex; gap: 2px; margin-bottom: 12px; }
        .testi-title { font-size: 1rem; font-weight: 800; margin-bottom: 8px; }
        .testi-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.5; font-style: italic; margin-bottom: 16px; }
        .testi-user { display: flex; align-items: center; gap: 12px; }
        .testi-avatar { width: 36px; height: 36px; background: var(--text-primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.75rem; }
        .testi-name { font-size: 0.85rem; font-weight: 800; }
        .testi-meta { font-size: 0.75rem; color: var(--text-muted); }

        /* ── SOURCES ── */
        .sources-section { background: #fff; padding: 32px; border-radius: 24px; border: 1px solid #e2e8f0; }
        .sources-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
        .source-item { display: flex; flex-direction: column; }
        .source-name { font-size: 0.85rem; font-weight: 900; }
        .source-detail { font-size: 0.65rem; color: var(--text-muted); }
        .disclaimer { font-size: 0.75rem; color: var(--text-muted); text-align: center; border-top: 1px solid #f1f5f9; padding-top: 16px; }

        /* ── SIDEBAR ── */
        .sticky-sidebar { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 20px; }
        
        /* Product Summary */
        .prod-summary-card { background: var(--text-primary); color: #fff; padding: 24px; border-radius: 20px; }
        .prod-badge { background: var(--accent-primary); color: var(--text-primary); padding: 2px 8px; border-radius: 4px; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; display: inline-block; margin-bottom: 12px; }
        .prod-name { font-size: 1.1rem; font-weight: 800; margin-bottom: 4px; }
        .prod-addr { font-size: 0.85rem; color: rgba(255,255,255,0.6); font-weight: 500; margin: 0; }

        /* Plan Selector */
        .plan-selector { background: #fff; padding: 20px; border-radius: 20px; border: 1px solid #e2e8f0; }
        .sidebar-title { font-size: 0.9rem; font-weight: 800; margin-bottom: 16px; }
        .plan-card { display: flex; align-items: center; gap: 12px; padding: 12px; border: 2px solid #f1f5f9; border-radius: 12px; cursor: pointer; position: relative; margin-bottom: 8px; }
        .plan-card.active { border-color: var(--accent-primary); background: #f0fdf4; }
        .plan-radio .radio-outer { width: 18px; height: 18px; border: 2px solid #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .plan-card.active .radio-outer { border-color: var(--accent-primary); }
        .radio-inner { width: 8px; height: 8px; background: var(--accent-primary); border-radius: 50%; }
        .plan-info { flex: 1; }
        .plan-name { font-size: 0.85rem; font-weight: 800; }
        .plan-desc { font-size: 0.7rem; color: var(--text-muted); }
        .plan-price-wrap { font-weight: 900; font-size: 0.95rem; }
        .badge-best { position: absolute; top: -8px; right: 12px; background: var(--text-primary); color: #fff; font-size: 0.6rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; }

        /* Form Card */
        .checkout-form-card { background: #fff; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .input-group { margin-bottom: 12px; }
        .input-wrap { position: relative; display: flex; align-items: center; }
        .input-icon { position: absolute; left: 12px; color: #94a3b8; }
        .input-group input { width: 100%; padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 0.95rem; font-family: inherit; outline: none; transition: all 0.2s; color: #1e293b; }
        .input-group input::placeholder { color: #94a3b8; font-weight: 400; }
        .input-group input:focus { border-color: var(--accent-primary); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }
        .input-wrap input { padding-left: 36px; }
        .input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .input-row .input-group { margin-bottom: 0; }
        
        .cta-button.final-cta {
          background: #3d7a5e;
          padding: 18px;
          border-radius: 10px;
          margin-top: 12px;
          font-size: 1rem;
          box-shadow: 0 4px 6px -1px rgba(61, 122, 94, 0.2);
        }
        .cta-button.final-cta:hover { background: #346951; }

        .security-badges-row { display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 0.75rem; color: #94a3b8; font-weight: 500; }

        /* ── TERMINAL OVERLAY ── */
        .term-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(8px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .term-box { width: 100%; max-width: 600px; background: #1e293b; border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.2); overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
        .term-hdr { background: rgba(0,0,0,0.2); padding: 12px 16px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .term-dots { display: flex; gap: 6px; }
        .term-dot { width: 10px; height: 10px; border-radius: 50%; }
        .term-dot.r { background: #ff5f56; }
        .term-dot.y { background: #ffbd2e; }
        .term-dot.g { background: #27c93f; }
        .term-title { font-size: 0.65rem; color: #10b981; font-weight: 700; text-transform: uppercase; opacity: 0.6; }
        .term-logs { padding: 24px; font-family: 'Geist Mono', monospace; font-size: 0.85rem; color: #94a3b8; height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
        .term-row { display: flex; align-items: center; gap: 10px; }
        .term-check { color: #10b981; flex-shrink: 0; }
        .term-row.active { color: #fff; }
        .spinner { width: 14px; height: 14px; border: 2px solid #10b981; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── SUCCESS SCREEN ── */
        .success-container { display: flex; align-items: center; justify-content: center; min-height: 60vh; text-align: center; }
        .success-card { background: #fff; padding: 60px 40px; border-radius: 32px; border: 1px solid #e2e8f0; max-width: 560px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); }
        .success-tick { width: 80px; height: 80px; background: #f0fdf4; color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
        .success-badge { font-size: 0.75rem; font-weight: 800; color: #10b981; text-transform: uppercase; letter-spacing: 0.1em; display: block; margin-bottom: 12px; }
        .success-title { font-size: 2.25rem; font-weight: 900; margin-bottom: 16px; letter-spacing: -0.04em; }
        .success-text { font-size: 1rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 40px; }
        .success-actions { display: flex; flex-direction: column; gap: 16px; max-width: 320px; margin: 0 auto; }
        .success-btn { background: var(--text-primary); }
        .secondary-link { color: var(--text-muted); text-decoration: none; font-size: 0.9rem; font-weight: 600; }

        @media (max-width: 992px) {
          .grid-layout { grid-template-columns: 1fr; gap: 40px; }
          .checkout-sidebar { order: -1; }
          .sticky-sidebar { position: static; }
        }
        @media (max-width: 640px) {
          .included-grid { grid-template-columns: 1fr; }
          .sources-grid { grid-template-columns: 1fr 1fr; }
          .risk-visual { flex-direction: column; padding: 24px; gap: 16px; }
          .risk-divider { display: none; }
        }
      `}</style>
    </div>
  );
}

export default function GetStarted() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <GetStartedContent />
    </Suspense>
  );
}
