"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FiArrowLeft,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const {
    cart,
    subtotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const { formatPrice } = useCurrency();

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-[70vh] bg-[#FBF9F5]">

          <section className="border-b border-[#ECE3D3] bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">

              <p className="text-[11px] font-semibold uppercase tracking-[4px] text-[#C89A2A]">
                Your Collection
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1A1A1A] md:text-5xl">
                Shopping Cart
              </h1>

            </div>
          </section>

          <section className="flex min-h-[55vh] items-center justify-center px-6 py-20">

            <div className="max-w-xl text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-sm">
                <FiShoppingBag
                  size={38}
                  className="text-[#C89A2A]"
                />
              </div>

              <h2 className="mt-8 text-3xl font-semibold text-[#1A1A1A]">
                Your cart is empty
              </h2>

              <p className="mx-auto mt-4 max-w-md text-[15px] leading-8 text-[#777]">
                Discover our handcrafted malas, gemstone
                bracelets and spiritual accessories made
                by Nepalese artisans.
              </p>

              <Link
                href="/shop"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#1A1A1A]
                  px-8
                  py-4
                  text-sm
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#C89A2A]
                "
              >
                Explore Collection
                <FiArrowRight />
              </Link>

            </div>

          </section>

        </main>

        <Footer />
      </>
    );
  }

  /* =========================================================
     CART PAGE
  ========================================================= */

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FBF9F5]">

        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <section className="border-b border-[#ECE3D3] bg-white">

          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">

            <p className="text-[11px] font-semibold uppercase tracking-[4px] text-[#C89A2A]">
              Your Collection
            </p>

            <div className="mt-3 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <h1 className="text-4xl font-semibold tracking-tight text-[#1A1A1A] md:text-5xl">
                  Shopping Cart
                </h1>

                <p className="mt-3 text-sm text-[#777]">
                  {cart.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}{" "}
                  items in your cart
                </p>

              </div>

              <Link
                href="/shop"
                className="
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#C89A2A]
                  transition
                  hover:text-[#1A1A1A]
                "
              >
                Continue Shopping
                <FiArrowRight size={16} />
              </Link>

            </div>

          </div>

        </section>

        {/* ===================================================
            CART CONTENT
        =================================================== */}

        <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_390px]">

            {/* =================================================
                LEFT — PRODUCTS
            ================================================= */}

            <div>

              <div className="overflow-hidden rounded-2xl border border-[#ECE3D3] bg-white">

                {/* DESKTOP COLUMN HEADER */}

                <div
                  className="
                    hidden
                    border-b
                    border-[#ECE3D3]
                    px-6
                    py-5
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[2px]
                    text-[#999]

                    md:grid
                    md:grid-cols-[minmax(0,1fr)_110px_150px_110px_35px]
                    md:items-center
                    md:gap-4
                  "
                >
                  <span>Product</span>

                  <span className="text-center">
                    Price
                  </span>

                  <span className="text-center">
                    Quantity
                  </span>

                  <span className="text-right">
                    Total
                  </span>

                  <span />
                </div>

                {/* PRODUCTS */}

                <div className="divide-y divide-[#ECE3D3]">

                  {cart.map((item) => {

                    const itemTotal =
                      item.price *
                      item.quantity;

                    return (
                      <div
                        key={item.id}
                        className="
                          p-5

                          md:grid
                          md:grid-cols-[minmax(0,1fr)_110px_150px_110px_35px]
                          md:items-center
                          md:gap-4
                          md:px-6
                          md:py-7
                        "
                      >

                        {/* PRODUCT */}

                        <div className="flex min-w-0 gap-4">

                          <Link
                            href={`/product/${item.slug}`}
                            className="
                              relative
                              h-24
                              w-24
                              shrink-0
                              overflow-hidden
                              rounded-xl
                              bg-[#FBF9F5]

                              md:h-28
                              md:w-28
                            "
                          >
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              sizes="112px"
                              className="
                                object-contain
                                p-2
                                transition-transform
                                duration-500
                                hover:scale-110
                              "
                            />
                          </Link>

                          <div className="min-w-0 pt-1">

                            <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#C89A2A]">
                              {item.category}
                            </p>

                            <Link
                              href={`/product/${item.slug}`}
                              className="
                                mt-2
                                block
                                text-base
                                font-semibold
                                leading-6
                                text-[#1A1A1A]
                                transition-colors
                                hover:text-[#C89A2A]

                                md:text-lg
                              "
                            >
                              {item.name}
                            </Link>

                            <p className="mt-2 text-xs text-[#888]">
                              SKU: {item.sku}
                            </p>

                            {item.beadSize && (
                              <p className="mt-1 text-xs text-[#888]">
                                Bead Size: {item.beadSize}
                              </p>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                removeFromCart(item.id)
                              }
                              className="
                                mt-3
                                inline-flex
                                items-center
                                gap-1.5
                                text-xs
                                font-medium
                                text-[#999]
                                transition
                                hover:text-red-600

                                md:hidden
                              "
                            >
                              <FiTrash2 size={13} />
                              Remove
                            </button>

                          </div>

                        </div>

                        {/* PRICE */}

                        <div className="mt-5 md:mt-0 md:text-center">

                          <span className="text-sm font-semibold text-[#1A1A1A]">
                            {formatPrice(item.price)}
                          </span>

                          {item.oldPrice !== undefined &&
                            item.oldPrice !== null && (
                              <span className="ml-2 text-xs text-[#AAA] line-through">
                                {formatPrice(item.oldPrice)}
                              </span>
                            )}

                        </div>

                        {/* QUANTITY */}

                        <div className="mt-4 md:mt-0 md:flex md:justify-center">

                          <div
                            className="
                              inline-flex
                              h-11
                              items-center
                              rounded-full
                              border
                              border-[#DED5C6]
                              bg-[#FCFBF8]
                            "
                          >

                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-[#555]
                                transition
                                hover:bg-[#C89A2A]
                                hover:text-white
                              "
                            >
                              <FiMinus size={14} />
                            </button>

                            <span className="w-9 text-center text-sm font-semibold text-[#1A1A1A]">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              aria-label="Increase quantity"
                              disabled={
                                item.quantity >=
                                item.stock
                              }
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-[#555]
                                transition
                                hover:bg-[#C89A2A]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                              "
                            >
                              <FiPlus size={14} />
                            </button>

                          </div>

                        </div>

                        {/* TOTAL */}

                        <div className="mt-4 md:mt-0 md:text-right">

                          <span className="text-base font-bold text-[#1A1A1A]">
                            {formatPrice(itemTotal)}
                          </span>

                        </div>

                        {/* DELETE */}

                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="
                            mt-4
                            hidden
                            text-[#AAA]
                            transition
                            hover:text-red-600

                            md:flex
                            md:justify-end
                          "
                        >
                          <FiTrash2 size={17} />
                        </button>

                      </div>
                    );
                  })}

                </div>

              </div>

              {/* =================================================
                  CART ACTIONS
              ================================================= */}

              <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <Link
                  href="/shop"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-[#666]
                    transition
                    hover:text-[#C89A2A]
                  "
                >
                  <FiArrowLeft size={16} />
                  Continue Shopping
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-[#999]
                    transition
                    hover:text-red-600
                  "
                >
                  <FiTrash2 size={15} />
                  Clear Cart
                </button>

              </div>

            </div>

            {/* =================================================
                RIGHT — SUMMARY
            ================================================= */}

            <aside className="lg:sticky lg:top-24 lg:self-start">

              <div className="rounded-2xl border border-[#ECE3D3] bg-white p-6 md:p-7">

                <p className="text-[11px] font-semibold uppercase tracking-[3px] text-[#C89A2A]">
                  Order Summary
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-[#1A1A1A]">
                  Your Order
                </h2>

                {/* SUBTOTAL */}

                <div className="mt-7 flex items-center justify-between border-b border-[#ECE3D3] pb-5">

                  <span className="text-sm text-[#777]">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#1A1A1A]">
                    {formatPrice(subtotal)}
                  </span>

                </div>

                {/* SHIPPING */}

                <div className="border-b border-[#ECE3D3] py-5">

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-[#777]">
                      Shipping
                    </span>

                    <span className="text-sm font-semibold text-[#2E7D32]">
                      Calculated at checkout
                    </span>

                  </div>

                  <p className="mt-2 text-xs leading-5 text-[#AAA]">
                    Delivery charges will be calculated
                    according to your delivery location.
                  </p>

                </div>

                {/* DISCOUNT */}

                <div className="border-b border-[#ECE3D3] py-5">

                  <p className="text-sm text-[#777]">
                    Discount
                  </p>

                  <p className="mt-2 text-xs leading-5 text-[#AAA]">
                    Coupon codes can be applied during
                    checkout.
                  </p>

                </div>

                {/* TOTAL */}

                <div className="flex items-center justify-between py-6">

                  <span className="text-base font-semibold text-[#1A1A1A]">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-[#1A1A1A]">
                    {formatPrice(subtotal)}
                  </span>

                </div>

                {/* CHECKOUT */}

                <Link
                  href="/checkout"
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#1A1A1A]
                    px-6
                    py-4
                    text-sm
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-[#C89A2A]
                    hover:shadow-xl
                  "
                >
                  Proceed to Checkout
                  <FiArrowRight size={17} />
                </Link>

                {/* SECURITY */}

                <div className="mt-6 flex gap-3 rounded-xl bg-[#FBF9F5] p-4">

                  <FiShield
                    size={19}
                    className="mt-0.5 shrink-0 text-[#C89A2A]"
                  />

                  <div>

                    <p className="text-xs font-semibold text-[#333]">
                      Secure Checkout
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#888]">
                      Your order details are securely
                      handled during checkout.
                    </p>

                  </div>

                </div>

                {/* TRUST */}

                <div className="mt-5 space-y-3 border-t border-[#ECE3D3] pt-5">

                  <div className="flex items-center gap-3 text-xs text-[#777]">
                    <span className="text-[#C89A2A]">
                      ✓
                    </span>
                    Authentic handcrafted products
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#777]">
                    <span className="text-[#C89A2A]">
                      ✓
                    </span>
                    Carefully packed from Nepal
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#777]">
                    <span className="text-[#C89A2A]">
                      ✓
                    </span>
                    Worldwide delivery available
                  </div>

                </div>

              </div>

            </aside>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}