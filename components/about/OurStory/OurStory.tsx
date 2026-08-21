"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section
      id="our-story"
      className="bg-[#FBF7F0] px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Image */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative h-[500px] overflow-hidden rounded-[36px] md:h-[600px]">
            <Image
              src="/images/home/hero-bg.jpg"
              alt="Nepalese craftsmanship"
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Decorative Frame */}

          <div className="pointer-events-none absolute -bottom-5 -right-5 -z-0 h-40 w-40 rounded-br-[36px] border-b-2 border-r-2 border-[#C89A2A]/40" />

          <div className="absolute -left-5 -top-5 h-24 w-24 rounded-tl-[30px] border-l-2 border-t-2 border-[#C89A2A]/40" />
        </motion.div>

        {/* Content */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
            Our Story
          </p>

          <h2 className="heading-font mt-5 text-4xl font-semibold leading-tight text-[#1A1A1A] md:text-5xl">
            A Tradition Carried
            <br />
            From Nepal to the World
          </h2>

          <div className="mt-7 h-px w-16 bg-[#C89A2A]/50" />

          <div className="mt-8 space-y-5 leading-8 text-[#6F685F]">
            <p>
              Nepal has been home to generations of artisans who have preserved
              the traditions of Buddhist craftsmanship through their hands,
              knowledge, and devotion.
            </p>

            <p>
              At Buddhist Mala Store &amp; Handicrafts Center, we celebrate
              that heritage by bringing together handcrafted malas, natural
              gemstones, Buddhist ritual items, and Himalayan handicrafts.
            </p>

            <p>
              Each piece is created with respect for traditional techniques
              while maintaining the quality and beauty expected by customers
              around the world.
            </p>
          </div>

          {/* Heritage Points */}

          <div className="mt-10 grid grid-cols-2 gap-6">
            <div>
              <p className="text-3xl font-semibold text-[#B88620]">Nepal</p>

              <p className="mt-2 text-sm text-[#7B7267]">
                Rooted in Himalayan heritage
              </p>
            </div>

            <div>
              <p className="text-3xl font-semibold text-[#B88620]">
                Handmade
              </p>

              <p className="mt-2 text-sm text-[#7B7267]">
                Crafted by skilled artisans
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}