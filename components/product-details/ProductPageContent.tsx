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
  const buyBoxRef =
    useRef<HTMLElement | null>(null);

  const stickyVisible =
    useStickyBuyBar(buyBoxRef);

  return (
    <>
      {/* Main Product Content */}

      <section
        className="
          mx-auto
          max-w-[1450px]
          px-5
          py-8
          lg:px-10
        "
      >
        {/* Breadcrumb */}

        <ProductBreadcrumb
          product={product}
        />

        {/* Gallery + Product Info */}

        <div
          className="
            mt-8
            grid
            items-start
            gap-16
            xl:grid-cols-[48%_52%]
          "
        >
          {/* LEFT - Gallery */}

          <aside
            className="
              self-start
              xl:sticky
              xl:top-24
            "
          >
            <ProductGallery
              product={product}
            />
          </aside>

          {/* RIGHT - Product Information */}

          <section>
            <ProductInfo
              product={product}
              previous={previous}
              next={next}
              buyBoxRef={buyBoxRef}
            />
          </section>
        </div>

        {/* Frequently Bought Together */}

        <section className="mt-20">
          <FrequentlyBoughtTogether
            product={product}
          />
        </section>

        {/* Product Tabs */}

        <ProductTabs
          product={product}
        />

        {/* Related Products */}

        <section className="mt-24">
          <RelatedProducts
            products={relatedProducts}
          />
        </section>
      </section>

      {/* Sticky Buy Bar */}

      <StickyBuyBar
        product={product}
        visible={stickyVisible}
      />
    </>
  );
}