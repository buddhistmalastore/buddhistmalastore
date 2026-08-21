"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-[#F3EBDD] px-6 py-28">
      {/* Background decoration */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C89A2A]/10" />

        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C89A2A]/10" />

        <div className="absolute left-[-150px] top-[-100px] h-[350px] w-[350px] rounded-full bg-[#C89A2A]/[0.04] blur-3xl" />

        <div className="absolute bottom-[-150px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#C89A2A]/[0.04] blur-3xl" />
      </div>

      {/* Content */}

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]"
        >
          Connect With Us
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="heading-font mt-5 text-5xl font-semibold leading-tight text-[#1A1A1A] md:text-6xl lg:text-7xl"
        >
          We'd Love to
          <br />
          Hear From You
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#6F685F] md:text-lg md:leading-9"
        >
          Whether you have a question about a mala, need help choosing a
          gemstone, are interested in a custom piece, or simply want to
          connect with us, we're here to help.
        </motion.p>

        {/* Divider */}

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-9 flex origin-center items-center justify-center gap-3"
        >
          <span className="h-px w-16 bg-[#C89A2A]/40" />

          <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

          <span className="h-px w-16 bg-[#C89A2A]/40" />
        </motion.div>

        {/* Bottom indicator */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-12 flex flex-col items-center text-[#B88620]"
        >
          <span className="mb-2 text-[10px] font-semibold uppercase tracking-[3px]">
            Get in touch
          </span>

          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown size={22} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}