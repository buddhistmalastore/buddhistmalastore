import Image from "next/image";
import Link from "next/link";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import {
  featuredStone,
  stones,
} from "@/components/home/Gemstones/stonesData";

interface GemstonePageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface GemstoneDetails {
  benefits: string[];
  chakra: string;
  zodiac: string;
  description: string;
}

const gemstoneDetails: Record<
  string,
  GemstoneDetails
> = {
  Citrine: {
    benefits: [
      "Abundance and prosperity",
      "Confidence and motivation",
      "Creativity and positive energy",
      "Joy and optimism",
    ],
    chakra: "Solar Plexus Chakra",
    zodiac: "Leo • Aries • Gemini",
    description:
      "Citrine is a warm golden gemstone traditionally associated with abundance, confidence, creativity and positive energy. It is often appreciated for its bright and uplifting appearance and symbolic connection with prosperity.",
  },

  "Tiger Eye": {
    benefits: [
      "Courage and confidence",
      "Grounding and stability",
      "Protection symbolism",
      "Focus and determination",
    ],
    chakra: "Solar Plexus Chakra",
    zodiac: "Leo • Capricorn • Gemini",
    description:
      "Tiger Eye is known for its distinctive golden-brown chatoyancy and is traditionally associated with courage, grounding, confidence and protection.",
  },

  Turquoise: {
    benefits: [
      "Peace and calm",
      "Protection symbolism",
      "Communication",
      "Emotional balance",
    ],
    chakra: "Throat Chakra",
    zodiac: "Sagittarius • Pisces • Aquarius",
    description:
      "Turquoise has been treasured across cultures for centuries. Its blue-green color is traditionally associated with peace, protection and spiritual connection.",
  },

  Amethyst: {
    benefits: [
      "Meditation and mindfulness",
      "Calm and relaxation",
      "Spiritual awareness",
      "Wisdom and intuition",
    ],
    chakra: "Crown Chakra",
    zodiac: "Pisces • Aquarius • Virgo",
    description:
      "Amethyst is a purple variety of quartz widely appreciated for meditation, spiritual practices and its calming visual character.",
  },

  "Lapis Lazuli": {
    benefits: [
      "Wisdom and truth",
      "Intuition",
      "Self-expression",
      "Inner reflection",
    ],
    chakra: "Third Eye Chakra",
    zodiac: "Sagittarius • Libra",
    description:
      "Lapis Lazuli is a deep blue stone traditionally associated with wisdom, truth, intuition and spiritual reflection.",
  },

  "Rose Quartz": {
    benefits: [
      "Love and compassion",
      "Emotional warmth",
      "Self-love",
      "Peaceful energy",
    ],
    chakra: "Heart Chakra",
    zodiac: "Taurus • Libra",
    description:
      "Rose Quartz is recognized for its soft pink appearance and is traditionally connected with love, compassion, kindness and emotional harmony.",
  },
};

