"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, X } from "lucide-react";
import type { Project } from "@/lib/selected-work";
import SkillTag from "@/components/SkillTag";

export default function WorkList({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const allCategories = useMemo(() => {
    const cats = projects.map((p) => p.category).filter(Boolean);
    return Array.from(new Set(cats));
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !activeCategory || p.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [projects, query, activeCategory]);

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, category, or tag..."
          className="w-full bg-[#0a1128] border border-white/[0.08] rounded-full pl-11 pr-10 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/40 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category filters */}
      {allCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActiveCategory(null)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
              !activeCategory
                ? "bg-[#E5212E] border-[#E5212E] text-white"
                : "border-white/[0.08] text-gray-500 hover:border-white/20 hover:text-gray-300"
            }`}
          >
            All
          </button>
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`text-xs px-4 py-1.5 rounded-full border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#E5212E] border-[#E5212E] text-white"
                  : "border-white/[0.08] text-gray-500 hover:border-white/20 hover:text-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-600 mb-8">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"} found
      </p>

      {/* List */}
      {filtered.length > 0 ? (
        <div className="divide-y divide-white/[0.06]">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 py-10 hover:border-[#E5212E]/30 transition-colors first:border-t border-white/[0.06]"
            >
              {/* Number */}
              <div className="md:col-span-1 text-xs text-gray-600 font-mono mt-1">
                {project.number}
              </div>

              {/* Thumbnail */}
              <div className="md:col-span-3 aspect-video rounded-lg bg-[#0a1128] border border-white/[0.06] group-hover:border-[#E5212E]/20 transition-colors overflow-hidden">
                {project.thumbnailUrl ? (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 mx-auto flex items-center justify-center">
                      <span className="text-[#E5212E] text-lg font-bold">{project.number}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="md:col-span-7 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-600 tracking-wide mb-2">
                    {project.category} · {project.year}
                  </p>
                  <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-[#E5212E] transition-colors mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <SkillTag key={tag} label={tag} className="px-3 py-1 text-xs" />
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex items-start justify-end">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E5212E] group-hover:bg-[#E5212E] transition-all">
                  <ArrowUpRight size={14} className="text-gray-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <div className="w-14 h-14 rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 mx-auto mb-4 flex items-center justify-center">
            <Search size={20} className="text-[#E5212E]" />
          </div>
          <p className="text-white font-medium mb-1">No projects found</p>
          <p className="text-gray-600 text-sm">Try a different keyword or category.</p>
        </div>
      )}
    </div>
  );
}
