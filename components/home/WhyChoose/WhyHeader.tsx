"use client";

import { motion } from "framer-motion";

export default function WhyHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto mb-16 max-w-4xl text-center"
    >
      <p className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
        Why Choose Us
      </p>

      <h2 className="heading-font mt-5 text-4xl font-semibold leading-tight text-[#1A1A1A] md:text-6xl">
        Handcrafted Excellence,
        <br />
        Trusted Worldwide
      </h2>

      <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#6F685F]">
        Every handcrafted mala reflects Nepalese tradition, authentic
        craftsmanship, and a commitment to exceptional quality.
      </p>
    </motion.div>
  );
}