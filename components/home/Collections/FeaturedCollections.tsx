"use client";

import CollectionCard from "./CollectionCard";
import { collections } from "./collections";

export default function FeaturedCollections() {
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
              tracking-[5px]
              text-[#C89A2A]
            "
          >
            Explore
          </p>

          <h2
            className="
              heading-font
              mt-4
              text-4xl
              font-semibold
              tracking-tight
              text-[#1A1A1A]
              md:text-5xl
            "
          >
            Sacred Collections
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
            Discover authentic malas, gemstones and ritual
            treasures handcrafted by skilled Nepalese artisans.
          </p>

          {/* Decorative Divider */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#C89A2A]/40" />

            <span className="h-1.5 w-1.5 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-12 bg-[#C89A2A]/40" />
          </div>

        </div>

        {/* Collection Cards */}
        <div
          className="
            grid
            gap-8
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
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