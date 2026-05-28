'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  MapPin, 
  Download, 
  AlertTriangle, 
  Loader2, 
  CreditCard, 
  Plus, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Zap
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import gsap from 'gsap';

interface Report {
  id?: string;
  created_at: string;
  address: string;
  email: string;
  package_tier: string;
  final_price: number;
  payment_status: string;
  delivery_status: string;
  report_data?: {
    score?: string;
    soil?: { radon?: string; contamination?: string };
    flood?: { zone?: string };
    air_quality?: { index?: string };
  };
}

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchAddress, setSearchAddress] = useState('');
  const [generatingReport, setGeneratingReport] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string; role: string } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load current user details from localStorage
    const stored = localStorage.getItem('frontdoor_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
      }
    }

    async function loadReports() {
      setLoading(true);
      if (isSupabaseConfigured()) {
        try {
          const { data, error } = await supabase
            .from('reports')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) {
            console.error('Error fetching reports from Supabase:', error);
            loadLocalReports();
          } else if (data && data.length > 0) {
            setReports(data);
          } else {
            loadLocalReports();
          }
        } catch (err) {
          console.error('Exception loading reports:', err);
          loadLocalReports();
        }
      } else {
        loadLocalReports();
      }
      setLoading(false);
    }

    function loadLocalReports() {
      const local = localStorage.getItem('frontdoor_local_reports');
      if (local) {
        setReports(JSON.parse(local));
      } else {
        // Seed default high-fidelity mock records
        const defaultMocks: Report[] = [
          {
            id: 'mock-1',
            created_at: new Date().toISOString(),
            address: '412 Maple Avenue, Austin, TX 78701',
            email: 'jane@example.com',
            package_tier: 'single',
            final_price: 49,
            payment_status: 'success',
            delivery_status: 'ready',
            report_data: { score: 'A-' }
          },
          {
            id: 'mock-2',
            created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
            address: '882 West Hollywood Blvd, Los Angeles, CA 90069',
            email: 'jane@example.com',
            package_tier: 'single',
            final_price: 49,
            payment_status: 'success',
            delivery_status: 'ready',
            report_data: { score: 'C+' }
          }
        ];
        localStorage.setItem('frontdoor_local_reports', JSON.stringify(defaultMocks));
        setReports(defaultMocks);
      }
    }

    loadReports();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dashboard-animate', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [loading]);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAddress.trim()) return;

    setGeneratingReport(true);
    
    // Simulate generation latency (high tech HUD feel)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const scores = ['A', 'A-', 'B+', 'B', 'C+', 'C', 'D+'];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];

    const newReport: Report = {
      address: searchAddress.trim(),
      email: user ? user.email : 'jane@example.com',
      package_tier: 'single',
      final_price: 0,
      payment_status: 'success',
      delivery_status: 'ready',
      created_at: new Date().toISOString(),
      report_data: {
        score: randomScore,
        soil: { radon: 'Low Risk', contamination: 'Below Action Limit' },
        flood: { zone: 'Minimal Hazard (Zone X)' },
        air_quality: { index: 'Good (38 AQI)' }
      }
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('reports').insert([newReport]);
        if (error) console.error('Error inserting report:', error);
      } catch (err) {
        console.error('Exception generating report:', err);
      }
    }

    // Always update state & local memory
    const updated = [newReport, ...reports];
    setReports(updated);
    
    // If local mode, save to localStorage
    const local = JSON.parse(localStorage.getItem('frontdoor_local_reports') || '[]');
    localStorage.setItem('frontdoor_local_reports', JSON.stringify([
      { id: `local-txn-${Date.now()}`, ...newReport },
      ...local
    ]));

    setSearchAddress('');
    setGeneratingReport(false);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafa] pb-20">
      <div className="container mx-auto px-6 pt-32">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 dashboard-animate">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em]">
              <Zap size={12} className="fill-emerald-500" />
              Terminal Access Verified
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight leading-none">
              Control Center
            </h1>
            <p className="text-zinc-500 font-medium max-w-lg">
              Welcome back, <span className="text-zinc-900 font-bold">{user ? user.name : 'Jane'}</span>. You have <span className="text-emerald-600 font-black">4</span> report credits remaining in your secure vault.
            </p>
          </div>
          <button className="bg-zinc-900 hover:bg-black text-white px-8 h-14 rounded-2xl font-black text-sm flex items-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-zinc-900/10 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <Plus size={20} className="relative z-10" />
            <span className="relative z-10 uppercase tracking-widest">Buy Credits</span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* New Report Generator */}
            <section className="glass-panel-spatial p-8 lg:p-12 bg-white/80 border-white shadow-2xl relative overflow-hidden dashboard-animate">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-2">Run New Environmental Scan</h2>
                  <p className="text-zinc-500 font-medium">Input any US residential address to initialize database synchronization.</p>
                </div>

                <form onSubmit={handleGenerateReport} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <MapPin size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Enter property address..." 
                      value={searchAddress}
                      onChange={(e) => setSearchAddress(e.target.value)}
                      disabled={generatingReport}
                      required
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-5 pl-14 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={generatingReport} 
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 h-16 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-xl shadow-emerald-600/10 uppercase tracking-widest"
                  >
                    {generatingReport ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Search size={20} />
                        <span>Initialize Scan</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    EPA ECHO Verified
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" />
                    FEMA Map Service
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Reports List */}
            <section className="space-y-6 dashboard-animate">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Recent Intelligence</h2>
                <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Updated Live
                </div>
              </div>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="py-20 flex flex-col items-center justify-center gap-6 glass-panel bg-white/50 border-zinc-100 rounded-3xl">
                    <Loader2 className="animate-spin text-emerald-500" size={40} />
                    <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">Retrieving Secure Archives...</p>
                  </div>
                ) : reports.length === 0 ? (
                  <div className="py-20 text-center glass-panel bg-white/50 border-zinc-100 rounded-3xl">
                    <p className="text-sm font-black text-zinc-400 uppercase tracking-widest">No reports in archive. Start your first scan above.</p>
                  </div>
                ) : (
                  reports.map((report, idx) => (
                    <div key={report.id || idx} className="glass-panel-spatial p-6 bg-white/80 border-white hover:border-emerald-200 transition-all group">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-5">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black ${
                            report.report_data?.score?.startsWith('D') ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {report.report_data?.score || 'A'}
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-zinc-900 tracking-tight group-hover:text-emerald-600 transition-colors">
                              {report.address.split(',')[0]}
                            </h3>
                            <p className="text-sm font-medium text-zinc-500 mb-2">
                              {report.address.split(',').slice(1).join(', ').trim() || 'Global Access'}
                            </p>
                            <div className="flex items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                              <span className="flex items-center gap-1">
                                <Clock size={12} /> {new Date(report.created_at).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <CreditCard size={12} /> {report.package_tier === 'single' ? 'Premium Report' : 'Bundle'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            className="flex-1 md:flex-none h-12 px-6 bg-zinc-900 hover:bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2"
                            onClick={() => alert('Opening report...')}
                          >
                            View Analysis <ChevronRight size={16} />
                          </button>
                          <button 
                            className="w-12 h-12 flex items-center justify-center border border-zinc-200 hover:border-emerald-500 hover:text-emerald-600 rounded-xl transition-all active:scale-95"
                            onClick={() => alert('Downloading PDF...')}
                          >
                            <Download size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-4 space-y-8 dashboard-animate">
            
            {/* Profile Card */}
            <section className="glass-panel-spatial p-8 bg-zinc-900 text-white border-zinc-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
              <div className="relative space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-emerald-500 font-black text-2xl border border-zinc-700">
                  {user ? user.name[0] : 'J'}
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight">{user ? user.name : 'Jane Doe'}</h3>
                  <p className="text-sm font-medium text-zinc-500">{user ? user.email : 'jane@example.com'}</p>
                </div>
                <div className="pt-4 border-t border-zinc-800 space-y-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-zinc-500">Subscription Status</span>
                    <span className="text-emerald-500">Premium active</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-zinc-500">Node Location</span>
                    <span className="text-white">Texas, USA</span>
                  </div>
                </div>
                <button className="w-full h-12 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-black text-[10px] uppercase tracking-widest transition-all border border-zinc-700">
                  Account Settings
                </button>
              </div>
            </section>

            {/* Quick Insights */}
            <section className="glass-panel-spatial p-8 bg-white border-white shadow-xl space-y-6">
              <h3 className="text-lg font-black text-zinc-900 tracking-tight uppercase tracking-widest text-xs text-zinc-400">Network Statistics</h3>
              <div className="space-y-6">
                {[
                  { label: 'Properties Scanned', value: '1,284,012', change: '+12%', color: 'emerald' },
                  { label: 'Toxic Sites Mapped', value: '452,901', change: '+3%', color: 'rose' },
                  { label: 'Active Data Nodes', value: '15 Sources', change: 'Stable', color: 'blue' },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-end">
                    <div>
                      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</div>
                      <div className="text-xl font-black text-zinc-900">{stat.value}</div>
                    </div>
                    <div className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                      stat.color === 'rose' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {stat.change}
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-zinc-100">
                <a href="#" className="flex items-center justify-between text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:translate-x-1 transition-transform">
                  View Network Map <ExternalLink size={14} />
                </a>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
