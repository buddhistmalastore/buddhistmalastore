"use client";

import {
  FiShield,
  FiGlobe,
  FiAward,
  FiTruck,
  FiRefreshCcw,
  FiHeart,
} from "react-icons/fi";

const features = [
  {
    icon: <FiAward size={26} />,
    title: "Handmade in Nepal",
    text: "Every mala is handcrafted by skilled Nepalese artisans using traditional techniques.",
  },
  {
    icon: <FiShield size={26} />,
    title: "100% Genuine Gemstones",
    text: "Natural gemstones carefully selected for authenticity and spiritual significance.",
  },
  {
    icon: <FiTruck size={26} />,
    title: "Worldwide Shipping",
    text: "Fast, secure and trackable delivery to customers around the world.",
  },
  {
    icon: <FiRefreshCcw size={26} />,
    title: "Easy Returns",
    text: "Quick support and hassle-free returns if something isn't right.",
  },
  {
    icon: <FiGlobe size={26} />,
    title: "Fair Trade",
    text: "Supporting local artisans with ethical and sustainable craftsmanship.",
  },
  {
    icon: <FiHeart size={26} />,
    title: "Trusted by Thousands",
    text: "Loved by meditation practitioners, collectors and spiritual seekers worldwide.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="mt-24">

      <div className="text-center mb-12">

        <p className="text-[12px] uppercase tracking-[3px] font-semibold text-[#C89A2A]">
          Why Choose Us
        </p>

        <h2 className="mt-3 text-4xl font-semibold text-[#1A1A1A]">
          Why Buy From Buddhist Mala Store?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-[#777]">
          We combine authentic craftsmanship, premium gemstones and reliable worldwide service.
        </p>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {features.map((item) => (

          <div
            key={item.title}
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

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F9F3E6] text-[#C89A2A]">

              {item.icon}

            </div>

            <h3 className="mt-6 text-xl font-semibold">

              {item.title}

            </h3>

            <p className="mt-4 leading-8 text-[#666]">

              {item.text}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}