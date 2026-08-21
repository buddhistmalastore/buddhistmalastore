"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

import { QuickViewModalProps } from "./types";
import QuickViewGallery from "./QuickViewGallery";
import QuickViewInfo from "./QuickViewInfo";
import QuickViewActions from "./QuickViewActions";

export default function QuickViewModal({
  product,
  open,
  onClose,
}: QuickViewModalProps) {
  // Close with ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          {/* Modal */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 40,
            }}
            transition={{
              duration: 0.30,
              ease: "easeOut",
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-[110]
              h-[90vh]
              w-[95%]
              max-w-7xl
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              rounded-[32px]
              bg-white
              shadow-2xl
            "
          >
            {/* Close */}

            <button
              onClick={onClose}
              className="
                absolute
                right-6
                top-6
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-white
                shadow-lg
                transition-all
                duration-300
                hover:bg-[#C79B2A]
                hover:text-white
              "
            >
              <FiX size={22} />
            </button>

            <div
              className="
                grid
                h-full
                overflow-y-auto
                lg:grid-cols-2
              "
            >
              {/* LEFT */}

              <QuickViewGallery
                images={product.images}
                name={product.name}
              />

              {/* RIGHT */}

              <div className="p-8 lg:p-12">

                <QuickViewInfo
                  product={product}
                />

                <QuickViewActions
                  product={product}
                />

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}