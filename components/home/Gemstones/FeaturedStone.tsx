"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredStone } from "./stonesData";

export default function FeaturedStone() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">

      <div className="relative h-[650px] overflow-hidden rounded-[40px]">
        <Image
          src={featuredStone.image}
          alt={featuredStone.name}
          fill
          className="object-cover transition duration-700 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center">

        <p className="tracking-[6px] uppercase text-[#D4AF37]">
          Featured Gemstone
        </p>

        <h2 className="heading-font mt-4 text-6xl text-[#F7F3EC]">
          {featuredStone.name}
        </h2>

        <h3 className="mt-5 text-2xl text-[#D4AF37]">
          {featuredStone.title}
        </h3>

        <p className="mt-8 text-lg leading-9 text-[#CFC7B8]">
          {featuredStone.description}
        </p>

        <div className="mt-8 space-y-2">

          <p>
            <span className="text-[#D4AF37]">Chakra:</span>{" "}
            {featuredStone.chakra}
          </p>

          <p>
            <span className="text-[#D4AF37]">Zodiac:</span>{" "}
            {featuredStone.zodiac}
          </p>

        </div>

        <Link
          href={featuredStone.href}
          className="mt-10 inline-flex w-fit rounded-full bg-[#D4AF37] px-8 py-4 font-semibold text-black transition hover:scale-105"
        >
          Explore Citrine →
        </Link>

      </div>

    </div>
  );
}