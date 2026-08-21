import { NextResponse } from "next/server";

import {
  createWooCommerceOrder,
  CreateWooCommerceOrderInput,
} from "@/lib/woocommerce";

/* =========================================================
   TYPES
========================================================= */

type PaymentMethod =
  | "fonepay"
  | "paypal"
  | "card";

/* =========================================================
   PAYMENT METHODS
========================================================= */

const NEPAL_PAYMENT_METHODS: PaymentMethod[] = [
  "fonepay",
];

const INTERNATIONAL_PAYMENT_METHODS: PaymentMethod[] = [
  "paypal",
  "card",
];

/* =========================================================
   PAYMENT TITLES
========================================================= */

const PAYMENT_TITLES: Record<
  PaymentMethod,
  string
> = {
  fonepay: "Fonepay",
  paypal: "PayPal",
  card: "Credit / Debit Card",
};

/* =========================================================
   VALID PAYMENT METHODS
========================================================= */

const VALID_PAYMENT_METHODS: PaymentMethod[] = [
  "fonepay",
  "paypal",
  "card",
];

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: Request
) {
  try {
    const body =
      await request.json();

    const {
      paymentMethod,
      customer,
      items,
      notes,
    } = body;

    /* =======================================================
       BASIC VALIDATION
    ======================================================= */

    if (
      !customer ||
      typeof customer !== "object"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Customer information is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your cart is empty.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       PAYMENT METHOD VALIDATION
    ======================================================= */

    if (
      typeof paymentMethod !==
        "string" ||
      !VALID_PAYMENT_METHODS.includes(
        paymentMethod as PaymentMethod
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select a valid payment method.",
        },
        {
          status: 400,
        }
      );
    }

    const selectedPaymentMethod =
      paymentMethod as PaymentMethod;

    /* =======================================================
       COUNTRY
    ======================================================= */

    const country =
      typeof customer.country ===
      "string"
        ? customer.country.trim()
        : "";

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please select your country.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       NORMALIZE COUNTRY
    ======================================================= */

    const normalizedCountry =
      country
        .toLowerCase()
        .trim();

    const isNepal =
      normalizedCountry ===
        "nepal" ||
      normalizedCountry === "np" ||
      normalizedCountry === "npl";

    /* =======================================================
       COUNTRY / PAYMENT COMPATIBILITY
    ======================================================= */

    if (
      isNepal &&
      !NEPAL_PAYMENT_METHODS.includes(
        selectedPaymentMethod
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Customers in Nepal can pay using Fonepay only.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !isNepal &&
      !INTERNATIONAL_PAYMENT_METHODS.includes(
        selectedPaymentMethod
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "International customers can pay using PayPal or Credit / Debit Card.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       WOOCOMMERCE PAYMENT GATEWAY
    ======================================================= */

    let wooPaymentMethod: string;

    switch (
      selectedPaymentMethod
    ) {
      case "fonepay":
        /*
         * PayBridgeNP WooCommerce gateway
         */
        wooPaymentMethod =
          "paybridge_np";
        break;

      case "paypal":
        /*
         * WooCommerce PayPal Payments
         */
        wooPaymentMethod =
          "ppcp-gateway";
        break;

      case "card":
        /*
         * WooPayments
         */
        wooPaymentMethod =
          "woocommerce_payments";
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error:
              "Unsupported payment method.",
          },
          {
            status: 400,
          }
        );
    }

    /* =======================================================
       PAYMENT TITLE
    ======================================================= */

    const wooPaymentTitle =
      PAYMENT_TITLES[
        selectedPaymentMethod
      ];

    /* =======================================================
       PAYMENT PROVIDER
    ======================================================= */

    const paymentProvider =
      isNepal
        ? "fonepay"
        : null;

    /* =======================================================
       LINE ITEMS
    ======================================================= */

    const lineItems =
      items.map(
        (item: {
          id:
            | number
            | string;

          quantity:
            | number
            | string;
        }) => ({
          product_id:
            Number(item.id),

          quantity:
            Number(item.quantity),
        })
      );

    /* =======================================================
       VALIDATE LINE ITEMS
    ======================================================= */

    const invalidItem =
      lineItems.some(
        (item) =>
          !Number.isInteger(
            item.product_id
          ) ||
          item.product_id <= 0 ||
          !Number.isInteger(
            item.quantity
          ) ||
          item.quantity <= 0
      );

    if (invalidItem) {
      return NextResponse.json(
        {
          success: false,
          error:
            "One or more products in your cart are invalid.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       CUSTOMER FIELDS
    ======================================================= */

    const firstName =
      typeof customer.firstName ===
      "string"
        ? customer.firstName.trim()
        : "";

    const lastName =
      typeof customer.lastName ===
      "string"
        ? customer.lastName.trim()
        : "";

    const email =
      typeof customer.email ===
      "string"
        ? customer.email.trim()
        : "";

    const phone =
      typeof customer.phone ===
      "string"
        ? customer.phone.trim()
        : "";

    const address =
      typeof customer.address ===
      "string"
        ? customer.address.trim()
        : "";

    const apartment =
      typeof customer.apartment ===
      "string"
        ? customer.apartment.trim()
        : "";

    const city =
      typeof customer.city ===
      "string"
        ? customer.city.trim()
        : "";

    const province =
      typeof customer.province ===
      "string"
        ? customer.province.trim()
        : "";

    const postalCode =
      typeof customer.postalCode ===
      "string"
        ? customer.postalCode.trim()
        : "";

    /* =======================================================
       BILLING
    ======================================================= */

    const billing = {
      first_name:
        firstName,

      last_name:
        lastName,

      email,

      phone,

      address_1:
        address,

      address_2:
        apartment,

      city,

      state:
        province,

      postcode:
        postalCode,

      country,
    };

    /* =======================================================
       SHIPPING
    ======================================================= */

    const shipping = {
      first_name:
        firstName,

      last_name:
        lastName,

      address_1:
        address,

      address_2:
        apartment,

      city,

      state:
        province,

      postcode:
        postalCode,

      country,
    };

    /* =======================================================
       ORDER META DATA
    ======================================================= */

    const metaData = [
      {
        key:
          "_checkout_payment_method",

        value:
          selectedPaymentMethod,
      },

      {
        key:
          "_checkout_currency",

        value:
          "USD",
      },
    ];

    /* =======================================================
       PAYBRIDGE PROVIDER
    ======================================================= */

    if (paymentProvider) {
      metaData.push({
        key:
          "_paybridge_provider",

        value:
          paymentProvider,
      });
    }

    /* =======================================================
       CREATE WOOCOMMERCE ORDER
       
       IMPORTANT:
       
       We intentionally DO NOT send a currency field here.
       
       WooCommerce must use the store currency configured
       in WooCommerce Settings → General.
       
       That currency MUST be USD.
    ======================================================= */

    const order:
      CreateWooCommerceOrderInput =
      {
        payment_method:
          wooPaymentMethod,

        payment_method_title:
          wooPaymentTitle,

        set_paid:
          false,

        billing,

        shipping,

        line_items:
          lineItems,

        customer_note:
          typeof notes ===
          "string"
            ? notes.trim()
            : "",

        meta_data:
          metaData,
      };

    /* =======================================================
       CREATE ORDER
    ======================================================= */

    const createdOrder =
      await createWooCommerceOrder(
        order
      );

    /* =======================================================
       VERIFY WOOCOMMERCE CURRENCY
    ======================================================= */

    const orderCurrency =
      String(
        createdOrder.currency ||
          ""
      ).toUpperCase();

    console.log(
      "WooCommerce order created:",
      {
        id:
          createdOrder.id,

        number:
          createdOrder.number,

        total:
          createdOrder.total,

        currency:
          orderCurrency,
      }
    );

    /* =======================================================
       CRITICAL CURRENCY CHECK
    ======================================================= */

    if (
      orderCurrency !==
      "USD"
    ) {
      console.error(
        "CRITICAL: WooCommerce currency is not USD.",
        {
          orderId:
            createdOrder.id,

          currency:
            orderCurrency,
        }
      );

      return NextResponse.json(
        {
          success: false,

          error:
            `WooCommerce order currency is ${orderCurrency}. Expected USD. Please set WooCommerce → Settings → General → Currency to United States (US) dollar.`,

          orderCurrency:
            orderCurrency,
        },
        {
          status: 500,
        }
      );
    }

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,

      order: {
        id:
          createdOrder.id,

        number:
          createdOrder.number,

        status:
          createdOrder.status,

        total:
          createdOrder.total,

        /*
         * WooCommerce master currency.
         */
        currency:
          "USD",

        payment_method:
          selectedPaymentMethod,

        payment_method_title:
          wooPaymentTitle,

        woo_payment_method:
          wooPaymentMethod,

        payment_provider:
          paymentProvider,

        payment_url:
          createdOrder.payment_url ||
          null,
      },
    });
  } catch (error) {
    console.error(
      "WooCommerce checkout API failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to create WooCommerce order.",
      },
      {
        status: 500,
      }
    );
  }
}