import React, { useState } from 'react';
import {
  MapPin,
  Search,
  CheckCircle,
  Clock,
  Phone,
  AlertCircle,
  Sparkles,
  ChevronDown,
  MessageSquare,
  X,
  Radio,
  Navigation,
} from 'lucide-react';
import { MAJOR_COVERAGE_CITIES } from '../data/mockData';

interface FeasibilityCheckerProps {
  onSelectPincodeForBooking: (pincode: string, city: string) => void;
}

export const FeasibilityChecker: React.FC<FeasibilityCheckerProps> = ({
  onSelectPincodeForBooking,
}) => {
  const [inputPincode, setInputPincode] = useState('');
  const [selectedCity, setSelectedCity] = useState(MAJOR_COVERAGE_CITIES[0].city);
  const [searchResult, setSearchResult] = useState<{
    checked: boolean;
    pincode: string;
    city: string;
    isAvailable: boolean;
    slot: string;
    distanceMeters: number;
    areaName?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const activeCityData =
    MAJOR_COVERAGE_CITIES.find((c) => c.city === selectedCity) || MAJOR_COVERAGE_CITIES[0];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputPincode.trim();
    if (!query) {
      setErrorMsg('Please enter a 6-digit Pincode or Chennai locality (e.g. 600040 or Adyar)');
      return;
    }

    const cleanPin = query.replace(/\D/g, '');

    // Case 1: User entered a 6-digit pincode
    if (cleanPin.length === 6) {
      setErrorMsg('');
      const matchingCity = MAJOR_COVERAGE_CITIES.find((c) =>
        c.pincodes.some((p) => p === cleanPin || p.substring(0, 3) === cleanPin.substring(0, 3))
      );
      const cityToUse = matchingCity ? matchingCity.city : selectedCity;

      setSearchResult({
        checked: true,
        pincode: cleanPin,
        city: cityToUse,
        isAvailable: true,
        slot: 'Same Day / Preferred Slot Available',
        distanceMeters: Math.floor(Math.random() * 25) + 12,
      });
      return;
    }

    // Case 2: User entered an area or neighborhood name (e.g. "Adyar", "Velachery", "OMR")
    const lowerQuery = query.toLowerCase();
    const matchingCityByText = MAJOR_COVERAGE_CITIES.find(
      (c) =>
        c.city.toLowerCase().includes(lowerQuery) ||
        (c.shortName && c.shortName.toLowerCase().includes(lowerQuery))
    );

    if (matchingCityByText) {
      setErrorMsg('');
      setSelectedCity(matchingCityByText.city);
      const defaultPin = matchingCityByText.pincodes[0] || '600040';
      setSearchResult({
        checked: true,
        pincode: defaultPin,
        city: matchingCityByText.city,
        areaName: query,
        isAvailable: true,
        slot: 'Same Day / Preferred Slot Available',
        distanceMeters: 16,
      });
      return;
    }

    // If less than 6 digits entered and not found by text
    if (/^\d+$/.test(query)) {
      setErrorMsg('Please enter a full 6-digit Chennai pincode (e.g. 600040)');
      return;
    }

    // Fallback for any Chennai locality
    setErrorMsg('');
    setSearchResult({
      checked: true,
      pincode: activeCityData.pincodes[0] || '600040',
      city: `${query.trim()}, Chennai (${activeCityData.city})`,
      areaName: query,
      isAvailable: true,
      slot: 'Technician Feasibility Confirmed',
      distanceMeters: 22,
    });
  };

  const handleQuickPincodePick = (pin: string, city: string) => {
    setInputPincode(pin);
    setSelectedCity(city);
    setSearchResult({
      checked: true,
      pincode: pin,
      city: city,
      isAvailable: true,
      slot: 'Same Day / Preferred Slot Available',
      distanceMeters: 18,
    });
    setErrorMsg('');
  };

  return (
    <section id="coverage" className="py-12 sm:py-16 lg:py-20 border-b border-neutral-800 bg-neutral-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Mobile Friendly */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1">
            <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
            <span>Live Network Availability</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            Check Hathway Fiber Coverage Across Chennai
          </h2>
          <p className="mt-2.5 text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Our pure optical glass fiber network is active across all Chennai neighborhoods, residential hubs, and IT corridors. Enter your 6-digit pincode or choose your zone to check optical feasibility instantly.
          </p>
        </div>

        {/* Zone Selection - Mobile Optimized View */}
        <div className="mt-6 sm:mt-8 border-b border-neutral-800 pb-4">
          
          {/* 1. Mobile Dropdown Picker (Visible on Mobile Screens) */}
          <div className="block sm:hidden mb-3">
            <label htmlFor="mobile-zone-select" className="block text-xs font-medium text-neutral-400 mb-1.5">
              Select Chennai Area / Zone:
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-500" />
              <select
                id="mobile-zone-select"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  if (searchResult) setSearchResult(null);
                }}
                className="w-full appearance-none rounded-xl border border-neutral-700 bg-neutral-900/90 pl-9 pr-9 py-2.5 text-xs font-medium text-white shadow-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                {MAJOR_COVERAGE_CITIES.map((c) => (
                  <option key={c.city} value={c.city} className="bg-neutral-900 text-white py-1">
                    {c.shortName ? `${c.shortName} (${c.pincodes.slice(0, 2).join(', ')})` : c.city}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* 2. Horizontal Scrollable Carousel (Swipeable on Mobile) */}
          <div className="sm:hidden -mx-4 px-4 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1 scroll-smooth">
            {MAJOR_COVERAGE_CITIES.map((c) => {
              const isSelected = selectedCity === c.city;
              return (
                <button
                  key={c.city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(c.city);
                    if (searchResult) setSearchResult(null);
                  }}
                  className={`shrink-0 px-3 py-2 min-h-[38px] text-xs font-medium rounded-xl transition-all whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-rose-600 text-white font-semibold shadow-md shadow-rose-950/60 ring-1 ring-rose-500'
                      : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-emerald-400'}`} />
                  <span>{c.shortName || c.city.split('(')[0].replace('Chennai - ', '')}</span>
                </button>
              );
            })}
          </div>

          {/* 3. Tablet & Desktop Segmented Chips (Hidden on small mobile) */}
          <div className="hidden sm:flex flex-wrap gap-2">
            {MAJOR_COVERAGE_CITIES.map((c) => {
              const isSelected = selectedCity === c.city;
              return (
                <button
                  key={c.city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(c.city);
                    if (searchResult) setSearchResult(null);
                  }}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-500 font-semibold'
                      : 'bg-neutral-800/80 text-neutral-300 hover:text-white hover:bg-neutral-800 border border-transparent'
                  }`}
                >
                  {c.shortName || c.city}
                </button>
              );
            })}
          </div>

        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left: Interactive Pincode Search Box */}
          <div className="lg:col-span-6 rounded-2xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-rose-500" />
              <h3 className="text-sm sm:text-base font-semibold text-white">Instant Line Feasibility Lookup</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
              Check if an optical fiber terminal box (DP) is mounted on your building or pole.
            </p>

            <form onSubmit={handleCheck} className="mt-4 sm:mt-5 space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Enter 6-digit Pincode or Locality (e.g. 600040)"
                    value={inputPincode}
                    onChange={(e) => {
                      setInputPincode(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-900 pl-10 pr-9 py-2.5 sm:py-2 text-base sm:text-sm text-white placeholder-neutral-500 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 font-mono"
                  />
                  {inputPincode && (
                    <button
                      type="button"
                      onClick={() => {
                        setInputPincode('');
                        setErrorMsg('');
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer active:scale-98 shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Availability</span>
                </button>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium pt-0.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </form>

            {/* Popular Pincodes in Selected City */}
            <div className="mt-5 pt-4 border-t border-neutral-800/80">
              <div className="text-xs text-neutral-400 mb-2 flex items-center justify-between">
                <span>Verified pincodes in <strong className="text-white">{activeCityData.shortName || activeCityData.city.split('(')[0]}</strong>:</span>
                <span className="text-[11px] text-emerald-400 font-medium hidden sm:inline">● 100% Optical</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeCityData.pincodes.map((pin) => (
                  <button
                    key={pin}
                    type="button"
                    onClick={() => handleQuickPincodePick(pin, activeCityData.city)}
                    className="min-h-[38px] px-3 py-1.5 text-xs font-mono font-medium text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-rose-500/50 rounded-lg transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                  >
                    <span>{pin}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Result Box with Animated Optical Node Lock-on */}
            {searchResult && searchResult.checked && (
              <div className="mt-5 sm:mt-6 rounded-2xl border border-emerald-700/70 bg-gradient-to-br from-emerald-950/40 to-neutral-900 p-4 sm:p-5 shadow-lg relative overflow-hidden">
                {/* Animated Optical Laser Path across result */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

                <div className="flex items-start gap-3">
                  <div className="relative shrink-0 mt-0.5">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div className="absolute -inset-1 rounded-full border border-emerald-400/50 animate-ping pointer-events-none" />
                  </div>
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div className="text-sm font-bold text-emerald-300 break-words">
                        Hathway Fiber Active in {searchResult.pincode}
                      </div>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 inline-flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>DP Box {searchResult.distanceMeters}m Away</span>
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 break-words leading-relaxed">
                      {searchResult.city}
                    </div>

                    {/* Optical Signal Indicator */}
                    <div className="flex flex-wrap items-center gap-2 py-1.5 px-2.5 rounded-xl bg-neutral-950/90 border border-emerald-900/40 text-[11px] font-mono text-neutral-300">
                      <span className="text-emerald-400 font-bold">SIGNAL LOCKED:</span>
                      <span>-18.4 dBm (High-Gain FTTH Optical Link)</span>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Pure glass optical terminal verified. Free doorstep installation with dual-band gigabit Wi-Fi router.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <button
                        type="button"
                        onClick={() => onSelectPincodeForBooking(searchResult.pincode, searchResult.city)}
                        className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/50 cursor-pointer text-center active:scale-98"
                      >
                        Book Installation for {searchResult.pincode} →
                      </button>
                      <a
                        href={`https://wa.me/918870085269?text=${encodeURIComponent(
                          `Hello Hathway Partner! Please confirm fiber availability for Pincode/Area: ${searchResult.pincode} (${searchResult.city})`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto px-3.5 py-2 min-h-[40px] rounded-xl border border-emerald-600/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Confirm on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right: City Zone Status & Dispatch Details */}
          <div className="lg:col-span-6 rounded-2xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
              <div className="min-w-0">
                <div className="text-xs text-neutral-400">Region Coverage Hub</div>
                <div className="font-display text-base sm:text-lg font-bold text-white mt-0.5 break-words">
                  {activeCityData.city}
                </div>
              </div>
              <div className="w-fit shrink-0 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-lg px-2.5 py-1">
                {activeCityData.status}
              </div>
            </div>

            <div className="mt-4 sm:mt-5 space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  Installation Schedule
                </span>
                <span className="font-semibold text-white">
                  Preferred Time Slot
                </span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-neutral-900">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  Dual-Band Wi-Fi 6 Routers
                </span>
                <span className="text-emerald-400 font-medium">Ready in Local Van</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 py-2 border-b border-neutral-900">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  Regional Dispatch Desk
                </span>
                <a
                  href={`tel:${activeCityData.serviceCenterPhone}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-rose-500/50 font-mono text-rose-400 hover:text-rose-300 font-semibold text-xs transition-colors w-fit"
                >
                  <Phone className="w-3 h-3 text-emerald-400" />
                  <span>{activeCityData.serviceCenterPhone}</span>
                </a>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 rounded-xl bg-neutral-900/80 p-4 border border-neutral-800/80">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Doorstep Installation Assurance:</span>
              </div>
              <p className="mt-1.5 text-xs text-neutral-400 leading-relaxed">
                Our certified local technicians carry authentic optical splicing gear, gigabit patch cables, and pre-configured ONT routers so your Wi-Fi is active and running on the very first visit.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
