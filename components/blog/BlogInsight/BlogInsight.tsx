"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function BlogInsight() {
  return (
    <section className="bg-[#FBF7F0] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-[#D4AF37]/25
            bg-[#29251F]
            px-8
            py-16
            text-center
            shadow-[0_25px_70px_rgba(40,30,20,0.15)]
            md:px-16
            lg:py-20
          "
        >
          {/* Decorative Glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              h-72
              w-72
              -translate-x-1/2
              rounded-full
              bg-[#D4AF37]/10
              blur-[90px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-px
              w-48
              -translate-x-1/2
              bg-gradient-to-r
              from-transparent
              via-[#D4AF37]
              to-transparent
            "
          />

          <div className="relative">
            {/* Label */}

            <div className="flex items-center justify-center gap-3">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />

              <p className="uppercase tracking-[5px] text-[#D4AF37]">
                Behind The Tradition
              </p>

              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
            </div>

            {/* Heading */}

            <h2 className="heading-font mt-6 text-4xl text-[#F7F3EC] md:text-5xl">
              Why 108 Beads?
            </h2>

            <div className="mx-auto mt-6 h-px w-20 bg-[#D4AF37]" />

            {/* Description */}

            <div className="mx-auto mt-8 max-w-3xl space-y-5 text-lg leading-9 text-[#D8D0C3]">
              <p>
                The number 108 holds deep spiritual significance across
                Buddhist and Hindu traditions and has been used for centuries
                in prayer, meditation, and mantra practice.
              </p>

              <p>
                A traditional mala contains 108 beads, allowing practitioners
                to repeat a mantra or prayer through a complete cycle while
                maintaining focus, rhythm, and mindfulness.
              </p>

              <p className="text-[#C5B9A8]">
                Each bead becomes a quiet reminder to return to the present
                moment — one breath, one mantra, and one intention at a time.
              </p>
            </div>

            {/* Decorative 108 */}

            <div className="mt-10 flex justify-center">
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#D4AF37]/50
                  bg-[#D4AF37]/10
                  shadow-[0_0_40px_rgba(212,175,55,0.10)]
                "
              >
                <span className="heading-font text-3xl text-[#D4AF37]">
                  108
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}