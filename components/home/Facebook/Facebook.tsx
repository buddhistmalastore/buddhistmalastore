"use client";

import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";

import FacebookCard from "./FacebookCard";
import { facebookPosts } from "./facebookData";

export default function FacebookCommunity() {
  return (
    <section className="bg-[#FBF7F0] px-6 py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
            Our Global Community
          </p>

          <h2 className="heading-font mt-5 text-4xl font-semibold text-[#1A1A1A] md:text-6xl">
            Follow Our Journey
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#6F685F]">
            Explore handcrafted malas, customer stories, artisan
            craftsmanship, meditation inspiration, and new collections shared
            with our worldwide community.
          </p>
        </motion.div>

        {/* Facebook Posts */}

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {facebookPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <FacebookCard
                image={post.image}
                title={post.title}
                type={post.type}
                href={post.href}
              />
            </motion.div>
          ))}
        </div>

        {/* Facebook Button */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="https://facebook.com/buddhistmalastore"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-[#C89A2A]/40
              bg-[#F5EEE3]
              px-8
              py-4
              font-semibold
              text-[#B88620]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:border-[#1877F2]
              hover:bg-[#1877F2]
              hover:text-white
              hover:shadow-[0_15px_35px_rgba(24,119,242,0.18)]
            "
          >
            <FaFacebook
              size={21}
              className="transition-transform duration-500 group-hover:scale-110"
            />

            Follow Buddhist Mala Store
          </a>
        </motion.div>
      </div>
    </section>
  );
}