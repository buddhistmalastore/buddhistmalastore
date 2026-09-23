"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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

export default function LoginPage() {
  /* =========================================================
     LOGIN STATE
  ========================================================= */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  /* =========================================================
     LOAD CLOUDFLARE TURNSTILE
  ========================================================= */

  useEffect(() => {
    if (!turnstileSiteKey) {
      console.error(
        "NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing."
      );

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
       CHECK FOR EXISTING SCRIPT
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
  }, [turnstileSiteKey]);

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

      turnstileWidgetIdRef.current = null;
    };
  }, []);

  /* =========================================================
     LOGIN SUBMIT
  ========================================================= */

  async function handleSubmit(
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

    setLoading(true);

    try {
      /* =====================================================
         LOGIN API
      ===================================================== */

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
            email,
            password,
            turnstileToken,
          }),
        }
      );

      const data =
        await response.json();

      /* =====================================================
         LOGIN ERROR
      ===================================================== */

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

         If customer came from checkout:
         /account/login?redirect=/checkout

         They return to checkout.

         Otherwise:
         /account
      ===================================================== */

      const params =
        new URLSearchParams(
          window.location.search
        );

      const redirect =
        params.get("redirect");

      /* =====================================================
         ONLY ALLOW INTERNAL PATHS
      ===================================================== */

      const safeRedirect =
        redirect &&
        redirect.startsWith("/") &&
        !redirect.startsWith("//")
          ? redirect
          : "/account";

      window.location.href =
        safeRedirect;
    } catch (err) {
      console.error(
        "Login error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again."
      );

      /* =====================================================
         RESET TURNSTILE AFTER FAILED LOGIN

         This gives the customer a fresh verification
         token before trying again.
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
     CHECKOUT REDIRECT MESSAGE
  ========================================================= */

  const isCheckoutRedirect =
    new URLSearchParams(
      typeof window !== "undefined"
        ? window.location.search
        : ""
    ).get("redirect") ===
    "/checkout";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-[#eadfca] bg-white p-8 shadow-sm sm:p-10">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C89A2A]">
              Buddhist Mala Store
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
              Welcome back
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Sign in to manage your orders,
              account and saved items.
            </p>
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

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
                  htmlFor="password"
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
                  id="password"
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
                HUMAN VERIFICATION
            ================================================= */}

            <div className="flex justify-center pt-1">
              <div
                ref={
                  turnstileContainerRef
                }
                className="min-h-[65px]"
              />
            </div>

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              disabled={
                loading ||
                !turnstileReady ||
                !turnstileToken
              }
              className="w-full rounded-xl bg-[#C89A2A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div className="mt-8 border-t border-[#f0e7d8] pt-7 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?
            </p>

            <Link
              href="/account/register"
              className="mt-2 inline-block text-sm font-semibold text-[#9b7519] transition hover:text-[#C89A2A]"
            >
              Create an account
            </Link>
          </div>

          {/* =================================================
              CHECKOUT RETURN MESSAGE

              Only shown when customer came from checkout.
          ================================================= */}

          {isCheckoutRedirect && (
            <div className="mt-6 rounded-xl border border-[#eadfca] bg-[#faf8f4] px-4 py-3 text-center text-xs leading-5 text-gray-500">
              After signing in, you'll be
              returned to checkout to
              complete your order.
            </div>
          )}

        </div>
      </div>
    </main>
  );
}