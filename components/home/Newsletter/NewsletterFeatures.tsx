"use client";

import {
  FaGem,
  FaBookOpen,
  FaGift,
  FaBell,
} from "react-icons/fa";

const features = [
  {
    icon: FaGem,
    text: "Exclusive Gemstone Guides",
  },
  {
    icon: FaBookOpen,
    text: "Meditation Wisdom",
  },
  {
    icon: FaGift,
    text: "Members-only Offers",
  },
  {
    icon: FaBell,
    text: "Early Product Launches",
  },
];

export default function NewsletterFeatures() {
  return (
    <div className="mt-16 flex flex-wrap justify-center gap-10">

      {features.map((item) => (
        <div
          key={item.text}
          className="flex items-center gap-3 text-[#F7F3EC]"
        >
          <item.icon className="text-[#D4AF37]" />

          <span>{item.text}</span>
        </div>
      ))}

    </div>
  );
}