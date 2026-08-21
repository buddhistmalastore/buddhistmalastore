"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/types/product";
import {
  CartContextType,
  CartItem,
} from "@/types/cart";

import {
  loadCart,
  saveCart,
} from "@/lib/cartStorage";

const CartContext =
  createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  /* ---------------- State ---------------- */

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* ---------------- Load Cart ---------------- */

  useEffect(() => {
    setCart(loadCart());
  }, []);

  /* ---------------- Save Cart ---------------- */

  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  /* ---------------- Drawer ---------------- */

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  /* ---------------- Add Cart ---------------- */

  const addToCart = (
    product: Product,
    quantity = 1
  ) => {
    setIsCartOpen(true);

    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      /* Existing product */

      if (existing) {
        const newQuantity =
          existing.quantity + quantity;

        const maxStock =
          product.stock ?? newQuantity;

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  newQuantity,
                  maxStock
                ),
              }
            : item
        );
      }

      /* New product */

      const maxStock =
        product.stock ?? quantity;

      return [
        ...prev,
        {
          ...product,
          quantity: Math.min(
            quantity,
            maxStock
          ),
        },
      ];
    });
  };

  /* ---------------- Remove ---------------- */

  const removeFromCart = (
    id: number
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  /* ---------------- Update Qty ---------------- */

  const updateQuantity = (
    id: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                quantity,
                item.stock ?? quantity
              ),
            }
          : item
      )
    );
  };

  /* ---------------- Clear ---------------- */

  const clearCart = () => {
    setCart([]);
  };

  /* ---------------- Summary ---------------- */

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum + item.quantity,
        0
      ),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) =>
          sum +
          item.price *
            item.quantity,
        0
      ),
    [cart]
  );

  /* ---------------- Helpers ---------------- */

  const isInCart = (
    id: number
  ) => {
    return cart.some(
      (item) => item.id === id
    );
  };

  const getQuantity = (
    id: number
  ) => {
    const item = cart.find(
      (i) => i.id === id
    );

    return item?.quantity ?? 0;
  };

  const getItem = (
    id: number
  ) => {
    return cart.find(
      (item) => item.id === id
    );
  };

  /* ---------------- Context ---------------- */

  const value: CartContextType = {
    cart,

    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    isCartOpen,
    openCart,
    closeCart,
    toggleCart,

    cartCount,
    subtotal,

    isInCart,
    getQuantity,
    getItem,
  };

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ---------------- Hook ---------------- */

export function useCartContext() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCartContext must be used inside CartProvider."
    );
  }

  return context;
}