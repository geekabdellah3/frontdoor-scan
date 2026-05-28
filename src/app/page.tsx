'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
