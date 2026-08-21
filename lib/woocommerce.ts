const WORDPRESS_URL =
  process.env.WORDPRESS_URL;

const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;

const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

/* =========================================================
   ENVIRONMENT VALIDATION
========================================================= */

if (
  !WORDPRESS_URL ||
  !WOOCOMMERCE_CONSUMER_KEY ||
  !WOOCOMMERCE_CONSUMER_SECRET
) {
  throw new Error(
    "WooCommerce environment variables are missing."
  );
}

/* =========================================================
   AUTHENTICATION
========================================================= */

function getWooCommerceAuth() {
  return Buffer.from(
    `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
  ).toString("base64");
}

/* =========================================================
   GET PRODUCTS
========================================================= */

export async function getWooCommerceProducts() {
  const credentials =
    getWooCommerceAuth();

  const url =
    `${WORDPRESS_URL}/wp-json/wc/v3/products` +
    `?status=publish` +
    `&per_page=24` +
    `&orderby=date` +
    `&order=desc`;

  const response =
    await fetch(
      url,
      {
        headers: {
          Authorization:
            `Basic ${credentials}`,

          Accept:
            "application/json",
        },

        /*
         * Product cache:
         * 60 seconds
         */
        next: {
          revalidate:
            60,
        },
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "WooCommerce products API error:",
      response.status,
      response.statusText,
      errorText
    );

    throw new Error(
      `WooCommerce API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/* =========================================================
   ORDER TYPES
========================================================= */

export interface WooCommerceOrderLineItem {
  product_id:
    number;

  quantity:
    number;
}

export interface WooCommerceAddress {
  first_name:
    string;

  last_name:
    string;

  email?:
    string;

  phone?:
    string;

  address_1:
    string;

  address_2?:
    string;

  city:
    string;

  state:
    string;

  postcode:
    string;

  country:
    string;
}

export interface WooCommerceMetaData {
  key:
    string;

  value:
    string;
}

export interface CreateWooCommerceOrderInput {
  payment_method:
    string;

  payment_method_title:
    string;

  set_paid:
    boolean;

  billing:
    WooCommerceAddress;

  shipping: {
    first_name:
      string;

    last_name:
      string;

    address_1:
      string;

    address_2?:
      string;

    city:
      string;

    state:
      string;

    postcode:
      string;

    country:
      string;
  };

  line_items:
    WooCommerceOrderLineItem[];

  customer_note?:
    string;

  meta_data?:
    WooCommerceMetaData[];
}

/* =========================================================
   CREATE WOOCOMMERCE ORDER
========================================================= */

export async function createWooCommerceOrder(
  order:
    CreateWooCommerceOrderInput
) {
  const credentials =
    getWooCommerceAuth();

  const response =
    await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/orders`,
      {
        method:
          "POST",

        headers: {
          Authorization:
            `Basic ${credentials}`,

          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body:
          JSON.stringify(
            order
          ),

        cache:
          "no-store",
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "WooCommerce order creation error:",
      response.status,
      response.statusText,
      errorText
    );

    throw new Error(
      `WooCommerce order creation failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}