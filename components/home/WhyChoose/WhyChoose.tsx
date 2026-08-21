"use client";

import WhyHeader from "./WhyHeader";
import WhyGrid from "./WhyGrid";
import WhyCTA from "./WhyCTA";

export default function WhyChoose() {
  return (
    <section className="bg-[#F3EBDD] py-24 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <WhyHeader />

        <WhyGrid />

        <WhyCTA />
      </div>
    </section>
  );
}