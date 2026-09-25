"use client";

import Link from "next/link";

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
            px-3
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
              shrink-0
              items-center
              gap-0.5
              sm:gap-2
              lg:gap-5
            "
          >
            {/* ================================================= */}
{/* MOBILE SHOP */}
{/* ================================================= */}

<Link
  href="/shop"
  className="
    flex
    h-10
    items-center
    justify-center
    rounded-full
    border
    border-[#E8DFD2]
    bg-white
    px-3
    text-[13px]
    font-semibold
    text-[#1A1A1A]
    shadow-sm
    transition-all
    duration-300
    hover:border-[#C79B2A]
    hover:bg-[#C79B2A]
    hover:text-white
    hover:shadow-md
    lg:hidden
  "
  aria-label="Shop"
>
  Shop
</Link>

            {/* ================================================= */}
            {/* CURRENCY */}
            {/* ================================================= */}

            <CurrencySelector />

            {/* ================================================= */}
            {/* ACCOUNT + CART */}
            {/* ================================================= */}

            <NavIcons />

            {/* ================================================= */}
            {/* MOBILE MENU */}
            {/* ================================================= */}

            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}