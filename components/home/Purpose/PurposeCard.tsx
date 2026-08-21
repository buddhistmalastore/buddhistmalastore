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
   * Seven cards arranged around the Dharma Wheel.
   *
   *        1
   *     2     3
   *   4         5
   *      6   7
   */

  const positions = [
    // 1 — Prosperity
    "left-1/2 top-[3%] -translate-x-1/2",

    // 2 — Love & Compassion
    "left-[13%] top-[22%]",

    // 3 — Meditation
    "right-[13%] top-[22%]",

    // 4 — Protection
    "left-[4%] top-[50%]",

    // 5 — Healing
    "right-[4%] top-[50%]",

    // 6 — Prayer
    "left-[27%] bottom-[5%]",

    // 7 — Gift Collection
    "right-[27%] bottom-[5%]",
  ];

  return (
    <motion.div
      className={`absolute z-20 ${positions[index]}`}
      initial={{
        opacity: 0,
        scale: 0.8,
        y: 20,
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
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        href={`/shop?purpose=${encodeURIComponent(
          slug.split("/").pop() || ""
        )}`}
        className="block"
      >
        <motion.div
          whileHover={{
            y: -10,
            scale: 1.07,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            group
            relative
            flex
            h-[150px]
            w-[150px]
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-[48%_52%_52%_48%/42%_44%_56%_58%]
            border
            border-[#C89A2A]/40
            bg-[#FBF7F0]
            shadow-[0_12px_35px_rgba(80,60,30,0.10)]
            transition-all
            duration-500
            hover:border-[#B88620]
            hover:shadow-[0_20px_50px_rgba(184,134,32,0.22)]
            md:h-[165px]
            md:w-[165px]
          "
        >
          {/* Inner Decorative Border */}

          <div
            className="
              pointer-events-none
              absolute
              inset-2
              rounded-[48%_52%_52%_48%/42%_44%_56%_58%]
              border
              border-[#C89A2A]/15
              transition-all
              duration-500
              group-hover:inset-1
              group-hover:border-[#C89A2A]/50
            "
          />

          {/* Soft Hover Glow */}

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

          {/* Icon */}

          <div
            className="
              relative
              z-10
              mb-3
              flex
              h-11
              w-11
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
            "
          >
            <Icon size={22} strokeWidth={1.5} />
          </div>

          {/* Title */}

          <h3
            className="
              relative
              z-10
              max-w-[125px]
              text-center
              text-sm
              font-semibold
              leading-5
              text-[#27231E]
              transition-all
              duration-300
              group-hover:-translate-y-1
            "
          >
            {title}
          </h3>

          {/* Explore */}

          <span
            className="
              absolute
              bottom-5
              z-20
              translate-y-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[1.5px]
              text-[#B88620]
              opacity-0
              transition-all
              duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            Explore →
          </span>
        </motion.div>
      </Link>
    </motion.div>
  );
}