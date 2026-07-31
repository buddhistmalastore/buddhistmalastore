"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 80 });

export default function DustParticles() {
  return (
    <div className="absolute inset-0 z-[35] overflow-hidden pointer-events-none">
      {particles.map((_, i) => {
        const size = Math.random() * 5 + 1;

        const left = Math.random() * 100;

        const duration = 10 + Math.random() * 18;

        const delay = Math.random() * 12;

        const drift = (Math.random() - 0.5) * 180;

        const opacity = 0.15 + Math.random() * 0.45;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: "-60px",
              width: size,
              height: size,
              opacity,

              background:
                "radial-gradient(circle,#FFF9DA 0%,#FFD875 55%,rgba(255,216,117,0) 100%)",

              boxShadow:
                "0 0 8px rgba(255,220,120,.7),0 0 18px rgba(255,200,90,.4)",
            }}
            animate={{
              y: [0, -1200],

              x: [0, drift],

              scale: [0.2, 1, 0.6],

              opacity: [0, opacity, opacity, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}