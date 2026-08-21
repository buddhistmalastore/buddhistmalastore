"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({
  product,
}: ProductImageProps) {
  return (
    <div className="group relative overflow-hidden rounded-[28px] bg-[#F7F4EF]">

      {/* Product Image Link */}

      <Link
        href={`/product/${product.slug}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">

          {/* Main Image */}

          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="h-full w-full"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={false}
              className="object-cover"
            />
          </motion.div>

          {/* Second Image */}

          {product.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{
                duration: 0.4,
              }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

        </div>
      </Link>

    </div>
  );
}