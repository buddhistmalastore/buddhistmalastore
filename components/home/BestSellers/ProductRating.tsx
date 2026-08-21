"use client";

import { Star } from "lucide-react";

interface Props {
  rating: number;
}

export default function ProductRating({ rating }: Props) {
  return (
    <div
      className="
        flex
        items-center
        gap-0.5
        text-[#C89A2A]
      "
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={15}
          strokeWidth={1.8}
          fill={i < rating ? "#C89A2A" : "transparent"}
        />
      ))}
    </div>
  );
}