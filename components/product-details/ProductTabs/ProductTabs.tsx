"use client";

import { useState } from "react";

import { Product } from "@/types/product";

import Reviews from "../Reviews/Reviews";
import ShippingReturns from "../ShippingReturns/ShippingReturns";
import FAQ from "../FAQ/FAQ";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";

interface Props {
  product: Product;
}

const tabs = [
  "Description",
  "Healing Benefits",
  "Reviews",
  "Shipping & Returns",
  "FAQ",
  "Why Choose Us",
];

export default function ProductTabs({
  product,
}: Props) {
  const [active, setActive] = useState(0);

  return (
    <section className="mt-24">
      {/* Tabs */}

      <div className="border-b border-[#E8DDCC]">
        <div className="flex gap-6 overflow-x-auto lg:gap-10">

          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(index)}
              className={`
                relative
                whitespace-nowrap
                pb-4
                text-[15px]
                font-medium
                transition-all
                duration-300

                ${
                  active === index
                    ? "text-[#C89A2A]"
                    : "text-[#666] hover:text-[#C89A2A]"
                }
              `}
            >
              {tab}

              {active === index && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-full
                    rounded
                    bg-[#C89A2A]
                  "
                />
              )}
            </button>
          ))}

        </div>
      </div>

      {/* Content */}

      <div className="py-10">

        {/* DESCRIPTION */}

        {active === 0 && (
          <div className="max-w-5xl space-y-6">

            <h2 className="text-2xl font-semibold text-[#1A1A1A]">
              {product.name}
            </h2>

            <div
              className="
                whitespace-pre-line
                text-[15px]
                leading-8
                text-[#666]
              "
            >
              {product.description}
            </div>

            <div
              className="
                rounded-xl
                border
                border-[#ECE3D3]
                bg-[#FCFBF8]
                p-6
                text-[15px]
                leading-8
                text-[#666]
              "
            >
              Every mala is handcrafted in Nepal using
              carefully selected natural materials and
              traditional Nepalese craftsmanship.
            </div>

          </div>
        )}

        {/* HEALING BENEFITS */}

        {active === 1 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

            {[
              "Protection",
              "Confidence",
              "Prosperity",
              "Grounding",
              "Positive Energy",
              "Solar Plexus Chakra",
            ].map((item) => (
              <div
                key={item}
                className="
                  rounded-xl
                  border
                  border-[#ECE3D3]
                  bg-[#FCFBF8]
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-md
                "
              >
                <span className="font-medium text-[#333]">
                  💎 {item}
                </span>
              </div>
            ))}

          </div>
        )}

        {/* REVIEWS */}

        {active === 2 && (
          <Reviews product={product} />
        )}

        {/* SHIPPING & RETURNS */}

        {active === 3 && (
          <ShippingReturns />
        )}

        {/* FAQ */}

        {active === 4 && (
          <FAQ />
        )}

        {/* WHY CHOOSE US */}

        {active === 5 && (
          <WhyChooseUs />
        )}

      </div>
    </section>
  );
}