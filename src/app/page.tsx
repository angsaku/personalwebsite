export const revalidate = 0;

import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import RevealInit from "@/components/RevealInit";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import SelectedWork from "@/components/SelectedWork";
import ClientLogos from "@/components/ClientLogos";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Services from "@/components/Services";
import PhotoDump from "@/components/PhotoDump";
import Blog from "@/components/Blog";
import Templates from "@/components/Templates";
import Footer from "@/components/Footer";
import BackToTop from "@/app/work/[slug]/_components/BackToTop";

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
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Fixed overlays */}
      <GrainOverlay />
      <Cursor />
      <RevealInit />

      {/* Page sections */}
      <Hero />

      <MarqueeBar
        thick
        items={["SCROLL", "MORE", "SCROLL", "FURTHER", "AGAIN", "DEEPER"]}
      />

      <SelectedWork />
      <ClientLogos />
      <About />
      <Experience />
      <Services />
      <PhotoDump />
      <Blog />
      <Templates />
      <Footer />
      <BackToTop />
    </main>
  );
}
