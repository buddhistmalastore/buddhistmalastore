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
| Available for Nepali content.
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
| GLOBAL SEO METADATA
|--------------------------------------------------------------------------
*/

export const metadata: Metadata = {
  metadataBase: new URL("https://buddhistmalastore.com"),

  title: {
    default:
      "Buddhist Mala Store | Handmade Buddhist Malas & Handicrafts",
    template: "%s | Buddhist Mala Store",
  },

  description:
    "Discover authentic handmade Buddhist malas, prayer beads, gemstone jewelry and Buddhist ritual items crafted in Nepal.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    url: "https://buddhistmalastore.com/",
    siteName: "Buddhist Mala Store",

    title:
      "Buddhist Mala Store | Handmade Buddhist Malas & Handicrafts",

    description:
      "Discover authentic handmade Buddhist malas, prayer beads, gemstone jewelry and Buddhist ritual items crafted in Nepal.",

    locale: "en_US",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Buddhist Mala Store - Handmade Buddhist Malas and Handicrafts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Buddhist Mala Store | Handmade Buddhist Malas & Handicrafts",

    description:
      "Authentic handmade Buddhist malas, prayer beads, gemstone jewelry and Buddhist ritual items from Nepal.",

    images: ["/og-image.jpg"],
  },

  applicationName: "Buddhist Mala Store",

  category: "shopping",

  icons: {
    icon: "/favicon.ico",
  },
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