"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type OrderStatus =
  | "pending"
  | "processing"
  | "on-hold"
  | "completed"
  | "cancelled"
  | "refunded"
  | "failed"
  | "unknown";

type Order = {
  id: number;
  number: string;
  status: OrderStatus;
  date_created: string;
  total: string;
  currency: string;
  payment_method_title?: string;
  line_items?: {
    id: number;
    name: string;
    quantity: number;
    total: string;
    image?: string;
  }[];
};

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/account/orders", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load orders.");
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.error || "Unable to load orders."
          );
        }

        setOrders(data.orders || []);
      } catch (err) {
        console.error("Orders loading error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  function getStatusLabel(status: OrderStatus) {
    switch (status) {
      case "pending":
        return "Pending";

      case "processing":
        return "Processing";

      case "on-hold":
        return "On Hold";

      case "completed":
        return "Completed";

      case "cancelled":
        return "Cancelled";

      case "refunded":
        return "Refunded";

      case "failed":
        return "Failed";

      default:
        return "Unknown";
    }
  }

  function getStatusClass(status: OrderStatus) {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "on-hold":
        return "bg-orange-100 text-orange-700";

      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-700";

      case "refunded":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function formatDate(date: string) {
    if (!date) return "—";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  }

  function formatMoney(
    total: string,
    currency: string
  ) {
    const amount = Number(total);

    if (!Number.isFinite(amount)) {
      return total;
    }

    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency || "AUD",
      }).format(amount);
    } catch {
      return `${currency || ""} ${total}`;
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="mb-8">

          <Link
            href="/account"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#C89A2A]"
          >
            <span>←</span>
            Back to My Account
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-[#C89A2A]">
                My Account
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A1A] sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 max-w-xl text-gray-600">
                View your previous orders, payment status,
                products and order details.
              </p>
            </div>

            {!loading && !error && (
              <div className="rounded-full border border-[#eadfca] bg-white px-4 py-2 text-sm text-gray-600 shadow-sm">
                {orders.length}{" "}
                {orders.length === 1 ? "Order" : "Orders"}
              </div>
            )}
          </div>
        </div>

        {/* ==================================================
            LOADING
        ================================================== */}

        {loading && (
          <div className="rounded-3xl border border-[#eadfca] bg-white p-10 shadow-sm">

            <div className="flex flex-col items-center justify-center py-14 text-center">

              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#eadfca] border-t-[#C89A2A]" />

              <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
                Loading your orders
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Please wait while we retrieve your orders.
              </p>

            </div>
          </div>
        )}

        {/* ==================================================
            ERROR
        ================================================== */}

        {!loading && error && (
          <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">

            <div className="flex flex-col items-center justify-center py-10 text-center">

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600">
                !
              </div>

              <h2 className="mt-5 text-xl font-semibold text-[#1A1A1A]">
                Unable to load your orders
              </h2>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-xl bg-[#C89A2A] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try Again
              </button>

            </div>
          </div>
        )}

        {/* ==================================================
            EMPTY
        ================================================== */}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="rounded-3xl border border-[#eadfca] bg-white p-8 shadow-sm">

              <div className="flex flex-col items-center justify-center py-14 text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7efe2] text-3xl">
                  🛍️
                </div>

                <h2 className="mt-6 text-2xl font-semibold text-[#1A1A1A]">
                  No orders yet
                </h2>

                <p className="mt-2 max-w-md text-gray-500">
                  You haven't placed an order yet.
                  Explore our collection and discover
                  something special.
                </p>

                <Link
                  href="/shop"
                  className="mt-7 rounded-xl bg-[#C89A2A] px-7 py-3 font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
                >
                  Start Shopping
                </Link>

              </div>
            </div>
          )}

        {/* ==================================================
            ORDERS
        ================================================== */}

        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="space-y-5">

              {orders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-3xl border border-[#eadfca] bg-white shadow-sm transition hover:shadow-md"
                >

                  {/* ORDER HEADER */}

                  <div className="border-b border-[#f0e7d8] px-5 py-5 sm:px-7">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                          Order
                        </p>

                        <p className="mt-1 text-xl font-semibold text-[#1A1A1A]">
                          #{order.number}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Placed on{" "}
                          {formatDate(order.date_created)}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">

                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>

                      </div>
                    </div>
                  </div>

                  {/* PRODUCTS */}

                  <div className="px-5 py-5 sm:px-7">

                    {order.line_items &&
                    order.line_items.length > 0 ? (
                      <div className="space-y-4">

                        {order.line_items.map(
                          (item) => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >

                              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#faf8f4]">

                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center text-xl">
                                    🕉️
                                  </div>
                                )}

                              </div>

                              <div className="min-w-0 flex-1">

                                <h3 className="truncate font-medium text-[#1A1A1A]">
                                  {item.name}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                  Quantity:{" "}
                                  {item.quantity}
                                </p>

                              </div>

                              <div className="text-right">

                                <p className="font-semibold text-[#1A1A1A]">
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
                    ) : (
                      <p className="text-sm text-gray-500">
                        Order items unavailable.
                      </p>
                    )}

                  </div>

                  {/* FOOTER */}

                  <div className="flex flex-col gap-4 border-t border-[#f0e7d8] bg-[#fcfaf6] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                    <div>

                      <p className="text-xs uppercase tracking-[0.12em] text-gray-400">
                        Total
                      </p>

                      <p className="mt-1 text-xl font-semibold text-[#1A1A1A]">
                        {formatMoney(
                          order.total,
                          order.currency
                        )}
                      </p>

                      {order.payment_method_title && (
                        <p className="mt-1 text-xs text-gray-500">
                          Paid via{" "}
                          {order.payment_method_title}
                        </p>
                      )}

                    </div>

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex items-center justify-center rounded-xl border border-[#C89A2A] px-5 py-3 text-sm font-semibold text-[#9b7519] transition hover:bg-[#C89A2A] hover:text-white"
                    >
                      View Order
                      <span className="ml-2">
                        →
                      </span>
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          )}

      </div>
    </main>
  );
}