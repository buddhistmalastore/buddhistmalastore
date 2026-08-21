"use client";

import { motion } from "framer-motion";

export default function NewsletterHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-4xl text-center"
    >
      <p className="uppercase tracking-[6px] text-[#D4AF37]">
        Join Our Community
      </p>

      <h2 className="heading-font mt-6 text-5xl md:text-6xl text-[#F7F3EC]">
        Become Part of Our Journey
      </h2>

      <p className="mt-8 text-lg leading-9 text-[#CFC7B8]">
        Receive exclusive gemstone guides,
        new arrivals, meditation wisdom,
        artisan stories and members-only offers.
      </p>
    </motion.div>
  );
}