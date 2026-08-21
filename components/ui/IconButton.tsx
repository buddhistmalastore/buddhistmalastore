"use client";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function IconButton({
  children,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        border
        border-[#ECE3D3]
        bg-white
        transition-all
        duration-300
        hover:border-[#C79B2A]
        hover:bg-[#C79B2A]
        hover:text-white
        hover:shadow-lg
      "
    >
      {children}
    </button>
  );
}