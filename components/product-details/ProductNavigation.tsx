"use client";

import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";

import { Product } from "@/types/product";

interface Props {
  previous?: Product;
  next?: Product;
}

export default function ProductNavigation({
  previous,
  next,
}: Props) {
  return (
    <section
      className="
        mb-8

        flex
        items-center
        justify-between

        border-b
        border-[#ECE3D3]

        pb-6
      "
    >
      {/* Previous */}

      {previous ? (
        <Link
          href={`/product/${previous.slug}`}
          className="
            group

            flex
            items-center
            gap-4
          "
        >
          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-full

              border
              border-[#E5DAC8]

              bg-white

              transition-all
              duration-300

              group-hover:border-[#C79B2A]
              group-hover:bg-[#C79B2A]
              group-hover:text-white
            "
          >
            <FiArrowLeft size={18} />
          </div>

          <div>

            <div
              className="
                text-[11px]

                uppercase

                tracking-[2px]

                text-[#999]
              "
            >
              Previous Product
            </div>

            <div
              className="
                mt-1

                text-[14px]

                font-medium

                text-[#1A1A1A]

                transition

                group-hover:text-[#C79B2A]
              "
            >
              {previous.shortName}
            </div>

          </div>

        </Link>
      ) : (
        <div />
      )}

      {/* Next */}

      {next ? (
        <Link
          href={`/product/${next.slug}`}
          className="
            group

            flex
            items-center
            gap-4
          "
        >
          <div className="text-right">

            <div
              className="
                text-[11px]

                uppercase

                tracking-[2px]

                text-[#999]
              "
            >
              Next Product
            </div>

            <div
              className="
                mt-1

                text-[14px]

                font-medium

                text-[#1A1A1A]

                transition

                group-hover:text-[#C79B2A]
              "
            >
              {next.shortName}
            </div>

          </div>

          <div
            className="
              flex
              h-12
              w-12

              items-center
              justify-center

              rounded-full

              border
              border-[#E5DAC8]

              bg-white

              transition-all
              duration-300

              group-hover:border-[#C79B2A]
              group-hover:bg-[#C79B2A]
              group-hover:text-white
            "
          >
            <FiArrowRight size={18} />
          </div>

        </Link>
      ) : (
        <div />
      )}

    </section>
  );
}