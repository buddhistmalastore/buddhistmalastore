"use client";

import { FiMinus, FiPlus } from "react-icons/fi";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (value: number) => void;
}

export default function QuantitySelector({
  quantity,
  setQuantity,
}: QuantitySelectorProps) {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="flex items-center gap-4">

      <span className="text-sm font-semibold text-[#666]">
        Quantity
      </span>

      <div className="flex items-center overflow-hidden rounded-full border border-[#E8DFD2]">

        <button
          onClick={decrease}
          className="p-3 transition hover:bg-[#FAF8F4]"
        >
          <FiMinus />
        </button>

        <span className="min-w-[50px] text-center font-semibold">
          {quantity}
        </span>

        <button
          onClick={increase}
          className="p-3 transition hover:bg-[#FAF8F4]"
        >
          <FiPlus />
        </button>

      </div>

    </div>
  );
}