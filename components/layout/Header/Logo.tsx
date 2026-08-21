"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4"
    >
      <Image
        src="/logo.png"
        alt="Buddhist Mala Store"
        width={70}
        height={70}
        priority
        className="
          h-16
          w-auto
          object-contain
        "
      />

      <div className="hidden lg:block">

        <h1
          className="
            heading-font
            text-[26px]
            leading-none
            tracking-[1px]
            text-[#C79B2A]
          "
        >
          Buddhist Mala
        </h1>

        <p
          className="
            mt-1
            text-[10px]
            uppercase
            tracking-[3px]
            text-[#5B534A]
          "
        >
          Store & Handicraft Center
        </p>

      </div>
    </Link>
  );
}