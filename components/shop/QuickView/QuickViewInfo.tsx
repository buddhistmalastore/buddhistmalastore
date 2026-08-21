"use client";

import { Product } from "@/types/product";
import { FiStar } from "react-icons/fi";

interface QuickViewInfoProps {
  product: Product;
}

export default function QuickViewInfo({
  product,
}: QuickViewInfoProps) {
  return (
    <div className="space-y-6">

      {/* Badge */}

      {product.badge && (
        <span
          className="
            inline-flex
            rounded-full
            bg-[#C79B2A]/10
            px-4
            py-2
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-[#C79B2A]
          "
        >
          {product.badge}
        </span>
      )}

      {/* Title */}

      <h2
        className="
          heading-font
          text-4xl
          leading-tight
          text-[#1A1A1A]
        "
      >
        {product.name}
      </h2>

      {/* Rating */}

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-1 text-[#C79B2A]">
          {Array.from({ length: 5 }).map((_, index) => (
            <FiStar
              key={index}
              size={18}
              className={
                index < Math.round(product.rating)
                  ? "fill-[#C79B2A]"
                  : ""
              }
            />
          ))}
        </div>

        <span className="font-semibold">
          {product.rating}
        </span>

        <span className="text-gray-500">
          ({product.reviews} Reviews)
        </span>

      </div>

      {/* Details */}

      <div className="grid grid-cols-2 gap-4 rounded-2xl bg-[#FAF8F4] p-5">

        <InfoItem
          label="Material"
          value={product.material}
        />

        <InfoItem
          label="Gemstone"
          value={product.gemstone}
        />

        <InfoItem
          label="Origin"
          value={product.origin}
        />

        <InfoItem
          label="Bead Size"
          value={product.beadSize}
        />

        <InfoItem
          label="Beads"
          value={String(product.beadCount)}
        />

        <InfoItem
          label="Collection"
          value={product.collection}
        />

      </div>

      {/* Purpose */}

      <div>

        <h4
          className="
            mb-3
            text-sm
            font-semibold
            uppercase
            tracking-wider
            text-[#666]
          "
        >
          Spiritual Benefits
        </h4>

        <div className="flex flex-wrap gap-3">

          {product.purpose.map((purpose) => (
            <span
              key={purpose}
              className="
                rounded-full
                border
                border-[#E8DFD2]
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-[#666]
              "
            >
              {purpose}
            </span>
          ))}

        </div>

      </div>

      {/* Description */}

      <p
        className="
          leading-8
          text-[#666]
        "
      >
        {product.shortDescription}
      </p>

    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({
  label,
  value,
}: InfoItemProps) {
  return (
    <div>

      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 font-semibold text-[#1A1A1A]">
        {value}
      </p>

    </div>
  );
}