"use client";

import { motion } from "framer-motion";

interface ProductBadgeProps {
  badge?: "New" | "Best Seller" | "Limited" | "Sale";
}

const badgeColors = {
  New: "bg-[#1F6B52]",
  "Best Seller": "bg-[#C79B2A]",
  Limited: "bg-[#7B1E1E]",
  Sale: "bg-[#B86A00]",
};

export default function ProductBadge({
  badge,
}: ProductBadgeProps) {
  if (!badge) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`
        absolute
        left-4
        top-4
        z-20
        rounded-full
        px-3
        py-1
        text-[11px]
        font-semibold
        uppercase
        tracking-[2px]
        text-white
        shadow-md
        ${badgeColors[badge]}
      `}
    >
      {badge}
    </motion.div>
  );
}