"use client";

import Link from "next/link";
import { FiX } from "react-icons/fi";
import { navigation } from "@/constants/navigation";

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenuDrawer({
  open,
  onClose,
}: MobileMenuDrawerProps) {
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
          top-0
          left-0
          z-[99]
          h-screen
          w-[320px]
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
        <div className="flex items-center justify-between border-b px-6 py-6">

          <h2 className="heading-font text-3xl">
            Menu
          </h2>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <FiX size={24} />
          </button>

        </div>

        <nav className="flex flex-col p-6">

          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="
                border-b
                border-[#EFE8DB]
                py-5
                text-lg
                text-[#1A1A1A]
                transition
                hover:text-[#C79B2A]
              "
            >
              {item.title}
            </Link>
          ))}

        </nav>

        <div className="mt-auto p-6">

          <Link
            href="/account"
            className="
              flex
              justify-center
              rounded-full
              bg-[#1A1A1A]
              py-4
              text-white
              transition
              hover:bg-[#C79B2A]
            "
          >
            My Account
          </Link>

        </div>

      </aside>
    </>
  );
}