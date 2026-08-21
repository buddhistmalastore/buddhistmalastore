import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import BlogHero from "@/components/blog/BlogHero/BlogHero";
import FeaturedCraftsmanship from "@/components/blog/FeaturedCraftsmanship/FeaturedCraftsmanship";
import BlogTopics from "@/components/blog/BlogTopics/BlogTopics";
import BlogInsight from "@/components/blog/BlogInsight/BlogInsight";

export default function BlogPage() {
  return (
    <main className="overflow-x-hidden bg-[#FBF7F0] text-[#29251F]">
      <Header />

      <BlogHero />

      <FeaturedCraftsmanship />

      <BlogTopics />

      <BlogInsight />

      <Footer />
    </main>
  );
}