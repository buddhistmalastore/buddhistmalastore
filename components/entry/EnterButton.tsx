"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function EnterButton() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
    >
      <Link
        href="/home"
        className="rounded-full bg-[#C8A951] px-8 py-4 text-lg font-semibold text-black transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        Enter Store
      </Link>
    </motion.div>
  );
}