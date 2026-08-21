"use client";

import { RefObject } from "react";

import { Product } from "@/types/product";

import ProductHeader from "./ProductHeader";
import ProductPrice from "./ProductPrice";
import ProductBuyBox from "./ProductBuyBox";
import ProductGuarantee from "./ProductGuarantee";
import ProductSpecsGrid from "./ProductSpecsGrid";

interface Props {
  product: Product;
  previous?: Product;
  next?: Product;
  buyBoxRef: RefObject<HTMLElement | null>;
}

export default function ProductInfo({
  product,
  previous,
  next,
  buyBoxRef,
}: Props) {
  return (
    <section>

      {/* Product Header */}

      <ProductHeader
        product={product}
        previous={previous}
        next={next}
      />

      {/* Price */}

      <div className="mt-5">
        <ProductPrice product={product} />
      </div>

      {/* Purchase Section */}

      <div className="mt-8">
        <ProductBuyBox
          product={product}
          buyBoxRef={buyBoxRef}
        />
      </div>

      {/* Specifications */}

      <div className="mt-8">
        <ProductSpecsGrid product={product} />
      </div>

      {/* Trust Bar */}

      <div className="mt-6">
        <ProductGuarantee />
      </div>

    </section>
  );
}