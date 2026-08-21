"use client";

import { useState } from "react";
import {
  GiPrayerBeads,
  GiCrystalBall,
} from "react-icons/gi";
import {
  FaGem,
} from "react-icons/fa";
import {
  PiBeltFill,
} from "react-icons/pi";
import {
  TbBowl,
} from "react-icons/tb";

const categories = [
  {
    name: "All",
    icon: <GiPrayerBeads />,
  },
  {
    name: "Gemstone",
    icon: <FaGem />,
  },
  {
    name: "Rudraksha",
    icon: <GiPrayerBeads />,
  },
  {
    name: "Bracelets",
    icon: <PiBeltFill />,
  },
  {
    name: "Crystal",
    icon: <GiCrystalBall />,
  },
  {
    name: "Singing Bowl",
    icon: <TbBowl />,
  },
];

export default function CategoryPills() {
  const [active, setActive] = useState("All");

  return (
    <section className="mt-14">

      <div className="text-center">

        <p className="mb-2 text-sm font-semibold uppercase tracking-[4px] text-[#C79B2A]">
          Browse Collections
        </p>

        <h2 className="heading-font text-4xl text-[#1A1A1A]">
          Shop by Category
        </h2>

      </div>

      <div
        className="
          mt-10
          flex
          gap-4
          overflow-x-auto
          pb-3
          scrollbar-hide
          lg:justify-center
        "
      >
        {categories.map((item) => {

          const selected = active === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`
                flex
                items-center
                gap-3
                whitespace-nowrap
                rounded-full
                border
                px-7
                py-4
                transition-all
                duration-300

                ${
                  selected
                    ? "bg-[#C79B2A] text-[#1A1A1A] border-[#C79B2A] shadow-lg"
                    : "bg-white text-[#555] border-[#E8DFD2] hover:border-[#C79B2A] hover:text-[#C79B2A] hover:-translate-y-1"
                }
              `}
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>

            </button>
          );
        })}
      </div>

    </section>
  );
}