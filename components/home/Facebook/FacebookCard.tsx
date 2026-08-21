"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";

interface Props {
  image: string;
  title: string;
  type: string;
  href: string;
}

export default function FacebookCard({
  image,
  title,
  type,
  href,
}: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group
        relative
        block
        overflow-hidden
        rounded-[28px]
        border
        border-[#C89A2A]/15
        bg-[#F5EEE3]
        shadow-[0_8px_30px_rgba(80,60,30,0.05)]
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-[#C89A2A]/50
        hover:shadow-[0_20px_55px_rgba(80,60,30,0.12)]
      "
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* Image Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/85
            via-black/20
            to-transparent
          "
        />

        {/* Facebook Hover */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/25
            opacity-0
            transition-all
            duration-500
            group-hover:opacity-100
          "
        >
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#1877F2]
              text-white
              shadow-[0_10px_30px_rgba(24,119,242,0.35)]
              transition-all
              duration-500
              group-hover:scale-110
            "
          >
            <FaFacebook size={30} />
          </div>
        </div>

        {/* Content */}

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span
            className="
              inline-flex
              rounded-full
              border
              border-white/40
              bg-black/35
              px-4
              py-1.5
              text-[11px]
              font-semibold
              uppercase
              tracking-[2.5px]
              text-white
              backdrop-blur-sm
            "
          >
            {type}
          </span>

          <h3
            className="
              heading-font
              mt-4
              text-2xl
              font-semibold
              leading-tight
              text-white
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
              text-sm
              font-semibold
              text-[#F1CF72]
              opacity-0
              translate-y-3
              transition-all
              duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            Discover Story
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}