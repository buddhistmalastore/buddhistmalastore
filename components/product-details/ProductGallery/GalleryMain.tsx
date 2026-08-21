"use client";

import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";

interface GalleryMainProps {
  image: string;
  productName: string;
  current: number;
  total: number;
  previous: () => void;
  next: () => void;
  onOpen: () => void;
}

export default function GalleryMain({
  image,
  productName,
  current,
  total,
  previous,
  next,
  onOpen,
}: GalleryMainProps) {
  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  const [zoom, setZoom] = useState(false);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      ((e.clientX - rect.left) / rect.width) * 100;

    const y =
      ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({
      x,
      y,
    });
  };

  return (
    <div className="relative w-full">

      {/* IMAGE AREA */}

      <div
        className="
          relative
          aspect-[4/3]
          w-full
          overflow-hidden
          cursor-zoom-in
        "
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onClick={onOpen}
      >
        <Image
          src={image}
          alt={productName}
          fill
          priority
          sizes="
            (max-width: 768px) 100vw,
            (max-width: 1280px) 55vw,
            800px
          "
          className="
            object-contain
            transition-transform
            duration-200
            ease-out
          "
          style={{
            transform: zoom ? "scale(1.65)" : "scale(1)",
            transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          }}
        />
      </div>

      {/* IMAGE COUNTER */}

      <div
        className="
          pointer-events-none
          absolute
          left-4
          top-4
          z-30
          rounded-full
          bg-white/90
          px-4
          py-2
          text-xs
          shadow-lg
          backdrop-blur-md
        "
      >
        <span className="font-semibold text-[#C89A2A]">
          {String(current + 1).padStart(2, "0")}
        </span>

        <span className="mx-2 text-[#BBB]">
          /
        </span>

        <span className="text-[#666]">
          {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* FULLSCREEN BUTTON */}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        aria-label="Open fullscreen"
        className="
          absolute
          right-4
          top-4
          z-30
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          bg-white/90
          text-[#333]
          shadow-lg
          backdrop-blur-md
          transition-all
          hover:scale-110
          hover:bg-[#C89A2A]
          hover:text-white
        "
      >
        <FiMaximize2 size={18} />
      </button>

      {/* PREVIOUS */}

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            previous();
          }}
          aria-label="Previous image"
          className="
            absolute
            left-4
            top-1/2
            z-30
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-[#333]
            shadow-lg
            backdrop-blur-md
            transition-all
            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white
          "
        >
          <FiChevronLeft size={22} />
        </button>
      )}

      {/* NEXT */}

      {total > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          aria-label="Next image"
          className="
            absolute
            right-4
            top-1/2
            z-30
            flex
            h-11
            w-11
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-[#333]
            shadow-lg
            backdrop-blur-md
            transition-all
            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white
          "
        >
          <FiChevronRight size={22} />
        </button>
      )}

    </div>
  );
}