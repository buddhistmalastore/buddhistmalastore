import { NextResponse } from "next/server";

const FALLBACK_RATES = {
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

export async function GET() {
  try {
    const response = await fetch(
      "https://open.er-api.com/v6/latest/USD",
      {
        next: {
          revalidate: 86400,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Exchange rate request failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (
      data.result !== "success" ||
      !data.rates
    ) {
      throw new Error(
        "Invalid exchange rate response"
      );
    }

    return NextResponse.json({
      success: true,
      rates: {
        USD: 1,
        NPR: data.rates.NPR ?? FALLBACK_RATES.NPR,
        AUD: data.rates.AUD ?? FALLBACK_RATES.AUD,
        GBP: data.rates.GBP ?? FALLBACK_RATES.GBP,
        EUR: data.rates.EUR ?? FALLBACK_RATES.EUR,
        CAD: data.rates.CAD ?? FALLBACK_RATES.CAD,
        INR: data.rates.INR ?? FALLBACK_RATES.INR,
        JPY: data.rates.JPY ?? FALLBACK_RATES.JPY,
        CNY: data.rates.CNY ?? FALLBACK_RATES.CNY,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(
      "Currency rates API error:",
      error
    );

    return NextResponse.json({
      success: false,
      rates: FALLBACK_RATES,
      updatedAt: null,
    });
  }
}