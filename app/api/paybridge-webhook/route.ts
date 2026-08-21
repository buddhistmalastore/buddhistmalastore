import { NextResponse } from "next/server";
import crypto from "node:crypto";

/* =========================================================
   PAYBRIDGE CONFIGURATION
========================================================= */

const PAYBRIDGE_WEBHOOK_SECRET =
  process.env.PAYBRIDGE_WEBHOOK_SECRET;

const WOOCOMMERCE_URL =
  process.env.WOOCOMMERCE_URL ||
  "https://wp.buddhistmalastore.com";

const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;

const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

/* =========================================================
   VALIDATE ENVIRONMENT
========================================================= */

function validateEnvironment() {
  if (!PAYBRIDGE_WEBHOOK_SECRET) {
    throw new Error(
      "PAYBRIDGE_WEBHOOK_SECRET is missing."
    );
  }

  if (!WOOCOMMERCE_CONSUMER_KEY) {
    throw new Error(
      "WOOCOMMERCE_CONSUMER_KEY is missing."
    );
  }

  if (!WOOCOMMERCE_CONSUMER_SECRET) {
    throw new Error(
      "WOOCOMMERCE_CONSUMER_SECRET is missing."
    );
  }
}

/* =========================================================
   WEBHOOK SIGNATURE VERIFICATION
========================================================= */

function verifyPayBridgeSignature(
  rawBody: string,
  signatureHeader: string,
  secret: string
) {
  try {
    const parts =
      signatureHeader
        .split(",")
        .map((part) => part.trim())
        .reduce(
          (result, part) => {
            const [key, ...valueParts] =
              part.split("=");

            result[key] =
              valueParts.join("=");

            return result;
          },
          {} as Record<string, string>
        );

    const timestamp = parts.t;
    const receivedSignature = parts.v1;

    if (
      !timestamp ||
      !receivedSignature
    ) {
      return false;
    }

    /* =====================================================
       REPLAY PROTECTION

       PayBridgeNP recommends a 5-minute window.
    ===================================================== */

    const timestampSeconds =
      Number(timestamp);

    if (
      !Number.isFinite(timestampSeconds)
    ) {
      return false;
    }

    const currentTimestamp =
      Math.floor(Date.now() / 1000);

    const difference =
      Math.abs(
        currentTimestamp -
          timestampSeconds
      );

    if (difference > 300) {
      console.error(
        "PayBridge webhook rejected: timestamp too old."
      );

      return false;
    }

    /* =====================================================
       HMAC SHA256

       Signed content:

       timestamp + "." + raw request body
    ===================================================== */

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(
          `${timestamp}.${rawBody}`
        )
        .digest("hex");

    const receivedBuffer =
      Buffer.from(
        receivedSignature,
        "utf8"
      );

    const expectedBuffer =
      Buffer.from(
        expectedSignature,
        "utf8"
      );

    if (
      receivedBuffer.length !==
      expectedBuffer.length
    ) {
      return false;
    }

    return crypto.timingSafeEqual(
      receivedBuffer,
      expectedBuffer
    );
  } catch (error) {
    console.error(
      "PayBridge signature verification error:",
      error
    );

    return false;
  }
}

/* =========================================================
   WOOCOMMERCE REQUEST
========================================================= */

