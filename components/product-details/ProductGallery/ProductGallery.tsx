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

  const hasVideo = Boolean(product.video);

  const galleryItems = [
    ...product.images.map((image) => ({
      type: "image" as const,
      src: image,
    })),

    ...(hasVideo
      ? [
          {
            type: "video" as const,
            src: product.video as string,
          },
        ]
      : []),
  ];

  const totalItems = galleryItems.length;

  const previousImage = () => {
    setActiveIndex((prev) =>
      prev === 0
        ? totalItems - 1
        : prev - 1
    );
  };

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === totalItems - 1
        ? 0
        : prev + 1
    );
  };

  const activeItem = galleryItems[activeIndex];

  return (
    <>
      <div className="w-full">

        {/* MAIN GALLERY */}

        <div className="w-full">

          {activeItem?.type === "video" ? (
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-black">

              <video
                src={activeItem.src}
                controls
                playsInline
                preload="metadata"
                className="h-full w-full object-contain"
              />

            </div>
          ) : (
            <GalleryMain
              image={activeItem?.src || ""}
              productName={product.name}
              current={activeIndex}
              total={totalItems}
              previous={previousImage}
              next={nextImage}
              onOpen={() => setOpen(true)}
            />
          )}

        </div>

        {/* THUMBNAILS */}

        {totalItems > 1 && (
          <div className="mt-5 w-full">

            <div className="flex gap-3 overflow-x-auto pb-2">

              {galleryItems.map((item, index) => (
                <button
                  key={`${item.type}-${index}`}
                  type="button"
                  onClick={() =>
                    setActiveIndex(index)
                  }
                  className={`
                    relative
                    h-20
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border-2
                    transition
                    ${
                      activeIndex === index
                        ? "border-black"
                        : "border-transparent"
                    }
                  `}
                  aria-label={
                    item.type === "video"
                      ? "Play product video"
                      : `View product image ${index + 1}`
                  }
                >

                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.src}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />

                      {/* VIDEO ICON */}

                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">

                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow-md">
                          ▶
                        </span>

                      </span>
                    </>
                  ) : (
                    <img
                      src={item.src}
                      alt={`${product.name} ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  )}

                </button>
              ))}

            </div>

          </div>
        )}

      </div>

      {/* FULLSCREEN IMAGE LIGHTBOX */}

      <ImageLightbox
        open={
          open &&
          activeItem?.type === "image"
        }
        images={product.images}
        activeIndex={Math.min(
          activeIndex,
          product.images.length - 1
        )}
        setActiveIndex={setActiveIndex}
        onClose={() => setOpen(false)}
      />

    </>
  );
}