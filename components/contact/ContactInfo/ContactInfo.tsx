"use client";

import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Our Store",
    value: "Kathmandu, Nepal",
    description: "Come and explore our handcrafted collection.",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+977 9860958156",
    description: "We're happy to help with your questions.",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "info@buddhistmalastore.com",
    description: "Send us your questions anytime.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat With Us",
    description: "Quick assistance for orders and inquiries.",
  },
];

export default function ContactInfo() {
  return (
    <div className="flex flex-col justify-center">
      <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B88620]">
        Contact Information
      </p>

      <h2 className="heading-font mt-4 text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
        Let's Connect
      </h2>

      <p className="mt-6 max-w-lg leading-8 text-[#6F685F]">
        Have a question about our malas, gemstones, Buddhist ritual items, or
        an international order? Reach out to our team and we'll be happy to
        assist you.
      </p>

      <div className="mt-10 space-y-5">
        {contactDetails.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                group
                flex
                items-start
                gap-5
                rounded-2xl
                border
                border-[#C89A2A]/15
                bg-[#F7F0E5]
                p-5
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[#C89A2A]/40
                hover:shadow-[0_12px_35px_rgba(80,60,30,0.08)]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#C89A2A]/25
                  bg-[#FBF7F0]
                  text-[#B88620]
                  transition-all
                  duration-500
                  group-hover:bg-[#C89A2A]
                  group-hover:text-white
                "
              >
                <Icon size={20} strokeWidth={1.6} />
              </div>

              <div>
                <h3 className="font-semibold text-[#29251F]">
                  {item.title}
                </h3>

                <p className="mt-1 font-medium text-[#B88620]">
                  {item.value}
                </p>

                <p className="mt-1 text-sm leading-6 text-[#7B746A]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Opening Hours */}

      <div className="mt-7 flex items-center gap-4 rounded-2xl border border-[#C89A2A]/15 bg-[#F7F0E5] p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C89A2A]/25 bg-[#FBF7F0] text-[#B88620]">
          <Clock3 size={20} strokeWidth={1.6} />
        </div>

        <div>
          <h3 className="font-semibold text-[#29251F]">
            Opening Hours
          </h3>

          <p className="mt-1 text-sm text-[#6F685F]">
            Monday – Saturday · 9:00 AM – 6:00 PM
          </p>

          <p className="mt-1 text-xs text-[#9A8D7A]">
            Nepal Time (NPT)
          </p>
        </div>
      </div>
    </div>
  );
}