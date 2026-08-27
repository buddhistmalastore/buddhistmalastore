"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Product } from "@/types/product";

import ShopToolbar from "./ShopToolbar";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid/ProductGrid";

interface ShopContentProps {
  products: Product[];
  initialPurpose?: string;
  initialCategory?: string;
}

export default function ShopContent({
  products,
  initialPurpose = "",
  initialCategory = "",
}: ShopContentProps) {
  /* -------------------------------------------------------
     State
  ------------------------------------------------------- */

  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortBy, setSortBy] =
    useState("featured");

  const [inStockOnly, setInStockOnly] =
    useState(false);

  const [featuredOnly, setFeaturedOnly] =
    useState(false);

  /* -------------------------------------------------------
     Sync category with URL
     
     Important when navigating between:
     
     /shop?category=Gemstone
     /shop?category=Bracelets
     /shop?category=Crystal
  ------------------------------------------------------- */

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  /* -------------------------------------------------------
     Scroll to products
     
     Used when a category is selected from the sidebar.
  ------------------------------------------------------- */

  function scrollToProducts() {
    window.setTimeout(() => {
      const productsElement =
        document.getElementById("products");

      if (!productsElement) {
        return;
      }

      productsElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  /* -------------------------------------------------------
     Category Change Handler
     
     This is passed to FilterSidebar.
  ------------------------------------------------------- */

  function handleCategoryChange(
    category: string
  ) {
    setSelectedCategory(category);

    scrollToProducts();
  }

  /* -------------------------------------------------------
     Scroll to products when category URL contains
     
     #products
     
     Example:
     
     /shop?category=Gemstone#products
  ------------------------------------------------------- */

  useEffect(() => {
    if (
      typeof window === "undefined"
    ) {
      return;
    }

    if (
      window.location.hash !==
      "#products"
    ) {
      return;
    }

    const timer =
      window.setTimeout(() => {
        const productsElement =
          document.getElementById(
            "products"
          );

        if (!productsElement) {
          return;
        }

        productsElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);

    return () => {
      window.clearTimeout(timer);
    };
  }, [initialCategory]);

  /* -------------------------------------------------------
     Purpose
  ------------------------------------------------------- */

  const purposeFilter =
    initialPurpose.trim().toLowerCase();

  /* -------------------------------------------------------
     Initial Category
  ------------------------------------------------------- */

  const categoryFilter =
    initialCategory.trim().toLowerCase();

  /* -------------------------------------------------------
     Dynamic Categories
  ------------------------------------------------------- */

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) =>
            String(
              product.category || ""
            ).trim()
          )
          .filter(Boolean)
      )
    );
  }, [products]);

  /* -------------------------------------------------------
     Filter Products
  ------------------------------------------------------- */

  const filteredProducts =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {
          /* ---------------------------------------------
             Category
          --------------------------------------------- */

          const productCategory =
            String(
              product.category || ""
            )
              .trim()
              .toLowerCase();

          const selectedCategoryFilter =
            selectedCategory
              .trim()
              .toLowerCase();

          const categoryMatch =
            selectedCategoryFilter === "" ||
            productCategory ===
              selectedCategoryFilter ||
            productCategory.includes(
              selectedCategoryFilter
            ) ||
            selectedCategoryFilter.includes(
              productCategory
            );

          /* ---------------------------------------------
             Purpose
          --------------------------------------------- */

          const productPurposes =
            Array.isArray(
              product.purpose
            )
              ? product.purpose.map(
                  (item) =>
                    String(item)
                      .trim()
                      .toLowerCase()
                )
              : [];

          const purposeMatch =
            purposeFilter === "" ||
            productPurposes.some(
              (purpose) =>
                purpose ===
                  purposeFilter ||
                purpose.includes(
                  purposeFilter
                ) ||
                purposeFilter.includes(
                  purpose
                )
            );

          /* ---------------------------------------------
             Search
          --------------------------------------------- */

          const searchableText = [
            product.name,
            product.shortName,
            product.sku,
            product.category,
            product.collection,
            product.gemstone,
            product.material,
            product.origin,
            product.beadSize,
            product.chakra,
            product.element,
            product.weight,
            product.shortDescription,
            product.description,

            ...(Array.isArray(
              product.purpose
            )
              ? product.purpose
              : []),

            ...(Array.isArray(
              product.zodiac
            )
              ? product.zodiac
              : []),
          ]
            .filter(Boolean)
            .map((value) =>
              String(value).toLowerCase()
            )
            .join(" ");

          const searchMatch =
            search === "" ||
            searchableText.includes(
              search
            );

          /* ---------------------------------------------
             Stock
          --------------------------------------------- */

          const stockMatch =
            !inStockOnly ||
            Number(
              product.stock || 0
            ) > 0;

          /* ---------------------------------------------
             Featured
          --------------------------------------------- */

          const featuredMatch =
            !featuredOnly ||
            Boolean(product.featured);

          return (
            categoryMatch &&
            purposeMatch &&
            searchMatch &&
            stockMatch &&
            featuredMatch
          );
        }
      );
    }, [
      products,
      selectedCategory,
      purposeFilter,
      searchTerm,
      inStockOnly,
      featuredOnly,
    ]);

  /* -------------------------------------------------------
     Render
  ------------------------------------------------------- */

  return (
    <>
      {/* =====================================================
          TOOLBAR
      ===================================================== */}

      <div className="mt-12">
        <ShopToolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* =====================================================
          PRODUCTS AREA

          IMPORTANT:
          This is the destination for:

          #products
      ===================================================== */}

      <div
        id="products"
        className="
          mt-12
          scroll-mt-24
          grid
          grid-cols-1
          gap-10
          lg:grid-cols-12
        "
      >
        {/* ===================================================
            SIDEBAR
        =================================================== */}

        <aside className="lg:col-span-3">
          <FilterSidebar
            categories={categories}
            selectedCategory={
              selectedCategory
            }
            setSelectedCategory={
              handleCategoryChange
            }
            inStockOnly={
              inStockOnly
            }
            setInStockOnly={
              setInStockOnly
            }
            featuredOnly={
              featuredOnly
            }
            setFeaturedOnly={
              setFeaturedOnly
            }
          />
        </aside>

        {/* ===================================================
            PRODUCT GRID
        =================================================== */}

        <section className="lg:col-span-9">
          {/* =================================================
              SEARCH RESULTS
          ================================================= */}

          {searchTerm.trim() !== "" && (
            <div
              className="
                mb-8
                flex
                flex-col
                gap-2
                rounded-2xl
                border
                border-[#E5DCCF]
                bg-[#FBF7F0]
                px-6
                py-5
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[3px]
                    text-[#B88620]
                  "
                >
                  Search Results
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#6B6257]
                  "
                >
                  Showing results for{" "}
                  <span className="font-semibold text-[#1A1A1A]">
                    &quot;
                    {searchTerm.trim()}
                    &quot;
                  </span>
                </p>
              </div>

              <p
                className="
                  text-sm
                  font-semibold
                  text-[#8F691A]
                "
              >
                {
                  filteredProducts.length
                }{" "}
                {filteredProducts.length ===
                1
                  ? "product"
                  : "products"}
              </p>
            </div>
          )}

          {/* =================================================
              CATEGORY HEADING
          ================================================= */}

          {categoryFilter && (
            <div
              className="
                mb-8
                rounded-2xl
                border
                border-[#E5DCCF]
                bg-[#FBF7F0]
                px-6
                py-5
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-[#B88620]
                "
              >
                Collection
              </p>

              <h2
                className="
                  heading-font
                  mt-2
                  text-2xl
                  font-semibold
                  capitalize
                  text-[#1A1A1A]
                "
              >
                {initialCategory}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#6B6257]
                "
              >
                Discover products from
                this collection.
              </p>
            </div>
          )}

          {/* =================================================
              PURPOSE HEADING
          ================================================= */}

          {purposeFilter && (
            <div
              className="
                mb-8
                rounded-2xl
                border
                border-[#E5DCCF]
                bg-[#FBF7F0]
                px-6
                py-5
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[3px]
                  text-[#B88620]
                "
              >
                Your Intention
              </p>

              <h2
                className="
                  heading-font
                  mt-2
                  text-2xl
                  font-semibold
                  capitalize
                  text-[#1A1A1A]
                "
              >
                {purposeFilter}
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-[#6B6257]
                "
              >
                Discover products selected
                for this purpose.
              </p>
            </div>
          )}

          {/* =================================================
              PRODUCTS
          ================================================= */}

          <ProductGrid
            products={
              filteredProducts
            }
            selectedCategory=""
            searchTerm=""
            sortBy={sortBy}
          />
        </section>
      </div>
    </>
  );
}