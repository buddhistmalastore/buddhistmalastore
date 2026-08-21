"use client";

import { Product } from "@/types/product";
import RelatedProductCard from "./RelatedProducts/RelatedProductCard";

interface Props {
  products: Product[];
}

export default function RecentlyViewed({
  products,
}: Props) {
  if (!products.length) return null;

  return (
    <section className="mt-28">

      <div className="mb-10">

        <span
          className="
            text-xs
            uppercase
            tracking-[3px]
            font-semibold
            text-[#C79B2A]
          "
        >
          Continue Shopping
        </span>

        <h2
          className="
            mt-2
            text-3xl
            font-semibold
            text-[#1A1A1A]
          "
        >
          Recently Viewed
        </h2>

      </div>

      <div
        className="
          grid
          gap-8

          sm:grid-cols-2

          lg:grid-cols-4
        "
      >

        {products.map((product) => (

          <RelatedProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>
  );
}