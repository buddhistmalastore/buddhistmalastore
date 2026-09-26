import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import { getWooCommerceProducts } from "@/lib/woocommerce";
import { mapWooCommerceProduct } from "@/lib/woocommerceMapper";

import WishlistClient from "@/components/wishlist/WishlistClient";

import { Product } from "@/types/product";

export default async function WishlistPage() {
  let products: Product[] = [];

  try {
    const wooCommerceProducts =
      await getWooCommerceProducts();

    products = wooCommerceProducts.map(
      mapWooCommerceProduct
    );
  } catch (error) {
    console.error(
      "Failed to load WooCommerce products for wishlist:",
      error
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Header />

      <WishlistClient products={products} />

      <Footer />
    </main>
  );
}