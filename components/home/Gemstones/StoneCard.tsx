"use client";

import Image from "next/image";
import Link from "next/link";

interface Props {
  stone: {
    name: string;
    image: string;
    meaning: string;
    href: string;
  };
}

export default function StoneCard({ stone }: Props) {
  return (
    <Link
      href={stone.href}
      className="group overflow-hidden rounded-3xl border border-[#D4AF3720] bg-[#111] transition duration-500 hover:-translate-y-2 hover:border-[#D4AF37]"
    >
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={stone.image}
          alt={stone.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
      </div>

      <div className="p-6">
        <h3 className="heading-font text-3xl text-[#F7F3EC]">
          {stone.name}
        </h3>

        <p className="mt-2 text-[#CFC7B8]">
          {stone.meaning}
        </p>

        <span className="mt-5 inline-block text-[#D4AF37]">
          Explore Collection →
        </span>
      </div>
    </Link>
  );
}