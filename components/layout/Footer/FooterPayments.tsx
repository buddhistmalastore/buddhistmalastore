"use client";

import Image from "next/image";
import { CreditCard } from "lucide-react";

const methods = [
  {
    name: "Visa",
    file: "visa.svg",
    type: "image",
  },
  {
    name: "Mastercard",
    file: "mastercard.svg",
    type: "image",
  },
  {
    name: "American Express",
    file: "american-express.svg",
    type: "image",
  },
  {
    name: "Other supported cards",
    file: null,
    type: "icon",
  },
  {
    name: "PayPal",
    file: "paypal.svg",
    type: "image",
  },
  {
    name: "Fonepay",
    file: "fonepay.svg",
    type: "image",
  },
] as const;

export default function FooterPayments() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Heading */}

      <p
        className="
          mb-4
          text-center
          text-[10px]
          font-semibold
          uppercase
          tracking-[3px]
          text-[#8A8175]
        "
      >
        Secure Payment Methods
      </p>

      {/* Payment Methods */}

      <div className="flex flex-wrap items-center justify-center gap-3">
        {methods.map((method) => (
          <div
            key={method.name}
            title={method.name}
            aria-label={method.name}
            className="
              flex
              h-11
              min-w-[68px]
              items-center
              justify-center
              rounded-lg
              border
              border-[#D8CDBB]
              bg-white
              px-3
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#C79B2A]
              hover:shadow-md
            "
          >
            {method.type === "image" && method.file ? (
              <Image
                src={`/icons/${method.file}`}
                alt={method.name}
                width={54}
                height={28}
                className="
                  h-7
                  w-auto
                  object-contain
                "
              />
            ) : (
              <div
                className="
                  flex
                  items-center
                  gap-1
                  text-[#6F685F]
                "
              >
                <CreditCard
                  size={24}
                  strokeWidth={1.7}
                />

                <span className="text-[9px] font-semibold">
                  + MORE
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Security Message */}

      <p
        className="
          mt-3
          text-center
          text-[10px]
          text-[#9A9185]
        "
      >
        Secure and encrypted checkout
      </p>
    </div>
  );
}