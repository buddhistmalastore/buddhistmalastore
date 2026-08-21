import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import ShopHero from "@/components/shop/ShopHero";
import CategoryPills from "@/components/shop/CategoryPills";
import ShopContent from "@/components/shop/ShopContent";

import { getWooCommerceProducts } from "@/lib/woocommerce";
import { mapWooCommerceProduct } from "@/lib/woocommerceMapper";

export default async function ShopPage() {
  const wooCommerceProducts =
    await getWooCommerceProducts();

  const products =
    wooCommerceProducts.map(mapWooCommerceProduct);

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Header />

      <section className="mx-auto max-w-[1500px] px-5 py-8 lg:px-8">
        <ShopHero />

        <CategoryPills />

        <ShopContent products={products} />
      </section>

      <Footer />
    </main>
  );
}