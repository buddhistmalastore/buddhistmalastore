"use client";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import { products } from "@/data/products";

import ProductCard from "@/components/shop/ProductCard/ProductCard";

import useWishlist from "@/hooks/useWishlist";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-5 py-14 lg:px-8">
        <div className="mb-10">

          <h1 className="heading-font text-5xl text-[#1A1A1A]">
            My Wishlist
          </h1>

          <p className="mt-3 text-[#666]">
            {wishlistProducts.length} Saved Products
          </p>

        </div>

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
            <h2 className="text-3xl font-semibold text-[#1A1A1A]">
              Your Wishlist is Empty
            </h2>

            <p className="mt-4 text-[#666]">
              Save your favorite malas and bracelets here.
            </p>
          </div>
        ) : (
          <section
            className="
              grid
              grid-cols-1
              gap-8
              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {wishlistProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </section>
        )}
      </section>

      <Footer />
    </main>
  );
}