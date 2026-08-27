import Link from "next/link";
import Image from "next/image";

import { stones } from "@/components/home/Gemstones/stonesData";

export default function GemstonesPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A]">

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-[#F3EEE6] px-6 py-24 lg:py-32">

        <div className="absolute inset-0 pointer-events-none">
          <div
            className="
              absolute
              left-1/2
              top-0
              h-[500px]
              w-[700px]
              -translate-x-1/2
              rounded-full
              bg-[#C89A2A]/[0.06]
              blur-3xl
            "
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">

          <p
            className="
              text-[11px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-[#B88620]
            "
          >
            Gemstone Knowledge Center
          </p>

          <h1
            className="
              heading-font
              mt-6
              text-5xl
              font-semibold
              leading-tight
              text-[#1A1A1A]
              md:text-6xl
              lg:text-7xl
            "
          >
            Discover the World of Gemstones
          </h1>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-16 bg-[#C89A2A]/40" />
          </div>

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-[#6B6257]
              md:text-lg
            "
          >
            Explore the traditional meanings, spiritual associations,
            cultural stories, care guidance and uses of gemstones
            found in our handcrafted malas and bracelets.
          </p>

        </div>
      </section>

      {/* ================================================= */}
      {/* INTRO */}
      {/* ================================================= */}

      <section className="px-6 py-20 lg:py-24">

        <div className="mx-auto max-w-3xl text-center">

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[3px]
              text-[#C89A2A]
            "
          >
            Himalayan Gemstones
          </p>

          <h2
            className="
              heading-font
              mt-4
              text-3xl
              font-semibold
              md:text-4xl
            "
          >
            Learn Before You Choose
          </h2>

          <p
            className="
              mt-6
              text-base
              leading-8
              text-[#6B6257]
            "
          >
            Every gemstone has its own appearance, history and
            traditional associations. Explore our guides to learn
            more about each stone and discover which gemstones
            resonate with your personal practice and style.
          </p>

        </div>

      </section>

      {/* ================================================= */}
      {/* GEMSTONE GRID */}
      {/* ================================================= */}

      <section className="px-6 pb-24 lg:pb-32">

        <div
          className="
            mx-auto
            grid
            max-w-7xl
            gap-8
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >

          {stones.map((stone) => (
            <Link
              key={stone.name}
              href={stone.href}
              className="
                group
                overflow-hidden
                rounded-[24px]
                border
                border-[#E5DCCF]
                bg-white
                shadow-[0_10px_35px_rgba(40,30,20,0.06)]
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-[#C89A2A]/50
                hover:shadow-[0_20px_50px_rgba(40,30,20,0.12)]
              "
            >

              {/* Image */}

              <div className="relative aspect-[4/3] overflow-hidden">

                <Image
                  src={stone.image}
                  alt={stone.name}
                  fill
                  sizes="
                    (max-width: 639px) 100vw,
                    (max-width: 1023px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/45
                    via-transparent
                    to-transparent
                  "
                />

                <div className="absolute bottom-5 left-5 right-5">

                  <h3
                    className="
                      heading-font
                      text-3xl
                      font-semibold
                      text-white
                    "
                  >
                    {stone.name}
                  </h3>

                </div>

              </div>

              {/* Content */}

              <div className="p-7">

                <p
                  className="
                    text-sm
                    font-medium
                    tracking-wide
                    text-[#8F691A]
                  "
                >
                  {stone.meaning}
                </p>

                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    text-sm
                    font-semibold
                    text-[#A77D20]
                    transition-all
                    duration-300
                    group-hover:gap-3
                  "
                >
                  Explore {stone.name}

                  <span className="ml-2">
                    →
                  </span>
                </div>

              </div>

            </Link>
          ))}

        </div>

      </section>

      {/* ================================================= */}
      {/* NOTE */}
      {/* ================================================= */}

      <section className="border-t border-[#E5DCCF] bg-[#F3EEE6] px-6 py-16">

        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs leading-6 text-[#7B7166]">
            Gemstone meanings and spiritual properties described
            throughout our guides are based on traditional beliefs,
            cultural associations and commonly attributed practices.
            They are not intended as medical or scientific claims.
          </p>

        </div>

      </section>

    </main>
  );
}