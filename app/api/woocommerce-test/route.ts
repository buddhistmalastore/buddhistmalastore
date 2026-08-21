
import { NextResponse } from "next/server";

import {
  createWooCommerceOrder,
  CreateWooCommerceOrderInput,
} from "@/lib/woocommerce";

/* =========================================================
   TYPES
========================================================= */

type PaymentMethod =
  | "esewa"
  | "khalti"
  | "fonepay"
  | "paypal"
  | "card";

/* =========================================================
   PAYMENT METHODS
========================================================= */

const NEPAL_PAYMENT_METHODS: PaymentMethod[] = [
  "esewa",
  "khalti",
  "fonepay",
];

const INTERNATIONAL_PAYMENT_METHODS: PaymentMethod[] = [
  "paypal",
  "card",
];

/* =========================================================
   PAYMENT TITLES
========================================================= */

const PAYMENT_TITLES: Record<PaymentMethod, string> = {
  esewa: "eSewa",
  khalti: "Khalti",
  fonepay: "Fonepay",
  paypal: "PayPal",
  card: "Credit / Debit Card",
};

/* =========================================================
   VALID PAYMENT METHODS
========================================================= */

const VALID_PAYMENT_METHODS: PaymentMethod[] = [
  "esewa",
  "khalti",
  "fonepay",
  "paypal",
  "card",
];

/* =========================================================
   POST
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      paymentMethod,
      customer,
      items,
      notes,
    } = body;

    /* =======================================================
       BASIC VALIDATION
    ======================================================= */

    if (!customer || typeof customer !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Customer information is required.",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Your cart is empty.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       PAYMENT METHOD VALIDATION
    ======================================================= */

    if (
      typeof paymentMethod !== "string" ||
      !VALID_PAYMENT_METHODS.includes(
        paymentMethod as PaymentMethod
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid payment method.",
        },
        { status: 400 }
      );
    }

    const selectedPaymentMethod =
      paymentMethod as PaymentMethod;

    /* =======================================================
       COUNTRY
    ======================================================= */

    const country =
      typeof customer.country === "string"
        ? customer.country.trim()
        : "";

    if (!country) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select your country.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       NORMALIZE COUNTRY
    ======================================================= */

    const normalizedCountry = country
      .toLowerCase()
      .trim();

    const isNepal =
      normalizedCountry === "nepal" ||
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
            "Customers in Nepal can pay using eSewa, Khalti, or Fonepay.",
        },
        { status: 400 }
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
        { status: 400 }
      );
    }

    /* =======================================================
       IMPORTANT PAYMENT GATEWAY MAPPING

       Actual WooCommerce gateway IDs from your store:

       Nepal:
       paybridge_np

       PayPal:
       ppcp-gateway

       Card:
       woocommerce_payments
    ======================================================= */

    let wooPaymentMethod: string;

    switch (selectedPaymentMethod) {
      case "esewa":
      case "khalti":
      case "fonepay":
        wooPaymentMethod = "paybridge_np";
        break;

      case "paypal":
        wooPaymentMethod = "ppcp-gateway";
        break;

      case "card":
        wooPaymentMethod = "woocommerce_payments";
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            error: "Unsupported payment method.",
          },
          { status: 400 }
        );
    }

    /* =======================================================
       PAYMENT TITLE
    ======================================================= */

    const wooPaymentTitle =
      PAYMENT_TITLES[selectedPaymentMethod];

    /* =======================================================
       PAYBRIDGE PROVIDER

       PayBridgeNP is ONE WooCommerce gateway.

       eSewa / Khalti / Fonepay are selected providers
       inside that gateway.

       We therefore store the selected provider as
       order metadata.
    ======================================================= */

    const paymentProvider =
      isNepal
        ? selectedPaymentMethod
        : null;

    /* =======================================================
       LINE ITEMS
    ======================================================= */

    const lineItems = items.map(
      (item: {
        id: number | string;
        quantity: number | string;
      }) => ({
        product_id: Number(item.id),
        quantity: Number(item.quantity),
      })
    );

    /* =======================================================
       VALIDATE LINE ITEMS
    ======================================================= */

    const invalidItem = lineItems.some(
      (item) =>
        !Number.isInteger(item.product_id) ||
        item.product_id <= 0 ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
    );

    if (invalidItem) {
      return NextResponse.json(
        {
          success: false,
          error:
            "One or more products in your cart are invalid.",
        },
        { status: 400 }
      );
    }

    /* =======================================================
       CUSTOMER FIELDS
    ======================================================= */

    const firstName =
      typeof customer.firstName === "string"
        ? customer.firstName.trim()
        : "";

    const lastName =
      typeof customer.lastName === "string"
        ? customer.lastName.trim()
        : "";

    const email =
      typeof customer.email === "string"
        ? customer.email.trim()
        : "";

    const phone =
      typeof customer.phone === "string"
        ? customer.phone.trim()
        : "";

    const address =
      typeof customer.address === "string"
        ? customer.address.trim()
        : "";

    const apartment =
      typeof customer.apartment === "string"
        ? customer.apartment.trim()
        : "";

    const city =
      typeof customer.city === "string"
        ? customer.city.trim()
        : "";

    const province =
      typeof customer.province === "string"
        ? customer.province.trim()
        : "";

    const postalCode =
      typeof customer.postalCode === "string"
        ? customer.postalCode.trim()
        : "";

    /* =======================================================
       BILLING
    ======================================================= */

    const billing = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      address_1: address,
      address_2: apartment,
      city,
      state: province,
      postcode: postalCode,
      country,
    };

    /* =======================================================
       SHIPPING
    ======================================================= */

    const shipping = {
      first_name: firstName,
      last_name: lastName,
      address_1: address,
      address_2: apartment,
      city,
      state: province,
      postcode: postalCode,
      country,
    };

    /* =======================================================
       ORDER META DATA
    ======================================================= */

    const metaData = [
      {
        key: "_checkout_payment_method",
        value: selectedPaymentMethod,
      },
    ];

    /*
     * For Nepal payments, PayBridgeNP receives:
     *
     * eSewa
     * Khalti
     * Fonepay
     *
     * through metadata.
     */

    if (paymentProvider) {
      metaData.push({
        key: "_paybridge_provider",
        value: paymentProvider,
      });
    }

    /* =======================================================
       WOOCOMMERCE ORDER
    ======================================================= */

    const order: CreateWooCommerceOrderInput = {
      payment_method: wooPaymentMethod,

      payment_method_title: wooPaymentTitle,

      /*
       * DO NOT mark the order paid here.
       *
       * The actual payment gateway/webhook must confirm
       * successful payment first.
       */
      set_paid: false,

      billing,

      shipping,

      line_items: lineItems,

      customer_note:
        typeof notes === "string"
          ? notes.trim()
          : "",

      /*
       * This requires CreateWooCommerceOrderInput to support
       * WooCommerce order metadata.
       */
      meta_data: metaData,
    };

    /* =======================================================
       CREATE WOOCOMMERCE ORDER
    ======================================================= */

    const createdOrder =
      await createWooCommerceOrder(order);

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success: true,

      order: {
        id: createdOrder.id,

        number:
          createdOrder.number,

        status:
          createdOrder.status,

        total:
          createdOrder.total,

        currency:
          createdOrder.currency,

        payment_method:
          selectedPaymentMethod,

        payment_method_title:
          wooPaymentTitle,

        woo_payment_method:
          wooPaymentMethod,

        payment_provider:
          paymentProvider,

        payment_url:
          createdOrder.payment_url || null,
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
      { status: 500 }
    );
  }
}
