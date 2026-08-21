"use client";

import { useState } from "react";

import { Product } from "@/types/product";

import GalleryMain from "./GalleryMain";
import GalleryThumbs from "./GalleryThumbs";
import ImageLightbox from "./ImageLightbox";

interface ProductGalleryProps {
  product: Product;
}

export default function ProductGallery({
  product,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const previousImage = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? product.images.length - 1
        : prev - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === product.images.length - 1
        ? 0
        : prev + 1
    );
  };

  return (
    <>
      <div className="w-full">

        {/* MAIN IMAGE */}

        <div className="w-full">
          <GalleryMain
            image={product.images[activeIndex]}
            productName={product.name}
            current={activeIndex}
            total={product.images.length}
            previous={previousImage}
            next={nextImage}
            onOpen={() => setOpen(true)}
          />
        </div>

        {/* THUMBNAILS BELOW IMAGE */}

        {product.images.length > 1 && (
          <div className="mt-5 w-full">
            <GalleryThumbs
              images={product.images}
              activeIndex={activeIndex}
              onSelect={setActiveIndex}
            />
          </div>
        )}

      </div>

      {/* FULLSCREEN */}

      <ImageLightbox
        open={open}
        images={product.images}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        onClose={() => setOpen(false)}
      />
    </>
  );
}