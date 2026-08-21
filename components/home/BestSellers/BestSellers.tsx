"use client";

import ProductCard from "./ProductCard";
import { products } from "./products";

export default function BestSellers() {
  return (
    <section
      className="
        bg-[#FAF8F4]
        px-6
        py-24
        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}

        <div className="mb-16 text-center">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[4px]
              text-[#C89A2A]
            "
          >
            Our Collection
          </p>

          <h2
            className="
              heading-font
              mt-5
              text-4xl
              font-semibold
              leading-tight
              tracking-tight
              text-[#1A1A1A]
              md:text-5xl
              lg:text-6xl
            "
          >
            Our Most Loved Malas
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-[#666666]
              md:text-lg
            "
          >
            Hand-selected malas loved by practitioners, collectors,
            and spiritual seekers around the world.
          </p>

          {/* Decorative Divider */}

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-14 bg-[#C89A2A]/40" />
          </div>

        </div>

        {/* Products */}

        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}