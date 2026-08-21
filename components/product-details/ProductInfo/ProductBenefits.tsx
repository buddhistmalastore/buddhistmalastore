"use client";

import { Product } from "@/types/product";
import {
  FiGlobe,
  FiShield,
  FiGift,
  FiTruck,
  FiHeart,
  FiCheckCircle,
} from "react-icons/fi";

interface ProductBenefitsProps {
  product: Product;
}

export default function ProductBenefits({
  product,
}: ProductBenefitsProps) {
  return (
    <section
      className="
        mt-8
        overflow-hidden
        rounded-[18px]
        border
        border-[#E9E0D2]
        bg-white
      "
    >
      {/* Heading */}

      <div
        className="
          border-b
          border-[#ECE3D3]
          bg-[#FBFAF7]
          px-6
          py-4
        "
      >
        <h3
          className="
            font-[var(--font-heading)]
            text-[24px]
            font-medium
            text-[#1A1A1A]
          "
        >
          Why You'll Love It
        </h3>
      </div>

      <div className="p-6">

        <div className="space-y-5">

          <Benefit
            icon={<FiHeart />}
            title="Authentic Gemstones"
            text="Every mala is made using carefully selected natural stones with unique spiritual energy."
          />

          <Benefit
            icon={<FiGift />}
            title="Handcrafted in Nepal"
            text="Lovingly handcrafted by experienced Nepalese artisans using traditional craftsmanship."
          />

          <Benefit
            icon={<FiTruck />}
            title="Worldwide Shipping"
            text="Fast and secure international delivery with reliable courier partners."
          />

          <Benefit
            icon={<FiShield />}
            title="Secure Checkout"
            text="Safe online payments protected with SSL encryption."
          />

          <Benefit
            icon={<FiGlobe />}
            title="Spiritual Quality"
            text="Suitable for meditation, healing, yoga practice and everyday spiritual use."
          />

        </div>

        {/* Bottom Box */}

        <div
          className="
            mt-8
            rounded-xl
            bg-[#FBFAF7]
            p-5
          "
        >
          <div className="flex items-start gap-3">

            <FiCheckCircle
              className="
                mt-1
                text-[#C79B2A]
              "
            />

            <div>

              <h4
                className="
                  font-medium
                  text-[#1A1A1A]
                "
              >
                Handmade with Blessings
              </h4>

              <p
                className="
                  mt-2
                  text-[14px]
                  leading-7
                  text-[#666]
                "
              >
                Every mala is individually inspected before shipping,
                ensuring premium quality and authentic craftsmanship
                worthy of your spiritual journey.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

function Benefit({
  icon,
  title,
  text,
}: BenefitProps) {
  return (
    <div className="flex gap-4">

      <div
        className="
          flex
          h-11
          w-11
          flex-shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#F6F1E7]
          text-[#C79B2A]
        "
      >
        {icon}
      </div>

      <div>

        <h4
          className="
            text-[15px]
            font-semibold
            text-[#1A1A1A]
          "
        >
          {title}
        </h4>

        <p
          className="
            mt-1
            text-[14px]
            leading-7
            text-[#666]
          "
        >
          {text}
        </p>

      </div>

    </div>
  );
}