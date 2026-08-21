"use client";

import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import { Product } from "@/types/product";

import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

import { QuickViewModal } from "../QuickView";
import useWishlist from "@/hooks/useWishlist";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const wished = isWishlisted(product.id);

  return (
    <>
      <article
        className="
          group
          overflow-hidden
          rounded-[30px]
          border
          border-[#E8DFD2]
          bg-white
          shadow-sm
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-2xl
        "
      >
        {/* Image */}

        <div className="relative">

          <ProductImage product={product} />

          {/* Wishlist */}

          <button
            onClick={() => toggleWishlist(product.id)}
            className="
              absolute
              right-5
              top-5

              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full
              bg-white/95
              shadow-lg

              transition-all
              duration-300

              hover:scale-110
            "
          >
            {wished ? (
              <FaHeart
                size={18}
                className="text-red-500"
              />
            ) : (
              <FiHeart
                size={18}
                className="text-[#444]"
              />
            )}
          </button>

          {/* Quick View */}

          <button
            onClick={() => setQuickViewOpen(true)}
            className="
              absolute
              bottom-6
              left-1/2
              -translate-x-1/2

              rounded-full
              bg-white/95
              px-6
              py-3

              text-sm
              font-semibold

              opacity-0
              shadow-xl

              transition-all
              duration-300

              group-hover:opacity-100

              hover:bg-[#C79B2A]
              hover:text-white
            "
          >
            Quick View
          </button>

        </div>

        {/* Content */}

        <div className="space-y-5 p-6">

          <ProductInfo product={product} />

          {/* Purpose */}

          <div className="flex flex-wrap gap-2">

            {product.purpose.slice(0, 3).map((item) => (
              <span
                key={item}
                className="
                  rounded-full
                  border
                  border-[#E8DFD2]
                  bg-[#FAF8F4]
                  px-3
                  py-1
                  text-xs
                  font-medium
                  text-[#7B6A58]
                "
              >
                {item}
              </span>
            ))}

          </div>

          <ProductPrice
            price={product.price}
            oldPrice={product.oldPrice}
            discount={product.discount}
          />

          <ProductActions
  product={product}
/>

        </div>
      </article>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
