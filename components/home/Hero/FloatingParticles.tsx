"use client";

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden">

      {Array.from({ length: 30 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#D4AF37]/30 animate-pulse"
          style={{
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 5}s`,
          }}
        />
      ))}

    </div>
  );
}