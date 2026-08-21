"use client";

import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { Product } from "@/types/product";

interface BreadcrumbProps {
  product: Product;
}

export default function Breadcrumb({
  product,
}: BreadcrumbProps) {
  return (
    <nav
      className="
        flex
        flex-wrap
        items-center
        gap-2
        text-sm
        text-[#7B746C]
      "
    >
      <Link
        href="/"
        className="
          transition
          hover:text-[#C79B2A]
        "
      >
        Home
      </Link>

      <FiChevronRight size={14} />

      <Link
        href="/shop"
        className="
          transition
          hover:text-[#C79B2A]
        "
      >
        Shop
      </Link>

      <FiChevronRight size={14} />

      <span
        className="
          font-medium
          text-[#1A1A1A]
        "
      >
        {product.name}
      </span>
    </nav>
  );
}