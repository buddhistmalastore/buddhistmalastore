"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
    >
      <Image
        src="/images/logo.png"
        alt="Buddhist Mala Store"
        width={48}
        height={48}
        priority
      />

      <div className="leading-none">

        <h2
          className="
          heading-font
          text-[22px]
          tracking-[4px]
          text-[#F7F3EC]
        "
        >
          BUDDHIST
        </h2>

        <p
          className="
          text-[11px]
          tracking-[3px]
          uppercase
          text-[#D4AF37]
        "
        >
          Mala Store
        </p>

      </div>
    </Link>
  );
}