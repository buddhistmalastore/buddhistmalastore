import { NextResponse } from "next/server";

/* =========================================================
   ENVIRONMENT
========================================================= */

const WORDPRESS_URL =
  process.env.WORDPRESS_URL;

const WOOCOMMERCE_CONSUMER_KEY =
  process.env.WOOCOMMERCE_CONSUMER_KEY;

const WOOCOMMERCE_CONSUMER_SECRET =
  process.env.WOOCOMMERCE_CONSUMER_SECRET;

const PAYBRIDGE_SECRET_KEY =
  process.env.PAYBRIDGE_SECRET_KEY;

const PAYBRIDGE_API_URL =
  "https://api.paybridgenp.com";

/* =========================================================
   PAYMENT PROVIDER
========================================================= */

type PaymentMethod =
  | "fonepay";

const VALID_PROVIDERS: PaymentMethod[] = [
  "fonepay",
];

/* =========================================================
   VALIDATE ENVIRONMENT
========================================================= */

function validateEnvironment() {
  if (!WORDPRESS_URL) {
    throw new Error(
      "WORDPRESS_URL is missing."
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

  if (!PAYBRIDGE_SECRET_KEY) {
    throw new Error(
      "PAYBRIDGE_SECRET_KEY is missing."
    );
  }
}

/* =========================================================
   WOOCOMMERCE AUTH
========================================================= */

function getWooCommerceAuth() {
  return Buffer.from(
    `${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`
  ).toString("base64");
}

/* =========================================================
   GET WOOCOMMERCE ORDER
========================================================= */

async function getWooCommerceOrder(
  orderId: number
) {
  const credentials =
    getWooCommerceAuth();

  const response =
    await fetch(
      `${WORDPRESS_URL}/wp-json/wc/v3/orders/${orderId}`,
      {
        method:
          "GET",

        headers: {
          Authorization:
            `Basic ${credentials}`,

          Accept:
            "application/json",
        },

        cache:
          "no-store",
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `Unable to retrieve WooCommerce order: ${response.status} ${errorText}`
    );
  }

  return response.json();
}

/* =========================================================
   GET USD → NPR RATE
========================================================= */

/*
 * Exchange rate is cached for 24 hours.
 *
 * WooCommerce order:
 *
 * USD
 *
 * PayBridge:
 *
 * NPR
 */

async function getUsdToNprRate() {
  const response =
    await fetch(
      "https://open.er-api.com/v6/latest/USD",
      {
        method:
          "GET",

        headers: {
          Accept:
            "application/json",
        },

        /*
         * Cache rate for 24 hours.
         */
        next: {
          revalidate:
            86400,
        },
      }
    );

  if (!response.ok) {
    throw new Error(
      "Unable to retrieve USD to NPR exchange rate."
    );
  }

  const data =
    await response.json();

  if (
    data.result !==
      "success" ||
    !data.rates ||
    typeof data.rates.NPR !==
      "number"
  ) {
    throw new Error(
      "Invalid USD to NPR exchange-rate response."
    );
  }

  return data.rates.NPR;
}

/* =========================================================
   CREATE PAYBRIDGE SESSION
========================================================= */

async function createPayBridgeSession(
  params: {
    amount: number;

    provider:
      PaymentMethod;

    orderId:
      number;

    orderKey:
      string;

    customer: {
      name:
        string;

      email:
        string;

      phone:
        string;

      address?: {
        line1:
          string;

        line2?:
          string;

        city:
          string;

        state?:
          string;

        postalCode?:
          string;

        country?:
          string;
      };
    };
  }
) {
  const {
    amount,
    provider,
    orderId,
    orderKey,
    customer,
  } = params;

  /* =======================================================
     SITE URL
  ======================================================= */

  const origin =
    process.env
      .NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  /* =======================================================
     RETURN URL
  ======================================================= */

  const returnUrl =
    `${origin}/payment-return` +
    `?order_id=${orderId}` +
    `&provider=${provider}`;

  /* =======================================================
     CANCEL URL
  ======================================================= */

  const cancelUrl =
    `${origin}/checkout` +
    `?payment=cancelled` +
    `&order_id=${orderId}`;

  /* =======================================================
     PAYBRIDGE REQUEST
  ======================================================= */

  const response =
    await fetch(
      `${PAYBRIDGE_API_URL}/v1/checkout`,
      {
        method:
          "POST",

        headers: {
          Authorization:
            `Bearer ${PAYBRIDGE_SECRET_KEY}`,

          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body:
          JSON.stringify({
            /*
             * PayBridge expects paisa.
             *
             * Example:
             *
             * NPR 22,767.97
             *
             * becomes:
             *
             * 2276797
             */

            amount,

            currency:
              "NPR",

            /*
             * Go directly to Fonepay.
             */
            flow:
              "redirect",

            provider:
              "fonepay",

            returnUrl,

            cancelUrl,

            metadata: {
              order_id:
                String(
                  orderId
                ),

              order_key:
                orderKey,

              source:
                "buddhistmalastore-nextjs",

              provider:
                "fonepay",
            },

            customer,

            collectAddress:
              false,
          }),

        cache:
          "no-store",
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `PayBridge session creation failed: ${response.status} ${errorText}`
    );
  }

  return response.json();
}

/* =========================================================
   POST
========================================================= */

export async function POST(
  request: Request
) {
  try {
    /* =======================================================
       ENVIRONMENT
    ======================================================= */

    validateEnvironment();

    /* =======================================================
       BODY
    ======================================================= */

    const body =
      await request.json();

    const {
      orderId,
      paymentMethod,
    } = body;

    /* =======================================================
       ORDER ID
    ======================================================= */

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
          success:
            false,

          error:
            "A valid WooCommerce order ID is required.",
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       PROVIDER
    ======================================================= */

    if (
      typeof paymentMethod !==
        "string" ||
      !VALID_PROVIDERS.includes(
        paymentMethod as PaymentMethod
      )
    ) {
      return NextResponse.json(
        {
          success:
            false,

          error:
            "Only Fonepay is available for Nepal payments.",
        },
        {
          status:
            400,
        }
      );
    }

    /*
     * Force provider to Fonepay.
     *
     * Even if somebody manually sends another
     * provider from the browser, it cannot be used.
     */

    const provider:
      PaymentMethod =
      "fonepay";

    /* =======================================================
       GET ORDER
    ======================================================= */

    const order =
      await getWooCommerceOrder(
        numericOrderId
      );

    /* =======================================================
       VERIFY ORDER
    ======================================================= */

    if (
      Number(order.id) !==
      numericOrderId
    ) {
      return NextResponse.json(
        {
          success:
            false,

          error:
            "WooCommerce order could not be verified.",
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       VERIFY ORDER CURRENCY
    ======================================================= */

    const orderCurrency =
      String(
        order.currency ||
          ""
      ).toUpperCase();

    /*
     * THIS IS CRITICAL.
     *
     * WooCommerce MUST be USD.
     */

    if (
      orderCurrency !==
      "USD"
    ) {
      console.error(
        "Invalid WooCommerce order currency:",
        {
          orderId:
            numericOrderId,

          currency:
            orderCurrency,
        }
      );

      return NextResponse.json(
        {
          success:
            false,

          error:
            `WooCommerce order currency is ${orderCurrency}. Expected USD. Please set WooCommerce → Settings → General → Currency to United States (US) dollar.`,
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       PREVENT DUPLICATE PAYMENT
    ======================================================= */

    if (
      order.status ===
        "processing" ||
      order.status ===
        "completed"
    ) {
      return NextResponse.json(
        {
          success:
            false,

          error:
            "This order has already been paid.",
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       ORDER TOTAL
    ======================================================= */

    const orderTotal =
      Number(
        order.total
      );

    if (
      !Number.isFinite(
        orderTotal
      ) ||
      orderTotal <= 0
    ) {
      return NextResponse.json(
        {
          success:
            false,

          error:
            "The WooCommerce order has an invalid total.",
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       USD → NPR
    ======================================================= */

    const usdToNprRate =
      await getUsdToNprRate();

    /* =======================================================
       NPR TOTAL
    ======================================================= */

    const nprTotal =
      orderTotal *
      usdToNprRate;

    if (
      !Number.isFinite(
        nprTotal
      ) ||
      nprTotal <= 0
    ) {
      return NextResponse.json(
        {
          success:
            false,

          error:
            "Unable to calculate NPR payment amount.",
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       NPR → PAISA
    ======================================================= */

    const amount =
      Math.round(
        nprTotal * 100
      );

    if (
      !Number.isInteger(
        amount
      ) ||
      amount <= 0
    ) {
      return NextResponse.json(
        {
          success:
            false,

          error:
            "Unable to calculate payment amount.",
        },
        {
          status:
            400,
        }
      );
    }

    /* =======================================================
       LOG PAYMENT CALCULATION
    ======================================================= */

    console.log(
      "Fonepay payment calculation:",
      {
        orderId:
          numericOrderId,

        wooCurrency:
          orderCurrency,

        usdTotal:
          orderTotal,

        usdToNprRate,

        nprTotal:
          Number(
            nprTotal.toFixed(
              2
            )
          ),

        paisa:
          amount,

        provider:
          "fonepay",
      }
    );

    /* =======================================================
       CUSTOMER
    ======================================================= */

    const billing =
      order.billing ||
      {};

    const firstName =
      String(
        billing.first_name ||
          ""
      ).trim();

    const lastName =
      String(
        billing.last_name ||
          ""
      ).trim();

    const email =
      String(
        billing.email ||
          ""
      ).trim();

    const phone =
      String(
        billing.phone ||
          ""
      ).trim();

    const address1 =
      String(
        billing.address_1 ||
          ""
      ).trim();

    const address2 =
      String(
        billing.address_2 ||
          ""
      ).trim();

    const city =
      String(
        billing.city ||
          ""
      ).trim();

    const state =
      String(
        billing.state ||
          ""
      ).trim();

    const postcode =
      String(
        billing.postcode ||
          ""
      ).trim();

    const country =
      String(
        billing.country ||
          ""
      ).trim();

    const customerName =
      `${firstName} ${lastName}`.trim();

    /* =======================================================
       CREATE PAYBRIDGE SESSION
    ======================================================= */

    const session =
      await createPayBridgeSession({
        amount,

        provider:

          "fonepay",

        orderId:
          numericOrderId,

        orderKey:
          String(
            order.order_key ||
              ""
          ),

        customer: {
          name:
            customerName,

          email,

          phone,

          address: {
            line1:
              address1,

            line2:
              address2 ||
              undefined,

            city,

            state:
              state ||
              undefined,

            postalCode:
              postcode ||
              undefined,

            country:
              country ||
              undefined,
          },
        },
      });

    /* =======================================================
       SAVE PAYMENT INFORMATION
    ======================================================= */

    try {
      await fetch(
        `${WORDPRESS_URL}/wp-json/wc/v3/orders/${numericOrderId}`,
        {
          method:
            "PUT",

          headers: {
            Authorization:
              `Basic ${getWooCommerceAuth()}`,

            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body:
            JSON.stringify({
              meta_data: [
                {
                  key:
                    "_paybridge_session_id",

                  value:
                    String(
                      session.id ||
                        ""
                    ),
                },

                {
                  key:
                    "_paybridge_provider",

                  value:
                    "fonepay",
                },

                {
                  key:
                    "_paybridge_usd_total",

                  value:
                    String(
                      orderTotal
                    ),
                },

                {
                  key:
                    "_paybridge_usd_npr_rate",

                  value:
                    String(
                      usdToNprRate
                    ),
                },

                {
                  key:
                    "_paybridge_npr_total",

                  value:
                    nprTotal.toFixed(
                      2
                    ),
                },

                {
                  key:
                    "_paybridge_amount_paisa",

                  value:
                    String(
                      amount
                    ),
                },

                {
                  key:
                    "_paybridge_currency",

                  value:
                    "NPR",
                },
              ],
            }),

          cache:
            "no-store",
        }
      );
    } catch (
      metadataError
    ) {
      /*
       * Payment session already exists.
       *
       * Do not stop the customer from paying
       * if metadata saving fails.
       */

      console.error(
        "Unable to save PayBridge payment metadata:",
        metadataError
      );
    }

    /* =======================================================
       RESPONSE
    ======================================================= */

    return NextResponse.json({
      success:
        true,

      order: {
        id:
          numericOrderId,

        number:
          order.number,

        /*
         * WooCommerce order remains USD.
         */

        total:
          order.total,

        currency:
          "USD",
      },

      payment: {
        provider:
          "fonepay",

        session_id:
          session.id ||
          null,

        checkout_url:
          session.checkout_url ||
          null,

        flow:
          session.flow ||
          "redirect",

        expires_at:
          session.expires_at ||
          null,

        /*
         * Payment gateway amount.
         */

        currency:
          "NPR",

        amount_paisa:
          amount,

        amount_npr:
          Number(
            nprTotal.toFixed(
              2
            )
          ),

        usd_to_npr_rate:
          usdToNprRate,
      },
    });
  } catch (error) {
    console.error(
      "Payment session API failed:",
      error
    );

    return NextResponse.json(
      {
        success:
          false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to create payment session.",
      },
      {
        status:
          500,
      }
    );
  }
}