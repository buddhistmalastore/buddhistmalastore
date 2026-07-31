"use client";

import { motion } from "framer-motion";

export default function WhyHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto mb-20 max-w-4xl text-center"
    >
      <p className="uppercase tracking-[6px] text-[#D4AF37]">
        Why Choose Us
      </p>

      <h2 className="heading-font mt-5 text-5xl md:text-6xl text-[#F7F3EC]">
        Handcrafted Excellence,
        <br />
        Trusted Worldwide
      </h2>

      <p className="mt-8 text-lg leading-9 text-[#CFC7B8]">
        Every handcrafted mala reflects Nepalese tradition,
        authentic craftsmanship, and a commitment to exceptional quality.
      </p>
    </motion.div>
  );
}