
"use client";

import { useState } from "react";

import { Product } from "@/types/product";

import ShopToolbar from "./ShopToolbar";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid/ProductGrid";

interface ShopContentProps {
  products: Product[];
}

export default function ShopContent({
  products,
}: ShopContentProps) {
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("featured");

  const [inStockOnly, setInStockOnly] =
    useState(false);

  const [featuredOnly, setFeaturedOnly] =
    useState(false);

  // Dynamic categories from WooCommerce products
  const categories = Array.from(
    new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    )
  );

  // Filter products
  const filteredProducts = products.filter(
    (product) => {
      const categoryMatch =
        selectedCategory === "" ||
        product.category === selectedCategory;

      const stockMatch =
        !inStockOnly ||
        product.stock > 0;

      const featuredMatch =
        !featuredOnly ||
        product.featured;

      return (
        categoryMatch &&
        stockMatch &&
        featuredMatch
      );
    }
  );

  return (
    <>
      {/* Toolbar */}

      <div className="mt-12">
        <ShopToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Products */}

      <div
        id="products"
        className="
          mt-12
          grid
          grid-cols-1
          gap-10
          lg:grid-cols-12
        "
      >
        {/* Sidebar */}

        <aside className="lg:col-span-3">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={
              setSelectedCategory
            }
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            featuredOnly={featuredOnly}
            setFeaturedOnly={setFeaturedOnly}
          />
        </aside>

        {/* Product Grid */}

        <section className="lg:col-span-9">
          <ProductGrid
            products={filteredProducts}
            selectedCategory=""
            searchTerm={searchTerm}
            sortBy={sortBy}
          />
        </section>
      </div>
    </>
  );
}

