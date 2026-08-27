"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiMessageCircle } from "react-icons/fi";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const faqs = [
  {
    question: "Are your malas handmade in Nepal?",
    answer:
      "Yes. Our malas and many of our handcrafted products are made by skilled Nepalese artisans. We work to preserve traditional Himalayan craftsmanship while bringing authentic handmade products to customers around the world.",
  },
  {
    question: "Are the gemstones natural?",
    answer:
      "We aim to source authentic natural gemstones for our products. Because gemstones are natural materials, slight differences in color, pattern, texture, and size are normal and make each piece unique.",
  },
  {
    question: "How many beads are in a traditional mala?",
    answer:
      "A traditional Buddhist prayer mala commonly contains 108 beads. Some of our products may use different bead counts depending on the design, wrist size, or intended purpose. The exact bead count is listed on each product page.",
  },
  {
    question: "Can I choose the size of a bracelet or wrist mala?",
    answer:
      "Yes, selected bracelet and wrist mala products offer size options. Please check the available size options on the individual product page before placing your order.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We offer worldwide shipping on eligible orders. Shipping availability, delivery time, and charges may vary depending on the destination country.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the destination, shipping method, customs processing, and other factors. Estimated delivery information is provided during the ordering process whenever available.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes. Once your order has been processed and shipped, tracking information may be provided when available. You can also check your order information through your account.",
  },
  {
    question: "Can I return an item?",
    answer:
      "Returns may be accepted according to our return policy. Because many of our products are handmade, we recommend reviewing the Returns & Refunds page before sending an item back.",
  },
  {
    question: "Why may my product look slightly different from the picture?",
    answer:
      "Our products are handmade and many contain natural gemstones. Small differences in color, shape, texture, bead pattern, and finishing are natural characteristics and should not be considered defects.",
  },
  {
    question: "How can I contact Buddhist Mala Store?",
    answer:
      "You can contact us through our Contact page or email us at buddhistmalastore@gmail.com. We will be happy to assist you with product questions, orders, and other enquiries.",
  },
];

function FAQItem({
  question,
  answer,
  open,
  onClick,
}: {
  question: string;
  answer: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        border
        transition-all
        duration-300
        ${
          open
            ? "border-[#C89A2A]/50 bg-[#FFFCF7] shadow-md"
            : "border-[#E5DCCF] bg-white hover:border-[#C89A2A]/30"
        }
      `}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-6
          px-6
          py-5
          text-left
          sm:px-7
          sm:py-6
        "
      >
        <span
          className="
            font-body
            text-[16px]
            font-semibold
            leading-7
            text-[#27231E]
            sm:text-[17px]
          "
        >
          {question}
        </span>

        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#C89A2A]/30
            bg-[#FBF7F0]
            text-[#B88620]
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        >
          <FiChevronDown size={18} />
        </span>
      </button>

      <div
        className={`
          grid
          transition-all
          duration-300
          ${
            open
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <p
            className="
              border-t
              border-[#E8DFD2]
              px-6
              pb-6
              pt-5
              text-sm
              leading-7
              text-[#6B6257]
              sm:px-7
            "
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A]">

      <Header />

      {/* Hero */}

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
            Frequently Asked Questions
          </h1>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-[#C89A2A]/40" />

            <span
              className="
                h-2
                w-2
                rotate-45
                bg-[#C89A2A]
              "
            />

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
            Find answers to common questions about our handmade
            malas, gemstones, orders, shipping, and customer care.
          </p>

        </div>
      </section>

      {/* FAQ */}

      <section className="px-6 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl">

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === index}
                onClick={() =>
                  setOpenIndex(
                    openIndex === index
                      ? null
                      : index
                  )
                }
              />
            ))}
          </div>

          {/* Contact CTA */}

          <div
            className="
              mt-14
              overflow-hidden
              rounded-[28px]
              border
              border-[#C89A2A]/30
              bg-[#F7F0E3]
              p-8
              text-center
              sm:p-10
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
              "
            >
              Still Have Questions?
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-sm
                leading-7
                text-[#6B6257]
              "
            >
              Our team is happy to help you with products,
              orders, gemstones, or anything else you would
              like to know.
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
                px-7
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

        </div>
      </section>

      <Footer />

    </main>
  );
}