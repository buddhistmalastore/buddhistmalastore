"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

export default function TopBar() {
  return (
    <div className="hidden border-b border-[#E9E2D8] bg-[#FAF8F4] lg:block">
      <div
        className="
          relative
          mx-auto
          flex
          h-11
          max-w-[1500px]
          items-center
          justify-between
          px-8
          text-sm
          text-[#6B6257]
        "
      >
        {/* Left */}

        <div>
          Handmade with{" "}
          <span className="text-red-500">♥</span>{" "}
          in Nepal
        </div>

        {/* Center */}

        <div
          className="
            absolute
            left-1/2
            -translate-x-1/2
            whitespace-nowrap
            font-medium
            text-[#8A6820]
          "
        >
          🚚 Free Worldwide Shipping on Orders Above $150
        </div>

        {/* Right */}

        <div className="ml-auto flex items-center gap-6">
          <Link
            href="/track-order"
            className="transition-colors duration-300 hover:text-[#B88620]"
          >
            Track Order
          </Link>

          <Link
            href="/blog"
            className="transition-colors duration-300 hover:text-[#B88620]"
          >
            Blog
          </Link>

          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}