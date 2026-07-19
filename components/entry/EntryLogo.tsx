"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EntryLogo() {
  return (
    <div className="relative flex items-center justify-center">

      {/* Large Golden Aura */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 420,
          height: 420,
          background:
            "radial-gradient(circle, rgba(255,210,90,.35), transparent 70%)",
          filter: "blur(70px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Inner Aura */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          background:
            "radial-gradient(circle, rgba(255,240,170,.45), transparent 65%)",
          filter: "blur(25px)",
        }}
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dharma Wheel */}
      <motion.div
  className="relative z-20"
  animate={{
    rotate: 360,
    y: [0, -12, 0],
    scale: [1, 1.03, 1],
  }}
  transition={{
    rotate: {
      duration: 80,
      repeat: Infinity,
      ease: "linear",
    },
    y: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
    scale: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }}
>
  <Image
    src="/images/branding/dharma-wheel-logo.png"
    alt="Dharma Wheel"
    width={300}
    height={300}
    priority
    draggable={false}
    className="select-none drop-shadow-[0_0_45px_rgba(255,215,80,1)]"
  />
</motion.div>

    </div>
  );
}