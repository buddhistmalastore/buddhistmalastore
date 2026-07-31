"use client";

import WhyHeader from "./WhyHeader";
import WhyGrid from "./WhyGrid";
import WhyCTA from "./WhyCTA";

export default function WhyChoose() {
  return (
    <section className="bg-gradient-to-b from-[#050505] via-[#0B0907] to-[#050505] py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <WhyHeader />
        <WhyGrid />
        <WhyCTA />
      </div>
    </section>
  );
}