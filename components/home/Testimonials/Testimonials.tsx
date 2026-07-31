"use client";

import { motion } from "framer-motion";
import Stats from "./Stats";
import TestimonialCard from "./TestimonialCard";
import { reviews } from "./reviews";

export default function Testimonials() {
  return (
    <section className="bg-[#0B0B0B] py-28">

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-4xl text-center"
        >

          <p className="tracking-[6px] uppercase text-[#D4AF37]">
            Loved Worldwide
          </p>

          <h2 className="heading-font mt-5 text-6xl text-[#F7F3EC]">
            Hear From Our Customers
          </h2>

          <p className="mt-8 text-lg leading-9 text-[#CFC7B8]">
            Thousands of practitioners around the world trust our handcrafted
            malas for meditation, mindfulness, healing and spiritual practice.
          </p>

        </motion.div>

        <Stats />

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {reviews.map((review) => (
            <TestimonialCard
              key={review.id}
              review={review}
            />
          ))}

        </div>

      </div>

    </section>
  );
}