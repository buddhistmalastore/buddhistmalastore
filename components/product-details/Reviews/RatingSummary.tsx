"use client";

interface Props {
  rating: number;
  reviews: number;
}

const bars = [
  { star: 5, percent: 86 },
  { star: 4, percent: 10 },
  { star: 3, percent: 3 },
  { star: 2, percent: 1 },
  { star: 1, percent: 0 },
];

export default function RatingSummary({
  rating,
  reviews,
}: Props) {
  return (
    <div className="rounded-3xl border border-[#ECE3D3] bg-white p-8">

      <div className="flex items-center gap-8">

        <div className="text-center">

          <div className="text-6xl font-bold text-[#1A1A1A]">
            {rating.toFixed(1)}
          </div>

          <div className="mt-2 text-[#D4A017] text-xl">
            ★★★★★
          </div>

          <p className="mt-2 text-sm text-[#777]">
            Based on {reviews} Reviews
          </p>

        </div>

        <div className="flex-1 space-y-4">

          {bars.map((item) => (
            <div
              key={item.star}
              className="flex items-center gap-4"
            >

              <span className="w-6 text-sm">
                {item.star}★
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EEE]">

                <div
                  className="h-full rounded-full bg-[#C89A2A]"
                  style={{
                    width: `${item.percent}%`,
                  }}
                />

              </div>

              <span className="w-10 text-sm text-[#777]">
                {item.percent}%
              </span>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}