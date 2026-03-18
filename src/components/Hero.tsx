import { getHeroContent } from "@/lib/hero";
import HeroButtons from "@/components/HeroButtons";

export default async function Hero() {
  const hero = await getHeroContent();

  const stats = [
    { value: hero.yearsExperience, label: "Years of Experience" },
    { value: hero.projectsDelivered, label: "Projects Delivered" },
    { value: hero.happyClients, label: "Happy Clients" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-20 px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Red accent blob */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#E5212E] rounded-full blur-[180px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#E5212E] rounded-full blur-[140px] opacity-5 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full">
        {/* Badge */}
        <div className="fade-up delay-1 inline-flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#E5212E] animate-pulse" />
          <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">
            Available for projects
          </span>
        </div>

        {/* Headline */}
        <h1 className="fade-up delay-2 text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
          <span className="text-white">Crafting</span>
          <br />
          <span className="text-white">Digital</span>{" "}
          <span
            className="italic font-light"
            style={{ WebkitTextStroke: "1px #E5212E", color: "transparent" }}
          >
            Experience
          </span>
          <br />
          <span className="text-white">That Matter</span>
          <span className="text-[#E5212E]">.</span>
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
              <p className="text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500 mt-1 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
