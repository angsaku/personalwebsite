import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getSelectedWork } from "@/lib/selected-work";
import ScrollReveal from "@/components/ScrollReveal";

export default async function SelectedWork() {
  const allProjects = await getSelectedWork();
  const projects = allProjects.slice(0, 5);
  const hasMore = allProjects.length > 5;

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Projects I&apos;m proud of
              <span className="text-[#E5212E]">.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            A curated selection of design projects spanning mobile, web, and
            enterprise products.
          </p>
        </div>

        {/* Project list */}
        <ScrollReveal direction="up" stagger threshold={0.05}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 py-10 border-t border-white/[0.06] hover:border-[#E5212E]/30 transition-colors"
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
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 mx-auto mb-2 flex items-center justify-center">
                        <span className="text-[#E5212E] text-lg font-bold">
                          {project.number}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">Project Thumbnail</p>
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
                    <span
                      key={tag}
                      className="text-xs text-gray-500 border border-white/[0.08] px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="md:col-span-1 flex items-start justify-end">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#E5212E] group-hover:bg-[#E5212E] transition-all">
                  <ArrowUpRight
                    size={14}
                    className="text-gray-500 group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </ScrollReveal>

        {/* View All CTA */}
        {hasMore && (
          <div className="border-t border-white/[0.06] pt-10 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Showing 5 of {allProjects.length} projects
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#E5212E]/40 text-[#E5212E] text-sm font-medium rounded-full hover:bg-[#E5212E] hover:text-white hover:border-[#E5212E] transition-all duration-300"
            >
              View All Projects
              <ArrowUpRight size={15} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