async function updateWooCommerceOrder(
  orderId: string | number,
  updateData: Record<string, unknown>
) {
  const url =
    `${WOOCOMMERCE_URL}/wp-json/wc/v3/orders/${encodeURIComponent(
      String(orderId)
    )}`;

  const auth =
    Buffer.from(
      `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
    ).toString("base64");

  const response =
    await fetch(url, {
      method: "PUT",

      headers: {
        Authorization:
          `Basic ${auth}`,

        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(
        updateData
      ),

      cache: "no-store",
    });

  const responseText =
    await response.text();

  if (!response.ok) {
    console.error(
      "WooCommerce order update failed:",
      response.status,
      responseText
    );

    throw new Error(
      `WooCommerce order update failed: ${response.status}`
    );
  }

  return JSON.parse(
    responseText
  );
}

/* =========================================================
   EXTRACT ORDER ID
========================================================= */

function getOrderIdFromEvent(
  event: any
): string | null {
  /*
   * PayBridge metadata is created by our
   * paybridge-session route:
   *
   * metadata.order_id
   */

  const candidates = [
    event?.data?.metadata?.order_id,

    event?.data?.payment?.metadata?.order_id,

    event?.metadata?.order_id,

    event?.payment?.metadata?.order_id,

    event?.data?.object?.metadata?.order_id,
  ];

  for (const value of candidates) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value);
    }
  }

  return null;
}

/* =========================================================
   EXTRACT PAYMENT INFORMATION
========================================================= */

function getPaymentData(event: any) {
  const payment =
    event?.data?.payment ||
    event?.data ||
    event?.payment ||
    event?.data?.object ||
    {};

  return {
    paymentId:
      payment?.id ||
      event?.payment_id ||
      event?.data?.id ||
      null,

    provider:
      payment?.provider ||
      payment?.payment_method ||
      event?.provider ||
      event?.payment_method ||
      null,

    providerReference:
      payment?.provider_ref ||
      payment?.provider_reference ||
      event?.provider_ref ||
      null,

    amount:
      payment?.amount ??
      event?.amount ??
      null,

    currency:
      payment?.currency ||
      event?.currency ||
      "NPR",
  };
}

/* =========================================================
   POST WEBHOOK
========================================================= */

export async function POST(
  request: Request
) {
  try {
    validateEnvironment();

    /* =====================================================
       IMPORTANT

       DO NOT use request.json() before signature
       verification.

       We need the exact raw request body.
    ===================================================== */

    const rawBody =
      await request.text();

    const signatureHeader =
      request.headers.get(
        "x-paybridgenp-signature"
      );

    if (!signatureHeader) {
      console.error(
        "PayBridge webhook rejected: missing signature."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Missing webhook signature.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       VERIFY SIGNATURE
    ===================================================== */

    const validSignature =
      verifyPayBridgeSignature(
        rawBody,
        signatureHeader,
        PAYBRIDGE_WEBHOOK_SECRET!
      );

    if (!validSignature) {
      console.error(
        "PayBridge webhook rejected: invalid signature."
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid webhook signature.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       PARSE EVENT

       Signature is already verified.
    ===================================================== */

    let event: any;

    try {
      event =
        JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid JSON payload.",
        },
        { status: 400 }
      );
    }

    console.log(
      "PayBridge verified webhook:",
      JSON.stringify(
        event,
        null,
        2
      )
    );

    /* =====================================================
       EVENT TYPE
    ===================================================== */

    const eventType =
      event?.type ||
      event?.event ||
      event?.name ||
      "";

    /* =====================================================
       PAYMENT INFORMATION
    ===================================================== */

    const payment =
      getPaymentData(event);

    const orderId =
      getOrderIdFromEvent(event);

    /* =====================================================
       PAYMENT SUCCEEDED
    ===================================================== */

    if (
      eventType ===
      "payment.succeeded"
    ) {
      if (!orderId) {
        console.error(
          "Payment succeeded but WooCommerce order ID was not found."
        );

        return NextResponse.json(
          {
            success: false,
            error:
              "WooCommerce order ID missing from payment metadata.",
          },
          { status: 400 }
        );
      }

      /* ===================================================
         UPDATE WOOCOMMERCE

         processing is the normal paid status for a
         physical product order that still needs fulfilment.
      =================================================== */

      const updateData: Record<
        string,
        unknown
      > = {
        status: "processing",

        set_paid: true,
      };

      /* ===================================================
         PAYMENT METHOD
      =================================================== */

      if (payment.provider) {
        updateData.payment_method =
          `paybridge_${String(
            payment.provider
          ).toLowerCase()}`;

        updateData.payment_method_title =
          `PayBridgeNP - ${String(
            payment.provider
          )}`;
      }

      /* ===================================================
         TRANSACTION ID
      =================================================== */

      if (payment.paymentId) {
        updateData.transaction_id =
          String(
            payment.paymentId
          );
      } else if (
        payment.providerReference
      ) {
        updateData.transaction_id =
          String(
            payment.providerReference
          );
      }

      /* ===================================================
         UPDATE ORDER
      =================================================== */

      const order =
        await updateWooCommerceOrder(
          orderId,
          updateData
        );

      console.log(
        `WooCommerce order #${orderId} marked as paid.`,
        {
          paymentId:
            payment.paymentId,

          provider:
            payment.provider,

          providerReference:
            payment.providerReference,

          amount:
            payment.amount,

          currency:
            payment.currency,

          wooStatus:
            order?.status,
        }
      );

      return NextResponse.json({
        success: true,

        received: true,

        event:
          "payment.succeeded",

        order_id:
          String(orderId),

        payment_id:
          payment.paymentId,
      });
    }

    /* =====================================================
       PAYMENT FAILED
    ===================================================== */

    if (
      eventType ===
      "payment.failed"
    ) {
      console.log(
        "PayBridge payment failed:",
        {
          orderId,
          paymentId:
            payment.paymentId,
          provider:
            payment.provider,
        }
      );

      /*
       * We intentionally do NOT mark the order as paid.
       *
       * WooCommerce can remain pending.
       */

      return NextResponse.json({
        success: true,

        received: true,

        event:
          "payment.failed",

        order_id:
          orderId,
      });
    }

    /* =====================================================
       PAYMENT CANCELLED
    ===================================================== */

    if (
      eventType ===
      "payment.cancelled"
    ) {
      console.log(
        "PayBridge payment cancelled:",
        {
          orderId,
          paymentId:
            payment.paymentId,
        }
      );

      /*
       * Do not mark as paid.
       */

      return NextResponse.json({
        success: true,

        received: true,

        event:
          "payment.cancelled",

        order_id:
          orderId,
      });
    }

    /* =====================================================
       PAYMENT REFUNDED
    ===================================================== */

    if (
      eventType ===
      "payment.refunded"
    ) {
      console.log(
        "PayBridge payment refunded:",
        {
          orderId,
          paymentId:
            payment.paymentId,
        }
      );

      /*
       * We are deliberately not automatically changing
       * WooCommerce to refunded yet.
       *
       * We can add a proper WooCommerce refund synchronization
       * after the successful-payment flow is confirmed.
       */

      return NextResponse.json({
        success: true,

        received: true,

        event:
          "payment.refunded",

        order_id:
          orderId,
      });
    }

    /* =====================================================
       UNKNOWN EVENT
    ===================================================== */

    console.log(
      "PayBridge webhook received unknown event:",
      eventType
    );

    /*
     * Return 200 so PayBridgeNP does not repeatedly retry
     * an event that our application does not currently use.
     */

    return NextResponse.json({
      success: true,

      received: true,

      ignored: true,

      event:
        eventType || null,
    });
  } catch (error) {
    console.error(
      "PayBridge webhook error:",
      error
    );

    /*
     * Return 500 for server-side processing errors.
     *
     * This allows PayBridgeNP to retry the webhook.
     */

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Webhook processing failed.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   OPTIONAL GET
========================================================= */

export async function GET() {
  return NextResponse.json({
    success: true,

    endpoint:
      "PayBridgeNP webhook",

    message:
      "Webhook endpoint is online.",
  });
}