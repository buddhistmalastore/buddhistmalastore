"use client";

interface SortBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortBar({
  value,
  onChange,
}: SortBarProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#666]">
        Sort By
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          rounded-full
          border
          border-[#E5DED0]
          bg-white
          px-5
          text-sm
          font-medium
          text-[#1A1A1A]
          outline-none
          transition-all
          duration-300
          hover:border-[#C79B2A]
          focus:border-[#C79B2A]
        "
      >
        <option value="featured">Featured</option>
        <option value="newest">Newest</option>
        <option value="bestSeller">Best Seller</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
}