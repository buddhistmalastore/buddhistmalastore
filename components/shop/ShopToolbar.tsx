"use client";

import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

interface ShopToolbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function ShopToolbar({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}: ShopToolbarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-5
        rounded-3xl
        border
        border-[#E8DFD2]
        bg-white
        p-6
        shadow-sm
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <SortBar
        value={sortBy}
        onChange={setSortBy}
      />
    </div>
  );
}