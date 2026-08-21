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
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#C89A2A]/15
        bg-[#FBF7F0]
        p-8
        shadow-[0_8px_30px_rgba(80,60,30,0.04)]
        transition-all
        duration-500
        hover:border-[#C89A2A]/45
        hover:shadow-[0_20px_50px_rgba(80,60,30,0.10)]
      "
    >
      {/* Decorative Glow */}

      <div
        className="
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-[#C89A2A]/5
          transition-all
          duration-700
          group-hover:scale-150
          group-hover:bg-[#C89A2A]/10
        "
      />

      {/* Icon */}

      <div
        className="
          relative
          mb-7
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-[#C89A2A]/20
          bg-[#F3EBDD]
          text-[#B88620]
          transition-all
          duration-500
          group-hover:border-[#C89A2A]
          group-hover:bg-[#C89A2A]
          group-hover:text-white
        "
      >
        <Icon
          className="
            text-2xl
            transition-transform
            duration-500
            group-hover:scale-110
            group-hover:rotate-6
          "
        />
      </div>

      {/* Title */}

      <h3
        className="
          relative
          heading-font
          text-2xl
          font-semibold
          text-[#29251F]
        "
      >
        {title}
      </h3>

      {/* Description */}

      <p
        className="
          relative
          mt-4
          leading-7
          text-[#6F685F]
        "
      >
        {desc}
      </p>

      {/* Bottom Accent */}

      <div
        className="
          mt-7
          h-px
          w-10
          bg-[#C89A2A]/40
          transition-all
          duration-500
          group-hover:w-20
          group-hover:bg-[#C89A2A]
        "
      />
    </motion.div>
  );
}