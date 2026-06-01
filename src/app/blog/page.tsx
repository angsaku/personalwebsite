export const revalidate = 0;

import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import BlogSearch from "@/components/BlogSearch";
import RevealInit from "@/components/RevealInit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Notes — Satriya Kurniawan",
  description: "Design processes, case studies, and lessons from shipping real products.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="sk-wd">
      <RevealInit />

      {/* ── Sticky topbar ── */}
      <div className="sk-wd-topbar">
        <Link href="/" className="sk-wd-logo" aria-label="Home">
          <svg width="40" height="30" viewBox="0 0 40 30" fill="none">
            <rect width="40" height="30" fill="var(--accent)" />
            <text x="20" y="16" dominantBaseline="middle" textAnchor="middle"
              fill="var(--bg)" fontFamily="var(--font-jetbrains-mono,monospace)"
              fontWeight="800" fontSize="11" letterSpacing="2">SK</text>
          </svg>
        </Link>
        <Link href="/" className="sk-wd-back sk-mono">← HOME</Link>
        <div className="sk-wd-topbar-title sk-mono">BLOG / NOTES</div>
        <div className="sk-wd-topbar-meta sk-mono">FILE / 06</div>
      </div>

      {/* ── Hero ── */}
      <section className="sk-blog-list-hero">
        <div className="sk-section-tag sk-mono">
          <span className="num">06</span>
          <span>BLOG / NOTES</span>
          <span className="sk-line" />
          <span>{posts.length} POSTS ↓</span>
        </div>

        <h1 className="sk-wd-title">
          THOUGHTS
          <br />
          &amp; NOTES.
        </h1>

        <p className="sk-wd-desc sk-serif">
          Design processes, case studies, and lessons from shipping real products.
        </p>
      </section>

      {/* ── Searchable post grid ── */}
      <div className="sk-blog-list-body">
        <BlogSearch posts={posts} />
      </div>
    </div>
  );
}
