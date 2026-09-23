"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiPlus,
  FiShield,
  FiTrash2,
} from "react-icons/fi";

type PaymentMethod = {
  id: number;
  gateway: string;
  type: string;
  kind: "card" | "other";
  brand?: string;
  last4?: string;
  expiry_month?: number;
  expiry_year?: number;
  display_name?: string;
  email?: string;
  is_default: boolean;
};

export default function PaymentMethodsPage() {
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<number | null>(null);

  async function loadPaymentMethods() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/account/payment-methods",
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to load payment methods."
        );
      }

      setMethods(data.methods || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load payment methods."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPaymentMethods();
  }, []);

  async function setDefault(tokenId: number) {
    try {
      setActionId(tokenId);
      setError("");

      const response = await fetch(
        "/api/account/payment-methods",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to update default payment method."
        );
      }

      await loadPaymentMethods();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update payment method."
      );
    } finally {
      setActionId(null);
    }
  }

  async function removePaymentMethod(tokenId: number) {
    const confirmed = window.confirm(
      "Are you sure you want to remove this payment method?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(tokenId);
      setError("");

      const response = await fetch(
        "/api/account/payment-methods",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tokenId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Unable to remove payment method."
        );
      }

      await loadPaymentMethods();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to remove payment method."
      );
    } finally {
      setActionId(null);
    }
  }

  function getBrandName(brand?: string) {
    if (!brand) return "Card";

    return brand.charAt(0).toUpperCase() + brand.slice(1);
  }

  function getGatewayName(method: PaymentMethod) {
    if (method.gateway === "woocommerce_payments") {
      return "WooPayments";
    }

    if (method.gateway === "ppcp-gateway") {
      return "PayPal";
    }

    return "Payment Method";
  }

  return (
    <main className="min-h-screen bg-[#f8f4ec]">
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back */}
        <Link
          href="/account"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#6f5a3a] transition hover:text-[#9b7b45]"
        >
          <FiArrowLeft />
          Back to Account
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#eadfc9] text-[#8b6b3e]">
            <FiCreditCard size={22} />
          </div>

          <h1 className="font-serif text-3xl font-semibold text-[#30291f] sm:text-4xl">
            Payment Methods
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756b5d]">
            Manage your saved payment methods securely for faster
            checkout on future orders.
          </p>
        </div>

        {/* Security notice */}
        <div className="mb-8 rounded-2xl border border-[#e6dccb] bg-white p-5 shadow-sm">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf3e9] text-[#55704d]">
              <FiShield />
            </div>

            <div>
              <h2 className="font-medium text-[#30291f]">
                Your payment information is secure
              </h2>

              <p className="mt-1 text-sm leading-6 text-[#756b5d]">
                We never store your full card number or security
                code. Saved cards are protected using secure
                payment tokens provided by our payment provider.
              </p>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-[#e6dccb] bg-white p-10 text-center">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#d8c7a9] border-t-[#8b6b3e]" />

            <p className="mt-4 text-sm text-[#756b5d]">
              Loading your payment methods...
            </p>
          </div>
        ) : methods.length === 0 ? (
          /* Empty */
          <div className="rounded-2xl border border-[#e6dccb] bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f3ede3] text-[#8b6b3e]">
              <FiCreditCard size={26} />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold text-[#30291f]">
              No saved payment methods
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756b5d]">
              When you save a payment method during checkout,
              it will appear here for convenient future purchases.
            </p>

            <Link
              href="/checkout"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#80643d] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#6e5432]"
            >
              <FiPlus />
              Continue to Checkout
            </Link>
          </div>
        ) : (
          /* Payment methods */
          <div className="space-y-4">

            {methods.map((method) => (
              <div
                key={method.id}
                className="rounded-2xl border border-[#e6dccb] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    {/* Card icon */}
                    <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-[#f1eadf] text-[#6f5938]">
                      {method.kind === "card" ? (
                        <FiCreditCard size={25} />
                      ) : (
                        <span className="text-sm font-semibold">
                          PayPal
                        </span>
                      )}
                    </div>

                    <div>
                      {method.kind === "card" ? (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-medium text-[#30291f]">
                              {getBrandName(method.brand)}{" "}
                              •••• {method.last4}
                            </h3>

                            {method.is_default && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#edf3e9] px-2.5 py-1 text-xs font-medium text-[#55704d]">
                                <FiCheck size={12} />
                                Default
                              </span>
                            )}
                          </div>

                          {method.expiry_month &&
                            method.expiry_year && (
                              <p className="mt-1 text-sm text-[#756b5d]">
                                Expires{" "}
                                {String(
                                  method.expiry_month
                                ).padStart(2, "0")}
                                /
                                {String(
                                  method.expiry_year
                                ).slice(-2)}
                              </p>
                            )}
                        </>
                      ) : (
                        <>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-medium text-[#30291f]">
                              PayPal
                            </h3>

                            {method.is_default && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#edf3e9] px-2.5 py-1 text-xs font-medium text-[#55704d]">
                                <FiCheck size={12} />
                                Default
                              </span>
                            )}
                          </div>

                          {method.email && (
                            <p className="mt-1 text-sm text-[#756b5d]">
                              {method.email}
                            </p>
                          )}
                        </>
                      )}

                      <p className="mt-1 text-xs text-[#9a8f80]">
                        {getGatewayName(method)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:shrink-0">

                    {!method.is_default && (
                      <button
                        type="button"
                        onClick={() =>
                          setDefault(method.id)
                        }
                        disabled={actionId === method.id}
                        className="rounded-full border border-[#d8c7a9] px-4 py-2 text-xs font-medium text-[#6f5938] transition hover:bg-[#f8f4ec] disabled:opacity-50"
                      >
                        {actionId === method.id
                          ? "Updating..."
                          : "Make Default"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        removePaymentMethod(method.id)
                      }
                      disabled={actionId === method.id}
                      aria-label="Remove payment method"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-red-100 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      <FiTrash2 size={15} />
                    </button>

                  </div>
                </div>
              </div>
            ))}

            {/* Add through checkout */}
            <div className="rounded-2xl border border-dashed border-[#d8c7a9] bg-[#fcfaf6] p-6 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#eadfc9] text-[#80643d]">
                <FiPlus />
              </div>

              <h3 className="mt-3 font-medium text-[#30291f]">
                Add another payment method
              </h3>

              <p className="mt-1 text-sm text-[#756b5d]">
                You can securely save a new payment method
                during checkout.
              </p>

              <Link
                href="/checkout"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#80643d] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6e5432]"
              >
                <FiPlus />
                Add Payment Method
              </Link>
            </div>
          </div>
        )}

        {/* Footer security */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#8d8273]">
          <FiLock size={13} />
          Secure tokenized payment information
        </div>

      </section>
    </main>
  );
}