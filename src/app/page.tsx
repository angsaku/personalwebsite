import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientLogos from "@/components/ClientLogos";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="relative">
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
        <Experience />
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
