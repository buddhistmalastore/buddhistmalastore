"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 35 });

export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((_, i) => {
        const left = Math.random() * 100;
        const size = 2 + Math.random() * 4;
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 8;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${left}%`,
              bottom: "-20px",
              width: size,
              height: size,
              background: "#FFD76A",
              boxShadow: "0 0 10px rgba(255,215,90,.8)",
            }}
            animate={{
              y: [-20, -900],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0],
              scale: [0.6, 1, 0.3],
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