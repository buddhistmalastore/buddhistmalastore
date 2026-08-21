"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiAward,
  FiGlobe,
} from "react-icons/fi";
import { GiPrayerBeads } from "react-icons/gi";

export default function ShopHero() {
  return (
    <section className="relative overflow-hidden rounded-[40px] shadow-xl">

      {/* Background */}

      <div className="relative h-[620px] w-full">

        <Image
          src="/images/shop/shop-hero.jpg"
          alt="Buddhist Mala Collection"
          fill
          priority
          className="object-cover object-center scale-105"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-[#111111]/55 to-[#111111]/20" />

        {/* Decorative Glow */}

        <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#C79B2A]/20 blur-[130px]" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#C79B2A]/10 blur-[120px]" />
      </div>

      {/* Content */}

      <div className="absolute inset-0 flex items-center">

        <div className="mx-auto w-full max-w-[1500px] px-8 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="max-w-3xl"
          >

            <span className="inline-flex rounded-full border border-[#C79B2A]/40 bg-[#C79B2A]/10 px-5 py-2 text-sm uppercase tracking-[4px] text-[#E9D29B] backdrop-blur">
              Since 2005
            </span>

            <h1 className="heading-font mt-8 text-6xl leading-tight text-white lg:text-7xl">

              Sacred

              <span className="block text-[#D6AE4A]">
                Handcrafted Collection
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-white/85">

              Explore authentic Buddhist malas,
              bracelets, gemstones, and ritual objects
              handcrafted by skilled Nepalese artisans
              using centuries-old Himalayan traditions.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                href="#products"
                className="inline-flex items-center gap-3 rounded-full bg-[#C79B2A] px-8 py-4 text-lg font-semibold text-[#1A1A1A] transition hover:scale-105 hover:bg-[#D6AE4A]"
              >
                Explore Collection

                <FiArrowRight />
              </Link>

              <Link
                href="/about"
                className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-lg text-white backdrop-blur transition hover:bg-white hover:text-[#1A1A1A]"
              >
                Our Story
              </Link>

            </div>

            {/* Trust */}

            <div className="mt-16 flex flex-wrap gap-10">

              <Trust
                icon={<GiPrayerBeads />}
                title="100% Handmade"
              />

              <Trust
                icon={<FiAward />}
                title="Natural Gemstones"
              />

              <Trust
                icon={<FiGlobe />}
                title="Worldwide Shipping"
              />

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}

function Trust({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl text-[#D6AE4A] backdrop-blur-md">

        {icon}

      </div>

      <div>

        <h4 className="font-semibold text-white">

          {title}

        </h4>

      </div>

    </div>
  );
}