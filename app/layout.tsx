import type { Metadata } from "next";

import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Buddhist Mala Store & Handicraft Center",
  description:
    "Handcrafted malas, gemstone jewelry and spiritual products from Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CurrencyProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}