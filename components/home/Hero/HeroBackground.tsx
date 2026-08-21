"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const heroImages = [
  {
    src: "/images/home/hero-bg.jpg",
    alt: "Buddhist mala with Himalayan and Buddhist surroundings",
    position: "center",
  },
  {
    src: "/images/home/hero-bg2.jpg",
    alt: "Handcrafted amethyst mala being made in the Buddhist Mala Store",
    position: "center",
  },
  {
    src: "/images/home/hero-bg3.jpg",
    alt: "Premium handcrafted citrine mala",
    position: "center",
  },
];

export default function HeroBackground() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (previous) => (previous + 1) % heroImages.length
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* =========================================================
          HERO IMAGE SLIDESHOW
      ========================================================= */}

      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={heroImages[currentImage].src}
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 1.04,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              opacity: {
                duration: 1.8,
                ease: "easeInOut",
              },
              scale: {
                duration: 7,
                ease: "easeOut",
              },
            }}
          >
            <Image
              src={heroImages[currentImage].src}
              alt={heroImages[currentImage].alt}
              fill
              priority={currentImage === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* =========================================================
          BASE CINEMATIC OVERLAY
      ========================================================= */}

      <div className="absolute inset-0 bg-black/10" />

      {/* =========================================================
          LEFT TEXT READABILITY
      ========================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-black/65
          via-black/30
          to-transparent
        "
      />

      {/* =========================================================
          BOTTOM SHADOW
      ========================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/30
          via-transparent
          to-transparent
        "
      />

      {/* =========================================================
          WARM GOLDEN LIGHT
      ========================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_72%_20%,rgba(212,168,75,0.14),transparent_38%)]
        "
      />

      {/* =========================================================
          SOFT VIGNETTE
      ========================================================= */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_52%,rgba(10,7,3,0.15)_100%)]
        "
      />

      {/* =========================================================
          SLIDE INDICATORS
      ========================================================= */}

      <div
        className="
          absolute
          bottom-8
          right-8
          z-20
          flex
          items-center
          gap-2
        "
      >
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            aria-label={`Go to hero image ${index + 1}`}
            className={`
              h-[3px]
              rounded-full
              transition-all
              duration-500
              ${
                currentImage === index
                  ? "w-10 bg-[#D8AA3D]"
                  : "w-5 bg-white/40 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>
    </>
  );
}