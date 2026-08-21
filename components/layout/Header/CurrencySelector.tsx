"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiCheck } from "react-icons/fi";

import {
  currencies,
  CurrencyCode,
} from "@/types/currency";

import { useCurrency } from "@/context/CurrencyContext";

export default function CurrencySelector() {
  const {
    currency,
    setCurrency,
  } = useCurrency();

  const [open, setOpen] = useState(false);

  const selectorRef =
    useRef<HTMLDivElement>(null);

  /*
  |--------------------------------------------------------------------------
  | Close when clicking outside
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Current currency
  |--------------------------------------------------------------------------
  */

  const currentCurrency =
    currencies.find(
      (item) =>
        item.code === currency
    );

  /*
  |--------------------------------------------------------------------------
  | Change currency
  |--------------------------------------------------------------------------
  */

  const handleCurrencyChange = (
    code: CurrencyCode
  ) => {
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div
      ref={selectorRef}
      className="relative hidden md:block"
    >
      {/* Selector Button */}

      <button
        type="button"
        onClick={() =>
          setOpen((prev) => !prev)
        }
        aria-label="Select currency"
        aria-expanded={open}
        className="
          group
          flex
          items-center
          gap-2
          rounded-full
          border
          border-[#E8DFD2]
          bg-white/80
          px-4
          py-2.5
          text-sm
          font-semibold
          text-[#333]
          shadow-sm
          backdrop-blur
          transition-all
          duration-300
          hover:border-[#C89A2A]
          hover:text-[#C89A2A]
          hover:shadow-md
        "
      >
        <span className="text-base">
          {currentCurrency?.flag}
        </span>

        <span>
          {currentCurrency?.code}
        </span>

        <FiChevronDown
          size={15}
          className={`
            transition-transform
            duration-300
            ${
              open
                ? "rotate-180"
                : ""
            }
          `}
        />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+14px)]
            z-[100]
            w-[270px]
            overflow-hidden
            rounded-2xl
            border
            border-[#E8DFD2]
            bg-white
            shadow-2xl
            animate-in
            fade-in
            slide-in-from-top-2
            duration-200
          "
        >
          {/* Header */}

          <div
            className="
              border-b
              border-[#EEE7DC]
              px-5
              py-4
            "
          >
            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[3px]
                text-[#C89A2A]
              "
            >
              Currency
            </p>

            <p
              className="
                mt-1
                text-sm
                font-semibold
                text-[#222]
              "
            >
              Choose your currency
            </p>
          </div>

          {/* Currency List */}

          <div
            className="
              max-h-[420px]
              overflow-y-auto
              p-2
            "
          >
            {currencies.map(
              (item) => {
                const selected =
                  item.code ===
                  currency;

                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() =>
                      handleCurrencyChange(
                        item.code
                      )
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-xl
                      px-3
                      py-3
                      text-left
                      transition-all
                      duration-200

                      ${
                        selected
                          ? "bg-[#FBF5E8]"
                          : "hover:bg-[#FAF8F4]"
                      }
                    `}
                  >
                    {/* Flag */}

                    <span
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#F7F3EC]
                        text-lg
                      "
                    >
                      {item.flag}
                    </span>

                    {/* Name */}

                    <span
                      className="
                        flex-1
                        min-w-0
                      "
                    >
                      <span
                        className={`
                          block
                          text-sm
                          font-semibold

                          ${
                            selected
                              ? "text-[#C89A2A]"
                              : "text-[#222]"
                          }
                        `}
                      >
                        {item.code}
                      </span>

                      <span
                        className="
                          block
                          truncate
                          text-xs
                          text-[#888]
                        "
                      >
                        {item.name}
                      </span>
                    </span>

                    {/* Symbol */}

                    <span
                      className="
                        text-xs
                        font-medium
                        text-[#999]
                      "
                    >
                      {item.symbol}
                    </span>

                    {/* Check */}

                    {selected && (
                      <FiCheck
                        size={17}
                        className="
                          text-[#C89A2A]
                        "
                      />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}