"use client";

import { useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

import { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";

interface QuickViewActionsProps {
  product: Product;
}

export default function QuickViewActions({
  product,
}: QuickViewActionsProps) {
  const [quantity, setQuantity] = useState(1);

  const total = product.price * quantity;

  return (
    <div className="mt-10 border-t border-[#E8DFD2] pt-8">

      {/* Price */}

      <div className="mb-8 flex items-end gap-4">

        <span className="text-4xl font-bold text-[#1A1A1A]">
          ${total.toFixed(2)}
        </span>

        {product.oldPrice && (
          <span className="pb-1 text-xl text-gray-400 line-through">
            ${(product.oldPrice * quantity).toFixed(2)}
          </span>
        )}

      </div>

      {/* Quantity */}

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* Buttons */}

      <div className="mt-8 flex gap-4">

        {/* Add To Cart */}

        <button
          className="
            flex-1
            rounded-full
            bg-[#C79B2A]
            px-8
            py-4
            font-semibold
            text-[#1A1A1A]
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#D6AE4A]
            hover:shadow-xl
          "
        >
          <span className="flex items-center justify-center gap-3">
            <FiShoppingBag size={20} />
            Add To Bag
          </span>
        </button>

        {/* Wishlist */}

        <button
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-[#E8DFD2]
            transition-all
            duration-300
            hover:border-[#C79B2A]
            hover:bg-[#C79B2A]
            hover:text-white
          "
        >
          <FiHeart size={22} />
        </button>

      </div>

      {/* Stock */}

      <div className="mt-6">

        {product.stock > 0 ? (
          <span className="text-sm font-medium text-green-600">
            ✓ In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="text-sm font-medium text-red-500">
            Out of Stock
          </span>
        )}

      </div>

    </div>
  );
}