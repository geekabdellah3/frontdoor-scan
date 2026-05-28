import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | Front Door Scan',
  description: 'Terms of service and legal agreement for Front Door Scan users.',
};

export default function TermsPage() {
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
              <h1 className="text-4xl md:text-5xl font-black text-zinc-900 tracking-tight leading-tight mb-4">Terms of Service</h1>
              <p className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] mb-12">Last Updated: May 2026</p>

              <div className="prose prose-zinc prose-lg max-w-none space-y-12">
                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">01</span>
                    Acceptance of Terms
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    By accessing and using Front Door Scan (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">02</span>
                    Description of Service
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    Front Door Scan provides environmental health reports for US residential properties. We aggregate public data from federal agencies including the EPA, FEMA, USGS, and CDC. Our service is designed to give you a broad overview of potential environmental hazards near a specific address.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">03</span>
                    Report Accuracy & Disclaimers
                  </h2>
                  <div className="p-6 bg-rose-50 border border-rose-100 rounded-[24px]">
                    <p className="text-rose-900 font-black text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                      Critical Disclosure
                    </p>
                    <p className="text-rose-800 font-medium leading-relaxed italic">
                      Front Door Scan reports are informational only and do not constitute professional environmental inspections, legal advice, or guaranteed safety assessments.
                    </p>
                  </div>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    While we strive to provide accurate data by sourcing from government databases, we do not independently verify this data and cannot guarantee its absolute accuracy, completeness, or timeliness. You should always consult licensed environmental professionals before making significant real estate decisions.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">04</span>
                    Pricing & Payment
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    We offer reports in various packages, including Single Property ($49), 5-Property Bundle ($199), and 25-Property Pack ($499). All fees are non-refundable once a report has been successfully generated and delivered to your account.
                  </p>
                </section>

                <section className="space-y-6">
                  <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-sm font-black">05</span>
                    User Accounts
                  </h2>
                  <p className="text-zinc-500 font-medium leading-relaxed">
                    You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.
                  </p>
                </section>

                <section className="p-8 bg-zinc-50 border border-zinc-100 rounded-[24px] space-y-4">
                  <h2 className="text-xl font-black text-zinc-900 tracking-tight">Contact Information</h2>
                  <p className="text-zinc-500 font-medium text-sm leading-relaxed">
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  <div className="pt-2">
                    <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">Legal Support</div>
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
