"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  User,
  Package,
  MapPin,
  Heart,
  CreditCard,
  ChevronRight,
  LogOut,
  ShoppingBag,
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
} from "lucide-react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "auto" | "light" | "dark";
          action?: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;

      reset: (widgetId?: string) => void;

      remove: (widgetId?: string) => void;
    };
  }
}

type Customer = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
};

type AuthState =
  | "loading"
  | "authenticated"
  | "guest";

export default function AccountPage() {
  /* =========================================================
     AUTH STATE
  ========================================================= */

  const [authState, setAuthState] =
    useState<AuthState>("loading");

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  /* =========================================================
     LOGIN STATE
  ========================================================= */

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =========================================================
     LOGOUT STATE
  ========================================================= */

  const [isLoggingOut, setIsLoggingOut] =
    useState(false);

  /* =========================================================
     TURNSTILE STATE
  ========================================================= */

  const turnstileContainerRef =
    useRef<HTMLDivElement | null>(null);

  const turnstileWidgetIdRef =
    useRef<string | null>(null);

  const [turnstileToken, setTurnstileToken] =
    useState("");

  const [turnstileReady, setTurnstileReady] =
    useState(false);

  const turnstileSiteKey =
    process.env
      .NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  /* =========================================================
     CHECKOUT REDIRECT
  ========================================================= */

  const isCheckoutRedirect =
    new URLSearchParams(
      typeof window !== "undefined"
        ? window.location.search
        : ""
    ).get("redirect") === "/checkout";

  /* =========================================================
     CHECK AUTHENTICATION
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function checkAuthentication() {
      try {
        const response = await fetch(
          "/api/auth/me",
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

        if (
          response.ok &&
          data?.success &&
          data?.authenticated &&
          data?.customer
        ) {
          setCustomer(data.customer);
          setAuthState(
            "authenticated"
          );
        } else {
          setCustomer(null);
          setAuthState("guest");
        }
      } catch (authError) {
        console.error(
          "Account authentication check failed:",
          authError
        );

        if (!cancelled) {
          setCustomer(null);
          setAuthState("guest");
        }
      }
    }

    checkAuthentication();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     LOAD TURNSTILE
  ========================================================= */

  useEffect(() => {
    if (
      authState !== "guest" ||
      !turnstileSiteKey
    ) {
      return;
    }

    function renderTurnstile() {
      if (
        !window.turnstile ||
        !turnstileContainerRef.current ||
        turnstileWidgetIdRef.current !== null
      ) {
        return;
      }

      const widgetId =
  window.turnstile.render(
    turnstileContainerRef.current,
    {
      sitekey: turnstileSiteKey!,

      theme: "auto",

            action: "login",

            callback: (token: string) => {
              setTurnstileToken(token);
              setError("");
            },

            "expired-callback": () => {
              setTurnstileToken("");

              setError(
                "Human verification expired. Please verify again."
              );
            },

            "error-callback": () => {
              setTurnstileToken("");

              setError(
                "Human verification failed. Please try again."
              );
            },
          }
        );

      turnstileWidgetIdRef.current =
        widgetId;

      setTurnstileReady(true);
    }

    /* =======================================================
       TURNSTILE ALREADY LOADED
    ======================================================= */

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    /* =======================================================
       CHECK EXISTING SCRIPT
    ======================================================= */

    const existingScript =
      document.querySelector(
        'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
      );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        renderTurnstile
      );

      return () => {
        existingScript.removeEventListener(
          "load",
          renderTurnstile
        );
      };
    }

    /* =======================================================
       LOAD TURNSTILE SCRIPT
    ======================================================= */

    const script =
      document.createElement("script");

    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

    script.async = true;
    script.defer = true;

    script.addEventListener(
      "load",
      renderTurnstile
    );

    document.head.appendChild(script);

    return () => {
      script.removeEventListener(
        "load",
        renderTurnstile
      );
    };
  }, [
    authState,
    turnstileSiteKey,
  ]);

  /* =========================================================
     CLEAN UP TURNSTILE
  ========================================================= */

  useEffect(() => {
    return () => {
      if (
        window.turnstile &&
        turnstileWidgetIdRef.current
      ) {
        try {
          window.turnstile.remove(
            turnstileWidgetIdRef.current
          );
        } catch {
          // Ignore cleanup errors.
        }
      }

      turnstileWidgetIdRef.current =
        null;
    };
  }, []);

  /* =========================================================
     LOGIN SUBMIT
  ========================================================= */

  async function handleLoginSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    /* =======================================================
       TURNSTILE VALIDATION
    ======================================================= */

    if (!turnstileToken) {
      setError(
        "Please complete the human verification before signing in."
      );

      return;
    }

    /* =======================================================
       BASIC VALIDATION
    ======================================================= */

    if (!email.trim()) {
      setError(
        "Please enter your email address."
      );

      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );

      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            email: email.trim(),
            password,
            turnstileToken,
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
            "Unable to log in."
        );
      }

      /* =====================================================
         REDIRECT AFTER LOGIN
      ===================================================== */

      const params =
        new URLSearchParams(
          window.location.search
        );

      const redirect =
        params.get("redirect");

      const safeRedirect =
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//")
          ? redirect
          : "/account";

      window.location.href =
        safeRedirect;
    } catch (loginError) {
      console.error(
        "Login error:",
        loginError
      );

      setError(
        loginError instanceof Error
          ? loginError.message
          : "Unable to log in. Please try again."
      );

      /* =====================================================
         RESET TURNSTILE
      ===================================================== */

      setTurnstileToken("");

      if (
        window.turnstile &&
        turnstileWidgetIdRef.current
      ) {
        try {
          window.turnstile.reset(
            turnstileWidgetIdRef.current
          );
        } catch {
          // Ignore reset errors.
        }
      }
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     LOGOUT
  ========================================================= */

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      const response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data =
        await response.json().catch(
          () => null
        );

      if (
        !response.ok ||
        !data?.success
      ) {
        throw new Error(
          data?.error ||
            "Unable to log out."
        );
      }

      window.location.href =
        "/account/login";
    } catch (logoutError) {
      console.error(
        "Logout failed:",
        logoutError
      );

      alert(
        logoutError instanceof Error
          ? logoutError.message
          : "Unable to log out. Please try again."
      );

      setIsLoggingOut(false);
    }
  };

  /* =========================================================
     CUSTOMER NAME
  ========================================================= */

  const firstName =
    customer?.first_name?.trim() || "";

  /* =========================================================
     LOADING
  ========================================================= */

  if (authState === "loading") {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-6 py-16 lg:px-8">

        <div className="mx-auto flex min-h-[65vh] max-w-md items-center justify-center">

          <div className="w-full rounded-3xl border border-[#eadfca] bg-white p-10 text-center shadow-sm">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#faf8f4] text-[#C89A2A]">

              <User
                size={25}
                strokeWidth={1.6}
              />

            </div>

            <p className="mt-5 text-sm text-gray-500">
              Checking your account...
            </p>

          </div>

        </div>

      </main>
    );
  }

  /* =========================================================
     LOGGED OUT — LOGIN DIRECTLY ON ACCOUNT PAGE
  ========================================================= */

  if (authState === "guest") {
    return (
      <main className="min-h-screen bg-[#faf8f4] px-6 py-14 lg:px-8">

        <div className="mx-auto flex min-h-[70vh] max-w-md items-center justify-center">

          <div className="w-full rounded-3xl border border-[#eadfca] bg-white p-8 shadow-sm sm:p-10">

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="text-center">

              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#C89A2A]">
                Buddhist Mala Store
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                Welcome back
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Sign in to access your account
                and manage your orders.
              </p>

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
                LOGIN FORM
            ================================================= */}

            <form
              onSubmit={handleLoginSubmit}
              className="mt-7 space-y-5"
            >

              {/* =================================================
                  EMAIL
              ================================================= */}

              <div>

                <label
                  htmlFor="account-email"
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
                    id="account-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                </div>

              </div>

              {/* =================================================
                  PASSWORD
              ================================================= */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="account-password"
                    className="block text-sm font-medium text-[#1A1A1A]"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-medium text-[#9b7519] transition hover:text-[#C89A2A]"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="account-password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-12 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#C89A2A]"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>

              {/* =================================================
                  TURNSTILE
              ================================================= */}

              <div className="flex min-h-[65px] justify-center pt-1">

                <div
                  ref={
                    turnstileContainerRef
                  }
                />

              </div>

              {/* =================================================
                  SIGN IN
              ================================================= */}

              <button
                type="submit"
                disabled={
                  loading ||
                  !turnstileReady ||
                  !turnstileToken
                }
                className="w-full rounded-xl bg-[#C89A2A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b88920] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>

            </form>

            {/* =================================================
                CREATE ACCOUNT
            ================================================= */}

            <div className="mt-7 border-t border-[#f0e7d8] pt-6 text-center">

              <p className="text-sm text-gray-500">
                Don't have an account?
              </p>

              <Link
                href="/account/register"
                className="mt-2 inline-flex items-center text-sm font-semibold text-[#9b7519] transition hover:text-[#C89A2A]"
              >
                Create an account

                <ChevronRight
                  size={16}
                  className="ml-1"
                />

              </Link>

            </div>

            {/* =================================================
                CHECKOUT MESSAGE
            ================================================= */}

            {isCheckoutRedirect && (
              <div className="mt-5 rounded-xl border border-[#eadfca] bg-[#faf8f4] px-4 py-3 text-center text-xs leading-5 text-gray-500">
                After signing in, you'll be
                returned to checkout to complete
                your order.
              </div>
            )}

            {/* =================================================
                SHOPPING
            ================================================= */}

            <Link
              href="/shop"
              className="group mt-5 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#9b7519]"
            >

              <ShoppingBag
                size={17}
                strokeWidth={1.6}
              />

              Continue Shopping

              <ChevronRight
                size={16}
                className="transition group-hover:translate-x-1"
              />

            </Link>

            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

              <ShieldCheck
                size={15}
                strokeWidth={1.6}
              />

              <span>
                Secure account access
              </span>

            </div>

          </div>

        </div>

      </main>
    );
  }

  /* =========================================================
     LOGGED-IN ACCOUNT DASHBOARD
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#faf8f4]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#eadfca] bg-white">

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C89A2A]">
            My Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#1A1A1A] md:text-5xl">
            Welcome back
            {firstName
              ? `, ${firstName}`
              : ""}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
            Manage your orders, account details,
            addresses and saved items from one place.
          </p>

          {customer?.email && (
            <p className="mt-2 text-sm text-gray-500">
              {customer.email}
            </p>
          )}

        </div>

      </section>

      {/* =====================================================
          ACCOUNT CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {/* =================================================
              ORDERS
          ================================================= */}

          <Link
            href="/account/orders"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <Package
                  size={24}
                  strokeWidth={1.7}
                />

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />

            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              My Orders
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              View your orders, payment status,
              products and delivery progress.
            </p>

          </Link>

          {/* =================================================
              PROFILE
          ================================================= */}

          <Link
            href="/account/profile"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <User
                  size={24}
                  strokeWidth={1.7}
                />

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />

            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Account Details
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Manage your name, email address
              and personal account information.
            </p>

          </Link>

          {/* =================================================
              ADDRESSES
          ================================================= */}

          <Link
            href="/account/addresses"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <MapPin
                  size={24}
                  strokeWidth={1.7}
                />

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />

            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              My Addresses
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Manage your billing and shipping
              addresses.
            </p>

          </Link>

          {/* =================================================
              WISHLIST
          ================================================= */}

          <Link
            href="/wishlist"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <Heart
                  size={24}
                  strokeWidth={1.7}
                />

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />

            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Wishlist
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              View and manage products you've
              saved for later.
            </p>

          </Link>

          {/* =================================================
              PAYMENT METHODS
          ================================================= */}

          <Link
            href="/account/payment-methods"
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faf8f4] text-[#C89A2A]">

                <CreditCard
                  size={24}
                  strokeWidth={1.7}
                />

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C89A2A]"
              />

            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              Payment Methods
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Manage your available payment
              methods and payment preferences.
            </p>

          </Link>

          {/* =================================================
              LOGOUT
          ================================================= */}

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group rounded-2xl border border-[#eadfca] bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-600">

                <LogOut
                  size={24}
                  strokeWidth={1.7}
                />

              </div>

              <ChevronRight
                size={20}
                className="text-gray-400 transition group-hover:translate-x-1"
              />

            </div>

            <h2 className="mt-6 text-xl font-semibold text-[#1A1A1A]">
              {isLoggingOut
                ? "Logging out..."
                : "Logout"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              {isLoggingOut
                ? "Please wait while we securely sign you out."
                : "Sign out securely from your Buddhist Mala Store account."}
            </p>

          </button>

        </div>

        {/* ===================================================
            INFORMATION CARD
        =================================================== */}

        <div className="mt-10 rounded-2xl border border-[#eadfca] bg-white p-7 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-medium uppercase tracking-[0.16em] text-[#C89A2A]">
                Buddhist Mala Store
              </p>

              <h3 className="mt-2 text-xl font-semibold text-[#1A1A1A]">
                Your account, your orders,
                your journey.
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
                Everything related to your purchases
                will be available here as we continue
                building your customer experience.
              </p>

            </div>

            <Link
              href="/shop"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#C89A2A] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </section>
    </main>
  );
}