import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type PaymentDataItem = {
  key: string;
  value: string | boolean;
};

type AddressInput = {
  firstName?: unknown;
  lastName?: unknown;
  country?: unknown;
  address?: unknown;
  apartment?: unknown;
  city?: unknown;
  province?: unknown;
  postalCode?: unknown;
  email?: unknown;
  phone?: unknown;
};

export async function POST(request: NextRequest) {
  const wordpressUrl = process.env.WORDPRESS_URL?.replace(/\/$/, "");
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  if (!wordpressUrl || !consumerKey || !consumerSecret) {
    return NextResponse.json(
      {
        success: false,
        error: "WooCommerce server configuration is incomplete.",
      },
      { status: 500 }
    );
  }

  const cartToken = request.headers.get("Cart-Token");

  if (!cartToken) {
    return NextResponse.json(
      { success: false, error: "Cart-Token is required." },
      { status: 400 }
    );
  }

  try {
    const body = await request.json();

    const orderId = Number(body?.orderId);
    const customer = body?.customer;
    const paymentData = body?.paymentData as PaymentDataItem[] | undefined;

    if (!Number.isInteger(orderId) || orderId <= 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order ID." },
        { status: 400 }
      );
    }

    if (!Array.isArray(paymentData) || paymentData.length === 0) {
      return NextResponse.json(
        { success: false, error: "Payment data is required." },
        { status: 400 }
      );
    }

    const auth = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const orderResponse = await fetch(
      `${wordpressUrl}/wp-json/wc/v3/orders/${orderId}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const order = await orderResponse.json().catch(() => null);

    if (!orderResponse.ok || !order?.order_key) {
      console.error("Unable to retrieve WooCommerce order key:", order);

      return NextResponse.json(
        {
          success: false,
          error: "Unable to retrieve the WooCommerce order key.",
        },
        { status: 502 }
      );
    }

    /*
     * Shipping address always comes from the checkout's shipping form.
     *
     * Billing address uses the separate billing form when
     * "Same as shipping address" is unchecked.
     */
    const shippingCountryCode = getCountryCode(customer?.country);

    if (!shippingCountryCode) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported shipping country: ${String(
            customer?.country || ""
          )}`,
        },
        { status: 400 }
      );
    }

    const shippingAddress = buildShippingAddress(customer, shippingCountryCode);

    const billingSameAsShipping = customer?.billingSameAsShipping !== false;
    const billingSource: AddressInput = billingSameAsShipping
      ? customer
      : customer?.billing || {};

    const billingCountryCode = getCountryCode(billingSource.country);

    if (!billingCountryCode) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported billing country: ${String(
            billingSource.country || ""
          )}`,
        },
        { status: 400 }
      );
    }

    const billingAddress = buildBillingAddress(
      billingSource,
      customer,
      billingCountryCode
    );

    const checkoutResponse = await fetch(
      `${wordpressUrl}/wp-json/wc/store/v1/checkout/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cart-Token": cartToken,
        },
        body: JSON.stringify({
          key: order.order_key,
          billing_email: String(customer?.email || ""),
          billing_address: billingAddress,
          shipping_address: shippingAddress,
          payment_method: "woocommerce_payments",
          payment_data: paymentData,
        }),
        cache: "no-store",
      }
    );

    const result = await checkoutResponse.json().catch(() => null);

    if (!checkoutResponse.ok) {
      console.error("WooPayments Store API payment failed:", result);

      return NextResponse.json(
        {
          success: false,
          error:
            result?.message ||
            result?.data?.message ||
            "WooPayments could not process the payment.",
          details:
            process.env.NODE_ENV === "development" ? result : undefined,
        },
        { status: checkoutResponse.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        payment: {
          status:
            result?.payment_result?.payment_status ||
            result?.status ||
            "success",
          redirect_url: result?.payment_result?.redirect_url || null,
          order_id: result?.order_id || orderId,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("WooPayments payment route failed:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to process the card payment.",
      },
      { status: 500 }
    );
  }
}

function buildShippingAddress(
  customer: AddressInput,
  countryCode: string
) {
  return {
    first_name: String(customer?.firstName || ""),
    last_name: String(customer?.lastName || ""),
    company: "",
    address_1: String(customer?.address || ""),
    address_2: String(customer?.apartment || ""),
    city: String(customer?.city || ""),
    state: String(customer?.province || ""),
    postcode: String(customer?.postalCode || ""),
    country: countryCode,
    phone: String(customer?.phone || ""),
  };
}

function buildBillingAddress(
  billing: AddressInput,
  customer: AddressInput,
  countryCode: string
) {
  return {
    first_name: String(billing?.firstName || customer?.firstName || ""),
    last_name: String(billing?.lastName || customer?.lastName || ""),
    company: "",
    address_1: String(billing?.address || ""),
    address_2: String(billing?.apartment || ""),
    city: String(billing?.city || ""),
    state: String(billing?.province || ""),
    postcode: String(billing?.postalCode || ""),
    country: countryCode,
    email: String(customer?.email || ""),
    phone: String(billing?.phone || customer?.phone || ""),
  };
}

function getCountryCode(country: unknown): string | null {
  const normalized = String(country || "").trim();

  const map: Record<string, string> = {
    Nepal: "NP",
    Australia: "AU",
    Canada: "CA",
    India: "IN",
    Japan: "JP",
    China: "CN",
    Germany: "DE",
    Brazil: "BR",
    Mexico: "MX",
    "United Kingdom": "GB",
    "United States": "US",
  };

  return map[normalized] || null;
}
