"use client";

import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

import { FiShoppingCart } from "react-icons/fi";
import { HiLightningBolt } from "react-icons/hi";

interface Props {
  product: Product;
  visible: boolean;
}

export default function StickyBuyBar({
  product,
  visible,
}: Props) {
  const {
    addToCart,
    isInCart,
    getQuantity,
  } = useCart();

  const { formatPrice } = useCurrency();

  const added = isInCart(product.id);
  const qty = getQuantity(product.id) || 1;

  return (
    <div
      className={`
        fixed
        bottom-0
        left-0
        right-0
        z-[9999]

        border-t
        border-[#E8DFD1]

        bg-white/95
        backdrop-blur-xl

        shadow-[0_-10px_30px_rgba(0,0,0,0.08)]

        transition-all
        duration-500

        ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          max-w-[1450px]
          items-center
          justify-between
          gap-6

          px-5
          py-4

          lg:px-10
        "
      >
        {/* Product */}

        <div className="flex items-center gap-4 min-w-0">

          <div
            className="
              relative
              h-16
              w-16
              overflow-hidden
              rounded-xl
              border
              border-[#E8DFD1]
              bg-[#FAF8F4]
              flex-shrink-0
            "
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-contain p-2"
            />
          </div>

          <div className="min-w-0">

            <h3 className="truncate font-semibold text-[#1A1A1A]">
              {product.name}
            </h3>

            {/* Converted Price */}

            <p className="mt-1 font-bold text-[#C89A2A]">
              {formatPrice(product.price)}
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div className="flex items-center gap-3 flex-shrink-0">

          {added && (
            <div
              className="
                hidden
                md:flex
                items-center
                rounded-xl
                border
                border-[#E8DFD1]
                bg-white
                px-5
                py-3
                font-semibold
              "
            >
              Qty {qty}
            </div>
          )}

          {!added ? (
            <button
              onClick={() => addToCart(product, qty)}
              className="
                flex
                items-center
                gap-2

                rounded-xl

                border
                border-[#C89A2A]

                bg-white

                px-6
                py-3

                font-semibold

                text-[#C89A2A]

                transition-all
                duration-300

                hover:bg-[#C89A2A]
                hover:text-white
              "
            >
              <FiShoppingCart size={18} />

              <span className="hidden sm:inline">
                Add to Cart
              </span>
            </button>
          ) : (
            <Link
              href="/cart"
              className="
                rounded-xl

                bg-green-600

                px-6
                py-3

                font-semibold

                text-white

                transition-all
                duration-300

                hover:bg-green-700
              "
            >
              View Cart
            </Link>
          )}

          <Link
            href={added ? "/checkout" : "#"}
            className="
              flex
              items-center
              gap-2

              rounded-xl

              bg-[#1A1A1A]

              px-6
              py-3

              font-semibold

              text-white

              transition-all
              duration-300

              hover:bg-[#C89A2A]
            "
          >
            <HiLightningBolt size={18} />

            <span className="hidden sm:inline">
              {added ? "Checkout" : "Buy Now"}
            </span>
          </Link>

        </div>

      </div>
    </div>
  );
}