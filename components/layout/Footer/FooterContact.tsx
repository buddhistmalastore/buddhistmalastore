"use client";

import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

import { footerInfo } from "./footerData";

export default function FooterContact() {
  return (
    <div className="text-center lg:text-left">

      <h3
        className="
          heading-font
          text-[28px]
          text-[#1F1A17]
        "
      >
        Contact
      </h3>

      <div
        className="
          mx-auto
          lg:mx-0
          mt-2
          mb-5
          h-[2px]
          w-12
          bg-[#D4AF37]
        "
      />

      <div className="space-y-4">

        {/* Address */}

        <div className="flex items-start justify-center gap-3 lg:justify-start">

          <FaMapMarkerAlt
            className="
              mt-1
              text-[#D4AF37]
              shrink-0
            "
          />

          <p
            className="
              text-[15px]
              leading-6
              text-[#3B352F]
            "
          >
            {footerInfo.address}
          </p>

        </div>

        {/* Email */}

        <div className="flex items-center justify-center gap-3 lg:justify-start">

          <FaEnvelope className="text-[#D4AF37]" />

          <a
            href={`mailto:${footerInfo.email}`}
            className="
              text-[15px]
              text-[#3B352F]
              transition
              hover:text-[#D4AF37]
            "
          >
            {footerInfo.email}
          </a>

        </div>

        {/* Phone */}

        <div className="flex items-center justify-center gap-3 lg:justify-start">

          <FaPhoneAlt className="text-[#D4AF37]" />

          <a
            href={`tel:${footerInfo.phone}`}
            className="
              text-[15px]
              text-[#3B352F]
              transition
              hover:text-[#D4AF37]
            "
          >
            {footerInfo.phone}
          </a>

        </div>

      </div>

    </div>
  );
}