"use client";

import Link from "next/link";

export default function WhyCTA() {
  return (
    <div className="mt-20 text-center lg:mt-24">
      <h3 className="heading-font text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
        Experience Authentic Nepalese Craftsmanship
      </h3>

      <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#6F685F]">
        Discover handcrafted malas, natural gemstones, and sacred treasures
        created with Himalayan tradition and care.
      </p>

      <Link
        href="/shop"
        className="
          mt-8
          inline-flex
          items-center
          rounded-full
          bg-[#C89A2A]
          px-9
          py-4
          font-semibold
          text-white
          transition-all
          duration-500
          hover:-translate-y-1
          hover:bg-[#B88620]
          hover:shadow-[0_15px_35px_rgba(184,134,32,0.22)]
        "
      >
        Shop Collection
        <span className="ml-2 transition-transform duration-500 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}