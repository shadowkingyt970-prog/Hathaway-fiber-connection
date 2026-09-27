import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Tv,
  Laptop,
  Gamepad2,
  Smartphone,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface BroadbandNetworkAnimationProps {
  onExplorePlans?: () => void;
}

export const BroadbandNetworkAnimation: React.FC<BroadbandNetworkAnimationProps> = ({
  onExplorePlans,
}) => {
  const [activeMode, setActiveMode] = useState<'300m' | '200m' | '100m'>('300m');
  const [currentSpeed, setCurrentSpeed] = useState(298.4);
  const [currentUpload, setCurrentUpload] = useState(296.8);
  const [currentPing, setCurrentPing] = useState(3);
  const [currentJitter, setCurrentJitter] = useState(0.8);
  const [packetCounter, setPacketCounter] = useState(14820);

  // Live telemetry fluctuation to mimic authentic GPON optical line throughput
  useEffect(() => {
    const updateSpeeds = () => {
      setPacketCounter((prev) => prev + Math.floor(Math.random() * 45) + 18);

      if (activeMode === '300m') {
        const down = +(292 + Math.random() * 14.5).toFixed(1); // 292 - 306.5 Mbps
        const up = +(down * (0.97 + Math.random() * 0.04)).toFixed(1);
        setCurrentSpeed(down);
        setCurrentUpload(up);
        setCurrentPing(Math.floor(2 + Math.random() * 2)); // 2-3ms
        setCurrentJitter(+(0.4 + Math.random() * 0.6).toFixed(1));
      } else if (activeMode === '200m') {
        const down = +(194 + Math.random() * 11.2).toFixed(1); // 194 - 205.2 Mbps
        const up = +(down * (0.96 + Math.random() * 0.04)).toFixed(1);
        setCurrentSpeed(down);
        setCurrentUpload(up);
        setCurrentPing(Math.floor(2 + Math.random() * 3)); // 2-4ms
        setCurrentJitter(+(0.5 + Math.random() * 0.7).toFixed(1));
      } else {
        // 100m
        const down = +(98 + Math.random() * 5.8).toFixed(1); // 98 - 103.8 Mbps
        const up = +(down * (0.96 + Math.random() * 0.04)).toFixed(1);
        setCurrentSpeed(down);
        setCurrentUpload(up);
        setCurrentPing(Math.floor(1 + Math.random() * 2)); // 1-2ms
        setCurrentJitter(+(0.3 + Math.random() * 0.5).toFixed(1));
      }
    };

    updateSpeeds();
    const interval = setInterval(updateSpeeds, 1400);

    return () => clearInterval(interval);
  }, [activeMode]);

  return (
    <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6 shadow-2xl overflow-hidden">
      
      {/* Subtle background ambient optical laser glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-rose-600/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl"
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-neutral-800/90 pb-3.5">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-rose-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>FTTH Pure Optical Fiber Link</span>
          </div>
          <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
            Hathway Live Gigabit Terminal
          </h3>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>Optic Link 100%</span>
          </span>
        </div>
      </div>

      {/* Interactive Simulation Modes */}
      <div className="mt-3.5 flex items-center gap-1.5 p-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs">
        <button
          type="button"
          onClick={() => setActiveMode('300m')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center cursor-pointer ${
            activeMode === '300m'
              ? 'bg-rose-600 text-white font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>⚡ 300M Gigabit</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('200m')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center cursor-pointer ${
            activeMode === '200m'
              ? 'bg-rose-600 text-white font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>🚀 200M Streamer</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveMode('100m')}
          className={`flex-1 py-1.5 px-2 rounded-lg font-medium transition-all text-center cursor-pointer ${
            activeMode === '100m'
              ? 'bg-rose-600 text-white font-bold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>🎮 100M Home</span>
        </button>
      </div>

      {/* Animated Optical Conduit & Signal Visualizer */}
      <div className="my-5 relative rounded-xl bg-neutral-900/80 border border-neutral-800/90 p-4 sm:p-5">
        
        {/* Animated Incoming Optical Laser Cable Banner */}
        <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-b border-neutral-800 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-neutral-300">Underground Fiber Feed</span>
          </div>
          <span className="text-rose-400">Pure Glass Optical Core</span>
        </div>

        {/* SVG Laser Path Pulse */}
        <div className="relative h-6 w-full mb-3 flex items-center">
          <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 16">
            <line
              x1="0"
              y1="8"
              x2="400"
              y2="8"
              stroke="#262626"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <line
              x1="0"
              y1="8"
              x2="400"
              y2="8"
              stroke="#e11d48"
              strokeWidth="3"
              strokeLinecap="round"
              className={activeMode === '300m' ? 'animate-fiber-flow-fast' : 'animate-fiber-flow'}
            />
          </svg>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
            <span>ONT IN</span>
          </div>
        </div>

        {/* The Hardware: Dual-Band Wi-Fi 6 Router Box */}
        <div className="relative rounded-xl bg-gradient-to-b from-neutral-850 to-neutral-950 p-4 border border-neutral-700/80 shadow-inner">
          
          {/* External Antennas with Radiating Wi-Fi Wave Rings */}
          <div className="relative flex justify-between px-6 -mt-8 mb-2">
            {/* Antenna 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-10 bg-neutral-700 rounded-t-sm transform -rotate-12 border-t-2 border-rose-500 shadow-sm" />
              {/* Radiating wave rings */}
              <div className="absolute -top-3 w-8 h-8 rounded-full border border-rose-500/40 animate-wifi-pulse-1 pointer-events-none" />
              <div className="absolute -top-3 w-8 h-8 rounded-full border border-rose-500/30 animate-wifi-pulse-2 pointer-events-none" />
            </div>

            {/* Antenna 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-12 bg-neutral-700 rounded-t-sm border-t-2 border-rose-500 shadow-sm" />
              <div className="absolute -top-3 w-9 h-9 rounded-full border border-emerald-400/40 animate-wifi-pulse-2 pointer-events-none" />
            </div>

            {/* Antenna 3 */}
            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-12 bg-neutral-700 rounded-t-sm border-t-2 border-rose-500 shadow-sm" />
              <div className="absolute -top-3 w-9 h-9 rounded-full border border-emerald-400/40 animate-wifi-pulse-1 pointer-events-none" />
            </div>

            {/* Antenna 4 */}
            <div className="relative flex flex-col items-center">
              <div className="w-2.5 h-10 bg-neutral-700 rounded-t-sm transform rotate-12 border-t-2 border-rose-500 shadow-sm" />
              <div className="absolute -top-3 w-8 h-8 rounded-full border border-rose-500/40 animate-wifi-pulse-3 pointer-events-none" />
            </div>
          </div>

          {/* Router Model Name */}
          <div className="flex items-center justify-between text-xs py-1 text-neutral-300 font-mono">
            <span className="text-neutral-400">HW-GPON-AX3000</span>
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 animate-pulse" />
              <span>Dual-Band 5GHz + 2.4GHz</span>
            </span>
          </div>

          {/* Router Diagnostic LED Indicators with Active Flashing */}
          <div className="mt-3 flex items-center justify-between py-2 bg-neutral-900 rounded-lg px-3 border border-neutral-800">
            {/* PWR */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/70" />
              <span className="text-[9px] text-neutral-400 font-mono">PWR</span>
            </div>
            {/* PON */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/70 animate-pulse" />
              <span className="text-[9px] text-emerald-400 font-mono font-bold">PON</span>
            </div>
            {/* OPTIC TX/RX (Flickering with data) */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/70 animate-led-flicker" />
              <span className="text-[9px] text-neutral-400 font-mono">OPTIC</span>
            </div>
            {/* LAN 1G */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/70 animate-led-flicker-slow" />
              <span className="text-[9px] text-neutral-400 font-mono">LAN 1G</span>
            </div>
            {/* 2.4G */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/70 animate-pulse" />
              <span className="text-[9px] text-neutral-400 font-mono">2.4G</span>
            </div>
            {/* 5.0G Wi-Fi 6 */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/70 animate-led-flicker" />
              <span className="text-[9px] text-rose-400 font-mono font-bold">5.0G</span>
            </div>
          </div>

          {/* Real-time Telemetry Readout with Symmetric Upload */}
          <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
            <div className="rounded-lg bg-neutral-950 p-2 border border-neutral-800">
              <div className="text-[10px] text-neutral-400">Download</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                {currentSpeed}
                <span className="text-[10px] font-normal text-rose-400 block sm:inline sm:ml-0.5">M</span>
              </div>
            </div>

            <div className="rounded-lg bg-neutral-950 p-2 border border-neutral-800">
              <div className="text-[10px] text-neutral-400">Upload (1:1)</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">
                {currentUpload}
                <span className="text-[10px] font-normal text-emerald-400 block sm:inline sm:ml-0.5">M</span>
              </div>
            </div>

            <div className="rounded-lg bg-neutral-950 p-2 border border-neutral-800">
              <div className="text-[10px] text-neutral-400">Optical Ping</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">
                {currentPing}
                <span className="text-[10px] font-normal text-neutral-400 block sm:inline sm:ml-0.5">ms</span>
              </div>
            </div>

            <div className="rounded-lg bg-neutral-950 p-2 border border-neutral-800">
              <div className="text-[10px] text-neutral-400">Jitter</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">
                {currentJitter}
                <span className="text-[10px] font-normal text-neutral-400 block sm:inline sm:ml-0.5">ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Smart Devices Fleet in Living Room */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
            <span>Simultaneous Home Devices Connected:</span>
            <span className="text-emerald-400 font-mono font-semibold">4 Active</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            {/* Device 1: Smart TV */}
            <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col items-center text-center">
              <Tv className="w-4 h-4 text-blue-400 mb-1" />
              <span className="font-semibold text-white">Smart 4K TV</span>
              <span className="text-[10px] text-emerald-400 font-mono mt-0.5">Zero Buffer</span>
            </div>

            {/* Device 2: Laptop */}
            <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col items-center text-center">
              <Laptop className="w-4 h-4 text-purple-400 mb-1" />
              <span className="font-semibold text-white">Work Laptop</span>
              <span className="text-[10px] text-emerald-400 font-mono mt-0.5">Zoom HD</span>
            </div>

            {/* Device 3: Gaming */}
            <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col items-center text-center">
              <Gamepad2 className="w-4 h-4 text-rose-400 mb-1" />
              <span className="font-semibold text-white">PS5 / PC</span>
              <span className="text-[10px] text-emerald-400 font-mono mt-0.5">&lt;3ms Ping</span>
            </div>

            {/* Device 4: Phone */}
            <div className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col items-center text-center">
              <Smartphone className="w-4 h-4 text-amber-400 mb-1" />
              <span className="font-semibold text-white">Smartphones</span>
              <span className="text-[10px] text-emerald-400 font-mono mt-0.5">Wi-Fi 6</span>
            </div>
          </div>
        </div>

      </div>

      {/* Perks summary */}
      <div className="space-y-1.5 text-xs text-neutral-300">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Included Hardware:</span>
          <span className="font-medium text-white">Dual-Band Gigabit Wi-Fi Router (Zero Deposit)</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-neutral-400">Free Installation:</span>
          <span className="text-emerald-400 font-medium">100% Waived on 3+ Months Plan</span>
        </div>
      </div>

    </div>
  );
};
