"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  FiSearch,
  FiX,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi";

import { useCurrency } from "@/context/CurrencyContext";

interface SearchDrawerProps {
  open: boolean;
  onClose: () => void;
}

interface SearchProduct {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;

  images?: {
    id: number;
    src: string;
    alt?: string;
  }[];
}

const popularSearches = [
  "Tiger Eye",
  "Rose Quartz",
  "Seven Chakra",
  "Rudraksha",
  "Bodhi Seed",
  "Bracelet",
];

export default function SearchDrawer({
  open,
  onClose,
}: SearchDrawerProps) {
  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState<SearchProduct[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [searched, setSearched] =
    useState(false);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const searchTimeout =
    useRef<ReturnType<
      typeof setTimeout
    > | null>(null);

  /*
  |--------------------------------------------------------------------------
  | GLOBAL CURRENCY
  |--------------------------------------------------------------------------
  */

  const { formatPrice } =
    useCurrency();

  /*
  |--------------------------------------------------------------------------
  | OPEN / CLOSE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!open) {
      document.body.style.overflow =
        "";

      return;
    }

    /*
     * Prevent the homepage/shop page from
     * scrolling behind the search panel.
     */

    document.body.style.overflow =
      "hidden";

    const timer =
      window.setTimeout(() => {
        inputRef.current?.focus();
      }, 150);

    return () => {
      window.clearTimeout(timer);

      document.body.style.overflow =
        "";
    };
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | ESCAPE KEY
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        handleClose();
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
  }, [open]);

  /*
  |--------------------------------------------------------------------------
  | SEARCH PRODUCTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const query =
      search.trim();

    /*
     * Clear previous debounce timer.
     */

    if (
      searchTimeout.current
    ) {
      clearTimeout(
        searchTimeout.current
      );
    }

    /*
     * Empty search.
     */

    if (query.length < 2) {
      setProducts([]);
      setLoading(false);
      setSearched(false);

      return;
    }

    setLoading(true);

    /*
     * Small debounce prevents an API request
     * on every single keystroke.
     */

    searchTimeout.current =
      setTimeout(async () => {
        try {
          const response =
            await fetch(
              `/api/products/search?q=${encodeURIComponent(
                query
              )}`,
              {
                method: "GET",
                cache: "no-store",
              }
            );

          if (!response.ok) {
            throw new Error(
              "Search request failed."
            );
          }

          const data =
            await response.json();

          setProducts(
            Array.isArray(
              data.products
            )
              ? data.products
              : []
          );

          setSearched(true);
        } catch (error) {
          console.error(
            "Product search error:",
            error
          );

          setProducts([]);
          setSearched(true);
        } finally {
          setLoading(false);
        }
      }, 350);

    return () => {
      if (
        searchTimeout.current
      ) {
        clearTimeout(
          searchTimeout.current
        );
      }
    };
  }, [search]);

  /*
  |--------------------------------------------------------------------------
  | SELECT POPULAR SEARCH
  |--------------------------------------------------------------------------
  */

  const selectSearch = (
    value: string
  ) => {
    setSearch(value);

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  /*
  |--------------------------------------------------------------------------
  | CLOSE SEARCH
  |--------------------------------------------------------------------------
  */

  const handleClose = () => {
    setSearch("");

    setProducts([]);

    setSearched(false);

    setLoading(false);

    document.body.style.overflow =
      "";

    onClose();
  };

  /*
  |--------------------------------------------------------------------------
  | DON'T RENDER WHEN CLOSED
  |--------------------------------------------------------------------------
  */

  if (!open) {
    return null;
  }

  return (
    <>
      {/* ========================================================= */}
      {/* BACKDROP */}
      {/* ========================================================= */}

      <div
        className="
          fixed
          inset-0
          z-[90]
          bg-black/30
          backdrop-blur-[2px]
        "
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* SEARCH PANEL */}
      {/* ========================================================= */}

      <div
        className="
          fixed
          left-0
          right-0
          top-0
          z-[110]
          max-h-[90vh]
          overflow-y-auto
          border-b
          border-[#E7DFD2]
          bg-[#FFFDF9]
          shadow-[0_20px_50px_rgba(40,30,20,0.14)]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1500px]
            px-6
            lg:px-10
          "
        >
          {/* ===================================================== */}
          {/* SEARCH HEADER */}
          {/* ===================================================== */}

          <div
            className="
              flex
              min-h-[96px]
              items-center
              gap-5
              lg:gap-6
            "
          >
            {/* Search Icon */}

            <div
              className="
                hidden
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F5EFE4]
                text-[#C79B2A]
                sm:flex
              "
            >
              <FiSearch
                size={20}
                strokeWidth={1.8}
              />
            </div>

            {/* Input */}

            <form
              className="
                min-w-0
                flex-1
              "
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <div className="relative">
                {/* Mobile Search Icon */}

                <FiSearch
                  size={20}
                  strokeWidth={1.8}
                  className="
                    absolute
                    left-0
                    top-1/2
                    -translate-y-1/2
                    text-[#9A9185]
                    sm:hidden
                  "
                />

                <input
                  ref={inputRef}
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search Mala, Bracelet, Gemstone..."
                  aria-label="Search products"
                  autoComplete="off"
                  className="
                    w-full
                    bg-transparent
                    py-4
                    pl-8
                    pr-4
                    text-lg
                    font-medium
                    text-[#1A1A1A]
                    outline-none
                    placeholder:text-[#9A9185]
                    sm:pl-0
                    sm:text-xl
                  "
                />
              </div>
            </form>

            {/* Close Button */}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close search"
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#E7DFD2]
                bg-white
                text-[#4F4941]
                transition-all
                duration-300
                hover:border-[#C79B2A]
                hover:bg-[#C79B2A]
                hover:text-white
              "
            >
              <FiX
                size={21}
                strokeWidth={1.8}
              />
            </button>
          </div>

          {/* ===================================================== */}
          {/* SEARCH RESULTS */}
          {/* ===================================================== */}

          {search.trim().length >=
            2 && (
            <div
              className="
                border-t
                border-[#EEE7DD]
                py-6
              "
            >
              {/* ================================================= */}
              {/* LOADING */}
              {/* ================================================= */}

              {loading && (
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    py-10
                    text-[#8A8175]
                  "
                >
                  <FiLoader
                    size={22}
                    className="animate-spin"
                  />

                  <span className="ml-3 text-sm">
                    Searching products...
                  </span>
                </div>
              )}

              {/* ================================================= */}
              {/* RESULTS */}
              {/* ================================================= */}

              {!loading &&
                products.length >
                  0 && (
                  <div>
                    {/* Result Header */}

                    <div
                      className="
                        mb-5
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[3px]
                          text-[#8A8175]
                        "
                      >
                        Search Results
                      </p>

                      <span
                        className="
                          text-xs
                          text-[#9A9185]
                        "
                      >
                        {products.length}{" "}
                        {products.length ===
                        1
                          ? "product"
                          : "products"}
                      </span>
                    </div>

                    {/* Product Grid */}

                    <div
                      className="
                        grid
                        gap-3
                        sm:grid-cols-2
                        lg:grid-cols-4
                      "
                    >
                      {products.map(
                        (product) => {
                          const image =
                            product
                              .images?.[0]
                              ?.src;

                          const price =
                            Number(
                              product.price
                            );

                          return (
                            <Link
                              key={
                                product.id
                              }
                              href={`/product/${product.slug}`}
                              onClick={
                                handleClose
                              }
                              className="
                                group
                                flex
                                items-center
                                gap-4
                                rounded-xl
                                border
                                border-[#E7DFD2]
                                bg-white
                                p-3
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:border-[#C79B2A]
                                hover:shadow-[0_10px_30px_rgba(40,30,20,0.08)]
                              "
                            >
                              {/* Product Image */}

                              <div
                                className="
                                  relative
                                  h-16
                                  w-16
                                  shrink-0
                                  overflow-hidden
                                  rounded-lg
                                  bg-[#F5EFE4]
                                "
                              >
                                {image ? (
                                  <Image
                                    src={
                                      image
                                    }
                                    alt={
                                      product
                                        .images?.[0]
                                        ?.alt ||
                                      product.name
                                    }
                                    fill
                                    sizes="64px"
                                    className="
                                      object-cover
                                      transition-transform
                                      duration-500
                                      group-hover:scale-105
                                    "
                                  />
                                ) : (
                                  <div
                                    className="
                                      flex
                                      h-full
                                      w-full
                                      items-center
                                      justify-center
                                      text-[#C79B2A]
                                    "
                                  >
                                    <FiSearch
                                      size={20}
                                    />
                                  </div>
                                )}
                              </div>

                              {/* Product Information */}

                              <div
                                className="
                                  min-w-0
                                  flex-1
                                "
                              >
                                <h3
                                  className="
                                    line-clamp-2
                                    text-sm
                                    font-semibold
                                    leading-5
                                    text-[#2A2723]
                                    transition-colors
                                    group-hover:text-[#B88620]
                                  "
                                >
                                  {
                                    product.name
                                  }
                                </h3>

                                {/* Currency-Aware Price */}

                                {Number.isFinite(
                                  price
                                ) && (
                                  <p
                                    className="
                                      mt-1
                                      text-sm
                                      font-bold
                                      text-[#C79B2A]
                                    "
                                  >
                                    {formatPrice(
                                      price
                                    )}
                                  </p>
                                )}
                              </div>

                              {/* Arrow */}

                              <FiArrowRight
                                size={16}
                                className="
                                  shrink-0
                                  text-[#C8B99F]
                                  transition-all
                                  duration-300
                                  group-hover:translate-x-1
                                  group-hover:text-[#C79B2A]
                                "
                              />
                            </Link>
                          );
                        }
                      )}
                    </div>

                    {/* ================================================= */}
                    {/* VIEW ALL */}
                    {/* ================================================= */}

                    <div
                      className="
                        mt-6
                        text-center
                      "
                    >
                      <Link
                        href={`/shop?search=${encodeURIComponent(
                          search.trim()
                        )}`}
                        onClick={
                          handleClose
                        }
                        className="
                          inline-flex
                          items-center
                          gap-2
                          text-sm
                          font-semibold
                          text-[#B88620]
                          transition-colors
                          hover:text-[#8F6A12]
                        "
                      >
                        View all search results

                        <FiArrowRight
                          size={16}
                        />
                      </Link>
                    </div>
                  </div>
                )}

              {/* ================================================= */}
              {/* NO RESULTS */}
              {/* ================================================= */}

              {!loading &&
                searched &&
                products.length ===
                  0 && (
                  <div
                    className="
                      py-10
                      text-center
                    "
                  >
                    <div
                      className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F5EFE4]
                        text-[#C79B2A]
                      "
                    >
                      <FiSearch
                        size={22}
                      />
                    </div>

                    <h3
                      className="
                        heading-font
                        mt-4
                        text-xl
                        text-[#2A2723]
                      "
                    >
                      No products found
                    </h3>

                    <p
                      className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        text-[#8A8175]
                      "
                    >
                      We couldn't find
                      anything matching "
                      {search.trim()}
                      ".
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSearch("")
                      }
                      className="
                        mt-5
                        text-sm
                        font-semibold
                        text-[#B88620]
                        hover:text-[#8F6A12]
                      "
                    >
                      Clear search
                    </button>
                  </div>
                )}
            </div>
          )}

          {/* ===================================================== */}
          {/* POPULAR SEARCHES */}
          {/* ===================================================== */}

          {search.trim().length <
            2 && (
            <div
              className="
                border-t
                border-[#EEE7DD]
                pb-7
                pt-5
              "
            >
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:gap-6
                "
              >
                {/* Label */}

                <p
                  className="
                    shrink-0
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[3px]
                    text-[#8A8175]
                  "
                >
                  Popular Searches
                </p>

                {/* Popular Search Buttons */}

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    sm:gap-2.5
                  "
                >
                  {popularSearches.map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          selectSearch(
                            item
                          )
                        }
                        className="
                          rounded-full
                          border
                          border-[#E2D8C9]
                          bg-white
                          px-4
                          py-2
                          text-sm
                          text-[#5B534A]
                          transition-all
                          duration-300
                          hover:border-[#C79B2A]
                          hover:bg-[#F8F3EB]
                          hover:text-[#B88620]
                        "
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}