"use client";

import { motion } from "framer-motion";

export default function EnterButton() {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 35px rgba(200,169,81,.45)",
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-full
        border
        border-[#C8A951]
        bg-black/20
        backdrop-blur-xl
        px-14
        py-5
        text-lg
        font-semibold
        tracking-[0.25em]
        uppercase
        text-[#F8F4E8]
        transition-all
      "
    >
      {/* Animated Shine */}
      <span
        className="
          absolute
          left-[-120%]
          top-0
          h-full
          w-1/2
          rotate-12
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          transition-all
          duration-1000
          group-hover:left-[140%]
        "
      />

      <span className="relative z-10">
        Enter Store
      </span>
    </motion.button>
  );
}