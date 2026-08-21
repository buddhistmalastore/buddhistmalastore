import { NextResponse } from "next/server";

import { getAuthenticatedCustomerId } from "@/lib/auth";

const WOOCOMMERCE_URL =
  process.env.WORDPRESS_URL;

const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;

const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

/* =========================================================
   GET /api/account/orders/[orderId]
========================================================= */

export async function GET(
  request: Request,
  context: {
    params: Promise<{
      orderId: string;
    }>;
  }
) {
  try {
    /* =======================================================
       ENVIRONMENT
    ======================================================= */

    if (
      !WOOCOMMERCE_URL ||
      !WOOCOMMERCE_CONSUMER_KEY ||
      !WOOCOMMERCE_CONSUMER_SECRET
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "WooCommerce API configuration is missing.",
        },
        { status: 500 }
      );
    }

    /* =======================================================
       AUTHENTICATION
    ======================================================= */

    const customerId =
      await getAuthenticatedCustomerId();

    if (!customerId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please log in to view this order.",
        },
        { status: 401 }
      );
    }

    /* =======================================================
       ORDER ID
    ======================================================= */

    const { orderId } =
      await context.params;

    const numericOrderId =
      Number(orderId);

    if (
      !Number.isInteger(
        numericOrderId
      ) ||
      numericOrderId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid order ID.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       WOOCOMMERCE AUTHENTICATION
    ======================================================= */

    const credentials =
      Buffer.from(
        `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
      ).toString("base64");

    const baseUrl =
      WOOCOMMERCE_URL.replace(
        /\/$/,
        ""
      );

    /* =======================================================
       GET ORDER
    ======================================================= */

    const response =
      await fetch(
        `${baseUrl}/wp-json/wc/v3/orders/${numericOrderId}`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Basic ${credentials}`,

            Accept:
              "application/json",
          },

          cache: "no-store",
        }
      );

    /* =======================================================
       WOOCOMMERCE ERROR
    ======================================================= */

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        "WooCommerce order API failed:",
        response.status,
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Order could not be found.",
        },
        {
          status:
            response.status === 404
              ? 404
              : 500,
        }
      );
    }

    const order =
      await response.json();

    /* =======================================================
       SECURITY CHECK
       IMPORTANT:
       Customer can ONLY see their own order.
    ======================================================= */

    const orderCustomerId =
      Number(order.customer_id || 0);

      console.log(
  "Order security check:",
  {
    loggedInCustomerId: customerId,
    orderCustomerId: order.customer_id,
    convertedOrderCustomerId: orderCustomerId,
    orderId: order.id,
  }
);

    if (
      orderCustomerId !==
      customerId
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You are not authorized to view this order.",
        },
        { status: 403 }
      );
    }

    /* =======================================================
       FORMAT LINE ITEMS
    ======================================================= */

    const lineItems =
      Array.isArray(
        order.line_items
      )
        ? order.line_items.map(
            (item: any) => ({
              id: item.id,

              product_id:
                item.product_id,

              name:
                item.name ||
                "Product",

              quantity:
                Number(
                  item.quantity || 1
                ),

              subtotal:
                item.subtotal ||
                "0",

              total:
                item.total ||
                "0",

              image:
                item.image?.src ||
                undefined,
            })
          )
        : [];

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,

      order: {
        id: order.id,

        number:
          order.number ||
          String(order.id),

        status:
          order.status ||
          "unknown",

        date_created:
          order.date_created ||
          "",

        date_modified:
          order.date_modified ||
          "",

        currency:
          order.currency ||
          "AUD",

        subtotal:
          order.total
            ? order.total
            : "0",

        total:
          order.total ||
          "0",

        discount_total:
          order.discount_total ||
          "0",

        shipping_total:
          order.shipping_total ||
          "0",

        shipping_tax:
          order.shipping_tax ||
          "0",

        cart_tax:
          order.cart_tax ||
          "0",

        payment_method:
          order.payment_method ||
          "",

        payment_method_title:
          order.payment_method_title ||
          "",

        customer_note:
          order.customer_note ||
          "",

        billing:
          order.billing || null,

        shipping:
          order.shipping || null,

        line_items:
          lineItems,

        shipping_lines:
          Array.isArray(
            order.shipping_lines
          )
            ? order.shipping_lines.map(
                (shipping: any) => ({
                  id: shipping.id,

                  method_title:
                    shipping.method_title ||
                    "",

                  total:
                    shipping.total ||
                    "0",
                })
              )
            : [],
      },
    });
  } catch (error) {
    console.error(
      "Order details API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load order.",
      },
      { status: 500 }
    );
  }
}