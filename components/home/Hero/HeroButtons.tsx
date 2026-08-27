"use client";

import Link from "next/link";

export default function HeroButtons() {
  return (
    <div
      className="
        flex
        w-full
        flex-col
        gap-3
        sm:w-auto
        sm:flex-row
        sm:items-center
        sm:gap-4
      "
    >
      {/* =====================================================
          EXPLORE COLLECTION
      ===================================================== */}

      <Link
        href="/shop"
        className="
          group
          relative
          flex
          w-full
          items-center
          justify-center
          overflow-hidden
          rounded-full
          bg-[#C89A2A]
          px-7
          py-3.5
          text-sm
          font-semibold
          tracking-wide
          text-white
          shadow-[0_12px_35px_rgba(0,0,0,0.25)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:bg-[#D8AA3D]
          hover:shadow-[0_18px_45px_rgba(200,154,42,0.35)]
          sm:w-auto
          sm:px-9
          sm:py-4
          md:px-10
        "
      >
        <span className="relative z-10 flex items-center gap-3">
          <span>Explore Collection</span>

          <span
            aria-hidden="true"
            className="
              text-lg
              transition-transform
              duration-500
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </span>
      </Link>

      {/* =====================================================
          DISCOVER OUR STORY
      ===================================================== */}

      <Link
        href="/about"
        className="
          group
          flex
          w-full
          items-center
          justify-center
          rounded-full
          border
          border-[#E1B94F]/70
          bg-black/20
          px-7
          py-3.5
          text-sm
          font-semibold
          tracking-wide
          text-[#FFF9EC]
          backdrop-blur-md
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[#C89A2A]
          hover:bg-[#C89A2A]
          hover:text-white
          hover:shadow-[0_12px_35px_rgba(200,154,42,0.25)]
          sm:w-auto
          sm:px-9
          sm:py-4
          md:px-10
        "
      >
        <span className="flex items-center gap-3">
          <span>Discover Our Story</span>

          <span
            aria-hidden="true"
            className="
              transition-transform
              duration-500
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </span>
      </Link>
    </div>
  );
}