"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface Props {
  title: string;
  desc: string;
  icon: IconType;
}

export default function WhyCard({
  title,
  desc,
  icon: Icon,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
      className="
      group
      rounded-[30px]
      border
      border-[#D4AF3720]
      bg-[#111111]
      p-10
      transition-all
      duration-500
      hover:border-[#D4AF37]
      hover:shadow-[0_20px_50px_rgba(212,175,55,.15)]
    "
    >
      <Icon
        className="
        mb-8
        text-5xl
        text-[#D4AF37]
        transition-transform
        duration-500
        group-hover:rotate-6
      "
      />

      <h3 className="heading-font text-3xl text-[#F7F3EC]">
        {title}
      </h3>

      <p className="mt-6 leading-8 text-[#CFC7B8]">
        {desc}
      </p>
    </motion.div>
  );
}