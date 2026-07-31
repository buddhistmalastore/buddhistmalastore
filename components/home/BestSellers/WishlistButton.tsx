"use client";

import { Heart } from "lucide-react";

export default function WishlistButton() {
  return (
    <button className="absolute right-5 top-5 z-20 rounded-full bg-black/50 p-3 text-white backdrop-blur-md transition hover:bg-[#D4AF37] hover:text-black">
      <Heart size={18} />
    </button>
  );
}