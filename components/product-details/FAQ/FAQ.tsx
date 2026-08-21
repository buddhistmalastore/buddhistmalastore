"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "Is this a genuine natural gemstone?",
    answer:
      "Yes. Every gemstone used in our malas and bracelets is carefully selected and sourced from trusted suppliers. We never use plastic or synthetic imitation stones.",
  },
  {
    question: "Is every mala handmade in Nepal?",
    answer:
      "Yes. Every product is handcrafted by experienced Nepalese artisans using traditional techniques passed down through generations.",
  },
  {
    question: "How long does worldwide shipping take?",
    answer:
      "Orders are dispatched within 1–3 business days. Delivery usually takes 5–12 business days depending on your country.",
  },
  {
    question: "Can I return my order?",
    answer:
      "If your order arrives damaged or incorrect, please contact us within 7 days. We'll happily assist with a replacement or refund.",
  },
  {
    question: "How should I care for my mala?",
    answer:
      "Avoid perfumes and harsh chemicals. Store it in a dry place and gently clean it with a soft cloth. Many customers also cleanse their mala under moonlight.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="mt-24">

      <div className="mb-12 text-center">

        <p className="text-[12px] font-semibold uppercase tracking-[3px] text-[#C89A2A]">
          Questions & Answers
        </p>

        <h2 className="mt-3 text-4xl font-semibold text-[#1A1A1A]">
          Frequently Asked Questions
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-8 text-[#777]">
          Everything you need to know before purchasing our handcrafted malas.
        </p>

      </div>

      <div className="mx-auto max-w-4xl space-y-5">

        {faqs.map((faq, index) => {

          const active = open === index;

          return (
            <div
              key={index}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#ECE3D3]
                bg-white
                transition-all
                duration-300
              "
            >

              <button
                onClick={() =>
                  setOpen(active ? -1 : index)
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  px-7
                  py-6
                  text-left
                "
              >

                <span className="text-lg font-semibold text-[#1A1A1A]">
                  {faq.question}
                </span>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#F9F3E6]
                    text-[#C89A2A]
                  "
                >
                  {active ? (
                    <FiMinus />
                  ) : (
                    <FiPlus />
                  )}
                </div>

              </button>

              <div
                className={`
                  overflow-hidden
                  transition-all
                  duration-300

                  ${
                    active
                      ? "max-h-[300px]"
                      : "max-h-0"
                  }
                `}
              >

                <div className="border-t border-[#F1ECE4] px-7 py-6 leading-8 text-[#666]">
                  {faq.answer}
                </div>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}