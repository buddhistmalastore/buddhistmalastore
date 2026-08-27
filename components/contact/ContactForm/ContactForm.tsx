"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setIsSending(true);
    setSubmitted(false);
    setError("");

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const data = {
      name:
        String(
          formData.get("name") || ""
        ).trim(),

      email:
        String(
          formData.get("email") || ""
        ).trim(),

      phone:
        String(
          formData.get("phone") || ""
        ).trim(),

      subject:
        String(
          formData.get("subject") || ""
        ).trim(),

      message:
        String(
          formData.get("message") || ""
        ).trim(),
    };

    try {
      const response =
        await fetch(
          "/api/contact",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(data),
          }
        );

      const result =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "Unable to send your message."
        );
      }

      /*
       * Success
       */

      setSubmitted(true);

      form.reset();

      /*
       * Remove success message
       * after 7 seconds.
       */

      window.setTimeout(() => {
        setSubmitted(false);
      }, 7000);

    } catch (err) {
      console.error(
        "Contact form error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );

    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="rounded-[32px] border border-[#C89A2A]/15 bg-[#F5EEE3] p-7 shadow-[0_15px_50px_rgba(80,60,30,0.07)] md:p-10 lg:p-12">

      {/* =====================================================
          HEADER
      ===================================================== */}

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


      {/* =====================================================
          SUCCESS MESSAGE
      ===================================================== */}

      {submitted && (
        <div
          className="
            mb-7
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-green-700/20
            bg-green-50
            px-5
            py-4
            text-sm
            text-green-800
          "
        >

          <CheckCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>

            <p className="font-semibold">
              Message sent successfully.
            </p>

            <p className="mt-1 text-green-700">
              Thank you for contacting Buddhist Mala Store.
              Our team will get back to you as soon as possible.
            </p>

          </div>

        </div>
      )}


      {/* =====================================================
          ERROR MESSAGE
      ===================================================== */}

      {error && (
        <div
          className="
            mb-7
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-700/20
            bg-red-50
            px-5
            py-4
            text-sm
            text-red-800
          "
        >

          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div>

            <p className="font-semibold">
              Message could not be sent.
            </p>

            <p className="mt-1 text-red-700">
              {error}
            </p>

          </div>

        </div>
      )}


      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ===================================================
            NAME + EMAIL
        =================================================== */}

        <div className="grid gap-6 md:grid-cols-2">

          {/* Name */}

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
              maxLength={150}
              autoComplete="name"
              placeholder="Your name"
              disabled={isSending}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

          </div>


          {/* Email */}

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
              maxLength={254}
              autoComplete="email"
              placeholder="you@example.com"
              disabled={isSending}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

          </div>

        </div>


        {/* ===================================================
            PHONE + SUBJECT
        =================================================== */}

        <div className="grid gap-6 md:grid-cols-2">

          {/* Phone */}

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
              maxLength={50}
              autoComplete="tel"
              placeholder="+977 ..."
              disabled={isSending}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            />

          </div>


          {/* Subject */}

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
              disabled={isSending}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              <option
                value=""
                disabled
              >
                Select a subject
              </option>

              <option value="Order Inquiry">
                Order Inquiry
              </option>

              <option value="Product Question">
                Product Question
              </option>

              <option value="Custom Mala">
                Custom Mala
              </option>

              <option value="Wholesale / Bulk Order">
                Wholesale / Bulk Order
              </option>

              <option value="International Order">
                International Order
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>

        </div>


        {/* ===================================================
            MESSAGE
        =================================================== */}

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
            maxLength={5000}
            rows={6}
            placeholder="Tell us how we can help..."
            disabled={isSending}
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
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

        </div>


        {/* ===================================================
            SUBMIT BUTTON
        =================================================== */}

        <button
          type="submit"
          disabled={isSending}
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
            disabled:cursor-not-allowed
            disabled:opacity-70
            disabled:hover:translate-y-0
          "
        >

          {isSending ? (
            <>
              <span
                className="
                  h-5
                  w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-white/40
                  border-t-white
                "
              />

              Sending Message...
            </>
          ) : (
            <>
              Send Message

              <Send
                size={18}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                "
              />
            </>
          )}

        </button>


        {/* ===================================================
            PRIVACY
        =================================================== */}

        <p className="text-center text-xs leading-5 text-[#91877A]">
          We respect your privacy and will only use your information to
          respond to your inquiry.
        </p>

      </form>

    </div>
  );
}