'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, Mail, Lock, User, Loader2, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import gsap from 'gsap';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const router = useRouter();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');
    setLoading(true);

    // Simulate high-tech database record insertion
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess('Secure profile established. Redirecting...');
    
    // Save to local storage
    const formattedEmail = email.trim().toLowerCase();
    localStorage.setItem('frontdoor_user', JSON.stringify({
      email: formattedEmail,
      name: fullName.trim() || formattedEmail.split('@')[0],
      role: formattedEmail === 'hamzaabdou2003@gmail.com' ? 'admin' : 'user'
    }));

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div ref={cardRef} className="relative z-10 w-full max-w-md">
        <div className="glass-panel-spatial p-8 lg:p-12 bg-white/80 border-white shadow-2xl">
          <div className="flex flex-col items-center mb-10">
            <Link href="/" className="mb-8 group">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <ShieldCheck size={32} />
              </div>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
              <Zap size={12} className="fill-emerald-500" />
              Node Authorization
            </div>
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight mb-2">Initialize Profile</h1>
            <p className="text-zinc-500 font-medium">Join the network of environmental safety.</p>
          </div>

          {success && (
            <div className="mb-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700 text-sm font-bold animate-pulse">
              <CheckCircle2 size={18} />
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Identity</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Registry Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-zinc-400 ml-1">Secret Key</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-zinc-900 hover:bg-black text-white h-14 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl shadow-zinc-900/10 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              {loading ? (
                <>
                  <Loader2 className="animate-spin relative z-10" size={18} />
                  <span className="relative z-10">SYNCHRONIZING...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">INITIALIZE ACCOUNT</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-10 text-center text-xs font-bold text-zinc-400 uppercase tracking-widest">
            Already verified? <Link href="/signin" className="text-emerald-600 hover:text-emerald-500 transition-colors">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
