"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",

        fullWidth && "w-full",

        variant === "primary" &&
          "bg-[#C79B2A] text-[#1A1A1A] hover:bg-[#D6AE4A] hover:-translate-y-1 shadow-lg",

        variant === "secondary" &&
          "bg-[#1A1A1A] text-white hover:bg-black",

        variant === "outline" &&
          "border border-[#C79B2A] bg-white text-[#1A1A1A] hover:bg-[#C79B2A] hover:text-white",

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}