"use client";

import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-[calc(100vh-96px)] items-center">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 lg:px-10">
        <div className="max-w-3xl text-left">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-[#C89A2A]" />

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[4px]
                !text-[#E1B94F]
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                md:text-sm
              "
            >
              Handcrafted in Nepal
            </p>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.9,
              ease: "easeOut",
            }}
            className="
              heading-font
              text-5xl
              font-semibold
              leading-[1.05]
              tracking-tight
              !text-[#FFF9EC]
              drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]
              sm:text-6xl
              md:text-7xl
              xl:text-[82px]
            "
          >
            Sacred Beads.
            <br />

            <span
              className="
                !text-[#D8AA3D]
                drop-shadow-[0_4px_18px_rgba(0,0,0,0.75)]
              "
            >
              Timeless Craftsmanship.
            </span>
          </motion.h1>

          {/* Decorative Gold Line */}
          <motion.div
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: 80,
            }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="mt-7 h-[2px] bg-[#C89A2A] shadow-[0_2px_8px_rgba(200,154,42,0.4)]"
          />

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="
              mt-7
              max-w-xl
              text-base
              leading-8
              !text-[#FFF8EA]/90
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]
              md:text-lg
              md:leading-9
            "
          >
            Every mala is handcrafted by skilled Nepalese artisans using
            authentic gemstones, sacred traditions, and generations of
            craftsmanship.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.2,
              duration: 0.8,
            }}
            className="mt-9"
          >
            <HeroButtons />
          </motion.div>

        </div>
      </div>
    </div>
  );
}