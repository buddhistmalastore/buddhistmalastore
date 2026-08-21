"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  onClick?: () => void;
};

export default function EnterButton({ onClick }: Props) {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative"
    >
      <motion.button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        transition={{
          duration: 0.35,
        }}
        className="relative overflow-hidden rounded-full px-14 py-5"
        style={{
          border: "1px solid rgba(255,215,120,.65)",
          background:
            "linear-gradient(180deg, rgba(20,20,20,.62), rgba(8,8,8,.38))",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Slow luxury shine */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: ["-180%", "220%"],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "linear",
          }}
          style={{
            background:
              "linear-gradient(100deg, transparent 35%, rgba(255,255,255,.20) 50%, transparent 65%)",
            transform: "skewX(-25deg)",
          }}
        />

        {/* Soft breathing glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            opacity: hover ? 1 : 0.55,
            boxShadow: hover
              ? "0 0 45px rgba(255,210,120,.45)"
              : [
                  "0 0 8px rgba(255,210,120,.15)",
                  "0 0 22px rgba(255,210,120,.28)",
                  "0 0 8px rgba(255,210,120,.15)",
                ],
          }}
          transition={{
            duration: hover ? 0.3 : 6,
            repeat: hover ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Button Text */}
        <motion.div
          animate={{
            color: hover ? "#FFF5D8" : "#F6E5B2",
          }}
          transition={{
            duration: 0.3,
          }}
          className="relative z-10 heading-font text-center"
          style={{
            fontSize: "18px",
            letterSpacing: "5px",
            fontWeight: 600,
            textShadow:
              "0 2px 6px rgba(0,0,0,.55),0 0 18px rgba(255,220,120,.25)",
          }}
        >
          ENTER THE JOURNEY
        </motion.div>
      </motion.button>

      {/* Hover Text */}
      <motion.div
        initial={false}
        animate={{
          opacity: hover ? 1 : 0,
          y: hover ? 0 : -6,
        }}
        transition={{
          duration: 0.35,
        }}
        className="absolute left-1/2 mt-4 -translate-x-1/2 whitespace-nowrap pointer-events-none"
        style={{
          color: "#E9D7A2",
          fontSize: "13px",
          letterSpacing: "2px",
          fontStyle: "italic",
        }}
      >
        Crafted with Devotion • Enter →
      </motion.div>
    </motion.div>
  );
}