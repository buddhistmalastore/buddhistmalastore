"use client";

import {
  FiCheckCircle,
} from "react-icons/fi";

interface ReviewCardProps {
  name: string;
  country: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  verified?: boolean;
}

export default function ReviewCard({
  name,
  country,
  rating,
  date,
  title,
  review,
  verified = true,
}: ReviewCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#ECE3D3]
        bg-white
        p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Rating */}

      <div className="flex items-center justify-between">

        <div className="text-[#D4A017] text-lg">

          {Array.from({
            length: rating,
          }).map((_, i) => (
            <span key={i}>★</span>
          ))}

        </div>

        <span className="text-sm text-[#888]">
          {date}
        </span>

      </div>

      {/* Title */}

      <h3 className="mt-5 text-xl font-semibold text-[#1A1A1A]">
        {title}
      </h3>

      {/* Review */}

      <p className="mt-4 leading-8 text-[#666]">
        {review}
      </p>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between border-t border-[#F1ECE4] pt-5">

        <div>

          <h4 className="font-semibold">
            {name}
          </h4>

          <p className="text-sm text-[#888]">
            {country}
          </p>

        </div>

        {verified && (
          <div className="flex items-center gap-2 rounded-full bg-[#F6FAF6] px-4 py-2 text-sm font-medium text-green-700">

            <FiCheckCircle />

            Verified Buyer

          </div>
        )}

      </div>

    </div>
  );
}