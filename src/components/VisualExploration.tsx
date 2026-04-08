import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getVisualExplorations } from "@/lib/visual-explorations";
import VisualExplorationGrid from "@/components/VisualExplorationGrid";

const PREVIEW_LIMIT = 6;

export default async function VisualExploration() {
  const items = await getVisualExplorations();

  if (items.length === 0) return null;

  const hasMore = items.length > PREVIEW_LIMIT;
  const preview = hasMore ? items.slice(0, PREVIEW_LIMIT) : items;

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

        <VisualExplorationGrid items={preview} />

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <Link
              href="/visual"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-gray-400 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-colors"
            >
              View All {items.length} Visuals
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
