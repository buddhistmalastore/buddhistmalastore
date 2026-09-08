"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { useCurrency } from "@/context/CurrencyContext";
import { useCartContext } from "@/context/CartContext";

import {
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";

interface Props {
  product: Product;
}

export default function RelatedProductCard({
  product,
}: Props) {
  const { formatPrice } = useCurrency();

  const { addToCart } = useCartContext();

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
  };

  return (
    <Link
      href={`/product/${product.slug}`}
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

      <div
        className="
          relative
          h-[280px]
          overflow-hidden
          bg-[#FBF9F5]
        "
      >

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
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="
            absolute
            right-4
            top-4
            z-20
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

        {/* Image */}

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

        <h3
          className="
            mt-3
            min-h-[56px]
            text-[18px]
            font-semibold
            leading-7
            text-[#1A1A1A]
            transition
            group-hover:text-[#C89A2A]
          "
        >
          {product.name}
        </h3>

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

        {/* PRICE */}

        <div className="mt-5 flex items-end gap-3">

          <div
            className="
              text-[28px]
              font-bold
              text-[#1A1A1A]
            "
          >
            {formatPrice(product.price)}
          </div>

          {/* OLD PRICE */}

          {product.oldPrice && (
            <div
              className="
                pb-1
                text-sm
                text-[#999]
                line-through
              "
            >
              {formatPrice(product.oldPrice)}
            </div>
          )}

        </div>

        {/* ADD TO CART */}

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

    </Link>
  );
}