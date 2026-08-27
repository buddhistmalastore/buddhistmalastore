"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  title: string;
  description: string;
  icon: any;
  slug: string;
  index: number;
}

export default function PurposeCard({
  title,
  icon: Icon,
  slug,
  index,
}: Props) {
  /*
   * These positions are ONLY used on desktop.
   * Mobile and tablet use a normal CSS grid.
   */
  const desktopPositions = [
    "lg:left-1/2 lg:top-[3%] lg:-translate-x-1/2",
    "lg:left-[13%] lg:top-[22%]",
    "lg:right-[13%] lg:top-[22%]",
    "lg:left-[4%] lg:top-[50%]",
    "lg:right-[4%] lg:top-[50%]",
    "lg:left-[27%] lg:bottom-[5%]",
    "lg:right-[27%] lg:bottom-[5%]",
  ];

  return (
    <motion.div
      className={`
        relative
        z-20
        w-full
        ${desktopPositions[index]}

        lg:absolute
        lg:w-auto
      `}
      initial={{
        opacity: 0,
        scale: 0.9,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/shop?purpose=${encodeURIComponent(
          slug.split("/").pop() || ""
        )}`}
        className="block w-full lg:w-auto"
      >
        <motion.div
          whileHover={{
            y: -7,
            scale: 1.03,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            group
            relative
            flex
            h-[150px]
            w-full
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-[32px]
            border
            border-[#C89A2A]/35
            bg-[#FBF7F0]
            px-3
            shadow-[0_8px_25px_rgba(80,60,30,0.08)]
            transition-all
            duration-500

            hover:border-[#B88620]
            hover:shadow-[0_16px_40px_rgba(184,134,32,0.18)]

            sm:h-[165px]
            sm:rounded-[40px]

            lg:h-[165px]
            lg:w-[165px]
            lg:rounded-[48%_52%_52%_48%/42%_44%_56%_58%]
          "
        >
          {/* ================================================= */}
          {/* INNER BORDER */}
          {/* ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-2
              rounded-[26px]
              border
              border-[#C89A2A]/15
              transition-all
              duration-500
              group-hover:inset-1
              group-hover:border-[#C89A2A]/45
              sm:rounded-[34px]
              lg:rounded-[48%_52%_52%_48%/42%_44%_56%_58%]
            "
          />

          {/* ================================================= */}
          {/* GLOW */}
          {/* ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,rgba(212,167,44,0.15),transparent_65%)]
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* ================================================= */}
          {/* ICON */}
          {/* ================================================= */}

          <div
            className="
              relative
              z-10
              mb-2
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-[#C89A2A]/25
              bg-[#F7F0E3]
              text-[#B88620]
              transition-all
              duration-500

              group-hover:scale-110
              group-hover:bg-[#C89A2A]
              group-hover:text-white

              sm:mb-3
              sm:h-11
              sm:w-11
            "
          >
            <Icon
              size={21}
              strokeWidth={1.5}
            />
          </div>

          {/* ================================================= */}
          {/* TITLE */}
          {/* ================================================= */}

          <h3
            className="
              relative
              z-10
              max-w-[130px]
              text-center
              text-[13px]
              font-semibold
              leading-5
              text-[#27231E]
              transition-transform
              duration-300
              group-hover:-translate-y-1
              sm:text-sm
            "
          >
            {title}
          </h3>

          {/* ================================================= */}
          {/* EXPLORE */}
          {/* ================================================= */}

          <span
            className="
              absolute
              bottom-4
              z-20
              text-[9px]
              font-semibold
              uppercase
              tracking-[1.5px]
              text-[#B88620]
              opacity-0
              transition-all
              duration-500
              group-hover:opacity-100
              sm:bottom-5
              sm:text-[10px]
            "
          >
            Explore →
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}