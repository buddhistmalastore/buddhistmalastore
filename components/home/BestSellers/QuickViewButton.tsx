"use client";

export default function QuickViewButton() {
  return (
    <button
      className="
      absolute
      bottom-5
      left-1/2
      -translate-x-1/2
      rounded-full
      bg-[#D4AF37]
      px-6
      py-3
      text-sm
      font-semibold
      text-black
      opacity-0
      transition-all
      duration-500
      group-hover:bottom-8
      group-hover:opacity-100
    "
    >
      Quick View
    </button>
  );
}