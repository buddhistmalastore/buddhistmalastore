"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiPlus,
  FiMinus,
  FiRotateCcw,
} from "react-icons/fi";

interface ImageLightboxProps {
  open: boolean;
  images: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClose: () => void;
}

export default function ImageLightbox({
  open,
  images,
  activeIndex,
  setActiveIndex,
  onClose,
}: ImageLightboxProps) {
  const [zoom, setZoom] = useState(1);
  const [mounted, setMounted] = useState(false);

  /* =========================
     MOUNT
  ========================= */

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  /* =========================
     BODY LOCK + KEYBOARD
  ========================= */

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    setZoom(1);

    const handleKeyDown = (event: KeyboardEvent) => {
      /* ESC */

      if (event.key === "Escape") {
        onClose();
      }

      /* NEXT */

      if (event.key === "ArrowRight") {
        setActiveIndex(
          activeIndex === images.length - 1
            ? 0
            : activeIndex + 1
        );

        setZoom(1);
      }

      /* PREVIOUS */

      if (event.key === "ArrowLeft") {
        setActiveIndex(
          activeIndex === 0
            ? images.length - 1
            : activeIndex - 1
        );

        setZoom(1);
      }

      /* ZOOM IN */

      if (event.key === "+" || event.key === "=") {
        setZoom((current) =>
          Math.min(current + 0.25, 3)
        );
      }

      /* ZOOM OUT */

      if (event.key === "-") {
        setZoom((current) =>
          Math.max(current - 0.25, 1)
        );
      }

      /* RESET */

      if (event.key === "0") {
        setZoom(1);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow = "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    open,
    activeIndex,
    images.length,
    onClose,
    setActiveIndex,
  ]);

  if (!open || !mounted) {
    return null;
  }

  /* =========================
     PREVIOUS
  ========================= */

  const previous = () => {
    setActiveIndex(
      activeIndex === 0
        ? images.length - 1
        : activeIndex - 1
    );

    setZoom(1);
  };

  /* =========================
     NEXT
  ========================= */

  const next = () => {
    setActiveIndex(
      activeIndex === images.length - 1
        ? 0
        : activeIndex + 1
    );

    setZoom(1);
  };

  /* =========================
     ZOOM
  ========================= */

  const zoomIn = () => {
    setZoom((current) =>
      Math.min(current + 0.25, 3)
    );
  };

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(current - 0.25, 1)
    );
  };

  const resetZoom = () => {
    setZoom(1);
  };

  /* =========================
     FULLSCREEN VIEWER
  ========================= */

  const lightbox = (
    <div
      className="
        fixed
        inset-0
        z-[2147483647]
        h-screen
        w-screen
        bg-black
      "
      style={{
        isolation: "isolate",
      }}
    >
      {/* =========================
          BACKGROUND
      ========================= */}

      <div
        className="
          absolute
          inset-0
          bg-black
        "
        onClick={onClose}
      />

      {/* =========================
          CLOSE
      ========================= */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close fullscreen"
        className="
          fixed
          right-5
          top-5
          z-[2147483647]

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full
          bg-white

          text-[#111]

          shadow-2xl

          transition-all
          duration-300

          hover:rotate-90
          hover:scale-110
          hover:bg-[#C89A2A]
          hover:text-white

          md:right-7
          md:top-7
        "
      >
        <FiX size={24} />
      </button>

      {/* =========================
          ZOOM CONTROLS
      ========================= */}

      <div
        className="
          fixed
          left-5
          top-5
          z-[2147483647]

          flex
          gap-2

          md:left-7
          md:top-7
        "
      >
        {/* Zoom Out */}

        <button
          type="button"
          onClick={zoomOut}
          disabled={zoom <= 1}
          aria-label="Zoom out"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full
            bg-white

            text-[#111]

            shadow-xl

            transition

            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <FiMinus size={20} />
        </button>

        {/* Zoom In */}

        <button
          type="button"
          onClick={zoomIn}
          disabled={zoom >= 3}
          aria-label="Zoom in"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full
            bg-white

            text-[#111]

            shadow-xl

            transition

            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <FiPlus size={20} />
        </button>

        {/* Reset */}

        <button
          type="button"
          onClick={resetZoom}
          aria-label="Reset zoom"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full
            bg-white

            text-[#111]

            shadow-xl

            transition

            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white
          "
        >
          <FiRotateCcw size={18} />
        </button>
      </div>

      {/* =========================
          PREVIOUS
      ========================= */}

      {images.length > 1 && (
        <button
          type="button"
          onClick={previous}
          aria-label="Previous image"
          className="
            fixed
            left-5
            top-1/2
            z-[2147483647]

            flex
            h-14
            w-14
            -translate-y-1/2

            items-center
            justify-center

            rounded-full
            bg-white

            text-[#111]

            shadow-2xl

            transition

            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white

            md:left-8
          "
        >
          <FiChevronLeft size={28} />
        </button>
      )}

      {/* =========================
          NEXT
      ========================= */}

      {images.length > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="
            fixed
            right-5
            top-1/2
            z-[2147483647]

            flex
            h-14
            w-14
            -translate-y-1/2

            items-center
            justify-center

            rounded-full
            bg-white

            text-[#111]

            shadow-2xl

            transition

            hover:scale-110
            hover:bg-[#C89A2A]
            hover:text-white

            md:right-8
          "
        >
          <FiChevronRight size={28} />
        </button>
      )}

      {/* =========================
          IMAGE
      ========================= */}

      <div
        className="
          fixed
          inset-0
          z-[2147483646]

          flex
          items-center
          justify-center

          overflow-hidden

          px-20
          py-8

          md:px-28
          lg:px-32
        "
      >
        <div
          className="
            relative
            h-full
            w-full
          "
        >
          <Image
            src={images[activeIndex]}
            alt="Product image"
            fill
            priority
            sizes="100vw"
            draggable={false}
            className="
              select-none
              object-contain

              transition-transform
              duration-300
              ease-out
            "
            style={{
              transform: `scale(${zoom})`,
            }}
          />
        </div>
      </div>
    </div>
  );

  /*
   * IMPORTANT:
   * Render outside the ProductGallery DOM tree.
   * This prevents the website header, sticky bars,
   * transforms, and parent z-index contexts from
   * appearing above the fullscreen viewer.
   */

  return createPortal(
    lightbox,
    document.body
  );
}