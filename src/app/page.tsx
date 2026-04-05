export const revalidate = 3600;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import VisualExploration from "@/components/VisualExploration";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Satriya Kurniawan",
  url: "https://angsaku.vercel.app",
  jobTitle: "Product Designer",
  description: "Product Designer crafting meaningful digital experiences that bridge business goals with human needs.",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Satriya Kurniawan",
  url: "https://angsaku.vercel.app",
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <ScrollToTop />
      <Navbar />
      <Hero />

      <ScrollReveal direction="up" threshold={0.15}>
        <ClientLogos />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.08}>
        <SelectedWork />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.08}>
        <About />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.06}>
        <Services />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.06}>
        <Experience />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.06}>
        <VisualExploration />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.08}>
        <Testimonials />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.08}>
        <Blog />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.12}>
        <CTA />
      </ScrollReveal>

      <ScrollReveal direction="up" threshold={0.05}>
        <Footer />
      </ScrollReveal>
    </main>
  );
}
