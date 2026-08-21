"use client";

export default function CraftCTA() {
  return (
    <div className="mt-32 text-center">
      <h3 className="heading-font text-5xl text-[#F7F3EC]">
        Crafted with Devotion.
      </h3>

      <p className="mt-4 text-xl text-[#CFC7B8]">
        Made for a Lifetime.
      </p>

      <button
        className="
          mt-10
          rounded-full
          bg-[#D4AF37]
          px-10
          py-5
          text-lg
          font-semibold
          text-black
          transition-all
          duration-500
          hover:scale-105
          hover:shadow-[0_0_40px_rgba(212,175,55,.35)]
        "
      >
        Explore Collection
      </button>
    </div>
  );
}