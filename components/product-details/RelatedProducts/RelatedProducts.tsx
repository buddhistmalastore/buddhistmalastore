"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { Product } from "@/types/product";

import RelatedProductCard from "./RelatedProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({
  products,
}: RelatedProductsProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section className="w-full">
      {/* Header */}

      <div className="mb-14 flex items-end justify-between">
        <div>
          <span
            className="
              text-[12px]
              font-semibold
              uppercase
              tracking-[3px]
              text-[#C79B2A]
            "
          >
            YOU MAY ALSO LIKE
          </span>

          <h2
            className="
              mt-3
              text-[36px]
              font-semibold
              tracking-tight
              text-[#1A1A1A]
            "
          >
            Related Products
          </h2>

          <p
            className="
              mt-4
              max-w-[700px]
              text-[15px]
              leading-8
              text-[#777]
            "
          >
            Discover handcrafted malas, gemstone bracelets,
            meditation jewelry and spiritual accessories
            carefully made by experienced Nepalese artisans.
          </p>
        </div>

        {/* Desktop View All */}

        <Link
          href="/shop"
          className="
            hidden
            items-center
            gap-2
            rounded-full
            border
            border-[#C79B2A]
            px-6
            py-3
            text-sm
            font-semibold
            text-[#C79B2A]
            transition-all
            duration-300
            hover:bg-[#C79B2A]
            hover:text-white
            md:inline-flex
          "
        >
          View All

          <FiArrowRight size={17} />
        </Link>
      </div>

      {/* Product Grid */}

      <div
        className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {products.map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Mobile View All */}

      <div className="mt-12 flex justify-center md:hidden">
        <Link
          href="/shop"
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-[#C79B2A]
            px-7
            py-3
            text-sm
            font-semibold
            text-[#C79B2A]
            transition-all
            duration-300
            hover:bg-[#C79B2A]
            hover:text-white
          "
        >
          View All Products

          <FiArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}