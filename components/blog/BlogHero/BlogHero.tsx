"use client";

import { motion } from "framer-motion";
import { BookOpen, Sparkles } from "lucide-react";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-[#FBF7F0] py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-7 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-white/70 shadow-sm">
              <BookOpen className="h-7 w-7 text-[#D4AF37]" />
            </div>
          </div>

          <p className="uppercase tracking-[6px] text-[#B88620]">
            Buddhist Mala Store Journal
          </p>

          <h1 className="heading-font mt-5 text-5xl leading-tight text-[#29251F] md:text-7xl">
            Stories Behind
            <br />
            <span className="text-[#B88620]">Our Craft</span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-[#6B6257] md:text-xl">
            Discover the craftsmanship, traditions, gemstones, meditation
            practices, and stories that give meaning to every piece we create.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-sm uppercase tracking-[3px] text-[#8A8176]">
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            Craft • Tradition • Meaning
            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}