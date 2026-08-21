"use client";

import { Product } from "@/types/product";
import { FiCheckCircle } from "react-icons/fi";

import ProductRating from "@/components/ui/product/ProductRating";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

import { useCurrency } from "@/context/CurrencyContext";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const { formatPrice } = useCurrency();

  return (
    <div className="flex flex-col">

      {/* Badge */}

      {product.badge && (
        <span
          className="
            mb-4
            inline-flex
            w-fit
            rounded-full
            bg-[#F6E7BF]
            px-4
            py-1.5
            text-xs
            font-semibold
            uppercase
            tracking-[2px]
            text-[#8A5A00]
          "
        >
          {product.badge}
        </span>
      )}

      {/* Product Name */}

      <h1
        className="
          heading-font
          text-5xl
          leading-tight
          text-[#1A1A1A]
        "
      >
        {product.name}
      </h1>

      {/* Rating */}

      <div className="mt-5">
        <ProductRating
          rating={product.rating}
          reviewCount={product.reviews}
        />
      </div>

      {/* Price */}

      <div className="mt-8">
        <h2
          className="
            text-5xl
            font-semibold
            text-[#C79B2A]
          "
        >
          {formatPrice(product.price)}
        </h2>
      </div>

      {/* Short Description */}

      <p
        className="
          mt-8
          max-w-xl
          text-[17px]
          leading-8
          text-[#6B645C]
        "
      >
        {product.description}
      </p>

      {/* Specifications */}

      <div className="mt-10 space-y-4">

        <Spec
          label="Material"
          value={product.material}
        />

        <Spec
          label="Origin"
          value={product.origin}
        />

        <Spec
          label="Bead Size"
          value={`${product.beadSize} mm`}
        />

        <Spec
          label="Bead Count"
          value={`${product.beadCount}`}
        />

        <Spec
          label="Weight"
          value={`${product.weight} g`}
        />

      </div>

      {/* Stock */}

      <div className="mt-8 flex items-center gap-3">

        <FiCheckCircle
          className="text-green-600"
          size={22}
        />

        <span className="font-medium text-green-700">
          In Stock
        </span>

      </div>

      {/* Quantity */}

      <div className="mt-10">
        <QuantitySelector />
      </div>

      {/* Buttons */}

      <div className="mt-10">
        <ProductActions
          product={product}
        />
      </div>

      {/* Shipping */}

      <div
        className="
          mt-10
          rounded-3xl
          bg-[#F7F3EC]
          p-6
        "
      >
        <h3 className="font-semibold text-[#1A1A1A]">
          Free Worldwide Shipping
        </h3>

        <p className="mt-2 text-[#6E665D]">
          Handcrafted in Nepal • Secure Payment • Premium Packaging
        </p>
      </div>

    </div>
  );
}

interface SpecProps {
  label: string;
  value: string;
}

function Spec({
  label,
  value,
}: SpecProps) {
  return (
    <div className="flex justify-between border-b border-[#E8DFD2] pb-3">

      <span className="text-[#7B746C]">
        {label}
      </span>

      <span className="font-medium text-[#1A1A1A]">
        {value}
      </span>

    </div>
  );
}