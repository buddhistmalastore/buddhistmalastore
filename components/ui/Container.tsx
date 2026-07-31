import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`
      mx-auto
      w-full
      max-w-[1440px]
      px-5
      lg:px-10
      ${className}
    `}
    >
      {children}
    </div>
  );
}