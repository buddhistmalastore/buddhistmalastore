"use client";

import { Product } from "@/types/product";
import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  product: Product;
}

export default function ProductPrice({
  product,
}: Props) {
  const { formatPrice } = useCurrency();

  const hasDiscount =
    product.oldPrice !== undefined &&
    product.oldPrice !== null &&
    product.oldPrice > product.price;

  return (
    <div>
      {/* Price */}

      <div className="flex items-end gap-4">

        {/* Current Price */}

        <div
          className="
            text-[42px]
            font-bold
            leading-none
            text-[#1A1A1A]
          "
        >
          {formatPrice(product.price)}
        </div>

        {/* Old Price + Discount */}

        {hasDiscount && (
          <div className="pb-1">

            <div
              className="
                text-sm
                text-[#999]
                line-through
              "
            >
              {formatPrice(product.oldPrice!)}
            </div>

            <div
              className="
                mt-1
                inline-flex
                rounded-full
                bg-[#C89A2A]
                px-3
                py-1
                text-[11px]
                font-semibold
                uppercase
                tracking-wide
                text-white
              "
            >
              Save {product.discount}%
            </div>

          </div>
        )}

      </div>

      {/* Short Description */}

      <p
        className="
          mt-5
          border-l-4
          border-[#C89A2A]
          pl-4
          text-[15px]
          leading-7
          text-[#666]
        "
      >
        {product.shortDescription}
      </p>
    </div>
  );
}