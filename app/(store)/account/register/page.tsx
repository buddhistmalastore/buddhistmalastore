"use client";

import Link from "next/link";
import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
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

export default function RegisterPage() {
  const [firstName, setFirstName] =
    useState("");
  const [lastName, setLastName] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  /* =========================================================
     TURNSTILE
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

            action: "register",

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
     REGISTER SUBMIT
  ========================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /* =======================================================
       VALIDATION
    ======================================================= */

    const trimmedFirstName =
      firstName.trim();

    const trimmedLastName =
      lastName.trim();

    const trimmedEmail =
      email.trim();

    if (!trimmedFirstName) {
      setError(
        "Please enter your first name."
      );
      return;
    }

    if (!trimmedLastName) {
      setError(
        "Please enter your last name."
      );
      return;
    }

    if (!trimmedEmail) {
      setError(
        "Please enter your email address."
      );
      return;
    }

    if (trimmedFirstName.length > 50) {
      setError(
        "First name must be 50 characters or fewer."
      );
      return;
    }

    if (trimmedLastName.length > 50) {
      setError(
        "Last name must be 50 characters or fewer."
      );
      return;
    }

    if (trimmedEmail.length > 254) {
      setError(
        "Email address is too long."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    /* =======================================================
       TURNSTILE VALIDATION
    ======================================================= */

    if (!turnstileToken) {
      setError(
        "Please complete the human verification before creating your account."
      );

      return;
    }

    /* =======================================================
       REGISTER
    ======================================================= */

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            first_name:
              trimmedFirstName,

            last_name:
              trimmedLastName,

            email:
              trimmedEmail,

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
            "Unable to create your account."
        );
      }

      setSuccess(
        "Your account has been created successfully. Redirecting to login..."
      );

      /* ===================================================
         REDIRECT TO LOGIN
      =================================================== */

      setTimeout(() => {
        window.location.href =
          "/account/login";
      }, 1200);

    } catch (err) {
      console.error(
        "Registration error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account. Please try again."
      );

      /* ===================================================
         RESET TURNSTILE AFTER FAILED REQUEST
      =================================================== */

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
     RENDER
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#faf8f4]">
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-md">

          {/* =================================================
              REGISTER CARD
          ================================================= */}

          <div className="rounded-3xl border border-[#eadfca] bg-white p-8 shadow-sm sm:p-10">

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="text-center">

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#C89A2A]">
                Buddhist Mala Store
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1A1A1A]">
                Create your account
              </h1>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Create an account to manage
                your orders, addresses and
                purchases.
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
                SUCCESS
            ================================================= */}

            {success && (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            {/* =================================================
                FORM
            ================================================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* =================================================
                  FIRST + LAST NAME
              ================================================= */}

              <div className="grid gap-5 sm:grid-cols-2">

                {/* FIRST NAME */}

                <div>

                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                  >
                    First Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      strokeWidth={1.8}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="firstName"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      required
                      maxLength={50}
                      value={firstName}
                      onChange={(event) =>
                        setFirstName(
                          event.target.value
                        )
                      }
                      placeholder="First name"
                      className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                    />

                  </div>

                </div>

                {/* LAST NAME */}

                <div>

                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                  >
                    Last Name
                  </label>

                  <input
                    id="lastName"
                    name="last_name"
                    type="text"
                    autoComplete="family-name"
                    required
                    maxLength={50}
                    value={lastName}
                    onChange={(event) =>
                      setLastName(
                        event.target.value
                      )
                    }
                    placeholder="Last name"
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

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                >
                  Password
                </label>

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
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(event) =>
                      setPassword(
                        event.target.value
                      )
                    }
                    placeholder="At least 8 characters"
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

                <p className="mt-2 text-xs text-gray-500">
                  Password must contain at
                  least 8 characters.
                </p>

              </div>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-[#1A1A1A]"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    strokeWidth={1.8}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    id="confirmPassword"
                    name="confirm_password"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-12 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#C89A2A]"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
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
                  TERMS
              ================================================= */}

              <p className="text-xs leading-5 text-gray-500">
                By creating an account, you
                agree to our terms and
                conditions and privacy policy.
              </p>

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
                  ? "Creating account..."
                  : "Create Account"}
              </button>

            </form>

            {/* =================================================
                LOGIN
            ================================================= */}

            <div className="mt-8 border-t border-[#f0e7d8] pt-7 text-center">

              <p className="text-sm text-gray-500">
                Already have an account?
              </p>

              <Link
                href="/account/login"
                className="mt-2 inline-block text-sm font-semibold text-[#9b7519] transition hover:text-[#C89A2A]"
              >
                Sign in to your account
              </Link>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}