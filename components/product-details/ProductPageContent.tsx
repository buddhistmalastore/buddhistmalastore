"use client";

import { useRef } from "react";

import { Product } from "@/types/product";

import ProductBreadcrumb from "./ProductBreadcrumb";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";

import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether/FrequentlyBoughtTogether";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import ProductTabs from "./ProductTabs/ProductTabs";

import StickyBuyBar from "./StickyBuyBar/StickyBuyBar";

import useStickyBuyBar from "@/hooks/useStickyBuyBar";

interface Props {
  product: Product;
  previous?: Product;
  next?: Product;
  relatedProducts: Product[];
}

export default function ProductPageContent({
  product,
  previous,
  next,
  relatedProducts,
}: Props) {
  const buyBoxRef = useRef<HTMLElement | null>(null);

  const stickyVisible = useStickyBuyBar(buyBoxRef);

  return (
    <>
      {/* =========================================================
          MAIN PRODUCT CONTENT
      ========================================================= */}

      <section
        className="
          mx-auto
          max-w-[1450px]
          px-5
          py-8
          lg:px-10
        "
      >
        {/* =====================================================
            BREADCRUMB
        ===================================================== */}

        <ProductBreadcrumb product={product} />

        {/* =====================================================
            PRODUCT GALLERY + PRODUCT INFORMATION
        ===================================================== */}

        <div
          className="
            mt-8
            grid
            items-start
            gap-16
            xl:grid-cols-[48%_52%]
          "
        >
          {/* LEFT - GALLERY */}

          <aside
            className="
              self-start
              xl:sticky
              xl:top-24
            "
          >
            <ProductGallery product={product} />
          </aside>

          {/* RIGHT - PRODUCT INFO */}

          <section>
            <ProductInfo
              product={product}
              previous={previous}
              next={next}
              buyBoxRef={buyBoxRef}
            />
          </section>
        </div>

        {/* =====================================================
            FREQUENTLY BOUGHT TOGETHER
        ===================================================== */}

        <section className="mt-20">
          <FrequentlyBoughtTogether
            product={product}
            relatedProducts={relatedProducts}
          />
        </section>

        {/* =====================================================
            PRODUCT TABS
        ===================================================== */}

        <ProductTabs product={product} />

        {/* =====================================================
            RELATED PRODUCTS
        ===================================================== */}

        <section className="mt-24">
          <RelatedProducts
            products={relatedProducts}
          />
        </section>
      </section>

      {/* =======================================================
          STICKY BUY BAR
      ======================================================= */}

      <StickyBuyBar
        product={product}
        visible={stickyVisible}
      />
    </>
  );
}