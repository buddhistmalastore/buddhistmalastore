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
      {/* ================================================= */}
      {/* TOP BAR */}
      {/* ================================================= */}

      <TopBar />

      {/* ================================================= */}
      {/* MAIN HEADER */}
      {/* ================================================= */}

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
              ? "border-b border-[#E8DFD2] bg-white/95 shadow-lg backdrop-blur-2xl"
              : "bg-[#FAF8F4]/95 backdrop-blur-xl"
          }
        `}
      >
        <div
          className="
            mx-auto
            flex
            h-[76px]
            max-w-[1500px]
            items-center
            justify-between
            px-4
            sm:px-6
            lg:h-24
            lg:px-10
          "
        >
          {/* ================================================= */}
          {/* LOGO */}
          {/* ================================================= */}

          <Logo />

          {/* ================================================= */}
          {/* DESKTOP NAV */}
          {/* ================================================= */}

          <DesktopNav />

          {/* ================================================= */}
          {/* ACTIONS */}
          {/* ================================================= */}

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              lg:gap-5
            "
          >
            {/* Currency */}

            <CurrencySelector />

            {/* Desktop Search / Wishlist / Account / Cart */}

            <NavIcons />

            {/* Mobile Menu */}

            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}