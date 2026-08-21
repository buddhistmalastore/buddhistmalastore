"use client";

import Image from "next/image";

export default function FooterBottom() {
  return (
    <section className="py-5">

      {/* Divider */}

      <div className="relative flex items-center justify-center">

        <div className="absolute left-0 h-px w-[44%] bg-[#D4AF3725]" />

        <div className="relative bg-[#F7F3EC] px-4">

          <Image
            src="/icons/dharma-wheel.png"
            alt="Dharma Wheel"
            width={28}
            height={28}
          />

        </div>

        <div className="absolute right-0 h-px w-[44%] bg-[#D4AF3725]" />

      </div>

      {/* Copyright */}

      <div className="mt-4 text-center">

        <p
          className="
            text-sm
            font-medium
            text-[#3B352F]
          "
        >
          © 2026 Buddhist Mala Store. All Rights Reserved.
        </p>

        <p
          className="
            mt-2
            text-[11px]
            uppercase
            tracking-[3px]
            text-[#B8860B]
          "
        >
          Crafted with Devotion in Nepal
        </p>

      </div>

    </section>
  );
}