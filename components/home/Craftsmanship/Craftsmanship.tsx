"use client";

import CraftHeader from "./CraftHeader";
import CraftTimeline from "./CraftTimeline";
import CraftCTA from "./CraftCTA";

export default function Craftsmanship() {
  return (
    <section className="bg-[#FBF7F0] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <CraftHeader />

        <CraftTimeline />

        <CraftCTA />
      </div>
    </section>
  );
}