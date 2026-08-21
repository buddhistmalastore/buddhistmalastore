"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredStone } from "./stonesData";

export default function FeaturedStone() {
  return (
    <div className="relative overflow-hidden rounded-[40px] border border-[#C89A2A]/15 bg-[#F5EEE3] p-3 shadow-[0_20px_70px_rgba(80,60,30,0.08)] md:p-5">
      
      <div className="grid overflow-hidden rounded-[32px] lg:grid-cols-2">

        {/* Image */}

        <div className="group relative min-h-[500px] overflow-hidden md:min-h-[620px]">

          <Image
            src={featuredStone.image}
            alt={featuredStone.name}
            fill
            priority
            className="
              object-cover
              transition-transform
              duration-[1200ms]
              ease-out
              group-hover:scale-105
            "
          />

          {/* Image overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          {/* Featured badge */}

          <div
            className="
              absolute
              left-6
              top-6
              rounded-full
              border
              border-white/30
              bg-black/25
              px-5
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[2px]
              text-white
              backdrop-blur-md
            "
          >
            Featured Gemstone
          </div>

          {/* Bottom image label */}

          <div className="absolute bottom-7 left-7 right-7">

            <p className="text-xs font-medium uppercase tracking-[3px] text-white/75">
              Himalayan Collection
            </p>

            <h3 className="heading-font mt-2 text-3xl text-white md:text-4xl">
              {featuredStone.name}
            </h3>

          </div>
        </div>

        {/* Content */}

        <div className="flex flex-col justify-center px-7 py-12 md:px-12 lg:px-16 xl:px-20">

          {/* Eyebrow */}

          <p className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
            Featured Gemstone
          </p>

          {/* Name */}

          <h2 className="heading-font mt-5 text-5xl font-semibold leading-tight text-[#1A1A1A] md:text-6xl">
            {featuredStone.name}
          </h2>

          {/* Title */}

          <h3 className="mt-4 text-xl font-medium text-[#B88620] md:text-2xl">
            {featuredStone.title}
          </h3>

          {/* Divider */}

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-12 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />
          </div>

          {/* Description */}

          <p className="mt-7 text-base leading-8 text-[#6F685F] md:text-lg md:leading-9">
            {featuredStone.description}
          </p>

          {/* Information */}

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <div
              className="
                rounded-2xl
                border
                border-[#C89A2A]/15
                bg-[#FBF7F0]
                px-5
                py-4
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#9A8D7A]">
                Chakra
              </p>

              <p className="mt-1 font-medium text-[#302B25]">
                {featuredStone.chakra}
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border
                border-[#C89A2A]/15
                bg-[#FBF7F0]
                px-5
                py-4
              "
            >
              <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#9A8D7A]">
                Zodiac
              </p>

              <p className="mt-1 font-medium text-[#302B25]">
                {featuredStone.zodiac}
              </p>
            </div>

          </div>

          {/* CTA */}

          <Link
            href={featuredStone.href}
            className="
              group
              mt-9
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-full
              bg-[#C89A2A]
              px-7
              py-4
              font-semibold
              text-white
              shadow-[0_10px_30px_rgba(184,134,32,0.20)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:bg-[#B88620]
              hover:shadow-[0_15px_40px_rgba(184,134,32,0.28)]
            "
          >
            Explore {featuredStone.name}

            <ArrowUpRight
              size={18}
              className="
                transition-transform
                duration-500
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </Link>

        </div>
      </div>
    </div>
  );
}