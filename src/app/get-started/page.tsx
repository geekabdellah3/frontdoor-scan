'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
  ChevronRight,
  Menu,
  X
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

// --- DATA: Reviews (Legally Safer & Credible) ---
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

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState<'single' | 'bundle'>('single');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes trust-based urgency

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

  return (
    <div className="checkout-container">
      {/* ── 1. TOP TRUST BAR ── */}
      <nav className="top-trust-bar">
        <div className="container trust-flex">
          <Link href="/" className="brand-logo">
            <ShieldCheck className="logo-icon" size={20} />
            <span>SafeTrace</span>
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
        <span className="ann-badge">Status: Live</span>
        <span>Homebuyers are checking environmental risk before they sign. Complete your report today and stay covered by our 30-day money-back guarantee.</span>
      </div>

      <main className="main-content">
        <div className="container grid-layout">
          
          {/* ── LEFT COLUMN: REDESIGNED HERO & CONTENT ── */}
          <div className="content-left">
            
            {/* ── 3. MAIN CHECKOUT HERO ── */}
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
                  <span className="risk-desc">SafeTrace Report Cost</span>
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
                <div className="included-item">
                  <div className="icon-wrap"><FileText size={18} /></div>
                  <div>
                    <span className="included-label">Negotiation Strategy</span>
                    <p className="included-text">Bonus: PDF guide with talking points for due diligence and credits.</p>
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

            {/* ── 7. DATA SOURCES SECTION ── */}
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
                SafeTrace summarizes public and federal datasets. It does not replace professional environmental testing, legal advice, or a certified environmental assessment.
              </p>
            </section>
          </div>

          {/* ── RIGHT COLUMN: CHECKOUT INTERFACE ── */}
          <aside className="checkout-sidebar">
            <div className="sticky-sidebar">
              
              {/* ── 8. SELECT YOUR COVERAGE ── */}
              <div className="plan-selector">
                <h3 className="sidebar-title">1. Select Your Coverage</h3>
                
                <div 
                  className={`plan-card ${selectedPlan === 'single' ? 'active' : ''}`}
                  onClick={() => setSelectedPlan('single')}
                >
                  <div className="plan-radio">
                    <div className="radio-outer">
                      {selectedPlan === 'single' && <div className="radio-inner" />}
                    </div>
                  </div>
                  <div className="plan-info">
                    <div className="plan-name">Single Property Report</div>
                    <div className="plan-desc">Perfect for one property decision.</div>
                  </div>
                  <div className="plan-price-wrap">
                    <span className="price-old">$69</span>
                    <span className="price-new">$49</span>
                  </div>
                </div>

                <div 
                  className={`plan-card ${selectedPlan === 'bundle' ? 'active' : ''} best-value`}
                  onClick={() => setSelectedPlan('bundle')}
                >
                  <div className="badge-best">Best Value</div>
                  <div className="plan-radio">
                    <div className="radio-outer">
                      {selectedPlan === 'bundle' && <div className="radio-inner" />}
                    </div>
                  </div>
                  <div className="plan-info">
                    <div className="plan-name">5-Property Bundle</div>
                    <div className="plan-desc">Compare multiple homes or investors.</div>
                  </div>
                  <div className="plan-price-wrap">
                    <span className="price-old">$345</span>
                    <span className="price-new">$199</span>
                  </div>
                </div>
              </div>

              {/* ── 9. VALUE STACK ── */}
              <div className="value-stack">
                <h3 className="sidebar-title">Order Summary</h3>
                <ul className="stack-list">
                  <li><Check size={14} /> EPA Contamination Scan</li>
                  <li><Check size={14} /> Water & Groundwater Risks</li>
                  <li><Check size={14} /> Air Quality & Pollution Indices</li>
                  <li><Check size={14} /> Flood & Disaster Risk Mapping</li>
                  <li><Check size={14} /> Superfund Proximity Review</li>
                  <li><Check size={14} /> <strong>Bonus:</strong> Negotiation Guide</li>
                </ul>
                <p className="value-context">
                  Comparable professional reviews can cost significantly more. SafeTrace provides a fast, affordable first layer of due diligence.
                </p>
              </div>

              {/* ── 10. ORDER SUMMARY & CTA ── */}
              <div className="summary-card">
                <div className="summary-row">
                  <span>Grand Total:</span>
                  <span className="total-amount">${prices[selectedPlan].toFixed(2)}</span>
                </div>
                
                <button className="cta-button">
                  Get My Report — ${prices[selectedPlan]}
                  <ArrowRight size={18} />
                </button>

                <div className="security-badges">
                  <div className="sec-item"><Lock size={12} /> 256-bit Encrypted</div>
                  <div className="sec-item"><Zap size={12} /> Instant Delivery</div>
                  <div className="sec-item"><Clock size={12} /> Ends: {formatTime(timeLeft)}</div>
                </div>
              </div>

              {/* ── 11. PROOF METRICS ── */}
              <div className="sidebar-footer">
                <div className="metric-item">
                  <FileText size={16} />
                  <span>Easy-to-read PDF format</span>
                </div>
                <div className="metric-item">
                  <ShieldCheck size={16} />
                  <span>Verified Public Data</span>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* ── 12. FINAL CTA SECTION ── */}
      <footer className="checkout-footer">
        <div className="container footer-content">
          <h3>Don&apos;t close without knowing what&apos;s nearby.</h3>
          <p>Check the environmental risk signals around the property. Get your report today for $49 with a 30-day money-back guarantee.</p>
          <button className="cta-button secondary">Get My Property Report</button>
        </div>
      </footer>

      <style jsx>{`
        .checkout-container {
          background: #f8fafc;
          min-height: 100vh;
          font-family: var(--font-sans);
          color: var(--text-primary);
        }

        /* ── TRUST BAR ── */
        .top-trust-bar {
          background: #fff;
          border-bottom: 1px solid #e2e8f0;
          padding: 16px 0;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .trust-flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-primary);
          text-decoration: none;
          font-family: var(--font-heading);
        }
        .logo-icon { color: var(--accent-primary); }
        .trust-badges-desktop {
          display: flex;
          gap: 24px;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* ── ANN BAR ── */
        .ann-bar {
          background: var(--text-primary);
          color: #fff;
          text-align: center;
          padding: 12px 24px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          line-height: 1.4;
        }
        .ann-badge {
          background: var(--accent-primary);
          color: var(--text-primary);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        /* ── LAYOUT ── */
        .main-content { padding: 60px 0 100px; }
        .grid-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
        }

        /* ── HERO ── */
        .hero-section { margin-bottom: 80px; }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 900;
          letter-spacing: -0.05em;
          margin-bottom: 16px;
          line-height: 1;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          font-weight: 600;
          line-height: 1.4;
          margin-bottom: 24px;
        }
        .hero-copy {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 600px;
        }

        .risk-visual {
          display: flex;
          align-items: center;
          gap: 24px;
          background: #fff;
          padding: 32px;
          border-radius: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .risk-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .risk-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 8px; }
        .risk-price { font-size: 1.75rem; font-weight: 900; margin-bottom: 4px; }
        .risk-desc { font-size: 0.8rem; font-weight: 600; color: var(--text-secondary); }
        .risk-box.safe .risk-price { color: var(--accent-primary); }
        .risk-box.danger .risk-price { color: #f59e0b; }
        .risk-divider { font-weight: 800; color: var(--text-muted); font-size: 0.8rem; }

        /* ── INCLUDED ── */
        .included-section { margin-bottom: 80px; }
        .section-title { font-size: 1.5rem; font-weight: 800; margin-bottom: 32px; letter-spacing: -0.03em; }
        .included-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .included-item { display: flex; gap: 16px; }
        .icon-wrap {
          width: 40px;
          height: 40px;
          background: var(--bg-tertiary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          flex-shrink: 0;
        }
        .included-label { display: block; font-size: 0.95rem; font-weight: 800; margin-bottom: 4px; }
        .included-text { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin: 0; }

        /* ── GUARANTEE ── */
        .guarantee-section { margin-bottom: 80px; }
        .guarantee-card {
          background: #ecfdf5;
          border: 1px solid #10b981;
          padding: 40px;
          border-radius: 24px;
          display: flex;
          gap: 32px;
          align-items: center;
        }
        .guarantee-seal { color: #10b981; }
        .guarantee-content h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 8px; color: #065f46; }
        .guarantee-content p { font-size: 0.95rem; line-height: 1.6; color: #065f46; margin: 0; font-weight: 500; }

        /* ── TESTIMONIALS ── */
        .testimonials-section { margin-bottom: 80px; }
        .testimonials-list { display: flex; flex-direction: column; gap: 24px; }
        .testi-card { background: #fff; padding: 32px; border-radius: 24px; border: 1px solid #e2e8f0; }
        .testi-stars { color: #f59e0b; display: flex; gap: 2px; margin-bottom: 16px; }
        .testi-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 12px; }
        .testi-text { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; font-style: italic; margin-bottom: 24px; }
        .testi-user { display: flex; align-items: center; gap: 12px; border-top: 1px solid #f1f5f9; padding-top: 20px; }
        .testi-avatar { width: 44px; height: 44px; background: var(--text-primary); color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; }
        .testi-name { font-size: 0.95rem; font-weight: 800; }
        .testi-meta { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }

        /* ── SOURCES ── */
        .sources-section { background: #fff; padding: 48px; border-radius: 32px; border: 1px solid #e2e8f0; margin-bottom: 40px; }
        .sources-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }
        .source-item { display: flex; flex-direction: column; gap: 4px; }
        .source-name { font-size: 0.95rem; font-weight: 900; color: var(--text-primary); }
        .source-detail { font-size: 0.75rem; color: var(--text-muted); line-height: 1.3; }
        .disclaimer { font-size: 0.8rem; color: var(--text-muted); line-height: 1.5; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 24px; }

        /* ── SIDEBAR ── */
        .sticky-sidebar { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 24px; }
        .sidebar-title { font-size: 1rem; font-weight: 800; margin-bottom: 20px; color: var(--text-primary); letter-spacing: -0.02em; }
        
        /* Plan Selector */
        .plan-selector { background: #fff; padding: 24px; border-radius: 24px; border: 1px solid #e2e8f0; }
        .plan-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border: 2px solid #f1f5f9;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 12px;
          position: relative;
        }
        .plan-card:hover { border-color: #cbd5e1; }
        .plan-card.active { border-color: var(--accent-primary); background: #f0fdf4; }
        .plan-radio .radio-outer { width: 20px; height: 20px; border: 2px solid #cbd5e1; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .plan-card.active .radio-outer { border-color: var(--accent-primary); }
        .radio-inner { width: 10px; height: 10px; background: var(--accent-primary); border-radius: 50%; }
        
        .plan-info { flex: 1; }
        .plan-name { font-size: 0.95rem; font-weight: 800; margin-bottom: 2px; }
        .plan-desc { font-size: 0.75rem; color: var(--text-muted); }
        
        .plan-price-wrap { text-align: right; }
        .price-old { display: block; font-size: 0.75rem; color: var(--text-muted); text-decoration: line-through; }
        .price-new { font-size: 1.1rem; font-weight: 900; color: var(--text-primary); }
        
        .best-value { border-color: #e2e8f0; }
        .badge-best {
          position: absolute;
          top: -10px;
          right: 20px;
          background: var(--text-primary);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Value Stack */
        .value-stack { background: var(--text-primary); color: #fff; padding: 28px; border-radius: 24px; }
        .value-stack .sidebar-title { color: #fff; }
        .stack-list { list-style: none; padding: 0; margin: 0 0 20px; }
        .stack-list li { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; margin-bottom: 12px; color: rgba(255,255,255,0.8); }
        .stack-list li strong { color: var(--accent-primary); }
        .value-context { font-size: 0.75rem; color: rgba(255,255,255,0.4); line-height: 1.5; margin: 0; }

        /* Summary & CTA */
        .summary-card { background: #fff; padding: 32px; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
        .summary-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; font-size: 1rem; font-weight: 600; }
        .total-amount { font-size: 1.75rem; font-weight: 900; color: var(--text-primary); }
        
        .cta-button {
          width: 100%;
          background: var(--accent-primary);
          color: #fff;
          border: none;
          padding: 20px;
          border-radius: 16px;
          font-size: 1.1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 10px 20px -5px rgba(16, 185, 129, 0.3);
          margin-bottom: 20px;
        }
        .cta-button:hover { background: var(--accent-primary-hover); transform: translateY(-2px); }
        .cta-button.secondary { background: #fff; color: var(--text-primary); width: auto; padding: 16px 40px; margin: 0 auto; box-shadow: none; border: 1px solid #e2e8f0; }

        .security-badges { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .sec-item { display: flex; align-items: center; gap: 4px; font-size: 0.65rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }

        .sidebar-footer { display: flex; flex-direction: column; gap: 12px; padding: 0 20px; }
        .metric-item { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-secondary); font-weight: 600; }

        /* ── FOOTER CTA ── */
        .checkout-footer { background: #fff; border-top: 1px solid #e2e8f0; padding: 80px 0; text-align: center; }
        .footer-content h3 { font-size: 2rem; font-weight: 900; margin-bottom: 16px; letter-spacing: -0.04em; }
        .footer-content p { font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 32px; line-height: 1.5; font-weight: 500; }

        @media (max-width: 992px) {
          .grid-layout { grid-template-columns: 1fr; gap: 40px; }
          .checkout-sidebar { order: -1; }
          .sticky-sidebar { position: static; }
          .hero-section { text-align: center; }
          .hero-copy { margin: 0 auto 40px; }
          .risk-visual { max-width: 500px; margin: 0 auto; }
        }

        @media (max-width: 640px) {
          .included-grid { grid-template-columns: 1fr; }
          .guarantee-card { flex-direction: column; text-align: center; padding: 32px 24px; }
          .sources-grid { grid-template-columns: 1fr 1fr; }
          .hero-title { font-size: 2.25rem; }
          .hero-subtitle { font-size: 1.1rem; }
        }
      `}</style>
    </div>
  );
}
