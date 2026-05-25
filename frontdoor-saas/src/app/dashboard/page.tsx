import { Search, MapPin, Download, AlertTriangle } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ padding: '48px' }} className="animate-fade-in">
      <header className="flex items-center justify-between" style={{ marginBottom: '48px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, Jane. You have <strong>4</strong> report credits remaining.</p>
        </div>
        <button className="btn btn-primary">Buy Credits</button>
      </header>

      {/* New Report Section */}
      <section className="glass-panel" style={{ padding: '32px', marginBottom: '48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--accent-primary)' }}></div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Generate New Report</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Enter any US address to run a full environmental analysis.</p>
        
        <div className="flex items-center" style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-full)', padding: '6px', maxWidth: '700px' }}>
          <MapPin color="var(--text-secondary)" size={20} style={{ marginLeft: '16px' }} />
          <input 
            type="text" 
            placeholder="e.g. 123 Main St, Springfield, IL" 
            style={{ 
              flex: 1, 
              background: 'transparent', 
              border: 'none', 
              padding: '12px 16px', 
              color: 'var(--text-primary)',
              outline: 'none',
            }} 
          />
          <button className="btn btn-accent" style={{ padding: '12px 24px' }}>
            <Search size={18} />
            <span>Generate Report (1 Credit)</span>
          </button>
        </div>
      </section>

      {/* Recent Reports */}
      <section>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Recent Reports</h2>
        
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
          {/* Sample Report Card 1 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
              <div style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-primary)', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>Score: A-</div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Today</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>123 Mockingbird Ln</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Austin, TX 78701</p>
            
            <div className="flex items-center" style={{ gap: '12px', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>View Report</button>
              <button className="btn btn-outline" style={{ padding: '10px' }}><Download size={18} /></button>
            </div>
          </div>

          {/* Sample Report Card 2 */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
              <div className="flex items-center" style={{ gap: '6px', padding: '4px 12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>
                <AlertTriangle size={14} /> Score: D+
              </div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Oct 12, 2025</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>404 Unknown Dr</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>Seattle, TX 98101</p>
            
            <div className="flex items-center" style={{ gap: '12px', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ flex: 1, padding: '10px' }}>View Report</button>
              <button className="btn btn-outline" style={{ padding: '10px' }}><Download size={18} /></button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
