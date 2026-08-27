"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import ProductBadge from "./ProductBadge";
import ProductRating from "./ProductRating";
import WishlistButton from "./WishlistButton";
import QuickViewButton from "./QuickViewButton";

import { Product } from "@/types/product";
import { useCurrency } from "@/context/CurrencyContext";

import { QuickViewModal } from "@/components/shop/QuickView";

interface Props {
  product: Product;
}

export default function ProductCard({
  product,
}: Props) {
  const [quickViewOpen, setQuickViewOpen] =
    useState(false);

  const { formatPrice } =
    useCurrency();

  const image =
    product.images?.[0] ||
    "/images/placeholder.jpg";

  return (
    <>
      <article
        className="
          group
          overflow-hidden
          rounded-xl
          border
          border-[#E8DFD2]
          bg-white
          shadow-[0_6px_20px_rgba(40,30,20,0.05)]
          transition-all
          duration-500
          hover:-translate-y-1
          hover:border-[#C89A2A]/40
          hover:shadow-[0_18px_45px_rgba(40,30,20,0.12)]
          sm:rounded-2xl
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

          <ProductBadge
            badge={product.badge}
          />

          {/* Wishlist */}

          <WishlistButton />

          {/* Product Image */}

          <Link
            href={`/product/${product.slug}`}
            className="absolute inset-0"
            aria-label={`View ${product.name}`}
          >
            <Image
              src={image}
              alt={product.name}
              fill
              sizes="
                (max-width: 639px) 50vw,
                (max-width: 1023px) 50vw,
                (max-width: 1279px) 33vw,
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
          </Link>

          {/* ================================================= */}
          {/* QUICK VIEW */}
          {/* ================================================= */}

          <QuickViewButton
            onClick={() =>
              setQuickViewOpen(true)
            }
          />

        </div>

        {/* ================================================= */}
        {/* PRODUCT INFORMATION */}
        {/* ================================================= */}

        <div
          className="
            p-3
            sm:p-5
            lg:p-6
          "
        >

          {/* Rating */}

          <ProductRating
            rating={product.rating}
          />

          {/* Product Name */}

          <Link
            href={`/product/${product.slug}`}
          >
            <h3
              className="
                mt-2
                min-h-[42px]
                text-[13px]
                font-semibold
                leading-5
                tracking-[-0.01em]
                text-[#1A1A1A]
                transition-colors
                duration-300
                hover:text-[#C89A2A]
                sm:mt-3
                sm:min-h-[48px]
                sm:text-[16px]
                sm:leading-snug
                lg:text-[17px]
              "
            >
              {product.name}
            </h3>
          </Link>

          {/* Price */}

          <p
            className="
              mt-2
              text-lg
              font-bold
              text-[#C89A2A]
              sm:mt-4
              sm:text-2xl
            "
          >
            {formatPrice(product.price)}
          </p>

        </div>

      </article>

      {/* ================================================= */}
      {/* QUICK VIEW MODAL */}
      {/* ================================================= */}

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() =>
          setQuickViewOpen(false)
        }
      />
    </>
  );
}