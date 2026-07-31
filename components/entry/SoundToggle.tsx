"use client";

import { useState } from "react";
import { ambience } from "@/lib/audio";
import { motion } from "framer-motion";

export default function SoundToggle() {
  const [playing, setPlaying] = useState(false);

  const toggleSound = () => {
    if (playing) {
      ambience.fade(0.18, 0, 600);

      setTimeout(() => {
        ambience.stop();
      }, 600);

      setPlaying(false);
    } else {
      ambience.play();
      ambience.volume(0);
      ambience.fade(0, 0.18, 1200);

      setPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={toggleSound}
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      className="fixed top-7 right-7 z-[9999] flex h-12 w-12 items-center justify-center rounded-full"
      style={{
        border: "1px solid rgba(255,220,120,.35)",
        background: "rgba(10,10,10,.28)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 0 20px rgba(255,210,120,.15)",
      }}
    >
      <motion.span
        animate={{
          rotate: playing ? 0 : -15,
        }}
        transition={{
          duration: 0.3,
        }}
        style={{
          color: "#FFE9A8",
          fontSize: 20,
        }}
      >
        {playing ? "🔊" : "🔇"}
      </motion.span>
    </motion.button>
  );
}