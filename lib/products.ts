import { products } from "@/data/products";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getBestSellerProducts() {
  return products.filter((p) => p.bestSeller);
}

export function getNewProducts() {
  return products.filter((p) => p.newArrival);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter(
    (p) => p.category === category
  );
}