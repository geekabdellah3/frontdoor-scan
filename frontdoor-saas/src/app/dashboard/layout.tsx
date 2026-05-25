import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, FileText, CreditCard, Settings, LogOut, ShieldAlert } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen" style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', borderRight: '1px solid var(--border-color)', background: 'var(--bg-secondary)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <Link href="/" className="flex items-center" style={{ gap: '10px', fontSize: '1.25rem', fontWeight: 700, marginBottom: '48px' }}>
          <ShieldCheck color="var(--accent-primary)" size={28} />
          <span>Front Door Fax</span>
        </Link>
        
        <nav className="flex flex-col" style={{ gap: '8px', flex: 1 }}>
          <Link href="/dashboard" className="flex items-center glass-panel" style={{ gap: '12px', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', background: 'rgba(0,0,0,0.02)', borderColor: 'var(--border-color)' }}>
            <LayoutDashboard size={20} color="var(--accent-primary)" />
            <span style={{ fontWeight: 500 }}>Overview</span>
          </Link>
          <Link href="/dashboard/reports" className="flex items-center" style={{ gap: '12px', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-secondary)' }}>
            <FileText size={20} />
            <span style={{ fontWeight: 500 }}>My Reports</span>
          </Link>
          <Link href="/dashboard/billing" className="flex items-center" style={{ gap: '12px', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-secondary)' }}>
            <CreditCard size={20} />
            <span style={{ fontWeight: 500 }}>Billing</span>
          </Link>
          <Link href="/dashboard/settings" className="flex items-center" style={{ gap: '12px', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', color: 'var(--text-secondary)' }}>
            <Settings size={20} />
            <span style={{ fontWeight: 500 }}>Settings</span>
          </Link>
          <Link href="/dashboard/admin" className="flex items-center animate-pulse" style={{ gap: '12px', padding: '12px 16px', borderRadius: 'var(--border-radius-sm)', color: 'var(--accent-primary)', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
            <ShieldAlert size={20} />
            <span style={{ fontWeight: 700 }}>Admin Portal</span>
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
          <Link href="/" className="flex items-center" style={{ gap: '12px', padding: '12px 16px', color: 'var(--text-secondary)' }}>
            <LogOut size={20} />
            <span style={{ fontWeight: 500 }}>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg-primary)', position: 'relative' }}>
        <div className="bg-glow" style={{ top: '-20%', right: '-10%' }}></div>
        {children}
      </main>
    </div>
  );
}
