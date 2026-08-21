"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import Rating from "@/components/ui/Rating";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  return (
    <div className="space-y-3">

      <Link
        href={`/product/${product.slug}`}
        className="
          block
          text-[22px]
          font-semibold
          leading-snug
          text-[#1A1A1A]
          transition
          duration-300
          hover:text-[#C79B2A]
        "
      >
        {product.name}
      </Link>

      <Rating
        rating={product.rating}
        reviews={product.reviews}
      />

      <p className="text-[15px] text-[#666]">
        {product.material}
      </p>

      <p className="text-[14px] text-[#888]">
        {product.beadSize} • {product.beadCount} Beads
      </p>

    </div>
  );
}