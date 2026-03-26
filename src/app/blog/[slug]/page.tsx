export const revalidate = 0;

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getPost, getAllPosts, getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Satriya Kurniawan`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Satriya Kurniawan`,
      description: post.excerpt,
      url: `https://angsaku.vercel.app/blog/${slug}`,
      images: post.coverUrl ? [{ url: post.coverUrl, width: 1200, height: 630, alt: post.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Satriya Kurniawan`,
      description: post.excerpt,
      images: post.coverUrl ? [post.coverUrl] : [],
    },
  };
}

export default async function BlogDetail({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getPost(slug), getAllPosts()]);
  if (!post) notFound();

  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#blog"
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
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
        <div className="blur-blob absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E5212E] rounded-full blur-[200px] opacity-[0.06] pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 pt-16 pb-12">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 px-3 py-1 rounded-full tracking-wide font-medium">
              <Tag size={10} />
              {post.tag}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-[2.6rem] font-bold text-white leading-[1.2] tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-5 text-xs text-gray-600 border-t border-white/[0.06] pt-6">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverUrl ? (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.coverUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-6 mb-16">
          <div className="aspect-video rounded-2xl bg-[#0a1128] border border-white/[0.06] flex items-center justify-center">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-[#E5212E]/10 border border-[#E5212E]/20 mx-auto mb-3 flex items-center justify-center">
                <span className="text-[#E5212E] text-2xl">✦</span>
              </div>
              <p className="text-xs text-gray-700 tracking-wide">Cover Image</p>
            </div>
          </div>
        </div>
      )}

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-6 pb-24">

        {/* Intro — large drop-cap feel */}
        {post.intro && (
          <div className="mb-12">
            <p className="text-gray-300 text-lg leading-[1.85] first-letter:text-5xl first-letter:font-bold first-letter:text-white first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              {post.intro}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-10">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <span className="text-[#E5212E] text-xs">✦</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* The Challenge */}
        {post.challenge && (
          <div className="mb-14">
            <h2 className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4 font-medium">
              The Challenge
            </h2>
            {/* Pull quote style */}
            <blockquote className="border-l-2 border-[#E5212E] pl-6 my-6">
              <p className="text-white text-xl font-medium leading-relaxed italic">
                &ldquo;{post.challenge.split(".")[0]}.&rdquo;
              </p>
            </blockquote>
            <p className="text-gray-400 leading-[1.85] text-base">
              {post.challenge.split(".").slice(1).join(".").trim()}
            </p>
          </div>
        )}

        {/* Process steps as blog sections */}
        {post.process.length > 0 && (
          <div className="mb-14 space-y-14">
            <h2 className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4 font-medium">
              The Process
            </h2>
            {post.process.map((step, i) => (
              <div key={i}>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[#E5212E] text-xs font-bold tabular-nums opacity-60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    {(step.step ?? "").replace(/^\d+\s*[—–-]\s*/, "")}
                  </h3>
                </div>
                <p className="text-gray-400 leading-[1.85] text-base pl-7">
                  {step.description ?? ""}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Metrics callout bar */}
        {post.metrics.length > 0 && (
          <div className="my-14 bg-[#0a1128] border border-white/[0.06] rounded-2xl p-8">
            <p className="text-xs text-gray-600 tracking-[0.25em] uppercase mb-6">Key Results</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {post.metrics.map((m) => (
                <div key={m.label} className="text-center">
                  <p className="text-3xl font-bold text-[#E5212E] mb-1">{m.value}</p>
                  <p className="text-xs text-gray-500">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Outcome */}
        {post.outcome && (
          <div className="mb-14">
            <h2 className="text-xs text-[#E5212E] tracking-[0.3em] uppercase mb-4 font-medium">
              Outcome & Learnings
            </h2>
            <p className="text-gray-400 leading-[1.85] text-base">{post.outcome}</p>
          </div>
        )}

        {/* Tools */}
        {post.tools.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-10 border-t border-white/[0.06]">
            <span className="text-xs text-gray-600 mr-1">Tools used:</span>
            {post.tools.map((tool) => (
              <span
                key={tool}
                className="text-xs text-gray-500 border border-white/[0.08] px-3 py-1 rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-white/[0.06]">
            <p className="text-xs text-gray-600 tracking-[0.25em] uppercase mb-8">More Articles</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block p-6 bg-[#0a1128] border border-white/[0.06] rounded-2xl hover:border-[#E5212E]/30 transition-all duration-300"
                >
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 px-2.5 py-0.5 rounded-full mb-3">
                    <Tag size={9} />
                    {r.tag}
                  </span>
                  <p className="text-sm font-semibold text-white group-hover:text-[#E5212E] transition-colors leading-snug line-clamp-2 mb-3">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-1.5">
                    <Clock size={10} />
                    {r.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
