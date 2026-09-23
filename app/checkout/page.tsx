"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  FiArrowLeft,
  FiCheck,
  FiChevronDown,
  FiGlobe,
  FiLock,
  FiMapPin,
  FiShield,
  FiShoppingBag,
} from "react-icons/fi";

import useCart from "@/hooks/useCart";
import { useCurrency } from "@/context/CurrencyContext";

import Header from "@/components/layout/Header/Header";

/* =========================================================
   STRIPE / WOOPAYMENTS TYPES
========================================================= */

declare global {
  interface Window {
    Stripe?: (
      publishableKey: string,
      options?: { stripeAccount?: string }
    ) => StripeInstance;
  }
}

type StripeInstance = {
  elements: (options: Record<string, unknown>) => StripeElements;
  createPaymentMethod: (options: Record<string, unknown>) => Promise<{
    error?: { message?: string };
    paymentMethod?: { id: string };
  }>;
};

type StripeElements = {
  create: (type: string) => StripePaymentElement;
  submit: () => Promise<{ error?: { message?: string } }>;
};

type StripePaymentElement = {
  mount: (element: HTMLElement) => void;
  destroy: () => void;
};

type WooPaymentsConfig = {
  publishableKey: string;
  accountId?: string;
  testMode?: boolean;
  locale?: string;
  currency?: string;
};

/* =========================================================
   TYPES
========================================================= */

type ShippingMethod = "standard" | "express";

type PaymentMethod =
  | "fonepay"
  | "paypal"
  | "card";

/* =========================================================
   COUNTRIES
========================================================= */

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
].sort((a, b) => a.localeCompare(b));

/* =========================================================
   STATES / PROVINCES
========================================================= */

const STATES_BY_COUNTRY: Record<
  string,
  string[]
> = {
  Nepal: [
    "Koshi Province",
    "Madhesh Province",
    "Bagmati Province",
    "Gandaki Province",
    "Lumbini Province",
    "Karnali Province",
    "Sudurpashchim Province",
  ],

  India: [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ],

  Australia: [
    "Australian Capital Territory",
    "New South Wales",
    "Northern Territory",
    "Queensland",
    "South Australia",
    "Tasmania",
    "Victoria",
    "Western Australia",
  ],

  Canada: [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon",
  ],

  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
    "District of Columbia",
  ],

  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
  ],

  Germany: [
    "Baden-Württemberg",
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hesse",
    "Lower Saxony",
    "Mecklenburg-Vorpommern",
    "North Rhine-Westphalia",
    "Rhineland-Palatinate",
    "Saarland",
    "Saxony",
    "Saxony-Anhalt",
    "Schleswig-Holstein",
    "Thuringia",
  ],

  Brazil: [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
  ],

  Mexico: [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Ciudad de México",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "México",
    "Michoacán",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
  ],

  Japan: [
    "Aichi",
    "Akita",
    "Aomori",
    "Chiba",
    "Ehime",
    "Fukui",
    "Fukuoka",
    "Fukushima",
    "Gifu",
    "Gunma",
    "Hiroshima",
    "Hokkaido",
    "Hyogo",
    "Ibaraki",
    "Ishikawa",
    "Iwate",
    "Kagawa",
    "Kagoshima",
    "Kanagawa",
    "Kochi",
    "Kumamoto",
    "Kyoto",
    "Mie",
    "Miyagi",
    "Miyazaki",
    "Nagano",
    "Nagasaki",
    "Nara",
    "Niigata",
    "Oita",
    "Okayama",
    "Okinawa",
    "Osaka",
    "Saga",
    "Saitama",
    "Shiga",
    "Shimane",
    "Shizuoka",
    "Tochigi",
    "Tokushima",
    "Tokyo",
    "Tottori",
    "Toyama",
    "Wakayama",
    "Yamagata",
    "Yamaguchi",
    "Yamanashi",
  ],

  China: [
    "Anhui",
    "Beijing",
    "Chongqing",
    "Fujian",
    "Gansu",
    "Guangdong",
    "Guangxi",
    "Guizhou",
    "Hainan",
    "Hebei",
    "Heilongjiang",
    "Henan",
    "Hubei",
    "Hunan",
    "Inner Mongolia",
    "Jiangsu",
    "Jiangxi",
    "Jilin",
    "Liaoning",
    "Ningxia",
    "Qinghai",
    "Shaanxi",
    "Shandong",
    "Shanghai",
    "Shanxi",
    "Sichuan",
    "Tianjin",
    "Tibet",
    "Xinjiang",
    "Yunnan",
    "Zhejiang",
  ],
};

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
   CHECKOUT PAGE
========================================================= */

