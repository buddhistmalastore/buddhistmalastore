"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";

import {
  FiPlus,
  FiShoppingCart,
  FiCheck,
} from "react-icons/fi";

import { useCartContext } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function FrequentlyBoughtTogether({
  product,
  relatedProducts,
}: Props) {
  const { addToCart } = useCartContext();
  const { formatPrice } = useCurrency();

  /*
   * ---------------------------------------------------------
   * Bundle Products
   * ---------------------------------------------------------
   *
   * Use LIVE WooCommerce products passed from the
   * product page instead of the old static products data.
   */

  const bundle = useMemo(() => {
    const others = relatedProducts
      .filter((item) => item.id !== product.id)
      .slice(0, 2);

    return [product, ...others];
  }, [product, relatedProducts]);

  /*
   * ---------------------------------------------------------
   * Selected Products
   * ---------------------------------------------------------
   */

  const [selected, setSelected] = useState<boolean[]>([]);

  /*
   * Keep selection length synchronized with bundle.
   */

  const selectedProducts =
    selected.length === bundle.length
      ? selected
      : bundle.map(() => true);

  /*
   * ---------------------------------------------------------
   * Toggle
   * ---------------------------------------------------------
   */

  const toggle = (index: number) => {
    setSelected((prev) => {
      const current =
        prev.length === bundle.length
          ? prev
          : bundle.map(() => true);

      const copy = [...current];

      copy[index] = !copy[index];

      return copy;
    });
  };

  /*
   * ---------------------------------------------------------
   * Selected Items
   * ---------------------------------------------------------
   */

  const selectedItems = bundle.filter(
    (_, index) => selectedProducts[index]
  );

  /*
   * ---------------------------------------------------------
   * Subtotal
   * ---------------------------------------------------------
   */

  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  /*
   * ---------------------------------------------------------
   * Original Price
   * ---------------------------------------------------------
   */

  const original = selectedItems.reduce(
    (sum, item) =>
      sum + (item.oldPrice ?? item.price),
    0
  );

  /*
   * ---------------------------------------------------------
   * Saving
   * ---------------------------------------------------------
   */

  const saving = Math.max(
    original - subtotal,
    0
  );

  /*
   * ---------------------------------------------------------
   * Add Bundle To Cart
   * ---------------------------------------------------------
   */

  const handleAddBundle = () => {
    selectedItems.forEach((item) => {
      addToCart(item, 1);
    });
  };

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <section className="mt-24">

      {/* HEADER */}

      <div className="mb-10">

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[3px]
            text-[#C89A2A]
          "
        >
          Complete Your Collection
        </p>

        <h2
          className="
            mt-3
            text-4xl
            font-semibold
            text-[#1A1A1A]
          "
        >
          Frequently Bought Together
        </h2>

        <p
          className="
            mt-3
            max-w-2xl
            text-[15px]
            leading-8
            text-[#777]
          "
        >
          Customers frequently purchase these
          handcrafted products together.
        </p>

      </div>

      {/* BUNDLE */}

      <div
        className="
          rounded-3xl
          border
          border-[#ECE3D3]
          bg-white
          p-8
          shadow-sm
        "
      >

        <div
          className="
            grid
            gap-8
            lg:grid-cols-[1fr_320px]
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-5
              "
            >

              {bundle.map((item, index) => (

                <div
                  key={`${item.id}-${index}`}
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >

                  {/* PLUS */}

                  {index !== 0 && (
                    <FiPlus
                      size={28}
                      className="text-[#C89A2A]"
                    />
                  )}

                  <div className="w-[170px]">

                    {/* IMAGE */}

                    <Link
                      href={`/product/${item.slug}`}
                    >
                      <div
                        className="
                          relative
                          h-[170px]
                          rounded-2xl
                          border
                          border-[#ECE3D3]
                          bg-[#FAF8F4]
                        "
                      >

                        <Image
                          src={item.images[0]}
                          alt={item.name}
                          fill
                          className="
                            object-contain
                            p-5
                          "
                        />

                      </div>
                    </Link>

                    {/* CHECKBOX */}

                    <div
                      className="
                        mt-4
                        flex
                        items-start
                        gap-3
                      "
                    >

                      <input
                        type="checkbox"
                        checked={
                          selectedProducts[index]
                        }
                        onChange={() =>
                          toggle(index)
                        }
                        className="
                          mt-1
                          h-4
                          w-4
                          cursor-pointer
                          accent-[#C89A2A]
                        "
                      />

                      <div>

                        <Link
                          href={`/product/${item.slug}`}
                        >
                          <h4
                            className="
                              line-clamp-2
                              text-sm
                              font-semibold
                              hover:text-[#C89A2A]
                            "
                          >
                            {item.name}
                          </h4>
                        </Link>

                        <p
                          className="
                            mt-2
                            font-bold
                            text-[#C89A2A]
                          "
                        >
                          {formatPrice(item.price)}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              rounded-2xl
              bg-[#FAF8F4]
              p-7
            "
          >

            <h3
              className="
                text-xl
                font-semibold
              "
            >
              Bundle Summary
            </h3>

            {/* ITEMS */}

            <div
              className="
                mt-6
                space-y-4
              "
            >

              {bundle.map((item, index) => {

                if (!selectedProducts[index]) {
                  return null;
                }

                return (
                  <div
                    key={`${item.id}-summary`}
                    className="
                      flex
                      justify-between
                      gap-4
                      text-sm
                    "
                  >

                    <span
                      className="
                        line-clamp-1
                        min-w-0
                      "
                    >
                      {item.name}
                    </span>

                    <span
                      className="
                        whitespace-nowrap
                        font-semibold
                      "
                    >
                      {formatPrice(item.price)}
                    </span>

                  </div>
                );
              })}

            </div>

            {/* DIVIDER */}

            <div
              className="
                my-6
                border-t
                border-dashed
                border-[#DDD]
              "
            />

            {/* SUBTOTAL */}

            <div
              className="
                flex
                justify-between
              "
            >

              <span>
                Subtotal
              </span>

              <span className="font-semibold">
                {formatPrice(subtotal)}
              </span>

            </div>

            {/* SAVINGS */}

            {saving > 0 && (

              <div
                className="
                  mt-3
                  flex
                  justify-between
                  text-green-600
                "
              >

                <span>
                  You Save
                </span>

                <span className="font-semibold">
                  {formatPrice(saving)}
                </span>

              </div>

            )}

            {/* ADD BUNDLE */}

            <button
              type="button"
              onClick={handleAddBundle}
              disabled={selectedItems.length === 0}
              className="
                mt-8
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#C89A2A]
                py-4
                font-semibold
                text-white
                transition
                hover:bg-[#B5851F]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              <FiShoppingCart />

              Add Bundle to Cart

            </button>

            {/* TRUST */}

            <Link
              href="/shop"
              className="
                mt-4
                flex
                items-center
                justify-center
                gap-2
                text-sm
                text-[#666]
              "
            >

              <FiCheck />

              Premium handcrafted products

            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}