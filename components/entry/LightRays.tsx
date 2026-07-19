"use client";

import { motion } from "framer-motion";

export default function LightRays() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-5"
      animate={{
        opacity: [0.18, 0.32, 0.18],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute left-1/2 top-[34%] -translate-x-1/2"
        style={{
          width: 900,
          height: 900,
          background: `
            conic-gradient(
              from 0deg,
              transparent 0deg,
              rgba(255,220,120,.22) 8deg,
              transparent 18deg,
              transparent 35deg,
              rgba(255,220,120,.18) 45deg,
              transparent 58deg,
              transparent 80deg,
              rgba(255,220,120,.18) 90deg,
              transparent 100deg,
              transparent 140deg,
              rgba(255,220,120,.20) 155deg,
              transparent 170deg,
              transparent 360deg
            )
          `,
          filter: "blur(22px)",
          borderRadius: "50%",
        }}
      />
    </motion.div>
  );
}