export const revalidate = 0;

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProject, getSelectedWork, getAllWorkSlugs } from "@/lib/selected-work";
import GalleryLightbox from "./_components/GalleryLightbox";
import ReadingProgressBar from "./_components/ReadingProgressBar";
import BackToTop from "./_components/BackToTop";
import WorkList from "@/components/WorkList";
import RevealInit from "@/components/RevealInit";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

function isDirectImage(url: string | null | undefined): boolean {
  if (!url) return false;
  return (
    url.includes("supabase.co") ||
    (url.startsWith("https://") && !url.includes("drive.google.com"))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const rawImage =
    (isDirectImage(project.coverUrl) ? project.coverUrl : null) ??
    (isDirectImage(project.thumbnailUrl) ? project.thumbnailUrl : null);
  return {
    title: `${project.title} — Satriya Kurniawan`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Satriya Kurniawan`,
      description: project.description,
      url: `https://angsaku.vercel.app/work/${slug}`,
      images: rawImage ? [{ url: rawImage, width: 1200, height: 630, alt: project.title }] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Satriya Kurniawan`,
      description: project.description,
      images: rawImage ? [rawImage] : [],
    },
  };
}

export default async function WorkDetail({ params }: Props) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([
    getProject(slug),
    getSelectedWork(),
  ]);
  if (!project) notFound();

  const related = allProjects.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://angsaku.vercel.app/work/${slug}`,
    author: { "@type": "Person", name: "Satriya Kurniawan", url: "https://angsaku.vercel.app" },
    ...(isDirectImage(project.coverUrl) && { image: project.coverUrl }),
  };

  return (
    <div className="sk-wd">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollToTop />
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
        <Link href="/#work" className="sk-wd-back sk-mono">← ALL WORK</Link>
        <div className="sk-wd-topbar-title sk-mono">
          ≈ {project.title.toUpperCase()}
        </div>
        <div className="sk-wd-topbar-meta sk-mono">
          FILE / {project.number}
        </div>
        <ReadingProgressBar />
      </div>

      {/* ── Hero ── */}
      <section className="sk-wd-hero">
        <div className="sk-section-tag sk-mono">
          <span className="num">{project.number}</span>
          <span>SELECTED WORK</span>
          <span className="sk-line" />
          <span>{project.category.toUpperCase()}</span>
          <span>{project.year}</span>
        </div>

        <h1 className="sk-wd-title">
          {project.title}
        </h1>

        <p className="sk-wd-desc sk-serif">{project.description}</p>

        <div className="sk-skill-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="sk-skill-tag sk-mono">{tag}</span>
          ))}
        </div>
      </section>

      {/* ── Cover image ── */}
      {project.coverUrl && (
        <div className="sk-wd-cover">
          <Image
            src={project.coverUrl}
            alt={project.title}
            width={1400}
            height={700}
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      )}

      {/* ── Body: sidebar + main ── */}
      <div className="sk-wd-body">

        {/* Sidebar */}
        <aside className="sk-wd-sidebar">
          {project.metrics.length > 0 && (
            <div className="sk-wd-sidebar-block">
              <div className="sk-wd-sidebar-label sk-mono">IMPACT</div>
              {project.metrics.map((m) => (
                <div key={m.label} className="sk-wd-metric">
                  <div className="sk-wd-metric-val">{m.value}</div>
                  <div className="sk-wd-metric-label sk-mono">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {project.tools.length > 0 && (
            <div className="sk-wd-sidebar-block">
              <div className="sk-wd-sidebar-label sk-mono">TOOLS</div>
              <div className="sk-skill-tags" style={{ marginTop: 8 }}>
                {project.tools.map((t) => (
                  <span key={t} className="sk-skill-tag sk-mono">{t}</span>
                ))}
              </div>
            </div>
          )}

          {project.caseStudyUrl && (
            <div className="sk-wd-sidebar-block">
              <div className="sk-wd-sidebar-label sk-mono">CASE STUDY</div>
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sk-btn-primary sk-mono"
                style={{ fontSize: 10, padding: "10px 14px", marginTop: 4 }}
              >
                READ ↗
              </a>
            </div>
          )}
        </aside>

        {/* Main content */}
        <article className="sk-wd-main">

          {project.intro && (
            <div className="sk-wd-section">
              <div className="sk-wd-section-label sk-mono">01 — INTRODUCTION</div>
              <div className="sk-rich-text" dangerouslySetInnerHTML={{ __html: project.intro }} />
            </div>
          )}

          {project.challenge && (
            <div className="sk-wd-section">
              <div className="sk-wd-section-label sk-mono">02 — THE CHALLENGE</div>
              <div className="sk-rich-text" dangerouslySetInnerHTML={{ __html: project.challenge }} />
            </div>
          )}

          {project.process.length > 0 && (
            <div className="sk-wd-section">
              <div className="sk-wd-section-label sk-mono">03 — THE PROCESS</div>
              <div className="sk-wd-process">
                {project.process.map((step, i) => (
                  <div key={i} className="sk-wd-process-step">
                    <div className="sk-wd-step-num sk-mono">{String(i + 1).padStart(2, "0")}</div>
                    <div className="sk-wd-step-content">
                      <h3 className="sk-wd-step-title">{step.step}</h3>
                      <p className="sk-wd-step-desc sk-serif">{step.description}</p>
                      {step.image_url && (
                        <div className="sk-wd-step-img">
                          <Image
                            src={step.image_url}
                            alt={step.step}
                            width={800}
                            height={450}
                            loading="lazy"
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.outcome && (
            <div className="sk-wd-section">
              <div className="sk-wd-section-label sk-mono">04 — OUTCOME &amp; LEARNINGS</div>
              <div className="sk-rich-text" dangerouslySetInnerHTML={{ __html: project.outcome }} />
            </div>
          )}
        </article>
      </div>

      {/* ── Gallery ── */}
      {project.galleryImages.length > 0 && (
        <div className="sk-wd-gallery-section">
          <div className="sk-wd-section-label sk-mono" style={{ marginBottom: 24 }}>
            GALLERY / {project.galleryImages.length} SHOTS
          </div>
          <GalleryLightbox images={project.galleryImages} title={project.title} />
        </div>
      )}

      {/* ── Related projects ── */}
      {related.length > 0 && (
        <section className="sk-wd-related">
          <div className="sk-section-tag sk-mono" style={{ padding: "0 40px" }}>
            <span>MORE PROJECTS</span>
            <span className="sk-line" />
            <span>{related.length} ENTRIES</span>
          </div>
          <WorkList projects={related} />
          <div style={{ padding: "24px 40px 0", borderTop: "1px solid var(--line)" }}>
            <Link href="/#work" className="sk-btn-ghost sk-mono">
              ← BACK TO HOME <span></span>
            </Link>
          </div>
        </section>
      )}

      <BackToTop />
    </div>
  );
}
