"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export default function LuxuryCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 1000,
    damping: 16,
    mass: 0.22,
  });

  const smoothY = useSpring(y, {
    stiffness: 1000,
    damping: 16,
    mass: 0.22,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
      }}
      className="pointer-events-none fixed z-[99999]"
    >
      {/* Outer Glow */}
      <div
        style={{
          position: "absolute",
          width: 28,
          height: 28,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,214,122,.35) 0%, rgba(255,214,122,.15) 45%, transparent 75%)",
          filter: "blur(6px)",
        }}
      />

      {/* Ring */}
      <div
        style={{
          position: "absolute",
          width: 18,
          height: 18,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid rgba(255,214,122,.65)",
        }}
      />

      {/* Center Dot */}
      <div
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "#FFD67A",
          boxShadow: "0 0 12px rgba(255,214,122,.9)",
        }}
      />
    </motion.div>
  );
}