'use client';

import { Users, Home, TrendingUp, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function UseCases() {
  return (
    <section id="use-cases" style={{ padding: '120px 0' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
          
          <div style={{ position: 'relative' }}>
             <div className="premium-shadow" style={{ 
               background: 'var(--bg-secondary)', 
               borderRadius: '32px', 
               overflow: 'hidden',
               border: '1px solid var(--border-color)',
               position: 'relative',
               zIndex: 1
             }}>
                <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                 <Image 
                   src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000" 
                   alt="Family reviewing report" 
                   fill
                   style={{ objectFit: 'cover' }}
                 />
                </div>
               <div style={{ padding: '32px', background: 'white' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <ShieldCheck size={20} color="var(--accent-primary)" />
                   </div>
                   <span style={{ fontWeight: 800, fontSize: '1.1rem' }}>Peace of Mind Guaranteed</span>
                 </div>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    &ldquo;We wouldn&apos;t have known about the lead in the water pipes without this report. It saved us thousands in future health costs.&rdquo;
                  </p>
               </div>
             </div>
             <div style={{ position: 'absolute', top: '40px', right: '-40px', width: '200px', height: '200px', background: 'var(--accent-secondary)', opacity: 0.1, filter: 'blur(80px)', zIndex: 0 }}></div>
          </div>

          <div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>
              Know before <br />you move in.
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '48px' }}>
              Whether you are buying your first home, renting with your family, or comparing multiple properties, Front Door Scan helps you uncover risks that are usually invisible during a normal viewing or inspection.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {[
                { icon: <Users size={24} />, title: "Families with Children", desc: "Ensure your children grow up in a home free from radon, lead, and air pollutants." },
                { icon: <Home size={24} />, title: "First-Time Homebuyers", desc: "Don't let your biggest investment become a hidden health liability." },
                { icon: <TrendingUp size={24} />, title: "Real Estate Investors", desc: "Verify environmental safety to protect property value and tenant health." }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '8px' }}>{item.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
