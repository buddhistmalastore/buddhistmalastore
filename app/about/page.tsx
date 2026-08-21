import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import AboutHero from "@/components/about/AboutHero/AboutHero";
import OurStory from "@/components/about/OurStory/OurStory";

import WhyChoose from "@/components/home/WhyChoose/WhyChoose";
import FacebookCommunity from "@/components/home/Facebook/Facebook";
import Testimonials from "@/components/home/Testimonials/Testimonials";
import Newsletter from "@/components/home/Newsletter/Newsletter";

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden bg-[#FBF7F0] text-[#29251F]">
      <Header />

      <AboutHero />

      <OurStory />

      <WhyChoose />

      <FacebookCommunity />

      <Testimonials />

      <Newsletter />

      <Footer />
    </main>
  );
}