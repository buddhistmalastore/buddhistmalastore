"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      aria-label="Buddhist Mala Store"
      className="
        flex
        shrink-0
        items-center
        gap-2
        sm:gap-3
        lg:gap-4
      "
    >
      <Image
        src="/logo.png"
        alt="Buddhist Mala Store"
        width={70}
        height={70}
        priority
        className="
          h-12
          w-auto
          object-contain
          sm:h-14
          lg:h-16
        "
      />

      <div className="hidden lg:block">
        <h1
          className="
            logo-title
            text-[25px]
            leading-none
            text-[#C79B2A]
          "
        >
          Buddhist Mala
        </h1>

        <p
          className="
            mt-1
            font-body
            text-[9px]
            font-semibold
            uppercase
            tracking-[2.5px]
            text-[#5B534A]
          "
        >
          Store & Handicraft Center
        </p>
      </div>
    </Link>
  );
}