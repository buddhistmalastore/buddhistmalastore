"use client";

import Link from "next/link";
import {
  FiGlobe,
  FiPackage,
  FiTruck,
  FiClock,
  FiMapPin,
  FiAlertCircle,
  FiMessageCircle,
} from "react-icons/fi";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const shippingSteps = [
  {
    icon: FiPackage,
    title: "Order Processing",
    description:
      "Orders are carefully checked, packed, and prepared by our team before shipment.",
  },
  {
    icon: FiTruck,
    title: "Shipment",
    description:
      "Once your order is shipped, available tracking information will be provided.",
  },
  {
    icon: FiGlobe,
    title: "International Delivery",
    description:
      "We ship our handcrafted products from Nepal to customers around the world.",
  },
];

const shippingInfo = [
  {
    icon: FiClock,
    title: "Processing Time",
    description:
      "Most orders require time for careful preparation and packaging before dispatch. Handmade or customized products may require additional processing time.",
  },
  {
    icon: FiTruck,
    title: "Delivery Time",
    description:
      "Delivery times depend on your destination, selected shipping service, customs processing, and other circumstances. Estimated delivery information will be provided when available.",
  },
  {
    icon: FiMapPin,
    title: "Shipping Address",
    description:
      "Please make sure your shipping address, telephone number, and other delivery details are correct before completing your order.",
  },
  {
    icon: FiGlobe,
    title: "Worldwide Shipping",
    description:
      "We aim to serve customers internationally. Shipping availability and delivery options may vary depending on the destination country.",
  },
];

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A]">

      <Header />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#E8DFD2]
          bg-[#F5EFE4]
          px-6
          py-20
          sm:py-24
          lg:py-28
        "
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute
              left-1/2
              top-[-250px]
              h-[550px]
              w-[750px]
              -translate-x-1/2
              rounded-full
              bg-[#C89A2A]/[0.045]
              blur-3xl
            "
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[4px]
              text-[#B88620]
            "
          >
            Customer Support
          </p>

          <h1
            className="
              heading-font
              mt-5
              text-5xl
              font-semibold
              leading-tight
              text-[#1A1A1A]
              sm:text-6xl
              lg:text-7xl
            "
          >
            Shipping & Delivery
          </h1>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#C89A2A]/40" />

            <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

            <span className="h-px w-14 bg-[#C89A2A]/40" />
          </div>

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-base
              leading-8
              text-[#6B6257]
              sm:text-lg
            "
          >
            We carefully prepare and ship our handcrafted
            products from Nepal to customers around the world.
          </p>

        </div>
      </section>

      {/* =====================================================
          SHIPPING PROCESS
      ===================================================== */}

      <section className="px-6 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[3px]
                text-[#B88620]
              "
            >
              How It Works
            </p>

            <h2
              className="
                heading-font
                mt-4
                text-4xl
                font-semibold
                text-[#1A1A1A]
                sm:text-5xl
              "
            >
              From Our Hands to Yours
            </h2>

            <p
              className="
                mt-5
                text-base
                leading-8
                text-[#6B6257]
              "
            >
              Every order is handled with care so that your
              handcrafted treasure can safely begin its journey.
            </p>

          </div>

          <div
            className="
              grid
              gap-6
              md:grid-cols-3
            "
          >
            {shippingSteps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    rounded-[24px]
                    border
                    border-[#E5DCCF]
                    bg-white
                    p-8
                    text-center
                    shadow-[0_8px_30px_rgba(40,30,20,0.05)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#C89A2A]/40
                    hover:shadow-lg
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F7F0E3]
                      text-[#B88620]
                    "
                  >
                    <Icon size={25} />
                  </div>

                  <h3
                    className="
                      heading-font
                      mt-6
                      text-2xl
                      font-semibold
                      text-[#1A1A1A]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-7
                      text-[#6B6257]
                    "
                  >
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =====================================================
          SHIPPING DETAILS
      ===================================================== */}

      <section
        className="
          bg-[#F5EFE4]
          px-6
          py-20
          sm:py-24
          lg:py-28
        "
      >
        <div className="mx-auto max-w-5xl">

          <div className="mb-12 text-center">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[3px]
                text-[#B88620]
              "
            >
              Delivery Information
            </p>

            <h2
              className="
                heading-font
                mt-4
                text-4xl
                font-semibold
                text-[#1A1A1A]
                sm:text-5xl
              "
            >
              What You Should Know
            </h2>

          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            {shippingInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    flex
                    gap-5
                    rounded-[22px]
                    border
                    border-[#E5DCCF]
                    bg-white
                    p-7
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
                      bg-[#F7F0E3]
                      text-[#B88620]
                    "
                  >
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-[#1A1A1A]
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-7
                        text-[#6B6257]
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          CUSTOMS NOTICE
      ===================================================== */}

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">

          <div
            className="
              rounded-[28px]
              border
              border-[#C89A2A]/30
              bg-[#FFF9ED]
              p-8
              sm:p-10
            "
          >
            <div className="flex gap-5">

              <div
                className="
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#C89A2A]
                  text-white
                "
              >
                <FiAlertCircle size={22} />
              </div>

              <div>

                <h2
                  className="
                    heading-font
                    text-2xl
                    font-semibold
                    text-[#1A1A1A]
                  "
                >
                  Customs & Import Duties
                </h2>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  International orders may be subject to
                  customs duties, taxes, or other charges
                  imposed by the destination country. These
                  charges are determined by local authorities
                  and may be the responsibility of the recipient.
                </p>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section
        className="
          bg-[#F5EFE4]
          px-6
          py-20
          text-center
          sm:py-24
        "
      >
        <div className="mx-auto max-w-3xl">

          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#C89A2A]
              text-white
            "
          >
            <FiMessageCircle size={24} />
          </div>

          <h2
            className="
              heading-font
              mt-5
              text-3xl
              font-semibold
              text-[#1A1A1A]
              sm:text-4xl
            "
          >
            Need Help With Your Delivery?
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-[#6B6257]
            "
          >
            If you have questions about shipping, delivery,
            or your order, our team is happy to help.
          </p>

          <Link
            href="/contact"
            className="
              mt-7
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-[#C89A2A]
              px-8
              py-3.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#B88620]
              hover:shadow-lg
            "
          >
            Contact Us
          </Link>

        </div>
      </section>

      <Footer />

    </main>
  );
}