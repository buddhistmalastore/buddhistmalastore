"use client";

interface QuickViewButtonProps {
  onClick: () => void;
}

export default function QuickViewButton({
  onClick,
}: QuickViewButtonProps) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }}
      className="
        absolute
        bottom-5
        left-1/2
        z-20
        flex
        -translate-x-1/2
        translate-y-3
        items-center
        justify-center
        whitespace-nowrap
        rounded-full
        border
        border-[#C89A2A]
        bg-white/95
        px-7
        py-2.5
        text-sm
        font-semibold
        tracking-wide
        text-[#8F691A]
        opacity-0
        shadow-[0_8px_25px_rgba(0,0,0,0.12)]
        backdrop-blur-md
        transition-all
        duration-500
        ease-out
        group-hover:translate-y-0
        group-hover:opacity-100
        hover:bg-[#C89A2A]
        hover:text-white
      "
    >
      Quick View
    </button>
  );
}