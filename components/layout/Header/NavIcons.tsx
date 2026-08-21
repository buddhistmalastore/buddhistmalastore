"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";

import SearchDrawer from "./SearchDrawer";
import CartDrawer from "@/components/cart/CartDrawer";

import useCart from "@/hooks/useCart";
import useWishlist from "@/hooks/useWishlist";

export default function NavIcons() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  return (
    <>
      <div className="hidden lg:flex items-center gap-3">

        {/* Search */}

        <button
          onClick={() => setSearchOpen(true)}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-[#E8DFD2]
            bg-white text-[#1A1A1A]
            transition-all duration-300
            hover:border-[#C79B2A]
            hover:bg-[#C79B2A]
            hover:text-white
            hover:shadow-lg
          "
        >
          <FiSearch size={18} />
        </button>

        {/* Wishlist */}

        <Link
          href="/wishlist"
          className="
            relative
            flex h-11 w-11 items-center justify-center
            rounded-full border border-[#E8DFD2]
            bg-white text-[#1A1A1A]
            transition-all duration-300
            hover:border-[#C79B2A]
            hover:bg-[#C79B2A]
            hover:text-white
            hover:shadow-lg
          "
        >
          <FiHeart size={18} />

          {wishlist.length > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-red-500
                text-[10px]
                font-bold
                text-white
              "
            >
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Account */}

        <Link
          href="/account"
          className="
            flex h-11 w-11 items-center justify-center
            rounded-full border border-[#E8DFD2]
            bg-white text-[#1A1A1A]
            transition-all duration-300
            hover:border-[#C79B2A]
            hover:bg-[#C79B2A]
            hover:text-white
            hover:shadow-lg
          "
        >
          <FiUser size={18} />
        </Link>

        {/* Cart */}

        <button
          onClick={() => setCartOpen(true)}
          className="
            relative
            flex h-11 w-11 items-center justify-center
            rounded-full border border-[#E8DFD2]
            bg-white text-[#1A1A1A]
            transition-all duration-300
            hover:border-[#C79B2A]
            hover:bg-[#C79B2A]
            hover:text-white
            hover:shadow-lg
          "
        >
          <FiShoppingBag size={18} />

          {cartCount > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                bg-[#C79B2A]
                text-[10px]
                font-bold
                text-white
              "
            >
              {cartCount}
            </span>
          )}
        </button>

      </div>

      <SearchDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      />
    </>
  );
}