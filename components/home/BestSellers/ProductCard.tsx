"use client";

import Image from "next/image";
import ProductBadge from "./ProductBadge";
import ProductRating from "./ProductRating";
import WishlistButton from "./WishlistButton";
import QuickViewButton from "./QuickViewButton";

interface Props {
  product: any;
}

export default function ProductCard({ product }: Props) {
  return (
    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      border
      border-[#D4AF37]/15
      bg-[#111]
      transition-all
      duration-500
      hover:-translate-y-3
      hover:border-[#D4AF37]/50
      hover:shadow-[0_0_50px_rgba(212,175,55,.2)]
    "
    >
      <div className="relative aspect-square overflow-hidden">

        <ProductBadge badge={product.badge} />

        <WishlistButton />

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        <QuickViewButton />

      </div>

      <div className="p-6">

        <ProductRating rating={product.rating} />

        <h3 className="heading-font mt-4 text-xl text-[#F7F3EC]">
          {product.name}
        </h3>

        <p className="mt-4 text-2xl font-semibold text-[#D4AF37]">
          {product.price}
        </p>

      </div>

    </div>
  );
}