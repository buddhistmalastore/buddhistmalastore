"use client";

import {
  FaHandsHelping,
  FaGlobeAsia,
  FaLock,
} from "react-icons/fa";

const badges = [
  {
    icon: FaHandsHelping,
    title: "Handmade in Nepal",
  },
  {
    icon: FaGlobeAsia,
    title: "Worldwide Shipping",
  },
  {
    icon: FaLock,
    title: "Secure Payments",
  },
];

export default function FooterBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4">

      {badges.map((badge) => {
        const Icon = badge.icon;

        return (
          <div
            key={badge.title}
            className="
              group
              flex
              items-center
              gap-3
              rounded-full
              border
              border-[#D4AF3730]
              bg-[#FCFAF6]
              px-5
              py-2.5
              transition-all
              duration-300
              hover:border-[#D4AF37]
              hover:shadow-md
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-[#D4AF37]
                text-white
              "
            >
              <Icon size={13} />
            </div>

            <span
              className="
                text-sm
                font-medium
                text-[#3B352F]
              "
            >
              {badge.title}
            </span>

          </div>
        );
      })}

    </div>
  );
}