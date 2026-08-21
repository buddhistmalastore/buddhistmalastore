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
    { href: "/", label: "Home", icon: <FiHome size={20} /> },
    { href: "/shop", label: "Shop", icon: <FiShoppingBag size={20} /> },
    { href: "/about", label: "About", icon: <FiInfo size={20} /> },
    { href: "/contact", label: "Contact", icon: <FiMail size={20} /> },
    { href: "/wishlist", label: "Wishlist", icon: <FiHeart size={20} /> },
    { href: "/account", label: "My Account", icon: <FiUser size={20} /> },
  ];

  return (
    <>
      {/* Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="
          lg:hidden
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-[#E8DFD2]
          bg-white
          transition-all
          duration-300
          hover:border-[#C79B2A]
          hover:bg-[#C79B2A]
          hover:text-white
        "
        aria-label="Open Menu"
      >
        <FiMenu size={22} />
      </button>

      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
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

      {/* Drawer */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-[99]
          flex
          h-screen
          w-[330px]
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
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-6">

          <div>

            <h2 className="heading-font text-3xl text-[#1A1A1A]">
              Menu
            </h2>

            <p className="mt-1 text-sm text-[#8C8479]">
              Buddhist Mala Store
            </p>

          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-[#F5F2ED]"
          >
            <FiX size={24} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-6 py-5">

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
              {item.icon}

              {item.label}
            </Link>
          ))}

        </nav>

        {/* Bottom */}

        <div className="border-t p-6">

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
            <FiShoppingBag />

            View Cart
          </Link>

        </div>

      </aside>
    </>
  );
}