'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  Mail, 
  Tag, 
  Search, 
  TrendingUp, 
  Trash2, 
  Plus, 
  CheckCircle, 
  XCircle, 
  FileText, 
  RefreshCw, 
  ShieldCheck,
  Zap,
  Check,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface Report {
  id?: string;
  created_at: string;
  address: string;
  email: string;
  package_tier: string;
  final_price: number;
  payment_status: string; // 'success', 'pending', 'failed'
  delivery_status: string; // 'ready', 'pending'
  promo_code?: string | null;
  discount_applied?: number;
}

interface Lead {
  id?: string;
  created_at: string;
  email: string;
  status: string; // 'new', 'contacted', 'converted'
  source_address?: string | null;
}

interface Promo {
  id?: string;
  created_at: string;
  code: string;
  discount: number;
  is_active: boolean;
}

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'reports' | 'leads' | 'promos'>('reports');
  const [reports, setReports] = useState<Report[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchAddress] = useState('');
  
  // New Promo Code Form State
  const [newPromoCode, setNewPromoCode] = useState('');
  const [newPromoDiscount, setNewPromoDiscount] = useState<number>(15);
  const [promoMessage, setPromoMessage] = useState('');
  const [isSubmittingPromo, setIsSubmittingPromo] = useState(false);

  // Load all tables
  const loadData = async () => {
    setLoading(true);
    if (isSupabaseConfigured()) {
      try {
        // Fetch reports
        const { data: reportData, error: rErr } = await supabase
          .from('reports')
          .select('*')
          .order('created_at', { ascending: false });
        if (rErr) console.error('Supabase reports error:', rErr);
        
        // Fetch leads
        const { data: leadData, error: lErr } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false });
        if (lErr) console.error('Supabase leads error:', lErr);

        // Fetch promos
        const { data: promoData, error: pErr } = await supabase
          .from('promos')
          .select('*')
          .order('code', { ascending: true });
        if (pErr) console.error('Supabase promos error:', pErr);

        setReports(reportData || []);
        setLeads(leadData || []);
        setPromos(promoData || []);
      } catch (err) {
        console.error('Failed to load from Supabase:', err);
        loadFromLocalStorage();
      }
    } else {
      loadFromLocalStorage();
    }
    setLoading(false);
  };

  const loadFromLocalStorage = () => {
    // Reports Fallback
    const localReports = localStorage.getItem('frontdoor_local_reports');
    if (localReports) {
      setReports(JSON.parse(localReports));
    } else {
      const defaultReports: Report[] = [
        {
          id: 'local-rep-1',
          created_at: new Date().toISOString(),
          address: '123 Mockingbird Ln, Austin, TX 78701',
          email: 'jane@example.com',
          package_tier: 'single',
          final_price: 39,
          discount_applied: 10,
          promo_code: 'WELCOME10',
          payment_status: 'success',
          delivery_status: 'ready'
        },
        {
          id: 'local-rep-2',
          created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
          address: '404 Unknown Dr, Seattle, WA 98101',
          email: 'mark@domain.com',
          package_tier: 'bundle',
          final_price: 199,
          discount_applied: 0,
          promo_code: null,
          payment_status: 'success',
          delivery_status: 'pending'
        }
      ];
      localStorage.setItem('frontdoor_local_reports', JSON.stringify(defaultReports));
      setReports(defaultReports);
    }

    // Leads Fallback
    const localLeads = localStorage.getItem('frontdoor_local_leads');
    if (localLeads) {
      setLeads(JSON.parse(localLeads));
    } else {
      const defaultLeads: Lead[] = [
        {
          id: 'local-ld-1',
          created_at: new Date().toISOString(),
          email: 'contact@investments.org',
          status: 'new',
          source_address: '742 Evergreen Terrace, Springfield'
        },
        {
          id: 'local-ld-2',
          created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
          email: 'jane@example.com',
          status: 'converted',
          source_address: '123 Mockingbird Ln, Austin, TX 78701'
        }
      ];
      localStorage.setItem('frontdoor_local_leads', JSON.stringify(defaultLeads));
      setLeads(defaultLeads);
    }

    // Promos Fallback
    const localPromos = localStorage.getItem('frontdoor_local_promos');
    if (localPromos) {
      setPromos(JSON.parse(localPromos));
    } else {
      const defaultPromos: Promo[] = [
        {
          id: 'local-pr-1',
          created_at: new Date().toISOString(),
          code: 'WELCOME10',
          discount: 10,
          is_active: true
        },
        {
          id: 'local-pr-2',
          created_at: new Date().toISOString(),
          code: 'SUPER30',
          discount: 30,
          is_active: false
        }
      ];
      localStorage.setItem('frontdoor_local_promos', JSON.stringify(defaultPromos));
      setPromos(defaultPromos);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync utilities back to localStorage or Supabase
  const updateReportState = async (id: string, updates: Partial<Report>) => {
    // Optimistic UI update
    const updatedReports = reports.map(r => r.id === id ? { ...r, ...updates } : r);
    setReports(updatedReports);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('reports')
          .update(updates)
          .eq('id', id);
        if (error) console.error('Error updating Supabase report:', error);
      } catch (err) {
        console.error('Exception updating Supabase report:', err);
      }
    } else {
      localStorage.setItem('frontdoor_local_reports', JSON.stringify(updatedReports));
    }
  };

  const updateLeadState = async (id: string, updates: Partial<Lead>) => {
    const updatedLeads = leads.map(l => l.id === id ? { ...l, ...updates } : l);
    setLeads(updatedLeads);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('leads')
          .update(updates)
          .eq('id', id);
        if (error) console.error('Error updating Supabase lead:', error);
      } catch (err) {
        console.error('Exception updating Supabase lead:', err);
      }
    } else {
      localStorage.setItem('frontdoor_local_leads', JSON.stringify(updatedLeads));
    }
  };

  const togglePromoState = async (id: string, currentActive: boolean) => {
    const updatedPromos = promos.map(p => p.id === id ? { ...p, is_active: !currentActive } : p);
    setPromos(updatedPromos);

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('promos')
          .update({ is_active: !currentActive })
          .eq('id', id);
        if (error) console.error('Error updating promo state:', error);
      } catch (err) {
        console.error('Exception updating promo state:', err);
      }
    } else {
      localStorage.setItem('frontdoor_local_promos', JSON.stringify(updatedPromos));
    }
  };

  const handleAddPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    setIsSubmittingPromo(true);
    setPromoMessage('');

    const formattedCode = newPromoCode.trim().toUpperCase();
    const newPromo: Promo = {
      code: formattedCode,
      discount: newPromoDiscount,
      is_active: true,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase
          .from('promos')
          .insert([newPromo]);

        if (error) {
          setPromoMessage(`Error: ${error.message}`);
        } else {
          setPromoMessage(`Coupon "${formattedCode}" created successfully!`);
          setPromos([...promos, newPromo]);
          setNewPromoCode('');
        }
      } catch (err) {
        console.error('Exception adding promo:', err);
        setPromoMessage('Network error occurred.');
      }
    } else {
      const current = JSON.parse(localStorage.getItem('frontdoor_local_promos') || '[]');
      if (current.some((p: Promo) => p.code === formattedCode)) {
        setPromoMessage('Coupon code already exists locally.');
      } else {
        const withId = { id: `local-pr-${Date.now()}`, ...newPromo };
        const updated = [...promos, withId];
        localStorage.setItem('frontdoor_local_promos', JSON.stringify(updated));
        setPromos(updated);
        setNewPromoCode('');
        setPromoMessage(`Success! Coupon "${formattedCode}" saved to browser storage.`);
      }
    }

    setIsSubmittingPromo(false);
  };

  const clearLocalDatabase = () => {
    if (confirm('Are you sure you want to wipe local browser storage? This will reset all simulated client reports, promo templates, and leads.')) {
      localStorage.removeItem('frontdoor_local_reports');
      localStorage.removeItem('frontdoor_local_leads');
      localStorage.removeItem('frontdoor_local_promos');
      loadFromLocalStorage();
    }
  };

  // CALCULATE LIVE METRICS
  const successfulReports = reports.filter(r => r.payment_status === 'success');
  const totalRevenue = successfulReports.reduce((sum, r) => sum + Number(r.final_price), 0);
  
  const uniqueClientsCount = Array.from(new Set([
    ...reports.map(r => r.email),
    ...leads.filter(l => l.status === 'converted').map(l => l.email)
  ])).length;

  const totalCapturedLeads = leads.length;
  const leadConversionsCount = leads.filter(l => l.status === 'converted').length;
  const conversionRate = totalCapturedLeads > 0 
    ? Math.round((leadConversionsCount / totalCapturedLeads) * 100) 
    : 0;

  const totalDiscountDeductions = successfulReports.reduce((sum, r) => sum + Number(r.discount_applied || 0), 0);

  // Filter Address Search
  const filteredReports = reports.filter(r => 
    r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLeads = leads.filter(l => 
    l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (l.source_address && l.source_address.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ padding: '48px' }} className="animate-fade-in">
      
      {/* Title Header with Connection Alert */}
      <header className="flex items-center justify-between" style={{ marginBottom: '40px' }}>
        <div>
          <div className="flex items-center" style={{ gap: '10px' }}>
            <ShieldCheck color="var(--accent-primary)" size={28} />
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>SaaS Admin Portal</h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '6px', fontSize: '1rem' }}>
            Live performance tracking, client transactions, lead records, and billing settings.
          </p>
        </div>

        {/* Database Mode Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            onClick={loadData} 
            className="btn btn-outline" 
            style={{ padding: '10px 14px', borderRadius: '12px', background: '#ffffff', display: 'flex', gap: '8px' }}
            title="Refresh database"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Reload</span>
          </button>

          {isSupabaseConfigured() ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '8px 16px', borderRadius: 'var(--border-radius-sm)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>Supabase Connected</span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '8px 16px', borderRadius: 'var(--border-radius-sm)' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6' }}>Browser Storage Fallback</span>
            </div>
          )}
        </div>
      </header>

      {/* METRICS DASHBOARD SECTION */}
      <section className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Metric Card 1 */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Total Revenue</span>
            <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.08)', color: 'var(--accent-primary)', borderRadius: '12px' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
            ${totalRevenue.toLocaleString()}
          </h2>
          <div className="flex items-center" style={{ gap: '6px', color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, marginTop: '8px' }}>
            <TrendingUp size={14} />
            <span>Mock Stripe Gateway</span>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Active Clients</span>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6', borderRadius: '12px' }}>
              <Users size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
            {uniqueClientsCount}
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 500 }}>
            Unique delivery accounts
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Lead Conversions</span>
            <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6', borderRadius: '12px' }}>
              <Mail size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
            {conversionRate}%
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 500 }}>
            {leadConversionsCount} of {totalCapturedLeads} emails checked out
          </div>
        </div>

        {/* Metric Card 4 */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 600 }}>Promo Discounts</span>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b', borderRadius: '12px' }}>
              <Tag size={20} />
            </div>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0', color: 'var(--text-primary)' }}>
            ${totalDiscountDeductions}
          </h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '8px', fontWeight: 500 }}>
            Saved by customers
          </div>
        </div>

      </section>

      {/* FILTER SEARCH INPUT AND TABS */}
      <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '20px', marginBottom: '32px' }}>
        
        {/* Navigation Tabs */}
        <div className="flex" style={{ gap: '8px', background: 'var(--bg-secondary)', padding: '6px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setActiveTab('reports')} 
            className="btn" 
            style={{ 
              padding: '8px 18px', 
              fontSize: '0.9rem', 
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'reports' ? '#ffffff' : 'transparent',
              color: activeTab === 'reports' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'reports' ? 700 : 500,
              boxShadow: activeTab === 'reports' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <FileText size={16} />
            <span>Clients &amp; Reports ({reports.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('leads')} 
            className="btn" 
            style={{ 
              padding: '8px 18px', 
              fontSize: '0.9rem', 
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'leads' ? '#ffffff' : 'transparent',
              color: activeTab === 'leads' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'leads' ? 700 : 500,
              boxShadow: activeTab === 'leads' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <Mail size={16} />
            <span>Marketing Leads ({leads.length})</span>
          </button>

          <button 
            onClick={() => setActiveTab('promos')} 
            className="btn" 
            style={{ 
              padding: '8px 18px', 
              fontSize: '0.9rem', 
              borderRadius: '12px',
              border: 'none',
              background: activeTab === 'promos' ? '#ffffff' : 'transparent',
              color: activeTab === 'promos' ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === 'promos' ? 700 : 500,
              boxShadow: activeTab === 'promos' ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            <Tag size={16} />
            <span>Promo Coupons ({promos.length})</span>
          </button>
        </div>

        {/* Global Search Address/Email */}
        {activeTab !== 'promos' && (
          <div className="flex items-center" style={{ background: '#ffffff', border: '1.5px solid var(--border-color)', borderRadius: '12px', padding: '4px 16px', width: '100%', maxWidth: '380px' }}>
            <Search size={18} color="var(--text-secondary)" />
            <input 
              type="text" 
              placeholder={`Search ${activeTab === 'reports' ? 'clients or addresses' : 'lead emails'}...`} 
              value={searchQuery}
              onChange={(e) => setSearchAddress(e.target.value)}
              style={{ width: '100%', border: 'none', background: 'transparent', padding: '10px 12px', outline: 'none', color: 'var(--text-primary)', fontSize: '0.9rem' }}
            />
          </div>
        )}
      </div>

      {/* RENDER ACTIVE TAB */}
      <div className="glass-panel" style={{ padding: '32px', overflow: 'hidden' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }} className="flex flex-col items-center justify-center gap-12">
            <Loader2 className="animate-spin" size={32} color="var(--accent-primary)" />
            <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '0.95rem' }}>Loading administrative logs...</p>
          </div>
        ) : (
          <>
            {/* TAB 1: CLIENTS & REPORTS */}
            {activeTab === 'reports' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '16px 12px' }}>Client Info</th>
                      <th style={{ padding: '16px 12px' }}>Property Address</th>
                      <th style={{ padding: '16px 12px' }}>Tier</th>
                      <th style={{ padding: '16px 12px' }}>Price Paid</th>
                      <th style={{ padding: '16px 12px' }}>Payment Status</th>
                      <th style={{ padding: '16px 12px' }}>Compilation State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReports.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '32px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          No clients or reports found matching the search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredReports.map((report, index) => (
                        <tr key={report.id || index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.92rem' }}>
                          
                          {/* Client Info */}
                          <td style={{ padding: '16px 12px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{report.email}</div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {new Date(report.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>

                          {/* Property Address */}
                          <td style={{ padding: '16px 12px', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={report.address}>
                            <strong>{report.address.split(',')[0]}</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{report.address.split(',').slice(1).join(', ').trim()}</div>
                          </td>

                          {/* Tier */}
                          <td style={{ padding: '16px 12px' }}>
                            <span style={{ 
                              padding: '4px 10px', 
                              borderRadius: '6px', 
                              fontSize: '0.8rem', 
                              fontWeight: 600, 
                              background: report.package_tier === 'bundle' 
                                ? 'rgba(139, 92, 246, 0.1)' 
                                : report.package_tier === 'triple'
                                  ? 'rgba(59, 130, 246, 0.1)'
                                  : 'rgba(0,0,0,0.05)', 
                              color: report.package_tier === 'bundle' 
                                ? '#8b5cf6' 
                                : report.package_tier === 'triple'
                                  ? '#3b82f6'
                                  : 'var(--text-primary)' 
                            }}>
                              {report.package_tier === 'bundle' 
                                ? '5x Bundle' 
                                : report.package_tier === 'triple'
                                  ? '3x Bundle'
                                  : 'Single'
                              }
                            </span>
                          </td>

                          {/* Price */}
                          <td style={{ padding: '16px 12px', fontWeight: 700 }}>
                            ${report.final_price}
                            {report.promo_code && (
                              <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 500 }} title={`Promo Code: ${report.promo_code}`}>
                                Saved ${report.discount_applied}
                              </div>
                            )}
                          </td>

                          {/* Payment status toggle */}
                          <td style={{ padding: '16px 12px' }}>
                            <button 
                              onClick={() => updateReportState(report.id || '', { payment_status: report.payment_status === 'success' ? 'failed' : 'success' })}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', border: 'none', background: 'transparent' }}
                              title="Click to toggle state"
                            >
                              {report.payment_status === 'success' ? (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
                                  <CheckCircle size={12} />
                                  <span>Success</span>
                                </div>
                              ) : (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>
                                  <XCircle size={12} />
                                  <span>Failed</span>
                                </div>
                              )}
                            </button>
                          </td>

                          {/* Delivery status toggle */}
                          <td style={{ padding: '16px 12px' }}>
                            <button 
                              onClick={() => updateReportState(report.id || '', { delivery_status: report.delivery_status === 'ready' ? 'pending' : 'ready' })}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', border: 'none', background: 'transparent' }}
                              title="Click to toggle compiling state"
                            >
                              {report.delivery_status === 'ready' ? (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '99px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
                                  <span>Ready</span>
                                </div>
                              ) : (
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', borderRadius: '99px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '0.8rem', fontWeight: 700 }} className="flex">
                                  <Loader2 size={12} className="animate-spin" />
                                  <span>Compiling</span>
                                </div>
                              )}
                            </button>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 2: MARKETING LEADS */}
            {activeTab === 'leads' && (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      <th style={{ padding: '16px 12px' }}>Email Record</th>
                      <th style={{ padding: '16px 12px' }}>Captured Date</th>
                      <th style={{ padding: '16px 12px' }}>Source Address Field</th>
                      <th style={{ padding: '16px 12px' }}>Sales Status</th>
                      <th style={{ padding: '16px 12px' }}>CRM Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '32px 12px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                          No marketing leads captured yet.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead, index) => (
                        <tr key={lead.id || index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.92rem' }}>
                          
                          {/* Lead Email */}
                          <td style={{ padding: '16px 12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                            {lead.email}
                          </td>

                          {/* Captured Date */}
                          <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>
                            {new Date(lead.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </td>

                          {/* Source address */}
                          <td style={{ padding: '16px 12px', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={lead.source_address || 'Not specified'}>
                            {lead.source_address || <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Anonymous Exit Intent</span>}
                          </td>

                          {/* Status */}
                          <td style={{ padding: '16px 12px' }}>
                            <button 
                              onClick={() => updateLeadState(lead.id || '', { status: lead.status === 'converted' ? 'new' : lead.status === 'new' ? 'contacted' : 'converted' })}
                              style={{ display: 'inline-flex', cursor: 'pointer', background: 'transparent' }}
                              title="Click to toggle marketing status"
                            >
                              {lead.status === 'converted' ? (
                                <span style={{ padding: '4px 10px', borderRadius: '99px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.78rem', fontWeight: 700 }}>Converted</span>
                              ) : lead.status === 'contacted' ? (
                                <span style={{ padding: '4px 10px', borderRadius: '99px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.78rem', fontWeight: 700 }}>Outreached</span>
                              ) : (
                                <span style={{ padding: '4px 10px', borderRadius: '99px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '0.78rem', fontWeight: 700 }}>Captured</span>
                              )}
                            </button>
                          </td>

                          {/* CRM Actions */}
                          <td style={{ padding: '16px 12px' }}>
                            <button 
                              onClick={() => alert(`Mock Email Trigger:\n\nTriggering automated email template sequence to: ${lead.email}\nSubject: "We Compiled Your Local Environment Grade. Complete Your Order!"`)}
                              className="btn btn-outline" 
                              style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'inline-flex', gap: '6px' }}
                            >
                              <Zap size={12} color="var(--accent-primary)" />
                              <span>Nurture</span>
                            </button>
                          </td>

                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: PROMO COUPONS */}
            {activeTab === 'promos' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
                
                {/* Coupon Code Creator Form */}
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} color="var(--accent-primary)" />
                    Create Promo Coupon Code
                  </h3>
                  
                  <form onSubmit={handleAddPromo} className="flex flex-col md:flex-row items-end" style={{ gap: '16px' }}>
                    
                    {/* Promo Code Input */}
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Coupon Code</label>
                      <input 
                        type="text" 
                        placeholder="e.g. SUMMER25" 
                        value={newPromoCode}
                        onChange={(e) => setNewPromoCode(e.target.value)}
                        required
                        style={{ width: '100%', background: '#ffffff', border: '1.5px solid var(--border-color)', padding: '12px 16px', borderRadius: '12px', outline: 'none', color: 'var(--text-primary)', fontWeight: 700 }}
                      />
                    </div>

                    {/* Discount Input */}
                    <div style={{ width: '160px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>Discount (USD)</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="150"
                        value={newPromoDiscount}
                        onChange={(e) => setNewPromoDiscount(Number(e.target.value))}
                        required
                        style={{ width: '100%', background: '#ffffff', border: '1.5px solid var(--border-color)', padding: '12px 16px', borderRadius: '12px', outline: 'none', color: 'var(--text-primary)', fontWeight: 700 }}
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit" 
                      disabled={isSubmittingPromo}
                      className="btn btn-accent" 
                      style={{ padding: '12px 24px', border: 'none', height: '48px', minWidth: '140px' }}
                    >
                      {isSubmittingPromo ? 'Saving...' : 'Add Coupon'}
                    </button>

                  </form>

                  {promoMessage && (
                    <p style={{ marginTop: '12px', fontSize: '0.85rem', color: promoMessage.startsWith('Error') ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Current Coupons Table */}
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ borderBottom: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        <th style={{ padding: '16px 12px' }}>Coupon Code</th>
                        <th style={{ padding: '16px 12px' }}>Created Date</th>
                        <th style={{ padding: '16px 12px' }}>Deduction (USD)</th>
                        <th style={{ padding: '16px 12px' }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promos.map((promo, index) => (
                        <tr key={promo.id || index} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', fontSize: '0.92rem' }}>
                          
                          {/* Code */}
                          <td style={{ padding: '16px 12px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            {promo.code}
                          </td>

                          {/* Created Date */}
                          <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>
                            {new Date(promo.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>

                          {/* Discount */}
                          <td style={{ padding: '16px 12px', fontWeight: 700, color: '#10b981' }}>
                            -${promo.discount} Off
                          </td>

                          {/* Is Active */}
                          <td style={{ padding: '16px 12px' }}>
                            <button 
                              onClick={() => togglePromoState(promo.id || '', promo.is_active)}
                              style={{ display: 'inline-flex', cursor: 'pointer', border: 'none', background: 'transparent' }}
                              title="Click to toggle active status"
                            >
                              {promo.is_active ? (
                                <span style={{ padding: '4px 10px', borderRadius: '99px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Check size={12} />
                                  <span>Active</span>
                                </span>
                              ) : (
                                <span style={{ padding: '4px 10px', borderRadius: '99px', background: 'rgba(0,0,0,0.06)', color: 'var(--text-secondary)', fontSize: '0.78rem', fontWeight: 700 }}>Deactivated</span>
                              )}
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            )}
          </>
        )}

      </div>

      {/* ADMIN UTILITY COMMANDS */}
      {!isSupabaseConfigured() && (
        <div className="glass-panel" style={{ marginTop: '40px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1.5px solid rgba(59, 130, 246, 0.2)', background: 'rgba(59, 130, 246, 0.02)' }}>
          <div style={{ maxWidth: '600px' }}>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={18} color="#3b82f6" />
              Developer Sandboxed Mode
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              All report orders, customer details, and promo changes you make here are being safely persisted into your local browser&apos;s storage cache. To switch to production, hook up your credentials inside `.env.local`.
            </p>
          </div>
          <button 
            onClick={clearLocalDatabase} 
            className="btn btn-outline" 
            style={{ border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '10px 16px', fontSize: '0.85rem' }}
          >
            <Trash2 size={14} />
            <span>Reset Mock Data</span>
          </button>
        </div>
      )}

    </div>
  );
}
