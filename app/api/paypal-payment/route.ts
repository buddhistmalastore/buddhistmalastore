import { NextResponse } from "next/server";

/* =========================================================
   TYPES
========================================================= */

type AddressInput = {
  firstName?: string;
  lastName?: string;
  country?: string;
  address?: string;
  apartment?: string;
  city?: string;
  province?: string;
  postalCode?: string;
};

type CustomerInput = AddressInput & {
  email?: string;
  phone?: string;

  billingSameAsShipping?: boolean;
  billing?: AddressInput | null;

  notes?: string;
};

type PaymentDataItem = {
  key: string;
  value: string | boolean | number;
};

/* =========================================================
   COUNTRY MAP
========================================================= */

const COUNTRY_CODES: Record<string, string> = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Andorra: "AD",
  Angola: "AO",
  Argentina: "AR",
  Armenia: "AM",
  Australia: "AU",
  Austria: "AT",
  Azerbaijan: "AZ",
  Bahamas: "BS",
  Bahrain: "BH",
  Bangladesh: "BD",
  Barbados: "BB",
  Belarus: "BY",
  Belgium: "BE",
  Belize: "BZ",
  Benin: "BJ",
  Bhutan: "BT",
  Bolivia: "BO",
  Bosnia: "BA",
  Botswana: "BW",
  Brazil: "BR",
  Brunei: "BN",
  Bulgaria: "BG",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Congo: "CG",
  "Costa Rica": "CR",
  Croatia: "HR",
  Cuba: "CU",
  Cyprus: "CY",
  "Czech Republic": "CZ",
  Denmark: "DK",
  Djibouti: "DJ",
  Dominica: "DM",
  Ecuador: "EC",
  Egypt: "EG",
  "El Salvador": "SV",
  Estonia: "EE",
  Ethiopia: "ET",
  Fiji: "FJ",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Georgia: "GE",
  Germany: "DE",
  Ghana: "GH",
  Greece: "GR",
  Grenada: "GD",
  Guatemala: "GT",
  Guinea: "GN",
  Guyana: "GY",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kuwait: "KW",
  Kyrgyzstan: "KG",
  Laos: "LA",
  Latvia: "LV",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Liechtenstein: "LI",
  Lithuania: "LT",
  Luxembourg: "LU",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Maldives: "MV",
  Mali: "ML",
  Malta: "MT",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Moldova: "MD",
  Monaco: "MC",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  "North Korea": "KP",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Panama: "PA",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russia: "RU",
  Rwanda: "RW",
  Samoa: "WS",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  Serbia: "RS",
  Seychelles: "SC",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Suriname: "SR",
  Swaziland: "SZ",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Taiwan: "TW",
  Tajikistan: "TJ",
  Tanzania: "TZ",
  Thailand: "TH",
  Togo: "TG",
  Tonga: "TO",
  Tunisia: "TN",
  Turkey: "TR",
  Turkmenistan: "TM",
  Uganda: "UG",
  Ukraine: "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Vanuatu: "VU",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

/* =========================================================
   COUNTRY NORMALIZER
========================================================= */

function getCountryCode(
  country: string | undefined
): string {
  const value = String(country || "").trim();

  if (!value) {
    return "";
  }

  /*
   * Already an ISO-2 country code.
   */
  if (/^[A-Za-z]{2}$/.test(value)) {
    return value.toUpperCase();
  }

  /*
   * Match country name.
   */
  const direct =
    COUNTRY_CODES[value];

  if (direct) {
    return direct;
  }

  /*
   * Case-insensitive match.
   */
  const normalized =
    value.toLowerCase();

  const match =
    Object.entries(COUNTRY_CODES).find(
      ([name]) =>
        name.toLowerCase() ===
        normalized
    );

  return match?.[1] || "";
}

/* =========================================================
   ADDRESS BUILDER
========================================================= */

