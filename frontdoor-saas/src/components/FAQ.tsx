const faqs = [
  {
    q: "How quickly will I receive my report?",
    a: "Most reports are generated within 5–10 minutes after purchase. You'll receive an email with a link to view and download your report as soon as it's ready."
  },
  {
    q: "What data sources do you use?",
    a: "Official government sources including the EPA, FEMA, USGS, AirNow, Census Bureau, CDC, and state environmental agencies — 15+ federal databases in total."
  },
  {
    q: "Can I use this to negotiate my home price or lease?",
    a: "Yes. Each report includes a dedicated negotiation section with property-specific talking points for sellers, landlords, and realtors."
  },
  {
    q: "Is this useful for renters?",
    a: "Yes. Renters benefit just as much — knowing about water, air, or contamination issues helps inform lease decisions and landlord negotiations."
  },
  {
    q: "What if my address isn't found?",
    a: "If we can't find data for your specific address, we'll search using the nearest available location data and indicate this in your report. If no meaningful data can be found, we offer a full refund."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="container" style={{ padding: '80px 24px', maxWidth: '800px' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '48px', textAlign: 'center' }}>Frequently Asked Questions</h2>
      
      <div className="flex flex-col" style={{ gap: '16px' }}>
        {faqs.map((faq, i) => (
          <details key={i} className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }}>
            <summary style={{ fontSize: '1.2rem', fontWeight: 600, outline: 'none' }}>
              {faq.q}
            </summary>
            <p style={{ marginTop: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
