"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

export default function LogoGlow({ children }: Props) {
  return (
    <motion.div
      animate={{
        filter: [
          "drop-shadow(0 0 10px rgba(255,210,120,.15))",
          "drop-shadow(0 0 45px rgba(255,210,120,.55))",
          "drop-shadow(0 0 10px rgba(255,210,120,.15))",
        ],
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}