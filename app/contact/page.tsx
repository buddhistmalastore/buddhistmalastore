import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactForm from "@/components/contact/ContactForm/ContactForm";
import StoreLocation from "@/components/contact/StoreLocation/StoreLocation";
import ContactTestimonials from "@/components/contact/ContactTestimonials/ContactTestimonials";
import QuickHelp from "@/components/contact/QuickHelp/QuickHelp";

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden bg-[#FBF7F0] text-[#29251F]">
      <Header />

      <ContactHero />

      {/* Contact Form */}

      <section className="bg-[#FBF7F0] px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <ContactForm />
        </div>
      </section>

      <StoreLocation />

      <ContactTestimonials />

      <QuickHelp />

      <Footer />
    </main>
  );
}