"use client";

import { useEffect, useState } from "react";
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

type Customer = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
};

export default function NavIcons() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  const { cartCount } = useCart();
  const { wishlist } = useWishlist();

  /* =========================================================
     CHECK AUTHENTICATION
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          "/api/auth/me",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (!cancelled) {
            setCustomer(null);
          }

          return;
        }

        const data = await response.json();

        if (
          !cancelled &&
          data?.success === true &&
          data?.authenticated === true &&
          data?.customer
        ) {
          setCustomer(data.customer);
        } else if (!cancelled) {
          setCustomer(null);
        }
      } catch (error) {
        console.error(
          "Header authentication check failed:",
          error
        );

        if (!cancelled) {
          setCustomer(null);
        }
      } finally {
        if (!cancelled) {
          setAuthLoading(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     CUSTOMER DISPLAY NAME
  ========================================================= */

  const firstName =
    customer?.first_name?.trim() || "";

  const lastName =
    customer?.last_name?.trim() || "";

  const username =
    customer?.email
      ? customer.email.split("@")[0]
      : "";

  const displayName =
    firstName ||
    username ||
    "Account";

  const accountLabel = customer
    ? `Hi, ${displayName}`
    : "Account";

  /* =========================================================
     ACCOUNT LABEL
  ========================================================= */

  const accountText = authLoading
    ? "Account"
    : accountLabel;

  return (
    <>
      {/* ================================================= */}
      {/* DESKTOP NAV ICONS */}
      {/* ================================================= */}

      <div className="hidden lg:flex items-center gap-3">

        {/* =================================================
            SEARCH
        ================================================= */}

        <button
          type="button"
          onClick={() => setSearchOpen(true)}
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
            hover:shadow-lg
          "
          aria-label="Search"
        >
          <FiSearch size={18} />
        </button>

        {/* =================================================
            WISHLIST
        ================================================= */}

        <Link
          href="/wishlist"
          className="
            relative
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
            hover:shadow-lg
          "
          aria-label="Wishlist"
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

        {/* =================================================
            ACCOUNT
        ================================================= */}

        <Link
          href="/account"
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-[#E8DFD2]
            bg-white
            px-3
            text-[#1A1A1A]
            transition-all
            duration-300
            hover:border-[#C79B2A]
            hover:bg-[#C79B2A]
            hover:text-white
            hover:shadow-lg
          "
          aria-label={
            customer
              ? `My Account - ${accountText}`
              : "My Account"
          }
          title={
            customer
              ? accountText
              : "My Account"
          }
        >
          <FiUser size={18} />

          <span
            className="
              max-w-[120px]
              truncate
              text-sm
              font-medium
              whitespace-nowrap
            "
          >
            {accountText}
          </span>
        </Link>

        {/* =================================================
            CART
        ================================================= */}

        <button
          type="button"
          onClick={() => setCartOpen(true)}
          className="
            relative
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
            hover:shadow-lg
          "
          aria-label="Shopping Cart"
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

      {/* ================================================= */}
      {/* MOBILE CART */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={() => setCartOpen(true)}
        className="
          relative
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
          shadow-sm
          transition-all
          duration-300
          hover:border-[#C79B2A]
          hover:bg-[#C79B2A]
          hover:text-white
          hover:shadow-lg
          lg:hidden
        "
        aria-label="Shopping Cart"
      >
        <FiShoppingBag size={20} />

        {cartCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-5
              items-center
              justify-center
              rounded-full
              bg-[#C79B2A]
              px-1
              text-[10px]
              font-bold
              text-white
            "
          >
            {cartCount}
          </span>
        )}
      </button>

      {/* ================================================= */}
      {/* DRAWERS */}
      {/* ================================================= */}

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