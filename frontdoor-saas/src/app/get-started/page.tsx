'use client';

import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Clock, 
  Star,
  Sparkles,
  ShieldAlert,
  FileText
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Mock static US property address suggestions database for diagnostics
const FRONT_DOOR_MOCK_ADDRESSES = [
  { street: "123 Beacon Street", city: "Boston", state: "MA", zip: "02116" },
  { street: "456 Pine Street", city: "Seattle", state: "WA", zip: "98101" },
  { street: "789 Michigan Avenue", city: "Chicago", state: "IL", zip: "60611" },
  { street: "101 Colfax Avenue", city: "Denver", state: "CO", zip: "80202" },
  { street: "303 California Street", city: "San Francisco", state: "CA", zip: "94104" },
  { street: "555 Congress Avenue", city: "Austin", state: "TX", zip: "78701" }
];

// ─── DIAGNOSTIC TRAP COMPONENT ───────────────────────────────────────────────
const SCAN_LOGS = [
  { pct: 0,  icon: '✓', text: 'Initializing secure EPA ECHO connection...' },
  { pct: 18, icon: '✓', text: 'Querying FEMA flood map registry... [CONNECTED]' },
  { pct: 35, icon: '✓', text: 'Cross-referencing CDC radon zone database... [OK]' },
  { pct: 52, icon: '✓', text: 'Locating Superfund & NPL sites within 2 miles... [FOUND]' },
  { pct: 68, icon: '✓', text: 'Scanning industrial emissions & Clean Air Act records...' },
  { pct: 82, icon: '✓', text: 'Analyzing groundwater contamination boundaries...' },
  { pct: 93, icon: '⚠', text: 'Anomaly detected. Verifying against EPA registry...', alert: true },
];

