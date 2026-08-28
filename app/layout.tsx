import type { Metadata } from "next";

import {
  Playfair_Display,
  Manrope,
  Noto_Sans_Devanagari,
} from "next/font/google";
import DharmaWheel from "@/components/ui/DharmaWheel";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AIChat from "@/components/chat/AIChat";

import "./globals.css";

/*
|--------------------------------------------------------------------------
| PLAYFAIR DISPLAY
|--------------------------------------------------------------------------
|
| Used for:
| - Logo
| - Hero titles
| - Section headings
| - Product titles
| - Important headings
|
*/

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/*
|--------------------------------------------------------------------------
| MANROPE
|--------------------------------------------------------------------------
|
| Used for:
| - Navigation
| - Body text
| - Buttons
| - Descriptions
| - Prices
| - Labels
|
*/

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/*
|--------------------------------------------------------------------------
| NOTO SANS DEVANAGARI
|--------------------------------------------------------------------------
|
| Kept available for future Nepali content.
| It is NOT connected to a language switcher.
|
*/

const devanagari = Noto_Sans_Devanagari({
  variable: "--font-nepali",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/*
|--------------------------------------------------------------------------
| METADATA
|--------------------------------------------------------------------------
*/

export const metadata: Metadata = {
  title: "Buddhist Mala Store & Handicraft Center",
  description:
    "Handcrafted malas, gemstone jewelry and spiritual products from Nepal.",
};

/*
|--------------------------------------------------------------------------
| ROOT LAYOUT
|--------------------------------------------------------------------------
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${playfair.variable}
          ${manrope.variable}
          ${devanagari.variable}
          antialiased
        `}
      >
        <DharmaWheel />
        <CurrencyProvider>
          <CartProvider>
            {children}
            <AIChat />
            <ScrollToTop />   
        </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}