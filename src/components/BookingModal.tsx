import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, MessageSquare, Phone, Calendar, MapPin, Tv, ShieldCheck, Copy, Check, Wifi, Zap, Sparkles, PartyPopper, Mail } from 'lucide-react';
import { BROADBAND_PLANS, MAJOR_COVERAGE_CITIES } from '../data/mockData';
import { Plan, BookingLead, BillingCycle } from '../types';
import { triggerBookingSuccessConfetti } from '../utils/confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlanId?: string;
  initialCycle?: BillingCycle;
  initialMobile?: string;
  initialPincode?: string;
  onLeadCreated: (lead: BookingLead) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPlanId,
  initialCycle = '6m',
  initialMobile = '',
  initialPincode = '',
  onLeadCreated,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState(initialPlanId || 'plan-599');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(initialCycle);
  const [wifiRouterOption, setWifiRouterOption] = useState<'dual_band' | 'wifi_6'>('dual_band');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState(initialMobile);
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(MAJOR_COVERAGE_CITIES[0].city);
  const [pincode, setPincode] = useState(initialPincode || '600040');
  const [fullAddress, setFullAddress] = useState('');
  const [slot, setSlot] = useState('Morning Slot (9 AM - 1 PM)');
  const [includeTvBox, setIncludeTvBox] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedLead, setSubmittedLead] = useState<BookingLead | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Reset submitted state and errors whenever modal is opened
  React.useEffect(() => {
    if (isOpen) {
      setSubmittedLead(null);
      setErrors({});
    }
  }, [isOpen]);

  // Sync state if initial props change
  React.useEffect(() => {
    if (initialPlanId) setSelectedPlanId(initialPlanId);
    if (initialCycle) setBillingCycle(initialCycle);
    if (initialMobile) setMobile(initialMobile);
    if (initialPincode) setPincode(initialPincode);
  }, [initialPlanId, initialCycle, initialMobile, initialPincode]);

  const handleClose = () => {
    setSubmittedLead(null);
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  const currentPlan = BROADBAND_PLANS.find((p) => p.id === selectedPlanId) || BROADBAND_PLANS[0];

  const getPlanPrice = () => {
    if (currentPlan.id === 'plan-399') {
      return 2825;
    }
    switch (billingCycle) {
      case '1m':
        return currentPlan.pricing['1m']?.total || currentPlan.monthlyPrice;
      case '3m':
        return currentPlan.pricing['3m']?.total || currentPlan.threeMonthPrice;
      case '6m':
        return currentPlan.pricing['6m']?.total || currentPlan.sixMonthPrice;
      case '11m':
      case '12m':
        return currentPlan.pricing['11m']?.total || currentPlan.elevenMonthPrice || currentPlan.twelveMonthPrice;
      default:
        return currentPlan.sixMonthPrice;
    }
  };

  const basePrice = getPlanPrice();
  const tvBoxAddon = includeTvBox ? (billingCycle === '1m' ? 250 : billingCycle === '3m' ? 650 : billingCycle === '6m' ? 1200 : 2200) : 0;
  // Wi-Fi 6 upgrade is free on 6m/12m or 200/300 Mbps plans, nominal 499 on shorter low plans
  const wifiUpgradeAddon = (wifiRouterOption === 'wifi_6' && billingCycle === '1m' && currentPlan.speedMbps < 200) ? 350 : 0;
  const rawTotal = basePrice + tvBoxAddon + wifiUpgradeAddon;
  const totalPrice = rawTotal;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length !== 10) {
      errs.mobile = 'Enter a valid 10-digit mobile number';
    }
    const cleanPin = pincode.replace(/\D/g, '');
    if (!cleanPin || cleanPin.length !== 6) {
      errs.pincode = 'Enter a valid 6-digit Pincode';
    }
    if (!fullAddress.trim() || fullAddress.trim().length < 5) {
      errs.fullAddress = 'Please enter complete house/flat and street address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const wifiLabel = wifiRouterOption === 'wifi_6' ? 'Next-Gen Wi-Fi 6 Gigabit Router' : 'Dual-Band (2.4GHz + 5GHz) Optical Wi-Fi Router';

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newLead: BookingLead = {
      id: `HW-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: fullName.trim(),
      mobile: mobile.replace(/\D/g, ''),
      email: email.trim() || undefined,
      city,
      pincode: pincode.replace(/\D/g, ''),
      fullAddress: fullAddress.trim(),
      planId: currentPlan.id,
      planName: currentPlan.name,
      planSpeed: currentPlan.speedMbps,
      billingCycle,
      estimatedAmount: totalPrice,
      installationSlot: slot,
      includeTvBox,
      status: 'New',
      notes: `Speed: ${currentPlan.speedMbps} Mbps | Wi-Fi: ${wifiLabel} | Submitted via Chennai Online Portal.`,
      createdAt: new Date().toLocaleString(),
    };

    onLeadCreated(newLead);
    setSubmittedLead(newLead);
    triggerBookingSuccessConfetti();
  };

  const handleWhatsAppBooking = () => {
    if (!validate()) return;

    const newLead: BookingLead = {
      id: `HW-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      fullName: fullName.trim(),
      mobile: mobile.replace(/\D/g, ''),
      email: email.trim() || undefined,
      city,
      pincode: pincode.replace(/\D/g, ''),
      fullAddress: fullAddress.trim(),
      planId: currentPlan.id,
      planName: currentPlan.name,
      planSpeed: currentPlan.speedMbps,
      billingCycle,
      estimatedAmount: totalPrice,
      installationSlot: slot,
      includeTvBox,
      status: 'New',
      notes: `Speed: ${currentPlan.speedMbps} Mbps | Wi-Fi: ${wifiLabel} | Customer contacted via direct WhatsApp booking.`,
      createdAt: new Date().toLocaleString(),
    };

    onLeadCreated(newLead);

    // Pre-fill message for WhatsApp
    const message = `Hello Hathway Chennai Partner! I want to book a New Hathway Fiber Connection:
- Application ID: ${newLead.id}
- Name: ${fullName}
- Mobile: ${mobile}
- Chennai Locality: ${city}
- Pincode: ${pincode}
- Address: ${fullAddress}
- Selected Speed: ${currentPlan.speedMbps} Mbps (${currentPlan.name})
- Wi-Fi Router: ${wifiLabel}
- Billing Tenure: ${billingCycle.toUpperCase()} (₹${totalPrice})
- Preferred Slot: ${slot}
- Include Digital Cable TV: ${includeTvBox ? 'Yes' : 'No'}

Please confirm technician doorstep dispatch slot.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918870085269?text=${encoded}`, '_blank');
    setSubmittedLead(newLead);
    triggerBookingSuccessConfetti();
  };

  const copyRefId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-7 shadow-2xl my-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </button>

        {submittedLead ? (
          /* Confirmation Screen */
          <div className="text-center py-6">
            {/* Celebration Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-3">
              <PartyPopper className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Woohoo! Booking Registered Successfully</span>
            </div>

            <div className="relative mx-auto w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-950/60">
              <CheckCircle className="w-7 h-7" />
              <button
                type="button"
                onClick={triggerBookingSuccessConfetti}
                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-rose-600 hover:bg-rose-500 text-white shadow transition-transform hover:scale-110 cursor-pointer"
                title="Celebrate again!"
                aria-label="Replay celebration confetti"
              >
                <PartyPopper className="w-3 h-3" />
              </button>
            </div>

            <h3 className="font-display text-2xl font-bold text-white">
              Application Successfully Registered!
            </h3>

            <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{submittedLead.fullName}</strong>. Our Chennai authorized dispatch coordinator is scheduling your technician appointment.
            </p>

            <div className="mt-6 rounded-xl bg-neutral-900 p-4 border border-neutral-800 text-left max-w-lg mx-auto space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <span className="text-neutral-400">Application Reference ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-rose-400">{submittedLead.id}</span>
                  <button
                    onClick={() => copyRefId(submittedLead.id)}
                    className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                    title="Copy ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between">
                <span className="text-neutral-400">Fiber Speed:</span>
                <span className="font-semibold text-white">{submittedLead.planSpeed} Mbps ({submittedLead.planName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Wi-Fi Router:</span>
                <span className="text-emerald-400 font-medium">{wifiLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Tenure & Est. Amount:</span>
                <span className="font-mono text-white">₹{submittedLead.estimatedAmount} ({submittedLead.billingCycle.toUpperCase()})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Chennai Address:</span>
                <span className="text-neutral-200 text-right max-w-xs truncate">{submittedLead.fullAddress}, {submittedLead.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Preferred Slot:</span>
                <span className="text-emerald-400 font-medium">{submittedLead.installationSlot}</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-neutral-400 max-w-md mx-auto">
              Please keep your Aadhaar or Electricity bill ready. You will receive an SMS and WhatsApp update once the technician departs.
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={triggerBookingSuccessConfetti}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <PartyPopper className="w-3.5 h-3.5 text-rose-400" />
                <span>Replay Celebration 🎉</span>
              </button>
              <button
                type="button"
                onClick={() => setSubmittedLead(null)}
                className="px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm shadow-rose-950"
              >
                Book Another Connection
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                Close & Return
              </button>
              <a
                href={`tel:+918870085269`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call (+91 88700 85269)</span>
              </a>
              <a
                href={`mailto:hathwayfiberconnect@gmail.com?subject=New%20Hathway%20Fiber%20Booking%20-%20${encodeURIComponent(submittedLead.id)}&body=Hi%20Hathway%20Desk,%0A%0AHere%20are%20my%20new%20connection%20details:%0AApplication%20ID:%20${encodeURIComponent(submittedLead.id)}%0AName:%20${encodeURIComponent(submittedLead.fullName)}%0APhone:%20${encodeURIComponent(submittedLead.mobile)}%0AAddress:%20${encodeURIComponent(submittedLead.fullAddress)},%20${encodeURIComponent(submittedLead.pincode)}%0APlan:%20${encodeURIComponent(submittedLead.planSpeed)}%20Mbps%20(${encodeURIComponent(submittedLead.planName)})%0AAmount:%20Rs.${encodeURIComponent(submittedLead.estimatedAmount)}%0A%0APlease%20confirm%20technician%20visit.`}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border border-neutral-700 hover:bg-neutral-800 text-neutral-200 text-xs font-semibold transition-colors"
                title="Email copy of this booking to hathwayfiberconnect@gmail.com"
              >
                <Mail className="w-3.5 h-3.5 text-rose-400" />
                <span>Email Desk (hathwayfiberconnect@gmail.com)</span>
              </a>
            </div>
          </div>
        ) : (
          /* Booking Form with Prominent Speed & Wi-Fi Selection */
          <div>
            {/* Modal Header */}
            <div className="border-b border-neutral-800 pb-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hathway Chennai Fiber Desk</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                New Connection Booking
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Select your desired broadband speed & Wi-Fi router below, then enter your installation address.
              </p>
            </div>

            <form onSubmit={handleOnlineSubmit} className="mt-5 space-y-6">
              
              {/* SECTION 1: SELECT SPEED (Interactive Cards) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                    <Zap className="w-3.5 h-3.5 text-rose-500" />
                    <span>Step 1: Choose Your Optical Fiber Speed</span>
                  </label>
                  <span className="text-[11px] text-emerald-400 font-medium">100% Symmetric Speeds</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
                  {BROADBAND_PLANS.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          if (plan.id === 'plan-399') {
                            setBillingCycle('6m');
                          } else if (billingCycle === '1m' && plan.id !== 'plan-749') {
                            setBillingCycle('6m');
                          }
                        }}
                        className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between ${
                          isSelected
                            ? 'bg-rose-950/40 border-rose-500 shadow-md shadow-rose-950/30 ring-1 ring-rose-500/50'
                            : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                        }`}
                      >
                        {/* Top Badges */}
                        {plan.popular && (
                          <span className="absolute -top-2 right-2 bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase shadow">
                            Popular
                          </span>
                        )}
                        {plan.bestValue && (
                          <span className="absolute -top-2 right-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase shadow">
                            Best Value
                          </span>
                        )}

                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="font-display text-xl sm:text-2xl font-black text-white">
                              {plan.speedMbps}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-semibold uppercase">Mbps</span>
                          </div>
                          <div className="text-[11px] font-medium text-neutral-300 truncate mt-0.5">
                            {plan.name}
                          </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-neutral-800/80">
                          <div className="text-xs font-mono font-bold text-rose-400">
                            ₹{plan.monthlyPrice}
                            <span className="text-[10px] font-normal text-neutral-500">/mo</span>
                          </div>
                          <div className="text-[10px] text-neutral-400 truncate mt-0.5">
                            Unlimited Pure Fiber
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 2: SELECT WI-FI ROUTER & EQUIPMENT OPTION */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wide">
                    <Wifi className="w-3.5 h-3.5 text-blue-400" />
                    <span>Step 2: Select Wi-Fi Router & Equipment</span>
                  </label>
                  <span className="text-[11px] text-neutral-400">Zero Security Deposit on 3M+</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Dual-Band Wi-Fi Router */}
                  <div
                    onClick={() => setWifiRouterOption('dual_band')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                      wifiRouterOption === 'dual_band'
                        ? 'bg-blue-950/30 border-blue-500 shadow-md ring-1 ring-blue-500/40'
                        : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="wifiOption"
                      checked={wifiRouterOption === 'dual_band'}
                      onChange={() => setWifiRouterOption('dual_band')}
                      className="mt-1 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">
                          Dual-Band Wi-Fi (2.4GHz + 5GHz)
                        </span>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800/60">
                          FREE
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        Optical ONT Gigabit router with dual antennas. Zero rental fees, zero equipment charges on 3+ month plans.
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Wi-Fi 6 Ultra-Gigabit Router */}
                  <div
                    onClick={() => setWifiRouterOption('wifi_6')}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
                      wifiRouterOption === 'wifi_6'
                        ? 'bg-rose-950/30 border-rose-500 shadow-md ring-1 ring-rose-500/40'
                        : 'bg-neutral-900/80 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="wifiOption"
                      checked={wifiRouterOption === 'wifi_6'}
                      onChange={() => setWifiRouterOption('wifi_6')}
                      className="mt-1 text-rose-600 focus:ring-rose-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          <span>Next-Gen Wi-Fi 6 Router</span>
                          <Sparkles className="w-3 h-3 text-amber-400" />
                        </span>
                        <span className="text-[10px] font-bold text-rose-400 bg-rose-950/70 px-2 py-0.5 rounded border border-rose-800/60">
                          {billingCycle === '6m' || billingCycle === '12m' || currentPlan.speedMbps >= 200 ? 'FREE' : 'Mesh Ready'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        802.11ax OFDMA ultra-low latency router. Engineered for 20+ smart devices, competitive gaming & 4K streams.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: BILLING TENURE & CABLE TV ADD-ON */}
              <div className="p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-neutral-300">
                    Billing Tenure & Package Payment:
                  </label>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    Zero Installation Fee & Free Wi-Fi Router Use Included
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {currentPlan.id === 'plan-399' && (
                    <button
                      type="button"
                      onClick={() => setBillingCycle('6m')}
                      className="p-3 rounded-lg border text-left bg-rose-600 text-white border-rose-500 shadow-sm col-span-full"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">6 Month Plan</span>
                        <span className="text-xs font-mono font-extrabold">₹2,825 Payment</span>
                      </div>
                      <div className="text-[10px] text-rose-100 mt-0.5">
                        Zero Installation Fee · Free Wi-Fi Router Use
                      </div>
                    </button>
                  )}

                  {currentPlan.id === 'plan-499' && [
                    { id: '3m' as BillingCycle, label: '3 Month Plan', pay: '₹2,242 Payment', perk: 'Free Router Use' },
                    { id: '6m' as BillingCycle, label: '6 Month Plan', pay: '₹3,540 Payment', perk: '15 Days Free Included' },
                    { id: '11m' as BillingCycle, label: '11 Month Plan', pay: '₹6,490 Payment', perk: '1 Month Free Included' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBillingCycle(t.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        billingCycle === t.id
                          ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className={`text-xs font-mono font-bold mt-0.5 ${billingCycle === t.id ? 'text-white' : 'text-neutral-200'}`}>
                        {t.pay}
                      </div>
                      <div className={`text-[10px] ${billingCycle === t.id ? 'text-rose-100' : 'text-emerald-400'}`}>
                        {t.perk}
                      </div>
                    </button>
                  ))}

                  {currentPlan.id === 'plan-599' && [
                    { id: '3m' as BillingCycle, label: '3 Month Plan', pay: '₹2,593 Payment', perk: 'Free Router Use' },
                    { id: '6m' as BillingCycle, label: '6 Month Plan', pay: '₹4,241 Payment', perk: '15 Days Free Included' },
                    { id: '11m' as BillingCycle, label: '11 Month Plan', pay: '₹7,777 Payment', perk: '1 Month Free Included' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBillingCycle(t.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        billingCycle === t.id
                          ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className={`text-xs font-mono font-bold mt-0.5 ${billingCycle === t.id ? 'text-white' : 'text-neutral-200'}`}>
                        {t.pay}
                      </div>
                      <div className={`text-[10px] ${billingCycle === t.id ? 'text-rose-100' : 'text-emerald-400'}`}>
                        {t.perk}
                      </div>
                    </button>
                  ))}

                  {currentPlan.id === 'plan-749' && [
                    { id: '1m' as BillingCycle, label: '1 Month Plan', pay: '₹1,356 Payment', perk: 'Fast-Track Booking' },
                    { id: '3m' as BillingCycle, label: '3 Month Plan', pay: '₹2,652 Payment', perk: 'Free Router Use' },
                    { id: '6m' as BillingCycle, label: '6 Month Plan', pay: '₹5,304 Payment', perk: '15 Days Free Included' },
                    { id: '11m' as BillingCycle, label: '11 Month Plan', pay: '₹9,724 Payment', perk: '1 Month Free Included' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setBillingCycle(t.id)}
                      className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        billingCycle === t.id
                          ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                          : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className={`text-xs font-mono font-bold mt-0.5 ${billingCycle === t.id ? 'text-white' : 'text-neutral-200'}`}>
                        {t.pay}
                      </div>
                      <div className={`text-[10px] ${billingCycle === t.id ? 'text-rose-100' : 'text-emerald-400'}`}>
                        {t.perk}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Digital Cable TV Addon */}
                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-neutral-200">
                    <input
                      type="checkbox"
                      checked={includeTvBox}
                      onChange={(e) => setIncludeTvBox(e.target.checked)}
                      className="rounded border-neutral-700 bg-neutral-950 text-rose-600 focus:ring-rose-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="flex items-center gap-1.5">
                      <Tv className="w-3.5 h-3.5 text-blue-400" />
                      <span>Add Hathway Digital HD Cable TV Box (350+ Channels)</span>
                    </span>
                  </label>
                  <span className="text-xs font-mono text-neutral-400">
                    +₹{billingCycle === '1m' ? 250 : billingCycle === '3m' ? 650 : billingCycle === '6m' ? 1200 : 2200}
                  </span>
                </div>
              </div>

              {/* SECTION 4: INSTALLATION ADDRESS (CHENNAI FOCUSED) */}
              <div>
                <label className="text-xs font-bold text-white block mb-2.5 uppercase tracking-wide">
                  Step 3: Customer Details & Chennai Address
                </label>

                <div className="space-y-3">
                  {/* Name and Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. K. Rajesh Kumar"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: '' });
                        }}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                      />
                      {errors.fullName && <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Mobile Number *</label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">+91</span>
                        <input
                          type="tel"
                          inputMode="tel"
                          maxLength={10}
                          placeholder="10-digit mobile"
                          value={mobile}
                          onChange={(e) => {
                            setMobile(e.target.value.replace(/\D/g, ''));
                            if (errors.mobile) setErrors({ ...errors, mobile: '' });
                          }}
                          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 pl-10 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none font-mono"
                        />
                      </div>
                      {errors.mobile && <p className="text-[11px] text-rose-400 mt-1">{errors.mobile}</p>}
                    </div>
                  </div>

                  {/* Chennai Locality and Pincode */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Chennai Area / Locality *</label>
                      <select
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                          const matched = MAJOR_COVERAGE_CITIES.find(c => c.city === e.target.value);
                          if (matched && matched.pincodes.length > 0) {
                            setPincode(matched.pincodes[0]);
                          }
                        }}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                      >
                        {MAJOR_COVERAGE_CITIES.map((c) => (
                          <option key={c.city} value={c.city}>
                            {c.city}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-neutral-300 block mb-1">Area Pincode *</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        placeholder="6-digit Pincode"
                        value={pincode}
                        onChange={(e) => {
                          setPincode(e.target.value.replace(/\D/g, ''));
                          if (errors.pincode) setErrors({ ...errors, pincode: '' });
                        }}
                        className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none font-mono"
                      />
                      {errors.pincode && <p className="text-[11px] text-rose-400 mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* Full Address */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Complete Doorstep Address *</label>
                    <textarea
                      rows={2}
                      placeholder="Flat / Door No, Apartment Name, Street, Landmark"
                      value={fullAddress}
                      onChange={(e) => {
                        setFullAddress(e.target.value);
                        if (errors.fullAddress) setErrors({ ...errors, fullAddress: '' });
                      }}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none"
                    />
                    {errors.fullAddress && <p className="text-[11px] text-rose-400 mt-1">{errors.fullAddress}</p>}
                  </div>

                  {/* Slot */}
                  <div>
                    <label className="text-xs font-medium text-neutral-300 block mb-1">Preferred Technician Installation Slot</label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
                    >
                      <option value="Morning Slot (9 AM - 1 PM)">Morning Slot (9 AM - 1 PM)</option>
                      <option value="Afternoon Slot (1 PM - 5 PM)">Afternoon Slot (1 PM - 5 PM)</option>
                      <option value="Evening Slot (5 PM - 8 PM)">Evening Slot (5 PM - 8 PM)</option>
                      <option value="Weekend Slot (Saturday / Sunday)">Weekend Slot (Saturday / Sunday)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="rounded-xl bg-neutral-900 p-4 border border-neutral-800 text-xs flex items-center justify-between">
                <div>
                  <div className="text-neutral-400">Total Payable at Doorstep:</div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    Includes {currentPlan.speedMbps} Mbps Fiber + {wifiLabel} (Free Installation)
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-2xl font-bold text-white tabular-nums">
                    ₹{totalPrice}
                  </div>
                  <div className="text-[10px] text-neutral-400">+18% GST Applicable</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 active:scale-95"
                  title="Book directly with Chennai partner over WhatsApp"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Book via WhatsApp (+91 88700 85269)</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-rose-950/40 active:scale-95"
                >
                  <span>Submit Online Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
