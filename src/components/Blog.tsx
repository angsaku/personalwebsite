import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getSelectedWork } from "@/lib/selected-work";

export default async function Blog() {
  const projects = await getSelectedWork();

  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-3">
              Blog & Case Studies
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Thoughts & insights<span className="text-[#E5212E]">.</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
            I write about design processes, case studies, and lessons from
            shipping real products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="blog-grid">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex flex-col bg-[#0a1128] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-[#E5212E]/30 transition-all duration-300"
            >
              {/* Cover image */}
              <div className="aspect-video bg-[#020618] border-b border-white/[0.06] overflow-hidden flex-shrink-0">
                {project.thumbnailUrl ? (
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center">
                      <span className="text-[#E5212E] font-bold text-sm">{project.number}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 gap-3">
                {/* Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#E5212E] font-medium tracking-wide">
                    {project.category}
                  </span>
                  <span className="text-xs text-gray-700">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-white group-hover:text-[#E5212E] transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Tags + arrow */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04] mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-gray-600 border border-white/[0.06] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-600 group-hover:text-[#E5212E] transition-colors flex-shrink-0"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* View All CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/blog"
            className="group flex items-center gap-2 border border-white/10 text-gray-400 px-8 py-3 rounded-full text-sm font-medium hover:border-[#E5212E] hover:text-white transition-all duration-300"
          >
            View All Posts
            <ArrowUpRight size={15} className="group-hover:text-[#E5212E] transition-colors" />
          </Link>
        </div>
      </div>
    </section>
  );
}
