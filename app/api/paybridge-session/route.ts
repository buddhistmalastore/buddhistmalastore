import { NextResponse } from "next/server";

/* =========================================================
   PAYBRIDGE CONFIGURATION
========================================================= */

const PAYBRIDGE_API_URL =
  "https://api.paybridgenp.com";

const PAYBRIDGE_SECRET_KEY =
  process.env.PAYBRIDGE_SECRET_KEY;

/* =========================================================
   VALIDATE ENVIRONMENT
========================================================= */

if (!PAYBRIDGE_SECRET_KEY) {
  throw new Error(
    "PAYBRIDGE_SECRET_KEY is missing from .env.local"
  );
}

/* =========================================================
   POST
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      orderId,
      orderNumber,
      amount,
      customer,
      paymentMethod,
    } = body;

    /* =======================================================
       BASIC VALIDATION
    ======================================================= */

    if (!orderId) {
      return NextResponse.json(
        {
          success: false,
          error: "WooCommerce order ID is required.",
        },
        { status: 400 }
      );
    }

    if (!orderNumber) {
      return NextResponse.json(
        {
          success: false,
          error: "WooCommerce order number is required.",
        },
        { status: 400 }
      );
    }

    if (
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid order amount is required.",
        },
        { status: 400 }
      );
    }

    if (
      paymentMethod !== "esewa" &&
      paymentMethod !== "khalti" &&
      paymentMethod !== "fonepay"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid Nepal payment method.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       CUSTOMER
    ======================================================= */

    const firstName =
      typeof customer?.firstName === "string"
        ? customer.firstName.trim()
        : "";

    const lastName =
      typeof customer?.lastName === "string"
        ? customer.lastName.trim()
        : "";

    const email =
      typeof customer?.email === "string"
        ? customer.email.trim()
        : "";

    const phone =
      typeof customer?.phone === "string"
        ? customer.phone.trim()
        : "";

    /* =======================================================
       AMOUNT

       PayBridgeNP expects paisa.

       Example:
       NPR 100 = 10000 paisa
    ======================================================= */

    const amountInPaisa =
      Math.round(amount * 100);

    /* =======================================================
       RETURN URL
    ======================================================= */

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const returnUrl =
      `${siteUrl}/payment-return`;

    const cancelUrl =
      `${siteUrl}/payment-cancelled`;

    /* =======================================================
       PAYBRIDGE CHECKOUT SESSION
    ======================================================= */

    const paybridgeResponse =
      await fetch(
        `${PAYBRIDGE_API_URL}/v1/checkout`,
        {
          method: "POST",

          headers: {
            Authorization:
              `Bearer ${PAYBRIDGE_SECRET_KEY}`,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            amount: amountInPaisa,

            currency: "NPR",

            return_url: returnUrl,

            cancel_url: cancelUrl,

            metadata: {
              order_id:
                String(orderId),

              order_number:
                String(orderNumber),

              payment_method:
                paymentMethod,
            },

            customer: {
              name:
                `${firstName} ${lastName}`.trim(),

              email,

              phone,
            },
          }),

          cache: "no-store",
        }
      );

    /* =======================================================
       PAYBRIDGE ERROR
    ======================================================= */

    if (!paybridgeResponse.ok) {
      const errorText =
        await paybridgeResponse.text();

      console.error(
        "PayBridgeNP checkout session failed:",
        errorText
      );

      return NextResponse.json(
        {
          success: false,

          error:
            "Unable to create PayBridge payment session.",

          details:
            process.env.NODE_ENV ===
            "development"
              ? errorText
              : undefined,
        },
        {
          status:
            paybridgeResponse.status,
        }
      );
    }

    /* =======================================================
       RESPONSE
    ======================================================= */

    const session =
      await paybridgeResponse.json();

    console.log(
      "PayBridgeNP session created:",
      session
    );

    /* =======================================================
       CHECK CHECKOUT URL
    ======================================================= */

    if (!session.checkout_url) {
      return NextResponse.json(
        {
          success: false,

          error:
            "PayBridgeNP did not return a checkout URL.",
        },
        { status: 502 }
      );
    }

    /* =======================================================
       RETURN
    ======================================================= */

    return NextResponse.json({
      success: true,

      session: {
        id:
          session.id ||
          session.session_id ||
          null,

        checkout_url:
          session.checkout_url,

        amount:
          amountInPaisa,

        currency:
          "NPR",

        payment_method:
          paymentMethod,

        order_id:
          orderId,

        order_number:
          orderNumber,
      },
    });
  } catch (error) {
    console.error(
      "PayBridgeNP session API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to start payment.",
      },
      { status: 500 }
    );
  }
}