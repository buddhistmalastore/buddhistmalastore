"use client";

import { useState, useEffect, RefObject } from "react";
import Link from "next/link";

import { Product } from "@/types/product";

import { FiShoppingCart } from "react-icons/fi";
import { HiLightningBolt } from "react-icons/hi";

import QuantitySelector from "./QuantitySelector";

import useCart from "@/hooks/useCart";

interface Props {
  product: Product;
  buyBoxRef: RefObject<HTMLElement | null>;
}

export default function ProductBuyBox({
  product,
  buyBoxRef,
}: Props) {
  const {
    addToCart,
    isInCart,
    getQuantity,
  } = useCart();

  const added = isInCart(product.id);

  const cartQty = getQuantity(product.id);

  const [qty, setQty] = useState(
    cartQty || 1
  );

  useEffect(() => {
    setQty(cartQty || 1);
  }, [cartQty]);

  return (
    <section ref={buyBoxRef}>
      {/* Stock */}

      <div className="flex items-center gap-2">
        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-green-500
          "
        />

        <span
          className="
            text-sm
            font-medium
            text-[#2E7D32]
          "
        >
          In Stock ({product.stock} Available)
        </span>
      </div>

      {/* Quantity + Buttons */}

      <div
        className="
          grid
          grid-cols-[120px_1fr_1fr]
          gap-3
        "
      >
        <QuantitySelector
          value={qty}
          onChange={setQty}
        />

        {/* Add to Cart */}

        <button
          type="button"
          onClick={() =>
            addToCart(product, qty)
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#C89A2A]
            bg-white
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

          {added
            ? "Update Cart"
            : "Add to Cart"}
        </button>

        {/* Buy Now */}

        <Link
          href={
            added
              ? "/checkout"
              : "#"
          }
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#1A1A1A]
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-[#C89A2A]
          "
        >
          <HiLightningBolt size={18} />

          {added
            ? "Checkout"
            : "Buy Now"}
        </Link>
      </div>

      {/* View Cart */}

      {added && (
        <Link
          href="/cart"
          className="
            mt-3
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            bg-green-600
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-green-700
          "
        >
          ✓ View Cart
        </Link>
      )}
    </section>
  );
}