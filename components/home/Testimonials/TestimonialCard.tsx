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
        y: -10,
        scale: 1.02,
      }}
      transition={{ duration: 0.35 }}
      className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-[#D4AF3720]
      bg-[#111]
      p-8
      transition-all
      duration-500
      hover:border-[#D4AF37]
      hover:shadow-[0_20px_60px_rgba(212,175,55,.12)]
    "
    >
      {/* Quote */}

      <Quote
        className="
        absolute
        right-8
        top-8
        h-12
        w-12
        text-[#D4AF3720]
      "
      />

      {/* Stars */}

      <div className="flex gap-1 text-[#D4AF37] text-lg">

        {Array.from({ length: review.rating }).map((_, i) => (
          <span key={i}>★</span>
        ))}

      </div>

      {/* Review */}

      <p
        className="
        mt-6
        leading-8
        text-[#E5DED1]
      "
      >
        "{review.review}"
      </p>

      {/* Footer */}

      <div className="mt-10 flex items-center gap-4">

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          bg-[#D4AF37]
          font-bold
          text-black
        "
        >
          {review.initials}
        </div>

        <div>

          <h4
            className="
            heading-font
            text-xl
            text-[#F7F3EC]
          "
          >
            {review.name}
          </h4>

          <p className="text-[#B8AE9D]">

            {review.flag} {review.country}

          </p>

          <span
            className="
            mt-1
            inline-block
            rounded-full
            border
            border-[#D4AF37]
            px-3
            py-1
            text-xs
            uppercase
            tracking-widest
            text-[#D4AF37]
          "
          >
            Verified Buyer
          </span>

        </div>

      </div>
    </motion.div>
  );
}