"use client";

import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";

interface QuickViewButtonProps {
  onClick?: () => void;
}

export default function QuickViewButton({
  onClick,
}: QuickViewButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
      onClick={onClick}
      className="
        absolute
        bottom-5
        left-1/2
        z-20
        flex
        -translate-x-1/2
        items-center
        gap-2
        rounded-full
        bg-white/90
        px-5
        py-3
        text-sm
        font-semibold
        text-[#1A1A1A]
        shadow-xl
        backdrop-blur-md
        transition-all
        duration-300
        hover:bg-[#C79B2A]
        hover:text-white
      "
    >
      <FiEye size={16} />

      Quick View
    </motion.button>
  );
}