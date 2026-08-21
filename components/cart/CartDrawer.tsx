"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

import {
  FiMinus,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const {
    formatPrice,
  } = useCurrency();

  /* =====================================================
     PREVENT BACKGROUND SCROLLING
  ===================================================== */

  useEffect(() => {
    if (!open) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [open]);

  /* =====================================================
     CLOSE WITH ESCAPE
  ===================================================== */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [open, onClose]);

  if (typeof document === "undefined") {
    return null;
  }

  const drawer = (
    <>
      {/* =====================================================
          OVERLAY
      ===================================================== */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[9998]
          bg-black/45
          backdrop-blur-[2px]
          transition-all
          duration-300

          ${
            open
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* =====================================================
          CART DRAWER
      ===================================================== */}

      <aside
        aria-hidden={!open}
        className={`
          fixed
          right-0
          top-0
          bottom-0

          z-[9999]

          flex
          h-[100dvh]
          max-h-[100dvh]

          w-full
          max-w-[440px]

          flex-col

          bg-white

          shadow-[-20px_0_60px_rgba(0,0,0,0.15)]

          transition-transform
          duration-300
          ease-out

          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between

            border-b
            border-[#E8DDCC]

            bg-white

            px-6
            py-5

            sm:px-7
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[3px]
                text-[#C79B2A]
              "
            >
              Your Selection
            </p>

            <h2
              className="
                mt-1
                text-[25px]
                font-semibold
                text-[#1A1A1A]
              "
            >
              Shopping Bag
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="
              flex
              h-11
              w-11
              items-center
              justify-center

              rounded-full

              border
              border-[#E8DDCC]

              text-[#555]

              transition-all
              duration-300

              hover:border-[#C79B2A]
              hover:bg-[#C79B2A]
              hover:text-white
            "
          >
            <FiX size={21} />
          </button>
        </div>

        {/* =================================================
            PRODUCT AREA
        ================================================= */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto

            overscroll-contain

            px-6
            py-5

            sm:px-7
          "
        >
          {cart.length === 0 ? (
            /* EMPTY CART */

            <div
              className="
                flex
                min-h-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center

                  rounded-full

                  bg-[#F8F3E8]

                  text-3xl
                "
              >
                🛍️
              </div>

              <h3
                className="
                  mt-6
                  text-xl
                  font-semibold
                  text-[#1A1A1A]
                "
              >
                Your shopping bag is empty
              </h3>

              <p
                className="
                  mt-3
                  max-w-[280px]
                  text-sm
                  leading-6
                  text-[#777]
                "
              >
                Discover our handcrafted malas,
                gemstone bracelets and spiritual
                accessories.
              </p>

              <Link
                href="/shop"
                onClick={onClose}
                className="
                  mt-7
                  rounded-full

                  bg-[#C79B2A]

                  px-7
                  py-3

                  text-sm
                  font-semibold
                  text-white

                  transition-all
                  duration-300

                  hover:bg-[#A9821D]
                "
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            /* CART PRODUCTS */

            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    rounded-2xl

                    border
                    border-[#ECE3D3]

                    bg-[#FCFBF8]

                    p-4
                  "
                >
                  {/* PRODUCT */}

                  <div className="flex gap-4">
                    {/* IMAGE */}

                    <Link
                      href={`/product/${item.slug}`}
                      onClick={onClose}
                      className="
                        relative
                        h-[110px]
                        w-[110px]
                        shrink-0

                        overflow-hidden
                        rounded-xl

                        bg-[#F5F0E7]
                      "
                    >
                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        sizes="110px"
                        className="
                          object-contain
                          p-2

                          transition-transform
                          duration-500

                          hover:scale-110
                        "
                      />
                    </Link>

                    {/* DETAILS */}

                    <div
                      className="
                        min-w-0
                        flex-1
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-3
                        "
                      >
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={onClose}
                          className="
                            line-clamp-2

                            text-[15px]
                            font-semibold
                            leading-6

                            text-[#1A1A1A]

                            transition-colors

                            hover:text-[#C79B2A]
                          "
                        >
                          {item.name}
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          aria-label={`Remove ${item.name}`}
                          className="
                            shrink-0

                            text-[#999]

                            transition-colors

                            hover:text-red-500
                          "
                        >
                          <FiTrash2 size={17} />
                        </button>
                      </div>

                      {/* =================================================
                          PRICE
                      ================================================= */}

                      <div
                        className="
                          mt-2
                          text-[17px]
                          font-bold
                          text-[#C79B2A]
                        "
                      >
                        {formatPrice(item.price)}
                      </div>

                      {/* =================================================
                          QUANTITY
                      ================================================= */}

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                        "
                      >
                        <div
                          className="
                            flex
                            items-center

                            rounded-full

                            border
                            border-[#DED4C3]

                            bg-white
                          "
                        >
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center

                              rounded-l-full

                              text-[#555]

                              transition

                              hover:bg-[#F4EAD7]
                              hover:text-[#C79B2A]
                            "
                          >
                            <FiMinus size={14} />
                          </button>

                          <span
                            className="
                              flex
                              min-w-[34px]
                              justify-center

                              text-sm
                              font-semibold
                              text-[#222]
                            "
                          >
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              if (
                                item.quantity <
                                item.stock
                              ) {
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                );
                              }
                            }}
                            disabled={
                              item.quantity >=
                              item.stock
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center

                              rounded-r-full

                              text-[#555]

                              transition

                              hover:bg-[#F4EAD7]
                              hover:text-[#C79B2A]

                              disabled:cursor-not-allowed
                              disabled:opacity-30
                            "
                          >
                            <FiPlus size={14} />
                          </button>
                        </div>

                        {/* ITEM TOTAL */}

                        <div className="text-right">
                          <p
                            className="
                              text-[11px]
                              uppercase
                              tracking-wide
                              text-[#999]
                            "
                          >
                            Total
                          </p>

                          <p
                            className="
                              mt-1
                              font-semibold
                              text-[#1A1A1A]
                            "
                          >
                            {formatPrice(
                              item.price *
                                item.quantity
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* =====================================================
            BOTTOM SUMMARY
        ===================================================== */}

        {cart.length > 0 && (
          <div
            className="
              shrink-0

              border-t
              border-[#E8DDCC]

              bg-white

              px-6
              pb-6
              pt-5

              sm:px-7
            "
          >
            {/* SUBTOTAL */}

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  text-[#777]
                "
              >
                Subtotal
              </span>

              <span
                className="
                  text-lg
                  font-bold
                  text-[#1A1A1A]
                "
              >
                {formatPrice(subtotal)}
              </span>
            </div>

            <p
              className="
                mb-5
                text-xs
                leading-5
                text-[#999]
              "
            >
              Shipping and taxes are calculated
              at checkout.
            </p>

            {/* CHECKOUT */}

            <Link
              href="/checkout"
              onClick={onClose}
              className="
                flex
                w-full
                items-center
                justify-center

                rounded-full

                bg-[#C79B2A]

                py-4

                text-sm
                font-semibold
                text-white

                shadow-sm

                transition-all
                duration-300

                hover:bg-[#A9821D]
                hover:shadow-lg
              "
            >
              Checkout
            </Link>

            {/* CONTINUE SHOPPING */}

            <Link
              href="/shop"
              onClick={onClose}
              className="
                mt-3
                flex
                w-full
                items-center
                justify-center

                py-2

                text-sm
                font-medium
                text-[#666]

                transition-colors

                hover:text-[#C79B2A]
              "
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </aside>
    </>
  );

  /*
   * Render directly into <body>.
   * This keeps the drawer independent from
   * Header/layout positioning.
   */

  return createPortal(
    drawer,
    document.body
  );
}