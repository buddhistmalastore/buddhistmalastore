"use client";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface RatingProps {
  rating: number;
  reviews?: number;
}

export default function Rating({
  rating,
  reviews,
}: RatingProps) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <FaStar
          key={i}
          className="text-[#C79B2A]"
        />
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          className="text-[#C79B2A]"
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          className="text-[#C79B2A]"
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 text-sm">
        {stars}
      </div>

      <span className="text-sm text-[#666]">
        {rating.toFixed(1)}

        {reviews !== undefined && (
          <> ({reviews})</>
        )}
      </span>
    </div>
  );
}