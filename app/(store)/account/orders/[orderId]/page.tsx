"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  Package,
  Truck,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface OrderItem {
  id: number;
  product_id: number;
  name: string;
  quantity: number;
  subtotal: string;
  total: string;
  image?: string;
}

interface Address {
  first_name?: string;
  last_name?: string;
  company?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  email?: string;
  phone?: string;
}

interface Order {
  id: number;
  number: string;
  status: string;
  date_created: string;
  date_modified: string;
  currency: string;

  subtotal: string;
  total: string;
  discount_total: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;

  payment_method: string;
  payment_method_title: string;

  customer_note: string;

  billing: Address | null;
  shipping: Address | null;

  line_items: OrderItem[];

  shipping_lines: {
    id: number;
    method_title: string;
    total: string;
  }[];
}

/* =========================================================
   HELPERS
========================================================= */

function formatMoney(
  amount: string | number,
  currency: string
) {
  const value = Number(amount || 0);

  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
}

function formatDate(date: string) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

function formatStatus(status: string) {
  return status
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle2 size={18} />;

    case "processing":
      return <Package size={18} />;

    case "shipped":
      return <Truck size={18} />;

    default:
      return <Clock3 size={18} />;
  }
}

/* =========================================================
   PAGE
========================================================= */

export default function OrderDetailsPage() {
  const params = useParams();

  const orderId =
    typeof params.orderId === "string"
      ? params.orderId
      : "";

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /* =======================================================
     LOAD ORDER
  ======================================================= */

  useEffect(() => {
    if (!orderId) return;

    async function loadOrder() {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `/api/account/orders/${orderId}`,
            {
              method: "GET",
              credentials: "include",
              cache: "no-store",
            }
          );

        const data =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.error ||
              "Unable to load order."
          );
        }

        setOrder(data.order);
      } catch (err) {
        console.error(
          "Order details error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load order."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">
        <section className="px-6 py-20 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="animate-pulse">

              <div className="h-4 w-32 rounded bg-[#E8DFD2]" />

              <div className="mt-6 h-10 w-64 rounded bg-[#E8DFD2]" />

              <div className="mt-3 h-5 w-80 rounded bg-[#E8DFD2]" />

              <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">

                <div className="h-80 rounded-3xl bg-white" />

                <div className="h-80 rounded-3xl bg-white" />

              </div>

            </div>

          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#FAF8F4]">

        <section className="px-6 py-20 lg:px-8">

          <div className="mx-auto max-w-xl text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F1E8D7] text-[#C89A2A]">
              <Package size={28} />
            </div>

            <h1 className="mt-6 text-3xl font-semibold text-[#1A1A1A]">
              Order Not Found
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {error ||
                "We couldn't find this order."}
            </p>

            <Link
              href="/account/orders"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C89A2A] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ArrowLeft size={17} />
              Back to My Orders
            </Link>

          </div>

        </section>

      </main>
    );
  }

  /* =======================================================
     TOTALS
  ======================================================= */

  const subtotal =
    Number(order.subtotal || 0);

  const discount =
    Number(order.discount_total || 0);

  const shipping =
    Number(order.shipping_total || 0);

  const total =
    Number(order.total || 0);

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#FAF8F4]">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="border-b border-[#E8DFD2] bg-white">

        <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">

          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#C89A2A]"
          >
            <ArrowLeft size={16} />
            Back to My Orders
          </Link>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#C89A2A]">
                Order Details
              </p>

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
                Order #{order.number}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Placed on{" "}
                {formatDate(
                  order.date_created
                )}
              </p>

            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F5EEDC] px-4 py-2 text-sm font-semibold text-[#9B7519]">
              {getStatusIcon(order.status)}

              {formatStatus(
                order.status
              )}
            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="px-6 py-10 lg:px-8 lg:py-14">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-6">

              {/* PRODUCTS */}

              <div className="rounded-3xl border border-[#E8DFD2] bg-white p-6 shadow-sm sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEDC] text-[#C89A2A]">
                    <Package size={19} />
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#1A1A1A]">
                      Items Ordered
                    </h2>

                    <p className="text-sm text-gray-500">
                      {order.line_items.length}{" "}
                      {order.line_items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                </div>

                <div className="mt-6 divide-y divide-[#F0E7D8]">

                  {order.line_items.map(
                    (item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 py-5 first:pt-0 last:pb-0"
                      >

                        {/* IMAGE */}

                        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-[#F7F3EC]">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-[#C89A2A]">
                              <Package
                                size={25}
                              />
                            </div>
                          )}

                        </div>

                        {/* INFO */}

                        <div className="min-w-0 flex-1">

                          <h3 className="font-semibold text-[#1A1A1A]">
                            {item.name}
                          </h3>

                          <p className="mt-1 text-sm text-gray-500">
                            Quantity:{" "}
                            {item.quantity}
                          </p>

                          <p className="mt-3 text-sm font-semibold text-[#9B7519]">
                            {formatMoney(
                              item.total,
                              order.currency
                            )}
                          </p>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* ADDRESSES */}

              <div className="grid gap-6 md:grid-cols-2">

                {/* BILLING */}

                <AddressCard
                  title="Billing Address"
                  address={
                    order.billing
                  }
                />

                {/* SHIPPING */}

                <AddressCard
                  title="Shipping Address"
                  address={
                    order.shipping
                  }
                />

              </div>

              {/* PAYMENT */}

              <div className="rounded-3xl border border-[#E8DFD2] bg-white p-6 shadow-sm sm:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEDC] text-[#C89A2A]">
                    <CreditCard
                      size={19}
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-semibold text-[#1A1A1A]">
                      Payment
                    </h2>

                    <p className="text-sm text-gray-500">
                      Payment method
                    </p>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-[#FAF8F4] p-4">

                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    {order.payment_method_title ||
                      "Payment"}
                  </p>

                </div>

              </div>

              {/* CUSTOMER NOTE */}

              {order.customer_note && (
                <div className="rounded-3xl border border-[#E8DFD2] bg-white p-6 shadow-sm sm:p-8">

                  <h2 className="text-lg font-semibold text-[#1A1A1A]">
                    Order Note
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {order.customer_note}
                  </p>

                </div>
              )}

            </div>

            {/* =================================================
                RIGHT — SUMMARY
            ================================================= */}

            <aside>

              <div className="sticky top-28 rounded-3xl border border-[#E8DFD2] bg-white p-6 shadow-sm sm:p-7">

                <h2 className="text-xl font-semibold text-[#1A1A1A]">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4 text-sm">

                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-[#1A1A1A]">
                      {formatMoney(
                        subtotal,
                        order.currency
                      )}
                    </span>

                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between gap-4">

                      <span className="text-gray-500">
                        Discount
                      </span>

                      <span className="font-medium text-green-600">
                        -
                        {formatMoney(
                          discount,
                          order.currency
                        )}
                      </span>

                    </div>
                  )}

                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      Shipping
                    </span>

                    <span className="font-medium text-[#1A1A1A]">
                      {shipping === 0
                        ? "Free"
                        : formatMoney(
                            shipping,
                            order.currency
                          )}
                    </span>

                  </div>

                </div>

                <div className="my-6 border-t border-[#E8DFD2]" />

                <div className="flex items-end justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="mt-1 text-2xl font-semibold text-[#1A1A1A]">
                      {formatMoney(
                        total,
                        order.currency
                      )}
                    </p>

                  </div>

                  <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    {order.currency}
                  </span>

                </div>

                <div className="mt-6 rounded-2xl bg-[#FAF8F4] p-4">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 text-[#C89A2A]">
                      <CheckCircle2
                        size={18}
                      />
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-[#1A1A1A]">
                        Order received
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Thank you for shopping
                        with Buddhist Mala
                        Store.
                      </p>

                    </div>

                  </div>

                </div>

                <Link
                  href="/account/orders"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCCBAE] px-5 py-3 text-sm font-semibold text-[#9B7519] transition hover:bg-[#FAF8F4]"
                >
                  <ArrowLeft size={16} />
                  All Orders
                </Link>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   ADDRESS CARD
========================================================= */

function AddressCard({
  title,
  address,
}: {
  title: string;
  address: Address | null;
}) {
  if (!address) {
    return (
      <div className="rounded-3xl border border-[#E8DFD2] bg-white p-6 shadow-sm">

        <h2 className="text-lg font-semibold text-[#1A1A1A]">
          {title}
        </h2>

        <p className="mt-4 text-sm text-gray-500">
          No address information available.
        </p>

      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-[#E8DFD2] bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EEDC] text-[#C89A2A]">
          <MapPin size={19} />
        </div>

        <h2 className="text-lg font-semibold text-[#1A1A1A]">
          {title}
        </h2>

      </div>

      <div className="mt-5 text-sm leading-6 text-gray-600">

        <p className="font-semibold text-[#1A1A1A]">
          {address.first_name}{" "}
          {address.last_name}
        </p>

        {address.company && (
          <p>{address.company}</p>
        )}

        {address.address_1 && (
          <p>{address.address_1}</p>
        )}

        {address.address_2 && (
          <p>{address.address_2}</p>
        )}

        {(address.city ||
          address.state ||
          address.postcode) && (
          <p>
            {address.city}
            {address.city &&
            address.state
              ? ", "
              : ""}
            {address.state}{" "}
            {address.postcode}
          </p>
        )}

        {address.country && (
          <p>{address.country}</p>
        )}

        {address.phone && (
          <p className="mt-3">
            {address.phone}
          </p>
        )}

        {address.email && (
          <p className="break-all">
            {address.email}
          </p>
        )}

      </div>

    </div>
  );
}