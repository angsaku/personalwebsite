import { getExperiences } from "@/lib/experience";
import ScrollReveal from "@/components/ScrollReveal";
import ExperienceItem from "@/components/ExperienceItem";

export default async function Experience() {
  const experiences = await getExperiences();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
            Work Experience
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Where I&apos;ve worked<span className="text-[#E5212E]">.</span>
          </h2>
        </div>

        <ScrollReveal direction="up" stagger threshold={0.05} as="div">
          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.id} exp={exp} defaultOpen={i === 0} />
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
