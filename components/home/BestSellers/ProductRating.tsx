"use client";

import { Star } from "lucide-react";

interface Props {
  rating: number;
}

export default function ProductRating({ rating }: Props) {
  return (
    <div className="flex gap-1 text-[#D4AF37]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "#D4AF37" : "transparent"}
        />
      ))}
    </div>
  );
}