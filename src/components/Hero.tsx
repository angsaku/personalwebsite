import { getHeroContent } from "@/lib/hero";
import HeroButtons from "@/components/HeroButtons";
import HeroFlipWordClient from "@/components/HeroFlipWordClient";
import HeroRings from "@/components/HeroRings";

export default async function Hero() {
  const hero = await getHeroContent();

  const stats = [
    { value: hero.yearsExperience, label: "Years of Experience" },
    { value: hero.projectsDelivered, label: "Projects Delivered" },
    { value: hero.happyClients, label: "Happy Clients" },
  ];

  return (
    <section className="relative lg:min-h-screen flex flex-col justify-center lg:justify-end py-32 pt-24 md:py-28 md:pt-24 lg:pb-20 lg:pt-20 px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative rings */}
      <HeroRings />

      {/* Bottom-left subtle cross accent */}
      <div className="absolute bottom-16 left-8 pointer-events-none hidden lg:block opacity-20">
        <div className="relative w-8 h-8">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#E5212E]" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E5212E]" />
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="fade-up delay-1 inline-flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#E5212E] animate-pulse" />
          <span className="text-xs text-gray-400 tracking-[0.08em] md:tracking-[0.2em] uppercase">
            Available for projects
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up delay-2 text-[2.75rem] md:text-7xl lg:text-8xl font-bold leading-[1.15] tracking-tight mb-8">
          <span className="text-white block">Crafting</span>
          <span className="block">
            <HeroFlipWordClient />
          </span>
          <span className="block">
            <span className="text-white">That Matter</span>
            <span className="text-[#E5212E]">.</span>
          </span>
        </h1>

        {/* Sub row */}
        <div className="fade-up delay-3 flex flex-col md:flex-row md:items-end justify-between gap-8 mt-2">
          <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
            {hero.shortDescription}
          </p>

          <HeroButtons />
        </div>

        {/* Stats */}
        <div className="fade-up delay-4 grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-white/[0.06]">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
