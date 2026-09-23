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
  ChevronRight,
  Mail,
  Phone,
  Save,
  ShieldCheck,
  User,
} from "lucide-react";

type CustomerProfile = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
};

export default function AccountProfilePage() {
  const [profile, setProfile] =
    useState<CustomerProfile | null>(
      null
    );

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================================================
     LOAD PROFILE
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      try {
        const response = await fetch(
          "/api/account/profile",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const data =
          await response.json().catch(
            () => null
          );

        if (cancelled) return;

        if (response.status === 401) {
          window.location.href =
            "/account";
          return;
        }

        if (
          !response.ok ||
          !data?.success ||
          !data?.customer
        ) {
          throw new Error(
            data?.error ||
              "Unable to load your profile."
          );
        }

        const customer =
          data.customer;

        setProfile(customer);

        setFirstName(
          customer.first_name || ""
        );

        setLastName(
          customer.last_name || ""
        );

        setEmail(
          customer.email || ""
        );

        setPhone(
          customer.phone || ""
        );
      } catch (loadError) {
        console.error(
          "Profile load error:",
          loadError
        );

        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load your profile."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!firstName.trim()) {
      setError(
        "Please enter your first name."
      );
      return;
    }

    if (!lastName.trim()) {
      setError(
        "Please enter your last name."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        "/api/account/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            firstName:
              firstName.trim(),
            lastName:
              lastName.trim(),
            email:
              email.trim(),
            phone:
              phone.trim(),
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.error ||
            "Unable to update your profile."
        );
      }

      setProfile(data.customer);

      setFirstName(
        data.customer.first_name || ""
      );

      setLastName(
        data.customer.last_name || ""
      );

      setEmail(
        data.customer.email || ""
      );

      setPhone(
        data.customer.phone || ""
      );

      setSuccess(
        "Your account details have been updated successfully."
      );
    } catch (saveError) {
      console.error(
        "Profile save error:",
        saveError
      );

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to update your profile. Please try again."
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
      <main className="min-h-screen bg-[#faf8f4] px-6 py-16 lg:px-8">

        <div className="mx-auto max-w-3xl">

          <div className="rounded-3xl border border-[#eadfca] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf8f4] text-[#C89A2A]">

              <User
                size={25}
                strokeWidth={1.6}
              />

            </div>

            <p className="mt-5 text-sm text-gray-500">
              Loading your account details...
            </p>

          </div>

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
            <ArrowLeft
              size={17}
              strokeWidth={1.7}
            />

            Back to My Account
          </Link>

          <div className="mt-7">

            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C89A2A]">
              Account
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1A1A] md:text-4xl">
              Account Details
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Manage your personal information
              and contact details.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">

          {/* =================================================
              FORM
          ================================================= */}

          <div className="rounded-3xl border border-[#eadfca] bg-white p-7 shadow-sm sm:p-9">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <User
                  size={23}
                  strokeWidth={1.7}
                />

              </div>

              <div>

                <h2 className="text-xl font-semibold text-[#1A1A1A]">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Keep your account information
                  up to date.
                </p>

              </div>

            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                {error}
              </div>
            )}

            {/* =================================================
                SUCCESS
            ================================================= */}

            {success && (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700">

                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>
                  {success}
                </span>

              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >

              {/* =================================================
                  FIRST + LAST NAME
              ================================================= */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>

                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                  >
                    First Name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    maxLength={50}
                    required
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#eadfca] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                </div>

                <div>

                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    maxLength={50}
                    required
                    value={lastName}
                    onChange={(event) =>
                      setLastName(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#eadfca] bg-white px-4 py-3.5 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                </div>

              </div>

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                >
                  Email Address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                </div>

              </div>

              {/* =================================================
                  PHONE
              ================================================= */}

              <div>

                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                >
                  Phone Number
                </label>

                <div className="relative">

                  <Phone
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={30}
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value
                      )
                    }
                    placeholder="+977 98XXXXXXXX"
                    className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                </div>

              </div>

              {/* =================================================
                  USERNAME
              ================================================= */}

              <div>

                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  value={
                    profile?.username || ""
                  }
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-[#eadfca] bg-gray-50 px-4 py-3.5 text-sm text-gray-500"
                />

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  Your username cannot be changed.
                </p>

              </div>

              {/* =================================================
                  SAVE
              ================================================= */}

              <div className="flex justify-end border-t border-[#f0e7d8] pt-6">

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C89A2A] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b88920] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <Save
                    size={17}
                    strokeWidth={1.8}
                  />

                  {saving
                    ? "Saving Changes..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

          </div>

          {/* =================================================
              SIDE INFORMATION
          ================================================= */}

          <aside className="space-y-5">

            <div className="rounded-2xl border border-[#eadfca] bg-white p-6 shadow-sm">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <ShieldCheckIcon />

              </div>

              <h3 className="mt-5 text-base font-semibold text-[#1A1A1A]">
                Your information
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Your account information is
                securely connected to your
                Buddhist Mala Store customer
                account.
              </p>

            </div>

            <div className="rounded-2xl border border-[#eadfca] bg-white p-6 shadow-sm">

              <h3 className="text-base font-semibold text-[#1A1A1A]">
                Need help?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                If you need assistance with your
                account or an order, we're here
                to help.
              </p>

              <Link
                href="/contact"
                className="mt-4 inline-flex text-sm font-semibold text-[#9b7519] transition hover:text-[#C89A2A]"
              >
                Contact us
                <ChevronRight
                  size={16}
                  className="ml-1"
                />
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

/* =========================================================
   SMALL SECURITY ICON
========================================================= */

function ShieldCheckIcon() {
  return (
    <ShieldCheck
      size={22}
      strokeWidth={1.7}
    />
  );
}