"use client";

import StoryCard from "./StoryCard";
import QuoteSection from "./QuoteSection";
import StatsSection from "./StatsSection";
import { storyData } from "./storyData";

export default function WhyBuddhist() {
  return (
    <section className="bg-[#0D0D0D] py-32">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">

          <p
            className="
            uppercase
            tracking-[5px]
            text-[#D4AF37]
          "
          >
            The Art of Handmade Spiritual Craftsmanship
          </p>

          <h2
            className="
            heading-font
            mt-5
            text-6xl
            text-[#F7F3EC]
          "
          >
            More Than Jewelry.
            <br />
            A Living Tradition.
          </h2>

          <p
            className="
            mx-auto
            mt-8
            max-w-4xl
            text-xl
            leading-9
            text-[#D8D3CB]
          "
          >
            Every handcrafted mala carries generations of Nepalese
            craftsmanship, authentic natural gemstones, and the timeless spirit
            of Himalayan Buddhist traditions.
          </p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {storyData.map((item) => (
            <StoryCard key={item.title} {...item} />
          ))}

        </div>

        <QuoteSection />

        <StatsSection />

      </div>

    </section>
  );
}