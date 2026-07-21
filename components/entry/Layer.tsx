"use client";

import Image from "next/image";
import { forwardRef, ForwardedRef } from "react";
import { motion } from "framer-motion";

export type LayerProps = {
  src: string;
  alt?: string;

  // Layer order
  z: number;

  // Transform
  scale?: number;
  x?: number;
  y?: number;

  // Visuals
  opacity?: number;

  // Animation
  pulse?: boolean;
  drift?: boolean;

  // Image
  priority?: boolean;
  objectPosition?: string;

  // Extra styling
  className?: string;
};

const Layer = forwardRef(function Layer(
  {
    src,
    alt = "",

    z,

    scale = 1,
    x = 0,
    y = 0,

    opacity = 1,

    pulse = false,
    drift = false,

    priority = false,

    objectPosition = "center",

    className = "",
  }: LayerProps,

  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{
        zIndex: z,
      }}
      initial={false}
      animate={{
        scale: pulse
          ? [scale, scale + 0.02, scale]
          : scale,

        opacity: pulse
          ? [opacity * 0.9, opacity, opacity * 0.9]
          : opacity,

        x: drift
          ? [-25, 25, -25]
          : x,

        y,
      }}
      transition={
        pulse || drift
          ? {
              duration: drift ? 45 : 8,
              repeat: Infinity,
              ease: drift ? "linear" : "easeInOut",
            }
          : undefined
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={100}
        draggable={false}
        style={{
          objectPosition,
        }}
        className="
          object-cover
          pointer-events-none
          select-none
        "
      />
    </motion.div>
  );
});

Layer.displayName = "Layer";

export default Layer;