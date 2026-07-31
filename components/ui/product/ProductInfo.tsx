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
    <div className="flex flex-col p-5">

      {/* Product Name */}

      <h3
        className="
          heading-font
          text-[24px]
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

      <div className="mt-3">
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      </div>

      {/* Short Description */}

      <p
        className="
          mt-4
          text-[15px]
          leading-7
          text-[#6E665D]
        "
      >
        {product.shortDescription}
      </p>

      {/* Product Meta */}

      <div
        className="
          mt-4
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

      <div className="mt-6">
        <ProductPrice
          price={product.price}
          salePrice={product.salePrice}
        />
      </div>

      {/* Buttons */}

      <ProductActions
        inStock={product.inStock}
      />

    </div>
  );
}