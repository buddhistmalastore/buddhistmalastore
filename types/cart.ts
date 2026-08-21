import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  /* Cart */
  cart: CartItem[];

  /* Actions */

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  updateQuantity: (
    id: number,
    quantity: number
  ) => void;

  clearCart: () => void;

  /* Drawer */

  isCartOpen: boolean;

  openCart: () => void;

  closeCart: () => void;

  toggleCart: () => void;

  /* Summary */

  cartCount: number;

  subtotal: number;

  /* Helpers */

  isInCart: (
    id: number
  ) => boolean;

  getQuantity: (
    id: number
  ) => number;

  getItem: (
    id: number
  ) => CartItem | undefined;
}