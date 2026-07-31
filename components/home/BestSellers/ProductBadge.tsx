"use client";

interface Props {
  badge: string;
}

export default function ProductBadge({ badge }: Props) {
  if (!badge) return null;

  return (
    <div className="absolute left-5 top-5 z-20 rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-semibold text-black">
      {badge}
    </div>
  );
}