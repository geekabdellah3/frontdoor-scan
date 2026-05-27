'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, User, Loader2, CheckCircle2 } from 'lucide-react';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setLoading(true);

    // Simulate high-tech database record insertion
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess('Account created successfully! Welcome onboard.');
    
    // Save to local storage
    const formattedEmail = email.trim().toLowerCase();
    localStorage.setItem('frontdoor_user', JSON.stringify({
      email: formattedEmail,
      name: fullName.trim() || formattedEmail.split('@')[0],
      role: formattedEmail === 'hamzaabdou2003@gmail.com' ? 'admin' : 'user'
    }));

    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ padding: '24px', position: 'relative' }}>
      <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
      
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '440px', padding: '48px 32px' }}>
        <div className="flex flex-col items-center" style={{ marginBottom: '32px' }}>
          <Link href="/" style={{ marginBottom: '24px' }}>
            <ShieldCheck color="var(--accent-primary)" size={48} />
          </Link>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Create an account</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Start checking environmental health</p>
        </div>

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
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User color="var(--text-secondary)" size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Jane Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Password</label>
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
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>
        
        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Already have an account? <Link href="/signin" style={{ color: 'var(--accent-primary)', fontWeight: 500 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
