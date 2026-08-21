"use client";

import { motion } from "framer-motion";
import { FaShoppingBag, FaHeart } from "react-icons/fa";

interface ProductActionsProps {
  inStock: boolean;
  onAddToBag?: () => void;
  onWishlist?: () => void;
}

export default function ProductActions({
  inStock,
  onAddToBag,
  onWishlist,
}: ProductActionsProps) {
  return (
    <div className="mt-5 flex items-center gap-3">

      {/* Add To Bag */}

      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -2 }}
        onClick={onAddToBag}
        disabled={!inStock}
        className={`
          flex-1
          flex
          items-center
          justify-center
          gap-2
          rounded-full
          px-5
          py-3
          text-sm
          font-semibold
          uppercase
          tracking-[2px]
          transition-all
          duration-300

          ${
            inStock
              ? "bg-[#1A1A1A] text-white hover:bg-[#C79B2A] hover:shadow-lg"
              : "cursor-not-allowed bg-[#D8D3CC] text-[#77736F]"
          }
        `}
      >
        <FaShoppingBag size={14} />

        {inStock ? "Add To Bag" : "Out of Stock"}
      </motion.button>

      {/* Wishlist */}

      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={onWishlist}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-[#ECE3D3]
          bg-white
          text-[#2B251F]
          transition-all
          duration-300
          hover:border-[#C79B2A]
          hover:bg-[#C79B2A]
          hover:text-white
          hover:shadow-lg
        "
        aria-label="Add to Wishlist"
      >
        <FaHeart size={15} />
      </motion.button>

    </div>
  );
}