"use client";

import Link from "next/link";

import {
  GiPrayerBeads,
  GiCrystalBall,
} from "react-icons/gi";

import { FaGem } from "react-icons/fa";

import { PiBeltFill } from "react-icons/pi";

import { TbBowl } from "react-icons/tb";

import { FiGrid } from "react-icons/fi";

interface CategoryPillsProps {
  categories: string[];
}

/* =========================================================
   CATEGORY ICON
========================================================= */

function getCategoryIcon(
  category: string
) {
  const normalized =
    category
      .trim()
      .toLowerCase();

  /* -------------------------------------------------------
     GEMSTONE
  ------------------------------------------------------- */

  if (
    normalized ===
    "gemstone"
  ) {
    return <FaGem />;
  }

  /* -------------------------------------------------------
     RUDRAKSHA
  ------------------------------------------------------- */

  if (
    normalized ===
    "rudraksha"
  ) {
    return <GiPrayerBeads />;
  }

  /* -------------------------------------------------------
     BRACELETS
  ------------------------------------------------------- */

  if (
    normalized ===
      "bracelet" ||
    normalized ===
      "bracelets"
  ) {
    return <PiBeltFill />;
  }

  /* -------------------------------------------------------
     CRYSTAL
  ------------------------------------------------------- */

  if (
    normalized ===
      "crystal" ||
    normalized ===
      "crystals"
  ) {
    return <GiCrystalBall />;
  }

  /* -------------------------------------------------------
     SINGING BOWL
  ------------------------------------------------------- */

  if (
    normalized ===
      "singing bowl" ||
    normalized.includes(
      "singing bowl"
    )
  ) {
    return <TbBowl />;
  }

  /* -------------------------------------------------------
     DEFAULT
     
     New WooCommerce categories automatically get
     a generic shop icon.
  ------------------------------------------------------- */

  return <FiGrid />;
}

/* =========================================================
   CATEGORY PILLS
========================================================= */

export default function CategoryPills({
  categories,
}: CategoryPillsProps) {
  return (
    <section className="mt-14">
      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="text-center">
        <p
          className="
            mb-2
            text-sm
            font-semibold
            uppercase
            tracking-[4px]
            text-[#C79B2A]
          "
        >
          Browse Collections
        </p>

        <h2
          className="
            heading-font
            text-4xl
            text-[#1A1A1A]
          "
        >
          Shop by Category
        </h2>
      </div>

      {/* =====================================================
          CATEGORIES
      ===================================================== */}

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
        {/* =================================================
            ALL
        ================================================= */}

        <Link
          href="/shop#products"
          className="
            flex
            shrink-0
            items-center
            gap-3
            whitespace-nowrap
            rounded-full
            border
            border-[#E8DFD2]
            bg-white
            px-7
            py-4
            text-[#555]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-[#C79B2A]
            hover:text-[#C79B2A]
            hover:shadow-md
          "
        >
          <span className="text-xl">
            <GiPrayerBeads />
          </span>

          <span className="font-medium">
            All
          </span>
        </Link>

        {/* =================================================
            WOOCOMMERCE CATEGORIES
        ================================================= */}

        {categories.map(
          (category) => (
            <Link
              key={category}
              href={`/shop?category=${encodeURIComponent(
                category
              )}#products`}
              className="
                flex
                shrink-0
                items-center
                gap-3
                whitespace-nowrap
                rounded-full
                border
                border-[#E8DFD2]
                bg-white
                px-7
                py-4
                text-[#555]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#C79B2A]
                hover:text-[#C79B2A]
                hover:shadow-md
              "
            >
              <span className="text-xl">
                {getCategoryIcon(
                  category
                )}
              </span>

              <span className="font-medium">
                {category}
              </span>
            </Link>
          )
        )}
      </div>
    </section>
  );
}