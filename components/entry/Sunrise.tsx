"use client";

import { motion } from "framer-motion";

export default function Sunrise() {
  return (
    <>
      {/* Main Sun */}
      <motion.div
        className="absolute left-1/2 top-[34%] z-10 -translate-x-1/2 rounded-full"
        style={{
          width: 180,
          height: 180,
          background:
            "radial-gradient(circle, rgba(255,230,150,1) 0%, rgba(255,200,80,.85) 35%, rgba(255,170,50,.35) 70%, transparent 100%)",
          filter: "blur(18px)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.75, 1, 0.75],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Large Ambient Glow */}
      <motion.div
        className="absolute left-1/2 top-[34%] z-0 -translate-x-1/2 rounded-full"
        style={{
          width: 700,
          height: 700,
          background:
            "radial-gradient(circle, rgba(255,190,70,.18), transparent 72%)",
          filter: "blur(50px)",
        }}
        animate={{
          opacity: [0.18, 0.34, 0.18],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}