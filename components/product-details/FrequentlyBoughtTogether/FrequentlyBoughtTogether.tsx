"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Product } from "@/types/product";
import { products } from "@/data/products";

import {
  FiPlus,
  FiShoppingCart,
  FiCheck,
} from "react-icons/fi";

interface Props {
  product: Product;
}

export default function FrequentlyBoughtTogether({
  product,
}: Props) {
  // Demo bundle
  const bundle = useMemo(() => {
    const others = products
      .filter((p) => p.id !== product.id)
      .slice(0, 2);

    return [product, ...others];
  }, [product]);

  const [selected, setSelected] = useState(
    bundle.map(() => true)
  );

  const toggle = (index: number) => {
    const copy = [...selected];
    copy[index] = !copy[index];
    setSelected(copy);
  };

  const subtotal = bundle.reduce((sum, item, index) => {
    return selected[index]
      ? sum + item.price
      : sum;
  }, 0);

  const original = bundle.reduce((sum, item, index) => {
    return selected[index]
      ? sum + (item.oldPrice ?? item.price)
      : sum;
  }, 0);

  const saving = original - subtotal;

  return (
    <section className="mt-24">

      <div className="mb-10">

        <p className="text-xs font-semibold uppercase tracking-[3px] text-[#C89A2A]">
          Complete Your Collection
        </p>

        <h2 className="mt-3 text-4xl font-semibold text-[#1A1A1A]">
          Frequently Bought Together
        </h2>

        <p className="mt-3 max-w-2xl text-[15px] leading-8 text-[#777]">
          Customers frequently purchase these handcrafted products together.
        </p>

      </div>

      <div className="rounded-3xl border border-[#ECE3D3] bg-white p-8 shadow-sm">

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

          {/* LEFT */}

          <div>

            <div className="flex flex-wrap items-center gap-5">

              {bundle.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-5"
                >
                  {index !== 0 && (
                    <FiPlus
                      size={28}
                      className="text-[#C89A2A]"
                    />
                  )}

                  <div className="w-[170px]">

                    <div className="relative h-[170px] rounded-2xl border border-[#ECE3D3] bg-[#FAF8F4]">

                      <Image
                        src={item.images[0]}
                        alt={item.name}
                        fill
                        className="object-contain p-5"
                      />

                    </div>

                    <label className="mt-4 flex cursor-pointer items-start gap-3">

                      <input
                        type="checkbox"
                        checked={selected[index]}
                        onChange={() => toggle(index)}
                        className="mt-1 h-4 w-4 accent-[#C89A2A]"
                      />

                      <div>

                        <h4 className="line-clamp-2 text-sm font-semibold">
                          {item.name}
                        </h4>

                        <p className="mt-2 text-[#C89A2A] font-bold">
                          NPR {item.price}
                        </p>

                      </div>

                    </label>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="rounded-2xl bg-[#FAF8F4] p-7">

            <h3 className="text-xl font-semibold">
              Bundle Summary
            </h3>

            <div className="mt-6 space-y-4">

              {bundle.map((item, index) => {
                if (!selected[index]) return null;

                return (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="line-clamp-1 mr-4">
                      {item.name}
                    </span>

                    <span className="font-semibold">
                      NPR {item.price}
                    </span>

                  </div>
                );
              })}

            </div>

            <div className="my-6 border-t border-dashed border-[#DDD]" />

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span className="font-semibold">
                NPR {subtotal}
              </span>

            </div>

            {saving > 0 && (
              <div className="mt-3 flex justify-between text-green-600">

                <span>You Save</span>

                <span className="font-semibold">
                  NPR {saving}
                </span>

              </div>
            )}

            <button
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
              "
            >
              <FiShoppingCart />

              Add Bundle to Cart

            </button>

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