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
        outline-none
        transition
        focus:border-[#C79B2A]
      "
    >
      <option value="featured">Featured</option>
      <option value="newest">Newest</option>
      <option value="price-low">Price: Low → High</option>
      <option value="price-high">Price: High → Low</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
}