"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EntryLogo() {
  return (
    <motion.div
      className="relative"
      animate={{
        y: [0, -6, 0],
        rotate: [0, 360],
      }}
      transition={{
        y: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      {/* Golden Aura */}
      <motion.div
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 360,
          height: 360,
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(circle, rgba(255,220,120,.38) 0%, rgba(255,220,120,.18) 35%, rgba(255,220,120,.08) 60%, transparent 100%)",
          filter: "blur(35px)",
          zIndex: 0,
          
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Dharma Wheel */}
      <Image
        src="/images/branding/dharma-wheel-logo.png"
        alt="Dharma Wheel"
        width={340}
        height={340}
        
        priority
        style={{
          position: "relative",
          zIndex: 2,
        }}
        
      />
    </motion.div>
  );
}