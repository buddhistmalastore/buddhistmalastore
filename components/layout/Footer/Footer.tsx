"use client";

import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBadges from "./FooterBadges";
import FooterPayments from "./FooterPayments";
import FooterBottom from "./FooterBottom";

import {
  shopLinks,
  supportLinks,
} from "./footerData";

export default function Footer() {
  return (
    <footer
  className="
    relative
    overflow-hidden
    bg-[#F7F3EC]
    text-[#2B251F]
    border-t
    border-[#D4AF3720]
  "
>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <section className="pt-8 pb-6">
          <FooterLogo />
        </section>

        {/* ================================================= */}
        {/* LINKS */}
        {/* ================================================= */}

        <section
          className="
            border-t
            border-[#D4AF3720]
            py-8
          "
        >
          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1fr_1fr_1fr]
              items-start
            "
          >
            <FooterLinks
              title="Shop"
              links={shopLinks}
            />

            <FooterLinks
              title="Support"
              links={supportLinks}
            />

            <FooterContact />
          </div>
        </section>

        {/* ================================================= */}
        {/* BADGES */}
        {/* ================================================= */}

        <section
          className="
            border-t
            border-[#D4AF3720]
            py-6
          "
        >
          <FooterBadges />
        </section>

        {/* ================================================= */}
        {/* PAYMENTS */}
        {/* ================================================= */}

        <section
          className="
            border-t
            border-[#D4AF3720]
            py-5
          "
        >
          <FooterPayments />
        </section>

        {/* ================================================= */}
        {/* COPYRIGHT */}
        {/* ================================================= */}

        <FooterBottom />

      </div>
    </footer>
  );
}