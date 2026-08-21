"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  reverse?: boolean;
}

export default function CraftStep({
  title,
  subtitle,
  description,
  image,
  reverse,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`
        grid
        items-center
        gap-16
        lg:grid-cols-2
        ${reverse ? "lg:[&>*:first-child]:order-2" : ""}
      `}
    >
      <div className="overflow-hidden rounded-[32px]">
        <Image
          src={image}
          alt={title}
          width={700}
          height={800}
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
        />
      </div>

      <div>
        <p className="mb-4 uppercase tracking-[5px] text-[#D4AF37]">
          {subtitle}
        </p>

        <h3 className="heading-font text-4xl text-[#F7F3EC]">
          {title}
        </h3>

        <p className="mt-6 text-lg leading-9 text-[#CFC7B8]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}