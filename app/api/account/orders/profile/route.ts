import { NextResponse } from "next/server";
import {
  getAuthenticatedCustomerId,
  getAuthSession,
  setAuthSession,
} from "@/lib/auth";

const WORDPRESS_URL = process.env.WORDPRESS_URL;
const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

if (!WORDPRESS_URL) {
  throw new Error("WORDPRESS_URL is missing.");
}

if (
  !WOOCOMMERCE_CONSUMER_KEY ||
  !WOOCOMMERCE_CONSUMER_SECRET
) {
  throw new Error(
    "WooCommerce API credentials are missing."
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getWooAuthHeader() {
  return (
    "Basic " +
    Buffer.from(
      `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
    ).toString("base64")
  );
}

function cleanName(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 50);
}

function cleanPhone(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, 30);
}

function cleanEmail(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

/* =========================================================
   GET /api/account/profile

   Returns the authenticated customer's profile.
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

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/customers/${customerId}`,
      {
        method: "GET",

        headers: {
          Authorization: getWooAuthHeader(),
          Accept: "application/json",
        },

        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "WooCommerce profile GET failed:",
        response.status
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to load your account details.",
        },
        { status: 500 }
      );
    }

    const customer =
      await response.json();

    return NextResponse.json({
      success: true,

      customer: {
        id: Number(customer.id),
        username:
          typeof customer.username === "string"
            ? customer.username
            : "",
        email:
          typeof customer.email === "string"
            ? customer.email
            : "",
        first_name:
          typeof customer.first_name === "string"
            ? customer.first_name
            : "",
        last_name:
          typeof customer.last_name === "string"
            ? customer.last_name
            : "",
        phone:
          typeof customer.billing?.phone ===
          "string"
            ? customer.billing.phone
            : "",
      },
    });
  } catch (error) {
    console.error(
      "Profile GET API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to load your account details.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PUT /api/account/profile

   Updates the authenticated customer's profile.
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

    const body =
      await request.json();

    const firstName =
      cleanName(body.firstName);

    const lastName =
      cleanName(body.lastName);

    const email =
      cleanEmail(body.email);

    const phone =
      cleanPhone(body.phone);

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!firstName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter your first name.",
        },
        { status: 400 }
      );
    }

    if (!lastName) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter your last name.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter your email address.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       GET CURRENT CUSTOMER

       We preserve the existing billing and shipping
       addresses while updating profile information.
    ======================================================= */

    const currentResponse =
      await fetch(
        `${WORDPRESS_URL}/wp-json/wc/v3/customers/${customerId}`,
        {
          method: "GET",

          headers: {
            Authorization:
              getWooAuthHeader(),
            Accept: "application/json",
          },

          cache: "no-store",
        }
      );

    if (!currentResponse.ok) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to retrieve your current account information.",
        },
        { status: 500 }
      );
    }

    const currentCustomer =
      await currentResponse.json();

    /* =======================================================
       UPDATE CUSTOMER
    ======================================================= */

    const billing = {
      ...(currentCustomer.billing || {}),

      first_name: firstName,
      last_name: lastName,
      email,
      phone,
    };

    const updateResponse =
      await fetch(
        `${WORDPRESS_URL}/wp-json/wc/v3/customers/${customerId}`,
        {
          method: "PUT",

          headers: {
            Authorization:
              getWooAuthHeader(),

            "Content-Type":
              "application/json",

            Accept: "application/json",
          },

          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,

            billing,
          }),

          cache: "no-store",
        }
      );

    const updateData =
      await updateResponse
        .json()
        .catch(() => null);

    if (!updateResponse.ok) {
      let errorMessage =
        "Unable to update your account details.";

      if (
        updateData &&
        typeof updateData.message ===
          "string"
      ) {
        errorMessage =
          updateData.message;
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        {
          status:
            updateResponse.status >= 400 &&
            updateResponse.status < 600
              ? updateResponse.status
              : 500,
        }
      );
    }

    /* =======================================================
       UPDATE NEXT.JS SESSION

       This keeps the Header and Account page synchronized
       immediately after saving the profile.
    ======================================================= */

    const existingSession =
      await getAuthSession();

    await setAuthSession({
      customerId,

      email:
        typeof updateData.email ===
        "string"
          ? updateData.email
          : email,

      firstName:
        typeof updateData.first_name ===
        "string"
          ? updateData.first_name
          : firstName,

      lastName:
        typeof updateData.last_name ===
        "string"
          ? updateData.last_name
          : lastName,

      createdAt:
        existingSession?.createdAt ||
        Date.now(),
    });

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,

      message:
        "Your account details have been updated successfully.",

      customer: {
        id: Number(updateData.id),

        username:
          typeof updateData.username ===
          "string"
            ? updateData.username
            : "",

        email:
          typeof updateData.email ===
          "string"
            ? updateData.email
            : email,

        first_name:
          typeof updateData.first_name ===
          "string"
            ? updateData.first_name
            : firstName,

        last_name:
          typeof updateData.last_name ===
          "string"
            ? updateData.last_name
            : lastName,

        phone:
          typeof updateData.billing?.phone ===
          "string"
            ? updateData.billing.phone
            : phone,
      },
    });
  } catch (error) {
    console.error(
      "Profile PUT API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to update your account details. Please try again.",
      },
      { status: 500 }
    );
  }
}