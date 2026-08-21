"use client";

import { useState } from "react";
import { FiShoppingBag, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

import { Product } from "@/types/product";
import useCart from "@/hooks/useCart";

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({
  product,
}: ProductActionsProps) {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const outOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (outOfStock) return;

    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  return (
    <div className="mt-6">
      <motion.button
        whileHover={
          !outOfStock
            ? { y: -2, scale: 1.02 }
            : {}
        }
        whileTap={
          !outOfStock
            ? { scale: 0.98 }
            : {}
        }
        transition={{ duration: 0.2 }}
        disabled={outOfStock}
        onClick={handleAddToCart}
        className={`
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-full
          px-6
          py-4
          text-sm
          font-semibold
          tracking-wide
          transition-all
          duration-300

          ${
            outOfStock
              ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : added
              ? "bg-green-600 text-white shadow-lg"
              : "bg-[#C79B2A] text-[#1A1A1A] shadow-lg hover:bg-[#D6AE4A]"
          }
        `}
      >
        {added ? (
          <>
            <FiCheck size={18} />
            Added to Cart
          </>
        ) : (
          <>
            <FiShoppingBag size={18} />
            {outOfStock ? "Out of Stock" : "Add to Bag"}
          </>
        )}
      </motion.button>
    </div>
  );
}