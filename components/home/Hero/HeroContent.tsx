"use client";

import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center">
      <div className="w-full max-w-[1440px] px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-5 uppercase tracking-[6px] text-[#D4AF37]"
          >
            Handcrafted in Nepal
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="heading-font text-5xl md:text-7xl xl:text-8xl font-semibold leading-tight text-[#F7F3EC]"
          >
            Sacred Beads.
            <br />
            Timeless Craftsmanship.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-[#E6DDCF]"
          >
            Every mala is handcrafted by skilled Nepalese artisans using
            authentic gemstones, sacred traditions, and generations of
            craftsmanship.
          </motion.p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <HeroButtons />
          </div>
        </div>
      </div>
    </div>
  );
}