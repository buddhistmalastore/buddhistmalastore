"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [selected, setSelected] = useState(product.images[0]);

  return (
    <div className="flex gap-6">

      {/* Thumbnails */}

      <div className="flex flex-col gap-4">
        {product.images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelected(image)}
            className={`
              overflow-hidden
              rounded-2xl
              border-2
              transition-all

              ${
                selected === image
                  ? "border-[#C79B2A]"
                  : "border-transparent"
              }
            `}
          >
            <Image
              src={image}
              alt={product.name}
              width={90}
              height={90}
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}

      <div
        className="
          relative
          flex-1
          overflow-hidden
          rounded-[30px]
          bg-white
          shadow-lg
        "
      >
        <Image
          src={selected}
          alt={product.name}
          width={700}
          height={850}
          className="
            h-auto
            w-full
            transition-transform
            duration-500
            hover:scale-110
          "
        />
      </div>

    </div>
  );
}