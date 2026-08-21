"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import FloatingParticles from "./FloatingParticles";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-[calc(100vh-96px)]
        overflow-hidden
        bg-[#FAF8F4]
        text-[#1A1A1A]
      "
    >
      {/* Hero Background */}
      <HeroBackground />

      {/* Decorative Particles */}
      <FloatingParticles />

      {/* Main Hero Content */}
      <HeroContent />

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}