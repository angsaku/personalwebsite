import { getExperiences } from "@/lib/experience";
import ScrollReveal from "@/components/ScrollReveal";

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
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-white/[0.06] hover:border-[#E5212E]/20 transition-colors"
            >
              {/* Period */}
              <div className="md:col-span-3">
                <p className="text-xs text-gray-600 font-mono">{exp.period}</p>
                <p className="text-xs text-gray-700 mt-1">{exp.location}</p>
              </div>

              {/* Content */}
              <div className="md:col-span-9 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#E5212E] transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#E5212E]/70 mt-0.5">
                    {exp.company}
                  </p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-600 border border-white/[0.06] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
