"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}

      <button
        onClick={() => setOpen(true)}
        className="lg:hidden"
        aria-label="Open Menu"
      >
        <FiMenu size={28} />
      </button>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}

      <aside
        className={`
          fixed
          top-0
          right-0
          z-50
          h-full
          w-[300px]
          bg-white
          shadow-2xl
          transition-transform
          duration-300

          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between border-b p-6">

          <h2 className="heading-font text-xl text-[#C79B2A]">
            Menu
          </h2>

          <button
            onClick={() => setOpen(false)}
          >
            <FiX size={26} />
          </button>

        </div>

        <nav className="flex flex-col p-6">

          <Link href="/" className="py-3" onClick={() => setOpen(false)}>
            Home
          </Link>

          <Link href="/shop" className="py-3" onClick={() => setOpen(false)}>
            Shop
          </Link>

          <Link href="/about" className="py-3" onClick={() => setOpen(false)}>
            About
          </Link>

          <Link href="/contact" className="py-3" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <Link href="/wishlist" className="py-3" onClick={() => setOpen(false)}>
            Wishlist
          </Link>

          <Link href="/cart" className="py-3" onClick={() => setOpen(false)}>
            Cart
          </Link>

          <Link href="/account" className="py-3" onClick={() => setOpen(false)}>
            Account
          </Link>

        </nav>
      </aside>
    </>
  );
}