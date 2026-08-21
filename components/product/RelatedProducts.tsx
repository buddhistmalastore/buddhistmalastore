"use client";

import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";

export default function RelatedProducts() {
  // Show first 4 products for now
  const related = products.slice(0, 4);

  return (
    <section className="mt-28">

      {/* Heading */}

      <div className="mb-12 text-center">

        <p
          className="
            mb-3
            uppercase
            tracking-[4px]
            text-[#C79B2A]
            text-sm
            font-semibold
          "
        >
          YOU MAY ALSO LIKE
        </p>

        <h2
          className="
            heading-font
            text-5xl
            text-[#1A1A1A]
          "
        >
          Related Products
        </h2>

        <p
          className="
            mx-auto
            mt-6
            max-w-2xl
            text-[#6E665D]
            leading-8
          "
        >
          Carefully handcrafted Buddhist malas,
          bracelets, and sacred gemstones chosen to
          complement your spiritual journey.
        </p>

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
        {related.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}