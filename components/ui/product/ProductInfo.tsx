"use client";

import { Product } from "@/types/product";

import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  return (
    <div className="flex flex-1 flex-col p-4">

      {/* Product Name */}

      <h3
        className="
          heading-font
          text-[21px]
          leading-snug
          text-[#1F1A17]
          transition-colors
          duration-300
          group-hover:text-[#C79B2A]
        "
      >
        {product.name}
      </h3>

      {/* Rating */}

      <div className="mt-2">
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Product Meta */}

      <div
        className="
          mt-3
          flex
          flex-wrap
          gap-2
        "
      >
        <span
          className="
            rounded-full
            bg-[#F7F3EC]
            px-3
            py-1
            text-xs
            font-medium
            text-[#6A5A2B]
          "
        >
          {product.material}
        </span>

        <span
          className="
            rounded-full
            bg-[#F7F3EC]
            px-3
            py-1
            text-xs
            font-medium
            text-[#6A5A2B]
          "
        >
          {product.beadCount} Beads
        </span>

        <span
          className="
            rounded-full
            bg-[#F7F3EC]
            px-3
            py-1
            text-xs
            font-medium
            text-[#6A5A2B]
          "
        >
          {product.beadSize} mm
        </span>
      </div>

      {/* Price */}

      <div className="mt-4">
        <ProductPrice
          price={product.price}
          salePrice={product.salePrice}
        />
      </div>

      {/* Spacer */}

      <div className="flex-1" />

      {/* Buttons */}

      <div className="mt-4">
        <ProductActions
          inStock={product.inStock}
        />
      </div>

    </div>
  );
}