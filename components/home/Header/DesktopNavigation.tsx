"use client";

import Link from "next/link";

const menu = [
  "Home",
  "Collections",
  "Malas",
  "Bracelets",
  "Gemstones",
  "Blog",
  "About",
  "Contact",
];

export default function DesktopNavigation() {
  return (
    <nav className="hidden xl:flex items-center gap-10">

      {menu.map((item) => (
        <Link
          key={item}
          href="#"
          className="
            text-sm
            uppercase
            tracking-[2px]
            text-[#F7F3EC]
            transition-all
            duration-300
            hover:text-[#D4AF37]
          "
        >
          {item}
        </Link>
      ))}

    </nav>
  );
}