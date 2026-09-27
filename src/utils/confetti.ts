import confetti from 'canvas-confetti';

/**
 * Triggers a multi-stage celebratory confetti blast for successful bookings.
 */
export const triggerBookingSuccessConfetti = () => {
  try {
    // 1. Central pop
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#f43f5e', '#10b981', '#38bdf8', '#fbbf24', '#a855f7'],
      zIndex: 10000,
    });

    // 2. Left and right celebratory cannons
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 65,
        origin: { x: 0.15, y: 0.7 },
        colors: ['#e11d48', '#fb7185', '#34d399', '#38bdf8', '#fbbf24'],
        zIndex: 10000,
      });

      confetti({
        particleCount: 50,
        angle: 120,
        spread: 65,
        origin: { x: 0.85, y: 0.7 },
        colors: ['#e11d48', '#fb7185', '#34d399', '#38bdf8', '#fbbf24'],
        zIndex: 10000,
      });
    }, 250);

    // 3. Falling glitter shower
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { y: 0.4 },
        colors: ['#ffd700', '#f43f5e', '#10b981'],
        shapes: ['circle', 'square'],
        scalar: 1.15,
        zIndex: 10000,
      });
    }, 600);
  } catch {
    // Graceful fallback if canvas is unavailable
  }
};
