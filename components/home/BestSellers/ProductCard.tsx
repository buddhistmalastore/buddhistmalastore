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
        rounded-2xl
        border
        border-[#E8DFD2]
        bg-white
        shadow-[0_8px_30px_rgba(40,30,20,0.06)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#C89A2A]/40
        hover:shadow-[0_18px_45px_rgba(40,30,20,0.12)]
      "
    >
      {/* ================================================= */}
      {/* IMAGE AREA */}
      {/* ================================================= */}

      <div
        className="
          relative
          aspect-[4/5]
          overflow-hidden
          bg-[#F3EEE6]
        "
      >
        {/* Product Badge */}

        <ProductBadge badge={product.badge} />

        {/* Wishlist */}

        <WishlistButton />

        {/* Product Image */}

        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="
            (max-width: 639px) 100vw,
            (max-width: 1279px) 50vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-[1.04]
          "
        />

        {/* Quick View */}

        <QuickViewButton />
      </div>

      {/* ================================================= */}
      {/* PRODUCT INFORMATION */}
      {/* ================================================= */}

      <div className="p-6">

        {/* Rating */}

        <ProductRating rating={product.rating} />

        {/* Product Name */}

        <h3
          className="
            heading-font
            mt-3
            text-xl
            font-semibold
            leading-tight
            text-[#1A1A1A]
          "
        >
          {product.name}
        </h3>

        {/* Price */}

        <p
          className="
            mt-4
            text-2xl
            font-bold
            text-[#C89A2A]
          "
        >
          {product.price}
        </p>

      </div>
    </div>
  );
}