"use client";

import { motion } from "framer-motion";

export default function GodRays() {
  return (
    <>
      {/* Main Glow */}

      <motion.div
        className="absolute inset-0 z-[14] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{
          duration: 6,
          ease: "easeOut",
        }}
        style={{
          background:
            "radial-gradient(circle at 50% 54%, rgba(255,225,160,.45), rgba(255,210,120,.18) 28%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vertical Rays */}

      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none"
        animate={{
          opacity: [0.18, 0.32, 0.18],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `
          repeating-conic-gradient(
            from 270deg at 50% 58%,
            rgba(255,220,150,.18) 0deg,
            rgba(255,220,150,.05) 4deg,
            transparent 8deg,
            transparent 16deg
          )
          `,
          filter: "blur(35px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Warm Bloom */}

      <motion.div
        className="absolute inset-0 z-[16] pointer-events-none"
        animate={{
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "linear-gradient(to top, rgba(255,180,60,.10), transparent 45%)",
        }}
      />
    </>
  );
}