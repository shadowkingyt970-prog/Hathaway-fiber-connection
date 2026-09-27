import React, { useState, useEffect } from 'react';
import { Sparkles, X, MessageCircle, ArrowRight, Zap, Wifi } from 'lucide-react';

interface BroadbandMascotProps {
  onOpenBooking: () => void;
  onScrollToCoverage: () => void;
}

export const BroadbandMascot: React.FC<BroadbandMascotProps> = ({
  onOpenBooking,
  onScrollToCoverage,
}) => {
  const [isBubbleOpen, setIsBubbleOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  const tips = [
    {
      title: 'Vanakkam Chennai!',
      text: 'I am OptiBot! 300 Mbps FTTH pure fiber is active on your street. Ready to connect?',
      cta: 'Book Connection',
      action: 'book',
    },
    {
      title: 'Zero Installation Fee',
      text: 'Get a Free Dual-Band Wi-Fi 6 Router with zero deposit on 3+ month plans!',
      cta: 'See Plans',
      action: 'plans',
    },
    {
      title: 'Sub-3ms Gaming Latency',
      text: 'Immune to monsoon rain and lightning. Pure optical glass straight to your home.',
      cta: 'Check Pincode',
      action: 'coverage',
    },
  ];

  // Rotate message every 9 seconds if not manually interacted with
  useEffect(() => {
    if (hasInteracted) return;
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % tips.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [hasInteracted, tips.length]);

  const currentTip = tips[messageIndex];

  const handleNextTip = () => {
    setHasInteracted(true);
    setMessageIndex((prev) => (prev + 1) % tips.length);
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2000);
  };

  const handleCtaClick = () => {
    if (currentTip.action === 'book') {
      onOpenBooking();
    } else if (currentTip.action === 'plans') {
      const el = document.getElementById('plans');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onScrollToCoverage();
    }
  };

  return (
    <aside aria-label="FiberBot Assistant" className="hidden lg:flex fixed bottom-6 left-6 z-40 items-end gap-3 select-none">
      
      {/* Speech Bubble / Dialogue Window */}
      {isBubbleOpen && (
        <div className="relative w-64 sm:w-72 rounded-2xl border border-neutral-700/80 bg-neutral-950/95 p-3.5 sm:p-4 text-xs shadow-2xl backdrop-blur-md animate-fade-in">
          
          {/* Close dialogue button */}
          <button
            type="button"
            onClick={() => setIsBubbleOpen(false)}
            className="absolute top-2.5 right-2.5 text-neutral-400 hover:text-white p-1 rounded-md hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Badge */}
          <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold mb-1">
            <Sparkles className="w-3 h-3 text-rose-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>OPTIBOT · FIBER COMPANION</span>
          </div>

          <h4 className="font-display text-sm font-bold text-white mb-1">
            {currentTip.title}
          </h4>

          <p className="text-neutral-300 text-[11px] sm:text-xs leading-relaxed mb-3">
            {currentTip.text}
          </p>

          {/* Action Row */}
          <div className="flex items-center gap-2 pt-1 border-t border-neutral-800">
            <button
              type="button"
              onClick={handleCtaClick}
              className="flex-1 py-1.5 px-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] transition-colors flex items-center justify-center gap-1 shadow-sm shadow-rose-950 cursor-pointer"
            >
              <span>{currentTip.cta}</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              type="button"
              onClick={handleNextTip}
              className="py-1.5 px-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium text-[11px] border border-neutral-700 transition-colors cursor-pointer"
              title="Next Tip"
            >
              Next ❯
            </button>
          </div>

          {/* Speech Bubble Arrow pointing towards the mascot */}
          <div className="absolute -bottom-2 left-6 w-3 h-3 rotate-45 border-b border-r border-neutral-700/80 bg-neutral-950" />
        </div>
      )}

      {/* The Animated SVG Character: OptiBot */}
      <div
        onClick={() => {
          setIsBubbleOpen(true);
          handleNextTip();
        }}
        className="group relative cursor-pointer focus:outline-none"
        title="I am OptiBot! Click me for fiber broadband tips & instant booking"
        role="button"
        tabIndex={0}
      >
        {/* Glow ambient aura behind mascot */}
        <div className="absolute inset-0 rounded-full bg-rose-600/30 blur-xl group-hover:bg-rose-500/50 transition-all pointer-events-none" />

        {/* Mascot container with bobbing floating animation */}
        <div className="relative animate-mascot-bob transform transition-transform group-hover:scale-105 active:scale-95">
          
          <svg
            className="w-16 h-20 sm:w-20 sm:h-24 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
            viewBox="0 0 100 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Defs for gradients & filters */}
            <defs>
              <linearGradient id="bodyGrad" x1="50" y1="45" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e1e24" />
                <stop offset="100%" stopColor="#0d0d11" />
              </linearGradient>

              <linearGradient id="armorRose" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>

              <linearGradient id="visorGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>

              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Levitating Thruster Jet Glow */}
            <ellipse cx="50" cy="112" rx="14" ry="4" fill="#06b6d4" opacity="0.6" className="animate-pulse" />
            <ellipse cx="50" cy="110" rx="8" ry="2.5" fill="#f43f5e" opacity="0.9" />

            {/* Thruster Nozzle */}
            <path d="M42 100 L58 100 L54 107 L46 107 Z" fill="#262626" stroke="#404040" strokeWidth="1" />

            {/* Left Hand: Holding Optical Fiber Cable with Sparking Laser Tip */}
            <g className="animate-pulse">
              {/* Cable conduit looped */}
              <path
                d="M72 75 Q85 85 86 65"
                stroke="#e11d48"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Connector Ferrule */}
              <rect x="82" y="58" width="8" height="7" rx="1.5" fill="#525252" stroke="#e11d48" strokeWidth="1" />
              {/* Fiber Optical Core Tip - Emitting Photons */}
              <circle cx="86" cy="56" r="3.5" fill="#38bdf8" filter="url(#laserGlow)" className="animate-ping" />
              <circle cx="86" cy="56" r="2" fill="#ffffff" />
            </g>

            {/* Right Arm: Waving / Welcoming */}
            <g className={isWaving ? 'animate-mascot-wave' : ''}>
              <path
                d="M28 65 Q16 52 14 42"
                stroke="#383838"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Hand with rose glove */}
              <circle cx="14" cy="40" r="5" fill="url(#armorRose)" stroke="#fff" strokeWidth="0.8" />
              {/* Sparkle over hand */}
              <polygon
                points="14,32 16,35 19,35 17,37 18,40 14,38 11,40 12,37 10,35 13,35"
                fill="#facc15"
                className="animate-sparkle"
              />
            </g>

            {/* Mascot Robot Body / Torso */}
            <rect
              x="32"
              y="56"
              width="36"
              height="44"
              rx="12"
              fill="url(#bodyGrad)"
              stroke="#404040"
              strokeWidth="1.5"
            />

            {/* Shoulder Guards */}
            <rect x="25" y="60" width="8" height="12" rx="3" fill="url(#armorRose)" />
            <rect x="67" y="60" width="8" height="12" rx="3" fill="url(#armorRose)" />

            {/* Chest Optical Speed Core (Displays Fiber Pulse) */}
            <circle cx="50" cy="74" r="11" fill="#09090b" stroke="#f43f5e" strokeWidth="1.5" />
            <circle cx="50" cy="74" r="8" fill="#e11d48" opacity="0.25" className="animate-ping" />
            <path
              d="M48 68 L53 73 L49 74 L52 80 L46 75 L49 74 Z"
              fill="#ffffff"
            />
            {/* Speed Label */}
            <text x="50" y="93" textAnchor="middle" fill="#38bdf8" fontSize="6.5" fontFamily="monospace" fontWeight="bold">
              300M
            </text>

            {/* Mascot Head / Helmet */}
            <rect
              x="26"
              y="18"
              width="48"
              height="38"
              rx="14"
              fill="url(#bodyGrad)"
              stroke="#525252"
              strokeWidth="1.5"
            />

            {/* Dual Wi-Fi Antennas on Top of Helmet */}
            {/* Left Antenna */}
            <line x1="38" y1="18" x2="33" y2="8" stroke="#525252" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="33" cy="8" r="3" fill="url(#armorRose)" />
            {/* Left Antenna Wi-Fi wave */}
            <path d="M29 6 A 6 6 0 0 1 37 6" stroke="#f43f5e" strokeWidth="1.5" fill="none" opacity="0.8" className="animate-pulse" />

            {/* Right Antenna */}
            <line x1="62" y1="18" x2="67" y2="8" stroke="#525252" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="67" cy="8" r="3" fill="url(#armorRose)" />
            {/* Right Antenna Wi-Fi wave */}
            <path d="M63 6 A 6 6 0 0 1 71 6" stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8" className="animate-pulse" />

            {/* Visor Area (Glowing Digital Faceplate) */}
            <rect
              x="32"
              y="26"
              width="36"
              height="20"
              rx="8"
              fill="#050b14"
              stroke="#0891b2"
              strokeWidth="1.2"
            />

            {/* Digital Expressive Blinking Eyes (^ ^ smile eyes) */}
            <g className="animate-mascot-blink">
              {/* Left Eye */}
              <path
                d="M38 37 Q42 31 46 37"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Right Eye */}
              <path
                d="M54 37 Q58 31 62 37"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Cute digital blush dots */}
              <circle cx="37" cy="41" r="1.5" fill="#f43f5e" opacity="0.7" />
              <circle cx="63" cy="41" r="1.5" fill="#f43f5e" opacity="0.7" />
            </g>

            {/* Head Crest Armor */}
            <path d="M44 18 L56 18 L53 14 L47 14 Z" fill="url(#armorRose)" />
          </svg>

          {/* Quick Click Hint Tag */}
          <div className="mt-1 text-center">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-neutral-900/90 border border-neutral-700 text-[9px] font-mono text-neutral-300 shadow">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>OptiBot</span>
            </span>
          </div>

        </div>
      </div>

    </aside>
  );
};
