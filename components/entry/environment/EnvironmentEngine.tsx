"use client";

import { motion } from "framer-motion";

import Sun from "./Sun";
import GodRays from "./GodRays";
import DustParticles from "./DustParticles";
import AmbientAudio from "./AmbientAudio";

export default function EnvironmentEngine() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      <AmbientAudio />

      {/* Cinematic Camera */}
      <motion.div
        className="absolute inset-0"
        initial={{
          scale: 1.08,
          y: 15,
        }}
        animate={{
          scale: 1.03,
          y: 0,
        }}
        transition={{
          duration: 18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Background */}
        <img
          src="/images/intro/final-bg.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
        />

        {/* Sun */}
        <Sun />

        {/* God Rays */}
        <GodRays />

        {/* Back Mist */}
        <motion.img
          src="/images/intro/mist.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none z-[20]"
          animate={{
            x: [-30, 30, -30],
            opacity: [0.10, 0.22, 0.10],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dust */}
        <DustParticles />

        {/* Front Mist */}
        <motion.img
          src="/images/intro/mist.png"
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none z-[25]"
          style={{
            transform: "scale(1.05)",
          }}
          animate={{
            x: [25, -25, 25],
            opacity: [0.06, 0.14, 0.06],
          }}
          transition={{
            duration: 36,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Atmosphere */}
      <motion.div
        className="absolute inset-0 z-[30]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{
          delay: 2,
          duration: 6,
        }}
        style={{
          background:
            "linear-gradient(to top, rgba(255,190,80,.10), transparent 45%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[40]"
        style={{
          background:
            "radial-gradient(circle, transparent 60%, rgba(0,0,0,.55) 100%)",
        }}
      />
    </div>
  );
}