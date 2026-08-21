"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import {
  CurrencyCode,
  currencies,
  MASTER_CURRENCY,
} from "@/types/currency";

interface CurrencyContextType {
  currency: CurrencyCode;

  setCurrency: (currency: CurrencyCode) => void;

  convertPrice: (usdPrice: number) => number;

  formatPrice: (usdPrice: number) => string;

  currencySymbol: string;

  isLoading: boolean;
}

const CurrencyContext =
  createContext<CurrencyContextType | null>(null);

/*
|--------------------------------------------------------------------------
| Currency rates
|--------------------------------------------------------------------------
|
| IMPORTANT:
| USD is always the master currency.
|
| These are temporary fallback rates.
| Later WooCommerce/WordPress will become
| the source of truth.
|
*/

const fallbackRates: Record<CurrencyCode, number> = {
  USD: 1,
  NPR: 150,
  AUD: 1.53,
  GBP: 0.79,
  EUR: 0.92,
  CAD: 1.38,
  INR: 86,
  JPY: 149,
  CNY: 7.18,
};

/*
|--------------------------------------------------------------------------
| Country → Currency
|--------------------------------------------------------------------------
*/

const countryCurrencyMap: Record<
  string,
  CurrencyCode
> = {
  US: "USD",
  NP: "NPR",
  AU: "AUD",
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
  CA: "CAD",
  IN: "INR",
  JP: "JPY",
  CN: "CNY",
};

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

export function CurrencyProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currency, setCurrencyState] =
    useState<CurrencyCode>(MASTER_CURRENCY);

  const [rates, setRates] =
    useState<Record<CurrencyCode, number>>(
      fallbackRates
    );

  const [isLoading, setIsLoading] =
    useState(true);

  /*
  |--------------------------------------------------------------------------
  | Load saved currency
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const savedCurrency =
      localStorage.getItem(
        "buddhistmala_currency"
      ) as CurrencyCode | null;

    if (savedCurrency && currencies.some(
      (item) => item.code === savedCurrency
    )) {
      setCurrencyState(savedCurrency);
      setIsLoading(false);
      return;
    }

    detectCurrency();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Automatic country detection
  |--------------------------------------------------------------------------
  */

  const detectCurrency = async () => {
    try {
      const response = await fetch(
        "https://ipapi.co/json/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Currency detection failed"
        );
      }

      const data = await response.json();

      const detected =
        countryCurrencyMap[data.country_code] ??
        MASTER_CURRENCY;

      setCurrencyState(detected);

      localStorage.setItem(
        "buddhistmala_currency",
        detected
      );
    } catch {
      /*
      |--------------------------------------------------------------------------
      | Fallback to browser language
      |--------------------------------------------------------------------------
      */

      const language =
        navigator.language ||
        "en-US";

      const country =
        language.split("-")[1]?.toUpperCase();

      const detected =
        country
          ? countryCurrencyMap[country] ??
            MASTER_CURRENCY
          : MASTER_CURRENCY;

      setCurrencyState(detected);

      localStorage.setItem(
        "buddhistmala_currency",
        detected
      );
    } finally {
      setIsLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch exchange rates
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
  const loadRates = async () => {
    try {
      const response = await fetch(
        "/api/currency/rates",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Currency API failed: ${response.status}`
        );
      }

      const data = await response.json();

      if (
        !data ||
        !data.rates
      ) {
        throw new Error(
          "Invalid currency API response"
        );
      }

      setRates({
        USD: data.rates.USD ?? 1,

        NPR:
          data.rates.NPR ??
          fallbackRates.NPR,

        AUD:
          data.rates.AUD ??
          fallbackRates.AUD,

        GBP:
          data.rates.GBP ??
          fallbackRates.GBP,

        EUR:
          data.rates.EUR ??
          fallbackRates.EUR,

        CAD:
          data.rates.CAD ??
          fallbackRates.CAD,

        INR:
          data.rates.INR ??
          fallbackRates.INR,

        JPY:
          data.rates.JPY ??
          fallbackRates.JPY,

        CNY:
          data.rates.CNY ??
          fallbackRates.CNY,
      });
    } catch (error) {
      console.error(
        "Currency rate loading failed:",
        error
      );

      /*
       * Keep existing fallback rates.
       */
    }
  };

  loadRates();
}, []);
  /*
  |--------------------------------------------------------------------------
  | Change currency
  |--------------------------------------------------------------------------
  */

  const setCurrency = (
    newCurrency: CurrencyCode
  ) => {
    setCurrencyState(newCurrency);

    localStorage.setItem(
      "buddhistmala_currency",
      newCurrency
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Convert USD → selected currency
  |--------------------------------------------------------------------------
  */

  const convertPrice = (
    usdPrice: number
  ) => {
    const rate =
      rates[currency] ?? 1;

    return usdPrice * rate;
  };

  /*
  |--------------------------------------------------------------------------
  | Format price
  |--------------------------------------------------------------------------
  */

  const formatPrice = (
    usdPrice: number
  ) => {
    const converted =
      convertPrice(usdPrice);

    return new Intl.NumberFormat(
      undefined,
      {
        style: "currency",
        currency,
        minimumFractionDigits:
          currency === "JPY" ? 0 : 2,
        maximumFractionDigits:
          currency === "JPY" ? 0 : 2,
      }
    ).format(converted);
  };

  /*
  |--------------------------------------------------------------------------
  | Currency symbol
  |--------------------------------------------------------------------------
  */

  const currencySymbol =
    currencies.find(
      (item) =>
        item.code === currency
    )?.symbol ?? "$";

  /*
  |--------------------------------------------------------------------------
  | Context value
  |--------------------------------------------------------------------------
  */

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      convertPrice,
      formatPrice,
      currencySymbol,
      isLoading,
    }),
    [
      currency,
      rates,
      isLoading,
    ]
  );

  return (
    <CurrencyContext.Provider
      value={value}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useCurrency() {
  const context =
    useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrency must be used inside CurrencyProvider."
    );
  }

  return context;
}