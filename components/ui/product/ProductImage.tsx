"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegEye } from "react-icons/fa";

interface ProductImageProps {
  frontImage: string;
  backImage: string;
  name: string;
}

export default function ProductImage({
  frontImage,
  backImage,
  name,
}: ProductImageProps) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-t-[28px]
        bg-[#FAF8F4]
      "
    >
      {/* Front Image */}

      <motion.div
        className="absolute inset-0 z-10"
        whileHover={{
          opacity: 0,
          scale: 1.05,
        }}
        transition={{
          duration: 0.45,
        }}
      >
        <Image
          src={frontImage}
          alt={name}
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Back Image */}

      <motion.div
        className="relative aspect-[5/5.2]"
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
          scale: 1.05,
        }}
        transition={{
          duration: 0.45,
        }}
      >
        <Image
          src={backImage}
          alt={`${name} Back`}
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Luxury Shine */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            -left-[150%]
            top-0
            h-full
            w-[45%]
            rotate-12
            bg-gradient-to-r
            from-transparent
            via-white/30
            to-transparent
            transition-all
            duration-700
            group-hover:left-[160%]
          "
        />
      </div>

      {/* Floating Actions */}

      <div
        className="
          absolute
          bottom-4
          right-4
          z-30
          flex
          translate-y-3
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-white/90
          px-2
          py-2
          opacity-0
          shadow-xl
          backdrop-blur-xl
          transition-all
          duration-500
          group-hover:translate-y-0
          group-hover:opacity-100
        "
      >
        <button
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#C79B2A]
            hover:text-white
          "
          aria-label="Wishlist"
        >
          <FaHeart size={14} />
        </button>

        <button
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            transition
            hover:bg-[#C79B2A]
            hover:text-white
          "
          aria-label="Quick View"
        >
          <FaRegEye size={14} />
        </button>
      </div>
    </div>
  );
}