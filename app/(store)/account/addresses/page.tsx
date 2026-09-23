"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useState,
} from "react";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Save,
} from "lucide-react";

const COUNTRIES = [
  "Australia",
  "Austria",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Denmark",
  "France",
  "Germany",
  "India",
  "Italy",
  "Japan",
  "Mexico",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Singapore",
  "Spain",
  "Sweden",
  "Switzerland",
  "United Kingdom",
  "United States",
];

const COUNTRY_CODES: Record<string, string> = {
  Australia: "AU",
  Austria: "AT",
  Belgium: "BE",
  Brazil: "BR",
  Canada: "CA",
  China: "CN",
  Denmark: "DK",
  France: "FR",
  Germany: "DE",
  India: "IN",
  Italy: "IT",
  Japan: "JP",
  Mexico: "MX",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Norway: "NO",
  Singapore: "SG",
  Spain: "ES",
  Sweden: "SE",
  Switzerland: "CH",
  "United Kingdom": "GB",
  "United States": "US",
};

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
    "Delhi",
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
  ],

  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "California",
    "Colorado",
    "Florida",
    "Georgia",
    "Illinois",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "New Jersey",
    "New York",
    "North Carolina",
    "Ohio",
    "Oregon",
    "Pennsylvania",
    "Texas",
    "Virginia",
    "Washington",
  ],

  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland",
  ],

  Germany: [
    "Bavaria",
    "Berlin",
    "Brandenburg",
    "Hesse",
    "North Rhine-Westphalia",
    "Saxony",
    "Thuringia",
  ],

  Japan: [
    "Tokyo",
    "Osaka",
    "Kyoto",
    "Hokkaido",
    "Okinawa",
  ],

  China: [
    "Beijing",
    "Shanghai",
    "Guangdong",
    "Sichuan",
    "Zhejiang",
  ],
};

type Address = {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
};

const emptyAddress: Address = {
  first_name: "",
  last_name: "",
  company: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  postcode: "",
  country: "NP",
  email: "",
  phone: "",
};

/* =========================================================
   ADDRESS FIELDS
========================================================= */

