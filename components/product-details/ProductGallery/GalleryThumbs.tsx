"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface GalleryThumbsProps {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function GalleryThumbs({
  images,
  activeIndex,
  onSelect,
}: GalleryThumbsProps) {
  if (images.length <= 1) return null;

  return (
    <div
      className="
        flex
        w-full
        gap-5
        overflow-x-auto
        px-3
        pb-4
        pt-3
        scrollbar-thin
      "
    >
      {images.map((image, index) => (
        <motion.button
          key={index}
          type="button"
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.97,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={() => onSelect(index)}
          aria-label={`View image ${index + 1}`}
          className={`
            group
            relative
            aspect-[4/3]
            w-[150px]
            shrink-0
            overflow-hidden
            rounded-xl
            bg-[#FAF8F4]
            transition-all
            duration-300

            ${
              activeIndex === index
                ? "ring-2 ring-[#C89A2A] ring-offset-2"
                : "opacity-75 hover:opacity-100"
            }
          `}
        >
          <Image
            src={image}
            alt={`Product image ${index + 1}`}
            fill
            sizes="150px"
            className="
              object-contain
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </motion.button>
      ))}
    </div>
  );
}