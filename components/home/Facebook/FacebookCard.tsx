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
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#D4AF3715]
        bg-[#111]
        transition-all
        duration-500
        hover:border-[#D4AF37]
        hover:shadow-[0_20px_60px_rgba(212,175,55,.18)]
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
            group-hover:scale-110
          "
        />

        {/* Dark Gradient */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/95
            via-black/20
            to-transparent
          "
        />

        {/* Facebook Hover Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-black/40
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            flex
            items-center
            justify-center
          "
        >
          <div
            className="
              rounded-full
              bg-[#1877F2]
              p-5
              shadow-xl
              transition-transform
              duration-500
              group-hover:scale-110
            "
          >
            <FaFacebook
              size={34}
              className="text-white"
            />
          </div>
        </div>

        {/* Card Content */}

        <div className="absolute bottom-6 left-6 right-6">

          <span
            className="
              inline-block
              rounded-full
              border
              border-[#D4AF37]
              bg-black/60
              px-4
              py-1
              text-xs
              uppercase
              tracking-[3px]
              text-[#D4AF37]
            "
          >
            {type}
          </span>

          <h3
            className="
              heading-font
              mt-4
              text-2xl
              text-[#F7F3EC]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-3
              text-sm
              uppercase
              tracking-[4px]
              text-[#D4AF37]
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
            "
          >
            Discover Story →
          </p>

        </div>

      </div>
    </Link>
  );
}