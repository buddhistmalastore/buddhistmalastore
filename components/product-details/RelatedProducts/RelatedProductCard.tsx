"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

import {
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

import { useCartContext } from "@/context/CartContext";

interface Props {
  product: Product;
}

export default function RelatedProductCard({
  product,
}: Props) {
  const { addToCart } = useCartContext();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
  };

  const handleWishlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Wishlist functionality can be connected later
  };

  return (
    <div
      className="
        group
        overflow-hidden
        rounded-2xl
        border
        border-[#ECE3D3]
        bg-white
        transition-all
        duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      {/* IMAGE */}

      <div className="relative h-[280px] overflow-hidden bg-[#FBF9F5]">

        {/* Badge */}

        {product.badge && (
          <div
            className="
              absolute
              left-4
              top-4
              z-20
              rounded-full
              bg-[#C89A2A]
              px-3
              py-1
              text-[11px]
              font-semibold
              uppercase
              tracking-wide
              text-white
            "
          >
            {product.badge}
          </div>
        )}

        {/* Discount */}

        {product.discount && (
          <div
            className="
              absolute
              bottom-4
              left-4
              z-20
              rounded-full
              bg-[#1A1A1A]
              px-3
              py-1
              text-[11px]
              font-semibold
              text-white
            "
          >
            SAVE {product.discount}%
          </div>
        )}

        {/* Wishlist */}

        <button
          type="button"
          onClick={handleWishlist}
          className="
            absolute
            right-4
            top-4
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow-lg
            backdrop-blur
            transition
            hover:bg-[#C89A2A]
            hover:text-white
          "
        >
          <FiHeart size={18} />
        </button>

        {/* Product Image Link */}

        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="
              object-contain
              p-6
              transition-all
              duration-700
              group-hover:scale-110
            "
          />
        </Link>
      </div>

      {/* CONTENT */}

      <div className="p-6">

        {/* Category */}

        <p
          className="
            text-[11px]
            font-semibold
            uppercase
            tracking-[2px]
            text-[#C89A2A]
          "
        >
          {product.category}
        </p>

        {/* Product Name */}

        <Link
          href={`/product/${product.slug}`}
        >
          <h3
            className="
              mt-3
              min-h-[56px]
              text-[18px]
              font-semibold
              leading-7
              text-[#1A1A1A]
              transition
              hover:text-[#C89A2A]
            "
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating */}

        <div className="mt-4 flex items-center gap-2">

          <div className="text-sm text-[#D4A017]">
            ★★★★★
          </div>

          <span className="text-sm text-[#777]">
            {product.rating}
          </span>

          <span className="text-sm text-[#AAA]">
            ({product.reviews})
          </span>

        </div>

        {/* Price */}

        <div className="mt-5 flex items-end gap-3">

          <div className="text-[28px] font-bold text-[#1A1A1A]">
            {product.price}
          </div>

          {product.oldPrice && (
            <div className="pb-1 text-sm text-[#999] line-through">
              {product.oldPrice}
            </div>
          )}

        </div>

        {/* Add To Cart */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#C89A2A]
            py-3
            font-semibold
            text-[#C89A2A]
            transition-all
            duration-300
            hover:bg-[#C89A2A]
            hover:text-white
          "
        >
          <FiShoppingCart />

          Add to Cart
        </button>

      </div>
    </div>
  );
}