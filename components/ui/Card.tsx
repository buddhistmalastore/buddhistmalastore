"use client";

import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        `
        rounded-[24px]
        border
        border-[#ECE3D3]
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        `,
        className
      )}
    >
      {children}
    </div>
  );
}