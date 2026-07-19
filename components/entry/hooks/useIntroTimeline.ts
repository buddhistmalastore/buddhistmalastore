"use client";

import { useEffect, useState } from "react";

export default function useIntroTimeline() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),   // Sunrise
      setTimeout(() => setPhase(2), 2500),   // Mist
      setTimeout(() => setPhase(3), 4000),   // Light Rays
      setTimeout(() => setPhase(4), 5500),   // Particles
      setTimeout(() => setPhase(5), 7000),   // Birds
      setTimeout(() => setPhase(6), 9000),   // Logo
      setTimeout(() => setPhase(7), 11000),  // Title
      setTimeout(() => setPhase(8), 14000),  // Button
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return phase;
}