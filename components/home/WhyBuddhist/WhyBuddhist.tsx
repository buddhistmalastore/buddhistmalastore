"use client";

import StoryCard from "./StoryCard";
import { storyData } from "./storyData";

export default function WhyBuddhist() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F5EFE4]
        px-6
        py-24
        lg:py-32
      "
    >
      {/* Subtle background atmosphere */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute
            left-1/2
            top-[-200px]
            h-[500px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#C89A2A]/[0.025]
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-250px]
            right-[-150px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#C89A2A]/[0.02]
            blur-3xl
          "
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}

        <div className="mx-auto mb-16 max-w-5xl text-center">

          {/* Eyebrow */}

          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#C89A2A]/45" />

            <p
              className="
                font-body
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#B88620]
                md:text-[11px]
                md:tracking-[0.28em]
              "
            >
              The Art of Handmade Spiritual Craftsmanship
            </p>

            <span className="h-px w-10 bg-[#C89A2A]/45" />
          </div>

          {/* Main Heading */}

          <h2
            className="
              mt-6
              heading-font
              text-[48px]
              font-semibold
              leading-[0.98]
              tracking-[-0.025em]
              text-[#1A1A1A]
              sm:text-[56px]
              md:text-[64px]
              lg:text-[70px]
            "
          >
            More Than Jewelry.
            <br />

            <span className="text-[#C89A2A]">
              A Living Tradition.
            </span>
          </h2>

          {/* Decorative Divider */}

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C89A2A]/35" />

            <span
              className="
                h-2
                w-2
                rotate-45
                bg-[#C89A2A]
                shadow-[0_0_12px_rgba(200,154,42,0.22)]
              "
            />

            <span className="h-px w-16 bg-[#C89A2A]/35" />
          </div>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-7
              max-w-4xl
              font-body
              text-[15px]
              leading-8
              text-[#665F56]
              md:text-base
              md:leading-8
              lg:text-[17px]
              lg:leading-9
            "
          >
            Every handcrafted mala carries generations of Nepalese
            craftsmanship, authentic natural gemstones, and the timeless
            spirit of Himalayan Buddhist traditions.
          </p>
        </div>

        {/* ================================================= */}
        {/* STORY CARDS */}
        {/* ================================================= */}

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