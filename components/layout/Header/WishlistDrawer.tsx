"use client";

import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiX } from "react-icons/fi";

interface WishlistDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({
  open,
  onClose,
}: WishlistDrawerProps) {
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
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          left-0
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
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <h2 className="heading-font text-3xl">
            Wishlist
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-[#F5F2ED]"
          >
            <FiX size={24} />
          </button>

        </div>

        {/* Item */}

        <div className="flex gap-5 border-b p-6">

          <Image
            src="/products/tiger-eye.jpg"
            alt=""
            width={90}
            height={90}
            className="rounded-xl"
          />

          <div className="flex-1">

            <h3 className="heading-font text-xl">
              Tiger Eye Mala
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Premium Gemstone Mala
            </p>

            <p className="mt-3 font-semibold text-[#C79B2A]">
              Rs. 5,990
            </p>

            <button
              className="
                mt-5
                flex
                items-center
                gap-2
                rounded-full
                bg-[#1A1A1A]
                px-5
                py-2
                text-white
                transition
                hover:bg-[#C79B2A]
              "
            >
              <FiShoppingBag />

              Add to Cart
            </button>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-auto border-t p-8">

          <Link
            href="/wishlist"
            className="
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
            View Wishlist
          </Link>

        </div>

      </aside>
    </>
  );
}