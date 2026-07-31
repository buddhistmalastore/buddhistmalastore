"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroBackground() {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 18,
          ease: "easeOut",
        }}
      >
        <Image
          src="/images/home/hero-bg.jpg"
          alt="Luxury Citrine Mala"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/50" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,.65), rgba(0,0,0,.2), rgba(0,0,0,.55))",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at left, rgba(255,208,96,.18), transparent 55%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(0,0,0,.45) 100%)",
        }}
      />
    </>
  );
}