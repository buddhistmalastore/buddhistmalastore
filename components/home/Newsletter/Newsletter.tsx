"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#FBF7F0] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-[#C89A2A]/20
            bg-[#F3EBDD]
            px-6
            py-16
            text-center
            shadow-[0_10px_40px_rgba(80,60,30,0.05)]
            md:px-12
            lg:py-20
          "
        >
          {/* Decorative Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -left-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-[#C89A2A]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              -right-32
              h-72
              w-72
              rounded-full
              bg-[#C89A2A]/5
              blur-3xl
            "
          />

          <div className="relative z-10">
            {/* Icon */}

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-[#C89A2A]/30
                bg-[#FBF7F0]
                text-[#B88620]
              "
            >
              <Mail size={23} />
            </div>

            {/* Label */}

            <p className="mt-7 text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
              Stay Connected
            </p>

            {/* Heading */}

            <h2 className="heading-font mt-5 text-4xl font-semibold leading-tight text-[#1A1A1A] md:text-5xl">
              Bring a Little Himalayan
              <br />
              Peace Into Your Inbox.
            </h2>

            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6F685F] md:text-lg">
              Receive new collection announcements, gemstone stories,
              spiritual inspiration, special offers, and updates from Nepal.
            </p>

            {/* Form */}

            <form
              onSubmit={(e) => e.preventDefault()}
              className="
                mx-auto
                mt-9
                flex
                max-w-2xl
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="
                  h-14
                  flex-1
                  rounded-full
                  border
                  border-[#C89A2A]/20
                  bg-[#FBF7F0]
                  px-6
                  text-[#29251F]
                  outline-none
                  placeholder:text-[#9A9185]
                  transition
                  duration-300
                  focus:border-[#C89A2A]
                  focus:ring-2
                  focus:ring-[#C89A2A]/10
                "
              />

              <button
                type="submit"
                className="
                  h-14
                  rounded-full
                  bg-[#C89A2A]
                  px-8
                  font-semibold
                  text-white
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:bg-[#B88620]
                  hover:shadow-[0_12px_30px_rgba(184,134,32,0.20)]
                "
              >
                Subscribe
              </button>
            </form>

            <p className="mt-5 text-xs text-[#8B8174]">
              No spam. Only meaningful updates from Buddhist Mala Store.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}