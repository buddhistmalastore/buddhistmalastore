import Link from "next/link";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: [
      "When you create an account, place an order, contact us, or otherwise interact with our website, we may collect information such as your name, email address, telephone number, billing information, shipping address, and other information necessary to provide our services.",
      "You may also provide information voluntarily when you communicate with us or subscribe to communications from our store.",
    ],
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: [
      "We use customer information to process and fulfill orders, arrange delivery, provide customer support, manage accounts, respond to enquiries, and improve our products and website.",
      "We may also use information to communicate with you about orders, account activity, important service updates, or other communications necessary to provide our services.",
    ],
  },
  {
    number: "03",
    title: "Payments",
    content: [
      "Payments may be processed through third-party payment providers. Depending on the payment method selected, payment information may be handled directly by the applicable payment provider.",
      "We do not need to store your complete payment card details on our website when those details are processed by an external payment provider.",
    ],
  },
  {
    number: "04",
    title: "Protection of Your Information",
    content: [
      "We take reasonable steps to protect information provided through our website and to reduce the risk of unauthorized access, misuse, alteration, or disclosure.",
      "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    number: "05",
    title: "Cookies & Website Technologies",
    content: [
      "Our website may use cookies and similar technologies to remember preferences, maintain shopping sessions, support account functionality, improve website performance, and understand how visitors use our website.",
      "Some third-party services used by the website may also use cookies or similar technologies according to their own privacy policies.",
    ],
  },
  {
    number: "06",
    title: "Communications",
    content: [
      "If you contact us, we may retain the information you provide so that we can respond to your enquiry and maintain an appropriate record of customer support interactions.",
      "You can contact us if you wish to ask about the information associated with your interactions with Buddhist Mala Store.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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

          {/* Privacy Mark */}

          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              border
              border-[#C89A2A]/30
              bg-[#FBF7F0]
              text-2xl
              text-[#B88620]
              shadow-sm
            "
          >
            ✦
          </div>

          <p
            className="
              mt-6
              text-xs
              font-semibold
              uppercase
              tracking-[4px]
              text-[#B88620]
            "
          >
            Your Privacy Matters
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
            Privacy Policy
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
            We respect your privacy and aim to handle your
            information responsibly when you use Buddhist Mala
            Store & Handicraft Center.
          </p>

        </div>
      </section>

      {/* =====================================================
          POLICY CONTENT
      ===================================================== */}

      <section className="px-6 py-20 sm:py-24 lg:py-28">

        <div className="mx-auto max-w-5xl">

          {/* Introduction */}

          <div
            className="
              rounded-[26px]
              border
              border-[#E5DCCF]
              bg-white
              p-7
              shadow-[0_8px_30px_rgba(40,30,20,0.04)]
              sm:p-10
            "
          >
            <p
              className="
                text-sm
                leading-8
                text-[#6B6257]
              "
            >
              This Privacy Policy explains in general terms how
              Buddhist Mala Store & Handicraft Center may collect,
              use, protect, and handle information when you visit
              or use our website, purchase our products, create an
              account, or contact us.
            </p>

            <p
              className="
                mt-5
                text-sm
                leading-8
                text-[#6B6257]
              "
            >
              By using our website, you acknowledge that
              information may be processed as necessary to operate
              the online store, fulfill orders, provide services,
              and maintain website functionality.
            </p>
          </div>

          {/* Sections */}

          <div className="mt-10 space-y-6">

            {sections.map((section) => (
              <article
                key={section.number}
                className="
                  rounded-[26px]
                  border
                  border-[#E5DCCF]
                  bg-white
                  p-7
                  shadow-[0_8px_30px_rgba(40,30,20,0.04)]
                  sm:p-9
                "
              >
                <div className="flex gap-5">

                  {/* Number */}

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
                      text-sm
                      font-semibold
                      text-[#B88620]
                    "
                  >
                    {section.number}
                  </div>

                  <div className="min-w-0">

                    <h2
                      className="
                        heading-font
                        text-2xl
                        font-semibold
                        text-[#1A1A1A]
                      "
                    >
                      {section.title}
                    </h2>

                    <div className="mt-4 space-y-4">

                      {section.content.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="
                            text-sm
                            leading-7
                            text-[#6B6257]
                          "
                        >
                          {paragraph}
                        </p>
                      ))}

                    </div>

                  </div>

                </div>
              </article>
            ))}

          </div>

          {/* =================================================
              THIRD PARTY SERVICES
          ================================================= */}

          <section
            className="
              mt-10
              rounded-[26px]
              border
              border-[#C89A2A]/25
              bg-[#FFF9ED]
              p-7
              sm:p-9
            "
          >

            <h2
              className="
                heading-font
                text-2xl
                font-semibold
                text-[#1A1A1A]
              "
            >
              Third-Party Services
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-[#6B6257]
              "
            >
              Our website may use third-party services for
              functions such as payment processing, shipping,
              website hosting, analytics, communication, or other
              services required to operate the store. These
              providers may process information according to their
              own privacy policies and terms.
            </p>

          </section>

          {/* =================================================
              DATA RETENTION
          ================================================= */}

          <section
            className="
              mt-6
              rounded-[26px]
              border
              border-[#E5DCCF]
              bg-white
              p-7
              sm:p-9
            "
          >

            <h2
              className="
                heading-font
                text-2xl
                font-semibold
                text-[#1A1A1A]
              "
            >
              Retention of Information
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-[#6B6257]
              "
            >
              We may retain information for as long as reasonably
              necessary to fulfill the purposes described in this
              policy, complete transactions, provide customer
              support, maintain appropriate business records, or
              meet applicable legal and operational requirements.
            </p>

          </section>

          {/* =================================================
              POLICY UPDATES
          ================================================= */}

          <section
            className="
              mt-6
              rounded-[26px]
              border
              border-[#E5DCCF]
              bg-white
              p-7
              sm:p-9
            "
          >

            <h2
              className="
                heading-font
                text-2xl
                font-semibold
                text-[#1A1A1A]
              "
            >
              Changes to This Policy
            </h2>

            <p
              className="
                mt-4
                text-sm
                leading-7
                text-[#6B6257]
              "
            >
              We may update this Privacy Policy from time to time
              as our website, services, or legal requirements
              change. Any updated version will be published on
              this page.
            </p>

          </section>

          {/* =================================================
              CONTACT CTA
          ================================================= */}

          <section
            className="
              mt-10
              rounded-[28px]
              bg-[#F5EFE4]
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
                text-xl
                text-white
              "
            >
              ✉
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
              Questions About Your Privacy?
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
              If you have questions about how your information is
              handled, please contact our team.
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

          </section>

        </div>

      </section>

      <Footer />

    </main>
  );
}