import { notFound } from "next/navigation";
import { Product } from "@/types/product";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import ProductPageContent from "@/components/product-details/ProductPageContent";

import { getWooCommerceProducts } from "@/lib/woocommerce";
import { mapWooCommerceProduct } from "@/lib/woocommerceMapper";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  // Get live products from WooCommerce
  const wooCommerceProducts =
    await getWooCommerceProducts();

  // Convert WooCommerce products to our Product format
  const products: Product[] =
  wooCommerceProducts.map(
    mapWooCommerceProduct
  );

  // Find current product
  const currentIndex = products.findIndex(
    (item) => item.slug === slug
  );

  if (currentIndex === -1) {
    notFound();
  }

  const product = products[currentIndex];

  // Previous product
  const previous =
    currentIndex > 0
      ? products[currentIndex - 1]
      : undefined;

  // Next product
  const next =
    currentIndex < products.length - 1
      ? products[currentIndex + 1]
      : undefined;

  /*
   * Related Products
   *
   * First choose products from the same category.
   * If there are fewer than 4, fill the remaining
   * positions with other products.
   */

  const sameCategoryProducts =
    products.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category
    );

  const otherProducts =
    products.filter(
      (item) =>
        item.id !== product.id &&
        item.category !== product.category
    );

  const relatedProducts = [
    ...sameCategoryProducts,
    ...otherProducts,
  ].slice(0, 4);

  return (
    <>
      <Header />

      <ProductPageContent
        product={product}
        previous={previous}
        next={next}
        relatedProducts={relatedProducts}
      />

      <Footer />
    </>
  );
}