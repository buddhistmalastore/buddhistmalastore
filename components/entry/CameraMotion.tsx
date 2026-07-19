"use client";

import { motion } from "framer-motion";

export default function CameraMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{
        scale: [1, 1.02, 1],
        x: [0, 5, 0],
        y: [0, -8, 0],
      }}
      transition={{
        duration: 24,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}