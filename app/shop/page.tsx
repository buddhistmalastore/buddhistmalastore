import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import ShopHero from "@/components/shop/ShopHero";
import CategoryPills from "@/components/shop/CategoryPills";
import ShopContent from "@/components/shop/ShopContent";

import { getWooCommerceProducts } from "@/lib/woocommerce";
import { mapWooCommerceProduct } from "@/lib/woocommerceMapper";

import { Product } from "@/types/product";

interface ShopPageProps {
  searchParams: Promise<{
    purpose?: string;
    category?: string;
  }>;
}

export default async function ShopPage({
  searchParams,
}: ShopPageProps) {
  const params = await searchParams;

  /* -------------------------------------------------------
     GET PRODUCTS FROM WOOCOMMERCE
  ------------------------------------------------------- */

  const wooCommerceProducts =
    await getWooCommerceProducts();

  /* -------------------------------------------------------
     MAP WOOCOMMERCE PRODUCTS
     
     Explicitly typed as Product[] so TypeScript knows
     exactly what our storefront products contain.
  ------------------------------------------------------- */

  const products: Product[] =
    wooCommerceProducts.map(
      mapWooCommerceProduct
    ) as Product[];

  /* -------------------------------------------------------
     DYNAMIC CATEGORIES
     
     Categories come automatically from the products
     received from WooCommerce.

     Example:

     WooCommerce product:
     category = "Gemstone"

     automatically creates:

     Gemstone

     in Shop by Category.
  ------------------------------------------------------- */

  const categories: string[] =
    Array.from(
      new Set(
        products
          .map(
            (product: Product) =>
              String(
                product.category || ""
              ).trim()
          )
          .filter(
            (category: string) =>
              category.length > 0
          )
      )
    ).sort(
      (
        a: string,
        b: string
      ) =>
        a.localeCompare(b)
    );

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          SHOP CONTENT
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-[1500px]
          px-5
          py-8
          lg:px-8
        "
      >
        {/* =================================================
            SHOP HERO
        ================================================= */}

        <ShopHero />

        {/* =================================================
            DYNAMIC CATEGORY PILLS
        ================================================= */}

        <CategoryPills
          categories={categories}
        />

        {/* =================================================
            SHOP PRODUCTS
        ================================================= */}

        <ShopContent
          products={products}
          initialPurpose={
            params.purpose ?? ""
          }
          initialCategory={
            params.category ?? ""
          }
        />
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </main>
  );
}