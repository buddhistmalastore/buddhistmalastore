import Header from "@/components/layout/Header/Header";

import Hero from "@/components/home/Hero/Hero";
import FeaturedCollections from "@/components/home/Collections/FeaturedCollections";
import WhyBuddhist from "@/components/home/WhyBuddhist/WhyBuddhist";
import BestSellers from "@/components/home/BestSellers/BestSellers";
import Purpose from "@/components/home/Purpose/Purpose";
import Gemstones from "@/components/home/Gemstones/Gemstones";
import Footer from "@/components/layout/Footer/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF8F4] text-[#1A1A1A]">

      {/* Header */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Why Buddhist Mala */}
      <WhyBuddhist />

      {/* Best Sellers */}
      <BestSellers />

      {/* Shop by Purpose */}
      <Purpose />

      {/* Gemstones */}
      <Gemstones />

      {/* Footer */}
      <Footer />

    </main>
  );
}