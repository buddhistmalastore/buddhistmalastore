"use client";

import {
  FiTruck,
  FiRefreshCcw,
  FiShield,
  FiGlobe,
} from "react-icons/fi";

export default function ShippingReturns() {
  return (
    <section className="mt-24">

      {/* Heading */}

      <div className="mb-12 text-center">

        <p className="text-[12px] font-semibold uppercase tracking-[3px] text-[#C89A2A]">
          Delivery & Support
        </p>

        <h2 className="mt-3 text-4xl font-semibold text-[#1A1A1A]">
          Shipping & Returns
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-[#777]">
          We carefully pack every handmade product to ensure it arrives safely
          anywhere in the world.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Worldwide Shipping */}

        <Card
          icon={<FiGlobe size={28} />}
          title="Worldwide Shipping"
          text="Fast and secure delivery to more than 120 countries using trusted courier partners."
        />

        {/* Handmade */}

        <Card
          icon={<FiShield size={28} />}
          title="100% Authentic"
          text="Every mala is handcrafted in Nepal using genuine natural gemstones and traditional craftsmanship."
        />

        {/* Shipping */}

        <Card
          icon={<FiTruck size={28} />}
          title="Dispatch Time"
          text="Orders are usually packed and shipped within 1–3 business days after payment confirmation."
        />

        {/* Returns */}

        <Card
          icon={<FiRefreshCcw size={28} />}
          title="Easy Returns"
          text="If your order arrives damaged or incorrect, contact us within 7 days for assistance."
        />

      </div>

    </section>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-[#ECE3D3]
        bg-white
        p-8
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      <div
        className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-[#F9F3E6]
          text-[#C89A2A]
        "
      >
        {icon}
      </div>

      <h3 className="mt-6 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 leading-8 text-[#666]">
        {text}
      </p>

    </div>
  );
}