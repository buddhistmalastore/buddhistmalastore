"use client";

import { useState } from "react";
import { FiHeart, FiShoppingBag } from "react-icons/fi";

import { Product } from "@/types/product";
import QuantitySelector from "./QuantitySelector";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

interface QuickViewActionsProps {
  product: Product;
}

export default function QuickViewActions({
  product,
}: QuickViewActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const total = product.price * quantity;

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      return;
    }

    addToCart(product, quantity);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="mt-10 border-t border-[#E8DFD2] pt-8">

      {/* ================================================= */}
      {/* PRICE */}
      {/* ================================================= */}

      <div className="mb-8 flex items-end gap-4">

        <span className="text-4xl font-bold text-[#1A1A1A]">
          {formatPrice(total)}
        </span>

        {product.oldPrice && (
          <span className="pb-1 text-xl text-gray-400 line-through">
            {formatPrice(
              product.oldPrice * quantity
            )}
          </span>
        )}

      </div>

      {/* ================================================= */}
      {/* QUANTITY */}
      {/* ================================================= */}

      <QuantitySelector
        quantity={quantity}
        setQuantity={setQuantity}
      />

      {/* ================================================= */}
      {/* BUTTONS */}
      {/* ================================================= */}

      <div className="mt-8 flex gap-4">

        {/* ADD TO BAG */}

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`
            flex-1
            rounded-full
            px-8
            py-4
            font-semibold
            transition-all
            duration-300
            ${
              product.stock <= 0
                ? `
                  cursor-not-allowed
                  bg-gray-300
                  text-gray-500
                `
                : added
                  ? `
                    bg-green-600
                    text-white
                  `
                  : `
                    bg-[#C79B2A]
                    text-[#1A1A1A]
                    hover:-translate-y-1
                    hover:bg-[#D6AE4A]
                    hover:shadow-xl
                  `
            }
          `}
        >
          <span className="flex items-center justify-center gap-3">

            <FiShoppingBag size={20} />

            {product.stock <= 0
              ? "Out of Stock"
              : added
                ? "Added To Bag ✓"
                : "Add To Bag"}

          </span>
        </button>

        {/* WISHLIST */}

        <button
          type="button"
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#E8DFD2]
            transition-all
            duration-300
            hover:border-[#C79A2A]
            hover:bg-[#C79A2A]
            hover:text-white
          "
        >
          <FiHeart size={22} />
        </button>

      </div>

      {/* ================================================= */}
      {/* STOCK */}
      {/* ================================================= */}

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