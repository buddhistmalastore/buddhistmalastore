"use client";

import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "red" | "green" | "gray";
}

export default function Badge({
  children,
  variant = "gold",
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide",

        variant === "gold" &&
          "bg-[#F6F1E7] text-[#C79B2A]",

        variant === "red" &&
          "bg-red-100 text-red-600",

        variant === "green" &&
          "bg-green-100 text-green-600",

        variant === "gray" &&
          "bg-gray-100 text-gray-600"
      )}
    >
      {children}
    </span>
  );
}