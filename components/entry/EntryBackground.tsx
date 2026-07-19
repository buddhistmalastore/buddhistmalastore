"use client";

import Image from "next/image";

export default function EntryBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Main Background */}
      <Image
        src="/images/intro/final-bg.png"
        alt="Himalayan Sunrise"
        fill
        priority
        quality={100}
        className="object-cover object-center select-none"
      />

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Warm sunrise glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,210,110,.30), transparent 55%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 55%, rgba(0,0,0,.75) 100%)",
        }}
      />
    </div>
  );
}