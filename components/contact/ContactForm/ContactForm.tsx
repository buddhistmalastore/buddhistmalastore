"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  }

  return (
    <div className="rounded-[32px] border border-[#C89A2A]/15 bg-[#F5EEE3] p-7 shadow-[0_15px_50px_rgba(80,60,30,0.07)] md:p-10 lg:p-12">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B88620]">
          Send Us a Message
        </p>

        <h2 className="heading-font mt-3 text-3xl font-semibold text-[#1A1A1A] md:text-4xl">
          How Can We Help?
        </h2>

        <p className="mt-4 leading-7 text-[#6F685F]">
          Tell us what you need and our team will get back to you as soon as
          possible.
        </p>
      </div>

      {submitted && (
        <div className="mb-7 rounded-2xl border border-green-700/20 bg-green-50 px-5 py-4 text-sm text-green-800">
          Thank you for contacting us. Your message has been received.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name + Email */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[#403A32]"
            >
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="
                w-full
                rounded-2xl
                border
                border-[#C89A2A]/20
                bg-[#FBF7F0]
                px-5
                py-4
                text-[#29251F]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#A69D91]
                focus:border-[#B88620]
                focus:ring-2
                focus:ring-[#C89A2A]/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#403A32]"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="
                w-full
                rounded-2xl
                border
                border-[#C89A2A]/20
                bg-[#FBF7F0]
                px-5
                py-4
                text-[#29251F]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#A69D91]
                focus:border-[#B88620]
                focus:ring-2
                focus:ring-[#C89A2A]/10
              "
            />
          </div>
        </div>

        {/* Phone + Subject */}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-sm font-medium text-[#403A32]"
            >
              Phone / WhatsApp
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+977 ..."
              className="
                w-full
                rounded-2xl
                border
                border-[#C89A2A]/20
                bg-[#FBF7F0]
                px-5
                py-4
                text-[#29251F]
                outline-none
                transition-all
                duration-300
                placeholder:text-[#A69D91]
                focus:border-[#B88620]
                focus:ring-2
                focus:ring-[#C89A2A]/10
              "
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-2 block text-sm font-medium text-[#403A32]"
            >
              Subject
            </label>

            <select
              id="subject"
              name="subject"
              required
              defaultValue=""
              className="
                w-full
                rounded-2xl
                border
                border-[#C89A2A]/20
                bg-[#FBF7F0]
                px-5
                py-4
                text-[#29251F]
                outline-none
                transition-all
                duration-300
                focus:border-[#B88620]
                focus:ring-2
                focus:ring-[#C89A2A]/10
              "
            >
              <option value="" disabled>
                Select a subject
              </option>

              <option value="order">
                Order Inquiry
              </option>

              <option value="product">
                Product Question
              </option>

              <option value="custom">
                Custom Mala
              </option>

              <option value="wholesale">
                Wholesale / Bulk Order
              </option>

              <option value="international">
                International Order
              </option>

              <option value="other">
                Other
              </option>
            </select>
          </div>
        </div>

        {/* Message */}

        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-[#403A32]"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Tell us how we can help..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-[#C89A2A]/20
              bg-[#FBF7F0]
              px-5
              py-4
              text-[#29251F]
              outline-none
              transition-all
              duration-300
              placeholder:text-[#A69D91]
              focus:border-[#B88620]
              focus:ring-2
              focus:ring-[#C89A2A]/10
            "
          />
        </div>

        {/* Submit */}

        <button
          type="submit"
          className="
            group
            inline-flex
            w-full
            items-center
            justify-center
            gap-3
            rounded-full
            bg-[#C89A2A]
            px-8
            py-4
            font-semibold
            text-white
            shadow-[0_10px_30px_rgba(184,134,32,0.18)]
            transition-all
            duration-500
            hover:-translate-y-1
            hover:bg-[#B88620]
            hover:shadow-[0_15px_40px_rgba(184,134,32,0.25)]
          "
        >
          Send Message

          <Send
            size={18}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </button>

        <p className="text-center text-xs leading-5 text-[#91877A]">
          We respect your privacy and will only use your information to
          respond to your inquiry.
        </p>
      </form>
    </div>
  );
}