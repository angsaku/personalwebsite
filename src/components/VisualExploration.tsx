import { getVisualExplorations } from "@/lib/visual-explorations";
import VisualExplorationGrid from "@/components/VisualExplorationGrid";

export default async function VisualExploration() {
  const items = await getVisualExplorations();

  if (items.length === 0) return null;

  return (
    <section id="visual" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
              Visual Exploration
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Things I&apos;ve made<span className="text-[#E5212E]">.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            A collection of visual experiments, side explorations, and creative work outside of client projects.
          </p>
        </div>

        <VisualExplorationGrid items={items} />
      </div>
    </section>
  );
}
