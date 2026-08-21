"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to log in."
        );
      }

      window.location.href = "/account";
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-md">

        <div className="rounded-3xl border border-[#eadfca] bg-white p-8 shadow-sm sm:p-10">

          {/* BRAND */}

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

          {/* ERROR */}

          {error && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* EMAIL */}

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
                  required
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-4 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                />
              </div>
            </div>

            {/* PASSWORD */}

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
                  className="text-xs font-medium text-[#9b7519] hover:text-[#C89A2A]"
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-[#eadfca] bg-white py-3.5 pl-11 pr-12 text-sm text-[#1A1A1A] outline-none transition placeholder:text-gray-400 focus:border-[#C89A2A] focus:ring-2 focus:ring-[#C89A2A]/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
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

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#C89A2A] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          {/* REGISTER */}

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

        </div>
      </div>
    </main>
  );
}