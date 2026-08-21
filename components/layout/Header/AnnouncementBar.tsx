"use client";

import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div
      className="
        hidden
        h-10
        items-center
        justify-center
        bg-[#1A1A1A]
        px-6
        text-center
        text-sm
        tracking-wide
        text-white
        lg:flex
      "
    >
      <div className="flex items-center gap-5">
        <span className="text-[#D8D0C2]">
          🚚 Free Worldwide Shipping on Orders Above $150
        </span>

        <span className="h-4 w-px bg-white/20" />

        <Link
          href="/blog"
          className="
            font-medium
            text-[#D4AF37]
            transition-colors
            duration-300
            hover:text-[#F1D77A]
          "
        >
          Discover Our Craftsmanship →
        </Link>
      </div>
    </div>
  );
}