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
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        group
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
      <div className="relative">

        {/* Badge */}

        <ProductBadge badge={product.badge} />

        {/* Image */}

        <ProductImage
          image={product.image}
          name={product.name}
        />

      </div>

      {/* Product Information */}

      <ProductInfo
        product={product}
      />

    </motion.article>
  );
}