"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Australia",
    rating: 5,
    text: "Absolutely beautiful mala. The craftsmanship is incredible and you can really feel the care that went into making it.",
  },
  {
    name: "David R.",
    location: "United States",
    rating: 5,
    text: "The quality of the gemstones was excellent. My mala arrived beautifully packaged and looks even better in person.",
  },
  {
    name: "Emma K.",
    location: "United Kingdom",
    rating: 5,
    text: "A truly special piece. I love the traditional Nepalese craftsmanship and the attention to every little detail.",
  },
];

export default function ContactTestimonials() {
  return (
    <section className="bg-[#FBF7F0] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B88620]">
            Kind Words
          </p>

          <h2 className="heading-font mt-4 text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mt-6 leading-8 text-[#6F685F]">
            We are grateful to customers around the world who appreciate the
            craftsmanship, tradition, and spiritual meaning behind every
            handcrafted piece.
          </p>
        </div>

        {/* Testimonials */}

        <div className="grid gap-7 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
              }}
              whileHover={{ y: -6 }}
              className="
                group
                relative
                rounded-[28px]
                border
                border-[#C89A2A]/15
                bg-[#F5EEE3]
                p-8
                transition-all
                duration-500
                hover:border-[#C89A2A]/35
                hover:shadow-[0_18px_45px_rgba(80,60,30,0.08)]
              "
            >
              {/* Quote Icon */}

              <div className="absolute right-7 top-7 text-[#C89A2A]/15 transition-colors duration-500 group-hover:text-[#C89A2A]/25">
                <Quote size={48} strokeWidth={1} />
              </div>

              {/* Stars */}

              <div className="flex gap-1 text-[#C89A2A]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={16}
                    fill={
                      starIndex < testimonial.rating
                        ? "currentColor"
                        : "transparent"
                    }
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Review */}

              <p className="mt-7 min-h-[130px] leading-8 text-[#5F584F]">
                “{testimonial.text}”
              </p>

              {/* Customer */}

              <div className="mt-7 border-t border-[#C89A2A]/10 pt-5">
                <p className="font-semibold text-[#29251F]">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-sm text-[#9A8D7A]">
                  {testimonial.location}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom Message */}

        <div className="mt-14 text-center">
          <p className="text-sm text-[#91877A]">
            Your experience matters to us. Thank you for being part of our
            journey.
          </p>
        </div>
      </div>
    </section>
  );
}