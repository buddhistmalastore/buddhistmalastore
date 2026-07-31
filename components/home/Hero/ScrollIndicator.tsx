"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
      }}
      className="
      absolute
      bottom-10
      left-1/2
      -translate-x-1/2
      z-20
      text-[#D4AF37]
    "
    >
      <ChevronDown size={34} />
    </motion.div>
  );
}