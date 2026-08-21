import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-[var(--border)]
        bg-[var(--surface)]
        shadow-[var(--shadow-soft)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}