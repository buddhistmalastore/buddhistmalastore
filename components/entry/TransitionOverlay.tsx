"use client";

import { motion } from "framer-motion";

type Props = {
  active: boolean;
};

export default function TransitionOverlay({ active }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{
        opacity: active ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
      }}
      style={{
        background:
          "radial-gradient(circle at center, rgba(255,225,150,.95) 0%, rgba(255,205,120,.55) 40%, rgba(15,15,16,1) 100%)",
      }}
    />
  );
}