export default async function GemstonePage({
  params,
}: GemstonePageProps) {
  const { slug } = await params;

  /*
   * Citrine is stored in featuredStone,
   * while the other stones are stored in stones.
   *
   * Combining them ensures every gemstone
   * can be found correctly.
   */
  const allStones = [
    featuredStone,
    ...stones,
  ];

  /*
   * Find gemstone by URL slug.
   */
  const stone = allStones.find(
    (item) =>
      item.name
        .toLowerCase()
        .replace(/\s+/g, "-") ===
      slug.toLowerCase()
  );

  /*
   * Gemstone not found.
   */
  if (!stone) {
    return (
      <>
        <Header />

        <main
          className="
            flex
            min-h-[70vh]
            items-center
            justify-center
            bg-[#FAF8F4]
            px-6
            text-center
          "
        >
          <div className="max-w-xl">

            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[4px]
                text-[#C89A2A]
              "
            >
              Gemstone
            </p>

            <h1
              className="
                heading-font
                mt-5
                text-4xl
                font-semibold
                text-[#1A1A1A]
              "
            >
              Gemstone Not Found
            </h1>

            <p
              className="
                mt-5
                leading-7
                text-[#666666]
              "
            >
              We couldn't find the gemstone you're
              looking for.
            </p>

            <Link
              href="/home"
              className="
                mt-8
                inline-flex
                rounded-full
                bg-[#C89A2A]
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#A77D20]
                hover:shadow-lg
              "
            >
              Back to Home
            </Link>

          </div>
        </main>

        <Footer />
      </>
    );
  }

  /*
   * Correct gemstone image.
   */
  const stoneImage = stone.image;

  /*
   * Featured stone has description,
   * other stones have meaning.
   */
  const meaning =
    "meaning" in stone
      ? stone.meaning
      : stone.description;

  const gemstoneName = stone.name;

  /*
   * Detailed gemstone information.
   */
  const details =
    gemstoneDetails[gemstoneName] ?? {
      benefits: [
        "Traditional spiritual use",
        "Meditation and mindfulness",
        "Personal symbolism",
        "Natural beauty",
      ],
      chakra: "Traditionally associated chakra",
      zodiac: "Varies by tradition",
      description: meaning,
    };

  return (
    <>
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <Header />

      {/* ================================================= */}
      {/* PAGE */}
      {/* ================================================= */}

      <main
        className="
          min-h-screen
          bg-[#FAF8F4]
          text-[#1A1A1A]
        "
      >

        {/* ================================================= */}
        {/* HERO */}
        {/* ================================================= */}

        <section
          className="
            relative
            overflow-hidden
            bg-[#EFE7DA]
            px-6
            py-16
            lg:py-24
          "
        >
          <div className="mx-auto max-w-7xl">

            {/* Breadcrumb */}

            <div
              className="
                mb-10
                flex
                flex-wrap
                items-center
                gap-2
                text-sm
                text-[#776E63]
              "
            >
              <Link
                href="/home"
                className="transition hover:text-[#C89A2A]"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                href="/home#gemstones"
                className="transition hover:text-[#C89A2A]"
              >
                Gemstones
              </Link>

              <span>/</span>

              <span className="text-[#A77D20]">
                {gemstoneName}
              </span>
            </div>

            <div
              className="
                grid
                items-center
                gap-14
                lg:grid-cols-2
              "
            >

              {/* ================================================= */}
              {/* IMAGE */}
              {/* ================================================= */}

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-[32px]
                  bg-[#E5D9C8]
                  shadow-2xl
                "
              >
                <Image
                  src={stoneImage}
                  alt={`${gemstoneName} gemstone`}
                  fill
                  priority
                  sizes="
                    (max-width: 1024px) 100vw,
                    50vw
                  "
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />
              </div>

              {/* ================================================= */}
              {/* INFORMATION */}
              {/* ================================================= */}

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    uppercase
                    tracking-[4px]
                    text-[#B88620]
                  "
                >
                  Himalayan Gemstone
                </p>

                <h1
                  className="
                    heading-font
                    mt-5
                    text-5xl
                    font-semibold
                    leading-tight
                    md:text-6xl
                  "
                >
                  {gemstoneName}
                </h1>

                {/* Divider */}

                <div className="mt-6 flex items-center gap-3">

                  <span className="h-px w-14 bg-[#C89A2A]/50" />

                  <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

                  <span className="h-px w-14 bg-[#C89A2A]/50" />

                </div>

                {/* Meaning */}

                <p
                  className="
                    mt-7
                    text-xl
                    font-medium
                    leading-8
                    text-[#8A691E]
                  "
                >
                  {meaning}
                </p>

                {/* Description */}

                <p
                  className="
                    mt-6
                    max-w-xl
                    text-base
                    leading-8
                    text-[#665F56]
                  "
                >
                  {details.description}
                </p>

                {/* Chakra / Zodiac */}

                <div
                  className="
                    mt-8
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#DCCDB8]
                      bg-white/70
                      p-5
                    "
                  >
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[2px]
                        text-[#9A886F]
                      "
                    >
                      Chakra
                    </p>

                    <p
                      className="
                        mt-2
                        font-semibold
                        text-[#2A2723]
                      "
                    >
                      {details.chakra}
                    </p>
                  </div>

                  <div
                    className="
                      rounded-2xl
                      border
                      border-[#DCCDB8]
                      bg-white/70
                      p-5
                    "
                  >
                    <p
                      className="
                        text-xs
                        font-semibold
                        uppercase
                        tracking-[2px]
                        text-[#9A886F]
                      "
                    >
                      Zodiac
                    </p>

                    <p
                      className="
                        mt-2
                        font-semibold
                        text-[#2A2723]
                      "
                    >
                      {details.zodiac}
                    </p>
                  </div>

                </div>

                {/* Shop Button */}

                <div className="mt-9">

                  <Link
                    href={`/shop?search=${encodeURIComponent(
                      gemstoneName
                    )}`}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      bg-[#C89A2A]
                      px-8
                      py-4
                      text-sm
                      font-semibold
                      text-white
                      shadow-lg
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-[#A77D20]
                      hover:shadow-xl
                    "
                  >
                    Shop {gemstoneName} Products
                  </Link>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* BENEFITS */}
        {/* ================================================= */}

        <section
          className="
            px-6
            py-20
            lg:py-28
          "
        >
          <div className="mx-auto max-w-7xl">

            <div
              className="
                mx-auto
                max-w-3xl
                text-center
              "
            >

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[4px]
                  text-[#C89A2A]
                "
              >
                Discover the Stone
              </p>

              <h2
                className="
                  heading-font
                  mt-4
                  text-4xl
                  font-semibold
                  text-[#1A1A1A]
                  md:text-5xl
                "
              >
                Traditional Benefits
              </h2>

              <p
                className="
                  mt-5
                  text-base
                  leading-8
                  text-[#6B6257]
                "
              >
                Gemstones have been valued for centuries
                for their natural beauty, cultural meaning
                and symbolic associations.
              </p>

            </div>

            {/* Benefit Cards */}

            <div
              className="
                mx-auto
                mt-14
                grid
                max-w-5xl
                gap-6
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >
              {details.benefits.map(
                (benefit, index) => (
                  <div
                    key={benefit}
                    className="
                      rounded-3xl
                      border
                      border-[#E5DCCF]
                      bg-white
                      p-7
                      text-center
                      shadow-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-lg
                    "
                  >

                    <div
                      className="
                        mx-auto
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-[#C89A2A]/10
                        text-sm
                        font-bold
                        text-[#A77D20]
                      "
                    >
                      {index + 1}
                    </div>

                    <h3
                      className="
                        mt-5
                        font-semibold
                        leading-6
                        text-[#2A2723]
                      "
                    >
                      {benefit}
                    </h3>

                  </div>
                )
              )}
            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* HOW TO USE */}
        {/* ================================================= */}

        <section
          className="
            border-y
            border-[#E8DFD2]
            bg-white
            px-6
            py-20
            lg:py-24
          "
        >
          <div
            className="
              mx-auto
              grid
              max-w-7xl
              gap-12
              lg:grid-cols-2
              lg:items-center
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[4px]
                  text-[#C89A2A]
                "
              >
                Bring It Into Your Practice
              </p>

              <h2
                className="
                  heading-font
                  mt-4
                  text-4xl
                  font-semibold
                  md:text-5xl
                "
              >
                How to Use {gemstoneName}
              </h2>

              <p
                className="
                  mt-6
                  leading-8
                  text-[#666666]
                "
              >
                Many people enjoy gemstones as part of
                meditation, mindfulness, personal
                reflection or simply as beautiful
                handcrafted accessories.
              </p>

            </div>

            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
              "
            >

              <div
                className="
                  rounded-2xl
                  bg-[#FAF8F4]
                  p-6
                "
              >
                <h3 className="font-semibold">
                  Meditation
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  Use the gemstone during quiet
                  reflection or meditation.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-[#FAF8F4]
                  p-6
                "
              >
                <h3 className="font-semibold">
                  Wear It
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  Wear a mala or bracelet as a
                  meaningful everyday accessory.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-[#FAF8F4]
                  p-6
                "
              >
                <h3 className="font-semibold">
                  Personal Practice
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  Keep your gemstone close as a
                  personal reminder of your intention.
                </p>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-[#FAF8F4]
                  p-6
                "
              >
                <h3 className="font-semibold">
                  Gifting
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  Give a handcrafted gemstone piece
                  as a meaningful gift.
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* ================================================= */}
        {/* SHOP CTA */}
        {/* ================================================= */}

        <section
          className="
            bg-[#1D1B18]
            px-6
            py-20
            text-white
            lg:py-24
          "
        >
          <div
            className="
              mx-auto
              flex
              max-w-5xl
              flex-col
              items-center
              justify-between
              gap-8
              text-center
              md:flex-row
              md:text-left
            "
          >

            <div>

              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-[#E5C76B]
                "
              >
                Explore Our Collection
              </p>

              <h2
                className="
                  heading-font
                  mt-3
                  text-3xl
                  font-semibold
                  md:text-4xl
                "
              >
                Find Your {gemstoneName}
              </h2>

              <p
                className="
                  mt-4
                  max-w-xl
                  leading-7
                  text-white/65
                "
              >
                Discover handcrafted {gemstoneName}
                malas, bracelets and other gemstone
                creations made by Nepalese artisans.
              </p>

            </div>

            <Link
              href={`/shop?search=${encodeURIComponent(
                gemstoneName
              )}`}
              className="
                shrink-0
                rounded-full
                bg-[#C89A2A]
                px-8
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#D6AE4A]
                hover:shadow-xl
              "
            >
              Shop {gemstoneName}
            </Link>

          </div>
        </section>

      </main>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <Footer />
    </>
  );
}