"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  title: string;
  image: string;
  collection: string;
}

export default function CollectionCard({
  title,
  image,
  collection,
}: Props) {
  return (
    <Link
      href={`/shop?collection=${encodeURIComponent(collection)}`}
      className="
        group
        relative
        block
        aspect-[4/5]
        overflow-hidden
        rounded-xl
        bg-[#EDE5D8]
        shadow-sm
        transition-all
        duration-500
        active:scale-[0.98]
        hover:-translate-y-1
        hover:shadow-xl
        sm:rounded-2xl
      "
    >
      {/* ================================================= */}
      {/* IMAGE */}
      {/* ================================================= */}

      <Image
        src={image}
        alt={title}
        fill
        sizes="
          (max-width: 639px) 50vw,
          (max-width: 1023px) 50vw,
          (max-width: 1279px) 33vw,
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

      {/* ================================================= */}
      {/* OVERLAY */}
      {/* ================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#1A1A1A]/80
          via-[#1A1A1A]/20
          to-transparent
          transition-all
          duration-500
          group-hover:from-[#1A1A1A]/70
        "
      />

      {/* ================================================= */}
      {/* GOLD BORDER */}
      {/* ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-2
          rounded-lg
          border
          border-white/0
          transition-all
          duration-500
          group-hover:border-[#C89A2A]/80
          sm:inset-3
          sm:rounded-xl
        "
      />

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-3
          sm:p-5
          md:p-7
        "
      >
        {/* Explore */}

        <p
          className="
            mb-1
            text-[8px]
            font-semibold
            uppercase
            tracking-[2px]
            text-[#E5C76B]
            opacity-100
            sm:mb-2
            sm:text-[10px]
            sm:tracking-[3px]
            sm:opacity-0
            sm:transition-all
            sm:duration-500
            sm:group-hover:translate-y-0
            sm:group-hover:opacity-100
          "
        >
          Explore
        </p>

        {/* Title */}

        <h3
          className="
            heading-font
            text-[17px]
            font-semibold
            leading-tight
            text-white
            transition-transform
            duration-500
            sm:text-2xl
            md:text-3xl
            sm:group-hover:-translate-y-1
          "
        >
          {title}
        </h3>

        {/* Gold Line */}

        <div
          className="
            mt-2
            h-px
            w-8
            bg-[#C89A2A]
            transition-all
            duration-500
            sm:mt-3
            sm:w-0
            sm:group-hover:w-12
          "
        />
      </div>
    </Link>
  );
}