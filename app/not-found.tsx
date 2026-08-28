import Link from "next/link";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import BackButton from "@/components/ui/BackButton";

import {
  FiHome,
  FiShoppingBag,
} from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          404 CONTENT
      ===================================================== */}

      <main
        className="
          relative
          flex
          min-h-[calc(100vh-96px)]
          items-center
          justify-center
          overflow-hidden
          px-6
          py-20
        "
      >
        {/* =================================================
            DECORATIVE BACKGROUND
        ================================================= */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#C79B2A]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[360px]
            w-[360px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#C79B2A]/10
          "
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            relative
            z-10
            mx-auto
            max-w-2xl
            text-center
          "
        >
          {/* =================================================
              LABEL
          ================================================= */}

          <p
            className="
              mb-4
              text-xs
              font-semibold
              uppercase
              tracking-[5px]
              text-[#C79B2A]
            "
          >
            The path continues
          </p>

          {/* =================================================
              404
          ================================================= */}

          <h1
            className="
              heading-font
              text-[110px]
              font-semibold
              leading-none
              tracking-[-6px]
              text-[#C79B2A]
              sm:text-[150px]
              lg:text-[190px]
            "
          >
            404
          </h1>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              mx-auto
              my-7
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span
              className="
                h-px
                w-12
                bg-[#C79B2A]/30
              "
            />

            <span className="text-xl text-[#C79B2A]">
              ✦
            </span>

            <span
              className="
                h-px
                w-12
                bg-[#C79B2A]/30
              "
            />
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <h2
            className="
              heading-font
              text-3xl
              font-medium
              text-[#29251F]
              sm:text-4xl
            "
          >
            This page has wandered off the path.
          </h2>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p
            className="
              mx-auto
              mt-5
              max-w-lg
              text-sm
              leading-7
              text-[#6B6257]
              sm:text-base
            "
          >
            The page you are looking for may have moved,
            been removed, or the address may be incorrect.
            Let us guide you back to Buddhist Mala Store.
          </p>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            {/* =================================================
                HOME
            ================================================= */}

            <Link
              href="/"
              className="
                inline-flex
                min-w-[170px]
                items-center
                justify-center
                gap-2
                rounded-full
                bg-[#C79B2A]
                px-6
                py-3.5
                text-sm
                font-semibold
                text-white
                shadow-[0_10px_30px_rgba(199,155,42,0.18)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#B88620]
                hover:shadow-[0_15px_35px_rgba(199,155,42,0.25)]
              "
            >
              <FiHome size={17} />

              Back to Home
            </Link>

            {/* =================================================
                SHOP
            ================================================= */}

            <Link
              href="/shop"
              className="
                inline-flex
                min-w-[170px]
                items-center
                justify-center
                gap-2
                rounded-full
                border
                border-[#D8CDBD]
                bg-white
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#403A32]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#C79B2A]
                hover:text-[#A87918]
                hover:shadow-md
              "
            >
              <FiShoppingBag size={17} />

              Explore Shop
            </Link>
          </div>

          {/* =================================================
              BACK BUTTON
          ================================================= */}

          <BackButton />
        </div>
      </main>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer />
    </div>
  );
}