"use client";

import {
  Search,
  Heart,
  ShoppingBag,
  User,
} from "lucide-react";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-5">

      <Search
        className="cursor-pointer text-[#F7F3EC] hover:text-[#D4AF37]"
      />

      <Heart
        className="cursor-pointer text-[#F7F3EC] hover:text-[#D4AF37]"
      />

      <ShoppingBag
        className="cursor-pointer text-[#F7F3EC] hover:text-[#D4AF37]"
      />

      <User
        className="cursor-pointer text-[#F7F3EC] hover:text-[#D4AF37]"
      />

    </div>
  );
}