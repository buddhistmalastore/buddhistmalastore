"use client";

import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCard";
import { reviews } from "./reviews";

export default function Testimonials() {
  return (
    <section className="bg-[#F3EBDD] py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Section Header */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-4xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
            Loved Worldwide
          </p>

          <h2 className="heading-font mt-5 text-4xl font-semibold leading-tight text-[#1A1A1A] md:text-6xl">
            Hear From Our Customers
          </h2>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#6F685F]">
            Discover what customers around the world say about their
            handcrafted malas and their experience with Buddhist Mala Store.
          </p>
        </motion.div>

        {/* Testimonials */}

        <div className="grid gap-7 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
            >
              <TestimonialCard review={review} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}