function AddressFields({
  title,
  address,
  setAddress,
  includeContact = false,
  disabled = false,
}: {
  title: string;
  address: Address;
  setAddress: React.Dispatch<
    React.SetStateAction<Address>
  >;
  includeContact?: boolean;
  disabled?: boolean;
}) {
  const countryName =
    Object.entries(COUNTRY_CODES).find(
      ([, code]) =>
        code === address.country
    )?.[0] || "Nepal";

  const states =
    STATES_BY_COUNTRY[countryName] || [];

  function update(
    field: keyof Address,
    value: string
  ) {
    if (disabled) return;

    setAddress((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function changeCountry(
    countryName: string
  ) {
    if (disabled) return;

    setAddress((current) => ({
      ...current,
      country:
        COUNTRY_CODES[countryName] || "",
      state: "",
    }));
  }

  return (
    <div
      className={`rounded-3xl border border-[#eadfca] bg-white p-7 shadow-sm sm:p-9 ${
        disabled ? "opacity-90" : ""
      }`}
    >
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">
          <MapPin
            size={22}
            strokeWidth={1.7}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#1A1A1A]">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Enter the address you use for
            your orders.
          </p>
        </div>

      </div>

      {/* =====================================================
          SAME AS BILLING MESSAGE
      ===================================================== */}

      {disabled && (
        <div className="mt-6 rounded-xl border border-[#eadfca] bg-[#faf8f4] px-4 py-3 text-sm text-gray-600">
          Shipping address is currently using
          the same information as your billing
          address.
        </div>
      )}

      {/* =====================================================
          FIRST / LAST NAME
      ===================================================== */}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">

        <Field
          label="First Name"
          value={address.first_name}
          maxLength={50}
          required
          disabled={disabled}
          onChange={(value) =>
            update("first_name", value)
          }
        />

        <Field
          label="Last Name"
          value={address.last_name}
          maxLength={50}
          required
          disabled={disabled}
          onChange={(value) =>
            update("last_name", value)
          }
        />

      </div>

      {/* =====================================================
          COMPANY
      ===================================================== */}

      <div className="mt-5">

        <Field
          label="Company"
          value={address.company}
          maxLength={100}
          disabled={disabled}
          onChange={(value) =>
            update("company", value)
          }
        />

      </div>

      {/* =====================================================
          STREET ADDRESS
      ===================================================== */}

      <div className="mt-5">

        <Field
          label="Street Address"
          value={address.address_1}
          maxLength={200}
          required
          disabled={disabled}
          onChange={(value) =>
            update("address_1", value)
          }
        />

      </div>

      {/* =====================================================
          APARTMENT
      ===================================================== */}

      <div className="mt-5">

        <Field
          label="Apartment, suite, unit, etc. (optional)"
          value={address.address_2}
          maxLength={200}
          disabled={disabled}
          onChange={(value) =>
            update("address_2", value)
          }
        />

      </div>

      {/* =====================================================
          CITY
      ===================================================== */}

      <div className="mt-5">

        <Field
          label="City"
          value={address.city}
          maxLength={100}
          required
          disabled={disabled}
          onChange={(value) =>
            update("city", value)
          }
        />

      </div>

      {/* =====================================================
          COUNTRY + STATE
      ===================================================== */}

      <div className="mt-5 grid gap-5 sm:grid-cols-2">

        {/* COUNTRY */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
            Country / Region
          </label>

          <select
            value={countryName}
            disabled={disabled}
            onChange={(event) =>
              changeCountry(
                event.target.value
              )
            }
            className={`w-full rounded-xl border border-[#eadfca] px-4 py-3.5 text-sm outline-none transition focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10 ${
              disabled
                ? "cursor-not-allowed bg-gray-50 text-gray-500"
                : "bg-white text-[#1A1A1A]"
            }`}
          >
            {COUNTRIES.map((country) => (
              <option
                key={country}
                value={country}
              >
                {country}
              </option>
            ))}
          </select>

        </div>

        {/* STATE */}

        <div>

          <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
            State / Province / Region
          </label>

          {states.length > 0 ? (
            <select
              value={address.state}
              disabled={disabled}
              onChange={(event) =>
                update(
                  "state",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border border-[#eadfca] px-4 py-3.5 text-sm outline-none transition focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10 ${
                disabled
                  ? "cursor-not-allowed bg-gray-50 text-gray-500"
                  : "bg-white text-[#1A1A1A]"
              }`}
            >
              <option value="">
                Select region
              </option>

              {states.map((state) => (
                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={address.state}
              maxLength={100}
              disabled={disabled}
              onChange={(event) =>
                update(
                  "state",
                  event.target.value
                )
              }
              placeholder="State / Province / Region"
              className={`w-full rounded-xl border border-[#eadfca] px-4 py-3.5 text-sm outline-none transition focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10 ${
                disabled
                  ? "cursor-not-allowed bg-gray-50 text-gray-500"
                  : "bg-white text-[#1A1A1A]"
              }`}
            />
          )}

        </div>

      </div>

      {/* =====================================================
          POSTCODE
      ===================================================== */}

      <div className="mt-5">

        <Field
          label="Postal / ZIP Code"
          value={address.postcode}
          maxLength={20}
          disabled={disabled}
          onChange={(value) =>
            update("postcode", value)
          }
        />

      </div>

      {/* =====================================================
          CONTACT
      ===================================================== */}

      {includeContact && (
        <div className="mt-5 grid gap-5 sm:grid-cols-2">

          <Field
            label="Email Address"
            type="email"
            value={address.email}
            maxLength={254}
            disabled={disabled}
            onChange={(value) =>
              update("email", value)
            }
          />

          <Field
            label="Phone"
            type="tel"
            value={address.phone}
            maxLength={30}
            disabled={disabled}
            onChange={(value) =>
              update("phone", value)
            }
          />

        </div>
      )}

    </div>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

function Field({
  label,
  value,
  onChange,
  maxLength,
  required = false,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-[#1A1A1A]">
        {label}
      </label>

      <input
        type={type}
        value={value}
        maxLength={maxLength}
        required={required}
        disabled={disabled}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`w-full rounded-xl border border-[#eadfca] px-4 py-3.5 text-sm text-[#1A1A1A] outline-none transition focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10 ${
          disabled
            ? "cursor-not-allowed bg-gray-50 text-gray-500"
            : "bg-white"
        }`}
      />

    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AddressesPage() {
  const [billing, setBilling] =
    useState<Address>(emptyAddress);

  const [shipping, setShipping] =
    useState<Address>({
      ...emptyAddress,
    });

  const [sameAsBilling, setSameAsBilling] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================================================
     LOAD ADDRESSES
  ========================================================= */

  useEffect(() => {
    async function loadAddresses() {
      try {
        const response =
          await fetch(
            "/api/account/addresses",
            {
              credentials: "include",
              cache: "no-store",
            }
          );

        const data =
          await response.json();

        if (response.status === 401) {
          window.location.href =
            "/account";
          return;
        }

        if (
          !response.ok ||
          !data.success
        ) {
          throw new Error(
            data.error ||
              "Unable to load addresses."
          );
        }

        setBilling({
          ...emptyAddress,
          ...(data.billing || {}),
          country:
            data.billing?.country ||
            "NP",
        });

        setShipping({
          ...emptyAddress,
          ...(data.shipping || {}),
          country:
            data.shipping?.country ||
            "NP",
        });
      } catch (err) {
        console.error(
          "Address loading error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load addresses."
        );
      } finally {
        setLoading(false);
      }
    }

    loadAddresses();
  }, []);

  /* =========================================================
     SYNC SHIPPING WITH BILLING
  ========================================================= */

  useEffect(() => {
    if (!sameAsBilling) {
      return;
    }

    setShipping({
      ...billing,

      // Shipping does not need separate
      // email/phone fields in WooCommerce.
      email: "",
      phone: "",
    });
  }, [billing, sameAsBilling]);

  /* =========================================================
     CHECKBOX HANDLER
  ========================================================= */

  function handleSameAsBillingChange(
    checked: boolean
  ) {
    setSameAsBilling(checked);

    if (checked) {
      setShipping({
        ...billing,
        email: "",
        phone: "",
      });
    }
  }

  /* =========================================================
     SAVE
  ========================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setSaving(true);

    try {
      const shippingToSave =
        sameAsBilling
          ? {
              ...billing,
              email: "",
              phone: "",
            }
          : shipping;

      const response =
        await fetch(
          "/api/account/addresses",
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
              billing,
              shipping: shippingToSave,
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
            "Unable to save addresses."
        );
      }

      setBilling({
        ...emptyAddress,
        ...data.billing,
      });

      setShipping({
        ...emptyAddress,
        ...data.shipping,
      });

      setSuccess(
        "Your addresses have been updated successfully."
      );
    } catch (err) {
      console.error(
        "Address save error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save addresses."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-6 py-16">

        <div className="mx-auto max-w-5xl rounded-3xl border border-[#eadfca] bg-white p-12 text-center">

          <p className="text-sm text-gray-500">
            Loading your addresses...
          </p>

        </div>

      </main>
    );
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#faf8f4]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#eadfca] bg-white">

        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">

          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#9b7519]"
          >
            <ArrowLeft size={17} />

            Back to My Account
          </Link>

          <p className="mt-7 text-sm font-medium uppercase tracking-[0.2em] text-[#C89A2A]">
            Account
          </p>

          <h1 className="mt-3 text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
            My Addresses
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
            Manage your billing and shipping
            addresses for faster checkout.
          </p>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* SUCCESS */}

        {success && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">

            <CheckCircle2
              size={18}
              className="mt-0.5 shrink-0"
            />

            <span>{success}</span>

          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          {/* =================================================
              BILLING ADDRESS
          ================================================= */}

          <AddressFields
            title="Billing Address"
            address={billing}
            setAddress={setBilling}
            includeContact
          />

          {/* =================================================
              SAME AS BILLING
          ================================================= */}

          <div className="rounded-2xl border border-[#eadfca] bg-white px-5 py-4 shadow-sm">

            <label className="flex cursor-pointer items-start gap-3">

              <input
                type="checkbox"
                checked={sameAsBilling}
                onChange={(event) =>
                  handleSameAsBillingChange(
                    event.target.checked
                  )
                }
                className="mt-1 h-4 w-4 cursor-pointer rounded border-[#d8c8aa] accent-[#C89A2A]"
              />

              <span>

                <span className="block text-sm font-semibold text-[#1A1A1A]">
                  Use same as billing address
                </span>

                <span className="mt-1 block text-xs leading-5 text-gray-500">
                  Use your billing address as your
                  shipping address.
                </span>

              </span>

            </label>

          </div>

          {/* =================================================
              SHIPPING ADDRESS
          ================================================= */}

          <AddressFields
            title="Shipping Address"
            address={shipping}
            setAddress={setShipping}
            disabled={sameAsBilling}
          />

          {/* =================================================
              SAVE BUTTON
          ================================================= */}

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#C89A2A] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b88920] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >

              <Save
                size={17}
                strokeWidth={1.8}
              />

              {saving
                ? "Saving Addresses..."
                : "Save Addresses"}

            </button>

          </div>

        </form>

      </section>

    </main>
  );
}