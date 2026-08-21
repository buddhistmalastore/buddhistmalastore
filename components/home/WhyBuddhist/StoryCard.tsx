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
    <div
      className="
        group
        h-[430px]
        w-full
        [perspective:1600px]
      "
    >
      <motion.div
        className="
          relative
          h-full
          w-full
          cursor-pointer
          [transform-style:preserve-3d]
          will-change-transform
        "
        initial={false}
        whileHover={{
          rotateY: 180,
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* ================================================= */}
        {/* FRONT */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-[24px]
            border
            border-[#E5DCCF]
            bg-white
            shadow-[0_10px_35px_rgba(40,30,20,0.08)]
            [backface-visibility:hidden]
            [transform:translateZ(1px)]
          "
        >
          {/* Image */}

          <div className="relative h-[350px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1279px) 50vw,
                25vw
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.02]
              "
            />
          </div>

          {/* Title */}

          <div
            className="
              flex
              h-[80px]
              items-center
              justify-center
              bg-white
              px-5
            "
          >
            <h3
              className="
                heading-font
                text-center
                text-xl
                font-semibold
                leading-tight
                text-[#1A1A1A]
              "
            >
              {title}
            </h3>
          </div>
        </div>

        {/* ================================================= */}
        {/* BACK */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
            rounded-[24px]
            border
            border-[#C89A2A]/40
            bg-[#FFFDF9]
            p-8
            text-center
            shadow-[0_18px_50px_rgba(40,30,20,0.12)]
            [backface-visibility:hidden]
            [transform:rotateY(180deg)_translateZ(1px)]
          "
        >
          {/* Decorative Gold Mark */}

          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-10 bg-[#C89A2A]/40" />
          </div>

          {/* Title */}

          <h3
            className="
              heading-font
              text-2xl
              font-semibold
              leading-tight
              text-[#1A1A1A]
            "
          >
            {title}
          </h3>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-sm
              text-sm
              leading-7
              text-[#666666]
            "
          >
            {description}
          </p>

          {/* Read More */}

          <button
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              border-b
              border-[#C89A2A]/50
              pb-1
              text-sm
              font-semibold
              text-[#A77D20]
              transition-all
              duration-300
              hover:gap-3
              hover:border-[#C89A2A]
              hover:text-[#C89A2A]
            "
          >
            Read More
            <span
              className="
                transition-transform
                duration-300
              "
            >
              →
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}