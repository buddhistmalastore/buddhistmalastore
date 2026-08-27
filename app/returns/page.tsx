"use client";

import Link from "next/link";
import {
  FiCheckCircle,
  FiXCircle,
  FiPackage,
  FiRefreshCw,
  FiAlertCircle,
  FiMessageCircle,
} from "react-icons/fi";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const eligibleItems = [
  "The item is unused and in its original condition.",
  "The item is returned with its original packaging when applicable.",
  "The return request is submitted within the applicable return period.",
  "The product received is damaged, incorrect, or significantly different from what was ordered.",
];

const nonReturnableItems = [
  "Items that have been used, worn, altered, or damaged after delivery.",
  "Products damaged because of improper handling or storage.",
  "Customized or specially made products where applicable.",
  "Items returned without prior approval from our support team.",
];

const returnSteps = [
  {
    icon: FiMessageCircle,
    title: "Contact Us",
    description:
      "Contact our support team with your order number and a brief explanation of the return request.",
  },
  {
    icon: FiPackage,
    title: "Return Approval",
    description:
      "Our team will review your request and provide return instructions when the item qualifies.",
  },
  {
    icon: FiRefreshCw,
    title: "Send the Item",
    description:
      "Carefully package the product and send it according to the return instructions provided by our team.",
  },
  {
    icon: FiCheckCircle,
    title: "Inspection & Resolution",
    description:
      "After receiving and inspecting the item, we will process the applicable refund, replacement, or other resolution.",
  },
];

export default function ReturnsPage() {
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
            Returns & Refunds
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
            We want you to feel confident when purchasing our
            handcrafted malas, gemstones, and Himalayan treasures.
          </p>

        </div>
      </section>

      {/* =====================================================
          IMPORTANT NOTICE
      ===================================================== */}

      <section className="px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl">

          <div
            className="
              rounded-[28px]
              border
              border-[#C89A2A]/30
              bg-[#FFF9ED]
              p-7
              sm:p-9
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
                  Please Contact Us Before Returning an Item
                </h2>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  Please do not send a product back without
                  contacting us first. Our team will review your
                  request and provide the appropriate return
                  instructions.
                </p>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =====================================================
          RETURN PROCESS
      ===================================================== */}

      <section className="px-6 pb-20 sm:pb-24 lg:pb-28">
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
              Simple Process
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
              How Returns Work
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            {returnSteps.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="
                    rounded-[24px]
                    border
                    border-[#E5DCCF]
                    bg-white
                    p-7
                    text-center
                    shadow-[0_8px_30px_rgba(40,30,20,0.05)]
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
                    <Icon size={24} />
                  </div>

                  <h3
                    className="
                      heading-font
                      mt-5
                      text-xl
                      font-semibold
                      text-[#1A1A1A]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3
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
          ELIGIBILITY
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
              Return Eligibility
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
              When Can an Item Be Returned?
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Eligible */}

            <div
              className="
                rounded-[26px]
                border
                border-green-700/15
                bg-white
                p-8
              "
            >
              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-green-50
                    text-green-600
                  "
                >
                  <FiCheckCircle size={22} />
                </div>

                <h3
                  className="
                    heading-font
                    text-2xl
                    font-semibold
                    text-[#1A1A1A]
                  "
                >
                  Generally Eligible
                </h3>

              </div>

              <ul className="mt-7 space-y-4">

                {eligibleItems.map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      gap-3
                      text-sm
                      leading-7
                      text-[#6B6257]
                    "
                  >
                    <FiCheckCircle
                      className="
                        mt-1
                        shrink-0
                        text-green-600
                      "
                    />

                    <span>{item}</span>
                  </li>
                ))}

              </ul>
            </div>

            {/* Not eligible */}

            <div
              className="
                rounded-[26px]
                border
                border-red-700/10
                bg-white
                p-8
              "
            >
              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-red-50
                    text-red-500
                  "
                >
                  <FiXCircle size={22} />
                </div>

                <h3
                  className="
                    heading-font
                    text-2xl
                    font-semibold
                    text-[#1A1A1A]
                  "
                >
                  Generally Not Eligible
                </h3>

              </div>

              <ul className="mt-7 space-y-4">

                {nonReturnableItems.map((item) => (
                  <li
                    key={item}
                    className="
                      flex
                      gap-3
                      text-sm
                      leading-7
                      text-[#6B6257]
                    "
                  >
                    <FiXCircle
                      className="
                        mt-1
                        shrink-0
                        text-red-500
                      "
                    />

                    <span>{item}</span>
                  </li>
                ))}

              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          HANDMADE PRODUCTS
      ===================================================== */}

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">

          <div
            className="
              rounded-[28px]
              border
              border-[#E5DCCF]
              bg-white
              p-8
              shadow-[0_10px_35px_rgba(40,30,20,0.05)]
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
                  bg-[#F7F0E3]
                  text-[#B88620]
                "
              >
                <FiPackage size={22} />
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
                  Handmade & Natural Products
                </h2>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  Many of our products are handmade and contain
                  natural gemstones, wood, seeds, or other natural
                  materials. Small variations in color, shape,
                  texture, size, and pattern are natural and may
                  differ slightly from product photographs.
                </p>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-[#6B6257]
                  "
                >
                  These natural variations are part of the
                  character and uniqueness of handcrafted products
                  and are not normally considered defects.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          REFUNDS
      ===================================================== */}

      <section
        className="
          bg-[#F5EFE4]
          px-6
          py-20
          sm:py-24
        "
      >
        <div className="mx-auto max-w-4xl text-center">

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[3px]
              text-[#B88620]
            "
          >
            Refunds
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
            Refund Processing
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-sm
              leading-8
              text-[#6B6257]
            "
          >
            Once an approved return has been received and
            inspected, we will determine the appropriate
            resolution. If a refund is approved, it will normally
            be processed through the original payment method
            where possible. The time required for the funds to
            appear may depend on the payment provider or bank.
          </p>

        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ===================================================== */}

      <section className="px-6 py-20 text-center sm:py-24">

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
            Need Help With a Return?
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
            Contact our team before sending an item back.
            Please include your order number and explain how
            we can assist you.
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