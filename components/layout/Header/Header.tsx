"use client";

import TopBar from "./TopBar";
import Logo from "./Logo";
import DesktopNav from "./DesktopNav";
import NavIcons from "./NavIcons";
import MobileNav from "./MobileNav";
import CurrencySelector from "./CurrencySelector";

import useScroll from "@/hooks/useScroll";

export default function Header() {
  const scrolled = useScroll();

  return (
    <>
      <TopBar />

      <header
        className={`
          sticky
          top-0
          z-50
          text-[#1A1A1A]
          transition-all
          duration-500

          ${
            scrolled
              ? "bg-white/95 backdrop-blur-2xl border-b border-[#E8DFD2] shadow-lg"
              : "bg-[#FAF8F4]/95 backdrop-blur-xl"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-24
            max-w-[1500px]
            items-center
            justify-between
            px-6
            lg:px-10
          "
        >
          <Logo />

          <DesktopNav />

          <div className="flex items-center gap-5">
            <CurrencySelector />

            <NavIcons />

            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}