"use client";

import Image from "next/image";
import Link from "next/link";
import { shopCategories } from "@/constants/categories";

export default function MegaMenu() {
  return (
    <div
      className="
        invisible
        absolute
        left-1/2
        top-full
        z-50
        mt-5
        w-[1100px]
        -translate-x-1/2
        rounded-[30px]
        border
        border-[#E7DFD2]
        bg-white
        opacity-0
        shadow-[0_35px_80px_rgba(0,0,0,.12)]
        transition-all
        duration-300
        group-hover:visible
        group-hover:opacity-100
        group-hover:mt-2
      "
    >
      <div className="grid grid-cols-3 gap-12 p-10">

        <div className="col-span-2">

          <h3 className="heading-font mb-6 text-3xl text-[#1A1A1A]">
            Shop Collections
          </h3>

          <div className="grid grid-cols-2 gap-y-5">

            {shopCategories.map((category) => (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="
                  text-[16px]
                  text-[#5B534A]
                  transition-all
                  duration-300
                  hover:translate-x-2
                  hover:text-[#C79B2A]
                "
              >
                {category}
              </Link>
            ))}

          </div>

        </div>

        <div>

          <div className="overflow-hidden rounded-[24px]">

            <Image
              src="/products/tiger-eye.jpg"
              alt="Featured Collection"
              width={420}
              height={520}
              className="transition duration-500 hover:scale-105"
            />

          </div>

          <h4 className="heading-font mt-6 text-2xl">
            Tiger Eye Collection
          </h4>

          <p className="mt-2 text-[#77736F]">
            Handmade in Nepal using premium natural Tiger Eye gemstones.
          </p>

          <Link
            href="/shop"
            className="
              mt-5
              inline-flex
              text-[#C79B2A]
              font-semibold
            "
          >
            Shop Collection →
          </Link>

        </div>

      </div>
    </div>
  );
}