'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Simulate high-tech authentication lookup latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const formattedEmail = email.trim().toLowerCase();

    if (formattedEmail === 'hamzaabdou2003@gmail.com') {
      if (password === 'pass123') {
        setSuccess('Administrator authentication successful! Redirecting...');
        localStorage.setItem('frontdoor_user', JSON.stringify({
          email: 'hamzaabdou2003@gmail.com',
          name: 'Hamza',
          role: 'admin'
        }));
        setTimeout(() => {
          router.push('/dashboard');
        }, 600);
      } else {
        setError('Incorrect password for this administrator account.');
        setLoading(false);
      }
    } else {
      // For standard users in the demo, allow signing in with any password
      setSuccess('Sign in successful! Redirecting...');
      localStorage.setItem('frontdoor_user', JSON.stringify({
        email: formattedEmail,
        name: formattedEmail.split('@')[0],
        role: 'user'
      }));
      setTimeout(() => {
        router.push('/dashboard');
      }, 600);
    }
  };

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

        {error && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            background: 'rgba(239, 68, 68, 0.1)', 
            border: '1px solid rgba(239, 68, 68, 0.2)', 
            color: '#ef4444', 
            padding: '12px 16px', 
            borderRadius: 'var(--border-radius-sm)', 
            marginBottom: '20px',
            fontSize: '0.88rem',
            fontWeight: 500
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            background: 'rgba(16, 185, 129, 0.1)', 
            border: '1px solid rgba(16, 185, 129, 0.2)', 
            color: '#10b981', 
            padding: '12px 16px', 
            borderRadius: 'var(--border-radius-sm)', 
            marginBottom: '20px',
            fontSize: '0.88rem',
            fontWeight: 500
          }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
            <span>{success}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail color="var(--text-secondary)" size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
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
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              <span>Password</span>
              <Link href="#" style={{ color: 'var(--accent-primary)' }}>Forgot?</Link>
            </label>
            <div style={{ position: 'relative' }}>
              <Lock color="var(--text-secondary)" size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
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
          
          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-accent" 
            style={{ 
              width: '100%', 
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              height: '48px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>
        
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Don&apos;t have an account? <Link href="/signup" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
