"use client";

import { motion } from "framer-motion";
import { stats } from "./reviews";

export default function Stats() {
  return (
    <div className="grid gap-8 md:grid-cols-4">

      {stats.map((item) => (
        <motion.div
          key={item.label}
          whileHover={{ y: -8 }}
          className="
          rounded-3xl
          border
          border-[#D4AF3720]
          bg-[#111]
          p-8
          text-center
        "
        >
          <h3 className="heading-font text-5xl text-[#D4AF37]">
            {item.number}
          </h3>

          <p className="mt-3 text-[#CFC7B8]">
            {item.label}
          </p>

        </motion.div>
      ))}

    </div>
  );
}