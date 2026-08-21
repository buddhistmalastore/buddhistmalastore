"use client";

import { motion } from "framer-motion";

export default function CraftHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto mb-24 max-w-4xl text-center"
    >
      <p className="uppercase tracking-[6px] !text-[#B88620]">
        The Art of Handcrafting
      </p>

      <h2 className="heading-font mt-5 text-5xl !text-[#29251F] md:text-6xl">
        Every Mala Has A Story
      </h2>

      <p className="mt-8 text-lg leading-9 !text-[#6B6257]">
        From carefully selected natural gemstones to the final blessing
        before delivery, every mala is handcrafted with devotion by skilled
        Nepalese artisans.
      </p>
    </motion.div>
  );
}