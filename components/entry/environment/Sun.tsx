"use client";

import { motion } from "framer-motion";

export default function Sun() {
  return (
    <>
      {/* SUN */}

      <motion.div
        className="absolute left-1/2 z-[8]"
        style={{
          width: 520,
          height: 520,
          marginLeft: -260,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle,#FFF7DB 0%,#FFE37E 18%,#FFC44D 45%,rgba(255,180,60,.35) 70%,rgba(255,180,60,0) 100%)",
          filter: "blur(10px)",
        }}
        initial={{
          bottom: "-20%",
          opacity: 0,
          scale: .5,
        }}
        animate={{
          bottom: "24%",
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 8,
          ease: [0.22,1,0.36,1],
        }}
      />

      {/* BLOOM */}

      <motion.div
        className="absolute left-1/2 z-[7]"
        style={{
          width: 900,
          height: 900,
          marginLeft: -450,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle,rgba(255,220,120,.35) 0%,rgba(255,200,80,.15) 45%,transparent 80%)",
          filter: "blur(80px)",
        }}
        initial={{
          bottom: "-18%",
          opacity: 0,
          scale: .5,
        }}
        animate={{
          bottom: "18%",
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 9,
          ease: "easeOut",
        }}
      />

      {/* SUN PULSE */}

      <motion.div
        className="absolute left-1/2 z-[9]"
        style={{
          width: 520,
          height: 520,
          marginLeft: -260,
          borderRadius: "9999px",
          background:
            "radial-gradient(circle,rgba(255,240,180,.25),transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={{
          scale: [1,1.08,1],
          opacity: [.35,.6,.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}