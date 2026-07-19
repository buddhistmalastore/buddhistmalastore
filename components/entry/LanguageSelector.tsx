"use client";

import { motion } from "framer-motion";

export default function LanguageSelector() {
  return (
    <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{
        delay:6,
        duration:1
      }}
      className="absolute right-8 top-8 flex gap-3 text-sm"
    >
      <button className="rounded-full border border-[#C8A951] px-4 py-2 hover:bg-[#C8A951] hover:text-black transition">
        🇬🇧 EN
      </button>

      <button className="rounded-full border border-[#C8A951] px-4 py-2 hover:bg-[#C8A951] hover:text-black transition">
        🇳🇵 नेपाली
      </button>
    </motion.div>
  );
}