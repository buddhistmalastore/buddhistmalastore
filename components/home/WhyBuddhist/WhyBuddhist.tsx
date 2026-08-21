"use client";

import StoryCard from "./StoryCard";
import { storyData } from "./storyData";

export default function WhyBuddhist() {
  return (
    <section
      className="
        bg-[#F5EFE4]
        px-6
        py-24
        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}

        <div className="mb-16 text-center">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[4px]
              text-[#C89A2A]
            "
          >
            The Art of Handmade Spiritual Craftsmanship
          </p>

          <h2
            className="
              heading-font
              mt-5
              text-4xl
              font-semibold
              leading-tight
              tracking-tight
              text-[#1A1A1A]
              md:text-5xl
              lg:text-6xl
            "
          >
            More Than Jewelry.
            <br />

            <span className="text-[#C89A2A]">
              A Living Tradition.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-7
              max-w-4xl
              text-base
              leading-8
              text-[#666666]
              md:text-lg
              md:leading-9
            "
          >
            Every handcrafted mala carries generations of Nepalese
            craftsmanship, authentic natural gemstones, and the timeless
            spirit of Himalayan Buddhist traditions.
          </p>

          {/* Decorative Divider */}

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-16 bg-[#C89A2A]/40" />
          </div>
        </div>

        {/* Four Story Cards — One Row */}

        <div
          className="
            grid
            grid-cols-1
            gap-6
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {storyData.map((item) => (
            <StoryCard
              key={item.title}
              {...item}
            />
          ))}
        </div>

      </div>
    </section>
  );
}