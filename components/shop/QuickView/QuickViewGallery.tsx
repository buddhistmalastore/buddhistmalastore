"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface QuickViewGalleryProps {
  images: string[];
  name: string;
}

export default function QuickViewGallery({
  images,
  name,
}: QuickViewGalleryProps) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => {
    setCurrent((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-[#FAF8F4] p-8">

      {/* Previous */}

      {images.length > 1 && (
        <button
          onClick={prevImage}
          className="
            absolute
            left-6
            top-1/2
            z-20
            -translate-y-1/2
            rounded-full
            bg-white/90
            p-3
            shadow-lg
            transition
            hover:bg-[#C79B2A]
            hover:text-white
          "
        >
          <FiChevronLeft size={22} />
        </button>
      )}

      {/* Image */}

      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt={name}
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 1.05,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            h-[520px]
            w-full
            object-contain
          "
        />
      </AnimatePresence>

      {/* Next */}

      {images.length > 1 && (
        <button
          onClick={nextImage}
          className="
            absolute
            right-6
            top-1/2
            z-20
            -translate-y-1/2
            rounded-full
            bg-white/90
            p-3
            shadow-lg
            transition
            hover:bg-[#C79B2A]
            hover:text-white
          "
        >
          <FiChevronRight size={22} />
        </button>
      )}

      {/* Dots */}

      {images.length > 1 && (
        <div className="mt-8 flex gap-3">

          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`
                h-3
                w-3
                rounded-full
                transition-all
                duration-300

                ${
                  current === index
                    ? "w-8 bg-[#C79B2A]"
                    : "bg-[#D8D8D8]"
                }
              `}
            />
          ))}

        </div>
      )}

    </div>
  );
}