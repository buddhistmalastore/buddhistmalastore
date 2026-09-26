"use client";

import { useRouter } from "next/navigation";

import { Product } from "@/types/product";

import useCart from "@/hooks/useCart";

import {
  FiHeart,
  FiShoppingCart,
  FiZap,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";

interface Props {
  product: Product;
}

export default function ProductActions({
  product,
}: Props) {
  const router = useRouter();

  const {
    addToCart,
    closeCart,
  } = useCart();

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  /* =========================================================
     BUY NOW
  ========================================================= */

  const handleBuyNow = () => {
    /*
     * Add the product using the existing cart system.
     */
    addToCart(product, 1);

    /*
     * addToCart() normally opens the cart drawer.
     * Buy Now should go directly to checkout,
     * so immediately close the drawer.
     */
    closeCart();

    /*
     * Go directly to checkout.
     */
    router.push("/checkout");
  };

  return (
    <section>

      {/* =====================================================
          PURCHASE BUTTONS
      ===================================================== */}

      <div className="grid grid-cols-2 gap-3">

        {/* ADD TO CART */}

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            flex
            items-center
            justify-center
            gap-2

            rounded-lg

            border
            border-[#C79B2A]

            bg-[#C79B2A]

            py-3.5

            text-[14px]
            font-semibold

            text-white

            transition-all
            duration-300

            hover:bg-[#B68B20]

            active:scale-[0.98]
          "
        >
          <FiShoppingCart size={17} />

          Add to Cart
        </button>

        {/* BUY NOW */}

        <button
          type="button"
          onClick={handleBuyNow}
          className="
            flex
            items-center
            justify-center
            gap-2

            rounded-lg

            border
            border-[#1A1A1A]

            py-3.5

            text-[14px]
            font-semibold

            text-[#1A1A1A]

            transition-all
            duration-300

            hover:bg-[#1A1A1A]
            hover:text-white

            active:scale-[0.98]
          "
        >
          <FiZap size={17} />

          Buy Now
        </button>

      </div>

      {/* =====================================================
          WISHLIST
      ===================================================== */}

      <button
        type="button"
        className="
          mt-4

          flex
          items-center
          gap-2

          text-[13px]

          text-[#777]

          transition

          hover:text-[#C79B2A]
        "
      >
        <FiHeart />

        Add to Wishlist
      </button>

      {/* =====================================================
          QUICK CONTACT
      ===================================================== */}

      <div
        className="
          mt-7

          rounded-xl

          border
          border-[#ECE3D3]

          bg-[#FCFBF8]

          p-5
        "
      >
        <div
          className="
            mb-4

            text-[13px]
            font-semibold

            uppercase

            tracking-[2px]

            text-[#999]
          "
        >
          Need Help?
        </div>

        <div className="grid grid-cols-2 gap-3">

          {/* WHATSAPP */}

          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              gap-2

              rounded-lg

              border
              border-[#ECE3D3]

              py-3

              text-[13px]
              font-medium

              transition

              hover:border-[#25D366]
              hover:text-[#25D366]
            "
          >
            <FiMessageCircle />

            WhatsApp
          </button>

          {/* CALL */}

          <button
            type="button"
            className="
              flex
              items-center
              justify-center
              gap-2

              rounded-lg

              border
              border-[#ECE3D3]

              py-3

              text-[13px]
              font-medium

              transition

              hover:border-[#C79B2A]
              hover:text-[#C79B2A]
            "
          >
            <FiPhone />

            Call
          </button>

        </div>
      </div>

      {/* =====================================================
          TRUST BADGES
      ===================================================== */}

      <div
        className="
          mt-7

          space-y-3

          rounded-xl

          border
          border-[#ECE3D3]

          p-5
        "
      >
        <TrustRow text="100% Handmade in Nepal" />

        <TrustRow text="Natural & Genuine Gemstones" />

        <TrustRow text="Worldwide Shipping" />

        <TrustRow text="Secure Checkout" />

        <TrustRow text="Easy Returns" />
      </div>

    </section>
  );
}

/* =========================================================
   TRUST ROW
========================================================= */

function TrustRow({
  text,
}: {
  text: string;
}) {
  return (
    <div
      className="
        flex
        items-center
        gap-3

        text-[13px]

        text-[#555]
      "
    >
      <span
        className="
          h-2
          w-2

          rounded-full

          bg-[#C79B2A]
        "
      />

      {text}
    </div>
  );
}