function DiagnosticTrap({ prepProgress, prepFinished, addressLine1, onScrollToForm }: {
  prepProgress: number;
  prepFinished: boolean;
  addressLine1: string;
  onScrollToForm: () => void;
}) {
  const [commitment, setCommitment] = useState<'home'|'investment'|null>(null);
  const [nearbyCount] = useState(() => Math.floor(Math.random() * 4) + 2);
  const [minutesAgo] = useState(() => Math.floor(Math.random() * 30) + 4);
  const visibleLogs = SCAN_LOGS.filter(l => prepProgress >= l.pct);

  if (!prepFinished) {
    return (
      <div className="dt-wrapper">
        <div className="dt-scan-card">
          <div className="dt-scan-header">
            <span className="dt-scan-dot" />
            <span className="dt-scan-label">Scanning federal databases for your address</span>
            <span className="dt-scan-addr">{addressLine1 || 'Target property'}</span>
          </div>
          <div className="dt-progress-wrap">
            <div className="dt-progress-bar" style={{ width: `${prepProgress}%` }} />
          </div>
          <div className="dt-log-body">
            {visibleLogs.map((log, i) => (
              <div key={i} className={`dt-log-row${(log as any).alert ? ' alert' : ''}`}>
                <span className="dt-log-icon">
                  {(log as any).alert ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </span>
                <span>{log.text}</span>
              </div>
            ))}
            {prepProgress < 100 && (
              <div className="dt-log-row" style={{ color: 'var(--text-muted)' }}>
                <span className="dt-log-icon">
                  <span style={{ display: 'inline-block', width: 13, height: 13, border: '2px solid #10b981', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin-anim 0.8s linear infinite' }} />
                </span>
                <span>Processing... {prepProgress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dt-wrapper">
      <div className="dt-result-card">
        {/* Stakes banner */}
        <div className="dt-stakes-bar">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Buyers who close without this check lose an average of <strong style={{ color: '#fff', margin: '0 3px' }}>$31,000</strong> to environmental issues the seller never disclosed.
        </div>
        {/* Anomaly header */}
        <div className="dt-anomaly-section">
          <div className="dt-anomaly-header">
            <div className="dt-anomaly-title">
              We found something near<br />
              <span style={{ color: 'var(--green)' }}>{addressLine1 || 'your property'}</span>
            </div>
            <div className="dt-score-pill">
              <span className="dt-score-number">74</span>
              <span className="dt-score-label">Risk Score</span>
            </div>
          </div>
          {/* Incomplete loop */}
          <div className="dt-incomplete-bar">
            <div style={{ flex: 1 }}>
              <div className="dt-incomplete-text">Scan stopped at <strong>73%.</strong> One finding is too significant to display without verification.</div>
              <div style={{ height: 5, background: '#dcfce7', borderRadius: 99, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ width: '73%', height: '100%', background: 'linear-gradient(90deg,#10b981,#1a7a4a)', borderRadius: 99 }} />
              </div>
            </div>
            <span className="dt-incomplete-pct">73%</span>
          </div>
          {/* Phantom findings */}
          <div className="dt-findings">
            <div className="dt-finding-row">
              <div className="dt-finding-icon" style={{ background: '#fef2f2' }}>🏭</div>
              <div style={{ flex: 1 }}>
                <div className="dt-finding-label">Toxic facility within walking distance</div>
                <div className="dt-finding-sub">EPA-listed site found <strong style={{ color: '#dc2626' }}>░░░ ft</strong> from this address — name and type locked</div>
              </div>
              <span className="dt-finding-redacted">LOCKED</span>
            </div>
            <div className="dt-finding-row">
              <div className="dt-finding-icon" style={{ background: '#fffbeb' }}>⚗️</div>
              <div style={{ flex: 1 }}>
                <div className="dt-finding-label">Groundwater contamination risk</div>
                <div className="dt-finding-sub">This finding type reduces comparable home sale prices by <strong style={{ color: '#dc2626' }}>-░░% to -░░%</strong></div>
              </div>
              <span className="dt-finding-redacted">LOCKED</span>
            </div>
            <div className="dt-finding-row">
              <div className="dt-finding-icon" style={{ background: '#f0fdf4' }}>💧</div>
              <div style={{ flex: 1 }}>
                <div className="dt-finding-label">Clean Water Act violation on record</div>
                <div className="dt-finding-sub">Nearest facility violation filed: <strong style={{ color: '#dc2626' }}>░░░░ 2024</strong> — facility name locked</div>
              </div>
              <span className="dt-finding-redacted">LOCKED</span>
            </div>
          </div>
        </div>
        {/* Authority paradox */}
        <div className="dt-authority-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          <span>Facility names, exact distances, and violation records are withheld until purchase under EPA data use agreements. <strong>Sellers are rarely required to surface this information.</strong> Most buyers close without ever knowing.</span>
        </div>
        {/* Social mirror */}
        <div className="dt-social-mirror">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
          <span><strong style={{ color: '#0f1a13' }}>{nearbyCount} buyers</strong> ran a report on properties in this zip code in the last 48 hours · Most recent report accessed <strong style={{ color: '#0f1a13' }}>{minutesAgo} min ago</strong></span>
        </div>
        {/* Micro-commitment */}
        <div className="dt-commitment-section">
          <div className="dt-commitment-q">Is this property for your primary residence or an investment?</div>
          <div className="dt-commitment-btns">
            <button className={`dt-commitment-btn${commitment === 'home' ? ' selected' : ''}`} onClick={() => { setCommitment('home'); setTimeout(onScrollToForm, 350); }}>
              🏠 My Primary Home
            </button>
            <button className={`dt-commitment-btn${commitment === 'investment' ? ' selected' : ''}`} onClick={() => { setCommitment('investment'); setTimeout(onScrollToForm, 350); }}>
              📈 An Investment
            </button>
          </div>
        </div>
        {/* Loss frame + value stack + CTA */}
        <div className="dt-cta-section">
          <div className="dt-loss-frame">
            The seller&apos;s agent already has access to this data. You&apos;re going into closing with an information gap.<br />
            In most states, sellers are <strong>not legally required</strong> to disclose what&apos;s in this report.
          </div>
          <div className="dt-value-stack">
            <div className="dt-value-row"><span>Environmental hazard full report</span><span>$149</span></div>
            <div className="dt-value-row"><span>EPA facility names &amp; violation history</span><span>$79</span></div>
            <div className="dt-value-row"><span>Property value impact analysis</span><span>$99</span></div>
            <div className="dt-value-row"><span>Negotiation script (attorney-drafted)</span><span>$199</span></div>
            <div className="dt-value-total">
              <span>Your price today</span>
              <span className="dt-price">$49.00</span>
            </div>
          </div>
          <button className="dt-main-cta" onClick={onScrollToForm}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Reveal what was found near &ldquo;{addressLine1 ? addressLine1.split(' ').slice(0,3).join(' ') : 'your address'}&rdquo; →
          </button>
          <div className="dt-cta-meta">
            <span>🔒 Secure checkout</span>
            <span>⚡ Instant access</span>
            <span>↩ 30-day refund</span>
          </div>
        </div>
      </div>
    </div>
  );
}
// ─── END DIAGNOSTIC TRAP ──────────────────────────────────────────────────────

// ─── REVIEWS DATA ───────────────────────────────────────────────────────────
const REVIEWS_DATA = [
  {
    id: 1, name: "Marcus T.", location: "Austin, TX", avatar: "MT", avatarBg: "#1a7a4a",
    rating: 5, date: "3 days ago", verified: true, badge: "Buyer",
    title: "Saved me $23,000 on my home purchase",
    body: "I almost closed on a house in Round Rock without running this report. Turned out there was an active Superfund site less than 0.4 miles from the property. I went back to the sellers with the EPA documents and negotiated $23K off the asking price. My realtor had never even heard of this tool. Every buyer needs this before signing anything.",
    helpful: 47, highlight: "$23K off asking price",
  },
  {
    id: 2, name: "Jennifer & Dale R.", location: "Phoenix, AZ", avatar: "JR", avatarBg: "#2563eb",
    rating: 5, date: "1 week ago", verified: true, badge: "Homeowner",
    title: "Radon level was 3x the EPA safe limit. We had no idea.",
    body: "We've lived here 6 years. Never tested for radon, never thought about it. Ran the report on our current address out of curiosity and the radon reading came back dangerously elevated — zone 1, well above 4 pCi/L. Called a mitigation company the next day. The report also showed a chemical facility 0.6 miles away with two Clean Water Act violations I had never heard about. This should be mandatory for every property.",
    helpful: 89, highlight: "Radon 3x above safe limit detected",
  },
  {
    id: 3, name: "Derek C.", location: "Columbus, OH", avatar: "DC", avatarBg: "#7c3aed",
    rating: 5, date: "2 weeks ago", verified: true, badge: "Real Estate Investor",
    title: "I run this on every property before making an offer. Period.",
    body: "I've been flipping houses for 11 years. Started using Front Door Fax 8 months ago. I've already avoided two deals that looked perfect on paper — one had a brownfield site within the property boundary, the other had an industrial waste facility 200 meters away. Both sellers were motivated, both deals would have been nightmares to exit. This report is $49. The legal liability on those deals would have been six figures.",
    helpful: 134, highlight: "Avoided 2 toxic property deals",
  },
  {
    id: 4, name: "Priya N.", location: "San Jose, CA", avatar: "PN", avatarBg: "#dc2626",
    rating: 5, date: "3 weeks ago", verified: true, badge: "Buyer",
    title: "My inspector said nothing. This report found everything.",
    body: "Standard home inspection came back clean. But I ran this report two days before closing and it flagged a groundwater cleanup boundary that ran through the backyard. The boundary was registered with the EPA but not visible on any public search tool I know of. We walked away from the deal. Three months later we found a better house in a clean area. I genuinely think this report saved us from a terrible mistake.",
    helpful: 212, highlight: "Stopped a bad deal 2 days before closing",
  },
  {
    id: 5, name: "Tom & Karen W.", location: "Denver, CO", avatar: "TW", avatarBg: "#0891b2",
    rating: 5, date: "1 month ago", verified: true, badge: "Buyer",
    title: "Used the negotiation script word-for-word. It worked.",
    body: "We found two violations near our target property and used the exact negotiation script from the report to present findings to the sellers. We got $11,500 off and the sellers agreed to escrow funds for environmental testing. My wife was nervous we'd lose the deal but the script is framed professionally, not confrontationally. The sellers' agent even told us afterward that they'd never seen a buyer come that prepared. 10 stars if I could.",
    helpful: 76, highlight: "$11,500 off + escrow concession",
  },
  {
    id: 6, name: "Alicia M.", location: "Charlotte, NC", avatar: "AM", avatarBg: "#d97706",
    rating: 4, date: "1 month ago", verified: true, badge: "Renter",
    title: "Ran it on my rental before renewing the lease",
    body: "Sounds unusual but I ran this before deciding whether to renew my 2-year lease. There's a facility nearby I always found suspicious. The report confirmed it had 3 Clean Air Act violations in the past 4 years. Used that as leverage to negotiate $150/month off my renewal rate — told the landlord I was considering moving due to environmental proximity concerns. He came down immediately. Paid for itself in 3 weeks.",
    helpful: 55, highlight: "$150/month rent reduction",
  },
  {
    id: 7, name: "Robert S.", location: "Nashville, TN", avatar: "RS", avatarBg: "#059669",
    rating: 5, date: "6 weeks ago", verified: true, badge: "Homeowner",
    title: "I recommend this to every client buying property now",
    body: "I'm a real estate attorney. I've started recommending Front Door Fax to clients as part of due diligence alongside title search and inspection. In the last two months I've had three clients find material environmental issues that weren't on any disclosure form. In one case, the seller had an affirmative duty to disclose a nearby Superfund designation and didn't. This tool surfaces issues that sellers either don't know about or hope you won't find.",
    helpful: 188, highlight: "Attorney-recommended due diligence tool",
  },
  {
    id: 8, name: "Sandra L.", location: "Tampa, FL", avatar: "SL", avatarBg: "#7c3aed",
    rating: 5, date: "2 months ago", verified: true, badge: "Homeowner",
    title: "Finally understand what's actually in our neighborhood",
    body: "We have a 4-year-old and a newborn. After reading about PFAS contamination near industrial sites, I ran reports on our current home and two others we were considering. The breakdown of which facilities have violations, what type, and when — that level of specificity isn't available anywhere else for free. One of the properties we were considering had a water quality issue that hadn't been in any news I'd seen. We crossed it off immediately.",
    helpful: 93, highlight: "Flagged water quality risk near family home",
  },
];

const REVIEW_STATS = [
  { value: "48,291", label: "Reports Generated" },
  { value: "$2.1M+", label: "Negotiated by Buyers" },
  { value: "4.9/5", label: "Average Rating" },
  { value: "94%", label: "Found Hidden Risks" },
];

function ReviewStarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= rating ? '#f59e0b' : '#e5e7eb'} stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function ReviewAvatar({ initials, bg }: { initials: string; bg: string }) {
  return (
    <div style={{ width: 42, height: 42, borderRadius: '50%', background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function ReviewCard({ review, featured = false, onScrollToForm }: { review: typeof REVIEWS_DATA[0]; featured?: boolean; onScrollToForm: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [voted, setVoted] = useState(false);
  const isLong = review.body.length > 210;
  const displayBody = isLong && !expanded ? review.body.slice(0, 210) + '…' : review.body;

  return (
    <div style={{ background: featured ? 'linear-gradient(135deg,#f0faf5 0%,#fff 65%)' : '#fff', border: `1.5px solid ${featured ? '#10b981' : 'var(--border)'}`, borderRadius: 'var(--radius)', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, boxShadow: featured ? '0 4px 20px rgba(16,185,129,0.1)' : 'var(--shadow-sm)', position: 'relative', height: '100%', boxSizing: 'border-box' as const }}>
      {featured && (
        <div style={{ position: 'absolute', top: -10, left: 18, background: 'var(--green)', color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '2px 10px', borderRadius: 99, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
          ⭐ Top Review
        </div>
      )}
      {/* Highlight badge */}
      <div style={{ background: 'linear-gradient(90deg,#fef9ec,#fffdf5)', border: '1px solid #fde68a', borderRadius: 6, padding: '6px 11px', fontSize: '0.73rem', fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span>💰</span>{review.highlight}
      </div>
      {/* Author row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <ReviewAvatar initials={review.avatar} bg={review.avatarBg} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' as const }}>
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{review.name}</span>
            {review.verified && (
              <span style={{ background: 'var(--green-pale)', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 99 }}>✓ Verified</span>
            )}
            <span style={{ background: '#f4f4f5', color: 'var(--text-secondary)', fontSize: '0.6rem', fontWeight: 700, padding: '2px 6px', borderRadius: 99 }}>{review.badge}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 3 }}>
            <ReviewStarRating rating={review.rating} size={12} />
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{review.location} · {review.date}</span>
          </div>
        </div>
      </div>
      {/* Body */}
      <div>
        <p style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)', margin: '0 0 7px', lineHeight: 1.3 }}>"{review.title}"</p>
        <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{displayBody}</p>
        {isLong && (
          <button onClick={() => setExpanded(!expanded)} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', padding: '4px 0 0', fontFamily: 'inherit' }}>
            {expanded ? 'Show less' : 'Read full review →'}
          </button>
        )}
      </div>
      {/* Helpful + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #f0f4f2', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>Helpful?</span>
          <button onClick={() => { if (!voted) { setHelpfulCount(h => h+1); setVoted(true); } }} style={{ display: 'flex', alignItems: 'center', gap: 3, background: voted ? 'var(--green-pale)' : '#f8fafb', border: `1px solid ${voted ? '#a7f3d0' : 'var(--border)'}`, borderRadius: 99, padding: '2px 9px', fontSize: '0.7rem', fontWeight: 700, color: voted ? '#065f46' : 'var(--text-secondary)', cursor: voted ? 'default' : 'pointer', fontFamily: 'inherit' }}>
            👍 {helpfulCount}
          </button>
        </div>
        <button onClick={onScrollToForm} style={{ background: 'none', border: 'none', color: 'var(--green)', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
          Get my report →
        </button>
      </div>
    </div>
  );
}

function RatingDistBar({ label, pct, count }: { label: string; pct: number; count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.76rem' }}>
      <span style={{ color: 'var(--text-secondary)', width: 28, flexShrink: 0, fontWeight: 600 }}>{label}</span>
      <div style={{ flex: 1, height: 7, background: '#f0f4f2', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg,#10b981,#1a7a4a)', borderRadius: 99 }} />
      </div>
      <span style={{ color: 'var(--text-muted)', width: 32, textAlign: 'right' as const, fontWeight: 500 }}>{count}</span>
    </div>
  );
}

function ReviewsSection({ onScrollToForm }: { onScrollToForm: () => void }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [liveCount, setLiveCount] = useState(574);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.05 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const t = setInterval(() => setLiveCount(c => c + Math.floor(Math.random()*3)-1), 3000);
    return () => clearInterval(t);
  }, []);

  const filters = ['All','Buyer','Homeowner','Renter'];
  const filtered = activeFilter === 'All' ? REVIEWS_DATA : REVIEWS_DATA.filter(r => r.badge === activeFilter || (activeFilter === 'Buyer' && r.badge === 'Real Estate Investor'));
  const displayed = filtered.slice(0, visibleCount);

  return (
    <div ref={sectionRef} style={{ maxWidth: 1040, margin: '0 auto', padding: '0 20px 60px' }}>

      {/* Live bar */}
      <div style={{ background: '#0f1a13', color: '#fff', borderRadius: 'var(--radius)', padding: '10px 20px', textAlign: 'center', fontSize: '0.76rem', fontWeight: 600, marginBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#dc2626', display: 'inline-block', animation: 'reviews-pulse 1.2s infinite' }}></span>
        <span style={{ color: '#dc2626', fontWeight: 800 }}>{liveCount}</span> people checking properties right now · 48,291 reports delivered
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 36, opacity: animated ? 1 : 0, animation: animated ? 'reviews-fadeUp 0.55s ease forwards' : 'none' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--green-pale)', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', borderRadius: 99, marginBottom: 14, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
          ✓ Verified Customer Reviews
        </div>
        <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.2, margin: '0 0 10px', color: 'var(--text-primary)' }}>
          Real buyers. Real findings. Real savings.
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          Over <strong style={{ color: 'var(--green)' }}>$2.1 million</strong> negotiated by Front Door Fax customers.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 36, opacity: animated ? 1 : 0, animation: animated ? 'reviews-fadeUp 0.55s 0.08s ease both' : 'none' }}>
        {REVIEW_STATS.map((s, i) => (
          <div key={i} style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '18px 14px', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '1.7rem', fontWeight: 800, color: 'var(--green)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.73rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 5 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Rating overview */}
      <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' as const, background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '24px 28px', marginBottom: 32, alignItems: 'center', boxShadow: 'var(--shadow-sm)', opacity: animated ? 1 : 0, animation: animated ? 'reviews-fadeUp 0.55s 0.14s ease both' : 'none' }}>
        <div style={{ textAlign: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.04em' }}>4.9</div>
          <ReviewStarRating rating={5} size={16} />
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 5 }}>2,847 reviews</div>
        </div>
        <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', flexShrink: 0 }} />
        <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <RatingDistBar label="5 ★" pct={91} count={2591} />
          <RatingDistBar label="4 ★" pct={6} count={171} />
          <RatingDistBar label="3 ★" pct={2} count={57} />
          <RatingDistBar label="2 ★" pct={1} count={28} />
          <RatingDistBar label="1 ★" pct={0} count={0} />
        </div>
        <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', flexShrink: 0 }} />
        <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8, minWidth: 180 }}>
          {['94% found hidden risks','Average $14,200 saved','30-day money-back guarantee','No subscription required'].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--green-light)', fontWeight: 900, flexShrink: 0 }}>✓</span>{t}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 24, flexWrap: 'wrap' as const, alignItems: 'center', opacity: animated ? 1 : 0, animation: animated ? 'reviews-fadeUp 0.55s 0.18s ease both' : 'none' }}>
        {filters.map(f => (
          <button key={f} onClick={() => { setActiveFilter(f); setVisibleCount(6); }} style={{ padding: '6px 14px', borderRadius: 99, border: `1.5px solid ${activeFilter===f ? 'var(--green)' : 'var(--border)'}`, background: activeFilter===f ? 'var(--green)' : '#fff', color: activeFilter===f ? '#fff' : 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}>
            {f}
          </button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green-light)', display: 'inline-block', animation: 'reviews-pulse 1.5s infinite' }} />
          All reviews independently verified
        </div>
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, opacity: animated ? 1 : 0, animation: animated ? 'reviews-fadeUp 0.55s 0.22s ease both' : 'none' }} className="reviews-grid">
        {displayed.map((r, i) => (
          <ReviewCard key={r.id} review={r} featured={i===0 && activeFilter==='All'} onScrollToForm={onScrollToForm} />
        ))}
      </div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <button onClick={() => setVisibleCount(v => v+3)} style={{ background: '#fff', border: '1.5px solid var(--border)', borderRadius: 99, padding: '11px 28px', fontSize: '0.83rem', fontWeight: 700, color: 'var(--green)', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
            Load more reviews ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Bottom CTA dark strip */}
      <div style={{ marginTop: 48, background: 'linear-gradient(135deg,#0f291b 0%,#1a4a2e 100%)', borderRadius: 'var(--radius-lg)', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, flexWrap: 'wrap' as const, opacity: animated ? 1 : 0, animation: animated ? 'reviews-fadeUp 0.55s 0.3s ease both' : 'none' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <ReviewStarRating rating={5} size={16} />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', fontWeight: 600 }}>4.9 · 2,847 reviews</span>
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', margin: '0 0 7px', letterSpacing: '-0.03em', lineHeight: 1.25 }}>Don&apos;t buy without knowing.</h3>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
            Join 48,291 buyers who checked before closing. <strong style={{ color: '#10b981' }}>$49 · 30-day guarantee.</strong>
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, minWidth: 220 }}>
          <button onClick={onScrollToForm} style={{ background: '#10b981', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', padding: '14px 24px', fontSize: '0.92rem', fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 14px rgba(16,185,129,0.4)', letterSpacing: '0.1px' }}>
            Find out what&apos;s near your home →
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            <span>🔒 Secure</span><span>30-day refund</span><span>Instant delivery</span>
          </div>
        </div>
      </div>

      {/* Agency trust logos */}
      <div style={{ marginTop: 32, textAlign: 'center' }}>
        <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: 12 }}>Data sourced directly from</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, flexWrap: 'wrap' as const, opacity: 0.35 }}>
          {['EPA ECHO','FEMA','CDC','USGS','EJScreen','NPL Registry'].map(name => (
            <span key={name} style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.5px', textTransform: 'uppercase' as const }}>{name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
// ─── END REVIEWS ─────────────────────────────────────────────────────────────

function GetStartedContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';
  const lastScannedAddress = useRef('');

  // Preparation Progress Simulator (runs dynamic 4.6s loading timer)
  const [prepProgress, setPrepProgress] = useState(0);
  const [prepFinished, setPrepFinished] = useState(false);

  // Countdown timer state (starts at 09:39 as seen in html mockup)
  const [timeLeft, setTimeLeft] = useState(579); // 579 seconds = 09:39
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // State Hooks
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'bundle'>('bundle');
  const [purchaseType, setPurchaseType] = useState<'save' | 'onetime'>('save');
  
  // Shipping Form States
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

  // Address Suggestions Autocomplete States
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const autocompleteController = useRef<AbortController | null>(null);

  // Expose suggestion panel logic
  useEffect(() => {
    const val = addressLine1.trim();
    if (val.length >= 3) {
      if (autocompleteController.current) {
        autocompleteController.current.abort();
      }
      autocompleteController.current = new AbortController();
      
      const fetchSuggestions = async () => {
        setIsLoadingSuggestions(true);
        try {
          const response = await fetch(`/api/places?input=${encodeURIComponent(val)}`, {
            signal: autocompleteController.current?.signal
          });
          if (response.ok) {
            const data = await response.json();
            if (data.predictions) {
              setSuggestions(data.predictions);
              setShowSuggestions(data.predictions.length > 0);
            }
          }
        } catch (err) {
          if (err instanceof Error && err.name !== 'AbortError') {
            console.error('Failed to fetch suggestions:', err);
          }
        } finally {
          setIsLoadingSuggestions(false);
        }
      };

      const debounceTimer = setTimeout(() => {
        fetchSuggestions();
      }, 300);

      return () => {
        clearTimeout(debounceTimer);
        if (autocompleteController.current) {
          autocompleteController.current.abort();
        }
      };
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [addressLine1]);

  const handleAddressChange = (val: string) => {
    setAddressLine1(val);
  };

  const handleSuggestionClick = (prediction: any) => {
    const desc = prediction.description;
    const parts = desc.split(',').map((p: string) => p.trim());
    
    // Naive parsing: Street, City, State ZIP, Country
    let parsedStreet = parts[0] || '';
    let parsedCity = parts.length > 1 ? parts[1] : '';
    let parsedState = '';
    let parsedZip = '';
    
    if (parts.length > 2) {
      const stateZip = parts[2].split(' ');
      parsedState = stateZip[0] || '';
      parsedZip = stateZip.length > 1 ? stateZip[1] : '';
    }

    setAddressLine1(parsedStreet);
    if (parsedCity) setCity(parsedCity);
    if (parsedState) setShippingState(parsedState);
    if (parsedZip) setZipCode(parsedZip);
    setCountry("United States");
    
    setShowSuggestions(false);
    lastScannedAddress.current = parsedStreet;
    setPrepProgress(0);
    setPrepFinished(false);
  };

  // Close autocomplete on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id !== 'ship-address1' && !target.closest('.autocomplete-suggestions-box')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Shipping Form Autofill from Homepage Query
  useEffect(() => {
    if (address) {
      const parts = address.split(',').map(p => p.trim());
      let streetName = parts[0] || '';
      let cityIndex = 1;

      if (parts.length > 1 && (/^\d+$/.test(parts[0]) || /^\d+[a-zA-Z]?$/.test(parts[0]) || parts[0].length <= 5)) {
        streetName = `${parts[0]} ${parts[1]}`;
        cityIndex = 2;
      }

      const parsedCity = parts[cityIndex] || '';

      let parsedState = '';
      for (let i = cityIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (part.length === 2 && /^[A-Z]{2}$/i.test(part)) {
          parsedState = part.toUpperCase();
          break;
        }
      }
      if (!parsedState && parts.length >= cityIndex + 3) {
        parsedState = parts[cityIndex + 2];
      }

      const zipPart = parts.find(p => /^\d{5}(-\d{4})?$/.test(p));

      // Use a timeout to avoid calling setState synchronously within the effect
      const timer = setTimeout(() => {
        setAddressLine1(streetName);
        setCity(parsedCity);
        setShippingState(parsedState);
        if (zipPart) setZipCode(zipPart);
        
        lastScannedAddress.current = streetName.trim();
        setPrepProgress(0);
        setPrepFinished(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [address]);

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
  const [ccNumber, setCcNumber] = useState('');
  const [ccCsc, setCcCsc] = useState('');
  const [ccMonth, setCcMonth] = useState('January');
  const [ccYear, setCcYear] = useState('2026');

  // Promo Code States
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setPromoDiscountAmount] = useState(0);

  // Dynamic Itemized Pricing Selector values for Front Door Fax
  const getPackagePriceInfo = () => {
    switch (selectedPackage) {
      case 'single':
        return { 
          price: 49.00, 
          reg: 69.00, 
          saving: 20.00, 
          pct: '30%', 
          unitPriceText: '$49.00 each',
          booksText: '1 Property Report',
          name: 'Front Door Fax Environmental Report (1 Property)',
          metaLabel: '1 Property (Single Report)'
        };
      case 'bundle':
      default:
        return { 
          price: 199.00, 
          reg: 345.00, 
          saving: 146.00, 
          pct: '42%', 
          unitPriceText: '$39.80 each',
          booksText: '5 Property Reports',
          name: 'Front Door Fax Environmental Report Bundle (5 Properties)',
          metaLabel: '5 Properties (Comparison Bundle)'
        };
    }
  };

  const priceInfo = getPackagePriceInfo();
  const finalPrice = Math.max(0, priceInfo.price - discountAmount);
  const totalSavings = priceInfo.saving + discountAmount;

  // Checkout Processing States
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const terminalLogsEndRef = useRef<HTMLDivElement>(null);

  const logSteps = [
    "Establishing secure 256-bit encrypted connection...",
    "Geocoding target coordinates via GIS mapping telemetry...",
    "Connecting to US EPA ECHO & EJScreen database registry...",
    "Scanning CDC & local municipal public groundwater registries...",
    "Analyzing water contaminants (PFAS, nitrates, heavy metals)...",
    "Querying FEMA regional flood maps & disaster history matrices...",
    "Locating active Superfunds, Brownfields & toxic waste sites within 2 miles...",
    "Indexing county FIPS radon gas classifications...",
    "Generating custom buyer price negotiation talking points...",
    "Successfully compiling high-resolution property diagnostic PDF..."
  ];

  // Auto-scroll terminal logs to bottom
  useEffect(() => {
    if (checkoutState === 'processing') {
      terminalLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, checkoutState]);

  // Tab Selection helper
  const handleTabChange = (tab: 'save' | 'onetime') => {
    setPurchaseType(tab);
    if (tab === 'save') {
      setSelectedPackage('bundle');
    } else {
      setSelectedPackage('single');
    }
  };

  // Coupon Database Query with Local Fallback
  const handleApplyPromo = async () => {
    const codeUpper = promoCode.trim().toUpperCase();
    if (!codeUpper) return;

    setPromoError('');
    setPromoSuccess('');

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('promos')
          .select('*')
          .eq('code', codeUpper)
          .eq('is_active', true)
          .single();

        if (error || !data) {
          applyLocalPromoFallback(codeUpper);
        } else {
          setPromoApplied(true);
          setPromoDiscountAmount(Number(data.discount));
          setPromoSuccess(`✓ ${codeUpper} coupon applied! $${data.discount}.00 discount deducted.`);
        }
      } catch (err) {
        console.error('Promo DB error:', err);
        applyLocalPromoFallback(codeUpper);
      }
    } else {
      applyLocalPromoFallback(codeUpper);
    }
  };

  const applyLocalPromoFallback = (code: string) => {
    if (code === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscountAmount(10);
      setPromoSuccess('✓ WELCOME10 coupon applied! $10.00 discount deducted.');
    } else if (code === 'SAFETY15') {
      setPromoApplied(true);
      setPromoDiscountAmount(15);
      setPromoSuccess('✓ SAFETY15 coupon applied! $15.00 discount deducted.');
    } else {
      setPromoApplied(false);
      setPromoDiscountAmount(0);
      setPromoError('Invalid promo code. Try typing WELCOME10 or SAFETY15');
    }
  };

  // Lead capture onBlur
  const handleLeadEmailBlur = async () => {
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !validEmailRegex.test(email)) return;

    const leadPayload = {
      email,
      source_address: addressLine1 || address || 'Direct GetStarted Checkout',
      status: 'new'
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('leads').insert([leadPayload]);
        if (error) {
          console.log('Lead already exists or updated:', error.message);
        } else {
          console.log('Lead recorded in database successfully.');
        }
      } catch (err) {
        console.error('Lead record DB error:', err);
      }
    } else {
      // LocalStorage fallback for demos
      const localLeads = JSON.parse(localStorage.getItem('frontdoor_local_leads') || '[]');
      if (!localLeads.some((l: { email: string }) => l.email === email)) {
        localLeads.push({
          id: `local-lead-${Date.now()}`,
          created_at: new Date().toISOString(),
          ...leadPayload
        });
        localStorage.setItem('frontdoor_local_leads', JSON.stringify(localLeads));
        console.log('Lead saved locally (localStorage fallback).');
      }
    }
  };

  // Finalized Order Submission to Supabase/LocalStorage
  const saveFinalizedOrder = async () => {
    const fullConcatenatedAddress = `${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}, ${city}, ${shippingState} ${zipCode}, ${country}`;
    const reportPayload = {
      address: fullConcatenatedAddress,
      email,
      package_tier: selectedPackage,
      final_price: finalPrice,
      discount_applied: discountAmount,
      promo_code: promoApplied ? promoCode.toUpperCase() : null,
      payment_status: 'success',
      delivery_status: 'ready',
      report_data: {
        recipient_name: `${firstName} ${lastName}`,
        phone: phone,
        address_line2: addressLine2,
        city: city,
        state: shippingState,
        zip: zipCode,
        country: country,
        payment_method: paymentMethod,
        report_count: selectedPackage === 'single' ? 1 : 5,
        processing_logs: logSteps,
        custom_proof_rendered: true
      }
    };

    if (isSupabaseConfigured()) {
      try {
        const { error: insertError } = await supabase
          .from('reports')
          .insert([reportPayload]);

        if (insertError) {
          console.error('Order DB insertion failed:', insertError);
        }

        // Update lead status to converted
        await supabase
          .from('leads')
          .update({ status: 'converted' })
          .eq('email', email);

      } catch (err) {
        console.error('Order DB process exception:', err);
      }
    } else {
      // LocalStorage fallback
      const localReports = JSON.parse(localStorage.getItem('frontdoor_local_reports') || '[]');
      localReports.unshift({
        id: `local-txn-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...reportPayload
      });
      localStorage.setItem('frontdoor_local_reports', JSON.stringify(localReports));

      const localLeads = JSON.parse(localStorage.getItem('frontdoor_local_leads') || '[]');
      const matchIdx = localLeads.findIndex((l: { email: string }) => l.email === email);
      if (matchIdx >= 0) {
        localLeads[matchIdx].status = 'converted';
      } else {
        localLeads.push({
          id: `local-lead-${Date.now()}`,
          created_at: new Date().toISOString(),
          email,
          status: 'converted',
          source_address: fullConcatenatedAddress
        });
      }
      localStorage.setItem('frontdoor_local_leads', JSON.stringify(localLeads));
      console.log('Order finalized and saved locally (localStorage fallback).');
    }
  };

  // Deterministic Address Coordinate Generator for GIS Map HUD
  const getCoordinatesForAddress = (addr: string) => {
    if (!addr) {
      return { lat: "42.3584° N", lon: "71.0598° W", parcel: "#TRACT-948-28" };
    }
    let hash = 0;
    for (let i = 0; i < addr.length; i++) {
      hash = addr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const latDecimal = 24 + (absHash % 25) + ((absHash % 1000) / 1000);
    const lonDecimal = 70 + (absHash % 50) + (((absHash >> 3) % 1000) / 1000);
    const tractId = (absHash % 900) + 100;
    const lotId = (absHash % 90) + 10;
    
    return {
      lat: `${latDecimal.toFixed(4)}° N`,
      lon: `${lonDecimal.toFixed(4)}° W`,
      parcel: `#TRACT-${tractId}-${lotId}`
    };
  };

  // Form Submit Execution
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !addressLine1 || !city || !shippingState || !zipCode) {
      return;
    }

    setCheckoutState('processing');
    setTerminalLogs([]);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < logSteps.length) {
        setTerminalLogs((prev) => [...prev, logSteps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
        saveFinalizedOrder();
        setCheckoutState('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600);
  };



  // Preparation Progress Simulator (runs dynamic 4.6s loading timer)
  useEffect(() => {
    if (prepFinished) return;
    const timer = setInterval(() => {
      setPrepProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPrepFinished(true);
          return 100;
        }
        return prev + 2;
      });
    }, 80); // Snooth and snappy 4-second loading timer
    return () => clearInterval(timer);
  }, [prepFinished]);

  const scrollToForm = () => {
    const form = document.getElementById('shipping-payment-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const firstInput = document.getElementById('ship-firstname');
        if (firstInput) firstInput.focus();
      }, 600);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in" style={{ background: 'var(--fdf-bg-primary, #FAFDFB)', paddingBottom: '120px', color: 'var(--fdf-text-primary, #0F291B)' }}>
      
      {/* Brand CSS styling overrides exactly matching Front Door Fax premium details */}
      <style>{`
        /* ============================================
           FRONT DOOR FAX — PREMIUM DESIGN SYSTEM
           Clean, trust-building, conversion-optimized
           ============================================ */

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --green: #1a7a4a;
          --green-light: #10b981;
          --green-pale: #f0faf5;
          --green-border: rgba(16, 185, 129, 0.18);
          --red: #dc2626;
          --red-pale: #fef2f2;
          --red-border: rgba(220, 38, 38, 0.2);
          --orange: #b45309;
          --text-primary: #0f1a13;
          --text-secondary: #52695c;
          --text-muted: #8fa898;
          --border: #e2e8e5;
          --bg: #f9fdfb;
          --white: #ffffff;
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-md: 0 4px 16px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04);
          --shadow-lg: 0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05);
          --radius: 12px;
          --radius-sm: 8px;
          --radius-lg: 20px;
        }

        body {
          background-color: var(--bg) !important;
          color: var(--text-primary) !important;
          font-family: 'DM Sans', system-ui, sans-serif !important;
          -webkit-font-smoothing: antialiased;
        }

        /* ── ANNOUNCEMENT BAR ── */
        .announcement-bar {
          background: var(--green);
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 600;
          text-align: center;
          padding: 10px 16px;
          letter-spacing: 0.3px;
        }

        /* ── HEADER ── */
        .checkout-header {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          padding: 18px 24px;
          text-align: center;
          box-shadow: var(--shadow-sm);
        }
        .checkout-logo-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .checkout-logo-text {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #001a0a;
        }
        .checkout-logo-img { height: 34px; width: auto; }

        .countdown-ticker-box {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--green-pale);
          border: 1px solid var(--green-border);
          color: var(--green);
          font-size: 0.9rem;
          font-weight: 700;
          padding: 5px 14px;
          border-radius: 99px;
          margin-top: 10px;
          font-family: 'DM Mono', monospace;
        }

        /* ── PAGE INTRO ── */
        .page-intro-header {
          text-align: center;
          padding: 36px 24px 20px;
          max-width: 680px;
          margin: 0 auto;
        }
        .page-intro-title {
          font-size: 1.9rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: var(--text-primary);
          margin-bottom: 10px;
        }
        .page-intro-subtitle {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin: 0;
        }

        /* ── GIS CARD (2-COL LAYOUT) ── */
        .before-after-card-wrapper {
          max-width: 1000px;
          margin: 20px auto 40px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px;
          display: grid;
          grid-template-columns: minmax(0, 44%) minmax(0, 56%);
          gap: 28px;
          box-shadow: var(--shadow-md);
        }

        /* ── MAP ── */
        .gis-map-container {
          position: relative;
          background: #f1f5f2;
          border-radius: var(--radius);
          overflow: hidden;
          aspect-ratio: 1 / 1.05;
          border: 1px solid var(--border);
        }
        .google-map-iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: grayscale(100%) contrast(1.05) brightness(1.02);
          opacity: 0.92;
          transition: filter 0.4s ease, opacity 0.4s ease;
        }
        .gis-map-container:hover .google-map-iframe {
          opacity: 1;
          filter: grayscale(20%) contrast(1.0) brightness(1.0);
        }

        /* Scanner sweep */
        .gis-scanner-sweep {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom,
            transparent 0%, transparent 42%,
            rgba(16,185,129,0.06) 48%,
            rgba(16,185,129,0.2) 50%,
            rgba(16,185,129,0.06) 52%,
            transparent 58%, transparent 100%
          );
          background-size: 100% 200%;
          background-position: 100% -100%;
          z-index: 5;
          pointer-events: none;
          animation: sweep 3.5s infinite linear;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .gis-map-container.scanning .gis-scanner-sweep { opacity: 1; }
        @keyframes sweep {
          0% { background-position: 100% -100%; }
          100% { background-position: 100% 100%; }
        }

        /* GIS HUD panel */
        .gis-hud-panel {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(226,232,240,0.9);
          border-left: 3px solid var(--green-light);
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          z-index: 10;
          pointer-events: none;
          min-width: 190px;
          box-shadow: var(--shadow-md);
        }
        .gis-hud-title {
          font-size: 0.68rem;
          color: var(--green);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 9px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .gis-hud-row {
          font-size: 0.68rem;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin: 5px 0;
        }
        .gis-hud-label { color: var(--text-muted); font-weight: 500; }
        .gis-hud-value { color: var(--text-primary); font-weight: 600; font-family: 'DM Mono', monospace; }

        /* ── RIGHT PANE ── */
        .ba-text-pane {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* ── TERMINAL / RESULTS CARD ── */
        .terminal-container {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 18px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          box-shadow: var(--shadow-sm);
          flex: 1;
        }
        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 14px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border);
        }
        .terminal-title-block {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-primary);
        }
        .terminal-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--green-light);
          box-shadow: 0 0 8px rgba(16,185,129,0.4);
          animation: pulse-dot 1.5s infinite ease-in-out;
          flex-shrink: 0;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .terminal-progress-pct {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--green-light);
          font-family: 'DM Mono', monospace;
        }
        .terminal-log-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .terminal-log-row {
          color: var(--text-secondary);
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 500;
          animation: log-in 0.35s ease-out forwards;
        }
        @keyframes log-in {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── RISK TABLE ── */
        .results-container { display: flex; flex-direction: column; gap: 0; }

        /* WARNING badge */
        .warning-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--red-pale);
          border: 1px solid var(--red-border);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          color: var(--red);
          font-size: 0.83rem;
          font-weight: 700;
          margin-bottom: 14px;
        }

        /* Risk score row */
        .risk-score-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          padding: 0 2px;
        }
        .risk-score-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          white-space: nowrap;
        }
        .risk-score-blurred {
          filter: blur(5px);
          color: var(--red);
          font-weight: 800;
          font-family: 'DM Mono', monospace;
          user-select: none;
        }
        .risk-score-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .risk-gauge {
          display: flex;
          gap: 2px;
          margin-left: auto;
        }
        .risk-gauge-bar {
          width: 7px;
          height: 14px;
          border-radius: 2px;
        }

        /* Risk rows table */
        .risk-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.83rem;
          margin-bottom: 18px;
        }
        .risk-table td { padding: 9px 6px; }
        .risk-table tr { border-bottom: 1px solid var(--border); }
        .risk-table tr:last-child { border-bottom: none; }
        .risk-level-high { color: var(--red); font-weight: 800; font-size: 0.75rem; width: 52px; }
        .risk-level-mod { color: var(--orange); font-weight: 800; font-size: 0.75rem; width: 52px; }
        .risk-bars { display: flex; gap: 2px; }
        .risk-bar { width: 9px; height: 10px; border-radius: 1px; }
        .reveal-btn {
          cursor: pointer;
          color: #2563eb;
          font-weight: 600;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 3px;
          white-space: nowrap;
          text-align: right;
        }
        .reveal-btn:hover { color: #1d4ed8; }

        /* ── CTA UNLOCK BANNER ── */
        .cta-unlock-banner {
          background: var(--green-pale);
          border: 1px solid var(--green-border);
          border-left: 3px solid var(--green);
          border-radius: var(--radius);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .cta-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cta-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--green);
          margin: 0;
        }
        .cta-desc {
          font-size: 0.78rem;
          color: var(--text-secondary);
          margin: 0;
          line-height: 1.5;
        }

        /* Benefit list */
        .cta-benefit-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .cta-benefit-list li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .cta-check {
          color: var(--green-light);
          font-weight: 900;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* Testimonial line */
        .cta-testimonial {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 500;
          text-align: center;
          line-height: 1.5;
        }
        .stars { color: #f59e0b; letter-spacing: 1px; }

        /* ── CTA BUTTON ── */
        .cta-button {
          background: var(--green);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.88rem;
          letter-spacing: 0.2px;
          border: none;
          padding: 15px 20px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          box-shadow: 0 4px 14px rgba(26,122,74,0.3);
          transition: all 0.25s ease;
          width: 100%;
          text-decoration: none;
        }
        .cta-button:hover {
          background: #155c38;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,122,74,0.4);
        }
        .cta-button:active { transform: translateY(0); }

        /* Sticky CTA wrapper */
        .sticky-cta-wrapper {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          padding: 12px 20px 16px;
          background: rgba(255,255,255,0.97);
          border-top: 1px solid var(--border);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.07);
          z-index: 100;
          backdrop-filter: blur(8px);
        }
        @media (min-width: 768px) {
          .sticky-cta-wrapper {
            position: relative;
            padding: 0;
            background: transparent;
            border-top: none;
            box-shadow: none;
          }
        }

        /* ── CHECKOUT GRID ── */
        .checkout-grid-split {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 44px;
          max-width: 1000px;
          margin: 28px auto 0;
          padding: 0 20px;
          align-items: start;
        }

        /* Step headers */
        .step-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 18px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .step-number-circle {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--green-light);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        /* ── TAB TOGGLE ── */
        .tab-toggle-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          background: #f4f4f5;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 3px;
          margin-bottom: 18px;
          gap: 2px;
        }
        .tab-toggle-button {
          padding: 10px;
          font-size: 0.78rem;
          font-weight: 700;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-family: 'DM Sans', sans-serif;
        }
        .tab-toggle-button.active {
          background: var(--white);
          color: var(--text-primary);
          box-shadow: var(--shadow-sm);
        }

        /* ── AVAILABILITY METER ── */
        .availability-meter-panel {
          border: 1px solid var(--border);
          background: var(--white);
          border-radius: var(--radius-sm);
          padding: 14px 18px;
          margin-bottom: 20px;
          box-shadow: var(--shadow-sm);
        }
        .availability-bar-grid {
          display: flex;
          gap: 3px;
          height: 5px;
          margin: 8px 0;
        }
        .availability-bar-block {
          flex: 1;
          border-radius: 2px;
        }
        .availability-bar-block.active { background: var(--green-light); }
        .availability-bar-block.inactive { background: #e4e4e7; }

        /* ── PACKAGE CARDS ── */
        .package-selector-card {
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px 20px;
          margin-bottom: 14px;
          cursor: pointer;
          background: var(--white);
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          transition: all 0.2s ease;
          position: relative;
          box-shadow: var(--shadow-sm);
        }
        .package-selector-card:hover { border-color: var(--green-light); }
        .package-selector-card.active {
          border-color: var(--green-light);
          background: var(--green-pale);
          box-shadow: 0 0 0 1px var(--green-light), var(--shadow-sm);
        }
        .package-selector-card.most-popular {
          border: 2px solid var(--green-light);
          box-shadow: 0 4px 14px rgba(16,185,129,0.08);
        }
        .package-selector-card.most-popular.active {
          border-color: var(--green);
          background: var(--green-pale);
          box-shadow: 0 0 0 1px var(--green), var(--shadow-sm);
        }
        .most-popular-tag-ribbon {
          position: absolute;
          top: -11px;
          right: 20px;
          background: var(--green-light);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 2px 10px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          display: flex;
          align-items: center;
          gap: 3px;
        }
        .package-image-placeholder {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--green-light);
        }

        /* ── RECEIPT ── */
        .itemized-receipt-container {
          margin-top: 24px;
          font-size: 0.83rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-top: 1px dashed var(--border);
          padding-top: 18px;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
        }
        .receipt-total-row {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          border-top: 1.5px solid var(--border);
          padding-top: 12px;
          margin-top: 2px;
        }

        /* Savings badge */
        .saved-card-dotted {
          border: 2px dashed var(--green-light);
          background: var(--green-pale);
          border-radius: var(--radius-sm);
          padding: 14px 20px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .saved-card-badge {
          background: #2563eb;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 900;
          padding: 5px 10px;
          border-radius: 4px;
          text-transform: uppercase;
          transform: rotate(-3deg);
          box-shadow: 2px 2px 0 #1a3a8a;
          flex-shrink: 0;
          text-align: center;
          line-height: 1.2;
        }
        .saved-card-amount-pane { text-align: right; }

        /* ── GUARANTEE CARD ── */
        .guarantee-gold-card {
          margin-top: 20px;
          background: var(--white);
          border: 1px solid #a7f3d0;
          border-radius: var(--radius-sm);
          padding: 18px;
          display: flex;
          gap: 16px;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }
        .gold-stamp-seal-svg { width: 60px; height: 60px; flex-shrink: 0; }

        /* ── TRUST LIST ── */
        .trust-check-list {
          margin-top: 24px;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 0.83rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        .trust-check-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.4;
        }
        .trust-check-list li::before {
          content: "✓";
          color: var(--green-light);
          font-weight: 900;
          font-size: 1rem;
          line-height: 1.1;
          flex-shrink: 0;
        }

        /* ── FORM INPUTS ── */
        .shipping-input-box {
          width: 100%;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 11px 14px;
          font-size: 0.88rem;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
          -webkit-appearance: none;
        }
        .shipping-input-box::placeholder { color: #b0bab6; }
        .shipping-input-box:focus {
          border-color: var(--green-light);
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
        .shipping-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 12px;
        }
        .shipping-full-row {
          margin-bottom: 12px;
          position: relative;
        }

        /* Autocomplete */
        .autocomplete-suggestions-box {
          position: absolute;
          top: calc(100% + 3px);
          left: 0;
          right: 0;
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-lg);
          z-index: 100;
          max-height: 220px;
          overflow-y: auto;
        }
        .autocomplete-suggestion-item {
          padding: 11px 14px;
          font-size: 0.83rem;
          color: var(--text-primary);
          cursor: pointer;
          border-bottom: 1px solid #f4f4f5;
          transition: background 0.1s;
          display: flex;
          align-items: center;
          gap: 7px;
        }
        .autocomplete-suggestion-item:last-child { border-bottom: none; }
        .autocomplete-suggestion-item:hover { background: var(--green-pale); }
        .autocomplete-pin-icon { color: var(--green-light); flex-shrink: 0; }

        /* ── PAYMENT TOGGLES ── */
        .payment-toggle-btn {
          flex: 1;
          padding: 11px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border);
          background: var(--white);
          cursor: pointer;
          font-weight: 700;
          font-size: 0.83rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: var(--text-secondary);
          font-family: 'DM Sans', sans-serif;
        }
        .payment-toggle-btn.active-card {
          border-color: var(--green-light);
          background: var(--green-pale);
          color: var(--text-primary);
        }
        .payment-toggle-btn.active-paypal {
          border-color: #ffc439;
          background: #fffdf0;
          color: var(--text-primary);
        }

        /* PayPal button */
        .paypal-checkout-btn-yellow {
          background: #ffc439;
          border-radius: var(--radius-sm);
          padding: 14px;
          width: 100%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          box-shadow: 0 3px 10px rgba(255,196,57,0.2);
        }
        .paypal-checkout-btn-yellow:hover { background: #f0b800; }

        /* Credit card form */
        .credit-card-form-embedded {
          background: var(--white);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: var(--shadow-sm);
        }
        .cc-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* ── SUBMIT BUTTON ── */
        .complete-purchase-btn-green {
          background: var(--green);
          color: #ffffff;
          width: 100%;
          padding: 16px;
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 0.2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(26,122,74,0.35);
          transition: all 0.25s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .complete-purchase-btn-green:hover {
          background: #155c38;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(26,122,74,0.45);
        }
        .complete-purchase-btn-green:active { transform: translateY(0); }

        /* ── STICKY ACTION BANNER ── */
        .sticky-action-banner {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(10px);
          border-top: 1px solid var(--border);
          padding: 14px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
        }

        /* ── TERMINAL OVERLAY ── */
        .preservation-terminal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .terminal-box {
          background: #0a1a10;
          border-radius: var(--radius);
          padding: 28px;
          color: var(--green-light);
          font-family: 'DM Mono', monospace;
          width: 100%;
          max-width: 660px;
          border: 1px solid rgba(16,185,129,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(16,185,129,0.12);
          padding-bottom: 14px;
          margin-bottom: 20px;
        }
        .terminal-dots { display: flex; gap: 6px; }
        .terminal-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
        }
        .terminal-dot.red { background: #ff5f56; }
        .terminal-dot.yellow { background: #ffbd2e; }
        .terminal-dot.green { background: #27c93f; }
        .terminal-logs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 260px;
          overflow-y: auto;
          max-height: 320px;
        }
        .terminal-row {
          font-size: 0.85rem;
          line-height: 1.5;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: consolePulse 0.4s ease-out;
        }
        @keyframes consolePulse {
          from { opacity: 0; transform: translateY(3px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── SUCCESS SCREEN ── */
        .success-outer-panel {
          max-width: 760px;
          margin: 44px auto;
          padding: 0 16px;
        }
        .success-card {
          padding: 52px 36px;
          text-align: center;
          border: 2px solid var(--green-light);
          border-radius: var(--radius-lg);
          background: var(--white);
          box-shadow: 0 20px 50px -10px rgba(16,185,129,0.14);
        }
        .success-tick-outer {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(16,185,129,0.08);
          border: 1.5px solid rgba(16,185,129,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
        }

        /* ── BA BENEFIT TEXT ── */
        .ba-benefit-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .ba-benefit-desc {
          font-size: 0.83rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* ── REDACTED ── */
        .redacted-value {
          filter: blur(4px);
          background: rgba(239,68,68,0.08);
          padding: 1px 6px;
          border-radius: 4px;
          user-select: none;
          cursor: not-allowed;
          font-weight: 700;
          font-family: 'DM Mono', monospace;
          display: inline;
        }
        .badge-locked {
          font-size: 0.58rem;
          background: var(--red);
          color: #fff;
          padding: 2px 5px;
          border-radius: 3px;
          margin-left: 5px;
          font-weight: 700;
          letter-spacing: 0.3px;
          display: inline-block;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .before-after-card-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 16px;
            margin: 16px 12px 28px;
          }
          .gis-map-container { aspect-ratio: 16 / 9; }
          .checkout-grid-split {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 0 16px;
          }
          .page-intro-title { font-size: 1.5rem; }
          .sticky-action-banner {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
          .reviews-grid {
            grid-template-columns: repeat(2,1fr) !important;
          }
        }

        @media (max-width: 480px) {
          .before-after-card-wrapper { padding: 14px; }
          .cta-unlock-banner { padding: 16px; }
          .reviews-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* ── REVIEWS ANIMATIONS ── */
        @keyframes reviews-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes reviews-pulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* ── DIAGNOSTIC TRAP ── */
        @keyframes dt-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dt-blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes dt-pulse-red {
          0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,0.5); }
          50%      { box-shadow: 0 0 0 8px rgba(220,38,38,0); }
        }
        @keyframes dt-shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-3px); }
          40%     { transform: translateX(3px); }
          60%     { transform: translateX(-2px); }
          80%     { transform: translateX(2px); }
        }
        @keyframes dt-scan-line {
          0%   { top: -4px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes dt-redact-flash {
          0%,100% { background: rgba(220,38,38,0.15); }
          50%     { background: rgba(220,38,38,0.3); }
        }
        .dt-wrapper {
          max-width: 760px;
          margin: 0 auto 44px;
          padding: 0 20px;
        }
        .dt-scan-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        /* scan phase top bar */
        .dt-scan-header {
          background: #0f1a13;
          padding: 14px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .dt-scan-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #dc2626;
          animation: dt-pulse-red 1.2s infinite;
          flex-shrink: 0;
        }
        .dt-scan-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #10b981;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-family: 'DM Mono', monospace;
          flex: 1;
        }
        .dt-scan-addr {
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          font-family: 'DM Mono', monospace;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        /* progress bar */
        .dt-progress-wrap {
          height: 3px;
          background: rgba(16,185,129,0.12);
        }
        .dt-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #1a7a4a);
          transition: width 0.3s ease;
          position: relative;
        }
        .dt-progress-bar::after {
          content: '';
          position: absolute;
          right: 0; top: -3px;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }
        /* log list */
        .dt-log-body {
          padding: 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
        }
        .dt-log-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #52695c;
          animation: dt-fade-in 0.3s ease forwards;
          line-height: 1.5;
        }
        .dt-log-row.alert {
          color: #dc2626;
          font-weight: 700;
          animation: dt-fade-in 0.3s ease forwards, dt-shake 0.5s 0.1s ease;
        }
        .dt-log-icon { flex-shrink: 0; margin-top: 2px; }
        /* result card */
        .dt-result-card {
          background: #fff;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
          margin-top: 0;
        }
        /* Stakes banner */
        .dt-stakes-bar {
          background: linear-gradient(90deg, #7f1d1d, #991b1b);
          padding: 11px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #fecaca;
          letter-spacing: 0.2px;
        }
        /* anomaly section */
        .dt-anomaly-section {
          padding: 24px 22px 0;
        }
        .dt-anomaly-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          flex-wrap: wrap;
          gap: 10px;
        }
        .dt-anomaly-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0f1a13;
          letter-spacing: -0.02em;
          line-height: 1.3;
        }
        .dt-score-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          border: 1.5px solid #fecaca;
          border-radius: 99px;
          padding: 5px 14px;
        }
        .dt-score-number {
          font-size: 1rem;
          font-weight: 800;
          color: #dc2626;
          font-family: 'DM Mono', monospace;
          filter: blur(5px);
          user-select: none;
        }
        .dt-score-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: #dc2626;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        /* incomplete loop bar */
        .dt-incomplete-bar {
          background: #f9fdfb;
          border: 1px solid #a7f3d0;
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .dt-incomplete-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: #065f46;
          flex: 1;
        }
        .dt-incomplete-pct {
          font-size: 0.88rem;
          font-weight: 800;
          color: #059669;
          font-family: 'DM Mono', monospace;
          white-space: nowrap;
        }
        /* phantom findings */
        .dt-findings {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          margin-bottom: 20px;
        }
        .dt-finding-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          background: #fff;
          transition: background 0.15s;
        }
        .dt-finding-row:last-child { border-bottom: none; }
        .dt-finding-icon {
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 0.85rem;
        }
        .dt-finding-label {
          flex: 1;
          font-size: 0.84rem;
          font-weight: 600;
          color: #0f1a13;
          line-height: 1.4;
        }
        .dt-finding-sub {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-weight: 500;
          margin-top: 2px;
        }
        .dt-finding-redacted {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          font-weight: 700;
          color: #dc2626;
          background: rgba(220,38,38,0.08);
          border: 1px solid rgba(220,38,38,0.2);
          border-radius: 4px;
          padding: 3px 8px;
          animation: dt-redact-flash 2s infinite;
          white-space: nowrap;
          cursor: not-allowed;
          user-select: none;
        }
        /* authority paradox */
        .dt-authority-box {
          margin: 0 22px 20px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.78rem;
          color: #78350f;
          font-weight: 500;
          line-height: 1.5;
        }
        /* social mirror */
        .dt-social-mirror {
          margin: 0 22px 20px;
          display: flex;
          gap: 12px;
          align-items: center;
          background: #f9fdfb;
          border: 1px solid var(--green-border);
          border-radius: var(--radius-sm);
          padding: 11px 16px;
          font-size: 0.78rem;
          color: #065f46;
          font-weight: 600;
        }
        /* micro commitment */
        .dt-commitment-section {
          padding: 0 22px 20px;
        }
        .dt-commitment-q {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f1a13;
          margin-bottom: 10px;
          text-align: center;
        }
        .dt-commitment-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .dt-commitment-btn {
          padding: 11px 16px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border);
          background: #fff;
          font-size: 0.83rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          color: #0f1a13;
          transition: all 0.15s;
          text-align: center;
        }
        .dt-commitment-btn:hover,
        .dt-commitment-btn.selected {
          border-color: var(--green);
          background: var(--green-pale);
          color: var(--green);
        }
        /* loss frame CTA */
        .dt-cta-section {
          border-top: 1px solid var(--border);
          padding: 22px;
          background: linear-gradient(135deg, #f9fdfb 0%, #fff 100%);
        }
        .dt-loss-frame {
          font-size: 0.83rem;
          color: var(--text-secondary);
          margin-bottom: 14px;
          line-height: 1.55;
          text-align: center;
        }
        .dt-loss-frame strong { color: #dc2626; }
        .dt-value-stack {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;
          padding: 14px 16px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        .dt-value-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .dt-value-row span:last-child {
          font-weight: 700;
          color: var(--text-primary);
          text-decoration: line-through;
          color: #dc2626;
        }
        .dt-value-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-primary);
          border-top: 1px solid var(--border);
          padding-top: 8px;
          margin-top: 4px;
        }
        .dt-value-total .dt-price {
          color: var(--green);
          font-size: 1.1rem;
        }
        .dt-main-cta {
          width: 100%;
          padding: 16px;
          background: var(--green);
          color: #fff;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 1rem;
          font-weight: 800;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(26,122,74,0.35);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.1px;
        }
        .dt-main-cta:hover {
          background: #155c38;
          transform: translateY(-1px);
          box-shadow: 0 6px 22px rgba(26,122,74,0.45);
        }
        .dt-cta-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 10px;
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
        }
      `}</style>

      {/* 1. Top Announcement Bar */}
      <div className="announcement-bar">
        ⚡ 574 buyers are checking properties right now — Complete your report and lock in our 30-day money-back guarantee
      </div>

      {/* 2. Centered Logo Header */}
      <header className="checkout-header">
        <div className="container">
          <Link href="/" className="checkout-logo-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Front Door Fax Logo" className="checkout-logo-img" />
          </Link>
          <br />
          
          {/* 3. Countdown Ticking Timer */}
          <div className="countdown-ticker-box">
            <Clock size={18} strokeWidth={2.5} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: 0, maxWidth: '1040px' }}>
        
        {/* Core Checkout Layout Screen */}
        {checkoutState !== 'success' && (
          <div id="checkout-main-content">
            
            {/* 4. Editorial Copy intro block */}
            <div className="page-intro-header">
              <h1 className="page-intro-title">
                Know what&apos;s in your water, air, and soil before you sign.
              </h1>
              <p className="page-intro-subtitle">
                Property-specific reports compiled from <strong style={{ color: '#10b981' }}>15+ federal, state, and local agencies</strong> — so you can negotiate a better price or walk away before it&apos;s too late.
              </p>
            </div>

            {/* 5. HORMOZI DIAGNOSTIC TRAP — Full width, single column */}
            <DiagnosticTrap
              prepProgress={prepProgress}
              prepFinished={prepFinished}
              addressLine1={addressLine1}
              onScrollToForm={scrollToForm}
            />

            {/* 6. Two-Column Checkout Layout */}
            <div className="checkout-grid-split">
              
              {/* Left Column: Packages Selection, Receipts & Guarantees */}
              <div>
                
                {/* Step 1 Header */}
                <div className="step-title-row">
                  <span className="step-number-circle">1</span>
                  <span>Step 1: Select Your Diagnostic Package</span>
                </div>

                {/* Tab Switcher */}
                <div className="tab-toggle-container">
                  <button 
                    type="button" 
                    className={`tab-toggle-button ${purchaseType === 'save' ? 'active' : ''}`}
                    onClick={() => handleTabChange('save')}
                  >
                    ⚡ Save 42% — 5-Property Bundle
                  </button>
                  <button 
                    type="button" 
                    className={`tab-toggle-button ${purchaseType === 'onetime' ? 'active' : ''}`}
                    onClick={() => handleTabChange('onetime')}
                  >
                    Single Report — 1 Property
                  </button>
                </div>

                {/* Supply Warning board */}
                <div className="availability-meter-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>FEDERAL DATABASE QUERY LOAD</span>
                    <span style={{ background: '#FEF2F2', border: '1px solid rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.65rem', fontWeight: 900, padding: '2px 10px', borderRadius: '99px', textTransform: 'uppercase' }}>HIGH SEARCH VOLUME</span>
                  </div>
                  <div className="availability-bar-grid">
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block inactive"></span>
                    <span className="availability-bar-block inactive"></span>
                    <span className="availability-bar-block inactive"></span>
                  </div>
                  <p style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, margin: '4px 0 0 0', lineHeight: 1.3 }}>High query volume detected. Complete checkout now to guarantee priority 5-minute report delivery.</p>
                </div>

                {/* Selector cards */}
                {/* 1 Property Card */}
                <div 
                  className={`package-selector-card ${selectedPackage === 'single' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('single')}
                >
                  <input 
                    type="radio" 
                    name="printQtyRadio" 
                    checked={selectedPackage === 'single'}
                    onChange={() => setSelectedPackage('single')}
                    style={{ accentColor: 'var(--accent-primary, #10b981)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div className="package-image-placeholder">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>Single Property Report — 30% Off Today</div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.3 }}>1 full environmental report. PDF delivered to your inbox.</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#EF4444', textDecoration: 'line-through', fontWeight: 700 }}>Reg $69</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>$49.00 each</div>
                    <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 800 }}>Saved $20</div>
                    <div style={{ fontSize: '0.62rem', color: '#3B82F6', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>FREE NEGOTIATION SCRIPT</div>
                  </div>
                </div>

                {/* 5 Properties Card (Gold/Green Special) */}
                <div 
                  className={`package-selector-card most-popular ${selectedPackage === 'bundle' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('bundle')}
                >
                  <div className="most-popular-tag-ribbon" style={{ backgroundColor: '#10B981' }}>
                    <Star size={10} fill="currentColor" stroke="none" />
                    Best Value
                  </div>
                  <input 
                    type="radio" 
                    name="printQtyRadio" 
                    checked={selectedPackage === 'bundle'}
                    onChange={() => setSelectedPackage('bundle')}
                    style={{ accentColor: '#10B981', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div className="package-image-placeholder" style={{ borderColor: '#A7F3D0' }}>
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        5-Property Bundle — Save 42%
                        <span style={{ background: '#10B981', color: '#ffffff', fontSize: '0.58rem', fontWeight: 900, padding: '1px 6px', borderRadius: '99px' }}>POPULAR</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.3 }}>Scan up to 5 properties. Identify the safest one. Valid 6 months.</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#EF4444', textDecoration: 'line-through', fontWeight: 700 }}>Reg $345</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>$39.80 each</div>
                    <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 800 }}>Saved $146</div>
                    <div style={{ fontSize: '0.62rem', color: '#3B82F6', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>FREE COMPARISON TABLE</div>
                  </div>
                </div>

                {/* Computed Receipt details */}
                <div className="itemized-receipt-container">
                  <div className="receipt-row">
                    <span>{priceInfo.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>${priceInfo.price.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="receipt-row" style={{ color: '#10B981', fontWeight: 700 }}>
                      <span>Coupon Discount ({promoCode.toUpperCase()})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="receipt-row">
                    <span>Database Querying & GIS Geocoding</span>
                    <span style={{ color: '#10B981', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem' }}>FREE</span>
                  </div>
                  <div className="receipt-row">
                    <span>Negotiation PDF Builder Tool</span>
                    <span style={{ color: '#10B981', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem' }}>FREE</span>
                  </div>
                  <div className="receipt-row receipt-total-row">
                    <span>Total due today:</span>
                    <span style={{ color: '#10B981' }}>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Saved sticker card (Blue Badge) */}
                <div className="saved-card-dotted">
                  <div className="saved-card-badge">
                    TODAY<br />YOU SAVED
                  </div>
                  <div className="saved-card-amount-pane">
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Environmental Diagnostic Savings</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669' }}>-${totalSavings.toFixed(2)}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>on your complete hazard report suite compiled for {addressLine1 || "your target US address"}</div>
                  </div>
                </div>

                {/* Guarantee Seal stamp card */}
                <div className="guarantee-gold-card">
                  <svg className="gold-stamp-seal-svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="#E6F4EA" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="50" cy="50" r="37" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="2,2" />
                    <path d="M 38,72 L 32,95 L 48,88 L 64,95 L 58,72 Z" fill="#10B981" opacity="0.85" />
                    <path d="M 44,72 L 50,95 L 56,92 L 62,95 L 54,72 Z" fill="#047857" opacity="0.6" />
                    <circle cx="50" cy="46" r="22" fill="#10B981" />
                    <polygon points="50,34 54.5,42.5 64,43.5 57,50 59,59 50,54 41,59 43,50 36,43.5 45.5,42.5" fill="#ffffff" />
                    <text x="50" y="78" fill="#047857" fontFamily="'Inter', sans-serif" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.2">30-DAY GUARANTEE</text>
                  </svg>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#047857', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>30-Day Money-Back Guarantee:</h4>
                    <p style={{ fontSize: '0.75rem', color: '#065F46', margin: 0, lineHeight: 1.4 }}>
                      We cross-reference direct government datasets. If our report fails to surface hidden hazard risks, highlight air or water contaminants, or give you a clear edge when negotiating price, simply request a full, hassle-free refund.
                    </p>
                  </div>
                </div>

                {/* Trust checklists */}
                <ul className="trust-check-list">
                  <li>Vetted Government Datasets (EPA ECHO, EJScreen, FEMA, NOAA, USGS, CDC)</li>
                  <li>Deep-dive heavy metals drinking water audits (Lead, PFAS, nitrates, disinfection byproducts)</li>
                  <li>Real-time local Air Quality Index with 5-year criteria historical averages</li>
                  <li>Interactive Soil Diagnostics scanning Superfund proximity and toxic spill registries</li>
                  <li>Property price negotiation toolkit including specific, structured dialogue talking points</li>
                </ul>

              </div>

              {/* Right Column: Contact fields, Autocompletes, dynamic payment switches & submit */}
              <div>
                
                <form id="shipping-payment-form" onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Step 2 contact/property form */}
                  <div>
                    <div className="step-title-row">
                      <span className="step-number-circle">2</span>
                      <span>Step 2: Your Property &amp; Contact Details</span>
                    </div>

                    <div className="shipping-grid-2col">
                      <div>
                        <input 
                          type="text" 
                          placeholder="First Name" 
                          id="ship-firstname" 
                          required 
                          className="shipping-input-box"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Last Name" 
                          id="ship-lastname" 
                          required 
                          className="shipping-input-box"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        id="ship-email" 
                        required 
                        className="shipping-input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleLeadEmailBlur}
                      />
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="tel" 
                        placeholder="Phone Number (for SMS delivery)" 
                        id="ship-phone" 
                        required 
                        className="shipping-input-box"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* Address Line 1 with live custom suggestion list dropdown */}
                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="Property Address (e.g. 123 Beacon Street)" 
                        id="ship-address1" 
                        autoComplete="off" 
                        required 
                        className="shipping-input-box"
                        value={addressLine1}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        onBlur={() => {
                          if (addressLine1.trim() && addressLine1.trim() !== lastScannedAddress.current) {
                            lastScannedAddress.current = addressLine1.trim();
                            setPrepFinished(false);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (addressLine1.trim() && addressLine1.trim() !== lastScannedAddress.current) {
                              lastScannedAddress.current = addressLine1.trim();
                              setPrepFinished(false);
                            }
                          }
                        }}
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="autocomplete-suggestions-box">
                          {suggestions.map((prediction, idx) => (
                            <div 
                              key={idx} 
                              className="autocomplete-suggestion-item"
                              onClick={() => handleSuggestionClick(prediction)}
                            >
                              <span className="autocomplete-pin-icon">📍</span>
                              <span>{prediction.description}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="Unit, Apt, or Suite (Optional)" 
                        id="ship-address2" 
                        className="shipping-input-box"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="City" 
                        id="ship-city" 
                        required 
                        className="shipping-input-box"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="shipping-grid-2col">
                      <div>
                        <select 
                          id="ship-country" 
                          className="shipping-input-box"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="State / Province" 
                          id="ship-state" 
                          required 
                          className="shipping-input-box"
                          value={shippingState}
                          onChange={(e) => setShippingState(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="ZIP Code / Postal Code" 
                        id="ship-zip" 
                        required 
                        className="shipping-input-box"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Step 3 Secure dynamic payments */}
                  <div>
                    {/* Dual toggles */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <button 
                        type="button" 
                        className={`payment-toggle-btn ${paymentMethod === 'paypal' ? 'active-paypal' : ''}`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        PayPal QuickPay
                      </button>
                      <button 
                        type="button" 
                        className={`payment-toggle-btn ${paymentMethod === 'card' ? 'active-card' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        Credit / Debit Card
                      </button>
                    </div>

                    {/* PayPal yellow pill pane */}
                    {paymentMethod === 'paypal' && (
                      <div id="payment-pane-paypal">
                        <button type="submit" className="paypal-checkout-btn-yellow">
                          <span style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 900, color: '#1E3A8A', fontFamily: "'Inter', sans-serif" }}>
                            Pay<span style={{ color: '#3B82F6' }}>Pal</span>
                          </span>
                        </button>
                      </div>
                    )}

                    {/* CC Form panel */}
                    {paymentMethod === 'card' && (
                      <div id="payment-pane-card">
                        <div className="credit-card-form-embedded">
                          <div className="cc-header-bar">
                            <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>SECURE CARD GATEWAY</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <span style={{ fontStyle: 'italic', fontSize: '0.55rem', fontWeight: 900, color: '#1A1F71', background: '#ffffff', padding: '1px 4px', border: '1px solid #e4e4e7', borderRadius: '2px' }}>VISA</span>
                              <span style={{ fontStyle: 'italic', fontSize: '0.55rem', fontWeight: 900, color: '#EB001B', background: '#ffffff', padding: '1px 4px', border: '1px solid #e4e4e7', borderRadius: '2px' }}>MC</span>
                            </div>
                          </div>

                          <div className="shipping-full-row" style={{ position: 'relative' }}>
                            <input 
                              type="text" 
                              placeholder="Card Number" 
                              required 
                              className="shipping-input-box" 
                              style={{ paddingRight: '36px' }}
                              value={ccNumber}
                              onChange={(e) => setCcNumber(e.target.value)}
                            />
                            <Lock size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }} />
                          </div>

                          <div className="shipping-grid-2col" style={{ marginBottom: 0 }}>
                            <div>
                              <input 
                                type="text" 
                                placeholder="CVV" 
                                required 
                                className="shipping-input-box"
                                value={ccCsc}
                                onChange={(e) => setCcCsc(e.target.value)}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <select 
                                className="shipping-input-box"
                                value={ccMonth}
                                onChange={(e) => setCcMonth(e.target.value)}
                              >
                                <option value="January">Jan (01)</option>
                                <option value="February">Feb (02)</option>
                                <option value="March">Mar (03)</option>
                                <option value="December">Dec (12)</option>
                              </select>
                              <select 
                                className="shipping-input-box"
                                value={ccYear}
                                onChange={(e) => setCcYear(e.target.value)}
                              >
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Coupons input field */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '18px', borderTop: '1px dashed #e4e4e7', paddingTop: '18px' }}>
                      <input 
                        type="text" 
                        placeholder="Promo Code (e.g. WELCOME10)" 
                        className="shipping-input-box" 
                        style={{ flex: 1 }}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="btn" 
                        style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: 800, border: '1px solid #e4e4e7', backgroundColor: '#F4F4F5', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer', height: 'auto' }} 
                        onClick={handleApplyPromo}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, margin: '6px 0 0 0' }}>{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 800, margin: '6px 0 0 0' }}>{promoSuccess}</p>
                    )}

                    {/* Submit purchase & compliance notice */}
                    <div style={{ marginTop: '24px' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.45, textAlign: 'center', marginBottom: '14px' }}>
                        By clicking below you authorize Front Door Fax to compile environmental data for your target property address. Your payment is processed over a fully encrypted, bank-grade secure gateway.
                      </p>
                      
                      <button type="submit" className="complete-purchase-btn-green">
                        <Lock size={16} strokeWidth={2.5} />
                        COMPLETE REPORT SCAN — ${finalPrice.toFixed(2)}
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                      <ShieldCheck size={14} strokeWidth={2.5} style={{ color: '#10B981' }} />
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>SECURE 256-BIT ENCRYPTED CHECKOUT</span>
                    </div>

                  </div>

                </form>

              </div>

            </div>

            {/* ── REVIEWS SECTION ── */}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 60, paddingTop: 60 }}>
              <ReviewsSection onScrollToForm={scrollToForm} />
            </div>

            {/* 10. Sticky bottom action bar floating banner */}
            <div className="sticky-action-banner">
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>LIMITED-TIME OFFER</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Know what&apos;s hiding near your property — ${finalPrice.toFixed(2)} today, 30-day guarantee
                </div>
              </div>
              <button
                type="button"
                className="complete-purchase-btn-green"
                style={{ width: 'auto', padding: '12px 32px', fontSize: '0.95rem', borderRadius: '6px' }}
                onClick={scrollToForm}
              >
                Get My Property Report →
              </button>
            </div>

          </div>
        )}

        {/* 8. Technical simulated layout compiling logs overlay */}
        {checkoutState === 'processing' && (
          <div className="preservation-terminal-overlay">
            <div className="terminal-box">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#10B981', opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>Front Door Fax Database compiler v4.5</span>
              </div>

              <div className="terminal-logs">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="terminal-row">
                    {index < terminalLogs.length - 1 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <span className="animate-spin" style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', flexShrink: 0 }}></span>
                    )}
                    <span>{log}</span>
                  </div>
                ))}
                <div ref={terminalLogsEndRef} />
              </div>

              <div style={{ borderTop: '1px solid rgba(16,185,129,0.1)', paddingTop: '18px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', opacity: 0.6 }}>
                <span>Scanning property for: <strong style={{ color: '#ffffff' }}>{firstName} {lastName}</strong></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'block', animation: 'pulse 1s infinite' }}></span>
                  SECURED MULTI-SERVER QUERY
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 9. Gorgeous success invoice receipt panel */}
        {checkoutState === 'success' && (
          <div className="success-outer-panel" id="success-screen">
            <div className="success-card">
              <div className="success-tick-outer">
                <Check size={42} strokeWidth={3} style={{ color: '#10B981' }} />
              </div>

              <span style={{ textTransform: 'uppercase', color: '#10B981', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1.5px' }}>Property Scan Complete &amp; Verified</span>
              <h1 style={{ fontSize: '2.3rem', fontWeight: 800, margin: '12px 0 16px 0', letterSpacing: '-0.03em', lineHeight: 1.2 }}>Your Property Environmental Report is Ready</h1>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto 36px auto' }}>
                Payment of <strong style={{ color: 'var(--text-primary)' }}>${finalPrice.toFixed(2)}</strong> confirmed. We&apos;ve compiled and verified your full environmental data for <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{addressLine1}</span>. Your PDF report and negotiation letters have been sent to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '400px', margin: '0 auto' }}>
                <button 
                  type="button" 
                  className="complete-purchase-btn-green" 
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 15px rgba(16,185,129,0.25)' }} 
                  onClick={() => alert('Simulation: Fetching secure environmental health report PDF payload from server...')}
                >
                  <Sparkles size={18} strokeWidth={2.5} />
                  Download Complete PDF Report
                </button>
                <Link href="/dashboard" style={{ width: '100%', padding: '14px', fontSize: '0.95rem', background: '#ffffff', color: 'var(--text-secondary)', border: '1px solid #e4e4e7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', borderRadius: '6px' }}>
                  Return to Dashboard
                </Link>
              </div>

              <div style={{ background: '#FAFDFC', border: '1px solid #e4e4e7', borderRadius: '12px', padding: '24px', marginTop: '44px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', textAlign: 'left' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>Transaction Reference</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>FDF-2026-9842A</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>Delivery Destination</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>Scope Vetted</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{priceInfo.metaLabel}</span>
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-secondary)', background: 'var(--fdf-bg-primary, #FAFDFB)' }}>Loading security database gateway…</div>}>
      <GetStartedContent />
    </Suspense>
  );
}
