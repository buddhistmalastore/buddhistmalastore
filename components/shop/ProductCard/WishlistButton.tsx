"use client";

import { useState } from "react";
import { FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

interface WishlistButtonProps {
  initialLiked?: boolean;
}

export default function WishlistButton({
  initialLiked = false,
}: WishlistButtonProps) {
  const [liked, setLiked] = useState(initialLiked);

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.2 }}
      onClick={() => setLiked(!liked)}
      aria-label="Add to Wishlist"
      className="
        absolute
        right-4
        top-4
        z-20
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-white/30
        bg-white/80
        backdrop-blur-md
        shadow-lg
        transition-all
        duration-300
        hover:bg-[#C79B2A]
        hover:text-white
      "
    >
      <FiHeart
        size={20}
        className={`
          transition-all
          duration-300
          ${
            liked
              ? "fill-red-500 text-red-500"
              : "text-[#444]"
          }
        `}
      />
    </motion.button>
  );
}