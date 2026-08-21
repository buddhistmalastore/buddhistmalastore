"use client";

import Link from "next/link";
import { FooterLink } from "./types";

interface FooterLinksProps {
  title: string;
  links: FooterLink[];
}

export default function FooterLinks({
  title,
  links,
}: FooterLinksProps) {
  return (
    <div className="text-center lg:text-left">

      {/* Heading */}

      <h3
        className="
          heading-font
          text-[24px] lg:text-[26px]
          text-[#1F1A17]
        "
      >
        {title}
      </h3>

      {/* Gold Line */}

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

      {/* Links */}

      <ul className="space-y-3">

        {links.map((link) => (
          <li key={link.title}>

            <Link
              href={link.href}
              className="
                group
                inline-flex
                items-center
                text-[15px]
                font-medium
                text-[#3B352F]
                transition-all
                duration-300
                hover:text-[#D4AF37]
              "
            >
              <span
                className="
                  mr-0
                  w-0
                  overflow-hidden
                  text-[#D4AF37]
                  transition-all
                  duration-300
                  group-hover:mr-2
                  group-hover:w-3
                "
              >
                →
              </span>

              {link.title}

            </Link>

          </li>
        ))}

      </ul>

    </div>
  );
}