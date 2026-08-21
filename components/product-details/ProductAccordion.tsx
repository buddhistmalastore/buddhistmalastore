"use client";

import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ProductAccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export default function ProductAccordion({
  title,
  defaultOpen = false,
  children,
}: ProductAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="
        border-b
        border-[#ECE3D3]
      "
    >
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between

          py-5

          text-left

          transition-all
          duration-300

          hover:text-[#C79B2A]
        "
      >
        <span
          className="
            text-[15px]
            font-semibold
            text-[#1A1A1A]
          "
        >
          {title}
        </span>

        <motion.div
          animate={{
            rotate: open ? 90 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <FiChevronRight
            size={18}
          />
        </motion.div>

      </button>

      {/* Content */}

      <AnimatePresence initial={false}>

        {open && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              {children}
            </div>
          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}