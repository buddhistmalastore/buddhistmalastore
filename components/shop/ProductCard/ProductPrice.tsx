"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  discount?: number;
}

export default function ProductPrice({
  price,
  oldPrice,
  discount,
}: ProductPriceProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="mt-2 flex items-center gap-3">

      {/* Current Price */}

      <span className="text-2xl font-bold tracking-tight text-[#1A1A1A]">
        {formatPrice(price)}
      </span>

      {/* Old Price */}

      {oldPrice !== undefined &&
        oldPrice !== null && (
          <span className="text-lg text-gray-400 line-through">
            {formatPrice(oldPrice)}
          </span>
        )}

      {/* Discount */}

      {discount !== undefined &&
        discount !== null && (
          <span
            className="
              rounded-full
              bg-red-100
              px-3
              py-1
              text-xs
              font-semibold
              text-red-600
            "
          >
            -{discount}%
          </span>
        )}

    </div>
  );
}