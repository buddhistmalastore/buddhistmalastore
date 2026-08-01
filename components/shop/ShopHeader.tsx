"use client";

import SearchBar from "./SearchBar";
import SortBar from "./SortBar";

interface ShopHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  sort: string;
  setSort: (value: string) => void;
  total: number;
}

export default function ShopHeader({
  search,
  setSearch,
  sort,
  setSort,
  total,
}: ShopHeaderProps) {
  return (
    <section className="mb-12">

      <p className="mb-2 text-sm uppercase tracking-[4px] text-[#C79B2A]">
        Buddhist Mala Store
      </p>

      <h1 className="heading-font text-5xl text-[#1F1A17]">
        Shop Collection
      </h1>

      <p className="mt-4 max-w-2xl text-[#6E665D]">
        Authentic handmade malas, bracelets and spiritual accessories from Nepal.
      </p>

      <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <SearchBar
          value={search}
          onChange={setSearch}
        />

        <div className="flex items-center gap-5">

          <span className="text-sm text-[#666]">
            {total} Products
          </span>

          <SortBar
            value={sort}
            onChange={setSort}
          />

        </div>

      </div>

    </section>
  );
}