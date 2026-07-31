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
      <p className="uppercase tracking-[6px] text-[#D4AF37]">
        The Art of Handcrafting
      </p>

      <h2 className="heading-font mt-5 text-5xl md:text-6xl text-[#F7F3EC]">
        Every Mala Has A Story
      </h2>

      <p className="mt-8 text-lg leading-9 text-[#CFC7B8]">
        From carefully selected Himalayan gemstones to the final blessing
        before delivery, every mala is handcrafted with devotion by skilled
        Nepalese artisans.
      </p>
    </motion.div>
  );
}