import Link from "next/link";

import ProductCard from "./ProductCard";

import {
  getWooCommerceBestSellers,
} from "@/lib/woocommerce";

import {
  mapWooCommerceProduct,
} from "@/lib/woocommerceMapper";

import { Product } from "@/types/product";

export default async function BestSellers() {
  /*
   * Get the top 8 best-selling products
   * directly from WooCommerce.
   */

  const wooCommerceProducts =
    await getWooCommerceBestSellers();

  /*
   * Convert WooCommerce products
   * into our application's Product type.
   */

  const products: Product[] =
    wooCommerceProducts
      .map(mapWooCommerceProduct)
      .slice(0, 8);

  return (
    <section
      className="
        bg-[#FAF8F4]
        px-4
        py-20
        sm:px-6
        sm:py-24
        lg:py-32
      "
    >
      <div className="mx-auto max-w-7xl">

        {/* ================================================= */}
        {/* SECTION HEADER */}
        {/* ================================================= */}

        <div className="mb-12 text-center sm:mb-16">

          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[3px]
              text-[#C89A2A]
              sm:text-sm
              sm:tracking-[4px]
            "
          >
            Best Sellers
          </p>

          <h2
            className="
              heading-font
              mt-4
              text-[38px]
              font-semibold
              leading-[1.05]
              tracking-tight
              text-[#1A1A1A]
              sm:mt-5
              sm:text-5xl
              lg:text-6xl
            "
          >
            Our Most Loved Malas
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-sm
              leading-7
              text-[#666666]
              sm:mt-6
              sm:text-base
              sm:leading-8
              md:text-lg
            "
          >
            Discover the malas and handcrafted treasures
            loved by our customers around the world.
          </p>

          {/* Decorative Divider */}

          <div
            className="
              mx-auto
              mt-7
              flex
              items-center
              justify-center
              gap-3
              sm:mt-8
            "
          >
            <span className="h-px w-10 bg-[#C89A2A]/40 sm:w-14" />

            <span
              className="
                h-2
                w-2
                rotate-45
                bg-[#C89A2A]
              "
            />

            <span className="h-px w-10 bg-[#C89A2A]/40 sm:w-14" />
          </div>

        </div>

        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        {products.length > 0 ? (
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-6
              lg:grid-cols-3
              xl:grid-cols-4
              xl:gap-8
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-[#777777]">
              Best-selling products will appear here soon.
            </p>
          </div>
        )}

        {/* ================================================= */}
        {/* VIEW ALL BEST SELLERS */}
        {/* ================================================= */}

        {products.length > 0 && (
          <div className="mt-10 text-center sm:mt-14">

            <Link
              href="/shop"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-[#C89A2A]
                bg-transparent
                px-6
                py-3
                text-xs
                font-semibold
                tracking-wide
                text-[#8F691A]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:bg-[#C89A2A]
                hover:text-white
                hover:shadow-lg
                sm:px-8
                sm:py-3.5
                sm:text-sm
              "
            >
              View All Best Sellers

              <span className="ml-2 text-base">
                →
              </span>
            </Link>

          </div>
        )}

      </div>
    </section>
  );
}