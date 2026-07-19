"use client";

import { motion } from "framer-motion";

export default function AnimatedMist() {
  return (
    <>
      {/* Bottom Mist */}
      <motion.div
        className="absolute bottom-0 left-[-15%] w-[140%] h-[38%] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.18), transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          x: [-40, 40, -40],
          opacity: [0.30, 0.45, 0.30],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Middle Mist */}
      <motion.div
        className="absolute left-[-20%] top-[42%] w-[140%] h-[22%] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,.12), transparent 70%)",
          filter: "blur(55px)",
        }}
        animate={{
          x: [30, -40, 30],
          opacity: [0.20, 0.35, 0.20],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
}