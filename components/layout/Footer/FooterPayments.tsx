"use client";

import Image from "next/image";

const methods = [
  "visa",
  "mastercard",
  "paypal",
  "stripe",
];

export default function FooterPayments() {
  return (
    <div className="flex justify-center">

      <div className="flex flex-wrap items-center gap-6">

        {methods.map((item) => (
          <Image
            key={item}
            src={`/icons/${item}.svg`}
            alt={item}
            width={44}
            height={28}
            className="
              opacity-80
              grayscale
              transition-all
              duration-300
              hover:opacity-100
              hover:grayscale-0
            "
          />
        ))}

      </div>

    </div>
  );
}