"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnterButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEnter = () => {
    if (loading) return;

    setLoading(true);

    sessionStorage.setItem("introSeen", "true");

    setTimeout(() => {
      router.push("/home");
    }, 1000);
  };

  return (
    <motion.button
      onClick={handleEnter}
      disabled={loading}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3.5, duration: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="group relative overflow-hidden rounded-full border border-[#d4af37] px-12 py-4"
      style={{
        background:
          "linear-gradient(180deg, rgba(30,25,15,.55), rgba(10,10,10,.35))",
      }}
    >
      <span
        className="relative z-10 heading-font"
        style={{
          color: "#F5E6B3",
          letterSpacing: "5px",
        }}
      >
        {loading ? "ENTERING..." : "ENTER THE JOURNEY"}
      </span>
    </motion.button>
  );
}