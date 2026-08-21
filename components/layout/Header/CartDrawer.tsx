"use client";

import Image from "next/image";
import Link from "next/link";
import { FiX } from "react-icons/fi";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({
  open,
  onClose,
}: CartDrawerProps) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-[98]
          bg-black/40
          transition-all duration-300
          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          right-0
          top-0
          z-[99]
          flex
          h-screen
          w-[430px]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-500
          ${
            open
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <h2 className="heading-font text-3xl">
            Shopping Bag
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <FiX size={26} />
          </button>

        </div>

        {/* Product */}

        <div className="flex gap-5 border-b p-6">

          <Image
            src="/products/tiger-eye.jpg"
            width={90}
            height={90}
            alt=""
            className="rounded-xl"
          />

          <div className="flex-1">

            <h3 className="heading-font text-xl">
              Tiger Eye Mala
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Qty : 1
            </p>

            <p className="mt-3 font-semibold text-[#C79B2A]">
              Rs. 5,990
            </p>

          </div>

        </div>

        {/* Total */}

        <div className="mt-auto border-t p-8">

          <div className="mb-6 flex justify-between">

            <span>Subtotal</span>

            <span className="font-bold">
              Rs. 5,990
            </span>

          </div>

          <Link
            href="/cart"
            className="
              mb-4
              flex
              justify-center
              rounded-full
              border
              border-[#C79B2A]
              py-4
              font-semibold
              text-[#C79B2A]
              transition
              hover:bg-[#C79B2A]
              hover:text-white
            "
          >
            View Cart
          </Link>

          <Link
            href="/checkout"
            className="
              flex
              justify-center
              rounded-full
              bg-[#1A1A1A]
              py-4
              font-semibold
              text-white
              transition
              hover:bg-[#C79B2A]
            "
          >
            Checkout
          </Link>

        </div>

      </aside>
    </>
  );
}