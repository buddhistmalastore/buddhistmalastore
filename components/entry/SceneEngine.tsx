"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
};

export default function SceneEngine({ children }: Props) {
  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      initial={false}
      animate={{
        scale: [1, 1.015, 1],
        y: [0, -6, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}