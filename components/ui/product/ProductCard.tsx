"use client";

import { motion } from "framer-motion";

import { Product } from "@/types/product";

import ProductBadge from "./ProductBadge";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#ECE3D3]
        bg-white
        transition-all
        duration-500
        hover:border-[#C79B2A]
        hover:shadow-[0_25px_60px_rgba(0,0,0,.10)]
      "
    >
      {/* Badge */}

      <ProductBadge
        badge={product.badge}
      />

      {/* Product Image */}

      <ProductImage
        frontImage={product.images.front}
        backImage={product.images.back}
        name={product.name}
      />

      {/* Product Information */}

      <ProductInfo
        product={product}
      />

      {/* Premium Gold Border Animation */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          border
          border-[#C79B2A]
        "
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.35,
        }}
      />

      {/* Luxury Glow */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          bg-gradient-to-br
          from-[#C79B2A]/0
          via-[#C79B2A]/5
          to-[#C79B2A]/0
        "
        initial={{
          opacity: 0,
        }}
        whileHover={{
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
        }}
      />
    </motion.article>
  );
}