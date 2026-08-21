"use client";

import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight, FiStar } from "react-icons/fi";

import { Product } from "@/types/product";

interface Props {
  product: Product;
  previous?: Product;
  next?: Product;
}

export default function ProductHeader({
  product,
  previous,
  next,
}: Props) {
  return (
    <section>

      {/* Category */}

      <p className="text-[11px] uppercase tracking-[3px] font-semibold text-[#B68A1F]">
        {product.category}
      </p>

      {/* Title */}

      <div className="mt-3 flex items-start justify-between gap-6">

        <h1 className="max-w-[520px] text-[40px] font-semibold leading-tight text-[#1D1D1D]">
          {product.name}
        </h1>

        <div className="flex items-center gap-3">

          <NavButton
            product={previous}
            direction="left"
          />

          <NavButton
            product={next}
            direction="right"
          />

        </div>

      </div>

      {/* Rating */}

      <div className="mt-5 flex items-center gap-3">

        <div className="flex items-center text-[#D8A31A]">

          {Array.from({ length: 5 }).map((_, i) => (
            <FiStar
              key={i}
              size={16}
              fill="#D8A31A"
            />
          ))}

        </div>

        <span className="text-[14px] text-[#666]">
          {product.rating} ({product.reviews} Reviews)
        </span>

      </div>

    </section>
  );
}

interface NavButtonProps {
  product?: Product;
  direction: "left" | "right";
}

function NavButton({
  product,
  direction,
}: NavButtonProps) {

  const Button = (
    <div
      className={`
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        transition-all
        duration-300

        ${
          product
            ? "border-[#DDD] bg-white hover:bg-[#C89A2A] hover:text-white hover:border-[#C89A2A] shadow-sm hover:shadow-lg cursor-pointer"
            : "border-[#EAEAEA] bg-[#F5F5F5] text-[#BDBDBD] cursor-not-allowed"
        }
      `}
    >
      {direction === "left" ? (
        <FiChevronLeft size={20} />
      ) : (
        <FiChevronRight size={20} />
      )}
    </div>
  );

  if (!product) {
    return Button;
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative"
    >

      {Button}

      {/* Hover Preview */}

      <div
        className="
          invisible
          absolute
          right-0
          top-full
          z-50
          mt-4
          w-[250px]
          translate-y-2
          rounded-2xl
          border
          border-[#ECE2D0]
          bg-white
          opacity-0
          shadow-2xl
          transition-all
          duration-300
          group-hover:visible
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >

        <div className="relative h-[170px] bg-[#FAF8F4]">

          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="250px"
            className="object-contain p-5"
          />

        </div>

        <div className="p-4">

          <div className="text-xs uppercase tracking-[2px] text-[#B68A1F]">
            {direction === "left" ? "Previous Product" : "Next Product"}
          </div>

          <h3 className="mt-2 line-clamp-2 text-[16px] font-semibold leading-6">
            {product.name}
          </h3>

          <div className="mt-3 text-lg font-bold text-[#C89A2A]">
            NPR {product.price}
          </div>

          <p className="mt-1 text-sm text-[#777]">
            Click to view →
          </p>

        </div>

      </div>

    </Link>
  );
}