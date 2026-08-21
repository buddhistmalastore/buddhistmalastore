"use client";

import { purposeData } from "./purposeData";
import PurposeCard from "./PurposeCard";

export default function Purpose() {
  return (
    <section className="relative overflow-hidden bg-[#F7F1E7] px-6 py-24 lg:py-32">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A72C]/[0.035] blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C89A2A]/10" />

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#C89A2A]/10" />

        <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C89A2A]/10" />
      </div>

      <div className="relative mx-auto max-w-[1250px]">
        {/* Section Heading */}

        <div className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[5px] text-[#B88620]">
            Discover Your Journey
          </p>

          <h2 className="heading-font mt-4 text-4xl font-semibold leading-tight text-[#1A1A1A] md:text-5xl lg:text-6xl">
            Find Your Intention
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#6F685F] md:text-lg">
            Choose a sacred purpose and discover the malas created to
            accompany your journey.
          </p>

          {/* Decorative Divider */}

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-14 bg-[#C89A2A]/40" />
          </div>
        </div>

        {/* Sacred Intention Arrangement */}

        <div className="relative mx-auto h-[780px] w-full max-w-[950px] md:h-[850px]">
          {/* Outer Sacred Circle */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C89A2A]/10" />

          {/* Inner Sacred Circle */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C89A2A]/10" />

          {/* Dharma Wheel Center */}

          <div
            className="
              group
              absolute
              left-1/2
              top-1/2
              z-30
              flex
              h-[220px]
              w-[220px]
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-[#C89A2A]/35
              bg-[#FBF7F0]
              shadow-[0_20px_65px_rgba(80,60,30,0.15)]
            "
          >
            {/* Inner Ring */}

            <div
              className="
                pointer-events-none
                absolute
                inset-3
                rounded-full
                border
                border-[#C89A2A]/15
              "
            />

            {/* Second Inner Ring */}

            <div
              className="
                pointer-events-none
                absolute
                inset-7
                rounded-full
                border
                border-[#C89A2A]/10
              "
            />

            {/* Dharma Wheel */}

            <img
              src="/images/home/dharma-wheel.png"
              alt="Dharma Wheel"
              className="
                relative
                z-10
                h-[185px]
                w-[185px]
                object-contain
                drop-shadow-[0_10px_18px_rgba(120,75,10,0.25)]
                transition-all
                duration-700
                ease-out
                group-hover:scale-105
                group-hover:drop-shadow-[0_14px_28px_rgba(184,134,32,0.40)]
              "
            />

            {/* Center Label */}

            <div
              className="
                absolute
                -bottom-7
                left-1/2
                z-20
                -translate-x-1/2
                whitespace-nowrap
                rounded-full
                border
                border-[#C89A2A]/35
                bg-[#FBF7F0]
                px-5
                py-2
                text-[11px]
                font-semibold
                uppercase
                tracking-[2px]
                text-[#8F691A]
                shadow-[0_5px_20px_rgba(80,60,30,0.10)]
              "
            >
              Your Intention
            </div>
          </div>

          {/* Purpose Cards */}

          {purposeData.map((item, index) => (
            <PurposeCard
              key={item.title}
              {...item}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}