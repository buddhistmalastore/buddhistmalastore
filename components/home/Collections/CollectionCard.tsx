"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  slug: string;
}

export default function CollectionCard({
  title,
  image,
  slug,
}: Props) {
  return (
    <Link
      href={`/collections/${slug}`}
      className="
        group
        relative
        block
        aspect-[4/5]
        overflow-hidden
        rounded-2xl
        bg-[#EDE5D8]
        shadow-sm
        transition-all
        duration-500
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Image */}

      <Image
        src={image}
        alt={title}
        fill
        sizes="
          (max-width: 768px) 100vw,
          (max-width: 1280px) 50vw,
          25vw
        "
        className="
          object-cover
          transition-transform
          duration-700
          ease-out
          group-hover:scale-105
        "
      />

      {/* Soft Image Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#1A1A1A]/75
          via-[#1A1A1A]/15
          to-transparent
          transition-opacity
          duration-500
          group-hover:from-[#1A1A1A]/65
        "
      />

      {/* Gold Border */}

      <div
        className="
          pointer-events-none
          absolute
          inset-3
          rounded-xl
          border
          border-white/0
          transition-all
          duration-500
          group-hover:border-[#C89A2A]/80
        "
      />

      {/* Content */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-7
        "
      >
        <p
          className="
            mb-2
            text-[10px]
            font-semibold
            uppercase
            tracking-[3px]
            text-[#E5C76B]
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          Explore
        </p>

        <h3
          className="
            heading-font
            text-2xl
            font-semibold
            text-white
            transition-transform
            duration-500
            group-hover:-translate-y-1
            md:text-3xl
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-3
            h-px
            w-0
            bg-[#C89A2A]
            transition-all
            duration-500
            group-hover:w-12
          "
        />
      </div>
    </Link>
  );
}