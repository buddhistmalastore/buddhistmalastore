"use client";

import CraftHeader from "./CraftHeader";
import CraftTimeline from "./CraftTimeline";
import CraftCTA from "./CraftCTA";

export default function Craftsmanship() {
  return (
    <section className="bg-[#050505] py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <CraftHeader />

        <CraftTimeline />

        <CraftCTA />

      </div>
    </section>
  );
}