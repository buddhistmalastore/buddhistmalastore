"use client";

import { motion } from "framer-motion";

import CraftHeader from "@/components/home/Craftsmanship/CraftHeader";
import CraftTimeline from "@/components/home/Craftsmanship/CraftTimeline";
import CraftCTA from "@/components/home/Craftsmanship/CraftCTA";

export default function FeaturedCraftsmanship() {
  return (
    <section className="bg-[#FBF7F0] px-6 pb-24 lg:px-10 lg:pb-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="
            overflow-hidden
            rounded-[40px]
            border
            border-[#D4AF37]/20
            bg-white
            shadow-[0_25px_80px_rgba(80,60,30,0.08)]
          "
        >
          {/* Featured Story Heading */}

          <div className="px-6 pb-4 pt-12 text-center md:px-12 lg:px-20 lg:pt-16">
            <p className="uppercase tracking-[5px] text-[#B88620]">
              Featured Story
            </p>

            <h2 className="heading-font mt-4 text-4xl !text-[#29251F] md:text-5xl">
              The Art of Handcrafting
            </h2>

            <div className="mx-auto mt-6 h-px w-24 bg-[#D4AF37]" />
          </div>

          {/* Craftsmanship Story */}

          <div
            className="
              px-6
              pb-12
              pt-8
              text-[#29251F]
              md:px-12
              lg:px-20
              lg:pb-16

              [&_h1]:!text-[#29251F]
              [&_h2]:!text-[#29251F]
              [&_h3]:!text-[#29251F]
              [&_h4]:!text-[#29251F]

              [&_p]:!text-[#6B6257]

              [&_span]:!text-[#B88620]
            "
          >
            <CraftHeader />

            <CraftTimeline />

            <CraftCTA />
          </div>
        </motion.div>
      </div>
    </section>
  );
}