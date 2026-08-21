"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type PaymentStatus =
  | "checking"
  | "success"
  | "failed"
  | "pending"
  | "unknown";

export default function PaymentReturnContent() {
  const searchParams = useSearchParams();

  const [status, setStatus] =
    useState<PaymentStatus>("checking");

  const [message, setMessage] =
    useState("Verifying your payment...");

  const [orderNumber, setOrderNumber] =
    useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] =
    useState<string | null>(null);

  useEffect(() => {
    const sessionId =
      searchParams.get("session_id");

    const paymentId =
      searchParams.get("payment_id");

    const returnedStatus =
      searchParams.get("status");

    const order =
      searchParams.get("order");

    const provider =
      searchParams.get("provider");

    if (order) {
      setOrderNumber(order);
    }

    if (provider) {
      setPaymentMethod(
        formatPaymentMethod(provider)
      );
    }

    /* =====================================================
       BASIC VALIDATION
    ===================================================== */

    if (
      !sessionId &&
      !paymentId &&
      !order
    ) {
      setStatus("unknown");

      setMessage(
        "We could not find the payment information required to verify this transaction."
      );

      return;
    }

    /* =====================================================
       PAYMENT RESULT
    ===================================================== */

    if (
      returnedStatus === "success" ||
      returnedStatus === "paid"
    ) {
      setStatus("success");

      setMessage(
        "Your payment has been received. Your order is now being confirmed."
      );

      return;
    }

    if (
      returnedStatus === "failed" ||
      returnedStatus === "cancelled"
    ) {
      setStatus("failed");

      setMessage(
        "Your payment was not completed. No successful payment has been confirmed."
      );

      return;
    }

    if (
      returnedStatus === "pending"
    ) {
      setStatus("pending");

      setMessage(
        "Your payment is still being verified. Please do not make another payment."
      );

      return;
    }

    /* =====================================================
       NO EXPLICIT STATUS
    ===================================================== */

    setStatus("pending");

    setMessage(
      "Your payment is being verified. Please wait while we confirm your order."
    );
  }, [searchParams]);

  /* =======================================================
     CHECKING
  ======================================================= */

  if (status === "checking") {
    return (
      <PageShell>
        <div className="w-full max-w-xl rounded-[32px] border border-[#E8DFD2] bg-white p-8 text-center shadow-[0_20px_60px_rgba(60,45,20,0.08)] md:p-12">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FCF8EF]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#EADFCB] border-t-[#C89A2A]" />
          </div>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
            BuddhistMalaPro
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
            Verifying Payment
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777]">
            Please wait while we securely check your payment.
          </p>

          <div className="mx-auto mt-8 h-1 w-32 overflow-hidden rounded-full bg-[#F1E8D7]">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-[#C89A2A]" />
          </div>
        </div>
      </PageShell>
    );
  }

  /* =======================================================
     SUCCESS
  ======================================================= */

  if (status === "success") {
    return (
      <PageShell>
        <div className="w-full max-w-2xl overflow-hidden rounded-[32px] border border-[#E8DFD2] bg-white shadow-[0_25px_80px_rgba(60,45,20,0.10)]">

          <div className="h-2 bg-[#C89A2A]" />

          <div className="p-8 text-center md:p-12">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#EAF6EC]">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#DDF1E0] text-3xl font-bold text-[#2E7D32]">
                ✓
              </div>
            </div>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
              Payment Successful
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
              Thank You!
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#777]">
              {message}
            </p>

            {orderNumber && (
              <div className="mt-8 rounded-2xl border border-[#E8DFD2] bg-[#FAF8F4] p-6">

                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#999]">
                  Your Order
                </p>

                <p className="mt-2 text-2xl font-bold text-[#1A1A1A]">
                  #{orderNumber}
                </p>

                {paymentMethod && (
                  <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#666]">
                    <span>
                      Payment:
                    </span>

                    <span className="font-semibold text-[#1A1A1A]">
                      {paymentMethod}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 rounded-2xl border border-[#E8DFD2] bg-white p-5 text-left">

              <div className="flex gap-3">

                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCF8EF] text-[#C89A2A]">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#222]">
                    Payment received
                  </p>

                  <p className="mt-1 text-xs leading-6 text-[#888]">
                    Your payment has been received and your order is being processed.
                  </p>
                </div>

              </div>

              <div className="mt-4 border-t border-[#EEE6D9] pt-4">

                <div className="flex gap-3">

                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FCF8EF] text-[#C89A2A]">
                    →
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#222]">
                      What happens next?
                    </p>

                    <p className="mt-1 text-xs leading-6 text-[#888]">
                      Our team will process your order and contact you if any additional information is required.
                    </p>
                  </div>

                </div>

              </div>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#C89A2A]"
              >
                Continue Shopping
              </Link>

              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full border border-[#DDD4C5] bg-white px-8 py-4 text-sm font-semibold text-[#333] transition hover:border-[#C89A2A] hover:text-[#C89A2A]"
              >
                Browse Shop
              </Link>

            </div>

          </div>
        </div>
      </PageShell>
    );
  }

  /* =======================================================
     FAILED
  ======================================================= */

  if (status === "failed") {
    return (
      <PageShell>

        <div className="w-full max-w-xl rounded-[32px] border border-[#E8DFD2] bg-white p-8 text-center shadow-[0_25px_80px_rgba(60,45,20,0.10)] md:p-12">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FDECEC]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F9DCDC] text-3xl font-bold text-[#C62828]">
              ×
            </div>
          </div>

          <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
            Payment Status
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
            Payment Not Completed
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777]">
            {message}
          </p>

          {orderNumber && (
            <div className="mt-8 rounded-2xl bg-[#FAF8F4] p-6">

              <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#999]">
                Order Number
              </p>

              <p className="mt-2 text-2xl font-bold text-[#1A1A1A]">
                #{orderNumber}
              </p>

            </div>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-full bg-[#C89A2A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#A9821D]"
            >
              Try Payment Again
            </Link>

            <Link
              href="/cart"
              className="inline-flex items-center justify-center rounded-full border border-[#DDD4C5] px-8 py-4 text-sm font-semibold text-[#333] transition hover:border-[#C89A2A] hover:text-[#C89A2A]"
            >
              Return to Cart
            </Link>

          </div>

        </div>

      </PageShell>
    );
  }

  /* =======================================================
     PENDING / UNKNOWN
  ======================================================= */

  return (
    <PageShell>

      <div className="w-full max-w-xl rounded-[32px] border border-[#E8DFD2] bg-white p-8 text-center shadow-[0_25px_80px_rgba(60,45,20,0.10)] md:p-12">

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FCF8EF]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F4EAD7] text-2xl text-[#C89A2A]">
            …
          </div>
        </div>

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
          Payment Verification
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#1A1A1A] md:text-4xl">
          Payment Being Verified
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777]">
          {message}
        </p>

        {orderNumber && (
          <div className="mt-8 rounded-2xl border border-[#E8DFD2] bg-[#FAF8F4] p-6">

            <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#999]">
              Order Number
            </p>

            <p className="mt-2 text-2xl font-bold text-[#1A1A1A]">
              #{orderNumber}
            </p>

            {paymentMethod && (
              <p className="mt-2 text-sm text-[#777]">
                Payment:{" "}
                <span className="font-semibold text-[#222]">
                  {paymentMethod}
                </span>
              </p>
            )}

          </div>
        )}

        <div className="mt-6 rounded-2xl bg-[#FAF8F4] p-5 text-sm leading-6 text-[#777]">
          Please do not submit another payment while this transaction is being verified.
        </div>

        <div className="mt-8">

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#1A1A1A] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#C89A2A]"
          >
            Back to Home
          </Link>

        </div>

      </div>

    </PageShell>
  );
}

/* =========================================================
   PAGE SHELL
========================================================= */

function PageShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FAF8F4] px-6 py-10 md:py-16">

      <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#C89A2A]/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#C89A2A]/5 blur-3xl" />

      <div className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center">
        {children}
      </div>

    </main>
  );
}

/* =========================================================
   PAYMENT METHOD FORMATTER
========================================================= */

function formatPaymentMethod(
  provider: string
) {
  switch (provider.toLowerCase()) {
    case "fonepay":
      return "Fonepay";

    case "paypal":
      return "PayPal";

    case "card":
      return "Card";

    case "woopayments":
      return "Card";

    default:
      return provider;
  }
}