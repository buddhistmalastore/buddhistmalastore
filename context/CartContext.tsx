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
  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [isCartHydrated, setIsCartHydrated] =
    useState(false);

  const [isCartOpen, setIsCartOpen] =
    useState(false);

  /* =======================================================
     LOAD SAVED CART
  ======================================================= */

  useEffect(() => {
    try {
      const storedCart = loadCart();

      setCart(
        Array.isArray(storedCart)
          ? storedCart
          : []
      );
    } catch (error) {
      console.error(
        "Unable to load cart:",
        error
      );

      setCart([]);
    } finally {
      setIsCartHydrated(true);
    }
  }, []);

  /* =======================================================
     SAVE CART

     IMPORTANT:
     Do not save until the original cart has been loaded.
     This prevents [] from overwriting localStorage.
  ======================================================= */

  useEffect(() => {
    if (!isCartHydrated) {
      return;
    }

    try {
      saveCart(cart);
    } catch (error) {
      console.error(
        "Unable to save cart:",
        error
      );
    }
  }, [
    cart,
    isCartHydrated,
  ]);

  /* =======================================================
     CART DRAWER
  ======================================================= */

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(
      (previous) => !previous
    );
  };

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const addToCart = (
    product: Product,
    quantity = 1
  ) => {
    setIsCartOpen(true);

    setCart((previousCart) => {
      const existing =
        previousCart.find(
          (item) =>
            item.id === product.id
        );

      if (existing) {
        const newQuantity =
          existing.quantity +
          quantity;

        const maxStock =
          product.stock ??
          newQuantity;

        return previousCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    Math.min(
                      newQuantity,
                      maxStock
                    ),
                }
              : item
        );
      }

      const maxStock =
        product.stock ??
        quantity;

      return [
        ...previousCart,
        {
          ...product,
          quantity:
            Math.min(
              quantity,
              maxStock
            ),
        },
      ];
    });
  };

  /* =======================================================
     REMOVE
  ======================================================= */

  const removeFromCart = (
    id: number
  ) => {
    setCart(
      (previousCart) =>
        previousCart.filter(
          (item) =>
            item.id !== id
        )
    );
  };

  /* =======================================================
     UPDATE QUANTITY
  ======================================================= */

  const updateQuantity = (
    id: number,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(
      (previousCart) =>
        previousCart.map(
          (item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    Math.min(
                      quantity,
                      item.stock ??
                        quantity
                    ),
                }
              : item
        )
    );
  };

  /* =======================================================
     CLEAR CART
  ======================================================= */

  const clearCart = () => {
    setCart([]);
  };

  /* =======================================================
     SUMMARY
  ======================================================= */

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          item.quantity,
        0
      ),
    [cart]
  );

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          item.price *
            item.quantity,
        0
      ),
    [cart]
  );

  /* =======================================================
     HELPERS
  ======================================================= */

  const isInCart = (
    id: number
  ) =>
    cart.some(
      (item) =>
        item.id === id
    );

  const getQuantity = (
    id: number
  ) => {
    const item =
      cart.find(
        (cartItem) =>
          cartItem.id === id
      );

    return (
      item?.quantity ?? 0
    );
  };

  const getItem = (
    id: number
  ) =>
    cart.find(
      (item) =>
        item.id === id
    );

  /* =======================================================
     CONTEXT
  ======================================================= */

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

/* =========================================================
   HOOK
========================================================= */

export function useCartContext() {
  const context =
    useContext(
      CartContext
    );

  if (!context) {
    throw new Error(
      "useCartContext must be used inside CartProvider."
    );
  }

  return context;
}