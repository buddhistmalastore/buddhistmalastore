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
      href={slug}
      className="group relative overflow-hidden rounded-3xl"
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div
          className="
          absolute
          inset-0
          border
          border-[#D4AF37]/0
          transition-all
          duration-500
          group-hover:border-[#D4AF37]/60
        "
        />

        <div className="absolute bottom-8 left-8">

          <h3
            className="
            heading-font
            text-3xl
            text-white
          "
          >
            {title}
          </h3>

        </div>

      </div>
    </Link>
  );
}