"use client";

interface Props {
  badge?: string;
}

export default function ProductBadge({ badge }: Props) {
  if (!badge) return null;

  return (
    <div
      className="
        absolute
        left-4
        top-4
        z-20
        rounded-full
        border
        border-[#C89A2A]/30
        bg-[#C89A2A]
        px-4
        py-1.5
        text-[11px]
        font-semibold
        uppercase
        tracking-[1px]
        text-white
        shadow-sm
      "
    >
      {badge}
    </div>
  );
}