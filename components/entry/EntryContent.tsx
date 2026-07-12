"use client";
import { siteConfig } from "@/data/site";
import { motion } from "framer-motion";
import EnterButton from "./EnterButton";

export default function EntryContent() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">

      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-4 uppercase tracking-[0.45em] text-[#C8A951]"
      >
        Handcrafted in Nepal
      </motion.p>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-5xl font-bold md:text-7xl"
      >
        {siteConfig.name}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-6 max-w-2xl text-lg text-gray-300"
      >
        {siteConfig.tagline}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-3 text-[#C8A951]"
      >
       {siteConfig.slogan}
      </motion.p>

      <div className="mt-10">
        <EnterButton />
      </div>

    </div>
  );
}