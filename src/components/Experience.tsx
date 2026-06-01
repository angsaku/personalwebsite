import { getExperiences } from "@/lib/experience";
import ExperienceAccordion from "@/components/ExperienceItem";

export default async function Experience() {
  const experiences = await getExperiences();

  return (
    <section className="sk-section" id="experience">
      <div className="sk-section-tag sk-mono">
        <span className="num">03</span>
        <span>EXPERIENCE / EXPAND ↘</span>
        <span className="sk-line" />
        <span>← LATEST FIRST</span>
      </div>
      <ExperienceAccordion experiences={experiences} />
    </section>
  );
}
