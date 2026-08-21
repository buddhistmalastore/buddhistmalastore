"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface Props {
  stone: {
    name: string;
    image: string;
    meaning: string;
    href: string;
  };
}

export default function StoneCard({ stone }: Props) {
  return (
    <Link
      href={stone.href}
      className="
        group
        block
        overflow-hidden
        rounded-[28px]
        border
        border-[#C89A2A]/15
        bg-[#FBF7F0]
        shadow-[0_10px_35px_rgba(80,60,30,0.06)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#C89A2A]/45
        hover:shadow-[0_18px_45px_rgba(80,60,30,0.12)]
      "
    >
      {/* Image */}

      <div className="relative h-[260px] overflow-hidden bg-[#F3EBDD]">
        <Image
          src={stone.image}
          alt={stone.name}
          fill
          className="
            object-cover
            transition-transform
            duration-[1000ms]
            ease-out
            group-hover:scale-110
          "
        />

        {/* Image overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/35
            via-transparent
            to-transparent
            opacity-70
            transition-opacity
            duration-500
            group-hover:opacity-90
          "
        />

        {/* Explore icon */}

        <div
          className="
            absolute
            right-5
            top-5
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-black/20
            text-white
            opacity-0
            backdrop-blur-md
            transition-all
            duration-500
            group-hover:opacity-100
          "
        >
          <ArrowUpRight
            size={18}
            className="
              transition-transform
              duration-500
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>

        {/* Gemstone name on image */}

        <div className="absolute bottom-5 left-5">
          <p className="text-xs font-semibold uppercase tracking-[2px] text-white/75">
            Sacred Stone
          </p>

          <h3 className="heading-font mt-1 text-2xl font-semibold text-white">
            {stone.name}
          </h3>
        </div>
      </div>

      {/* Content */}

      <div className="p-6">
        {/* Decorative line */}

        <div className="mb-4 flex items-center gap-2">
          <span className="h-px w-8 bg-[#C89A2A]/40" />

          <span className="h-1.5 w-1.5 rotate-45 bg-[#C89A2A]" />
        </div>

        {/* Meaning */}

        <p className="min-h-[52px] text-sm leading-7 text-[#6F685F]">
          {stone.meaning}
        </p>

        {/* CTA */}

        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-[#B88620]
            transition-all
            duration-500
            group-hover:gap-3
          "
        >
          Explore Collection

          <ArrowUpRight
            size={16}
            className="
              transition-transform
              duration-500
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          />
        </div>
      </div>
    </Link>
  );
}