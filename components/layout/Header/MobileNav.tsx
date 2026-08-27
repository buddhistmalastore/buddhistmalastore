"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiInfo,
  FiMail,
} from "react-icons/fi";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      href: "/",
      label: "Home",
      icon: <FiHome size={20} />,
    },
    {
      href: "/shop",
      label: "Shop",
      icon: <FiShoppingBag size={20} />,
    },
    {
      href: "/about",
      label: "About",
      icon: <FiInfo size={20} />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <FiMail size={20} />,
    },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: <FiHeart size={20} />,
    },
    {
      href: "/account",
      label: "My Account",
      icon: <FiUser size={20} />,
    },
  ];

  return (
    <>
      {/* ================================================= */}
      {/* MENU BUTTON */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#E8DFD2]
          bg-white
          text-[#1A1A1A]
          transition-all
          duration-300
          hover:border-[#C79B2A]
          hover:bg-[#C79B2A]
          hover:text-white
          lg:hidden
        "
        aria-label="Open Menu"
        aria-expanded={open}
      >
        <FiMenu size={22} />
      </button>

      {/* ================================================= */}
      {/* OVERLAY */}
      {/* ================================================= */}

      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`
          fixed
          inset-0
          z-[98]
          bg-black/40
          transition-all
          duration-300
          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* ================================================= */}
      {/* DRAWER */}
      {/* ================================================= */}

      <aside
        aria-hidden={!open}
        className={`
          fixed
          right-0
          top-0
          z-[99]
          flex
          h-screen
          w-[330px]
          max-w-[90vw]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-500
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[#E8DFD2]
            px-6
            py-6
          "
        >
          <div>
            <h2
              className="
                heading-font
                text-3xl
                leading-tight
                text-[#1A1A1A]
              "
            >
              Menu
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#8C8479]
              "
            >
              Buddhist Mala Store
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              text-[#4F4941]
              transition-all
              duration-300
              hover:bg-[#F5F2ED]
              hover:text-[#C79B2A]
            "
            aria-label="Close Menu"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-6
            py-5
          "
        >
          <div className="space-y-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-4
                  text-[17px]
                  font-medium
                  text-[#1A1A1A]
                  transition-all
                  duration-300
                  hover:bg-[#F8F4ED]
                  hover:text-[#C79B2A]
                "
              >
                <span
                  className="
                    flex
                    h-6
                    w-6
                    items-center
                    justify-center
                    text-[#6B6257]
                    transition-colors
                    duration-300
                  "
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* ================================================= */}
        {/* BOTTOM CART */}
        {/* ================================================= */}

        <div
          className="
            border-t
            border-[#E8DFD2]
            p-6
          "
        >
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#1A1A1A]
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#C79B2A]
            "
          >
            <FiShoppingBag size={19} />

            <span>View Cart</span>
          </Link>
        </div>
      </aside>
    </>
  );
}