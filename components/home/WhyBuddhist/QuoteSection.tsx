export default function QuoteSection() {
  return (
    <section className="px-6 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl text-center">

        {/* Decorative Mark */}

        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-[#C89A2A]/40" />

          <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

          <span className="h-px w-16 bg-[#C89A2A]/40" />
        </div>

        {/* Quote */}

        <h2
          className="
            heading-font
            text-4xl
            font-semibold
            leading-tight
            tracking-tight
            text-[#1A1A1A]
            md:text-5xl
            lg:text-6xl
          "
        >
          Crafted in the Himalayas.
          <br />

          <span className="text-[#C89A2A]">
            Carried Across the World.
          </span>
        </h2>

        {/* Description */}

        <p
          className="
            mx-auto
            mt-8
            max-w-3xl
            text-base
            leading-8
            text-[#666666]
            md:text-lg
            md:leading-9
          "
        >
          Every handcrafted mala reflects generations of Nepalese
          craftsmanship, spiritual devotion, and authentic Himalayan heritage.
        </p>

        {/* Bottom Divider */}

        <div className="mx-auto mt-10 h-px w-24 bg-[#C89A2A]/40" />

      </div>
    </section>
  );
}