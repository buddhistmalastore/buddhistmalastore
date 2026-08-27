"use client";

import { purposeData } from "./purposeData";
import PurposeCard from "./PurposeCard";

export default function Purpose() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#F7F1E7]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:py-32
      "
    >
      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#D4A72C]/[0.035]
            blur-3xl
            sm:h-[700px]
            sm:w-[700px]
          "
        />

        {/* Desktop circles only */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            h-[620px]
            w-[620px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#C89A2A]/10
            lg:block
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-dashed
            border-[#C89A2A]/10
            lg:block
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            h-[380px]
            w-[380px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#C89A2A]/10
            lg:block
          "
        />

      </div>

      <div className="relative mx-auto max-w-[1250px]">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            mx-auto
            mb-12
            max-w-3xl
            text-center
            sm:mb-16
          "
        >

          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[3px]
              text-[#B88620]
              sm:text-sm
              sm:tracking-[5px]
            "
          >
            Discover Your Journey
          </p>

          <h2
            className="
              heading-font
              mt-4
              text-[38px]
              font-semibold
              leading-[1.05]
              text-[#1A1A1A]
              sm:mt-5
              sm:text-5xl
              lg:text-6xl
            "
          >
            Find Your Intention
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#6F685F]
              sm:mt-6
              sm:text-base
              sm:leading-8
              md:text-lg
            "
          >
            Choose a sacred purpose and discover the malas created
            to accompany your journey.
          </p>

          {/* Divider */}

          <div
            className="
              mx-auto
              mt-7
              flex
              items-center
              justify-center
              gap-3
              sm:mt-8
            "
          >
            <span className="h-px w-10 bg-[#C89A2A]/40 sm:w-14" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-10 bg-[#C89A2A]/40 sm:w-14" />
          </div>

        </div>

        {/* ================================================= */}
        {/* MOBILE / TABLET */}
        {/* ================================================= */}

        <div className="lg:hidden">

          {/* Dharma Wheel */}

          <div
            className="
              relative
              mx-auto
              mb-12
              flex
              h-[190px]
              w-[190px]
              items-center
              justify-center
              sm:mb-14
              sm:h-[220px]
              sm:w-[220px]
            "
          >

            {/* Outer circle */}

            <div
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#C89A2A]/30
                bg-[#FBF7F0]
                shadow-[0_20px_65px_rgba(80,60,30,0.12)]
              "
            />

            {/* Inner circle */}

            <div
              className="
                absolute
                inset-3
                rounded-full
                border
                border-[#C89A2A]/15
              "
            />

            <div
              className="
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
                h-[145px]
                w-[145px]
                object-contain
                drop-shadow-[0_10px_18px_rgba(120,75,10,0.25)]
                sm:h-[175px]
                sm:w-[175px]
              "
            />

            {/* Label */}

            <div
              className="
                absolute
                -bottom-5
                left-1/2
                z-20
                -translate-x-1/2
                whitespace-nowrap
                rounded-full
                border
                border-[#C89A2A]/35
                bg-[#FBF7F0]
                px-4
                py-1.5
                text-[9px]
                font-semibold
                uppercase
                tracking-[1.8px]
                text-[#8F691A]
                shadow-[0_5px_20px_rgba(80,60,30,0.10)]
              "
            >
              Your Intention
            </div>

          </div>

          {/* ================================================= */}
          {/* MOBILE PURPOSE GRID */}
          {/* ================================================= */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              sm:gap-5
            "
          >
            {purposeData.map((item, index) => (
              <PurposeCard
                key={item.title}
                {...item}
                index={index}
              />
            ))}
          </div>

        </div>

        {/* ================================================= */}
        {/* DESKTOP */}
        {/* ================================================= */}

        <div
          className="
            relative
            mx-auto
            hidden
            h-[850px]
            w-full
            max-w-[950px]
            lg:block
          "
        >

          {/* Outer Sacred Circle */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[650px]
              w-[650px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#C89A2A]/10
            "
          />

          {/* Inner Sacred Circle */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#C89A2A]/10
            "
          />

          {/* ================================================= */}
          {/* DHARMA WHEEL */}
          {/* ================================================= */}

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
              "
            />

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
              "
            >
              Your Intention
            </div>

          </div>

          {/* Desktop Cards */}

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