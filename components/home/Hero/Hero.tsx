"use client";

import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import FloatingParticles from "./FloatingParticles";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative h-[92vh] overflow-hidden">

      <HeroBackground />

      <FloatingParticles />

      <HeroContent />

      <ScrollIndicator />

    </section>
  );
}