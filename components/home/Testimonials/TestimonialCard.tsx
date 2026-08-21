"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Props {
  review: {
    id: number;
    name: string;
    initials: string;
    country: string;
    flag: string;
    rating: number;
    review: string;
  };
}

export default function TestimonialCard({ review }: Props) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#C89A2A]/15
        bg-white
        p-8
        shadow-[0_8px_30px_rgba(80,60,30,0.04)]
        transition-all
        duration-500
        hover:border-[#C89A2A]/40
        hover:shadow-[0_20px_50px_rgba(80,60,30,0.10)]
      "
    >
      {/* Decorative Quote */}

      <Quote
        className="
          absolute
          right-7
          top-7
          h-12
          w-12
          text-[#C89A2A]/10
          transition-all
          duration-500
          group-hover:text-[#C89A2A]/20
        "
      />

      {/* Stars */}

      <div className="flex gap-1 text-[#C89A2A]">
        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i} className="text-lg">
            ★
          </span>
        ))}
      </div>

      {/* Review */}

      <p className="mt-6 leading-8 text-[#5F594F]">
        "{review.review}"
      </p>

      {/* Divider */}

      <div className="mt-8 h-px w-full bg-[#C89A2A]/10" />

      {/* Customer */}

      <div className="mt-7 flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#C89A2A]
            font-semibold
            text-white
            shadow-sm
            transition-transform
            duration-500
            group-hover:scale-105
          "
        >
          {review.initials}
        </div>

        <div className="min-w-0">
          <h4 className="heading-font text-xl font-semibold text-[#29251F]">
            {review.name}
          </h4>

          <p className="mt-1 text-sm text-[#7B7267]">
            {review.flag} {review.country}
          </p>

          <span
            className="
              mt-2
              inline-flex
              rounded-full
              border
              border-[#C89A2A]/25
              bg-[#F5EEE3]
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-[2px]
              text-[#B88620]
            "
          >
            Verified Buyer
          </span>
        </div>
      </div>

      {/* Bottom Accent */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-[#C89A2A]
          transition-all
          duration-500
          group-hover:w-full
        "
      />
    </motion.div>
  );
}