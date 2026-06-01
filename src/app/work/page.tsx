export const revalidate = 0;

import Link from "next/link";
import { getSelectedWork } from "@/lib/selected-work";
import WorkList from "@/components/WorkList";
import RevealInit from "@/components/RevealInit";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects — Satriya Kurniawan",
  description: "A full collection of design projects spanning mobile, web, and enterprise products.",
};

export default async function WorkPage() {
  const projects = await getSelectedWork();

  /* Collect unique categories for the meta line */
  const categories = Array.from(new Set(projects.map((p) => p.category.split("·")[0].trim())));

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
        <div className="sk-wd-topbar-title sk-mono">SELECTED WORK / ALL PROJECTS</div>
        <div className="sk-wd-topbar-meta sk-mono">FILE / 01</div>
      </div>

      {/* ── Hero ── */}
      <section className="sk-wd-hero">
        <div className="sk-section-tag sk-mono">
          <span className="num">01</span>
          <span>SELECTED WORK</span>
          <span className="sk-line" />
          <span>{projects.length} ENTRIES ↓</span>
        </div>

        <h1 className="sk-wd-title">
          ALL
          <br />
          PROJECTS.
        </h1>

        <p className="sk-wd-desc sk-serif">
          A full collection of design work spanning mobile, web, and enterprise products.
        </p>

        {/* Category tags */}
        {categories.length > 0 && (
          <div className="sk-skill-tags" style={{ marginTop: 0 }}>
            {categories.map((c) => (
              <span key={c} className="sk-skill-tag sk-mono">{c}</span>
            ))}
          </div>
        )}
      </section>

      {/* ── Project list ── */}
      <WorkList projects={projects} />

      {/* ── Footer nav ── */}
      <div className="sk-wd-work-foot">
        <Link href="/" className="sk-btn-ghost sk-mono">
          ← BACK TO HOME <span></span>
        </Link>
        <Link href="/blog" className="sk-btn-ghost sk-mono">
          BLOG / NOTES <span>→</span>
        </Link>
      </div>
    </div>
  );
}
