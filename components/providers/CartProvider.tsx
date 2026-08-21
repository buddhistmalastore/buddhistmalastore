"use client";

import { ReactNode } from "react";
import { CartProvider as Provider } from "@/context/CartContext";

interface Props {
  children: ReactNode;
}

export default function CartProvider({
  children,
}: Props) {
  return (
    <Provider>
      {children}
    </Provider>
  );
}