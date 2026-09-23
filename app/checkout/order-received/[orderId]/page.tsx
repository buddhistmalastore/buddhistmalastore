import Link from "next/link";

import Header from "@/components/layout/Header/Header";

type PageProps = {
  params: Promise<{
    orderId: string;
  }>;
  searchParams: Promise<{
    key?: string;
  }>;
};

type WooOrder = {
  id: number;
  order_key: string;
  status: string;
  number: string;
  billing?: {
    first_name?: string;
    last_name?: string;
    email?: string;
  };
  payment_method_title?: string;
  total?: string;
  currency?: string;
};

function formatAmount(
  total: string | undefined,
  currency: string | undefined
) {
  if (!total) {
    return "";
  }

  const numericTotal = Number(total);

  if (!Number.isFinite(numericTotal)) {
    return total;
  }

  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(numericTotal);
  } catch {
    return `${currency || "USD"} ${total}`;
  }
}

async function getOrder(
  orderId: string,
  orderKey: string
): Promise<WooOrder | null> {
  const wordpressUrl = process.env.WORDPRESS_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (
    !wordpressUrl ||
    !consumerKey ||
    !consumerSecret ||
    !orderKey
  ) {
    return null;
  }

  const credentials = Buffer.from(
    `${consumerKey}:${consumerSecret}`
  ).toString("base64");

  const response = await fetch(
    `${wordpressUrl}/wp-json/wc/v3/orders/${encodeURIComponent(orderId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return null;
  }

  const order = (await response.json()) as WooOrder;

  /**
   * Never expose an order just because somebody knows
   * the numeric order ID.
   */
  if (order.order_key !== orderKey) {
    return null;
  }

  return order;
}

export default async function OrderReceivedPage({
  params,
  searchParams,
}: PageProps) {
  const { orderId } = await params;
  const { key } = await searchParams;

  if (!key) {
    return (
      <>
        <Header />

        <main className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">
              Order information unavailable
            </h1>

            <p className="mt-3 text-gray-600">
              The order verification information is missing.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  const order = await getOrder(orderId, key);

  if (!order) {
    return (
      <>
        <Header />

        <main className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-semibold text-gray-900">
              Order not found
            </h1>

            <p className="mt-3 text-gray-600">
              We could not verify this order.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>
          </div>
        </main>
      </>
    );
  }

  const customerName = [
    order.billing?.first_name,
    order.billing?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  const status = order.status.toLowerCase();

  const isSuccessful =
    status === "processing" ||
    status === "completed" ||
    status === "on-hold";

  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-semibold text-gray-900">
              {isSuccessful
                ? "Thank you for your order!"
                : "Your order has been received"}
            </h1>

            <p className="mt-3 text-gray-600">
              Order #{order.number}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Order Status
              </p>

              <p className="mt-1 font-medium capitalize text-gray-900">
                {status.replace(/-/g, " ")}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.payment_method_title || "PayPal"}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Customer
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {customerName || "Customer"}
              </p>

              {order.billing?.email && (
                <p className="mt-1 break-all text-sm text-gray-600">
                  {order.billing.email}
                </p>
              )}
            </div>

            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {formatAmount(
                  order.total,
                  order.currency
                )}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Continue Shopping
            </Link>

            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-sm font-medium text-gray-900"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}