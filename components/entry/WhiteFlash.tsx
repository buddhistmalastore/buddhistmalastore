"use client";

import { AnimatePresence, motion } from "framer-motion";

type Props = {
  active: boolean;
};

export default function WhiteFlash({ active }: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[999999]"
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            background:
              "radial-gradient(circle at center, #FFFDF8 0%, #FFF7E5 45%, #F8EAC6 100%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}