export default function CheckoutPage() {
  const {
    cart,
    subtotal,
  } = useCart();

  const {
    formatPrice,
    currency,
  } = useCurrency();

  /* =======================================================
     STATE
  ======================================================= */

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("fonepay");

  const [checkoutMode, setCheckoutMode] =
    useState<"loading" | "authenticated" | "choice" | "guest">("loading");

  const [customerName, setCustomerName] =
    useState("");

  const [isAuthLoading, setIsAuthLoading] =
    useState(true);

  const [submitted, setSubmitted] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [wooCartToken, setWooCartToken] =
    useState<string | null>(null);

  const [wooPaymentsConfig, setWooPaymentsConfig] =
    useState<WooPaymentsConfig | null>(null);

  const [stripe, setStripe] =
    useState<StripeInstance | null>(null);

  const [stripeElements, setStripeElements] =
    useState<StripeElements | null>(null);

  const [cardElementReady, setCardElementReady] =
    useState(false);

  const cardElementRef =
    useRef<HTMLDivElement | null>(null);

  const cardPaymentElementRef =
    useRef<StripePaymentElement | null>(null);

  const [orderNumber, setOrderNumber] =
    useState<string | null>(null);

  const [billingSameAsShipping, setBillingSameAsShipping] =
    useState(true);

  // WooPayments saved-card preference.
  // This is available only to authenticated customers.
  const [savePaymentMethod, setSavePaymentMethod] =
    useState(false);

  const [billingForm, setBillingForm] = useState({
    firstName: "",
    lastName: "",
    country: "Nepal",
    address: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "Nepal",
    address: "",
    apartment: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  /* =======================================================
     AUTHENTICATED CUSTOMER
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    const loadAuthenticatedCustomer = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json().catch(() => null);

        if (cancelled) {
          return;
        }

        if (response.ok && data?.success === true && data?.authenticated === true && data?.customer) {
          const customer = data.customer;
          const firstName = typeof customer.first_name === "string" ? customer.first_name : "";
          const lastName = typeof customer.last_name === "string" ? customer.last_name : "";
          const email = typeof customer.email === "string" ? customer.email : "";
          const fullName = `${firstName} ${lastName}`.trim();

          setCustomerName(fullName || email);
          setForm((prev) => ({
            ...prev,
            firstName: firstName || prev.firstName,
            lastName: lastName || prev.lastName,
            email: email || prev.email,
          }));
          setCheckoutMode("authenticated");
        } else {
          setCheckoutMode("choice");
        }
      } catch (error) {
        console.error("Unable to verify checkout session:", error);

        if (!cancelled) {
          setCheckoutMode("choice");
        }
      } finally {
        if (!cancelled) {
          setIsAuthLoading(false);
        }
      }
    };

    loadAuthenticatedCustomer();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     INITIALIZE SECURE WOOPAYMENTS CARD ELEMENT
  ======================================================= */

  useEffect(() => {
    if (paymentMethod !== "card" || form.country.trim().toLowerCase() === "nepal") {
      if (cardPaymentElementRef.current) {
        cardPaymentElementRef.current.destroy();
        cardPaymentElementRef.current = null;
      }
      setStripeElements(null);
      setStripe(null);
      setCardElementReady(false);
      return;
    }

    let cancelled = false;

    const initializeCardPayment = async () => {
      try {
        const configResponse = await fetch(
          "/api/woopayments-config",
          { cache: "no-store" }
        );

        const configData = await configResponse.json().catch(() => null);

        if (!configResponse.ok || !configData?.success || !configData?.config?.publishableKey) {
          throw new Error(
            configData?.error ||
              "Unable to initialize WooPayments card payment."
          );
        }

        const config = configData.config as WooPaymentsConfig;

        if (cancelled) return;
        setWooPaymentsConfig(config);

        if (!window.Stripe) {
          await new Promise<void>((resolve, reject) => {
            const existing = document.querySelector<HTMLScriptElement>(
              'script[data-bms-stripe="true"]'
            );

            if (existing) {
              existing.addEventListener("load", () => resolve(), { once: true });
              existing.addEventListener("error", () => reject(new Error("Unable to load Stripe.js.")), { once: true });
              return;
            }

            const script = document.createElement("script");
            script.src = "https://js.stripe.com/v3/";
            script.async = true;
            script.dataset.bmsStripe = "true";
            script.onload = () => resolve();
            script.onerror = () => reject(new Error("Unable to load Stripe.js."));
            document.head.appendChild(script);
          });
        }

        if (!window.Stripe) {
          throw new Error("Stripe.js is unavailable.");
        }

        const stripeClient = window.Stripe(
          config.publishableKey,
          config.accountId
            ? { stripeAccount: config.accountId }
            : undefined
        );

        const elements = stripeClient.elements({
          mode: "payment",
          amount: Math.round(grandTotal * 100),
          currency: "usd",
          paymentMethodCreation: "manual",
          loader: "never",
          appearance: {
            theme: "stripe",
            variables: {
              colorPrimary: "#C89A2A",
              borderRadius: "12px",
              fontFamily: "Inter, system-ui, sans-serif",
            },
          },
        });

        const paymentElement = elements.create("payment");

        if (cancelled) {
          paymentElement.destroy();
          return;
        }

        cardPaymentElementRef.current = paymentElement;
        setStripe(stripeClient);
        setStripeElements(elements);
        setCardElementReady(false);

        window.setTimeout(() => {
          if (!cancelled && cardElementRef.current && cardPaymentElementRef.current) {
            cardPaymentElementRef.current.mount(cardElementRef.current);
            setCardElementReady(true);
          }
        }, 0);
      } catch (error) {
        console.error("WooPayments initialization failed:", error);
        if (!cancelled) {
          setCardElementReady(false);
          alert(
            error instanceof Error
              ? error.message
              : "Unable to initialize secure card payment."
          );
        }
      }
    };

    initializeCardPayment();

    return () => {
      cancelled = true;
      if (cardPaymentElementRef.current) {
        cardPaymentElementRef.current.destroy();
        cardPaymentElementRef.current = null;
      }
      setStripeElements(null);
      setStripe(null);
      setCardElementReady(false);
    };
  }, [paymentMethod, form.country]);

  /* =======================================================
     PRESERVE CHECKOUT DRAFT BEFORE SIGN IN
  ======================================================= */

  const saveCheckoutDraft = () => {
    try {
      window.sessionStorage.setItem(
        "buddhistmala_checkout_draft",
        JSON.stringify({
          form,
          shippingMethod,
          paymentMethod,
          savePaymentMethod,
        })
      );
    } catch (error) {
      console.warn("Unable to save checkout draft:", error);
    }
  };

  useEffect(() => {
    if (checkoutMode !== "authenticated") {
      return;
    }

    try {
      const raw = window.sessionStorage.getItem(
        "buddhistmala_checkout_draft"
      );

      if (!raw) {
        return;
      }

      const draft = JSON.parse(raw);

      if (draft?.form) {
        setForm((prev) => ({
          ...prev,
          ...draft.form,
        }));
      }

      if (draft?.shippingMethod === "standard" || draft?.shippingMethod === "express") {
        setShippingMethod(draft.shippingMethod);
      }

      if (draft?.paymentMethod === "fonepay" || draft?.paymentMethod === "paypal" || draft?.paymentMethod === "card") {
        setPaymentMethod(draft.paymentMethod);
      }

      if (draft?.savePaymentMethod === true) {
        setSavePaymentMethod(true);
      }

      window.sessionStorage.removeItem(
        "buddhistmala_checkout_draft"
      );
    } catch (error) {
      console.warn("Unable to restore checkout draft:", error);
    }
  }, [checkoutMode]);

  /* =======================================================
     COUNTRY / STATE
  ======================================================= */

  const isNepal =
    form.country.trim().toLowerCase() ===
    "nepal";

  const availableStates =
    STATES_BY_COUNTRY[form.country] || [];

  const hasStateOptions =
    availableStates.length > 0;

  /* =======================================================
     TOTAL ITEMS
  ======================================================= */

  const totalItems = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [cart]);

  /* =======================================================
     SHIPPING
  ======================================================= */

  const shippingCost =
    shippingMethod === "express"
      ? 15
      : 0;

  /* =======================================================
     GRAND TOTAL
  ======================================================= */

  const grandTotal =
    subtotal + shippingCost;

  /* =======================================================
     SYNC NEXT.JS CART WITH WOOCOMMERCE STORE API
  ======================================================= */

  const syncWooCommerceCart = async () => {
    if (cart.length === 0) {
      throw new Error(
        "Your cart is empty."
      );
    }

    /* -----------------------------------------------------
       1. Create a fresh WooCommerce Store API cart
    ----------------------------------------------------- */

    const cartResponse = await fetch(
      "/api/woocommerce-checkout?path=/cart",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const cartData =
      await cartResponse.json().catch(
        () => null
      );

    if (!cartResponse.ok) {
      throw new Error(
        cartData?.message ||
          cartData?.error ||
          "Unable to initialize WooCommerce cart."
      );
    }

    const cartToken =
      cartResponse.headers.get(
        "Cart-Token"
      );

    if (!cartToken) {
      throw new Error(
        "WooCommerce did not return a Cart-Token."
      );
    }

    setWooCartToken(cartToken);

    /* -----------------------------------------------------
       2. Add each Next.js cart item
    ----------------------------------------------------- */

    for (const item of cart) {
      const response =
        await fetch(
          "/api/woocommerce-checkout?path=/cart/add-item",
          {
            method: "POST",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Cart-Token": cartToken,
            },

            body: JSON.stringify({
              id: item.id,
              quantity: item.quantity,
            }),

            cache: "no-store",
          }
        );

      const data =
        await response.json().catch(
          () => null
        );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Unable to add product ${item.id} to WooCommerce cart.`
        );
      }
    }

    return cartToken;
  };

  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      /*
       * When country changes, clear the old
       * state/province because it may belong
       * to another country.
       */
      if (name === "country") {
        next.province = "";
      }

      return next;
    });

    /*
     * Nepal only supports Fonepay.
     *
     * International customers use PayPal
     * or Card.
     */
    if (name === "country") {
      if (
        value.trim().toLowerCase() ===
        "nepal"
      ) {
        setPaymentMethod("fonepay");
      } else {
        setPaymentMethod("paypal");
      }
    }
  };

  /* =======================================================
     BILLING FORM CHANGE
  ======================================================= */

  const handleBillingChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    setBillingForm((prev) => ({
      ...prev,
      [name]:
        name === "country"
          ? value
          : value,
      ...(name === "country"
        ? { province: "" }
        : {}),
    }));
  };

  const toggleBillingSameAsShipping = (
    checked: boolean
  ) => {
    setBillingSameAsShipping(checked);

    if (!checked) {
      setBillingForm({
        firstName: form.firstName,
        lastName: form.lastName,
        country: form.country,
        address: form.address,
        apartment: form.apartment,
        city: form.city,
        province: form.province,
        postalCode: form.postalCode,
      });
    }
  };

  /* =======================================================
     PAYMENT SELECTOR
  ======================================================= */

  const handlePaymentChange = (
    method: PaymentMethod
  ) => {
    setPaymentMethod(method);
  };

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      /* =====================================================
         CARD — VALIDATE SECURE PAYMENT ELEMENT FIRST

         IMPORTANT:
         Do not create a WooCommerce order until Stripe/
         WooPayments accepts the secure card fields.
      ===================================================== */

      let stripePaymentMethodId: string | null = null;

      if (paymentMethod === "card") {
        if (
          !stripe ||
          !stripeElements ||
          !cardElementReady
        ) {
          throw new Error(
            "Secure card fields are not ready yet. Please wait a moment and try again."
          );
        }

        const submitResult =
          await stripeElements.submit();

        if (submitResult.error?.message) {
          throw new Error(
            submitResult.error.message
          );
        }

        const paymentMethodResult =
          await stripe.createPaymentMethod({
            elements: stripeElements,
            params: {
              billing_details: {
                name: `${(
                  billingSameAsShipping
                    ? form.firstName
                    : billingForm.firstName
                )} ${(
                  billingSameAsShipping
                    ? form.lastName
                    : billingForm.lastName
                )}`.trim(),

                email: form.email,

                phone: form.phone,

                address: {
                  line1:
                    billingSameAsShipping
                      ? form.address
                      : billingForm.address,

                  line2:
                    (billingSameAsShipping
                      ? form.apartment
                      : billingForm.apartment) ||
                    undefined,

                  city:
                    billingSameAsShipping
                      ? form.city
                      : billingForm.city,

                  state:
                    billingSameAsShipping
                      ? form.province
                      : billingForm.province,

                  postal_code:
                    billingSameAsShipping
                      ? form.postalCode
                      : billingForm.postalCode,

                  country: getCountryCode(
                    billingSameAsShipping
                      ? form.country
                      : billingForm.country
                  ),
                },
              },
            },
          });

        if (paymentMethodResult.error?.message) {
          throw new Error(
            paymentMethodResult.error.message
          );
        }

        stripePaymentMethodId =
          paymentMethodResult.paymentMethod?.id ||
          null;

        if (!stripePaymentMethodId) {
          throw new Error(
            "Stripe did not return a payment method."
          );
        }
      }

      /* =====================================================
         CREATE WOOCOMMERCE ORDER

         Card validation has already succeeded above.
         Fonepay and PayPal keep their existing flow.
      ===================================================== */

      const response = await fetch(
        "/api/woocommerce-order",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            paymentMethod,

            customer: {
              ...form,

              billingSameAsShipping,

              billing:
                billingSameAsShipping
                  ? null
                  : billingForm,
            },

            items: cart,

            currency,

            subtotal,

            shipping: {
              method:
                shippingMethod,

              cost:
                shippingCost,
            },

            total:
              grandTotal,

            totalItems,

            notes:
              form.notes,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.error ||
            "Unable to create your order."
        );
      }

      console.log(
        "WooCommerce order created:",
        data.order
      );

      /* =====================================================
         NEPAL — FONEPAY
      ===================================================== */

      if (
        NEPAL_PAYMENT_METHODS.includes(
          paymentMethod
        )
      ) {
        const paymentResponse =
          await fetch(
            "/api/payment-session",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                orderId:
                  data.order.id,

                paymentMethod,
              }),
            }
          );

        const paymentData =
          await paymentResponse.json();

        if (
          !paymentResponse.ok ||
          !paymentData.success
        ) {
          throw new Error(
            paymentData.error ||
              "Unable to start payment."
          );
        }

        const checkoutUrl =
          paymentData.payment
            ?.checkout_url;

        if (!checkoutUrl) {
          throw new Error(
            "Payment gateway did not return a checkout URL."
          );
        }

        window.location.assign(
          checkoutUrl
        );

        return;
      }

      /* =====================================================
         INTERNATIONAL — PAYPAL

         The order is already created above.
         Now process that existing order through the
         WooCommerce Store API using ppcp-gateway.

         IMPORTANT:
         We do NOT redirect to WooCommerce /checkout/order-pay.
         The API returns PayPal's own redirect URL directly.
      ===================================================== */

      if (paymentMethod === "paypal") {
  const token =
    wooCartToken ||
    await syncWooCommerceCart();

  if (!token) {
    throw new Error(
      "WooCommerce cart session is missing. Please refresh the checkout and try again."
    );
  }

  const paypalResponse = await fetch(
    "/api/paypal-payment",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "Cart-Token": token,
      },

      body: JSON.stringify({
        orderId: data.order.id,

        customer: {
          ...form,

          billingSameAsShipping,

          billing:
            billingSameAsShipping
              ? null
              : billingForm,
        },

        paymentData: [],
      }),
    }
  );

  const paypalData =
    await paypalResponse
      .json()
      .catch(() => null);

  if (
    !paypalResponse.ok ||
    !paypalData?.success
  ) {
    throw new Error(
      paypalData?.error ||
        "Unable to start PayPal payment."
    );
  }

  const redirectUrl =
    paypalData.payment?.redirect_url;

  if (!redirectUrl) {
    throw new Error(
      "PayPal did not return a payment URL."
    );
  }

  window.location.assign(
    redirectUrl
  );

  return;
}

      /* =====================================================
         INTERNATIONAL — WOOPAYMENTS CARD

         The Stripe PaymentMethod was created BEFORE the
         WooCommerce order. Now send that PaymentMethod to
         the existing WooPayments processing route.
      ===================================================== */

      if (paymentMethod === "card") {
        if (!stripePaymentMethodId) {
          throw new Error(
            "Stripe payment method is missing."
          );
        }

        const token =
          wooCartToken ||
          await syncWooCommerceCart();

        const paymentResponse =
          await fetch(
            "/api/woocommerce-payment",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                "Cart-Token":
                  token,
              },

              body: JSON.stringify({
                orderId:
                  data.order.id,

                customer: {
                  ...form,

                  billingSameAsShipping,

                  billing:
                    billingSameAsShipping
                      ? null
                      : billingForm,
                },

                paymentData: [
                  {
                    key:
                      "wcpay-payment-method",

                    value:
                      stripePaymentMethodId,
                  },

                  {
                    key:
                      "billing_email",

                    value:
                      form.email,
                  },

                  {
                    key:
                      "billing_first_name",

                    value:
                      billingSameAsShipping
                        ? form.firstName
                        : billingForm.firstName,
                  },

                  {
                    key:
                      "billing_last_name",

                    value:
                      billingSameAsShipping
                        ? form.lastName
                        : billingForm.lastName,
                  },

                  // WooCommerce Store API / payment integrations use this
                  // value to request tokenization of a new payment method.
                  {
                    key:
                      "save_payment_method",

                    value:
                      savePaymentMethod
                        ? "yes"
                        : "no",
                  },

                  // Keep the gateway's new-payment-method signal explicit
                  // for WooPayments when a new card is being created.
                  {
                    key:
                      "wc-woocommerce_payments-new-payment-method",

                    value: true,
                  },
                ],
              }),
            }
          );

        const paymentData =
          await paymentResponse
            .json()
            .catch(() => null);

        if (
          !paymentResponse.ok ||
          !paymentData?.success
        ) {
          throw new Error(
            paymentData?.error ||
              "WooPayments could not process the card payment."
          );
        }

        const redirectUrl =
          paymentData.payment
            ?.redirect_url;

        if (redirectUrl) {
          window.location.assign(
            redirectUrl
          );

          return;
        }

        setOrderNumber(
          String(
            data.order.number ||
              data.order.id
          )
        );

        setSubmitted(true);

        return;
      }

      throw new Error(
        "Unsupported payment method."
      );
    } catch (error) {
      console.error(
        "Checkout failed:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Unable to place your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (cart.length === 0) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#FAF8F4]">

          <section className="border-b border-[#E8DFD2] bg-white">

            <div className="mx-auto max-w-[1500px] px-6 py-12 lg:px-10">

              <p className="text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
                BuddhistMalaPro
              </p>

              <h1 className="mt-3 text-4xl font-bold text-[#1A1A1A]">
                Checkout
              </h1>

            </div>

          </section>

          <section className="flex min-h-[60vh] items-center justify-center px-6">

            <div className="text-center">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#F4EAD7] text-[#C89A2A]">
                <FiShoppingBag size={38} />
              </div>

              <h2 className="mt-7 text-2xl font-bold text-[#1A1A1A]">
                Your cart is empty
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Add some beautiful products before proceeding to checkout.
              </p>

              <Link
                href="/shop"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#C89A2A] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#A9821D]"
              >
                Continue Shopping
              </Link>

            </div>

          </section>

        </main>
      </>
    );
  }

  /* =======================================================
     SUCCESS
  ======================================================= */

  if (submitted) {
    return (
      <>
        <Header />

        <main className="min-h-screen bg-[#FAF8F4]">

          <section className="flex min-h-[80vh] items-center justify-center px-6 py-16">

            <div className="w-full max-w-[620px] rounded-3xl border border-[#E5DDD0] bg-white p-8 text-center shadow-sm md:p-12">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF6EC] text-[#2E7D32]">
                <FiCheck size={38} />
              </div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
                Thank You
              </p>

              <h1 className="mt-3 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
                Order Received
              </h1>

              {orderNumber && (
                <p className="mt-4 text-sm text-[#777]">
                  Order #{orderNumber}
                </p>
              )}

              <p className="mx-auto mt-4 max-w-[480px] text-sm leading-7 text-[#777]">
                Your order information has been received successfully.
              </p>

              <Link
                href="/"
                className="mt-8 inline-flex rounded-full bg-[#1A1A1A] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#C89A2A]"
              >
                Back to Home
              </Link>

            </div>

          </section>

        </main>
      </>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FAF8F4]">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="border-b border-[#E8DFD2] bg-white">

          <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">

            <div className="flex items-center gap-2 text-sm text-[#888]">

              <Link
                href="/"
                className="hover:text-[#C89A2A]"
              >
                Home
              </Link>

              <span>/</span>

              <Link
                href="/cart"
                className="hover:text-[#C89A2A]"
              >
                Cart
              </Link>

              <span>/</span>

              <span className="text-[#444]">
                Checkout
              </span>

            </div>

            <div className="mt-5 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F4EAD7] text-[#C89A2A]">
                <FiShoppingBag size={22} />
              </div>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#C89A2A]">
                  Secure Checkout
                </p>

                <h1 className="text-4xl font-bold text-[#1A1A1A] md:text-5xl">
                  Checkout
                </h1>

              </div>

            </div>

            <p className="mt-4 max-w-[650px] text-sm leading-7 text-[#777]">
              Complete your information below to securely place your BuddhistMalaPro order.
            </p>

          </div>

        </section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">

          <form
            onSubmit={handleSubmit}
            className="grid gap-8 lg:grid-cols-[1fr_430px] xl:gap-12"
          >

            {/* =================================================
                CHECKOUT ACCOUNT OPTION
            ================================================= */}

            <div className="lg:col-span-2 rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm md:p-8">

              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#C89A2A]">
                    Checkout Options
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-[#1A1A1A]">
                    How would you like to checkout?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#777]">
                    Sign in to use your account or continue as a guest without creating an account.
                  </p>
                </div>

                {checkoutMode === "guest" && (
                  <button
                    type="button"
                    onClick={() => setCheckoutMode("choice")}
                    className="text-sm font-semibold text-[#C89A2A] hover:text-[#A9821D]"
                  >
                    Change
                  </button>
                )}

              </div>

              {isAuthLoading && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-[#FAF8F4] px-4 py-4 text-sm text-[#777]">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#C89A2A]/30 border-t-[#C89A2A]" />
                  Checking your account...
                </div>
              )}

              {checkoutMode === "authenticated" && !isAuthLoading && (
                <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[#DCEBDD] bg-[#F5F8F5] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#C89A2A] shadow-sm">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <p className="font-bold text-[#222]">
                        Welcome back{customerName ? `, ${customerName}` : ""}!
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#5F7662]">
                        You are signed in. Your account information has been loaded automatically.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/account"
                    className="text-sm font-semibold text-[#C89A2A] hover:text-[#A9821D]"
                  >
                    My Account →
                  </Link>
                </div>
              )}

              {checkoutMode === "choice" && !isAuthLoading && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  {/* SIGN IN */}

                  <Link
                    href="/account/login?redirect=/checkout"
                    onClick={saveCheckoutDraft}
                    className="
                      group
                      rounded-2xl
                      border
                      border-[#DDD4C5]
                      bg-white
                      p-5
                      transition-all
                      hover:-translate-y-[1px]
                      hover:border-[#C89A2A]
                      hover:bg-[#FCF8EF]
                      hover:shadow-sm
                    "
                  >
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4EAD7] text-[#C89A2A]">
                        <span className="text-lg">👤</span>
                      </div>

                      <div>
                        <p className="font-bold text-[#222]">
                          Sign In
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#888]">
                          Already have an account? Sign in to continue with your account.
                        </p>

                        <span className="mt-3 inline-block text-xs font-bold text-[#C89A2A]">
                          Sign In →
                        </span>
                      </div>

                    </div>
                  </Link>

                  {/* GUEST */}

                  <button
                    type="button"
                    onClick={() => setCheckoutMode("guest")}
                    className="
                      group
                      rounded-2xl
                      border
                      border-[#C89A2A]
                      bg-[#FCF8EF]
                      p-5
                      text-left
                      transition-all
                      hover:-translate-y-[1px]
                      hover:shadow-sm
                    "
                  >
                    <div className="flex items-start gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#C89A2A] shadow-sm">
                        <span className="text-lg">🛍️</span>
                      </div>

                      <div>
                        <p className="font-bold text-[#222]">
                          Continue as Guest
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#888]">
                          Checkout quickly without creating or using an account.
                        </p>

                        <span className="mt-3 inline-block text-xs font-bold text-[#C89A2A]">
                          Continue as Guest →
                        </span>
                      </div>

                    </div>
                  </button>

                </div>
              )}

              {checkoutMode === "guest" && (
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#F5F8F5] px-4 py-3 text-xs text-[#4D7552]">
                  <FiCheck size={15} />
                  <span>
                    You are checking out as a guest. No account is required.
                  </span>
                </div>
              )}

            </div>

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="space-y-7">

              {/* CONTACT */}

              <div className="rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm md:p-8">

                <SectionHeading
                  number="1"
                  eyebrow="Customer"
                  title="Contact Information"
                />

                <div className="mt-7 grid gap-5 md:grid-cols-2">

                  <Input
                    label="First Name"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Last Name"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* ADDRESS */}

              <div className="rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm md:p-8">

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F4EAD7] text-[#C89A2A]">
                    <FiMapPin size={19} />
                  </div>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#C89A2A]">
                      Delivery
                    </p>

                    <h2 className="text-xl font-bold text-[#1A1A1A]">
                      Shipping Address
                    </h2>

                  </div>

                </div>

                <div className="mt-7 space-y-5">

                  {/* COUNTRY */}

                  <div>

                    <label
                      htmlFor="country"
                      className="mb-2 block text-sm font-medium text-[#444]"
                    >
                      Country
                    </label>

                    <div className="relative">

                      <FiGlobe
                        className="
                          pointer-events-none
                          absolute
                          left-4
                          top-1/2
                          z-10
                          -translate-y-1/2
                          text-[#999]
                        "
                        size={17}
                      />

                      <select
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                        className="
                          h-13
                          w-full
                          appearance-none
                          rounded-xl
                          border
                          border-[#DDD4C5]
                          bg-white
                          pl-11
                          pr-12
                          text-sm
                          text-[#222]
                          outline-none
                          transition
                          focus:border-[#C89A2A]
                          focus:ring-2
                          focus:ring-[#C89A2A]/10
                        "
                      >

                        {COUNTRIES.map(
                          (country) => (
                            <option
                              key={country}
                              value={country}
                            >
                              {country}
                            </option>
                          )
                        )}

                      </select>

                      {/* COUNTRY DROPDOWN ARROW */}

                      <span
                        className="
                          pointer-events-none
                          absolute
                          right-4
                          top-1/2
                          z-10
                          -translate-y-1/2
                          text-[#777]
                        "
                      >
                        <FiChevronDown
                          size={18}
                        />
                      </span>

                    </div>

                    <p className="mt-2 text-xs text-[#999]">
                      Payment options will automatically adjust according to your country.
                    </p>

                  </div>

                  <Input
                    label="Street Address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                  />

                  <Input
                    label="Apartment, Suite, etc. (Optional)"
                    name="apartment"
                    value={form.apartment}
                    onChange={handleChange}
                  />

                  <div className="grid gap-5 md:grid-cols-3">

                    <Input
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />

                    {/* STATE / PROVINCE */}

                    {hasStateOptions ? (
                      <SelectInput
                        label="State / Province"
                        name="province"
                        value={form.province}
                        options={availableStates}
                        placeholder="Select"
                        onChange={handleChange}
                        required
                      />
                    ) : (
                      <Input
                        label="State / Province"
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                        required
                      />
                    )}

                    <Input
                      label="Postal Code"
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                    />

                  </div>

                </div>

              </div>

              {/* BILLING ADDRESS */}

              <div className="rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm md:p-8">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <SectionHeading
                    number="3"
                    eyebrow="Billing"
                    title="Billing Address"
                  />

                  <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#444]">
                    <input
                      type="checkbox"
                      checked={billingSameAsShipping}
                      onChange={(e) =>
                        toggleBillingSameAsShipping(
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 accent-[#C89A2A]"
                    />
                    Same as shipping address
                  </label>

                </div>

                {billingSameAsShipping ? (
                  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#DCEBDD] bg-[#F5F8F5] p-4">
                    <FiCheck className="mt-0.5 shrink-0 text-[#2E7D32]" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-[#222]">
                        Billing address matches shipping address
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#5F7662]">
                        Your shipping address will be used automatically for billing and card verification.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-5">
                    <div className="rounded-2xl border border-[#E8DFD2] bg-[#FAF8F4] p-4">
                      <p className="text-sm font-semibold text-[#222]">
                        Enter your billing address
                      </p>
                      <p className="mt-1 text-xs leading-5 text-[#888]">
                        Enter the address registered with your card or payment provider.
                      </p>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={billingForm.firstName}
                        onChange={handleBillingChange}
                        required
                      />

                      <Input
                        label="Last Name"
                        name="lastName"
                        value={billingForm.lastName}
                        onChange={handleBillingChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="billing-country"
                        className="mb-2 block text-sm font-medium text-[#444]"
                      >
                        Country
                        <span className="ml-1 text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <FiGlobe
                          className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[#999]"
                          size={17}
                        />

                        <select
                          id="billing-country"
                          name="country"
                          value={billingForm.country}
                          onChange={handleBillingChange}
                          required
                          className="
                            h-13
                            w-full
                            appearance-none
                            rounded-xl
                            border
                            border-[#DDD4C5]
                            bg-white
                            pl-11
                            pr-12
                            text-sm
                            text-[#222]
                            outline-none
                            transition
                            focus:border-[#C89A2A]
                            focus:ring-2
                            focus:ring-[#C89A2A]/10
                          "
                        >
                          {COUNTRIES.map((country) => (
                            <option
                              key={`billing-${country}`}
                              value={country}
                            >
                              {country}
                            </option>
                          ))}
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-[#777]">
                          <FiChevronDown size={18} />
                        </span>
                      </div>
                    </div>

                    <Input
                      label="Street Address"
                      name="address"
                      value={billingForm.address}
                      onChange={handleBillingChange}
                      required
                    />

                    <Input
                      label="Apartment, Suite, etc. (Optional)"
                      name="apartment"
                      value={billingForm.apartment}
                      onChange={handleBillingChange}
                    />

                    <div className="grid gap-5 md:grid-cols-3">
                      <Input
                        label="City"
                        name="city"
                        value={billingForm.city}
                        onChange={handleBillingChange}
                        required
                      />

                      {(STATES_BY_COUNTRY[billingForm.country] || []).length > 0 ? (
                        <SelectInput
                          label="State / Province"
                          name="province"
                          value={billingForm.province}
                          options={STATES_BY_COUNTRY[billingForm.country]}
                          placeholder="Select"
                          onChange={handleBillingChange}
                          required
                        />
                      ) : (
                        <Input
                          label="State / Province"
                          name="province"
                          value={billingForm.province}
                          onChange={handleBillingChange}
                          required
                        />
                      )}

                      <Input
                        label="Postal Code"
                        name="postalCode"
                        value={billingForm.postalCode}
                        onChange={handleBillingChange}
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* SHIPPING */}

              <div className="rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm md:p-8">

                <SectionHeading
                  number="4"
                  eyebrow="Delivery"
                  title="Shipping Method"
                />

                <div className="mt-7 space-y-3">

                  <ShippingOption
                    selected={
                      shippingMethod ===
                      "standard"
                    }
                    value="standard"
                    title="Standard Shipping"
                    description="Estimated delivery: 5–10 business days"
                    price="Free"
                    onChange={() =>
                      setShippingMethod(
                        "standard"
                      )
                    }
                  />

                  <ShippingOption
                    selected={
                      shippingMethod ===
                      "express"
                    }
                    value="express"
                    title="Express Shipping"
                    description="Estimated delivery: 2–5 business days"
                    price={formatPrice(15)}
                    onChange={() =>
                      setShippingMethod(
                        "express"
                      )
                    }
                  />

                </div>

              </div>

              {/* NOTES */}

              <div className="rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm md:p-8">

                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#C89A2A]">
                  Optional
                </p>

                <h2 className="mt-1 text-xl font-bold text-[#1A1A1A]">
                  Order Notes
                </h2>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Special instructions for your order..."
                  className="
                    mt-5
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-[#DDD4C5]
                    bg-white
                    p-4
                    text-sm
                    text-[#222]
                    outline-none
                    transition
                    placeholder:text-[#AAA]
                    focus:border-[#C89A2A]
                    focus:ring-2
                    focus:ring-[#C89A2A]/10
                  "
                />

              </div>

            </div>

            {/* =================================================
                RIGHT — ORDER SUMMARY
            ================================================= */}

            <aside className="h-fit rounded-3xl border border-[#E5DDD0] bg-white p-6 shadow-sm lg:sticky lg:top-28 lg:p-7">

              <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#C89A2A]">
                Your Order
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#1A1A1A]">
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="mt-7 max-h-[390px] space-y-5 overflow-y-auto pr-1">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4"
                  >

                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F8F3E8]">

                      <Image
                        src={
                          item.images[0]
                        }
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain p-1"
                      />

                      <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1A1A1A] px-1 text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>

                    </div>

                    <div className="min-w-0 flex-1">

                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-[#222]">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-[#999]">
                        {formatPrice(
                          item.price
                        )}
                      </p>

                    </div>

                    <div className="shrink-0 text-sm font-semibold text-[#222]">
                      {formatPrice(
                        item.price *
                          item.quantity
                      )}
                    </div>

                  </div>
                ))}

              </div>

              {/* TOTALS */}

              <div className="mt-7 space-y-4 border-t border-[#E8DFD2] pt-6">

                <div className="flex justify-between text-sm">

                  <span className="text-[#777]">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    {formatPrice(
                      subtotal
                    )}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-[#777]">
                    Shipping
                  </span>

                  <span
                    className={
                      shippingCost === 0
                        ? "font-semibold text-[#2E7D32]"
                        : "font-semibold"
                    }
                  >
                    {shippingCost === 0
                      ? "Free"
                      : formatPrice(
                          shippingCost
                        )}
                  </span>

                </div>

              </div>

              {/* TOTAL */}

              <div className="mt-5 flex items-center justify-between border-t border-[#E8DFD2] pt-5">

                <span className="text-base font-semibold">
                  Total
                </span>

                <span className="text-2xl font-bold text-[#C89A2A]">
                  {formatPrice(
                    grandTotal
                  )}
                </span>

              </div>

              {/* PAYMENT METHOD */}

              <div className="mt-6">

                <div className="flex items-center justify-between gap-4">

                  <SectionHeading
                    number="5"
                    eyebrow="Secure Payment"
                    title="Choose Payment Method"
                  />

                  <div className="hidden items-center gap-2 rounded-full bg-[#F5F8F5] px-3 py-2 text-xs font-medium text-[#4D7552] sm:flex">
                    <FiLock size={13} />
                    Secure
                  </div>

                </div>

                <div className="mt-3 rounded-xl bg-[#FAF8F4] px-4 py-3 text-xs leading-5 text-[#777]">

                  {isNepal
                    ? "You are ordering from Nepal. Pay securely with Fonepay."
                    : "You are ordering internationally. Choose PayPal or Credit / Debit Card."
                  }

                </div>

                <div className="mt-5 space-y-3">

                  {/* NEPAL */}

                  {isNepal && (
                    <PaymentOption
                      selected={
                        paymentMethod ===
                        "fonepay"
                      }
                      value="fonepay"
                      title="Fonepay"
                      description="Pay securely through Fonepay."
                      logo="/payments/fonepay.png"
                      onChange={() =>
                        handlePaymentChange(
                          "fonepay"
                        )
                      }
                    />
                  )}

                  {/* INTERNATIONAL */}

                  {!isNepal && (
                    <>
                      <PaymentOption
                        selected={
                          paymentMethod ===
                          "paypal"
                        }
                        value="paypal"
                        title="PayPal"
                        description="Pay securely using your PayPal account."
                        logo="/payments/paypal.png"
                        onChange={() =>
                          handlePaymentChange(
                            "paypal"
                          )
                        }
                      />

                      <PaymentOption
                        selected={
                          paymentMethod ===
                          "card"
                        }
                        value="card"
                        title="Credit / Debit Card"
                        description="Secure card payment powered by WooPayments."
                        logo="/payments/card.png"
                        onChange={() =>
                          handlePaymentChange(
                            "card"
                          )
                        }
                      />

                      {paymentMethod === "card" && (
                        <div className="rounded-2xl border border-[#E5DDD0] bg-[#FAF8F4] p-4 md:p-5">
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-[#222]">
                                Card Details
                              </p>
                              <p className="mt-1 text-xs text-[#888]">
                                Your card details are securely handled by Stripe through WooPayments.
                              </p>
                            </div>
                            <FiLock className="shrink-0 text-[#C89A2A]" size={17} />
                          </div>
                          <div
                            ref={cardElementRef}
                            className="min-h-[120px] rounded-xl bg-white p-3"
                          />
                          {!cardElementReady && (
                            <p className="mt-3 text-xs text-[#999]">
                              Loading secure card fields…
                            </p>
                          )}

                          {checkoutMode === "authenticated" && (
                            <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-[#E5DDD0] bg-white px-4 py-3">
                              <input
                                type="checkbox"
                                checked={savePaymentMethod}
                                onChange={(event) =>
                                  setSavePaymentMethod(event.target.checked)
                                }
                                disabled={isSubmitting}
                                className="mt-0.5 h-4 w-4 shrink-0 accent-[#C89A2A]"
                              />

                              <span>
                                <span className="block text-sm font-semibold text-[#222]">
                                  Save payment method
                                </span>
                                <span className="mt-1 block text-xs leading-5 text-[#777]">
                                  Securely save this card to your account for faster future purchases. Your card number and security code are not stored on our website.
                                </span>
                              </span>
                            </label>
                          )}
                        </div>
                      )}
                    </>
                  )}

                </div>

              </div>

              {/* SECURITY */}

              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#FAF8F4] p-4">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#C89A2A] shadow-sm">
                  <FiLock size={17} />
                </div>

                <p className="text-xs leading-5 text-[#777]">
                  Your information is encrypted and securely processed by our payment provider.
                </p>

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  mt-6
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#C89A2A]
                  py-4
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-[#A9821D]
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >

                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock size={15} />

                    {getButtonText(
                      paymentMethod
                    )}
                  </>
                )}

              </button>

              <p className="mt-4 text-center text-[11px] leading-5 text-[#999]">
                By placing your order, you agree to our terms and policies.
              </p>

              {/* RETURN */}

              <Link
                href="/cart"
                className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#666] transition-colors hover:text-[#C89A2A]"
              >
                <FiArrowLeft size={15} />
                Return to Cart
              </Link>

            </aside>

          </form>

        </section>

      </main>
    </>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

interface SectionHeadingProps {
  number: string;
  eyebrow: string;
  title: string;
}

function SectionHeading({
  number,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EAD7] text-sm font-bold text-[#C89A2A]">
        {number}
      </div>

      <div>

        <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#C89A2A]">
          {eyebrow}
        </p>

        <h2 className="text-xl font-bold text-[#1A1A1A]">
          {title}
        </h2>

      </div>

    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

interface InputProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

function Input({
  label,
  name,
  value,
  type = "text",
  required = false,
  onChange,
}: InputProps) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#444]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-[#DDD4C5]
          bg-white
          px-4
          text-sm
          text-[#222]
          outline-none
          transition
          placeholder:text-[#AAA]
          focus:border-[#C89A2A]
          focus:ring-2
          focus:ring-[#C89A2A]/10
        "
      />

    </div>
  );
}

/* =========================================================
   SELECT INPUT
========================================================= */

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  placeholder?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

function SelectInput({
  label,
  name,
  value,
  options,
  placeholder = "Select",
  required = false,
  onChange,
}: SelectInputProps) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-[#444]"
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="
            h-12
            w-full
            appearance-none
            rounded-xl
            border
            border-[#DDD4C5]
            bg-white
            px-4
            pr-11
            text-sm
            text-[#222]
            outline-none
            transition
            focus:border-[#C89A2A]
            focus:ring-2
            focus:ring-[#C89A2A]/10
          "
        >

          <option
            value=""
            disabled={required}
          >
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}

        </select>

        <FiChevronDown
          className="
            pointer-events-none
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-[#777]
          "
          size={18}
        />

      </div>

    </div>
  );
}

/* =========================================================
   SHIPPING OPTION
========================================================= */

interface ShippingOptionProps {
  selected: boolean;
  value: ShippingMethod;
  title: string;
  description: string;
  price: string;
  onChange: () => void;
}

function ShippingOption({
  selected,
  value,
  title,
  description,
  price,
  onChange,
}: ShippingOptionProps) {
  return (
    <label
      className={`
        flex
        cursor-pointer
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        p-4
        transition-all

        ${
          selected
            ? "border-[#C89A2A] bg-[#FCF8EF] shadow-sm"
            : "border-[#DDD4C5] hover:border-[#C89A2A]/50"
        }
      `}
    >

      <div className="flex min-w-0 items-start gap-3">

        <input
          type="radio"
          name="shipping"
          value={value}
          checked={selected}
          onChange={onChange}
          className="mt-1 accent-[#C89A2A]"
        />

        <div>

          <p className="font-semibold text-[#222]">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#888]">
            {description}
          </p>

        </div>

      </div>

      <span
        className={`
          shrink-0
          text-sm
          font-semibold

          ${
            price === "Free"
              ? "text-[#2E7D32]"
              : "text-[#222]"
          }
        `}
      >
        {price}
      </span>

    </label>
  );
}

/* =========================================================
   PAYMENT OPTION
========================================================= */

interface PaymentOptionProps {
  selected: boolean;
  value: PaymentMethod;
  title: string;
  description: string;
  logo: string;
  onChange: () => void;
}

function PaymentOption({
  selected,
  value,
  title,
  description,
  logo,
  onChange,
}: PaymentOptionProps) {
  return (
    <label
      className={`
        relative
        block
        cursor-pointer
        overflow-hidden
        rounded-2xl
        border
        p-4
        transition-all
        duration-200

        ${
          selected
            ? "border-[#C89A2A] bg-[#FCF8EF] shadow-md"
            : "border-[#DDD4C5] bg-white hover:-translate-y-[1px] hover:border-[#C89A2A]/50 hover:shadow-sm"
        }
      `}
    >

      {selected && (
        <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#C89A2A] text-white">
          <FiCheck size={14} />
        </div>
      )}

      <div className="flex items-center gap-4">

        <input
          type="radio"
          name="payment"
          value={value}
          checked={selected}
          onChange={onChange}
          className="accent-[#C89A2A]"
        />

        <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl border border-[#E8DFD2] bg-white p-2 shadow-sm">

          <Image
            src={logo}
            alt={`${title} payment`}
            width={70}
            height={42}
            className="max-h-10 w-auto object-contain"
          />

        </div>

        <div className="min-w-0 pr-8">

          <p className="font-bold text-[#222]">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-[#888]">
            {description}
          </p>

        </div>

      </div>

    </label>
  );
}

/* =========================================================
   SECURITY BADGE
========================================================= */

function SecurityBadge({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-xl border border-[#E8DFD2] bg-[#FAF8F4] px-3 py-3 text-[10px] font-semibold text-[#777]">

      <span className="text-[#C89A2A]">
        {icon}
      </span>

      {text}

    </div>
  );
}

/* =========================================================
   COUNTRY CODE
========================================================= */

function getCountryCode(country: string) {
  const map: Record<string, string> = {
    Nepal: "NP",
    Australia: "AU",
    Canada: "CA",
    India: "IN",
    Japan: "JP",
    China: "CN",
    Germany: "DE",
    Brazil: "BR",
    Mexico: "MX",
    "United Kingdom": "GB",
    "United States": "US",
    Afghanistan: "AF",
    Albania: "AL",
    Algeria: "DZ",
    Andorra: "AD",
    Austria: "AT",
    Belgium: "BE",
    Bhutan: "BT",
    Bangladesh: "BD",
    Cambodia: "KH",
    Denmark: "DK",
    Finland: "FI",
    France: "FR",
    Greece: "GR",
    Indonesia: "ID",
    Ireland: "IE",
    Israel: "IL",
    Italy: "IT",
    Malaysia: "MY",
    Maldives: "MV",
    Netherlands: "NL",
    "New Zealand": "NZ",
    Norway: "NO",
    Pakistan: "PK",
    Philippines: "PH",
    Poland: "PL",
    Portugal: "PT",
    Qatar: "QA",
    "Saudi Arabia": "SA",
    Singapore: "SG",
    "South Korea": "KR",
    Spain: "ES",
    "Sri Lanka": "LK",
    Sweden: "SE",
    Switzerland: "CH",
    Thailand: "TH",
    "United Arab Emirates": "AE",
    Vietnam: "VN",
  };

  return map[country] || "US";
}

/* =========================================================
   PAYMENT TITLE
========================================================= */

function getPaymentTitle(
  paymentMethod: PaymentMethod
) {
  switch (paymentMethod) {
    case "fonepay":
      return "Fonepay";

    case "paypal":
      return "PayPal";

    case "card":
      return "Credit / Debit Card";

    default:
      return "Online Payment";
  }
}

/* =========================================================
   BUTTON TEXT
========================================================= */

function getButtonText(
  paymentMethod: PaymentMethod
) {
  switch (paymentMethod) {
    case "fonepay":
      return "Pay with Fonepay";

    case "paypal":
      return "Pay with PayPal";

    case "card":
      return "Pay Securely by Card";

    default:
      return "Continue to Payment";
  }
}