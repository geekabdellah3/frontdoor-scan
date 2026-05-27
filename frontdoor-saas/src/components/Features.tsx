import { Droplets, Wind, Waves, Mountain, Factory, Activity } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Droplets size={32} color="#3b82f6" />,
    title: "Water Quality",
    description: "Lead, PFAS, nitrates, disinfection byproducts, and 90+ contaminants benchmarked against EPA limits."
  },
  {
    icon: <Wind size={32} color="#10b981" />,
    title: "Air Quality",
    description: "Real-time AQI plus 5-year historical averages of EPA criteria pollutants — PM2.5, ozone, NO2."
  },
  {
    icon: <Waves size={32} color="#0ea5e9" />,
    title: "Flood Risk",
    description: "FEMA flood zone designation, recent disaster history, and proximity to NOAA stream gauges."
  },
  {
    icon: <Mountain size={32} color="#d97706" />,
    title: "Soil Contamination",
    description: "Brownfield and remediation site proximity within 2 miles using EPA ECHO and EJScreen data."
  },
  {
    icon: <Factory size={32} color="#ef4444" />,
    title: "Superfund & Hazards",
    description: "EPA National Priorities List sites, power plants, and industrial emitters within 50 miles."
  },
  {
    icon: <Activity size={32} color="#8b5cf6" />,
    title: "Radon Risk",
    description: "EPA Radon Zone classification mapped to your county FIPS code."
  }
];

export default function Features() {
  return (
    <section id="features" className="container" style={{ padding: '80px 24px' }}>
      
      {/* Visual Content Section */}
      <div className="flex flex-col items-center" style={{ marginBottom: '80px' }}>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Standard inspections check the <span className="text-gradient">building.</span></h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '24px', lineHeight: 1.6 }}>
              They do not cover water contamination, air pollution, Superfund proximity, radon, or flood risk. Front Door Scan fills that gap with the same federal data environmental consultants use.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
              Each report includes a dedicated negotiation section with property-specific talking points you can use with sellers, landlords, or agents.
            </p>
          </div>
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', aspectRatio: '4/3' }}>
            <Image 
              src="/family-moving.jpg" 
              alt="Family moving into a new home" 
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>What&apos;s in a <span className="text-gradient">Report</span></h2>
      </div>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {features.map((feature, index) => (
          <div key={index} className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', width: 'fit-content' }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.4rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
