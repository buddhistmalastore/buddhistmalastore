"use client";

import { useState } from "react";
import {
  ChevronDown,
  Gem,
  Globe2,
  Package,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "You can browse our collections, select the product you like, and place your order directly through our online store. If you need help choosing a mala or gemstone, you can also contact our team before ordering.",
    icon: Package,
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. We serve customers internationally. Shipping availability, delivery time, and shipping charges depend on the destination country. Our team can help you with international shipping information before you place your order.",
    icon: Globe2,
  },
  {
    question: "Can I request a custom mala?",
    answer:
      "Yes. We can discuss custom malas based on gemstone, bead size, bead count, purpose, color preference, and other requirements. Contact us with your ideas and our team will help you create a suitable piece.",
    icon: Sparkles,
  },
  {
    question: "Are your gemstones natural?",
    answer:
      "We offer natural gemstones and carefully select materials for our handcrafted products. Product descriptions will provide the available gemstone and material information for each item.",
    icon: Gem,
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location and the shipping method selected. Nepal orders generally have shorter delivery times, while international orders may require additional transit and customs processing time.",
    icon: Package,
  },
  {
    question: "Can you help me choose a gemstone or mala?",
    answer:
      "Absolutely. If you are choosing a mala for meditation, prayer, protection, prosperity, love, healing, or gifting, tell us your intention and we can help you explore suitable options.",
    icon: Gem,
  },
];

export default function QuickHelp() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFaq(index: number) {
    setOpenIndex((current) => (current === index ? null : index));
  }

  return (
    <section className="bg-[#F3EBDD] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B88620]">
            Quick Help
          </p>

          <h2 className="heading-font mt-4 text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-6 leading-8 text-[#6F685F]">
            Find quick answers about orders, shipping, custom malas,
            gemstones, and shopping with Buddhist Mala Store.
          </p>
        </div>

        {/* FAQ */}

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`
                  overflow-hidden
                  rounded-[22px]
                  border
                  bg-[#FBF7F0]
                  transition-all
                  duration-500
                  ${
                    isOpen
                      ? "border-[#C89A2A]/40 shadow-[0_12px_35px_rgba(80,60,30,0.07)]"
                      : "border-[#C89A2A]/15 hover:border-[#C89A2A]/30"
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 px-6 py-6 text-left md:px-7"
                >
                  {/* Icon */}

                  <span
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-500
                      ${
                        isOpen
                          ? "border-[#C89A2A] bg-[#C89A2A] text-white"
                          : "border-[#C89A2A]/20 bg-[#F5EEE3] text-[#B88620]"
                      }
                    `}
                  >
                    <Icon size={19} strokeWidth={1.5} />
                  </span>

                  {/* Question */}

                  <span className="flex-1 pr-4 font-semibold text-[#29251F] md:text-lg">
                    {faq.question}
                  </span>

                  {/* Chevron */}

                  <ChevronDown
                    size={21}
                    className={`
                      shrink-0
                      text-[#B88620]
                      transition-transform
                      duration-500
                      ${isOpen ? "rotate-180" : ""}
                    `}
                  />
                </button>

                {/* Answer */}

                <div
                  className={`
                    grid
                    transition-[grid-template-rows,opacity]
                    duration-500
                    ease-in-out
                    ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-[#C89A2A]/10 px-6 pb-7 pt-5 md:pl-[88px] md:pr-12">
                      <p className="leading-8 text-[#6F685F]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Need Help */}

        <div className="mt-14 rounded-[28px] border border-[#C89A2A]/20 bg-[#F5EEE3] p-8 text-center md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[3px] text-[#B88620]">
            Still Need Help?
          </p>

          <h3 className="heading-font mt-3 text-3xl font-semibold text-[#1A1A1A]">
            We're Here for You
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#6F685F]">
            Can't find the answer you're looking for? Send us a message and
            our team will be happy to assist you.
          </p>

          <a
            href="#contact-form"
            className="
              mt-7
              inline-flex
              items-center
              rounded-full
              bg-[#C89A2A]
              px-7
              py-3.5
              font-semibold
              text-white
              transition-all
              duration-500
              hover:-translate-y-1
              hover:bg-[#B88620]
              hover:shadow-[0_12px_30px_rgba(184,134,32,0.22)]
            "
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}