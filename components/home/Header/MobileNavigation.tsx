"use client";

import { Menu } from "lucide-react";

export default function MobileNavigation() {
  return (
    <button className="xl:hidden">

      <Menu
        size={30}
        className="text-[#F7F3EC]"
      />

    </button>
  );
}