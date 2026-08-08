export const revalidate = 0;

import Link from "next/link";
import { getSelectedWork } from "@/lib/selected-work";
import WorkSearch from "@/components/WorkSearch";
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-sk.svg"
            alt="Satriya Kurniawan"
            style={{ display: "block", height: "40px", width: "auto" }}
          />
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

      {/* ── Search + paginated list ── */}
      <div style={{ padding: "0 40px 80px" }}>
        <WorkSearch projects={projects} />
      </div>
    </div>
  );
}
