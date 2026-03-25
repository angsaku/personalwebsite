export const revalidate = 0;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, getSelectedWork, getAllWorkSlugs } from "@/lib/selected-work";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Satriya Kurniawan`,
    description: project.description,
  };
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProject(slug),
    getSelectedWork(),
  ]);
  if (!project) notFound();

  const related = allProjects.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#work"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://fzjpbihupkiggcdvynua.supabase.co/storage/v1/object/public/Logo%20Client/favicon.svg"
              alt="Satriya Kurniawan"
              className="h-7 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="blur-blob absolute top-0 right-1/4 w-80 h-80 bg-[#E5212E] rounded-full blur-[180px] opacity-[0.08] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs text-[#E5212E] tracking-[0.25em] uppercase font-medium">
              {project.category}
            </span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-600">{project.year}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-8 max-w-3xl">
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 border border-white/[0.08] px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Cover image */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="aspect-video rounded-2xl bg-[#0a1128] border border-white/[0.06] overflow-hidden flex items-center justify-center mb-16">
          {project.coverUrl ? (
            <Image
              src={project.coverUrl}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 mx-auto mb-3 flex items-center justify-center">
                <span className="text-[#E5212E] text-2xl">✦</span>
              </div>
              <p className="text-xs text-gray-700 tracking-wide">Cover Image / Hero Visual</p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="md:col-span-3 space-y-10">
            {project.metrics.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 tracking-[0.25em] uppercase mb-4">Impact</p>
                <div className="space-y-4">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-2xl font-bold text-[#E5212E]">{m.value}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.tools.length > 0 && (
              <div>
                <p className="text-xs text-gray-600 tracking-[0.25em] uppercase mb-4">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs text-gray-500 border border-white/[0.08] px-3 py-1.5 rounded-full"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Main content */}
          <article className="md:col-span-9 space-y-16">
            {project.intro && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
                <p className="text-gray-400 leading-relaxed">{project.intro}</p>
              </section>
            )}

            {project.challenge && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">The Challenge</h2>
                <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
              </section>
            )}

            {project.process.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-white mb-10">The Process</h2>
                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#E5212E]/40 via-[#E5212E]/10 to-transparent" />

                  <div className="space-y-10">
                    {project.process.map((step, i) => (
                      <div key={i} className="relative flex gap-6 group">
                        {/* Step number bubble */}
                        <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-[#020618] border border-[#E5212E]/40 group-hover:border-[#E5212E] group-hover:bg-[#E5212E]/10 flex items-center justify-center transition-all duration-300 z-10">
                          <span className="text-xs font-bold text-[#E5212E]">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        {/* Content card */}
                        <div className="flex-1 pb-2">
                          <div className="bg-[#0a1128] border border-white/[0.06] group-hover:border-[#E5212E]/20 rounded-2xl p-6 transition-all duration-300">
                            <h3 className="text-base font-semibold text-white mb-3 group-hover:text-[#E5212E] transition-colors duration-300">
                              {step.step}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {step.description}
                            </p>
                            {step.image_url && (
                              <div className="aspect-video rounded-xl overflow-hidden border border-white/[0.06] mt-5">
                                <Image
                                  src={step.image_url}
                                  alt={step.step}
                                  width={800}
                                  height={450}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {project.outcome && (
              <section className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-white mb-4">Outcome & Learnings</h2>
                <p className="text-gray-400 leading-relaxed">{project.outcome}</p>
              </section>
            )}

            {project.caseStudyUrl && (
              <section className="border border-[#E5212E]/20 bg-[#E5212E]/[0.04] rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-xs text-[#E5212E] tracking-[0.25em] uppercase mb-2">Full Case Study</p>
                  <h3 className="text-lg font-semibold text-white leading-snug">
                    Want to see the full process?
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Read the in-depth breakdown — research, decisions, and outcomes.
                  </p>
                </div>
                <a
                  href={project.caseStudyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#E5212E] text-white text-sm font-medium rounded-full hover:bg-[#c41a25] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  Read Full Case Study
                  <ArrowUpRight size={15} />
                </a>
              </section>
            )}
          </article>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="border-t border-white/[0.06] mt-24 pt-12">
            <p className="text-xs text-gray-600 tracking-[0.25em] uppercase mb-6">More Projects</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/work/${r.slug}`}
                  className="group flex gap-4 p-5 bg-[#0a1128] border border-white/[0.06] rounded-xl hover:border-[#E5212E]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {r.thumbnailUrl ? (
                      <Image
                        src={r.thumbnailUrl}
                        alt={r.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[#E5212E] text-sm font-bold">{r.number}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-[#E5212E] mb-1">{r.category}</p>
                    <p className="text-sm text-white group-hover:text-[#E5212E] transition-colors font-medium leading-snug line-clamp-2">
                      {r.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
