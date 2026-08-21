"use client";

import FeaturedStone from "./FeaturedStone";
import StoneCard from "./StoneCard";
import { stones } from "./stonesData";

export default function Gemstones() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FAF8F4]
        py-24
        lg:py-32
      "
    >
      {/* =====================================================
          SUBTLE DECORATIVE BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Left warm glow */}
        <div
          className="
            absolute
            left-[-180px]
            top-[20%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#C89A2A]/[0.025]
            blur-3xl
          "
        />

        {/* Right warm glow */}
        <div
          className="
            absolute
            right-[-180px]
            bottom-[10%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C89A2A]/[0.025]
            blur-3xl
          "
        />

        {/* Very subtle spiritual circle */}
        <div
          className="
            absolute
            left-1/2
            top-[35%]
            h-[700px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            border
            border-[#C89A2A]/[0.035]
          "
        />

      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">

        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="mx-auto mb-16 max-w-4xl text-center">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[5px]
              text-[#B88620]
            "
          >
            Discover Sacred Gemstones
          </p>

          <h2
            className="
              heading-font
              mt-5
              text-4xl
              font-semibold
              leading-tight
              text-[#1A1A1A]
              md:text-5xl
              lg:text-6xl
            "
          >
            Nature's Spiritual Treasures
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-3xl
              text-base
              leading-8
              text-[#6F685F]
              md:text-lg
              md:leading-9
            "
          >
            Every gemstone carries unique energy, symbolism and centuries of
            Himalayan spiritual tradition. Explore authentic natural stones
            handcrafted into timeless malas and jewelry.
          </p>

          {/* Decorative Divider */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C89A2A]/35" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-16 bg-[#C89A2A]/35" />
          </div>

        </div>

        {/* =====================================================
            FEATURED STONE
        ===================================================== */}

        <FeaturedStone />

        {/* =====================================================
            GEMSTONE COLLECTION
        ===================================================== */}

        <div className="mt-20">

          <div className="mb-8 flex items-end justify-between">

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-[#B88620]
                "
              >
                Explore
              </p>

              <h3
                className="
                  heading-font
                  mt-2
                  text-3xl
                  font-semibold
                  text-[#1A1A1A]
                  md:text-4xl
                "
              >
                Natural Gemstones
              </h3>

            </div>

            <span
              className="
                hidden
                text-sm
                text-[#8A8175]
                md:block
              "
            >
              Authentic Himalayan stones
            </span>

          </div>

          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {stones.map((stone) => (
              <StoneCard
                key={stone.name}
                stone={stone}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}