"use client";

import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";

export default function HeroContent() {
  return (
    <div
      className="
        relative
        z-10
        flex
        min-h-[calc(100svh-76px)]
        items-center
        lg:min-h-[calc(100vh-96px)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1500px]
          px-5
          py-16
          sm:px-6
          sm:py-20
          lg:px-10
          lg:py-20
        "
      >
        <div
          className="
            max-w-[340px]
            text-left
            sm:max-w-2xl
            lg:max-w-3xl
          "
        >
          {/* Eyebrow */}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.7,
            }}
            className="
              mb-5
              flex
              items-center
              gap-3
              sm:mb-6
              sm:gap-4
            "
          >
            <span className="h-px w-7 bg-[#C89A2A] sm:w-10" />

            <p
              className="
                font-body
                text-[10px]
                font-semibold
                uppercase
                tracking-[2.5px]
                !text-[#E1B94F]
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]
                sm:text-xs
                sm:tracking-[4px]
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
              font-body
              text-[42px]
              font-bold
              leading-[1.04]
              tracking-[-0.035em]
              !text-[#FFF9EC]
              drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]
              sm:text-6xl
              md:text-7xl
              xl:text-[78px]
            "
          >
            Sacred Beads.
            <br />

            <span
              className="
                font-body
                font-bold
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
              width: 64,
            }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="
              mt-6
              h-[2px]
              bg-[#C89A2A]
              shadow-[0_2px_8px_rgba(200,154,42,0.4)]
              sm:mt-7
            "
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
              font-body
              mt-6
              max-w-[330px]
              text-[14px]
              leading-7
              !text-[#FFF8EA]/90
              drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]
              sm:max-w-xl
              sm:text-base
              sm:leading-8
              md:text-lg
              md:leading-9
            "
          >
            Every mala is handcrafted by skilled Nepalese artisans
            using authentic gemstones, sacred traditions, and
            generations of craftsmanship.
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
            className="mt-8 sm:mt-9"
          >
            <HeroButtons />
          </motion.div>
        </div>
      </div>
    </div>
  );
}