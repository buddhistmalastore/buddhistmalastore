"use client";

import { Product } from "@/types/product";
import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";
import { FiEdit3 } from "react-icons/fi";

interface Props {
  product: Product;
}

export default function Reviews({
  product,
}: Props) {
  return (
    <section className="mt-24">

      {/* Heading */}

      <div className="mb-12 text-center">

        <p className="text-[12px] font-semibold uppercase tracking-[3px] text-[#C89A2A]">
          Customer Experience
        </p>

        <h2 className="mt-3 text-4xl font-semibold text-[#1A1A1A]">
          Customer Reviews
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-[#777]">
          Read authentic reviews from customers who purchased this handcrafted product.
        </p>

      </div>

      {/* Rating Summary */}

      <RatingSummary
        rating={product.rating}
        reviews={product.reviews}
      />

      {/* Reviews */}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <ReviewCard
          name="Roshan Bhattarai"
          country="Nepal"
          rating={5}
          date="2 weeks ago"
          title="Excellent Quality"
          review="The craftsmanship is outstanding. The beads are genuine, perfectly polished and the mala feels premium. Highly recommended."
        />

        <ReviewCard
          name="Anna Smith"
          country="Australia"
          rating={5}
          date="1 month ago"
          title="Beautiful Handmade Mala"
          review="Exactly as described. Beautiful packaging, fast shipping and authentic Nepalese craftsmanship."
        />

        <ReviewCard
          name="John Carter"
          country="USA"
          rating={5}
          date="2 months ago"
          title="Highly Recommended"
          review="I've purchased several malas before, but this one is by far the best quality. Excellent customer service."
        />

        <ReviewCard
          name="Emily Wilson"
          country="United Kingdom"
          rating={4}
          date="3 months ago"
          title="Very Happy"
          review="Beautiful gemstone quality and very comfortable to wear. Will definitely purchase again."
        />

      </div>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">

        <button
          className="
            rounded-xl
            border
            border-[#C89A2A]
            px-8
            py-3
            font-semibold
            text-[#C89A2A]
            transition-all
            duration-300
            hover:bg-[#C89A2A]
            hover:text-white
          "
        >
          Show More Reviews
        </button>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-[#1A1A1A]
            px-8
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-[#333]
          "
        >
          <FiEdit3 />

          Write a Review

        </button>

      </div>

    </section>
  );
}