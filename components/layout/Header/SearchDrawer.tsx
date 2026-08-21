"use client";

import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDrawer({
  open,
  onClose,
}: SearchDrawerProps) {
  const [search, setSearch] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="flex items-center justify-between">

          <h2 className="heading-font text-4xl text-[#1A1A1A]">
            Search Products
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-3 hover:bg-[#F5F2ED]"
          >
            <FiX size={28} />
          </button>

        </div>

        <div className="mt-10 relative">

          <FiSearch
            className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400"
          />

          <input
            autoFocus
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Mala, Bracelet, Gemstone..."
            className="
              w-full
              rounded-full
              border
              border-[#DDD]
              py-5
              pl-16
              pr-6
              text-xl
              outline-none
              focus:border-[#C79B2A]
            "
          />

        </div>

        <div className="mt-12">

          <h3 className="mb-6 text-lg font-semibold">
            Popular Searches
          </h3>

          <div className="flex flex-wrap gap-4">

            {[
              "Tiger Eye",
              "Rose Quartz",
              "Seven Chakra",
              "Rudraksha",
              "Bodhi Seed",
              "Bracelet",
            ].map((item) => (
              <button
                key={item}
                className="
                  rounded-full
                  border
                  border-[#E7DFD2]
                  px-5
                  py-2
                  hover:border-[#C79B2A]
                  hover:text-[#C79B2A]
                "
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
}