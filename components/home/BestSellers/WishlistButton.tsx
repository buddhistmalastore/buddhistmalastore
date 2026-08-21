"use client";

import { Heart } from "lucide-react";

export default function WishlistButton() {
  return (
    <button
      type="button"
      aria-label="Add to wishlist"
      className="
        absolute
        right-4
        top-4
        z-20
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[#E8DFD2]
        bg-white/90
        text-[#555555]
        shadow-sm
        backdrop-blur-md
        transition-all
        duration-300
        hover:scale-105
        hover:border-[#C89A2A]
        hover:bg-[#C89A2A]
        hover:text-white
        hover:shadow-[0_6px_20px_rgba(200,154,42,0.25)]
      "
    >
      <Heart
        size={18}
        strokeWidth={1.8}
      />
    </button>
  );
}