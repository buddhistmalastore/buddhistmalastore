"use client";

import { motion } from "framer-motion";
import useIntroTimeline from "./hooks/useIntroTimeline";

export default function Sunrise() {
  const phase = useIntroTimeline();

  if (phase < 1) return null;

  return (
    <motion.div
      className="absolute inset-0 z-[-15] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 3,
        ease: "easeOut",
      }}
    >
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,214,120,.45), rgba(255,180,0,.15), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </motion.div>
  );
}