"use client";

const particles = [
  { size: 3, left: 8, top: 18, duration: 4 },
  { size: 4, left: 18, top: 34, duration: 6 },
  { size: 2, left: 27, top: 12, duration: 5 },
  { size: 3, left: 36, top: 46, duration: 7 },
  { size: 4, left: 44, top: 22, duration: 4 },
  { size: 2, left: 53, top: 61, duration: 6 },
  { size: 3, left: 62, top: 16, duration: 5 },
  { size: 4, left: 71, top: 38, duration: 7 },
  { size: 2, left: 79, top: 20, duration: 4 },
  { size: 3, left: 88, top: 52, duration: 6 },
  { size: 4, left: 94, top: 27, duration: 5 },
  { size: 2, left: 12, top: 68, duration: 7 },
  { size: 3, left: 31, top: 76, duration: 4 },
  { size: 4, left: 48, top: 84, duration: 6 },
  { size: 2, left: 67, top: 73, duration: 5 },
  { size: 3, left: 83, top: 82, duration: 7 },
];

export default function FloatingParticles() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-10
        overflow-hidden
      "
    >
      {particles.map((particle, index) => (
        <span
          key={index}
          className="
            absolute
            rounded-full
            bg-[#D4AF37]/30
            animate-pulse
          "
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}