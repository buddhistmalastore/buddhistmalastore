"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type BirdProps = {
  image: string;
  top: string;
  size: number;
  duration: number;
  delay?: number;
};

export default function Bird({
  image,
  top,
  size,
  duration,
  delay = 0,
}: BirdProps) {
  return (
    <motion.div
      className="absolute pointer-events-none z-20"
      style={{
        top,
        left: "-12%",
      }}
      initial={{
        x: 0,
        opacity: 0,
      }}
      animate={{
        x: "125vw",
        y: [0, -18, 8, -12, 0],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    >
      <motion.div
        animate={{
          rotate: [-4, 5, -4],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={`/images/intro/birds/${image}`}
          alt="Bird"
          width={size}
          height={size}
          draggable={false}
          priority={false}
        />
      </motion.div>
    </motion.div>
  );
}