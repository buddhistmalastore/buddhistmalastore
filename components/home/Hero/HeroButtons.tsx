"use client";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">

      {/* =====================================================
          EXPLORE COLLECTION
      ===================================================== */}

      <button
        className="
          group
          relative
          overflow-hidden
          rounded-full
          bg-[#C89A2A]
          px-9
          py-4
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
          md:px-10
          md:py-4
        "
      >
        <span className="relative z-10 flex items-center gap-3">
          Explore Collection

          <span
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
      </button>

      {/* =====================================================
          DISCOVER OUR STORY
      ===================================================== */}

      <button
        className="
          group
          rounded-full
          border
          border-[#E1B94F]/70
          bg-black/20
          px-9
          py-4
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
          md:px-10
          md:py-4
        "
      >
        <span className="flex items-center gap-3">
          Discover Our Story

          <span
            className="
              transition-transform
              duration-500
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </span>
      </button>

    </div>
  );
}