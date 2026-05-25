'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Download, AlertTriangle, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

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

  useEffect(() => {
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
        // Seed default high-fidelity mock records so the page is never blank!
        const defaultMocks: Report[] = [
          {
            id: 'mock-1',
            created_at: new Date().toISOString(),
            address: '123 Mockingbird Ln, Austin, TX 78701',
            email: 'jane@example.com',
            package_tier: 'single',
            final_price: 49,
            payment_status: 'success',
            delivery_status: 'ready',
            report_data: { score: 'A-' }
          },
          {
            id: 'mock-2',
            created_at: new Date(Date.now() - 86400000 * 4).toISOString(), // 4 days ago
            address: '404 Unknown Dr, Seattle, WA 98101',
            email: 'jane@example.com',
            package_tier: 'single',
            final_price: 49,
            payment_status: 'success',
            delivery_status: 'ready',
            report_data: { score: 'D+' }
          }
        ];
        localStorage.setItem('frontdoor_local_reports', JSON.stringify(defaultMocks));
        setReports(defaultMocks);
      }
    }

    loadReports();
  }, []);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchAddress.trim()) return;

    setGeneratingReport(true);
    
    // Simulate generation latency (high tech HUD feel)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const scores = ['A', 'A-', 'B+', 'B', 'C+', 'C', 'D+'];
    const randomScore = scores[Math.floor(Math.random() * scores.length)];

    const newReport: Report = {
      address: searchAddress.trim(),
      email: 'jane@example.com', // mock signed-in user
      package_tier: 'single',
      final_price: 0, // generated via credit
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
    <div style={{ padding: '48px' }} className="animate-fade-in">
      <header className="flex items-center justify-between" style={{ marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', fontWeight: 800, letterSpacing: '-0.03em' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Welcome back, Jane. You have <strong>4</strong> report credits remaining.</p>
        </div>
        <button className="btn btn-primary" onClick={() => alert("Standard purchase package: Crediting sequence initialised.")}>Buy Credits</button>
      </header>

      {/* New Report Section */}
      <section className="glass-panel" style={{ padding: '32px', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-primary)' }}></div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Generate New Report</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>Enter any US address to run a full environmental analysis.</p>
        
        <form onSubmit={handleGenerateReport} className="flex items-center" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-full)', padding: '6px', maxWidth: '700px' }}>
          <MapPin color="var(--text-secondary)" size={20} style={{ marginLeft: '16px' }} />
          <input 
            type="text" 
            placeholder="e.g. 123 Main St, Springfield, IL" 
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            disabled={generatingReport}
            required
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: 'none', 
              padding: '12px 16px', 
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '0.95rem',
            }} 
          />
          <button type="submit" disabled={generatingReport} className="btn btn-accent" style={{ padding: '12px 24px', border: 'none' }}>
            {generatingReport ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Scanning Databases...</span>
              </>
            ) : (
              <>
                <Search size={18} />
                <span>Generate Report (1 Credit)</span>
              </>
            )}
          </button>
        </form>
      </section>

      {/* Recent Reports */}
      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Reports</h2>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {loading ? (
            <div style={{ gridColumn: '1 / -1', padding: '64px 0', textAlign: 'center', color: 'var(--text-secondary)' }} className="flex flex-col items-center justify-center gap-16">
              <Loader2 className="animate-spin text-accent" size={36} color="var(--accent-primary)" />
              <p style={{ marginTop: '16px', fontSize: '0.95rem' }}>Retrieving your environmental certificates...</p>
            </div>
          ) : reports.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', padding: '64px 24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No reports generated yet. Enter an address above to generate your first environmental certificate!
            </div>
          ) : (
            reports.map((report, idx) => {
              const reportDate = new Date(report.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              const score = report.report_data?.score || 'A';
              const isLowScore = score.startsWith('D') || score.startsWith('F');
              
              return (
                <div key={report.id || idx} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                    <div 
                      className="flex items-center" 
                      style={{ 
                        gap: '6px', 
                        padding: '4px 12px', 
                        background: isLowScore ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', 
                        color: isLowScore ? '#ef4444' : 'var(--accent-primary)', 
                        borderRadius: '999px', 
                        fontSize: '0.8rem', 
                        fontWeight: 600 
                      }}
                    >
                      {isLowScore && <AlertTriangle size={14} />} Score: {score}
                    </div>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{reportDate}</span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={report.address}>
                    {report.address.split(',')[0]}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                    {report.address.split(',').slice(1).join(', ').trim() || 'Local Area'}
                  </p>
                  
                  <div className="flex items-center" style={{ gap: '12px', marginTop: 'auto' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ flex: 1, padding: '10px', border: 'none' }}
                      onClick={() => alert(`Report Certificate Details:\n\nAddress: ${report.address}\nGrade Score: ${score}\nRadon Gas: ${report.report_data?.soil?.radon || 'Low Risk'}\nFlood Index: ${report.report_data?.flood?.zone || 'Minimal Risk'}`)}
                    >
                      View Report
                    </button>
                    <button 
                      className="btn btn-outline" 
                      style={{ padding: '10px' }}
                      onClick={() => alert("Downloading PDF Environmental Certificate to local storage...")}
                    >
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
