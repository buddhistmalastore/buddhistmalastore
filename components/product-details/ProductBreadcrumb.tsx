"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { Product } from "@/types/product";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({
  product,
}: ProductBreadcrumbProps) {
  return (
    <section
      className="
        flex
        flex-wrap
        items-center
        gap-2

        border-b
        border-[#ECE3D3]

        pb-5

        text-[13px]
      "
    >
      <Link
        href="/"
        className="
          text-[#777]
          transition
          hover:text-[#C79B2A]
        "
      >
        Home
      </Link>

      <FiChevronRight
        size={13}
        className="text-[#BBB]"
      />

      <Link
        href="/shop"
        className="
          text-[#777]
          transition
          hover:text-[#C79B2A]
        "
      >
        Shop
      </Link>

      <FiChevronRight
        size={13}
        className="text-[#BBB]"
      />

      <Link
        href={`/category/${product.category.toLowerCase()}`}
        className="
          text-[#777]
          transition
          hover:text-[#C79B2A]
        "
      >
        {product.category}
      </Link>

      <FiChevronRight
        size={13}
        className="text-[#BBB]"
      />

      <span
        className="
          font-medium
          text-[#1A1A1A]
        "
      >
        {product.name}
      </span>
    </section>
  );
}