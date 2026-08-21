"use client";

import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <FaSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#999]"
        size={15}
      />

      <input
        type="text"
        placeholder="Search malas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          rounded-full
          border
          border-[#E5DED0]
          bg-white
          pl-12
          pr-5
          text-sm
          outline-none
          transition
          focus:border-[#C79B2A]
        "
      />
    </div>
  );
}