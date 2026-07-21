"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EntryBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* ================= SKY ================= */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/intro/sky.png"
          alt="Sky"
          fill
          priority
          quality={100}
          className="object-cover object-center select-none"
        />
      </div>

      {/* ================= SUN GLOW ================= */}
      <motion.div
        className="absolute inset-0 z-[1]"
        animate={{
          opacity: [0.85, 1, 0.85],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/intro/sun-glow.png"
          alt="Sun Glow"
          fill
          quality={100}
          className="object-cover object-center pointer-events-none"
        />
      </motion.div>

      {/* ================= FAR MOUNTAINS ================= */}
      <div className="absolute inset-0 z-[2]">
        <Image
          src="/images/intro/mountains-far.png"
          alt=""
          fill
          quality={100}
          className="object-cover object-center"
        />
      </div>

      {/* ================= MIDDLE MOUNTAINS ================= */}
      <div className="absolute inset-0 z-[3]">
        <Image
          src="/images/intro/mountains-middle.png"
          alt=""
          fill
          quality={100}
          className="object-cover object-center"
        />
      </div>

      {/* ================= TEMPLE ================= */}
      <div className="absolute inset-0 z-[4]">
        <Image
          src="/images/intro/temple.png"
          alt="Temple"
          fill
          quality={100}
          className="object-cover object-center"
        />
      </div>

      {/* ================= FRONT MOUNTAINS ================= */}
      <div className="absolute inset-0 z-[5]">
        <Image
          src="/images/intro/mountains-front.png"
          alt=""
          fill
          quality={100}
          className="object-cover object-center"
        />
      </div>

      {/* ================= MIST ================= */}
      <motion.div
        className="absolute inset-0 z-[6]"
        animate={{
          x: [-20, 20, -20],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Image
          src="/images/intro/mist.png"
          alt="Mist"
          fill
          quality={100}
          className="object-cover object-center opacity-80"
        />
      </motion.div>

      {/* ================= DARK CINEMATIC OVERLAY ================= */}
      <div className="absolute inset-0 z-[10] bg-black/25" />

      {/* ================= SUNLIGHT GLOW ================= */}
      <div
        className="absolute inset-0 z-[11]"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,210,120,.20), transparent 58%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ================= VIGNETTE ================= */}
      <div
        className="absolute inset-0 z-[12]"
        style={{
          background:
            "radial-gradient(circle, transparent 58%, rgba(0,0,0,.75) 100%)",
        }}
      />
    </div>
  );
}