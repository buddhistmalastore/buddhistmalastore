"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  icon: any;
  slug: string;
}

export default function PurposeCard({
  title,
  description,
  icon: Icon,
  slug,
}: Props) {
  return (
    <Link href={slug}>
      <motion.div
        whileHover={{
          y: -8,
          scale: 1.02,
        }}
        transition={{ duration: 0.3 }}
        className="
        group
        rounded-[28px]
        border
        border-[#D4AF37]/20
        bg-[#111]
        p-8
        transition-all
        duration-500
        hover:border-[#D4AF37]
        hover:shadow-[0_0_40px_rgba(212,175,55,.18)]
      "
      >
        <div
          className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#D4AF37]/10
          text-[#D4AF37]
        "
        >
          <Icon size={30} />
        </div>

        <h3 className="heading-font text-2xl text-[#F7F3EC]">
          {title}
        </h3>

        <p className="mt-5 leading-8 text-[#D8D3CB]">
          {description}
        </p>

        <div
          className="
          mt-8
          text-[#D4AF37]
          transition-all
          group-hover:translate-x-2
        "
        >
          Explore →
        </div>
      </motion.div>
    </Link>
  );
}