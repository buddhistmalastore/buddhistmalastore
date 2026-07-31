"use client";

import CountUp from "react-countup";

export default function StatsSection() {
  return (
    <section className="pb-24">

      <div
        className="
        mx-auto
        grid
        max-w-7xl
        grid-cols-2
        gap-10
        md:grid-cols-4
      "
      >

        <div className="text-center">

          <h2 className="text-6xl font-bold text-[#D4AF37]">
            <CountUp end={30} duration={3} />+
          </h2>

          <p className="mt-4 text-[#D8D3CB]">
            Years of Craftsmanship
          </p>

        </div>

        <div className="text-center">

          <h2 className="text-6xl font-bold text-[#D4AF37]">
            <CountUp end={5000} duration={3} separator="," />+
          </h2>

          <p className="mt-4 text-[#D8D3CB]">
            Happy Customers
          </p>

        </div>

        <div className="text-center">

          <h2 className="text-6xl font-bold text-[#D4AF37]">
            100%
          </h2>

          <p className="mt-4 text-[#D8D3CB]">
            Handcrafted
          </p>

        </div>

        <div className="text-center">

          <h2 className="text-6xl font-bold text-[#D4AF37]">
            50+
          </h2>

          <p className="mt-4 text-[#D8D3CB]">
            Countries Served
          </p>

        </div>

      </div>

    </section>
  );
}