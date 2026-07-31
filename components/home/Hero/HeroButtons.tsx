"use client";

export default function HeroButtons() {
  return (
    <div className="mt-12 flex flex-wrap gap-5">

      <button
        className="
        rounded-full
        bg-[#D4AF37]
        px-10
        py-4
        font-semibold
        text-black
        transition-all
        duration-500
        hover:scale-105
        hover:shadow-[0_0_40px_rgba(212,175,55,.5)]
      "
      >
        Explore Collection
      </button>

      <button
        className="
        rounded-full
        border
        border-[#D4AF37]
        bg-white/5
        backdrop-blur-md
        px-10
        py-4
        text-white
        transition-all
        duration-500
        hover:bg-[#D4AF37]
        hover:text-black
      "
      >
        Discover Our Story
      </button>

    </div>
  );
}