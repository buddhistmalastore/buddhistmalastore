"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";

interface GalleryControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  disable?: boolean;
}

export default function GalleryControls({
  onPrevious,
  onNext,
  disable = false,
}: GalleryControlsProps) {
  if (disable) return null;

  return (
    <div className="flex items-center justify-center gap-4">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevious}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#ECE3D3]
          bg-white
          text-[#1A1A1A]
          shadow-sm
          transition-all
          duration-300
          hover:border-[#C79B2A]
          hover:bg-[#C79B2A]
          hover:text-white
          hover:shadow-lg
        "
      >
        <FiChevronLeft size={20} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#ECE3D3]
          bg-white
          text-[#1A1A1A]
          shadow-sm
          transition-all
          duration-300
          hover:border-[#C79B2A]
          hover:bg-[#C79B2A]
          hover:text-white
          hover:shadow-lg
        "
      >
        <FiChevronRight size={20} />
      </motion.button>
    </div>
  );
}