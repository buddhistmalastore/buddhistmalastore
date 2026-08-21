"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="relative flex min-h-[75vh] items-center overflow-hidden bg-[#17130E] px-6 py-28 lg:px-10">
      {/* Background */}

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 40%, rgba(200,154,42,.16), transparent 45%), radial-gradient(circle at 80% 70%, rgba(200,154,42,.08), transparent 40%)",
        }}
      />

      {/* Decorative circles */}

      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full border border-[#C89A2A]/10" />

      <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full border border-[#C89A2A]/10" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-sm font-semibold uppercase tracking-[6px] text-[#D4AF37]"
        >
          Our Story • Our Heritage • Our Craft
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="heading-font mt-6 text-5xl font-semibold leading-tight text-[#F7F3EC] md:text-7xl"
        >
          Born in Nepal.
          <br />
          Crafted with Purpose.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-[#D8CFC1] md:text-xl"
        >
          Buddhist Mala Store &amp; Handicrafts Center brings together
          authentic Nepalese craftsmanship, natural gemstones, spiritual
          traditions, and timeless Himalayan artistry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/shop"
            className="
              rounded-full
              bg-[#D4AF37]
              px-8
              py-4
              font-semibold
              text-black
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-[0_15px_40px_rgba(212,175,55,.25)]
            "
          >
            Explore Our Collection
          </Link>

          <a
            href="#our-story"
            className="
              rounded-full
              border
              border-[#D4AF37]/50
              px-8
              py-4
              font-semibold
              text-[#F7F3EC]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-[#D4AF37]
              hover:bg-[#D4AF37]/10
            "
          >
            Discover Our Story
          </a>
        </motion.div>
      </div>
    </section>
  );
}