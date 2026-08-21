"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

interface Props {
  image: string;
  href: string;
}

export default function InstagramCard({
  image,
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
      hover:border-[#D4AF37]
      transition-all
      duration-500
    "
    >
      <div className="relative aspect-square overflow-hidden">

        <Image
          src={image}
          alt="Instagram"
          fill
          className="
          object-cover
          transition
          duration-700
          group-hover:scale-110
        "
        />

        <div
          className="
          absolute
          inset-0
          bg-black/55
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          flex
          items-center
          justify-center
        "
        >
          <FaInstagram
            size={44}
            className="text-[#D4AF37]"
          />
        </div>

      </div>
    </Link>
  );
}