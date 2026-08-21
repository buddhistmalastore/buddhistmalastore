"use client";

import { Product } from "@/types/product";
import ProductCard from "../ProductCard/ProductCard";

interface ProductGridProps {
  products: Product[];
  selectedCategory?: string;
  searchTerm?: string;
  sortBy?: string;
}

export default function ProductGrid({
  products,
  selectedCategory = "",
  searchTerm = "",
  sortBy = "featured",
}: ProductGridProps) {
  const keyword = searchTerm.toLowerCase();

  // Filter Products
  let filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "" ||
      product.category === selectedCategory;

    const searchMatch =
      product.name.toLowerCase().includes(keyword) ||
      product.material.toLowerCase().includes(keyword) ||
      product.gemstone.toLowerCase().includes(keyword);

    return categoryMatch && searchMatch;
  });

  // Sort Products
  switch (sortBy) {
    case "priceLow":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
      break;

    case "priceHigh":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
      break;

    case "rating":
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.rating - a.rating
      );
      break;

    case "bestSeller":
      filteredProducts = [...filteredProducts].sort(
        (a, b) =>
          Number(b.bestSeller) - Number(a.bestSeller)
      );
      break;

    case "newest":
      filteredProducts = [...filteredProducts].sort(
        (a, b) =>
          Number(b.newArrival) - Number(a.newArrival)
      );
      break;

    default:
      filteredProducts = [...filteredProducts];
      break;
  }

  return (
    <>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <p className="text-sm text-[#666]">
          Showing{" "}
          <span className="font-semibold text-[#1A1A1A]">
            {filteredProducts.length}
          </span>{" "}
          Products
        </p>
      </div>

      {/* Products */}

      <section
        className="
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </section>
    </>
  );
}