"use client";

import { instagramPosts } from "./instagramData";
import InstagramCard from "./InstagramCard";

export default function Instagram() {
  return (
    <section className="bg-[#090909] py-28">

      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">

        <div className="mx-auto mb-20 max-w-3xl text-center">

          <p className="uppercase tracking-[6px] text-[#D4AF37]">
            Follow Our Journey
          </p>

          <h2
            className="
            heading-font
            mt-5
            text-6xl
            text-[#F7F3EC]
          "
          >
            Instagram Gallery
          </h2>

          <p
            className="
            mt-8
            text-lg
            leading-9
            text-[#CFC7B8]
          "
          >
            Explore handcrafted malas, artisan stories,
            sacred gemstones and moments from our
            workshop in Nepal.
          </p>

        </div>

        <div
          className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
        >
          {instagramPosts.map((post) => (
            <InstagramCard
              key={post.id}
              image={post.image}
              href={post.href}
            />
          ))}
        </div>

      </div>

    </section>
  );
}