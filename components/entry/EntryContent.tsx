"use client";

import { motion } from "framer-motion";
import EntryLogo from "./EntryLogo";
import EnterButton from "./EnterButton";

export default function EntryContent() {
  return (
    <section className="fixed inset-0 z-50">

      {/* Dharma Wheel */}
      <div className="absolute left-1/2 top-[43%] -translate-x-1/2 -translate-y-1/2">
        <EntryLogo />
      </div>

      {/* Brand Text */}
      <motion.div
        className="absolute left-1/2 top-[63%] -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.8,
          delay: 0.8,
        }}
      >
        <h1
          className="heading-font"
          style={{
            fontSize: "56px",
            color: "#F8E8B5",
            letterSpacing: "8px",
            textShadow: "0 0 30px rgba(255,220,120,.45)",
            fontWeight: 600,
          }}
        >
          BUDDHIST MALA STORE
        </h1>

        <motion.p
          className="elegant-font"
          style={{
            marginTop: 18,
            color: "#E9D7A2",
            fontSize: 26,
            letterSpacing: "3px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.8,
            duration: 1.2,
          }}
        >
          Handcrafted in Nepal
        </motion.p>

        <motion.p
          className="elegant-font"
          style={{
            marginTop: 12,
            color: "#d7c69a",
            fontSize: 20,
            letterSpacing: "2px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 2.8,
            duration: 1.2,
          }}
        >
          Every Bead Holds A Story
          <div className="mt-12 flex justify-center">
  <EnterButton />
</div>
        </motion.p>

      </motion.div>

    </section>
  );
}