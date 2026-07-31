"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegEye } from "react-icons/fa";

interface ProductImageProps {
  image: string;
  name: string;
}

export default function ProductImage({
  image,
  name,
}: ProductImageProps) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] bg-[#FAF8F4]">

      {/* Product Image */}

      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >
        <Image
          src={image}
          alt={name}
          width={700}
          height={875}
          priority={false}
          className="
            aspect-[4/5]
            w-full
            object-cover
            transition-all
            duration-500
          "
        />
      </motion.div>

      {/* Wishlist */}

      <button
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
          bg-white/95
          text-[#1F1A17]
          opacity-0
          shadow-lg
          transition-all
          duration-300
          group-hover:opacity-100
          hover:bg-[#C79B2A]
          hover:text-white
        "
      >
        <FaHeart size={15} />
      </button>

      {/* Quick View */}

      <button
        className="
          absolute
          right-4
          top-16
          z-20
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white/95
          text-[#1F1A17]
          opacity-0
          shadow-lg
          transition-all
          duration-500
          group-hover:opacity-100
          hover:bg-[#C79B2A]
          hover:text-white
        "
      >
        <FaRegEye size={15} />
      </button>

      {/* Luxury Gradient */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-24
          bg-gradient-to-t
          from-black/15
          via-transparent
          to-transparent
        "
      />

    </div>
  );
}