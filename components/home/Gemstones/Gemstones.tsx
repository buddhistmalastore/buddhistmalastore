"use client";

import FeaturedStone from "./FeaturedStone";
import StoneCard from "./StoneCard";
import { stones } from "./stonesData";

export default function Gemstones() {
  return (
    <section className="bg-[#0B0B0B] py-28">

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <div className="mb-20 text-center">

          <p className="tracking-[5px] uppercase text-[#D4AF37]">
            Discover Sacred Gemstones
          </p>

          <h2 className="heading-font mt-5 text-6xl text-[#F7F3EC]">
            Nature's Spiritual Treasures
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-[#CFC7B8]">
            Every gemstone carries unique energy, symbolism and centuries of
            Himalayan spiritual tradition. Explore authentic natural stones
            handcrafted into timeless malas and jewelry.
          </p>

        </div>

        <FeaturedStone />

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {stones.map((stone) => (
            <StoneCard
              key={stone.name}
              stone={stone}
            />
          ))}

        </div>

      </div>

    </section>
  );
}