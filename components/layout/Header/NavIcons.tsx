"use client";

import Link from "next/link";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";

export default function NavIcons() {
  return (
    <div className="hidden lg:flex items-center gap-5">

      {/* Search */}

      <button
        className="
          transition
          duration-300
          hover:text-[#C79B2A]
        "
        aria-label="Search"
      >
        <FiSearch size={20} />
      </button>

      {/* Wishlist */}

      <Link
        href="/wishlist"
        className="
          transition
          duration-300
          hover:text-[#C79B2A]
        "
      >
        <FiHeart size={20} />
      </Link>

      {/* Account */}

      <Link
        href="/account"
        className="
          transition
          duration-300
          hover:text-[#C79B2A]
        "
      >
        <FiUser size={20} />
      </Link>

      {/* Cart */}

      <Link
        href="/cart"
        className="
          relative
          transition
          duration-300
          hover:text-[#C79B2A]
        "
      >
        <FiShoppingBag size={20} />

        <span
          className="
            absolute
            -right-2
            -top-2
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            bg-[#C79B2A]
            text-[10px]
            font-semibold
            text-white
          "
        >
          0
        </span>
      </Link>

    </div>
  );
}