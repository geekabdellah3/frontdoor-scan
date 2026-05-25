import Link from 'next/link';
import { ShieldCheck, Mail, Lock } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ padding: '24px', position: 'relative' }}>
      <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '48px 32px' }}>
        <div className="flex flex-col items-center" style={{ marginBottom: '32px' }}>
          <Link href="/" style={{ marginBottom: '24px' }}>
            <ShieldCheck color="var(--accent-primary)" size={48} />
          </Link>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Welcome back</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to view your reports</p>
        </div>
        
        <form className="flex flex-col" style={{ gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail color="var(--text-secondary)" size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="you@example.com" 
                style={{ 
                  width: '100%', 
                  background: 'rgba(0,0,0,0.03)', 
                  border: '1px solid var(--border-color)', 
                  padding: '12px 16px 12px 48px', 
                  borderRadius: 'var(--border-radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }} 
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <span>Password</span>
              <Link href="#" style={{ color: 'var(--accent-primary)' }}>Forgot?</Link>
            </label>
            <div style={{ position: 'relative' }}>
              <Lock color="var(--text-secondary)" size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                style={{ 
                  width: '100%', 
                  background: 'rgba(0,0,0,0.03)', 
                  border: '1px solid var(--border-color)', 
                  padding: '12px 16px 12px 48px', 
                  borderRadius: 'var(--border-radius-sm)',
                  color: 'var(--text-primary)',
                  outline: 'none',
                }} 
              />
            </div>
          </div>
          
          <Link href="/dashboard" className="btn btn-accent" style={{ width: '100%', marginTop: '12px' }}>
            Sign In
          </Link>
        </form>
        
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don&apos;t have an account? <Link href="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
