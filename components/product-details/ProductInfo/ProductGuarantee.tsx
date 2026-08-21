"use client";

import {
  HiOutlineGlobeAlt,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import {
  GiPrayerBeads,
  GiDiamondHard,
} from "react-icons/gi";

export default function ProductGuarantee() {
  const items = [
    {
      icon: <GiPrayerBeads size={22} />,
      title: "Handmade",
      subtitle: "in Nepal",
    },
    {
      icon: <GiDiamondHard size={20} />,
      title: "100%",
      subtitle: "Genuine",
    },
    {
      icon: <HiOutlineGlobeAlt size={22} />,
      title: "Worldwide",
      subtitle: "Shipping",
    },
    {
      icon: <HiOutlineShieldCheck size={22} />,
      title: "Secure",
      subtitle: "Checkout",
    },
  ];

  return (
    <section className="rounded-2xl border border-[#E8DDCC] bg-[#FCFBF8] shadow-sm">

      <div className="grid grid-cols-4">

        {items.map((item, index) => (

          <div
            key={index}
            className={`
              flex
              items-center
              justify-center
              gap-3
              px-4
              py-4
              transition-all
              duration-300
              hover:bg-[#FFF9ED]

              ${
                index !== items.length - 1
                  ? "border-r border-[#ECE3D3]"
                  : ""
              }
            `}
          >

            <div className="text-[#C89A2A]">
              {item.icon}
            </div>

            <div>

              <div className="text-[13px] font-semibold text-[#222] leading-4">
                {item.title}
              </div>

              <div className="text-[12px] text-[#777]">
                {item.subtitle}
              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}