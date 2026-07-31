"use client";

import NewsletterHeader from "./NewsletterHeader";
import NewsletterForm from "./NewsletterForm";
import NewsletterFeatures from "./NewsletterFeatures";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-36">

      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0d0904] to-[#050505]" />

      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-20 top-32 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute right-20 bottom-24 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">

        <NewsletterHeader />

        <NewsletterFeatures />

        <NewsletterForm />

      </div>

    </section>
  );
}