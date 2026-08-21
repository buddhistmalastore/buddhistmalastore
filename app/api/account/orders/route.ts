import { NextResponse } from "next/server";

import { getAuthenticatedCustomerId } from "@/lib/auth";

const WOOCOMMERCE_URL =
  process.env.WORDPRESS_URL;

const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;

const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

/* =========================================================
   GET /api/account/orders
========================================================= */

export async function GET() {
  try {
    /* =======================================================
       ENVIRONMENT
    ======================================================= */

    if (
      !WOOCOMMERCE_URL ||
      !WOOCOMMERCE_CONSUMER_KEY ||
      !WOOCOMMERCE_CONSUMER_SECRET
    ) {
      console.error(
        "WooCommerce credentials are missing."
      );

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
            "Please log in to view your orders.",
        },
        { status: 401 }
      );
    }

    /* =======================================================
       WOOCOMMERCE AUTHENTICATION
    ======================================================= */

    const credentials = Buffer.from(
      `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
    ).toString("base64");

    /* =======================================================
       WOOCOMMERCE ORDERS URL
    ======================================================= */

    const baseUrl =
      WOOCOMMERCE_URL.replace(/\/$/, "");

    const apiUrl =
      `${baseUrl}/wp-json/wc/v3/orders` +
      `?customer=${encodeURIComponent(
        String(customerId)
      )}` +
      `&per_page=50` +
      `&orderby=date` +
      `&order=desc`;

    /* =======================================================
       REQUEST ORDERS
    ======================================================= */

    const response = await fetch(
      apiUrl,
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
        "WooCommerce orders API failed:",
        response.status,
        errorText
      );

      return NextResponse.json(
        {
          success: false,
          error:
            "Unable to retrieve your orders.",
        },
        {
          status: response.status,
        }
      );
    }

    /* =======================================================
       WOOCOMMERCE RESPONSE
    ======================================================= */

    const wooOrders =
      await response.json();

    /* =======================================================
       FORMAT ORDERS
    ======================================================= */

    const orders =
      Array.isArray(wooOrders)
        ? wooOrders.map(
            (order: any) => ({
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

              total:
                order.total ||
                "0",

              currency:
                order.currency ||
                "AUD",

              payment_method_title:
                order.payment_method_title ||
                "",

              line_items:
                Array.isArray(
                  order.line_items
                )
                  ? order.line_items.map(
                      (item: any) => ({
                        id: item.id,

                        name:
                          item.name ||
                          "Product",

                        quantity:
                          Number(
                            item.quantity || 1
                          ),

                        total:
                          item.total ||
                          "0",

                        image:
                          item.image?.src ||
                          undefined,
                      })
                    )
                  : [],
            })
          )
        : [];

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "Account orders API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to load orders.",
      },
      { status: 500 }
    );
  }
}