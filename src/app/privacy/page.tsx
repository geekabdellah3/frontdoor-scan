import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Front Door Scan',
  description: 'Privacy policy for Front Door Scan users.',
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto stagger-in">
          <div className="glass-panel-spatial p-8 md:p-16 bg-white/70 border-white rounded-[40px] shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none -mr-32 -mt-32" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8">
                Legal Documentation
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4">Privacy Policy</h1>
              <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] mb-12">Effective Date: May 2026</p>

              <div className="prose prose-zinc prose-lg max-w-none space-y-12">
                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">01</span>
                    Information We Collect
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    We collect information you provide directly to us when using Front Door Scan, including:
                  </p>
                  <ul className="space-y-4">
                    {['Name and contact information (email address)', 'Billing address and payment details', 'Property addresses you search for and compile reports on'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">02</span>
                    How We Use Information
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    We use the collected information to:
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Generate and deliver environmental health reports',
                      'Process payments and manage your account',
                      'Communicate with you regarding your reports or our service',
                      'Improve and optimize our platform'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-500 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">03</span>
                    Data Sources
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    Our reports are generated using publicly available data from federal databases, including EPA ECHO, FEMA NFIP, USGS, and CDC ATSDR. We do not use proprietary sensors or private investigators.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">04</span>
                    Data Sharing
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    We respect your privacy and <span className="text-zinc-900 font-bold underline decoration-emerald-500/30 decoration-4">do not sell your personal data</span> to third parties. We only share information with trusted third-party service providers (like payment processors) necessary to operate our service.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">05</span>
                    Data Security
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    We implement industry-standard security measures to protect your information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.
                  </p>
                </section>

                <section className="p-8 bg-zinc-50 border border-zinc-100 rounded-[24px] space-y-4">
                  <h2 className="text-xl font-black text-zinc-900 tracking-tight">Contact Information</h2>
                  <p className="text-zinc-500 font-medium text-sm leading-relaxed">
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                  </p>
                  <div className="pt-2">
                    <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Support Email</div>
                    <div className="text-emerald-600 font-black text-lg">support@frontdoorscan.com</div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
