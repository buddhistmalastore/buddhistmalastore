"use client";

import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import NavIcons from "./NavIcons";
import MobileNav from "./MobileNav";

import useScroll from "@/hooks/useScroll";

export default function Header() {
  const scrolled = useScroll();

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-500

        ${
          scrolled
            ? "bg-white/90 backdrop-blur-2xl border-b border-[#E6DDCF] shadow-lg"
            : "bg-transparent"
        }
      `}
    >
      <div
        className="
          mx-auto
          flex
          max-w-[1500px]
          items-center
          justify-between
          px-6
          lg:px-10
          transition-all
          duration-500
        "
      >
        <div
          className={`
            transition-all
            duration-500

            ${
              scrolled
                ? "py-4"
                : "py-6"
            }
          `}
        >
          <Logo />
        </div>

        <DesktopNav />

        <div className="flex items-center gap-5">
          <NavIcons />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}