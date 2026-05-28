'use client';

import Link from 'next/link';
import { ShieldCheck, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 text-white pt-24 pb-12 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-emerald-500/20 p-2 rounded-xl border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                <ShieldCheck className="text-emerald-500 group-hover:text-white" size={24} />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">Front Door <span className="text-emerald-600">Scan</span></span>
            </Link>
            <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-md">
              Comprehensive environmental health reports for US residential properties. Empowering homebuyers with federal data transparency.
            </p>
            <div className="flex gap-4">
              {[Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
            {[
              { 
                title: 'Product', 
                links: [{label: 'Features', href: '/#features'}, {label: 'Pricing', href: '/#pricing'}, {label: 'Success Stories', href: '#'}, {label: 'Get Started', href: '/get-started'}] 
              },
              { 
                title: 'Company', 
                links: [{label: 'About Us', href: '#'}, {label: 'Our Data', href: '#'}, {label: 'Blog', href: '#'}, {label: 'Contact', href: '#'}] 
              },
              { 
                title: 'Legal', 
                links: [{label: 'Terms of Service', href: '/terms'}, {label: 'Privacy Policy', href: '/privacy'}, {label: 'Cookie Policy', href: '#'}, {label: 'Disclaimer', href: '#'}] 
              }
            ].map((col, i) => (
              <div key={i} className="space-y-6">
                <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">{col.title}</h4>
                <div className="flex flex-col gap-4">
                  {col.links.map((link, j) => (
                    <Link key={j} href={link.href} className="text-zinc-500 font-bold text-sm hover:text-white hover:translate-x-1 transition-all duration-300">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 font-bold text-sm">
            © {new Date().getFullYear()} Front Door Scan Inc. Built for spatial transparency.
          </p>
          <div className="flex gap-8 text-zinc-600 font-black text-[10px] uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Privacy Preferred
            </span>
            <span className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              U.S. Data Only
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
