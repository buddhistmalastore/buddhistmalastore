"use client";

import Header from "@/components/layout/Header/Header";

import { useMemo, useState } from "react";

import { products } from "@/data/products";

import ProductCard from "@/components/ui/product/ProductCard";

import ShopHeader from "@/components/shop/ShopHeader";

import FilterSidebar from "@/components/shop/FilterSidebar";

import Footer from "@/components/layout/Footer/Footer";

export default function ShopPage() {
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("featured");

  const [selectedCategory, setSelectedCategory] = useState("");

  /* Categories */

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  /* Filter Products */

  const filteredProducts = useMemo(() => {
    let items = [...products];

    /* Category Filter */

    if (selectedCategory !== "") {
      items = items.filter(
        (product) => product.category === selectedCategory
      );
    }

    /* Search */

    if (search.trim()) {
      items = items.filter((product) =>
        product.name
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    /* Sorting */

    switch (sort) {
      case "price-low":
        items.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        items.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        items.sort((a, b) => b.rating - a.rating);
        break;

      case "newest":
        items.reverse();
        break;

      default:
        break;
    }

    return items;
  }, [search, sort, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#FAF8F4]">

      {/* Hero */}

      <section className="border-b border-[#ECE3D3] bg-[#FDFBF8]">

        <div className="mx-auto max-w-[1500px] px-6 py-10">

          <nav className="mb-4 text-sm text-[#8B837A]">
            Home
            <span className="mx-2">/</span>
            Shop
          </nav>

          <ShopHeader
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            total={filteredProducts.length}
          />

        </div>

      </section>

      {/* Content */}

      <section className="mx-auto max-w-[1500px] px-6 py-10">

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Sidebar */}

          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Products */}

          <div>

            {filteredProducts.length === 0 ? (

              <div
                className="
                  flex
                  h-[450px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[28px]
                  border
                  border-dashed
                  border-[#DDD7CC]
                  bg-white
                "
              >
                <h2 className="heading-font text-3xl text-[#1F1A17]">
                  No Products Found
                </h2>

                <p className="mt-3 text-[#77736F]">
                  Please try another search or category.
                </p>

              </div>

            ) : (

              <div
                className="
                  grid
                  gap-8
                  sm:grid-cols-2
                  lg:grid-cols-3
                  2xl:grid-cols-4
                "
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}