import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "rounded-2xl px-6 py-3 font-medium transition-all duration-300";

  const styles = {
    primary:
      "bg-[#C8A951] text-white hover:bg-[#B5933F] shadow-md hover:shadow-lg",
    secondary:
      "border border-[#6F4E37] text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white",
  };

  return (
    <button
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}