"use client";

import ProductCard from "./ProductCard";
import { products } from "./products";

export default function BestSellers() {
  return (
    <section className="bg-[#0B0B0B] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="uppercase tracking-[5px] text-[#D4AF37]">
            Our Collection
          </p>

          <h2 className="heading-font mt-5 text-5xl text-[#F7F3EC]">
            Our Most Loved Malas
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[#D6D2CA]">
            Hand-selected malas loved by practitioners, collectors,
            and spiritual seekers around the world.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

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