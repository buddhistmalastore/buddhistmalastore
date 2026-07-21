"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function TempleBell() {
  return (
    <motion.div
      className="absolute right-12 top-0 z-30 origin-top"
      animate={{
        rotate: [-2.5, 2.5, -2.5],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Rope */}
      <div
        className="mx-auto"
        style={{
          width: "3px",
          height: "110px",
          background:
            "linear-gradient(to bottom,#b78d38,#f1d17a,#9b7426)",
        }}
      />

      {/* Bell */}
      <Image
        src="/images/branding/temple-bell.png"
        alt="Temple Bell"
        width={120}
        height={170}
        priority
        style={{
          filter:
            "drop-shadow(0 10px 18px rgba(0,0,0,.45)) drop-shadow(0 0 10px rgba(235,190,90,.25))",
        }}
      />
    </motion.div>
  );
}