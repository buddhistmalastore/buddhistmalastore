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
        ease: "easeInOut",
      }}
      className="
        absolute
        bottom-10
        left-1/2
        z-20
        -translate-x-1/2
        text-[#C89A2A]
      "
    >
      <ChevronDown size={34} strokeWidth={1.5} />
    </motion.div>
  );
}