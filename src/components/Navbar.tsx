'use client';

import Link from 'next/link';
import { ShieldCheck, LogIn, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-[1000] px-4 md:px-6 transition-all duration-500 ${
      isScrolled ? 'py-4' : 'py-6'
    }`}>
      <nav className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-zinc-900/5' 
          : 'bg-transparent border border-transparent'
      }`}>
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-emerald-500/10 p-2 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
            <ShieldCheck className={isScrolled ? "text-emerald-500 group-hover:text-white" : "text-emerald-600 group-hover:text-white"} size={22} />
          </div>
          <span className="font-black text-xl tracking-tight text-zinc-900">Front Door <span className="text-emerald-600">Scan</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/#features" className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 rounded-xl transition-all">Features</Link>
          <Link href="/#pricing" className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 rounded-xl transition-all">Pricing</Link>
          <Link href="/#faq" className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 rounded-xl transition-all">FAQ</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/signin" className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-bold text-zinc-600 hover:text-zinc-900 transition-colors">
            <LogIn size={18} />
            Sign In
          </Link>
          <Link href="/signup" className="btn btn-primary px-6 py-2.5 text-xs tracking-widest uppercase">
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}

