"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
} from "react-icons/fi";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

export default function CartPage() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
  } = useCart();

  const {
    formatPrice,
  } = useCurrency();

  /* =====================================================
     EMPTY CART
  ===================================================== */

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">
        {/* Header */}

        <section
          className="
            border-b
            border-[#E8DFD2]
            bg-white
          "
        >
          <div
            className="
              mx-auto
              max-w-[1500px]
              px-6
              py-14
              lg:px-10
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[4px]
                text-[#C89A2A]
              "
            >
              BuddhistMalaPro
            </p>

            <h1
              className="
                mt-3
                text-4xl
                font-bold
                text-[#1A1A1A]
                md:text-5xl
              "
            >
              Shopping Cart
            </h1>
          </div>
        </section>

        {/* Empty */}

        <section
          className="
            flex
            min-h-[60vh]
            items-center
            justify-center
            px-6
          "
        >
          <div
            className="
              w-full
              max-w-[520px]
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                bg-[#F4EAD7]
                text-[#C89A2A]
              "
            >
              <FiShoppingBag size={38} />
            </div>

            <h2
              className="
                mt-7
                text-2xl
                font-bold
                text-[#1A1A1A]
              "
            >
              Your shopping bag is empty
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-[400px]
                text-sm
                leading-7
                text-[#777]
              "
            >
              Discover handcrafted Buddhist malas,
              gemstone bracelets and spiritual
              accessories made with care.
            </p>

            <Link
              href="/shop"
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#C89A2A]
                px-8
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#A9821D]
                hover:shadow-lg
              "
            >
              Continue Shopping
            </Link>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     CART PAGE
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#FAF8F4]">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section
        className="
          border-b
          border-[#E8DFD2]
          bg-white
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            py-12
            lg:px-10
            lg:py-16
          "
        >
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
              text-sm
              text-[#888]
            "
          >
            <Link
              href="/"
              className="
                transition-colors
                hover:text-[#C89A2A]
              "
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-[#444]">
              Shopping Cart
            </span>
          </div>

          <div
            className="
              mt-5
              flex
              flex-wrap
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[4px]
                  text-[#C89A2A]
                "
              >
                Your Selection
              </p>

              <h1
                className="
                  mt-2
                  text-4xl
                  font-bold
                  tracking-tight
                  text-[#1A1A1A]
                  md:text-5xl
                "
              >
                Shopping Cart
              </h1>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-[#888]
                transition-colors
                hover:text-red-500
              "
            >
              <FiTrash2 size={15} />
              Clear Cart
            </button>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section
        className="
          mx-auto
          max-w-[1500px]
          px-6
          py-10
          lg:px-10
          lg:py-14
        "
      >
        <div
          className="
            grid
            gap-8
            lg:grid-cols-[1fr_380px]
            xl:gap-12
          "
        >

          {/* =================================================
              CART ITEMS
          ================================================= */}

          <div className="min-w-0">

            {/* Desktop Heading */}

            <div
              className="
                hidden
                border-b
                border-[#E5DDD0]
                pb-4
                md:grid
                md:grid-cols-[1fr_120px_150px]
                md:gap-6
              "
            >
              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-[#999]
                "
              >
                Product
              </span>

              <span
                className="
                  text-center
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-[#999]
                "
              >
                Quantity
              </span>

              <span
                className="
                  text-right
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[2px]
                  text-[#999]
                "
              >
                Total
              </span>
            </div>

            <div>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="
                    border-b
                    border-[#E5DDD0]
                    py-6
                    md:py-7
                  "
                >
                  <div
                    className="
                      grid
                      gap-5
                      md:grid-cols-[1fr_120px_150px]
                      md:items-center
                      md:gap-6
                    "
                  >

                    {/* PRODUCT */}

                    <div
                      className="
                        flex
                        min-w-0
                        gap-5
                      "
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        className="
                          relative
                          h-28
                          w-28
                          shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-white
                          md:h-32
                          md:w-32
                        "
                      >
                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          sizes="128px"
                          className="
                            object-contain
                            p-2
                            transition-transform
                            duration-500
                            hover:scale-110
                          "
                        />
                      </Link>

                      <div
                        className="
                          min-w-0
                          flex-1
                        "
                      >
                        <Link
                          href={`/product/${item.slug}`}
                          className="
                            line-clamp-2
                            text-base
                            font-semibold
                            leading-6
                            text-[#1A1A1A]
                            transition-colors
                            hover:text-[#C89A2A]
                          "
                        >
                          {item.name}
                        </Link>

                        <p
                          className="
                            mt-2
                            text-base
                            font-bold
                            text-[#C89A2A]
                          "
                        >
                          {formatPrice(item.price)}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="
                            mt-4
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            font-medium
                            text-[#999]
                            transition-colors
                            hover:text-red-500
                          "
                        >
                          <FiTrash2 size={13} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* QUANTITY */}

                    <div
                      className="
                        flex
                        items-center
                        md:justify-center
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          rounded-full
                          border
                          border-[#DCD3C4]
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
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-l-full
                            text-[#555]
                            transition
                            hover:bg-[#F4EAD7]
                            hover:text-[#C89A2A]
                          "
                        >
                          <FiMinus size={14} />
                        </button>

                        <span
                          className="
                            min-w-[36px]
                            text-center
                            text-sm
                            font-semibold
                            text-[#222]
                          "
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
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
                            rounded-r-full
                            text-[#555]
                            transition
                            hover:bg-[#F4EAD7]
                            hover:text-[#C89A2A]
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                          "
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* TOTAL */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        md:block
                        md:text-right
                      "
                    >
                      <span
                        className="
                          text-xs
                          text-[#999]
                          md:hidden
                        "
                      >
                        Item Total
                      </span>

                      <span
                        className="
                          text-lg
                          font-bold
                          text-[#1A1A1A]
                        "
                      >
                        {formatPrice(
                          item.price *
                            item.quantity
                        )}
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* CONTINUE SHOPPING */}

            <div className="pt-7">
              <Link
                href="/shop"
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-[#555]
                  transition-colors
                  hover:text-[#C89A2A]
                "
              >
                <FiArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* =================================================
              SUMMARY
          ================================================= */}

          <aside
            className="
              h-fit
              rounded-2xl
              border
              border-[#E5DDD0]
              bg-white
              p-6
              shadow-sm
              lg:sticky
              lg:top-28
              lg:p-7
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[3px]
                text-[#C89A2A]
              "
            >
              Order Summary
            </p>

            <h2
              className="
                mt-2
                text-2xl
                font-bold
                text-[#1A1A1A]
              "
            >
              Cart Total
            </h2>

            <div
              className="
                mt-7
                space-y-4
                border-b
                border-[#E8DFD2]
                pb-6
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-sm
                "
              >
                <span className="text-[#777]">
                  Subtotal
                </span>

                <span
                  className="
                    font-semibold
                    text-[#222]
                  "
                >
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  justify-between
                  text-sm
                "
              >
                <span className="text-[#777]">
                  Shipping
                </span>

                <span
                  className="
                    font-medium
                    text-[#2E7D32]
                  "
                >
                  Calculated at checkout
                </span>
              </div>
            </div>

            <div
              className="
                flex
                items-center
                justify-between
                pt-6
              "
            >
              <span
                className="
                  text-base
                  font-semibold
                  text-[#333]
                "
              >
                Total
              </span>

              <span
                className="
                  text-2xl
                  font-bold
                  text-[#C89A2A]
                "
              >
                {formatPrice(subtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="
                mt-7
                flex
                w-full
                items-center
                justify-center
                rounded-full
                bg-[#1A1A1A]
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-[#C89A2A]
                hover:shadow-lg
              "
            >
              Proceed to Checkout
            </Link>

            <div
              className="
                mt-5
                text-center
                text-xs
                leading-5
                text-[#999]
              "
            >
              Secure checkout · Handmade in Nepal
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}