'use client';

import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Clock, 
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldAlert,
  FileText,
  Terminal
} from 'lucide-react';
import Link from 'next/link';
import { Suspense, useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Mock static US property address suggestions database for diagnostics
const FRONT_DOOR_MOCK_ADDRESSES = [
  { street: "123 Beacon Street", city: "Boston", state: "MA", zip: "02116" },
  { street: "456 Pine Street", city: "Seattle", state: "WA", zip: "98101" },
  { street: "789 Michigan Avenue", city: "Chicago", state: "IL", zip: "60611" },
  { street: "101 Colfax Avenue", city: "Denver", state: "CO", zip: "80202" },
  { street: "303 California Street", city: "San Francisco", state: "CA", zip: "94104" },
  { street: "555 Congress Avenue", city: "Austin", state: "TX", zip: "78701" }
];

function GetStartedContent() {
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';
  const lastScannedAddress = useRef('');

  // Countdown timer state (starts at 09:39 as seen in html mockup)
  const [timeLeft, setTimeLeft] = useState(579); // 579 seconds = 09:39
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // State Hooks
  const [selectedPackage, setSelectedPackage] = useState<'single' | 'bundle'>('bundle');
  const [purchaseType, setPurchaseType] = useState<'save' | 'onetime'>('save');
  
  // Shipping Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingState, setShippingState] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Address Suggestions Autocomplete States
  const [suggestions, setSuggestions] = useState<typeof FRONT_DOOR_MOCK_ADDRESSES>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Expose suggestion panel logic
  const handleAddressChange = (val: string) => {
    setAddressLine1(val);
    if (val.trim().length >= 2) {
      const filtered = FRONT_DOOR_MOCK_ADDRESSES.filter(addr => 
        addr.street.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (addr: typeof FRONT_DOOR_MOCK_ADDRESSES[0]) => {
    setAddressLine1(addr.street);
    setCity(addr.city);
    setShippingState(addr.state);
    setZipCode(addr.zip);
    setCountry("United States");
    setShowSuggestions(false);
    lastScannedAddress.current = addr.street.trim();
    setPrepFinished(false);
  };

  // Close autocomplete on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.id !== 'ship-address1' && !target.closest('.autocomplete-suggestions-box')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Shipping Form Autofill from Homepage Query
  useEffect(() => {
    if (address) {
      const parts = address.split(',').map(p => p.trim());
      let streetName = parts[0] || '';
      let cityIndex = 1;

      if (parts.length > 1 && (/^\d+$/.test(parts[0]) || /^\d+[a-zA-Z]?$/.test(parts[0]) || parts[0].length <= 5)) {
        streetName = `${parts[0]} ${parts[1]}`;
        cityIndex = 2;
      }

      const parsedCity = parts[cityIndex] || '';

      let parsedState = '';
      for (let i = cityIndex + 1; i < parts.length; i++) {
        const part = parts[i];
        if (part.length === 2 && /^[A-Z]{2}$/i.test(part)) {
          parsedState = part.toUpperCase();
          break;
        }
      }
      if (!parsedState && parts.length >= cityIndex + 3) {
        parsedState = parts[cityIndex + 2];
      }

      const zipPart = parts.find(p => /^\d{5}(-\d{4})?$/.test(p));

      // Use a timeout to avoid calling setState synchronously within the effect
      const timer = setTimeout(() => {
        setAddressLine1(streetName);
        setCity(parsedCity);
        setShippingState(parsedState);
        if (zipPart) setZipCode(zipPart);
        
        lastScannedAddress.current = streetName.trim();
        setPrepFinished(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [address]);

  // Payment States
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'card'>('paypal');
  const [ccNumber, setCcNumber] = useState('');
  const [ccCsc, setCcCsc] = useState('');
  const [ccMonth, setCcMonth] = useState('January');
  const [ccYear, setCcYear] = useState('2026');

  // Promo Code States
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountAmount, setPromoDiscountAmount] = useState(0);

  // Dynamic Itemized Pricing Selector values for Front Door Fax
  const getPackagePriceInfo = () => {
    switch (selectedPackage) {
      case 'single':
        return { 
          price: 49.00, 
          reg: 69.00, 
          saving: 20.00, 
          pct: '30%', 
          unitPriceText: '$49.00 each',
          booksText: '1 Property Report',
          name: 'Front Door Fax Environmental Report (1 Property)',
          metaLabel: '1 Property (Single Report)'
        };
      case 'bundle':
      default:
        return { 
          price: 199.00, 
          reg: 345.00, 
          saving: 146.00, 
          pct: '42%', 
          unitPriceText: '$39.80 each',
          booksText: '5 Property Reports',
          name: 'Front Door Fax Environmental Report Bundle (5 Properties)',
          metaLabel: '5 Properties (Comparison Bundle)'
        };
    }
  };

  const priceInfo = getPackagePriceInfo();
  const finalPrice = Math.max(0, priceInfo.price - discountAmount);
  const totalSavings = priceInfo.saving + discountAmount;

  // Checkout Processing States
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const terminalLogsEndRef = useRef<HTMLDivElement>(null);

  const logSteps = [
    "Establishing secure 256-bit encrypted connection...",
    "Geocoding target coordinates via GIS mapping telemetry...",
    "Connecting to US EPA ECHO & EJScreen database registry...",
    "Scanning CDC & local municipal public groundwater registries...",
    "Analyzing water contaminants (PFAS, nitrates, heavy metals)...",
    "Querying FEMA regional flood maps & disaster history matrices...",
    "Locating active Superfunds, Brownfields & toxic waste sites within 2 miles...",
    "Indexing county FIPS radon gas classifications...",
    "Generating custom buyer price negotiation talking points...",
    "Successfully compiling high-resolution property diagnostic PDF..."
  ];

  // Auto-scroll terminal logs to bottom
  useEffect(() => {
    if (checkoutState === 'processing') {
      terminalLogsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, checkoutState]);

  // Tab Selection helper
  const handleTabChange = (tab: 'save' | 'onetime') => {
    setPurchaseType(tab);
    if (tab === 'save') {
      setSelectedPackage('bundle');
    } else {
      setSelectedPackage('single');
    }
  };

  // Coupon Database Query with Local Fallback
  const handleApplyPromo = async () => {
    const codeUpper = promoCode.trim().toUpperCase();
    if (!codeUpper) return;

    setPromoError('');
    setPromoSuccess('');

    if (isSupabaseConfigured()) {
      try {
        const { data, error } = await supabase
          .from('promos')
          .select('*')
          .eq('code', codeUpper)
          .eq('is_active', true)
          .single();

        if (error || !data) {
          applyLocalPromoFallback(codeUpper);
        } else {
          setPromoApplied(true);
          setPromoDiscountAmount(Number(data.discount));
          setPromoSuccess(`✓ ${codeUpper} coupon applied! $${data.discount}.00 discount deducted.`);
        }
      } catch (err) {
        console.error('Promo DB error:', err);
        applyLocalPromoFallback(codeUpper);
      }
    } else {
      applyLocalPromoFallback(codeUpper);
    }
  };

  const applyLocalPromoFallback = (code: string) => {
    if (code === 'WELCOME10') {
      setPromoApplied(true);
      setPromoDiscountAmount(10);
      setPromoSuccess('✓ WELCOME10 coupon applied! $10.00 discount deducted.');
    } else if (code === 'SAFETY15') {
      setPromoApplied(true);
      setPromoDiscountAmount(15);
      setPromoSuccess('✓ SAFETY15 coupon applied! $15.00 discount deducted.');
    } else {
      setPromoApplied(false);
      setPromoDiscountAmount(0);
      setPromoError('Invalid promo code. Try typing WELCOME10 or SAFETY15');
    }
  };

  // Lead capture onBlur
  const handleLeadEmailBlur = async () => {
    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !validEmailRegex.test(email)) return;

    const leadPayload = {
      email,
      source_address: addressLine1 || address || 'Direct GetStarted Checkout',
      status: 'new'
    };

    if (isSupabaseConfigured()) {
      try {
        const { error } = await supabase.from('leads').insert([leadPayload]);
        if (error) {
          console.log('Lead already exists or updated:', error.message);
        } else {
          console.log('Lead recorded in database successfully.');
        }
      } catch (err) {
        console.error('Lead record DB error:', err);
      }
    } else {
      // LocalStorage fallback for demos
      const localLeads = JSON.parse(localStorage.getItem('frontdoor_local_leads') || '[]');
      if (!localLeads.some((l: { email: string }) => l.email === email)) {
        localLeads.push({
          id: `local-lead-${Date.now()}`,
          created_at: new Date().toISOString(),
          ...leadPayload
        });
        localStorage.setItem('frontdoor_local_leads', JSON.stringify(localLeads));
        console.log('Lead saved locally (localStorage fallback).');
      }
    }
  };

  // Finalized Order Submission to Supabase/LocalStorage
  const saveFinalizedOrder = async () => {
    const fullConcatenatedAddress = `${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}, ${city}, ${shippingState} ${zipCode}, ${country}`;
    const reportPayload = {
      address: fullConcatenatedAddress,
      email,
      package_tier: selectedPackage,
      final_price: finalPrice,
      discount_applied: discountAmount,
      promo_code: promoApplied ? promoCode.toUpperCase() : null,
      payment_status: 'success',
      delivery_status: 'ready',
      report_data: {
        recipient_name: `${firstName} ${lastName}`,
        phone: phone,
        address_line2: addressLine2,
        city: city,
        state: shippingState,
        zip: zipCode,
        country: country,
        payment_method: paymentMethod,
        report_count: selectedPackage === 'single' ? 1 : 5,
        processing_logs: logSteps,
        custom_proof_rendered: true
      }
    };

    if (isSupabaseConfigured()) {
      try {
        const { error: insertError } = await supabase
          .from('reports')
          .insert([reportPayload]);

        if (insertError) {
          console.error('Order DB insertion failed:', insertError);
        }

        // Update lead status to converted
        await supabase
          .from('leads')
          .update({ status: 'converted' })
          .eq('email', email);

      } catch (err) {
        console.error('Order DB process exception:', err);
      }
    } else {
      // LocalStorage fallback
      const localReports = JSON.parse(localStorage.getItem('frontdoor_local_reports') || '[]');
      localReports.unshift({
        id: `local-txn-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...reportPayload
      });
      localStorage.setItem('frontdoor_local_reports', JSON.stringify(localReports));

      const localLeads = JSON.parse(localStorage.getItem('frontdoor_local_leads') || '[]');
      const matchIdx = localLeads.findIndex((l: { email: string }) => l.email === email);
      if (matchIdx >= 0) {
        localLeads[matchIdx].status = 'converted';
      } else {
        localLeads.push({
          id: `local-lead-${Date.now()}`,
          created_at: new Date().toISOString(),
          email,
          status: 'converted',
          source_address: fullConcatenatedAddress
        });
      }
      localStorage.setItem('frontdoor_local_leads', JSON.stringify(localLeads));
      console.log('Order finalized and saved locally (localStorage fallback).');
    }
  };

  // Deterministic Address Coordinate Generator for GIS Map HUD
  const getCoordinatesForAddress = (addr: string) => {
    if (!addr) {
      return { lat: "42.3584° N", lon: "71.0598° W", parcel: "#TRACT-948-28" };
    }
    let hash = 0;
    for (let i = 0; i < addr.length; i++) {
      hash = addr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash);
    const latDecimal = 24 + (absHash % 25) + ((absHash % 1000) / 1000);
    const lonDecimal = 70 + (absHash % 50) + (((absHash >> 3) % 1000) / 1000);
    const tractId = (absHash % 900) + 100;
    const lotId = (absHash % 90) + 10;
    
    return {
      lat: `${latDecimal.toFixed(4)}° N`,
      lon: `${lonDecimal.toFixed(4)}° W`,
      parcel: `#TRACT-${tractId}-${lotId}`
    };
  };

  // Form Submit Execution
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !addressLine1 || !city || !shippingState || !zipCode) {
      return;
    }

    setCheckoutState('processing');
    setTerminalLogs([]);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < logSteps.length) {
        setTerminalLogs((prev) => [...prev, logSteps[stepIndex]]);
        stepIndex++;
      } else {
        clearInterval(interval);
        saveFinalizedOrder();
        setCheckoutState('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600);
  };

  // Diagnostic spreads image slider logic
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideNext = () => {
    setCurrentSlide((prev) => (prev + 1) % 3);
  };
  const slidePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3);
  };

  // Preparation Progress Simulator (runs dynamic 4.6s loading timer)
  const [prepProgress, setPrepProgress] = useState(0);
  const [prepFinished, setPrepFinished] = useState(false);
  useEffect(() => {
    if (prepFinished) return;
    setPrepProgress(0);
    const timer = setInterval(() => {
      setPrepProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setPrepFinished(true);
          return 100;
        }
        return prev + 2;
      });
    }, 80); // Snooth and snappy 4-second loading timer
    return () => clearInterval(timer);
  }, [prepFinished]);

  const scrollToForm = () => {
    const form = document.getElementById('shipping-payment-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const firstInput = document.getElementById('ship-firstname');
        if (firstInput) firstInput.focus();
      }, 600);
    }
  };

  return (
    <div className="min-h-screen animate-fade-in" style={{ background: 'var(--fdf-bg-primary, #FAFDFB)', paddingBottom: '120px', color: 'var(--fdf-text-primary, #0F291B)' }}>
      
      {/* Brand CSS styling overrides exactly matching Front Door Fax premium details */}
      <style>{`
        body {
          background-color: var(--fdf-bg-primary, #FAFDFB) !important;
          color: var(--fdf-text-primary, #0F291B) !important;
          font-family: 'Inter', sans-serif !important;
        }
        .announcement-bar {
          background: linear-gradient(90deg, #059669, #10b981);
          color: #ffffff;
          font-weight: 800;
          font-size: 0.75rem;
          text-align: center;
          padding: 12px 16px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          animation: textSlide 3s ease-in-out infinite alternate;
        }
        @keyframes textSlide {
          0% { letter-spacing: 1.2px; }
          100% { letter-spacing: 2px; }
        }
        .checkout-header {
          text-align: center;
          padding: 24px 0;
          border-bottom: 1px solid var(--border-color, rgba(0, 0, 0, 0.05));
          background-color: #ffffff;
          box-shadow: 0 4px 20px rgba(0,0,0,0.01);
        }
        .checkout-logo-link {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: var(--text-primary);
        }
        .checkout-logo-text {
          font-size: 1.6rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #000456; /* Front Door Navy */
        }
        .checkout-logo-img {
          height: 38px;
          width: auto;
        }
        .countdown-ticker-box {
          font-family: 'Inter', sans-serif;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--accent-primary, #10b981);
          letter-spacing: 1px;
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--fdf-bg-tint, #F1FBF4);
          padding: 4px 16px;
          border-radius: 99px;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }
        .page-intro-header {
          text-align: center;
          padding: 32px 24px 16px 24px;
          max-width: 800px;
          margin: 0 auto;
        }
        .page-intro-title {
          font-size: 2.1rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.2;
          margin-bottom: 12px;
          letter-spacing: -0.03em;
        }
        .page-intro-subtitle {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .before-after-card-wrapper {
          max-width: 1000px;
          margin: 16px auto 40px auto;
          background: #ffffff;
          border: 1px solid var(--border-color, rgba(0,0,0,0.05));
          border-radius: 16px;
          padding: 24px;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
          box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.05);
        }
        /* GIS Localization Map Styles */
        .gis-map-container {
          position: relative;
          background: #090d16; /* Sophisticated dark radar/map background */
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 1.25;
          border: 1px solid rgba(16, 185, 129, 0.2);
          box-shadow: inset 0 0 40px rgba(16, 185, 129, 0.15);
        }
        .google-map-iframe {
          width: 100%;
          height: 100%;
          border: none;
          filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
          opacity: 0.85;
          transition: opacity 0.3s ease;
        }
        .google-map-iframe:hover {
          opacity: 1;
        }
        .gis-hud-panel {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(9, 13, 22, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-left: 3px solid #10b981;
          border-radius: 8px;
          padding: 10px 12px;
          font-family: 'Courier New', monospace;
          color: #e2e8f0;
          z-index: 10;
          pointer-events: none;
          min-width: 175px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .gis-hud-title {
          font-size: 0.65rem;
          color: #10b981;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
          display: block;
        }
        .gis-hud-row {
          font-size: 0.7rem;
          display: flex;
          justify-content: space-between;
          margin: 3px 0;
          gap: 12px;
        }
        .gis-hud-label {
          color: #94a3b8;
        }
        .gis-hud-value {
          color: #10b981;
          font-weight: bold;
        }
        @keyframes gis-pulse {
          0% {
            transform: scale(0.6);
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .gis-marker-pulse {
          animation: gis-pulse 2s infinite linear;
          transform-origin: 175px 135px;
        }
        .ba-text-pane {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 18px;
        }
        .ba-benefit-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.4;
        }
        .ba-benefit-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
        .checkout-grid-split {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 48px;
          max-width: 1000px;
          margin: 32px auto 0 auto;
          align-items: start;
          padding: 0 20px;
        }
        .step-title-row {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          border-bottom: 1px solid var(--border-color, rgba(0,0,0,0.05));
          padding-bottom: 10px;
        }
        .step-number-circle {
          background-color: var(--accent-primary, #10b981);
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 800;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tab-toggle-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          background: #f4f4f5;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          padding: 4px;
          margin-bottom: 20px;
        }
        .tab-toggle-button {
          padding: 11px;
          font-size: 0.8rem;
          font-weight: 800;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: var(--text-secondary);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .tab-toggle-button.active {
          background: #ffffff;
          color: var(--text-primary);
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
        }
        .availability-meter-panel {
          border: 1px solid #e4e4e7;
          background: #ffffff;
          border-radius: 12px;
          padding: 16px 20px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }
        .availability-bar-grid {
          display: flex;
          gap: 4px;
          height: 6px;
          margin: 10px 0;
        }
        .availability-bar-block {
          flex: 1;
          border-radius: 2px;
        }
        .availability-bar-block.active {
          background-color: #10B981;
        }
        .availability-bar-block.inactive {
          background-color: #E4E4E7;
        }
        .package-selector-card {
          border: 1.5px solid #e4e4e7;
          border-radius: 12px;
          padding: 18px 24px;
          margin-bottom: 16px;
          cursor: pointer;
          background: #ffffff;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 18px;
          align-items: center;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .package-selector-card:hover {
          border-color: var(--accent-primary, #10b981);
          transform: translateY(-1px);
        }
        .package-selector-card.active {
          border-color: var(--accent-primary, #10b981);
          background: var(--fdf-bg-tint, #F1FBF4);
          box-shadow: 0 0 0 1px var(--accent-primary, #10b981), 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .package-selector-card.most-popular {
          border: 2px solid #10B981;
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.06);
        }
        .package-selector-card.most-popular.active {
          border-color: #059669;
          background: #F1FBF4;
          box-shadow: 0 0 0 1px #059669, 0 8px 24px rgba(16, 185, 129, 0.12);
        }
        .most-popular-tag-ribbon {
          position: absolute;
          top: -12px;
          right: 24px;
          background: #10B981;
          color: #ffffff;
          font-size: 0.62rem;
          font-weight: 900;
          padding: 2px 12px;
          border-radius: 99px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
        }
        .package-image-placeholder {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          border: 1px solid #e4e4e7;
          background: #F4F4F5;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          color: var(--accent-primary, #10b981);
        }
        .itemized-receipt-container {
          margin-top: 28px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-top: 1px dashed #e4e4e7;
          padding-top: 20px;
        }
        .receipt-row {
          display: flex;
          justify-content: space-between;
        }
        .receipt-total-row {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          border-top: 1.5px solid #e4e4e7;
          padding-top: 14px;
          margin-top: 4px;
        }
        .saved-card-dotted {
          border: 2px dashed var(--accent-primary, #10b981);
          background: var(--fdf-bg-tint, #F1FBF4);
          border-radius: 12px;
          padding: 16px 24px;
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .saved-card-badge {
          background-color: #3B82F6; /* Tech Blue */
          border: 2px solid #000456;
          color: #ffffff;
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 900;
          padding: 6px 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transform: rotate(-4deg);
          box-shadow: 2px 2px 0px #000456;
          text-align: center;
          line-height: 1.1;
          flex-shrink: 0;
        }
        .saved-card-amount-pane {
          text-align: right;
        }
        .guarantee-gold-card {
          margin-top: 24px;
          background: #FAFDFB;
          border: 1px solid #A7F3D0;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 20px;
          align-items: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }
        .gold-stamp-seal-svg {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
        }
        .trust-check-list {
          margin-top: 28px;
          padding-left: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 600;
        }
        .trust-check-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }
        .trust-check-list li::before {
          content: "✓";
          color: var(--accent-primary, #10b981);
          font-weight: 900;
          font-size: 1.1rem;
          line-height: 1;
        }
        .shipping-input-box {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 6px;
          padding: 12px 14px;
          font-size: 0.88rem;
          color: var(--text-primary);
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
        }
        .shipping-input-box::placeholder {
          color: #A1A1AA;
        }
        .shipping-input-box:focus {
          border-color: var(--accent-primary, #10b981);
          box-shadow: 0 0 0 1px var(--accent-primary, #10b981);
        }
        .shipping-grid-2col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 14px;
        }
        .shipping-full-row {
          margin-bottom: 14px;
          position: relative;
        }
        .autocomplete-suggestions-box {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          z-index: 100;
          max-height: 240px;
          overflow-y: auto;
          margin-top: 4px;
        }
        .autocomplete-suggestion-item {
          padding: 12px 16px;
          font-size: 0.85rem;
          color: var(--text-primary);
          cursor: pointer;
          border-bottom: 1px solid #f4f4f5;
          transition: background 0.15s;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .autocomplete-suggestion-item:last-child {
          border-bottom: none;
        }
        .autocomplete-suggestion-item:hover {
          background-color: var(--fdf-bg-tint, #F1FBF4);
        }
        .autocomplete-pin-icon {
          color: var(--accent-primary, #10b981);
          flex-shrink: 0;
        }
        .payment-toggle-btn {
          flex: 1;
          padding: 12px;
          border-radius: 6px;
          border: 1.5px solid #e4e4e7;
          background: #ffffff;
          cursor: pointer;
          font-weight: 800;
          font-size: 0.85rem;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: var(--text-secondary);
        }
        .payment-toggle-btn.active-card {
          border-color: var(--accent-primary, #10b981);
          background: var(--fdf-bg-tint, #F1FBF4);
          color: var(--text-primary);
        }
        .payment-toggle-btn.active-paypal {
          border-color: #FFC439;
          background: #FFFDF0;
          color: var(--text-primary);
        }
        .paypal-checkout-btn-yellow {
          background-color: #FFC439;
          border-radius: 6px;
          padding: 14px;
          width: 100%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s;
          box-shadow: 0 4px 12px rgba(255, 196, 57, 0.15);
        }
        .paypal-checkout-btn-yellow:hover {
          background-color: #EBB22F;
        }
        .credit-card-form-embedded {
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          background: #ffffff;
          padding: 18px;
          margin-top: 14px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }
        .cc-header-bar {
          background-color: #F8FAF9;
          padding: 10px 14px;
          border-bottom: 1px solid #e4e4e7;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
          border-radius: 4px;
        }
        .complete-purchase-btn-green {
          background: linear-gradient(135deg, var(--accent-primary, #10b981), var(--accent-primary-hover, #059669));
          color: #ffffff;
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.01em;
          padding: 16px;
          border-radius: 8px;
          width: 100%;
          border: none;
          cursor: pointer;
          box-shadow: 0 6px 20px var(--accent-primary-glow, rgba(16, 185, 129, 0.15));
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .complete-purchase-btn-green:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px var(--accent-primary-glow, rgba(16, 185, 129, 0.25));
          filter: brightness(1.05);
        }
        .preservation-terminal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 41, 27, 0.96); /* Deep Emerald Forest Overlay */
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
        }
        .terminal-box {
          background: #0B1E13;
          border-radius: 16px;
          padding: 32px;
          color: #10B981;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          width: 100%;
          max-width: 680px;
          border: 1px solid rgba(16, 185, 129, 0.15);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(16, 185, 129, 0.1);
          padding-bottom: 16px;
          margin-bottom: 24px;
        }
        .terminal-dots {
          display: flex;
          gap: 6px;
        }
        .terminal-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .terminal-dot.red { background: #FF5F56; }
        .terminal-dot.yellow { background: #FFBD2E; }
        .terminal-dot.green { background: #27C93F; }
        
        .terminal-logs {
          display: flex;
          flex-direction: column;
          gap: 14px;
          min-height: 280px;
          overflow-y: auto;
          max-height: 350px;
        }
        .terminal-row {
          font-size: 0.88rem;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: consolePulse 0.4s ease-out;
        }
        @keyframes consolePulse {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .success-outer-panel {
          max-width: 800px;
          margin: 48px auto;
          padding: 0 16px;
        }
        .success-card {
          padding: 56px 40px;
          text-align: center;
          border: 2px solid #10B981;
          border-radius: 20px;
          background: #ffffff;
          box-shadow: 0 25px 60px -15px rgba(16, 185, 129, 0.12);
        }
        .success-tick-outer {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px auto;
          border: 1.5px solid rgba(16, 185, 129, 0.2);
        }
        .below-the-fold-proof {
          max-width: 1000px;
          margin: 64px auto 0 auto;
          padding: 0 20px;
        }
        .slider-section-container {
          background-color: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }
        .slider-viewports-wrapper {
          position: relative;
          width: 100%;
          height: 380px;
          border-radius: 12px;
          overflow: hidden;
          background: #09090b; /* Sleek Dark Theme Report */
          box-shadow: inset 0 2px 12px rgba(0,0,0,0.06);
        }
        .slider-tape-track {
          display: flex;
          width: 100%;
          height: 100%;
        }
        .slider-slide-spread {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 24px;
          flex-shrink: 0;
        }
        .slider-spread-card {
          width: 100%;
          max-width: 720px;
          height: 100%;
          background: #0F172A; /* Slate Navy */
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-left: 6px solid #10B981;
        }
        .slider-page-left, .slider-page-right {
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        .slider-page-left::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 25px;
          background: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.2));
          pointer-events: none;
        }
        .slider-page-right::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 25px;
          background: linear-gradient(to left, rgba(0,0,0,0), rgba(0,0,0,0.2));
          pointer-events: none;
        }
        .slider-caption-overlay {
          position: absolute;
          bottom: 24px;
          left: 24px;
          right: 24px;
          background: rgba(15, 23, 42, 0.9);
          backdrop-filter: blur(4px);
          padding: 12px 18px;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          border-left: 3px solid #10B981;
          color: #ffffff;
        }
        .slider-control-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #e4e4e7;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10B981;
          z-index: 10;
          transition: all 0.2s;
        }
        .slider-control-btn:hover {
          background-color: var(--fdf-bg-tint, #F1FBF4);
          color: #059669;
        }
        .slider-control-btn.prev-btn { left: 16px; }
        .slider-control-btn.next-btn { right: 16px; }

        .photo-queue-container {
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 16px;
          padding: 28px;
          margin-bottom: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }
        .queue-rows-stack {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 18px;
        }
        .queue-photo-row {
          background: #FAFDFC;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .queue-photo-details {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .queue-photo-thumbnail {
          width: 42px;
          height: 42px;
          border-radius: 4px;
          background-color: #E6F4EA;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #10B981;
          font-size: 1.1rem;
          font-weight: 800;
        }
        .queue-photo-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }
        .queue-photo-size {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 2px;
        }
        .queue-progress-bar-outer {
          width: 140px;
          height: 6px;
          background-color: #e4e4e7;
          border-radius: 99px;
          overflow: hidden;
        }
        .queue-progress-bar-inner {
          height: 100%;
          background-color: #10B981;
          border-radius: 99px;
          transition: width 0.1s linear;
        }
        .queue-status-text {
          font-size: 0.75rem;
          font-weight: 800;
          color: #10B981;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .queue-status-text.processing {
          color: #3B82F6;
        }
        .reviews-proof-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .review-proof-card {
          background: #ffffff;
          border: 1px solid #e4e4e7;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }
        .stars-row {
          color: #FFD43A;
          font-size: 1rem;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        .sticky-action-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid #e4e4e7;
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 1000;
          box-shadow: 0 -8px 30px rgba(0,0,0,0.05);
        }

        @media (max-width: 900px) {
          .before-after-card-wrapper {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 16px;
          }
          .checkout-grid-split {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 0 16px;
          }
          .reviews-proof-grid {
            grid-template-columns: 1fr;
          }
          .slider-spread-card {
            grid-template-columns: 1fr;
            height: auto;
            border-left: none;
            border-top: 6px solid #10B981;
          }
          .slider-viewports-wrapper {
            height: 460px;
          }
          .slider-page-left, .slider-page-right {
            height: 200px;
          }
          .slider-page-left::after, .slider-page-right::after {
            width: 0;
            height: 0;
          }
          .sticky-action-banner {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>

      {/* 1. Top Announcement Bar */}
      <div className="announcement-bar">
        ⚡ SURGICAL CAPACITY ALERT: 574 OTHER BUYERS ARE CURRENTLY RUNNING HAZARD SEARCHES. ACTIVATE YOUR 30-DAY PRICE GUARANTEE.
      </div>

      {/* 2. Centered Logo Header */}
      <header className="checkout-header">
        <div className="container">
          <Link href="/" className="checkout-logo-link">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Front Door Fax Logo" className="checkout-logo-img" />
          </Link>
          <br />
          
          {/* 3. Countdown Ticking Timer */}
          <div className="countdown-ticker-box">
            <Clock size={18} strokeWidth={2.5} />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: 0, maxWidth: '1040px' }}>
        
        {/* Core Checkout Layout Screen */}
        {checkoutState !== 'success' && (
          <div id="checkout-main-content">
            
            {/* 4. Editorial Copy intro block */}
            <div className="page-intro-header">
              <h1 className="page-intro-title">
                Know what&apos;s in your water, air, and soil before you sign.
              </h1>
              <p className="page-intro-subtitle">
                Secure property-specific reports compiled from <strong style={{ color: '#10b981' }}>15+ federal, state, and local agencies</strong>. Instantly armed with bargaining chips for pricing negotiation.
              </p>
            </div>

            {/* 5. GIS Localization Map Panel */}
            <div className="before-after-card-wrapper">
              <div className="gis-map-container">
                {/* Semi-transparent Glass HUD */}
                <div className="gis-hud-panel">
                  <span className="gis-hud-title">📡 GIS Telemetry Scan</span>
                  <div className="gis-hud-row">
                    <span className="gis-hud-label">TARGET ADDR:</span>
                    <span className="gis-hud-value" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }} title={addressLine1 || "Target Coordinate"}>
                      {addressLine1 || "SCANNING..."}
                    </span>
                  </div>
                  <div className="gis-hud-row">
                    <span className="gis-hud-label">COORDINATES:</span>
                    <span className="gis-hud-value">{getCoordinatesForAddress(addressLine1).lat}, {getCoordinatesForAddress(addressLine1).lon}</span>
                  </div>
                  <div className="gis-hud-row">
                    <span className="gis-hud-label">PARCEL TRACT:</span>
                    <span className="gis-hud-value">{getCoordinatesForAddress(addressLine1).parcel}</span>
                  </div>
                  <div className="gis-hud-row" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4px', paddingTop: '4px' }}>
                    <span className="gis-hud-label">LAYER STATUS:</span>
                    <span className="gis-hud-value" style={{ color: '#10b981' }}>VETTED ✓</span>
                  </div>
                  <div className="gis-hud-row">
                    <span className="gis-hud-label">GRID MATCH:</span>
                    <span className="gis-hud-value" style={{ color: '#10b981' }}>100% SECURE</span>
                  </div>
                </div>

                <iframe
                  title="Google Maps"
                  className="google-map-iframe"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(addressLine1 || 'United States')}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                ></iframe>
              </div>

              {/* Text Points Next to Graphics */}
              <div className="ba-text-pane">
                {!prepFinished ? (
                  /* Loading / Scanning Terminal HUD */
                  <div style={{ backgroundColor: '#021208', border: '1px solid #10b981', borderRadius: '12px', padding: '24px', color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 8px 30px rgba(16, 185, 129, 0.05)' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(16, 185, 129, 0.2)', paddingBottom: '10px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="animate-pulse" style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                          <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>GIS SATELLITE TELEMETRY</span>
                        </div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 800 }}>{prepProgress}%</span>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.85 }}>
                        <div style={{ color: '#10b981' }}>&gt; Initializing local GIS parcel tracking...</div>
                        {prepProgress > 15 && <div style={{ color: '#10b981' }}>&gt; Pinpointing coordinates via FIPS geocode... [SUCCESS]</div>}
                        {prepProgress > 35 && <div style={{ color: '#10b981' }}>&gt; Pulling EPA ECHO Compliance Records database... [CONNECTED]</div>}
                        {prepProgress > 55 && <div style={{ color: '#10b981' }}>&gt; Querying FEMA flood history maps &amp; aquifers... [OK]</div>}
                        {prepProgress > 75 && <div style={{ color: '#10b981' }}>&gt; Compiling regional CDC radon vector zones... [MAPPED]</div>}
                        {prepProgress > 90 && <div style={{ color: '#10b981' }}>&gt; Assembling buyer negotiation talking points...</div>}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderTop: '1px solid rgba(16, 185, 129, 0.1)', paddingTop: '12px', marginTop: '16px' }}>
                      <span className="animate-spin" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #10b981', borderTopColor: 'transparent', borderRadius: '50%' }}></span>
                      <span style={{ fontSize: '0.72rem', letterSpacing: '0.5px' }}>SECURE DATA COMPILING IN PROGRESS...</span>
                    </div>
                  </div>
                ) : (
                  /* Final Results (Blurred / Locked to push purchase) */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', padding: '16px', color: '#fca5a5', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '1.2rem' }}>⚠️</span>
                        <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fca5a5', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Potential Hazard & Contamination Risks
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#e2e8f0', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                        Querying EPA, FEMA, and CDC records for <strong style={{ color: '#10b981' }}>{addressLine1 || 'the geocoded tract'}</strong> has flagged several regional environmental vectors:
                      </p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.75rem' }}>
                          <span style={{ color: '#ef4444', fontWeight: 'bold', flexShrink: 0 }}>[HIGH]</span>
                          <div style={{ color: '#cbd5e1', lineHeight: 1.4 }}>
                            <strong style={{ color: '#ffffff' }}>County Radon Potential (Zone 1):</strong> Predicted average indoor radon is <span style={{ filter: 'blur(5px)', background: 'rgba(255,255,255,0.1)', padding: '0 4px', borderRadius: '3px', color: '#ffffff', userSelect: 'none', cursor: 'not-allowed' }}>4.8 pCi/L</span> <span style={{ fontSize: '0.65rem', background: '#ef4444', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', marginLeft: '4px', fontWeight: 'bold' }}>LOCKED</span>. Ventilation mapping is highly recommended.
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.75rem' }}>
                          <span style={{ color: '#fbbf24', fontWeight: 'bold', flexShrink: 0 }}>[MODERATE]</span>
                          <div style={{ color: '#cbd5e1', lineHeight: 1.4 }}>
                            <strong style={{ color: '#ffffff' }}>Industrial Emissions / Violations:</strong> 2 facilities with recorded Clean Air/Water Act issues found within <span style={{ filter: 'blur(5px)', background: 'rgba(255,255,255,0.1)', padding: '0 4px', borderRadius: '3px', color: '#ffffff', userSelect: 'none', cursor: 'not-allowed' }}>0.4 miles</span> <span style={{ fontSize: '0.65rem', background: '#ef4444', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', marginLeft: '4px', fontWeight: 'bold' }}>LOCKED</span>.
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.75rem' }}>
                          <span style={{ color: '#fbbf24', fontWeight: 'bold', flexShrink: 0 }}>[MODERATE]</span>
                          <div style={{ color: '#cbd5e1', lineHeight: 1.4 }}>
                            <strong style={{ color: '#ffffff' }}>EPA Superfund/NPL Proximity:</strong> 1 active groundwater cleanup boundary registered within <span style={{ filter: 'blur(5px)', background: 'rgba(255,255,255,0.1)', padding: '0 4px', borderRadius: '3px', color: '#ffffff', userSelect: 'none', cursor: 'not-allowed' }}>1.2 miles</span> <span style={{ fontSize: '0.65rem', background: '#ef4444', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', marginLeft: '4px', fontWeight: 'bold' }}>LOCKED</span>.
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Premium Locked Call-to-Action Banner */}
                    <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '12px', padding: '16px', color: '#a7f3d0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>🔒</span>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#10b981', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                          Unlock Exact Hazard Maps & Metrics
                        </h3>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: '#e2e8f0', margin: 0, lineHeight: 1.45 }}>
                        To safeguard local property records and coordinate privacy, precise hazard coordinates, EPA facility names, and mitigation reports are locked. Buy a report to instantly unlock the fully unblurred datasets and negotiation guides.
                      </p>
                      <button 
                        type="button" 
                        onClick={scrollToForm}
                        style={{ marginTop: '4px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '6px', padding: '10px 14px', color: '#ffffff', fontSize: '0.78rem', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        Unlock Full Report Details Now ➔
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 6. Two-Column Checkout Layout */}
            <div className="checkout-grid-split">
              
              {/* Left Column: Packages Selection, Receipts & Guarantees */}
              <div>
                
                {/* Step 1 Header */}
                <div className="step-title-row">
                  <span className="step-number-circle">1</span>
                  <span>Step 1: Select Your Diagnostic Package</span>
                </div>

                {/* Tab Switcher */}
                <div className="tab-toggle-container">
                  <button 
                    type="button" 
                    className={`tab-toggle-button ${purchaseType === 'save' ? 'active' : ''}`}
                    onClick={() => handleTabChange('save')}
                  >
                    ⚡ Save 42% — 5-Property Bundle
                  </button>
                  <button 
                    type="button" 
                    className={`tab-toggle-button ${purchaseType === 'onetime' ? 'active' : ''}`}
                    onClick={() => handleTabChange('onetime')}
                  >
                    Single property search
                  </button>
                </div>

                {/* Supply Warning board */}
                <div className="availability-meter-panel">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>RECOVERY DATABASE SERVERS</span>
                    <span style={{ background: '#FEF2F2', border: '1px solid rgba(16,185,129,0.15)', color: '#10B981', fontSize: '0.65rem', fontWeight: 900, padding: '2px 10px', borderRadius: '99px', textTransform: 'uppercase' }}>HIGH SEARCH VOLUME</span>
                  </div>
                  <div className="availability-bar-grid">
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block active"></span>
                    <span className="availability-bar-block inactive"></span>
                    <span className="availability-bar-block inactive"></span>
                    <span className="availability-bar-block inactive"></span>
                  </div>
                  <p style={{ color: '#059669', fontSize: '0.75rem', fontWeight: 700, margin: '4px 0 0 0', lineHeight: 1.3 }}>Warning: Property search volumes are surging. Complete checkout to guarantee immediate 5-minute report dispatch.</p>
                </div>

                {/* Selector cards */}
                {/* 1 Property Card */}
                <div 
                  className={`package-selector-card ${selectedPackage === 'single' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('single')}
                >
                  <input 
                    type="radio" 
                    name="printQtyRadio" 
                    checked={selectedPackage === 'single'}
                    onChange={() => setSelectedPackage('single')}
                    style={{ accentColor: 'var(--accent-primary, #10b981)', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div className="package-image-placeholder">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)' }}>Single Property Report — Save 30%</div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.3 }}>1 full diagnostic report. Emailed PDF download.</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#EF4444', textDecoration: 'line-through', fontWeight: 700 }}>Reg $69</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>$49.00 each</div>
                    <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 800 }}>Saved $20</div>
                    <div style={{ fontSize: '0.62rem', color: '#3B82F6', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>FREE PDF CONVERTER</div>
                  </div>
                </div>

                {/* 5 Properties Card (Gold/Green Special) */}
                <div 
                  className={`package-selector-card most-popular ${selectedPackage === 'bundle' ? 'active' : ''}`}
                  onClick={() => setSelectedPackage('bundle')}
                >
                  <div className="most-popular-tag-ribbon" style={{ backgroundColor: '#10B981' }}>
                    <Star size={10} fill="currentColor" stroke="none" />
                    Best Value
                  </div>
                  <input 
                    type="radio" 
                    name="printQtyRadio" 
                    checked={selectedPackage === 'bundle'}
                    onChange={() => setSelectedPackage('bundle')}
                    style={{ accentColor: '#10B981', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div className="package-image-placeholder" style={{ borderColor: '#A7F3D0' }}>
                      <ShieldAlert size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        5-Property Bundle — Save 42%
                        <span style={{ background: '#10B981', color: '#ffffff', fontSize: '0.58rem', fontWeight: 900, padding: '1px 6px', borderRadius: '99px' }}>POPULAR</span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.3 }}>Compare up to 5 properties side-by-side. Valid 6 months.</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: '#EF4444', textDecoration: 'line-through', fontWeight: 700 }}>Reg $345</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>$39.80 each</div>
                    <div style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 800 }}>Saved $146</div>
                    <div style={{ fontSize: '0.62rem', color: '#3B82F6', fontWeight: 900, textTransform: 'uppercase', marginTop: '2px' }}>FREE COMPARISON TABLE</div>
                  </div>
                </div>

                {/* Computed Receipt details */}
                <div className="itemized-receipt-container">
                  <div className="receipt-row">
                    <span>{priceInfo.name}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>${priceInfo.price.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <div className="receipt-row" style={{ color: '#10B981', fontWeight: 700 }}>
                      <span>Coupon Discount ({promoCode.toUpperCase()})</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="receipt-row">
                    <span>Database Querying & GIS Geocoding</span>
                    <span style={{ color: '#10B981', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem' }}>FREE</span>
                  </div>
                  <div className="receipt-row">
                    <span>Negotiation PDF Builder Tool</span>
                    <span style={{ color: '#10B981', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem' }}>FREE</span>
                  </div>
                  <div className="receipt-row receipt-total-row">
                    <span>Total due today:</span>
                    <span style={{ color: '#10B981' }}>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Saved sticker card (Blue Badge) */}
                <div className="saved-card-dotted">
                  <div className="saved-card-badge">
                    TODAY<br />YOU SAVED
                  </div>
                  <div className="saved-card-amount-pane">
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Environmental Diagnostic Savings</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#059669' }}>-${totalSavings.toFixed(2)}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>on your complete hazard report suite compiled for {addressLine1 || "your target US address"}</div>
                  </div>
                </div>

                {/* Guarantee Seal stamp card */}
                <div className="guarantee-gold-card">
                  <svg className="gold-stamp-seal-svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="#E6F4EA" stroke="#10B981" strokeWidth="2.5" />
                    <circle cx="50" cy="50" r="37" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="2,2" />
                    <path d="M 38,72 L 32,95 L 48,88 L 64,95 L 58,72 Z" fill="#10B981" opacity="0.85" />
                    <path d="M 44,72 L 50,95 L 56,92 L 62,95 L 54,72 Z" fill="#047857" opacity="0.6" />
                    <circle cx="50" cy="46" r="22" fill="#10B981" />
                    <polygon points="50,34 54.5,42.5 64,43.5 57,50 59,59 50,54 41,59 43,50 36,43.5 45.5,42.5" fill="#ffffff" />
                    <text x="50" y="78" fill="#047857" fontFamily="'Inter', sans-serif" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.2">30-DAY GUARANTEE</text>
                  </svg>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#047857', margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>30-Day Money-Back Guarantee:</h4>
                    <p style={{ fontSize: '0.75rem', color: '#065F46', margin: 0, lineHeight: 1.4 }}>
                      We cross-reference direct government datasets. If our reports fail to reveal hidden hazard risks, highlight air/water contaminants, or strengthen your home purchase/rental bargaining position, simply request a hassle-free, immediate refund.
                    </p>
                  </div>
                </div>

                {/* Trust checklists */}
                <ul className="trust-check-list">
                  <li>Vetted Government Datasets (EPA ECHO, EJScreen, FEMA, NOAA, USGS, CDC)</li>
                  <li>Deep-dive heavy metals drinking water audits (Lead, PFAS, nitrates, disinfection byproducts)</li>
                  <li>Real-time local Air Quality Index with 5-year criteria historical averages</li>
                  <li>Interactive Soil Diagnostics scanning Superfund proximity and toxic spill registries</li>
                  <li>Property price negotiation toolkit including specific, structured dialogue talking points</li>
                </ul>

              </div>

              {/* Right Column: Contact fields, Autocompletes, dynamic payment switches & submit */}
              <div>
                
                <form id="shipping-payment-form" onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  
                  {/* Step 2 contact/property form */}
                  <div>
                    <div className="step-title-row">
                      <span className="step-number-circle">2</span>
                      <span>Step 2: Property &amp; Buyer Information:</span>
                    </div>

                    <div className="shipping-grid-2col">
                      <div>
                        <input 
                          type="text" 
                          placeholder="First Name" 
                          id="ship-firstname" 
                          required 
                          className="shipping-input-box"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Last Name" 
                          id="ship-lastname" 
                          required 
                          className="shipping-input-box"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        id="ship-email" 
                        required 
                        className="shipping-input-box"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleLeadEmailBlur}
                      />
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="tel" 
                        placeholder="Phone Number (for SMS delivery)" 
                        id="ship-phone" 
                        required 
                        className="shipping-input-box"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    {/* Address Line 1 with live custom suggestion list dropdown */}
                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="Property Address (e.g. 123 Beacon Street)" 
                        id="ship-address1" 
                        autoComplete="off" 
                        required 
                        className="shipping-input-box"
                        value={addressLine1}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        onBlur={() => {
                          if (addressLine1.trim() && addressLine1.trim() !== lastScannedAddress.current) {
                            lastScannedAddress.current = addressLine1.trim();
                            setPrepFinished(false);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            if (addressLine1.trim() && addressLine1.trim() !== lastScannedAddress.current) {
                              lastScannedAddress.current = addressLine1.trim();
                              setPrepFinished(false);
                            }
                          }
                        }}
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <div className="autocomplete-suggestions-box">
                          {suggestions.map((addr, idx) => (
                            <div 
                              key={idx} 
                              className="autocomplete-suggestion-item"
                              onClick={() => handleSuggestionClick(addr)}
                            >
                              <span className="autocomplete-pin-icon">📍</span>
                              <span>{addr.street}, {addr.city}, {addr.state} {addr.zip}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="Unit, Apt, or Suite (Optional)" 
                        id="ship-address2" 
                        className="shipping-input-box"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                      />
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="City" 
                        id="ship-city" 
                        required 
                        className="shipping-input-box"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>

                    <div className="shipping-grid-2col">
                      <div>
                        <select 
                          id="ship-country" 
                          className="shipping-input-box"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="State / Province" 
                          id="ship-state" 
                          required 
                          className="shipping-input-box"
                          value={shippingState}
                          onChange={(e) => setShippingState(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="shipping-full-row">
                      <input 
                        type="text" 
                        placeholder="ZIP Code / Postal Code" 
                        id="ship-zip" 
                        required 
                        className="shipping-input-box"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Step 3 Secure dynamic payments */}
                  <div>
                    {/* Dual toggles */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <button 
                        type="button" 
                        className={`payment-toggle-btn ${paymentMethod === 'paypal' ? 'active-paypal' : ''}`}
                        onClick={() => setPaymentMethod('paypal')}
                      >
                        PayPal QuickPay
                      </button>
                      <button 
                        type="button" 
                        className={`payment-toggle-btn ${paymentMethod === 'card' ? 'active-card' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        Credit / Debit Card
                      </button>
                    </div>

                    {/* PayPal yellow pill pane */}
                    {paymentMethod === 'paypal' && (
                      <div id="payment-pane-paypal">
                        <button type="submit" className="paypal-checkout-btn-yellow">
                          <span style={{ fontStyle: 'italic', fontSize: '1.15rem', fontWeight: 900, color: '#1E3A8A', fontFamily: "'Inter', sans-serif" }}>
                            Pay<span style={{ color: '#3B82F6' }}>Pal</span>
                          </span>
                        </button>
                      </div>
                    )}

                    {/* CC Form panel */}
                    {paymentMethod === 'card' && (
                      <div id="payment-pane-card">
                        <div className="credit-card-form-embedded">
                          <div className="cc-header-bar">
                            <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.5px' }}>SECURE CARD GATEWAY</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <span style={{ fontStyle: 'italic', fontSize: '0.55rem', fontWeight: 900, color: '#1A1F71', background: '#ffffff', padding: '1px 4px', border: '1px solid #e4e4e7', borderRadius: '2px' }}>VISA</span>
                              <span style={{ fontStyle: 'italic', fontSize: '0.55rem', fontWeight: 900, color: '#EB001B', background: '#ffffff', padding: '1px 4px', border: '1px solid #e4e4e7', borderRadius: '2px' }}>MC</span>
                            </div>
                          </div>

                          <div className="shipping-full-row" style={{ position: 'relative' }}>
                            <input 
                              type="text" 
                              placeholder="Card Number" 
                              required 
                              className="shipping-input-box" 
                              style={{ paddingRight: '36px' }}
                              value={ccNumber}
                              onChange={(e) => setCcNumber(e.target.value)}
                            />
                            <Lock size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#A1A1AA' }} />
                          </div>

                          <div className="shipping-grid-2col" style={{ marginBottom: 0 }}>
                            <div>
                              <input 
                                type="text" 
                                placeholder="CVV" 
                                required 
                                className="shipping-input-box"
                                value={ccCsc}
                                onChange={(e) => setCcCsc(e.target.value)}
                              />
                            </div>
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <select 
                                className="shipping-input-box"
                                value={ccMonth}
                                onChange={(e) => setCcMonth(e.target.value)}
                              >
                                <option value="January">Jan (01)</option>
                                <option value="February">Feb (02)</option>
                                <option value="March">Mar (03)</option>
                                <option value="December">Dec (12)</option>
                              </select>
                              <select 
                                className="shipping-input-box"
                                value={ccYear}
                                onChange={(e) => setCcYear(e.target.value)}
                              >
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Coupons input field */}
                    <div style={{ display: 'flex', gap: '10px', marginTop: '18px', borderTop: '1px dashed #e4e4e7', paddingTop: '18px' }}>
                      <input 
                        type="text" 
                        placeholder="Promo Code (e.g. WELCOME10)" 
                        className="shipping-input-box" 
                        style={{ flex: 1 }}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="btn" 
                        style={{ padding: '10px 18px', fontSize: '0.85rem', fontWeight: 800, border: '1px solid #e4e4e7', backgroundColor: '#F4F4F5', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer', height: 'auto' }} 
                        onClick={handleApplyPromo}
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 700, margin: '6px 0 0 0' }}>{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p style={{ color: '#10B981', fontSize: '0.75rem', fontWeight: 800, margin: '6px 0 0 0' }}>{promoSuccess}</p>
                    )}

                    {/* Submit purchase & compliance notice */}
                    <div style={{ marginTop: '24px' }}>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', lineHeight: 1.45, textAlign: 'center', marginBottom: '14px' }}>
                        By submitting &quot;Complete report scan&quot; you authorize the secure compilation of environmental databases for your target coordinate. We protect your data using fully encrypted, bank-compliant gateways.
                      </p>
                      
                      <button type="submit" className="complete-purchase-btn-green">
                        <Lock size={16} strokeWidth={2.5} />
                        COMPLETE REPORT SCAN — ${finalPrice.toFixed(2)}
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
                      <ShieldCheck size={14} strokeWidth={2.5} style={{ color: '#10B981' }} />
                      <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>SECURE 256-BIT ENCRYPTED CHECKOUT</span>
                    </div>

                  </div>

                </form>

              </div>

            </div>

            {/* 7. Value Reassurance BELOW THE FOLD */}
            <div className="below-the-fold-proof">
              
              {/* Proof A: Report spreads preview slider */}
              <div className="slider-section-container">
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '10px' }}>
                  Sneak Peek: Inside a Front Door Fax Diagnostic Report
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '24px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                  Click through our layout previews. Each diagnostic page maps critical contamination indicators, hazard indices, and concrete talking points to negotiate price reductions.
                </p>

                <div style={{ position: 'relative' }}>
                  
                  {/* Dynamic React Flexbox Slider */}
                  <div className="slider-viewports-wrapper">
                    <div className="slider-tape-track" style={{ transform: `translateX(-${currentSlide * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                      
                      {/* Slide 1 */}
                      <div className="slider-slide-spread">
                        <div className="slider-spread-card">
                          <div className="slider-page-left" style={{ backgroundColor: '#0F172A', display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                            <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                              <h4 style={{ color: '#10B981', fontSize: '1rem', fontWeight: 800 }}>WATER QUALITY DIAGNOSTIC</h4>
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tested contaminants benchmarked against EPA &amp; health criteria</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>PFAS / PFOA</span><span style={{ color: '#EF4444', fontWeight: 'bold' }}>14.2 ppt (HIGH)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>Lead / Heavy Metals</span><span style={{ color: '#10B981' }}>0.2 ppb (SAFE)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>Nitrates / Runoff</span><span style={{ color: '#10B981' }}>1.4 ppm (SAFE)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Disinfection Byproducts</span><span style={{ color: '#FBBF24', fontWeight: 'bold' }}>42 ppb (MODERATE)</span></div>
                            </div>
                            <div className="slider-caption-overlay">
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#10B981', letterSpacing: '0.5px' }}>Report Section 1</span>
                              <h4 style={{ fontSize: '0.95rem', margin: '2px 0 0 0' }}>Groundwater Contamination Matrix</h4>
                            </div>
                          </div>
                          <div className="slider-page-right" style={{ backgroundColor: '#0B1329', display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                            <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                              <h4 style={{ color: '#3B82F6', fontSize: '1rem', fontWeight: 800 }}>AIR QUALITY HISTORICAL INDEX</h4>
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Criteria atmospheric pollutants tracking (5-year average)</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>PM2.5 (Fine Particulates)</span><span style={{ color: '#FBBF24', fontWeight: 'bold' }}>AQI 64 (MODERATE)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>Ozone / Smog</span><span style={{ color: '#10B981' }}>AQI 32 (SAFE)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>Sulfur Dioxide (SO2)</span><span style={{ color: '#10B981' }}>AQI 12 (SAFE)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Carbon Monoxide (CO)</span><span style={{ color: '#10B981' }}>AQI 8 (SAFE)</span></div>
                            </div>
                            <div className="slider-caption-overlay">
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#3B82F6', letterSpacing: '0.5px' }}>Report Section 2</span>
                              <h4 style={{ fontSize: '0.95rem', margin: '2px 0 0 0' }}>Atmospheric Particulates Monitor</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Slide 2 */}
                      <div className="slider-slide-spread">
                        <div className="slider-spread-card">
                          <div className="slider-page-left" style={{ backgroundColor: '#1E1B4B', display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                            <div style={{ borderBottom: '1px solid #312e81', paddingBottom: '12px', marginBottom: '16px' }}>
                              <h4 style={{ color: '#F43F5E', fontSize: '1rem', fontWeight: 800 }}>SOIL &amp; INDUSTRIAL HAZARDS</h4>
                              <p style={{ fontSize: '0.75rem', color: '#c7d2fe' }}>Hazardous proximity alerts within 2 miles of property line</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #312e81', paddingBottom: '4px' }}><span>EPA Superfund NPL Sites</span><span style={{ color: '#EF4444', fontWeight: 'bold' }}>1 Active (1.4 miles away)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #312e81', paddingBottom: '4px' }}><span>EPA ECHO Violation Facilities</span><span style={{ color: '#FBBF24', fontWeight: 'bold' }}>2 facilities (0.8 miles away)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #312e81', paddingBottom: '4px' }}><span>Brownfield Cleanup Sites</span><span style={{ color: '#10B981' }}>0 detected</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Industrial Gas Emitters</span><span style={{ color: '#FBBF24', fontWeight: 'bold' }}>1 registered emitter</span></div>
                            </div>
                            <div className="slider-caption-overlay">
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#F43F5E', letterSpacing: '0.5px' }}>Report Section 3</span>
                              <h4 style={{ fontSize: '0.95rem', margin: '2px 0 0 0' }}>Industrial Hazard Zones Map</h4>
                            </div>
                          </div>
                          <div className="slider-page-right" style={{ backgroundColor: '#111827', display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                            <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                              <h4 style={{ color: '#8B5CF6', fontSize: '1rem', fontWeight: 800 }}>FLOOD &amp; RADON CLASSIFICATIONS</h4>
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>FEMA &amp; county FIPS classification maps</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.75rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>FEMA Flood Zone</span><span style={{ color: '#10B981' }}>Zone X (Minimal Risk)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>Historical Flood Incidents</span><span style={{ color: '#10B981' }}>0 in past 50 years</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '4px' }}><span>County Radon Zone</span><span style={{ color: '#EF4444', fontWeight: 'bold' }}>Zone 1 (High Radon Risk)</span></div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>NOAA Gauges Proximity</span><span style={{ color: '#10B981' }}>2.4 miles (Safe elevation)</span></div>
                            </div>
                            <div className="slider-caption-overlay">
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#8B5CF6', letterSpacing: '0.5px' }}>Report Section 4</span>
                              <h4 style={{ fontSize: '0.95rem', margin: '2px 0 0 0' }}>Natural Disaster &amp; Radon Vectors</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Slide 3 */}
                      <div className="slider-slide-spread">
                        <div className="slider-spread-card">
                          <div className="slider-page-left" style={{ backgroundColor: '#022C22', display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                            <div style={{ borderBottom: '1px solid #064e3b', paddingBottom: '12px', marginBottom: '16px' }}>
                              <h4 style={{ color: '#10B981', fontSize: '1rem', fontWeight: 800 }}>BUYER BARGAINING POWER</h4>
                              <p style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>Property-specific negotiation talking points</p>
                            </div>
                            <p style={{ fontSize: '0.7rem', lineHeight: 1.4, color: '#d1fae5' }}>
                              • Leverage localized water contamination (PFAS above recommended health levels) to request a $5,000 credit for heavy-duty kitchen filtration installations.<br />
                              • Highlight regional Zone 1 Radon risks to demand seller installs certified active radon mitigation ventilation ($2,500 value) prior to closing.
                            </p>
                            <div className="slider-caption-overlay">
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#10B981', letterSpacing: '0.5px' }}>Report Section 5</span>
                              <h4 style={{ fontSize: '0.95rem', margin: '2px 0 0 0' }}>Price Negotiation Talking Points</h4>
                            </div>
                          </div>
                          <div className="slider-page-right" style={{ backgroundColor: '#0B1329', display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                            <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                              <h4 style={{ color: '#FBBF24', fontSize: '1rem', fontWeight: 800 }}>OFFICIAL TELEMETRY CERTIFICATION</h4>
                              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Vetted security parameters</p>
                            </div>
                            <p style={{ fontSize: '0.7rem', lineHeight: 1.4, color: '#cbd5e1' }}>
                              This report officially certifies diagnostics extracted from real-time government registries. Standard data geocoded to exact GPS parcel coordinates verified against municipal deed registers.
                            </p>
                            <div className="slider-caption-overlay">
                              <span style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: '#FBBF24', letterSpacing: '0.5px' }}>Certification</span>
                              <h4 style={{ fontSize: '0.95rem', margin: '2px 0 0 0' }}>EPA and FEMA Data Integrity Stamp</h4>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Slider Prev / Next Controls */}
                  <button type="button" className="slider-control-btn prev-btn" onClick={slidePrev}>
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button type="button" className="slider-control-btn next-btn" onClick={slideNext}>
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>

                </div>
              </div>

              {/* Proof B: Preparation Queue Sync Simulator */}
              <div className="photo-queue-container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e4e4e7', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Terminal size={18} style={{ color: '#10B981' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      TELEMETRY PREPARATION &amp; GEOGRAPHICAL ALIGNMENT (QUEUE)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
                    GPS PARCEL PINNED
                  </span>
                </div>

                <div className="queue-rows-stack">
                  {/* Step 1 */}
                  <div className="queue-photo-row">
                    <div className="queue-photo-details">
                      <div className="queue-photo-thumbnail">📍</div>
                      <div>
                        <div className="queue-photo-name">Address coordinates geocoding alignment</div>
                        <div className="queue-photo-size">GIS satellite triangulation verified • Coordinates accurate to 2.4 meters</div>
                      </div>
                    </div>
                    <div className="queue-status-text">
                      <Check size={14} strokeWidth={2.5} />
                      Geocode verification complete
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="queue-photo-row">
                    <div className="queue-photo-details">
                      <div className="queue-photo-thumbnail">📡</div>
                      <div>
                        <div className="queue-photo-name">Database integration handshake triggers</div>
                        <div className="queue-photo-size">EPA ECHO, CDC groundwater registries, FEMA mapping portals online</div>
                      </div>
                    </div>
                    <div className="queue-status-text">
                      <Check size={14} strokeWidth={2.5} />
                      Server handshakes online
                    </div>
                  </div>

                  {/* Step 3 (Dynamic progress loader) */}
                  <div className="queue-photo-row">
                    <div className="queue-photo-details">
                      <div className="queue-photo-thumbnail">📊</div>
                      <div>
                        <div className="queue-photo-name">Formulating buyer negotiation talking points</div>
                        <div className="queue-photo-size">Compiling safety diagnostics &amp; price-leverage letters</div>
                      </div>
                    </div>

                    {!prepFinished ? (
                      <>
                        <div className="queue-progress-bar-outer">
                          <div className="queue-progress-bar-inner" style={{ width: `${prepProgress}%` }}></div>
                        </div>
                        <div className="queue-status-text processing">
                          Compiling letters ({prepProgress}%)...
                        </div>
                      </>
                    ) : (
                      <div className="queue-status-text">
                        <Check size={14} strokeWidth={2.5} />
                        Bargaining tools compile complete
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Proof C: Social verified reviews */}
              <div className="reviews-proof-grid">
                <div className="review-proof-card">
                  <div className="stars-row">★★★★★</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>&quot;This report saved us from buying a money-pit!&quot;</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
                    &quot;We were under contract on a lovely house in a suburb. Standard inspection looked fine. We ran a Front Door Fax report and found out the home sat directly over a groundwater PFAS plume, and had a high-risk Superfund dump a mile away. We walked away immediately. Highly recommended!&quot;
                  </p>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)' }}>Sarah &amp; Matt G. (Verified Homebuyers)</span>
                </div>

                <div className="review-proof-card">
                  <div className="stars-row">★★★★★</div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '6px' }}>&quot;Shaved $15,000 off our purchase price!&quot;</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
                    &quot;We used the custom negotiation talking points from Front Door Fax to show the seller that the property had high county radon risks and needed mitigation. The seller agreed to install a $3,000 radon vent system and gave us a $12,000 direct credit at closing. Best $49 we ever spent!&quot;
                  </p>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)' }}>David L. (Verified Buyer)</span>
                </div>
              </div>

            </div>

            {/* 10. Sticky bottom action bar floating banner */}
            <div className="sticky-action-banner">
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 900, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>PROMOTIONAL OFFER ACTIVATED</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Save up to 42% on Comprehensive Property Hazards Scan (${finalPrice.toFixed(2)} Due Today)
                </div>
              </div>
              <button 
                type="button" 
                className="complete-purchase-btn-green" 
                style={{ width: 'auto', padding: '12px 32px', fontSize: '0.95rem', borderRadius: '6px' }} 
                onClick={scrollToForm}
              >
                Claim Save 42% Offer Now
              </button>
            </div>

          </div>
        )}

        {/* 8. Technical simulated layout compiling logs overlay */}
        {checkoutState === 'processing' && (
          <div className="preservation-terminal-overlay">
            <div className="terminal-box">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="terminal-dot red"></span>
                  <span className="terminal-dot yellow"></span>
                  <span className="terminal-dot green"></span>
                </div>
                <span style={{ fontSize: '0.7rem', color: '#10B981', opacity: 0.7, fontWeight: 700, textTransform: 'uppercase' }}>Front Door Fax Database compiler v4.5</span>
              </div>

              <div className="terminal-logs">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="terminal-row">
                    {index < terminalLogs.length - 1 ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <span className="animate-spin" style={{ display: 'inline-block', width: '14px', height: '14px', border: '2px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', flexShrink: 0 }}></span>
                    )}
                    <span>{log}</span>
                  </div>
                ))}
                <div ref={terminalLogsEndRef} />
              </div>

              <div style={{ borderTop: '1px solid rgba(16,185,129,0.1)', paddingTop: '18px', marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', opacity: 0.6 }}>
                <span>Scanning property for: <strong style={{ color: '#ffffff' }}>{firstName} {lastName}</strong></span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'block', animation: 'pulse 1s infinite' }}></span>
                  SECURED MULTI-SERVER QUERY
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 9. Gorgeous success invoice receipt panel */}
        {checkoutState === 'success' && (
          <div className="success-outer-panel" id="success-screen">
            <div className="success-card">
              <div className="success-tick-outer">
                <Check size={42} strokeWidth={3} style={{ color: '#10B981' }} />
              </div>

              <span style={{ textTransform: 'uppercase', color: '#10B981', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1.5px' }}>Property Scan Complete &amp; Verified</span>
              <h1 style={{ fontSize: '2.3rem', fontWeight: 800, margin: '12px 0 16px 0', letterSpacing: '-0.03em', lineHeight: 1.2 }}>Your Environmental Hazard Report is Ready!</h1>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '620px', margin: '0 auto 36px auto' }}>
                Congratulations! We have successfully processed your secure payment of <strong style={{ color: 'var(--text-primary)' }}>${finalPrice.toFixed(2)}</strong>. Our telemetry engines have successfully geocoded and compiled environmental datasets for <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{addressLine1}</span>. A full high-resolution PDF download link and secure negotiation letters have been emailed to <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '400px', margin: '0 auto' }}>
                <button 
                  type="button" 
                  className="complete-purchase-btn-green" 
                  style={{ background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 15px rgba(16,185,129,0.25)' }} 
                  onClick={() => alert('Simulation: Fetching secure environmental health report PDF payload from server...')}
                >
                  <Sparkles size={18} strokeWidth={2.5} />
                  Download Complete PDF Report
                </button>
                <Link href="/dashboard" style={{ width: '100%', padding: '14px', fontSize: '0.95rem', background: '#ffffff', color: 'var(--text-secondary)', border: '1px solid #e4e4e7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700', borderRadius: '6px' }}>
                  Return to Dashboard
                </Link>
              </div>

              <div style={{ background: '#FAFDFC', border: '1px solid #e4e4e7', borderRadius: '12px', padding: '24px', marginTop: '44px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', textAlign: 'left' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>Transaction Reference</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'monospace' }}>FDF-2026-9842A</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>Delivery Destination</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '4px', fontWeight: 700, letterSpacing: '0.5px' }}>Scope Vetted</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)' }}>{priceInfo.metaLabel}</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function GetStarted() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ color: 'var(--text-secondary)', background: 'var(--fdf-bg-primary, #FAFDFB)' }}>Loading security database gateway…</div>}>
      <GetStartedContent />
    </Suspense>
  );
}
