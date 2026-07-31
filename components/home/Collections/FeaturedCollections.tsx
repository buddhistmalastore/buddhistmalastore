"use client";

import CollectionCard from "./CollectionCard";
import { collections } from "./collections";

export default function FeaturedCollections() {
  return (
    <section className="bg-[#0B0B0B] py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <p className="uppercase tracking-[5px] text-[#D4AF37]">
            Explore
          </p>

          <h2
            className="
            heading-font
            mt-4
            text-5xl
            text-[#F7F3EC]
          "
          >
            Sacred Collections
          </h2>

          <p
            className="
            mx-auto
            mt-6
            max-w-2xl
            text-[#D8D3CB]
          "
          >
            Discover authentic malas, gemstones and ritual
            treasures handcrafted by skilled Nepalese artisans.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {collections.map((item) => (
            <CollectionCard
              key={item.title}
              {...item}
            />
          ))}

        </div>

      </div>

    </section>
  );
}