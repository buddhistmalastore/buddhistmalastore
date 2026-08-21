"use client";

import { useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);

  return (
    <div>

      <p className="mb-4 font-medium">
        Quantity
      </p>

      <div
        className="
          flex
          w-[180px]
          items-center
          justify-between
          rounded-full
          border
          border-[#E8DFD2]
          bg-white
          px-4
          py-3
        "
      >
        <button
          onClick={() =>
            setQty(Math.max(1, qty - 1))
          }
        >
          <FiMinus />
        </button>

        <span className="text-lg font-semibold">
          {qty}
        </span>

        <button
          onClick={() =>
            setQty(qty + 1)
          }
        >
          <FiPlus />
        </button>

      </div>

    </div>
  );
}