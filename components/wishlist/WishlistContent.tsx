"use client";

import Link from "next/link";

import ProductCard from "@/components/shop/ProductCard/ProductCard";

import useWishlist from "@/hooks/useWishlist";

import { Product } from "@/types/product";

interface Props {
  products: Product[];
}

export default function WishlistContent({
  products,
}: Props) {
  const {
    wishlist,
  } = useWishlist();

  /* =========================================================
     FILTER WISHLIST PRODUCTS
  ========================================================= */

  const wishlistProducts =
    products.filter((product) =>
      wishlist.includes(
        Number(product.id)
      )
    );

  return (
    <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-10">

        <h1
          className="
            heading-font
            text-5xl
            text-[#1A1A1A]
          "
        >
          My Wishlist
        </h1>

        <p className="mt-3 text-[#666]">
          {wishlistProducts.length} Saved Products
        </p>

      </div>

      {/* =====================================================
          EMPTY WISHLIST
      ===================================================== */}

      {wishlistProducts.length === 0 ? (

        <div
          className="
            rounded-[30px]
            border
            border-[#E8DFD2]
            bg-white
            py-24
            text-center
            shadow-sm
          "
        >

          <h2
            className="
              text-3xl
              font-semibold
              text-[#1A1A1A]
            "
          >
            Your Wishlist is Empty
          </h2>

          <p
            className="
              mt-4
              text-[#666]
            "
          >
            Save your favorite malas and
            bracelets here.
          </p>

          <Link
            href="/shop"
            className="
              mt-8
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-[#C89A2A]
              px-7
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#B68B20]
            "
          >
            Explore Shop
          </Link>

        </div>

      ) : (

        /* ===================================================
           WISHLIST PRODUCTS
        =================================================== */

        <section
          className="
            grid
            grid-cols-1
            gap-8
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {wishlistProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}

        </section>

      )}

    </section>
  );
}