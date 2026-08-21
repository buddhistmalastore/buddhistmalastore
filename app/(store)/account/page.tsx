"use client";

import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Heart,
  CreditCard,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#faf8f4]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#eadfca] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C89A2A]">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1A1A1A] md:text-5xl">
            Welcome back
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Manage your orders, account details, addresses and
            saved items from one place.
          </p>
        </div>
      </section>

      {/* =====================================================
          ACCOUNT CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* =================================================
              ORDERS
          ================================================= */}

          <Link
            href="/account/orders"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">
                <Package size={24} strokeWidth={1.7} />
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              My Orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              View your orders, payment status, products and
              delivery progress.
            </p>
          </Link>

          {/* =================================================
              PROFILE
          ================================================= */}

          <Link
            href="/account/profile"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">
                <User size={24} strokeWidth={1.7} />
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Account Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Manage your name, email address and personal
              account information.
            </p>
          </Link>

          {/* =================================================
              ADDRESSES
          ================================================= */}

          <Link
            href="/account/addresses"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">
                <MapPin size={24} strokeWidth={1.7} />
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              My Addresses
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Manage your billing and shipping addresses.
            </p>
          </Link>

          {/* =================================================
              WISHLIST
          ================================================= */}

          <Link
            href="/wishlist"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">
                <Heart size={24} strokeWidth={1.7} />
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Wishlist
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              View and manage products you've saved for later.
            </p>
          </Link>

          {/* =================================================
              PAYMENT
          ================================================= */}

          <div className="rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">
              <CreditCard size={24} strokeWidth={1.7} />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Payment Methods
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Payment methods are securely handled through
              WooCommerce and our payment providers.
            </p>
          </div>

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              console.log("Logout will be connected to authentication.");
            }}
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                <LogOut size={24} strokeWidth={1.7} />
              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1"
              />
            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Logout
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Sign out securely from your BuddhistMalaPro account.
            </p>
          </button>
        </div>

        {/* ===================================================
            INFORMATION CARD
        =================================================== */}

        <div className="mt-10 rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C89A2A]">
                Buddhist Mala Store
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#1A1A1A]">
                Your account, your orders, your journey.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                Everything related to your purchases will be
                available here as we continue building your
                customer experience.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#C89A2A] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}