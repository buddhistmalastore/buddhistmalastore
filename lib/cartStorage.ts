import { CartItem } from "@/types/cart";

const KEY = "bms-cart";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveCart(
  cart: CartItem[]
) {
  localStorage.setItem(
    KEY,
    JSON.stringify(cart)
  );
}