import Header from "@/components/home/Header/Header";
import Hero from "@/components/home/Hero/Hero";
import FeaturedCollections from "@/components/home/Collections/FeaturedCollections";
import WhyBuddhist from "@/components/home/WhyBuddhist/WhyBuddhist";
import BestSellers from "@/components/home/BestSellers/BestSellers";
import Gemstones from "@/components/home/Gemstones/Gemstones";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import FacebookCommunity from "@/components/home/Facebook/Facebook";
import Purpose from "@/components/home/Purpose/Purpose";
import WhyChoose from "@/components/home/WhyChoose/WhyChoose";
import Newsletter from "@/components/home/Newsletter/Newsletter";
import Footer from "@/components/layout/Footer/Footer";
import Craftsmanship from "@/components/home/Craftsmanship/Craftsmanship";
export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-[#0B0B0B] text-white">
      <Header />
      <Hero />
      <FeaturedCollections />
      <WhyBuddhist />
      <BestSellers />
      <Purpose />
      <Gemstones />
      <Testimonials />
      <FacebookCommunity />
      <Craftsmanship />
      <WhyChoose />
      <Newsletter />
      <Footer />
    </main>
  );
}