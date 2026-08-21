"use client";

import { useState } from "react";
import { Product } from "@/types/product";

interface ProductTabsProps {
  product: Product;
}

const tabs = [
  "Description",
  "Benefits",
  "Specifications",
  "Reviews",
];

export default function ProductTabs({
  product,
}: ProductTabsProps) {
  const [active, setActive] = useState("Description");

  return (
    <section className="mt-24">

      {/* Tabs */}

      <div className="flex flex-wrap gap-3 border-b border-[#E8DFD2]">

        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`
              px-6
              py-4
              text-lg
              font-medium
              transition-all
              duration-300

              ${
                active === tab
                  ? "border-b-2 border-[#C79B2A] text-[#C79B2A]"
                  : "text-[#6E665D] hover:text-[#C79B2A]"
              }
            `}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Content */}

      <div className="mt-10 rounded-3xl bg-white p-10 shadow-sm">

        {active === "Description" && (
          <div className="space-y-6">

            <h3 className="heading-font text-3xl">
              Product Description
            </h3>

            <p className="leading-8 text-[#6B645C]">
              {product.description}
            </p>

          </div>
        )}

        {active === "Benefits" && (
          <div>

            <h3 className="heading-font mb-6 text-3xl">
              Benefits
            </h3>

            <ul className="space-y-4 text-[#6B645C]">

              <li>✔ Enhances meditation practice</li>

              <li>✔ Handcrafted by Nepalese artisans</li>

              <li>✔ Genuine natural gemstone beads</li>

              <li>✔ Ideal for daily prayer and mindfulness</li>

              <li>✔ Premium luxury gift packaging</li>

            </ul>

          </div>
        )}

        {active === "Specifications" && (
          <div>

            <h3 className="heading-font mb-6 text-3xl">
              Specifications
            </h3>

            <table className="w-full">

              <tbody>

                <Row
                  label="Material"
                  value={product.material}
                />

                <Row
                  label="Origin"
                  value={product.origin}
                />

                <Row
                  label="Bead Size"
                  value={`${product.beadSize} mm`}
                />

                <Row
                  label="Bead Count"
                  value={`${product.beadCount}`}
                />

                <Row
                  label="Weight"
                  value={`${product.weight} g`}
                />

              </tbody>

            </table>

          </div>
        )}

        {active === "Reviews" && (
          <div>

            <h3 className="heading-font mb-4 text-3xl">
              Customer Reviews
            </h3>

            <p className="text-[#6B645C]">
              ⭐⭐⭐⭐⭐ {product.rating} based on{" "}
              {product.reviews} verified reviews.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}

interface RowProps {
  label: string;
  value: string;
}

function Row({
  label,
  value,
}: RowProps) {
  return (
    <tr className="border-b border-[#EFE8DB]">

      <td className="py-4 text-[#77736F]">
        {label}
      </td>

      <td className="py-4 font-medium text-right">
        {value}
      </td>

    </tr>
  );
}