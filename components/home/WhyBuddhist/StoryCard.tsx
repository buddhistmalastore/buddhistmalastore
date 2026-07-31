"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  image: string;
  description: string;
}

export default function StoryCard({
  title,
  image,
  description,
}: Props) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="
      group
      overflow-hidden
      rounded-[30px]
      border
      border-[#D4AF37]/20
      bg-[#111]
      shadow-xl
    "
    >
      <div className="relative h-[340px] overflow-hidden">

        <Image
          src={image}
          alt={title}
          fill
          className="
          object-cover
          transition
          duration-700
          group-hover:scale-110
        "
        />

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-black/30
          to-transparent
        "
        />

      </div>

      <div className="p-8">

        <h3
          className="
          heading-font
          text-3xl
          text-[#F7F3EC]
        "
        >
          {title}
        </h3>

        <p
          className="
          mt-5
          leading-8
          text-[#D9D5CC]
        "
        >
          {description}
        </p>

        <button
          className="
          mt-8
          text-[#D4AF37]
          transition
          group-hover:translate-x-2
        "
        >
          Read Story →
        </button>

      </div>
    </motion.div>
  );
}