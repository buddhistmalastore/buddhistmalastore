"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <div
      className="
        group
        h-[400px]
        w-full
        [perspective:1600px]
        sm:h-[430px]
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
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        whileHover={{
          rotateY: 180,
        }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        onClick={handleCardClick}
      >
        {/* ================================================= */}
        {/* FRONT */}
        {/* ================================================= */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-[22px]
            border
            border-[#E5DCCF]
            bg-white
            shadow-[0_10px_35px_rgba(40,30,20,0.08)]
            [backface-visibility:hidden]
            [transform:translateZ(1px)]
            sm:rounded-[24px]
          "
        >
          {/* Image */}

          <div
            className="
              relative
              h-[320px]
              overflow-hidden
              sm:h-[350px]
            "
          >
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

            {/* Mobile tap hint */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-4
                left-1/2
                -translate-x-1/2
                rounded-full
                bg-black/45
                px-3
                py-1.5
                text-[10px]
                font-medium
                tracking-wide
                text-white/90
                backdrop-blur-sm
                sm:hidden
              "
            >
              Tap to explore
            </div>
          </div>

          {/* Title */}

          <div
            className="
              flex
              h-[80px]
              items-center
              justify-center
              bg-white
              px-4
              sm:px-5
            "
          >
            <h3
              className="
                heading-font
                text-center
                text-lg
                font-semibold
                leading-tight
                text-[#1A1A1A]
                sm:text-xl
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
            rounded-[22px]
            border
            border-[#C89A2A]/40
            bg-[#FFFDF9]
            p-6
            text-center
            shadow-[0_18px_50px_rgba(40,30,20,0.12)]
            [backface-visibility:hidden]
            [transform:rotateY(180deg)_translateZ(1px)]
            sm:rounded-[24px]
            sm:p-8
          "
        >
          {/* Decorative Gold Mark */}

          <div className="mb-5 flex items-center gap-3 sm:mb-7">
            <span className="h-px w-8 bg-[#C89A2A]/40 sm:w-10" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-8 bg-[#C89A2A]/40 sm:w-10" />
          </div>

          {/* Title */}

          <h3
            className="
              heading-font
              text-xl
              font-semibold
              leading-tight
              text-[#1A1A1A]
              sm:text-2xl
            "
          >
            {title}
          </h3>

          {/* Description */}

          <p
            className="
              mt-4
              max-w-sm
              text-[13px]
              leading-6
              text-[#666666]
              sm:mt-5
              sm:text-sm
              sm:leading-7
            "
          >
            {description}
          </p>

          {/* Read More */}

          <Link
            href="/about"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className="
              mt-6
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
              sm:mt-8
            "
          >
            Read More

            <span
              aria-hidden="true"
              className="
                transition-transform
                duration-300
              "
            >
              →
            </span>
          </Link>

          {/* Mobile Back Hint */}

          <span
            className="
              mt-5
              text-[10px]
              uppercase
              tracking-[1.5px]
              text-[#A59B8D]
              sm:hidden
            "
          >
            Tap card to return
          </span>
        </div>
      </motion.div>
    </div>
  );
}