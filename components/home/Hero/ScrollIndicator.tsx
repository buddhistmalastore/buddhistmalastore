"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ScrollIndicator() {
  return (
    <motion.div
      animate={{
        y: [0, 8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
      }}
      className="
        pointer-events-none
        absolute
        bottom-4
        left-1/2
        z-20
        -translate-x-1/2
        text-[#C89A2A]
        sm:bottom-6
        lg:bottom-10
      "
    >
      <ChevronDown
        size={26}
        strokeWidth={1.5}
        className="sm:h-8 sm:w-8"
      />
    </motion.div>
  );
}