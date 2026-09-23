import { NextResponse } from "next/server";

import { setAuthSession } from "@/lib/auth";

const WORDPRESS_URL = process.env.WORDPRESS_URL;
const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;
const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

const TURNSTILE_SECRET_KEY =
  process.env.TURNSTILE_SECRET_KEY;

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

if (!TURNSTILE_SECRET_KEY) {
  throw new Error(
    "TURNSTILE_SECRET_KEY is missing."
  );
}

/* =========================================================
   POST /api/auth/login
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const turnstileToken =
      typeof body.turnstileToken === "string"
        ? body.turnstileToken.trim()
        : "";

    /* =======================================================
       VALIDATION
    ======================================================= */

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email and password are required.",
        },
        { status: 400 }
      );
    }

    if (!turnstileToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please complete the human verification.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       CLOUDFLARE TURNSTILE VERIFICATION

       IMPORTANT:
       The secret key is used only on the server.
    ======================================================= */

    const turnstileFormData =
      new URLSearchParams();

    turnstileFormData.append(
  "secret",
  TURNSTILE_SECRET_KEY!
);

    turnstileFormData.append(
      "response",
      turnstileToken
    );

    const clientIp =
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "";

    if (clientIp) {
      turnstileFormData.append(
        "remoteip",
        clientIp.split(",")[0].trim()
      );
    }

    const turnstileResponse =
      await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body: turnstileFormData.toString(),
          cache: "no-store",
        }
      );

    if (!turnstileResponse.ok) {
      console.error(
        "Turnstile verification request failed:",
        turnstileResponse.status
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Human verification could not be completed. Please try again.",
        },
        { status: 403 }
      );
    }

    const turnstileResult =
      await turnstileResponse.json();

    if (
      !turnstileResult ||
      turnstileResult.success !== true
    ) {
      console.warn(
        "Turnstile verification failed:",
        turnstileResult?.["error-codes"] || []
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Human verification failed. Please try again.",
        },
        { status: 403 }
      );
    }

    /* =======================================================
       WORDPRESS LOGIN
    ======================================================= */

    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/bms/v1/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),

        cache: "no-store",
      }
    );

    /* =======================================================
       WORDPRESS ERROR
    ======================================================= */

    if (!response.ok) {
      let errorMessage =
        "Invalid email or password.";

      try {
        const errorData =
          await response.json();

        if (
          typeof errorData.message ===
          "string"
        ) {
          errorMessage =
            errorData.message;
        }
      } catch {
        // Keep default error message.
      }

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
        },
        {
          status: response.status,
        }
      );
    }

    /* =======================================================
       WORDPRESS CUSTOMER
    ======================================================= */

    const data = await response.json();

    if (
      !data ||
      data.success !== true ||
      !data.customer
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to authenticate your account.",
        },
        { status: 401 }
      );
    }

    const customer = data.customer;

    const customerId =
      Number(customer.id);

    if (
      !Number.isInteger(customerId) ||
      customerId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid customer account.",
        },
        { status: 500 }
      );
    }

    /* =======================================================
       CUSTOMER INFORMATION FROM LOGIN
    ======================================================= */

    let firstName =
      typeof customer.first_name === "string"
        ? customer.first_name.trim()
        : "";

    let lastName =
      typeof customer.last_name === "string"
        ? customer.last_name.trim()
        : "";

    let customerEmail =
      typeof customer.email === "string"
        ? customer.email.trim()
        : email;

    /* =======================================================
       WOOCOMMERCE CUSTOMER FALLBACK

       The BMS login endpoint may authenticate correctly but
       return empty first_name / last_name. In that case,
       retrieve the customer's WooCommerce profile.
    ======================================================= */

    if (
      !firstName ||
      !lastName ||
      !customerEmail
    ) {
      try {
        const wooAuth = Buffer.from(
          `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
        ).toString("base64");

        const wooCustomerResponse =
          await fetch(
            `${WORDPRESS_URL}/wp-json/wc/v3/customers/${customerId}`,
            {
              method: "GET",

              headers: {
                Authorization: `Basic ${wooAuth}`,
                Accept: "application/json",
              },

              cache: "no-store",
            }
          );

        if (wooCustomerResponse.ok) {
          const wooCustomer =
            await wooCustomerResponse.json();

          if (
            typeof wooCustomer.first_name ===
              "string" &&
            wooCustomer.first_name.trim()
          ) {
            firstName =
              wooCustomer.first_name.trim();
          }

          if (
            typeof wooCustomer.last_name ===
              "string" &&
            wooCustomer.last_name.trim()
          ) {
            lastName =
              wooCustomer.last_name.trim();
          }

          if (
            typeof wooCustomer.email ===
              "string" &&
            wooCustomer.email.trim()
          ) {
            customerEmail =
              wooCustomer.email.trim();
          }
        } else {
          console.warn(
            "WooCommerce customer lookup failed:",
            wooCustomerResponse.status
          );
        }
      } catch (wooError) {
        console.warn(
          "WooCommerce customer lookup error:",
          wooError
        );

        // Do not fail login just because
        // the profile lookup failed.
      }
    }

    /* =======================================================
       CREATE NEXT.JS SESSION
    ======================================================= */

    await setAuthSession({
      customerId,

      email: customerEmail || email,

      firstName,

      lastName,

      createdAt: Date.now(),
    });

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,

      customer: {
        id: customerId,

        email:
          customerEmail || email,

        first_name: firstName,

        last_name: lastName,
      },
    });
  } catch (error) {
    console.error(
      "Login API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to log in. Please try again.",
      },
      { status: 500 }
    );
  }
}