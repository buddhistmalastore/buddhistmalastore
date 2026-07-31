"use client";

import { FaStar } from "react-icons/fa";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

export default function ProductRating({
  rating,
  reviewCount,
}: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2">

      {/* Stars */}

      <div className="flex items-center gap-1">

        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={13}
            className={
              star <= Math.round(rating)
                ? "text-[#C79B2A]"
                : "text-[#DDD7CC]"
            }
          />
        ))}

      </div>

      {/* Rating */}

      <span
        className="
          text-sm
          font-semibold
          text-[#2B251F]
        "
      >
        {rating.toFixed(1)}
      </span>

      {/* Reviews */}

      <span
        className="
          text-sm
          text-[#77736F]
        "
      >
        ({reviewCount} Reviews)
      </span>

    </div>
  );
}