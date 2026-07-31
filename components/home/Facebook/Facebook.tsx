"use client";

import { motion } from "framer-motion";
import { FaFacebook } from "react-icons/fa";

import FacebookCard from "./FacebookCard";
import { facebookPosts } from "./facebookData";

export default function FacebookCommunity() {
  return (
    <section className="bg-[#090909] py-28">

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <p className="uppercase tracking-[6px] text-[#D4AF37]">
            Our Global Community
          </p>

          <h2
            className="
            heading-font
            mt-5
            text-5xl
            md:text-6xl
            text-[#F7F3EC]
          "
          >
            Follow Our Journey
          </h2>

          <p
            className="
            mt-8
            text-lg
            leading-9
            text-[#CFC7B8]
          "
          >
            Explore handcrafted malas, customer stories,
            artisan craftsmanship, meditation inspiration,
            and exclusive collections shared with our
            worldwide Facebook community.
          </p>

        </motion.div>

        <div
          className="
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        "
        >
          {facebookPosts.map((post) => (
            <FacebookCard
              key={post.id}
              image={post.image}
              title={post.title}
              type={post.type}
              href={post.href}
            />
          ))}
        </div>

        <div className="mt-20 flex justify-center">

          <a
            href="https://facebook.com/buddhistmalastore"
            target="_blank"
            className="
            inline-flex
            items-center
            gap-4
            rounded-full
            border
            border-[#D4AF37]
            px-10
            py-5
            text-lg
            font-semibold
            text-white
            transition-all
            duration-500
            hover:bg-[#1877F2]
            hover:border-[#1877F2]
          "
          >
            <FaFacebook size={24} />

            Follow Buddhist Mala Store

          </a>

        </div>

      </div>

    </section>
  );
}