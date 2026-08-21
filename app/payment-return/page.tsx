import { Suspense } from "react";

import PaymentReturnContent from "./PaymentReturnContent";

export default function PaymentReturnPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#FAF8F4] px-6">
          <div className="w-full max-w-xl rounded-[32px] border border-[#E8DFD2] bg-white p-10 text-center shadow-[0_20px_60px_rgba(60,45,20,0.08)]">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FCF8EF]">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#EADFCB] border-t-[#C89A2A]" />
            </div>

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[4px] text-[#C89A2A]">
              BuddhistMalaPro
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#1A1A1A]">
              Verifying Payment
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#777]">
              Please wait while we securely check your payment.
            </p>
          </div>
        </main>
      }
    >
      <PaymentReturnContent />
    </Suspense>
  );
}