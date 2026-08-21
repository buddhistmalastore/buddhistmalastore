"use client";

import { ExternalLink, MapPin } from "lucide-react";

export default function StoreLocation() {
  return (
    <section className="bg-[#F3EBDD] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}

        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#B88620]">
            Visit Us
          </p>

          <h2 className="heading-font mt-4 text-4xl font-semibold text-[#1A1A1A] md:text-5xl">
            Find Our Store
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#6F685F]">
            Visit Buddhist Mala Store &amp; Handicrafts Center and explore our
            collection of handcrafted malas, gemstones, Buddhist ritual items,
            and sacred Himalayan treasures.
          </p>
        </div>

        {/* Location Card */}

        <div className="grid overflow-hidden rounded-[32px] border border-[#C89A2A]/15 bg-[#FBF7F0] shadow-[0_15px_50px_rgba(80,60,30,0.07)] lg:grid-cols-[1fr_0.75fr]">
          {/* Map Area */}

          <div className="relative min-h-[420px] overflow-hidden bg-[#E9E0D2]">
            {/* Decorative Map Background */}

            <div className="absolute inset-0 opacity-50">
              <div className="absolute left-[15%] top-[20%] h-32 w-32 rounded-full border border-[#C89A2A]/20" />

              <div className="absolute right-[15%] top-[15%] h-48 w-48 rounded-full border border-dashed border-[#C89A2A]/15" />

              <div className="absolute bottom-[15%] left-[30%] h-40 w-40 rounded-full border border-[#C89A2A]/20" />

              <div className="absolute left-0 top-1/2 h-px w-full rotate-12 bg-[#C89A2A]/10" />

              <div className="absolute left-0 top-1/2 h-px w-full -rotate-12 bg-[#C89A2A]/10" />
            </div>

            {/* Location Marker */}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C89A2A]/30 bg-[#FBF7F0] text-[#B88620] shadow-[0_15px_40px_rgba(80,60,30,0.12)]">
                  <MapPin size={34} strokeWidth={1.4} />
                </div>

                <p className="mt-5 text-sm font-semibold uppercase tracking-[2px] text-[#6F685F]">
                  Buddhist Mala Store
                </p>

                <p className="mt-2 text-xs text-[#91877A]">
                  Kageshwori Manohara, Nepal
                </p>
              </div>
            </div>

            {/* Decorative Corner */}

            <div className="absolute bottom-6 left-6 h-12 w-12 border-b border-l border-[#C89A2A]/30" />

            <div className="absolute right-6 top-6 h-12 w-12 border-r border-t border-[#C89A2A]/30" />
          </div>

          {/* Store Information */}

          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[3px] text-[#B88620]">
              Our Store
            </p>

            <h3 className="heading-font mt-4 text-3xl font-semibold leading-tight text-[#1A1A1A] md:text-4xl">
              Buddhist Mala Store &amp; Handicrafts Center
            </h3>

            {/* Decorative Divider */}

            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-12 bg-[#C89A2A]/40" />

              <span className="h-2 w-2 rotate-45 bg-[#C89A2A]" />

              <span className="h-px w-12 bg-[#C89A2A]/40" />
            </div>

            {/* Address */}

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-[#9A8D7A]">
                Address
              </p>

              <p className="mt-3 leading-7 text-[#5F584F]">
                Buddhist Mala Store &amp; Handicrafts Center
                <br />
                Near Rastriya Banijya Bank
                <br />
                Kageshwori Manohara, 44602
                <br />
                Kathmandu, Nepal
              </p>
            </div>

            {/* Opening Hours */}

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-[#9A8D7A]">
                Opening Hours
              </p>

              <p className="mt-3 leading-7 text-[#5F584F]">
                Monday – Saturday
                <br />
                9:00 AM – 6:00 PM
              </p>

              <p className="mt-1 text-xs text-[#9A8D7A]">
                Nepal Time (NPT)
              </p>
            </div>

            {/* Google Maps Button */}

            <a
              href="https://www.google.com/maps/search/?api=1&query=Buddhist+Mala+Store+%26+Handicrafts+Center%2C+Kageshwori+Manohara%2C+44602%2C+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                mt-9
                inline-flex
                w-fit
                items-center
                gap-3
                rounded-full
                border
                border-[#C89A2A]/30
                px-6
                py-3.5
                text-sm
                font-semibold
                text-[#B88620]
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[#B88620]
                hover:bg-[#C89A2A]
                hover:text-white
                hover:shadow-[0_10px_30px_rgba(184,134,32,0.18)]
              "
            >
              Open in Google Maps

              <ExternalLink
                size={16}
                className="
                  transition-transform
                  duration-500
                  group-hover:translate-x-1
                  group-hover:-translate-y-0.5
                "
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}