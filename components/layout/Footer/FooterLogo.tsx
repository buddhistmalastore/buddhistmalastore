"use client";

import Image from "next/image";
import Link from "next/link";

import { footerInfo, socialLinks } from "./footerData";

export default function FooterLogo() {
  return (
    <div className="flex flex-col items-center text-center">

      {/* ================= Divider ================= */}

      <div className="relative mb-6 flex w-full items-center justify-center">

        <div className="absolute left-0 h-px w-[42%] bg-[#D4AF3725]" />

        <div className="relative z-10 bg-[#F7F3EC] px-4">

          <Image
            src="/icons/dharma-wheel.png"
            alt="Dharma Wheel"
            width={32}
            height={32}
          />

        </div>

        <div className="absolute right-0 h-px w-[42%] bg-[#D4AF3725]" />

      </div>

      {/* ================= Logo ================= */}

      <Link
        href="/"
        className="transition duration-300 hover:scale-105"
      >
        <Image
          src="/logo.png"
          alt={footerInfo.brand}
          width={110}
          height={110}
          priority
        />
      </Link>

      {/* ================= Brand ================= */}

      <h2
        className="
          heading-font
          mt-3
          text-[38px]
          leading-none
          text-[#1F1A17]
        "
      >
        {footerInfo.brand}
      </h2>

      <p
        className="
          mt-1
          text-lg
          text-[#B8860B]
        "
      >
        {footerInfo.subtitle}
      </p>

      {/* Gold Line */}

      <div className="mt-4 h-px w-20 bg-[#D4AF37]" />

      {/* Tagline */}

      <p
        className="
          mt-4
          max-w-xl
          text-[13px]
          leading-6
          tracking-[2px]
          uppercase
          text-[#4A433D]
        "
      >
        {footerInfo.tagline}
      </p>

      {/* ================= Social ================= */}

      <div className="mt-5 flex items-center gap-3">

        {socialLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              target="_blank"
              aria-label={item.title}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#D4AF37]
                text-[#D4AF37]
                transition-all
                duration-300
                hover:bg-[#D4AF37]
                hover:text-white
                hover:shadow-lg
              "
            >
              <Icon size={16} />
            </Link>
          );
        })}

      </div>

    </div>
  );
}