"use client";

import { purposeData } from "./purposeData";
import PurposeCard from "./PurposeCard";

export default function Purpose() {
  return (
    <section className="bg-[#0B0B0B] py-32">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">

          <p className="uppercase tracking-[6px] text-[#D4AF37]">
            Discover Your Journey
          </p>

          <h2 className="heading-font mt-5 text-6xl text-[#F7F3EC]">
            Find Your Spiritual Companion
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-[#D8D3CB]">
            Every spiritual journey is unique. Explore handcrafted malas
            and sacred treasures chosen for your personal intention.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {purposeData.map((item) => (
            <PurposeCard
              key={item.title}
              {...item}
            />
          ))}

        </div>

      </div>

    </section>
  );
}