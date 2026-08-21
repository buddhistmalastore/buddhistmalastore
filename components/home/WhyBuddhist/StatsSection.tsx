"use client";

import CountUp from "react-countup";

export default function StatsSection() {
  return (
    <section className="px-6 py-16 lg:py-20">
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-2
          gap-6
          md:grid-cols-4
          md:gap-8
        "
      >
        {/* Years of Craftsmanship */}

        <div
          className="
            rounded-2xl
            border
            border-[#E8DFD2]
            bg-white/70
            px-5
            py-8
            text-center
            shadow-sm
            backdrop-blur-sm
          "
        >
          <h2 className="text-4xl font-bold text-[#C89A2A] md:text-5xl lg:text-6xl">
            <CountUp end={30} duration={3} />+
          </h2>

          <p className="mt-4 text-sm font-medium text-[#666666] md:text-base">
            Years of Craftsmanship
          </p>
        </div>

        {/* Happy Customers */}

        <div
          className="
            rounded-2xl
            border
            border-[#E8DFD2]
            bg-white/70
            px-5
            py-8
            text-center
            shadow-sm
            backdrop-blur-sm
          "
        >
          <h2 className="text-4xl font-bold text-[#C89A2A] md:text-5xl lg:text-6xl">
            <CountUp
              end={5000}
              duration={3}
              separator=","
            />
            +
          </h2>

          <p className="mt-4 text-sm font-medium text-[#666666] md:text-base">
            Happy Customers
          </p>
        </div>

        {/* Handcrafted */}

        <div
          className="
            rounded-2xl
            border
            border-[#E8DFD2]
            bg-white/70
            px-5
            py-8
            text-center
            shadow-sm
            backdrop-blur-sm
          "
        >
          <h2 className="text-4xl font-bold text-[#C89A2A] md:text-5xl lg:text-6xl">
            100%
          </h2>

          <p className="mt-4 text-sm font-medium text-[#666666] md:text-base">
            Handcrafted
          </p>
        </div>

        {/* Countries Served */}

        <div
          className="
            rounded-2xl
            border
            border-[#E8DFD2]
            bg-white/70
            px-5
            py-8
            text-center
            shadow-sm
            backdrop-blur-sm
          "
        >
          <h2 className="text-4xl font-bold text-[#C89A2A] md:text-5xl lg:text-6xl">
            50+
          </h2>

          <p className="mt-4 text-sm font-medium text-[#666666] md:text-base">
            Countries Served
          </p>
        </div>
      </div>
    </section>
  );
}