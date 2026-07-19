"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EntryLogo() {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: 360,
        scale: [1, 1.02, 1],
      }}
      transition={{
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{
        filter: "drop-shadow(0 0 24px rgba(228,195,106,.55))",
      }}
    >
      <Image
        src="/images/branding/dharma-wheel-logo.png"
        alt="Dharma Wheel"
        width={280}
        height={280}
        priority
      />
    </motion.div>
  );
}