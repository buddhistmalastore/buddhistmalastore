import { NextResponse } from "next/server";
import {
  getAuthenticatedCustomerId,
} from "@/lib/auth";

const WORDPRESS_URL = process.env.WORDPRESS_URL;
const CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

function getAuthHeader() {
  if (!CONSUMER_KEY || !CONSUMER_SECRET) {
    throw new Error(
      "WooCommerce API credentials are missing."
    );
  }

  return (
    "Basic " +
    Buffer.from(
      `${CONSUMER_KEY}:${CONSUMER_SECRET}`
    ).toString("base64")
  );
}

function clean(value: unknown, max = 100) {
  if (typeof value !== "string") return "";

  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

function cleanEmail(value: unknown) {
  return clean(value, 254)
    .toLowerCase();
}

async function getCustomer(customerId: number) {
  if (!WORDPRESS_URL) {
    throw new Error("WORDPRESS_URL is missing.");
  }

  const response = await fetch(
    `${WORDPRESS_URL}/wp-json/wc/v3/customers/${customerId}`,
    {
      headers: {
        Authorization: getAuthHeader(),
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to load customer address."
    );
  }

  return response.json();
}

/* =========================================================
   GET ADDRESSES
========================================================= */

export async function GET() {
  try {
    const customerId =
      await getAuthenticatedCustomerId();

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    const customer =
      await getCustomer(customerId);

    return NextResponse.json({
      success: true,

      billing: customer.billing || {},

      shipping: customer.shipping || {},
    });
  } catch (error) {
    console.error(
      "Addresses GET error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load your addresses.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PUT ADDRESSES
========================================================= */

export async function PUT(
  request: Request
) {
  try {
    const customerId =
      await getAuthenticatedCustomerId();

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be logged in.",
        },
        { status: 401 }
      );
    }

    if (!WORDPRESS_URL) {
      throw new Error("WORDPRESS_URL is missing.");
    }

    const body =
      await request.json();

    const billingInput =
      body.billing || {};

    const shippingInput =
      body.shipping || {};

    const billing = {
      first_name: clean(
        billingInput.first_name,
        50
      ),
      last_name: clean(
        billingInput.last_name,
        50
      ),
      company: clean(
        billingInput.company,
        100
      ),
      address_1: clean(
        billingInput.address_1,
        200
      ),
      address_2: clean(
        billingInput.address_2,
        200
      ),
      city: clean(
        billingInput.city,
        100
      ),
      state: clean(
        billingInput.state,
        100
      ),
      postcode: clean(
        billingInput.postcode,
        20
      ),
      country: clean(
        billingInput.country,
        2
      ).toUpperCase(),
      email: cleanEmail(
        billingInput.email
      ),
      phone: clean(
        billingInput.phone,
        30
      ),
    };

    const shipping = {
      first_name: clean(
        shippingInput.first_name,
        50
      ),
      last_name: clean(
        shippingInput.last_name,
        50
      ),
      company: clean(
        shippingInput.company,
        100
      ),
      address_1: clean(
        shippingInput.address_1,
        200
      ),
      address_2: clean(
        shippingInput.address_2,
        200
      ),
      city: clean(
        shippingInput.city,
        100
      ),
      state: clean(
        shippingInput.state,
        100
      ),
      postcode: clean(
        shippingInput.postcode,
        20
      ),
      country: clean(
        shippingInput.country,
        2
      ).toUpperCase(),
    };

    if (
      !billing.first_name ||
      !billing.last_name ||
      !billing.address_1 ||
      !billing.city ||
      !billing.country
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete the required billing address fields.",
        },
        { status: 400 }
      );
    }

    if (
      billing.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        billing.email
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/customers/${customerId}`,
      {
        method: "PUT",

        headers: {
          Authorization: getAuthHeader(),
          "Content-Type":
            "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          billing,
          shipping,
        }),

        cache: "no-store",
      }
    );

    const data =
      await response.json().catch(
        () => null
      );

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            typeof data?.message ===
            "string"
              ? data.message
              : "Unable to save your addresses.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Your addresses have been updated successfully.",
      billing: data.billing || billing,
      shipping:
        data.shipping || shipping,
    });
  } catch (error) {
    console.error(
      "Addresses PUT error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to save your addresses. Please try again.",
      },
      { status: 500 }
    );
  }
}