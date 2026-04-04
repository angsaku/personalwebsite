export const revalidate = 3600;

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { getPost, getAllPosts, getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";
import ReadingProgressBar from "@/app/work/[slug]/_components/ReadingProgressBar";
import BackToTop from "@/app/work/[slug]/_components/BackToTop";
import ScrollToTop from "@/components/ScrollToTop";

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: `https://angsaku.vercel.app/blog/${slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Satriya Kurniawan",
      url: "https://angsaku.vercel.app",
    },
    publisher: {
      "@type": "Person",
      name: "Satriya Kurniawan",
      url: "https://angsaku.vercel.app",
    },
    ...(post.coverUrl && { image: post.coverUrl }),
  };

  return (
    <div className="min-h-screen bg-[#020618] text-gray-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollToTop />
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#020618]/90 backdrop-blur-md border-b border-white/[0.06] relative">
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
              src="/logo.svg"
              alt="Satriya Kurniawan"
              className="h-7 w-auto"
              width={28}
              height={28}
            />
          </Link>
        </div>
        <ReadingProgressBar />
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
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 text-xs text-[#E5212E] bg-[#E5212E]/10 border border-[#E5212E]/20 px-3 py-1 rounded-full tracking-wide font-medium">
              <Tag size={10} />
              {post.tag}
            </span>
          </div>

          <h1 className="text-3xl md:text-[2.6rem] font-bold text-white leading-[1.2] tracking-tight mb-6">
            {post.title}
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl">
            {post.excerpt}
          </p>

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
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/[0.06]">
            <Image src={post.coverUrl} alt={post.title} fill className="object-cover" priority />
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

      {/* Article body — render Quill HTML */}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        {post.content ? (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-gray-500 text-center py-12">No content yet.</p>
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
                  className="group flex gap-4 p-5 bg-[#0a1128] border border-white/[0.06] rounded-xl hover:border-[#E5212E]/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#E5212E]/10 border border-[#E5212E]/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {r.coverUrl ? (
                      <Image
                        src={r.coverUrl}
                        alt={r.title}
                        width={48}
                        height={48}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Tag size={14} className="text-[#E5212E]" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#E5212E] mb-1">{r.tag}</p>
                    <p className="text-sm text-white group-hover:text-[#E5212E] transition-colors font-medium leading-snug line-clamp-2 mb-2">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-600 flex items-center gap-1.5">
                      <Clock size={10} />
                      {r.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <BackToTop />
    </div>
  );
}
