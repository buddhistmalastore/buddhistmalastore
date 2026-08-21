"use client";

import { useState } from "react";

import {
  FiChevronRight,
  FiChevronDown,
  FiPackage,
  FiStar,
  FiSun,
  FiTruck,
  FiShield,
} from "react-icons/fi";

import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductAccordion({
  product,
}: Props) {
  const [open, setOpen] = useState<number | null>(0);

  const items = [
    {
      icon: <FiPackage size={17} />,
      title: "Product Details",
      content: (
        <SpecGrid product={product} />
      ),
    },
    {
      icon: <FiStar size={17} />,
      title: "Healing Properties",
      content: (
        <div className="space-y-3 text-[14px] leading-7 text-[#666]">
          <p>
            Tiger Eye promotes confidence,
            courage, protection and prosperity.
          </p>

          <ul className="space-y-2">
            <li>• Boosts confidence</li>
            <li>• Improves focus</li>
            <li>• Protects against negative energy</li>
            <li>• Encourages prosperity</li>
          </ul>
        </div>
      ),
    },
    {
      icon: <FiSun size={17} />,
      title: "Chakra & Zodiac",
      content: (
        <div className="space-y-4">

          <Row
            title="Chakra"
            value={product.chakra}
          />

          <Row
            title="Element"
            value={product.element}
          />

          <Row
            title="Zodiac"
            value={product.zodiac?.join(", ")}
          />

        </div>
      ),
    },
    {
      icon: <FiTruck size={17} />,
      title: "Shipping & Returns",
      content: (
        <div className="space-y-3 text-[14px] leading-7 text-[#666]">
          <p>
            ✔ Free Shipping inside Nepal.
          </p>

          <p>
            ✔ Worldwide Delivery Available.
          </p>

          <p>
            ✔ Secure Premium Packaging.
          </p>

          <p>
            ✔ Easy Return Policy.
          </p>
        </div>
      ),
    },
    {
      icon: <FiShield size={17} />,
      title: "Care Guide",
      content: (
        <div className="space-y-3 text-[14px] leading-7 text-[#666]">

          <p>
            • Avoid chemicals.
          </p>

          <p>
            • Clean with soft cloth.
          </p>

          <p>
            • Store in dry place.
          </p>

          <p>
            • Energize under moonlight.
          </p>

        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">

      {items.map((item, index) => {

        const active = open === index;

        return (
          <div
            key={index}
            className="
              overflow-hidden
              rounded-2xl
              border
              border-[#ECE3D3]
              bg-white
            "
          >

            <button
              onClick={() =>
                setOpen(
                  active ? null : index
                )
              }
              className="
                flex
                w-full
                items-center
                justify-between
                px-6
                py-5
              "
            >

              <div className="flex items-center gap-3">

                <span className="text-[#C79B2A]">
                  {item.icon}
                </span>

                <span
                  className="
                    flex
                    items-center
                    gap-2

                    text-[15px]
                    font-semibold
                  "
                >
                  {active ? (
                    <FiChevronDown size={15} />
                  ) : (
                    <FiChevronRight size={15} />
                  )}

                  {item.title}
                </span>

              </div>

            </button>

            {active && (
              <div
                className="
                  border-t
                  border-[#ECE3D3]
                  px-6
                  py-6
                "
              >
                {item.content}
              </div>
            )}

          </div>
        );

      })}

    </div>
  );
}

function SpecGrid({
  product,
}: {
  product: Product;
}) {
  return (
    <div className="space-y-4">

      <Row
        title="SKU"
        value={product.sku}
      />

      <Row
        title="Material"
        value={product.material}
      />

      <Row
        title="Gemstone"
        value={product.gemstone}
      />

      <Row
        title="Origin"
        value={product.origin}
      />

      <Row
        title="Bead Size"
        value={product.beadSize}
      />

      <Row
        title="Weight"
        value={product.weight}
      />

      <Row
        title="Bead Count"
        value={String(product.beadCount)}
      />

    </div>
  );
}

function Row({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (
    <div className="flex justify-between border-b border-[#F2ECE2] pb-3">

      <span className="text-[#777]">
        {title}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}