function buildAddress(
  address: AddressInput,
  email: string,
  phone: string
) {
  const countryCode =
    getCountryCode(address.country);

  if (!countryCode) {
    throw new Error(
      `Unsupported country: ${
        address.country || "Unknown"
      }`
    );
  }

  return {
    first_name:
      String(
        address.firstName || ""
      ).trim(),

    last_name:
      String(
        address.lastName || ""
      ).trim(),

    company: "",

    address_1:
      String(
        address.address || ""
      ).trim(),

    address_2:
      String(
        address.apartment || ""
      ).trim(),

    city:
      String(
        address.city || ""
      ).trim(),

    state:
      String(
        address.province || ""
      ).trim(),

    postcode:
      String(
        address.postalCode || ""
      ).trim(),

    country:
      countryCode,

    email:
      String(email || "").trim(),

    phone:
      String(phone || "").trim(),
  };
}

/* =========================================================
   GET ORDER FROM WOOCOMMERCE
========================================================= */

async function getWooCommerceOrder(
  orderId: number
) {
  const wordpressUrl =
    process.env.WORDPRESS_URL;

  const consumerKey =
    process.env
      .WOOCOMMERCE_CONSUMER_KEY;

  const consumerSecret =
    process.env
      .WOOCOMMERCE_CONSUMER_SECRET;

  if (
    !wordpressUrl ||
    !consumerKey ||
    !consumerSecret
  ) {
    throw new Error(
      "WooCommerce server configuration is missing."
    );
  }

  const credentials =
    Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

  const response =
    await fetch(
      `${wordpressUrl.replace(
        /\/$/,
        ""
      )}/wp-json/wc/v3/orders/${orderId}`,
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

  const data =
    await response.json().catch(
      () => null
    );

  if (!response.ok) {
    console.error(
      "WooCommerce order lookup failed:",
      data
    );

    throw new Error(
      data?.message ||
        "Unable to retrieve the WooCommerce order."
    );
  }

  return data;
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

    const wordpressUrl =
      process.env.WORDPRESS_URL;

    if (!wordpressUrl) {
      return NextResponse.json(
        {
          success: false,
          error:
            "WORDPRESS_URL is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /* =======================================================
       CART TOKEN
    ======================================================= */

    const cartToken =
      request.headers.get(
        "Cart-Token"
      );

    if (!cartToken) {
      return NextResponse.json(
        {
          success: false,
          error:
            "WooCommerce Cart-Token is missing.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       REQUEST BODY
    ======================================================= */

    const body =
      await request.json();

    const {
      orderId,
      customer,
      paymentData,
    } = body as {
      orderId?: number | string;
      customer?: CustomerInput;
      paymentData?: PaymentDataItem[];
    };

    /* =======================================================
       ORDER ID VALIDATION
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
          success: false,
          error:
            "Invalid WooCommerce order ID.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       CUSTOMER VALIDATION
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

    const email =
      String(
        customer.email || ""
      ).trim();

    const phone =
      String(
        customer.phone || ""
      ).trim();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Customer email is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       RETRIEVE ORDER KEY
       
       IMPORTANT:
       We do this server-side.
       The WooCommerce REST credentials NEVER reach
       the browser.
    ======================================================= */

    const wooOrder =
      await getWooCommerceOrder(
        numericOrderId
      );

    if (
      Number(wooOrder.id) !==
      numericOrderId
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "WooCommerce order verification failed.",
        },
        {
          status: 400,
        }
      );
    }

    const orderKey =
      String(
        wooOrder.order_key || ""
      ).trim();

    if (!orderKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "WooCommerce order key is missing.",
        },
        {
          status: 500,
        }
      );
    }

    /* =======================================================
       BILLING ADDRESS
       
       If customer selected:
       "Same as shipping"
       
       use shipping address.
       
       Otherwise use the separate billing form.
    ======================================================= */

    const billingSource =
      customer.billingSameAsShipping ===
        false &&
      customer.billing
        ? customer.billing
        : customer;

    const billingAddress =
      buildAddress(
        billingSource,
        email,
        phone
      );

    /* =======================================================
       SHIPPING ADDRESS
    ======================================================= */

    const shippingAddress =
      buildAddress(
        customer,
        email,
        phone
      );

    /* =======================================================
       PAYMENT DATA
       
       PayPal does not use the WooPayments
       Stripe PaymentMethod ID.
       
       Therefore we send only payment data
       explicitly supplied by the PayPal
       integration, if any.
       
       Empty array is valid according to
       WooCommerce Store API.
    ======================================================= */

    const normalizedPaymentData =
      Array.isArray(paymentData)
        ? paymentData
        : [];

    /* =======================================================
       STORE API REQUEST
       
       This processes the EXISTING order.
       
       We intentionally do NOT create another
       WooCommerce order here.
    ======================================================= */

    const storeApiUrl =
      `${wordpressUrl.replace(
        /\/$/,
        ""
      )}/wp-json/wc/store/v1/checkout/${numericOrderId}`;

    const checkoutPayload = {
      key: orderKey,

      billing_email:
        email,

      billing_address:
        billingAddress,

      shipping_address:
        shippingAddress,

      payment_method:
        "ppcp-gateway",

      payment_data:
        normalizedPaymentData,
    };

    console.log(
      "Processing PayPal order:",
      {
        orderId:
          numericOrderId,

        paymentMethod:
          "ppcp-gateway",
      }
    );

    const checkoutResponse =
      await fetch(
        storeApiUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",

            "Cart-Token":
              cartToken,
          },

          body:
            JSON.stringify(
              checkoutPayload
            ),

          cache: "no-store",
        }
      );

    const checkoutData =
      await checkoutResponse
        .json()
        .catch(() => null);

    /* =======================================================
       HANDLE WOOCOMMERCE ERROR
    ======================================================= */

    if (
      !checkoutResponse.ok
    ) {
      console.error(
        "WooCommerce PayPal checkout failed:",
        {
          status:
            checkoutResponse.status,

          response:
            checkoutData,
        }
      );

      const errorMessage =
        checkoutData?.message ||
        checkoutData?.data?.message ||
        checkoutData?.error ||
        "WooCommerce could not process the PayPal payment.";

      return NextResponse.json(
        {
          success: false,

          error:
            errorMessage,

          details:
            checkoutData,
        },
        {
          status:
            checkoutResponse.status >=
              400 &&
            checkoutResponse.status <
              600
              ? checkoutResponse.status
              : 500,
        }
      );
    }

    /* =======================================================
       PAYMENT RESULT
    ======================================================= */

    const paymentResult =
      checkoutData?.payment_result ||
      {};

    const paymentStatus =
      String(
        paymentResult.payment_status ||
          ""
      ).toLowerCase();

    const redirectUrl =
      paymentResult.redirect_url ||
      "";

    /* =======================================================
       PAYMENT FAILURE
    ======================================================= */

    if (
      paymentStatus === "failure"
    ) {
      return NextResponse.json(
        {
          success: false,

          error:
            "PayPal payment could not be started.",

          payment:
            paymentResult,

          order:
            checkoutData,
        },
        {
          status: 400,
        }
      );
    }

    /* =======================================================
       SUCCESS
    ======================================================= */

    return NextResponse.json({
      success: true,

      payment: {
        status:
          paymentStatus ||
          "success",

        redirect_url:
          redirectUrl ||
          null,
      },

      order: {
        id:
          checkoutData?.order_id ||
          numericOrderId,

        status:
          checkoutData?.status ||
          null,

        order_key:
          checkoutData?.order_key ||
          orderKey,
      },
    });
  } catch (error) {
    console.error(
      "PayPal payment API failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        error:
          error instanceof Error
            ? error.message
            : "Unable to process PayPal payment.",
      },
      {
        status: 500,
      }
    );
  }
}