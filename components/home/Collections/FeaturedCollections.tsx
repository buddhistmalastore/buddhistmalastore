"use client";

import CollectionCard from "./CollectionCard";
import { collections } from "./collections";

export default function FeaturedCollections() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FAF8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:py-32
      "
    >
      {/* ================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[400px]
            w-[500px]
            -translate-x-1/2
            rounded-full
            bg-[#C89A2A]/[0.025]
            blur-3xl
            sm:h-[500px]
            sm:w-[700px]
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}

        <div
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center
            sm:mb-16
          "
        >
          {/* Eyebrow */}

          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-7 bg-[#C89A2A]/50 sm:w-10" />

            <p
              className="
                font-body
                text-[10px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-[#B88620]
                sm:text-[11px]
                sm:tracking-[0.28em]
              "
            >
              Explore
            </p>

            <span className="h-px w-7 bg-[#C89A2A]/50 sm:w-10" />
          </div>

          {/* Heading */}

          <h2
            className="
              mt-4
              heading-font
              text-[36px]
              font-semibold
              leading-[1.08]
              tracking-[-0.02em]
              text-[#1A1A1A]
              sm:mt-5
              sm:text-[46px]
              md:text-[58px]
            "
          >
            Sacred Collections
          </h2>

          {/* Gold Accent */}

          <div
            className="
              mx-auto
              mt-5
              flex
              items-center
              justify-center
              gap-3
              sm:mt-6
            "
          >
            <span className="h-px w-10 bg-[#C89A2A]/35 sm:w-14" />

            <span
              className="
                h-2
                w-2
                rotate-45
                bg-[#C89A2A]
                shadow-[0_0_12px_rgba(200,154,42,0.25)]
              "
            />

            <span className="h-px w-10 bg-[#C89A2A]/35 sm:w-14" />
          </div>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-6
              max-w-[340px]
              font-body
              text-[14px]
              leading-7
              text-[#6B6257]
              sm:mt-7
              sm:max-w-2xl
              sm:text-[15px]
              sm:leading-8
              md:text-base
            "
          >
            Discover authentic malas, gemstones and ritual
            treasures handcrafted by skilled Nepalese artisans.
          </p>
        </div>

        {/* ================================================= */}
        {/* COLLECTION CARDS */}
        {/* ================================================= */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:gap-6
            lg:gap-8
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