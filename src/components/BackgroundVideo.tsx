import React, { useRef, useState, useEffect } from 'react';
import { Video, VideoOff, Sparkles } from 'lucide-react';

interface BackgroundVideoProps {
  className?: string;
  overlayOpacity?: string;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  className = '',
  overlayOpacity = 'bg-neutral-950/25',
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [mode, setMode] = useState<'vivid' | 'soft'>('vivid');
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const attemptPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    attemptPlay();

    // Re-attempt play on user interaction if initial autoplay was blocked by browser
    const onUserInteraction = () => {
      if (video.paused) {
        attemptPlay();
      }
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('click', onUserInteraction);
    };

    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('click', onUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onUserInteraction);
      window.removeEventListener('click', onUserInteraction);
    };
  }, []);

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === 'vivid' ? 'soft' : 'vivid'));
  };

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
    >
      {/* HTML5 High-Speed Optical Fiber Loop Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        poster="/videos/fiber_network_poster.jpg"
        onLoadedData={() => setVideoLoaded(true)}
        className={`w-full h-full object-cover object-center transform scale-105 transition-all duration-700 ${
          mode === 'vivid'
            ? 'filter brightness-125 contrast-125 saturate-150 opacity-95'
            : 'filter brightness-105 contrast-110 saturate-110 opacity-70'
        }`}
      >
        <source src="/videos/fiber_network_loop.mp4" type="video/mp4" />
      </video>

      {/* Crystal Clear Contrast Wash - Balanced to preserve maximum video visibility while maintaining text readability */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          mode === 'vivid' ? 'bg-neutral-950/25' : 'bg-neutral-950/50'
        }`}
      />

      {/* Gentle top-bottom subtle gradient so header & next section blend naturally */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-transparent to-neutral-950/85 pointer-events-none" />

      {/* Interactive Controls Pill (Play/Pause & Vividness Toggle) */}
      <div className="pointer-events-auto absolute bottom-3 right-3 sm:bottom-4 sm:right-6 z-10 flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={toggleMode}
          aria-label="Toggle video brightness mode"
          title={mode === 'vivid' ? 'Switch to Soft Contrast' : 'Switch to Vivid Glowing Video'}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-md active:scale-95"
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span className="hidden xs:inline">{mode === 'vivid' ? 'Vivid' : 'Soft'}</span>
        </button>

        <button
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? 'Pause ambient network video' : 'Play ambient network video'}
          title={isPlaying ? 'Pause Ambient Background Video' : 'Play Ambient Background Video'}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950/85 hover:bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 hover:text-white backdrop-blur-md transition-all cursor-pointer shadow-md active:scale-95"
        >
          {isPlaying ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Video className="w-3 h-3 text-emerald-400" />
              <span className="hidden xs:inline">Live Fiber</span>
            </>
          ) : (
            <>
              <VideoOff className="w-3 h-3 text-neutral-400" />
              <span className="hidden xs:inline">Paused</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
