"use client";

import { motion } from "framer-motion";
import { Gem, CircleDot, Heart, BookOpen } from "lucide-react";

const topics = [
  {
    title: "Choosing Your Mala",
    description:
      "Understand bead materials, sizes, traditions, and how to choose a mala that feels right for your practice.",
    icon: CircleDot,
  },
  {
    title: "The World of Gemstones",
    description:
      "Explore natural gemstones, their traditional meanings, colors, and the beauty they bring to handcrafted malas.",
    icon: Gem,
  },
  {
    title: "Buddhist Traditions",
    description:
      "Discover the history, symbolism, prayer practices, and traditions connected with Buddhist malas.",
    icon: BookOpen,
  },
  {
    title: "Meditation & Mindfulness",
    description:
      "Learn how malas can be incorporated into meditation, mantra recitation, mindfulness, and daily spiritual practice.",
    icon: Heart,
  },
];

export default function BlogTopics() {
  return (
    <section className="bg-[#F4EEE4] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="uppercase tracking-[5px] text-[#B88620]">
            Explore Our Stories
          </p>

          <h2 className="heading-font mt-4 text-4xl !text-[#29251F] md:text-5xl">
            Knowledge Beyond The Mala
          </h2>

          <p className="mt-6 leading-8 !text-[#6B6257]">
            Explore helpful guides and stories created to help you understand
            the materials, traditions, and practices behind the products you
            choose.
          </p>
        </motion.div>

        {/* Topic Cards */}

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic, index) => {
            const Icon = topic.icon;

            return (
              <motion.article
                key={topic.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#D4AF37]/20
                  bg-[#FBF7F0]
                  p-8
                  shadow-[0_10px_30px_rgba(80,60,30,0.05)]
                  transition-all
                  duration-500
                  hover:border-[#D4AF37]/70
                  hover:shadow-[0_25px_60px_rgba(80,60,30,0.14)]
                "
              >

                {/* Gold Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-[#D4AF37]/10
                    blur-3xl
                    transition-all
                    duration-700
                    group-hover:scale-[2]
                    group-hover:bg-[#D4AF37]/15
                  "
                />

                {/* Icon */}

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="
                    relative
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-[#D4AF37]/30
                    bg-[#F4EEE4]
                    transition-all
                    duration-500
                    group-hover:border-[#D4AF37]
                    group-hover:bg-[#D4AF37]
                  "
                >
                  <Icon
                    className="
                      h-7
                      w-7
                      text-[#B88620]
                      transition-colors
                      duration-500
                      group-hover:text-[#29251F]
                    "
                  />
                </motion.div>

                {/* Content */}

                <h3
                  className="
                    relative
                    heading-font
                    mt-8
                    text-2xl
                    !text-[#29251F]
                  "
                >
                  {topic.title}
                </h3>

                <p
                  className="
                    relative
                    mt-4
                    leading-7
                    !text-[#6B6257]
                  "
                >
                  {topic.description}
                </p>

                {/* Animated Bottom Line */}

                <div className="relative mt-7 h-[2px] w-12 overflow-hidden rounded-full bg-[#D4AF37]/30">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-full origin-left bg-[#D4AF37]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1 + 0.3,
                    }}
                  />
                </div>

                {/* Hover shimmer */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                    transition-transform
                    duration-1000
                    group-hover:translate-x-full
                  "
                />

              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}