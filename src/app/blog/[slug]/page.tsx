export const revalidate = 0;

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPost, getAllPosts, getAllSlugs } from "@/lib/blog";
import type { Metadata } from "next";
import ReadingProgressBar from "@/app/work/[slug]/_components/ReadingProgressBar";
import BackToTop from "@/app/work/[slug]/_components/BackToTop";
import RevealInit from "@/components/RevealInit";
import ScrollToTop from "@/components/ScrollToTop";

type Props = { params: Promise<{ slug: string }> };

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
    author: { "@type": "Person", name: "Satriya Kurniawan", url: "https://angsaku.vercel.app" },
    publisher: { "@type": "Person", name: "Satriya Kurniawan", url: "https://angsaku.vercel.app" },
    ...(post.coverUrl && { image: post.coverUrl }),
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
        <Link href="/blog" className="sk-wd-back sk-mono">← ALL POSTS</Link>
        <div className="sk-wd-topbar-title sk-mono">≈ {post.title.toUpperCase()}</div>
        <div className="sk-wd-topbar-meta sk-mono">FILE / 06</div>
        <ReadingProgressBar />
      </div>

      {/* ── Hero ── */}
      <section className="sk-blog-hero">
        <div className="sk-section-tag sk-mono">
          <span className="num">06</span>
          <span>BLOG / NOTES</span>
          <span className="sk-line" />
          <span>{post.tag.toUpperCase()}</span>
        </div>

        <h1 className="sk-wd-title">{post.title}</h1>

        <div className="sk-blog-detail-meta sk-mono">
          <span>★ {post.date}</span>
          <span className="sep">·</span>
          <span>○ {post.readTime}</span>
        </div>

        <p className="sk-wd-desc sk-serif">{post.excerpt}</p>
      </section>

      {/* ── Cover image ── */}
      {post.coverUrl && (
        <div className="sk-wd-cover">
          <Image
            src={post.coverUrl}
            alt={post.title}
            width={1400}
            height={600}
            priority
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      )}

      {/* ── Article body ── */}
      <section className="sk-blog-article">
        {post.content ? (
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <p className="sk-mono" style={{ color: "var(--dim)", textAlign: "center", padding: "80px 0", letterSpacing: ".14em", fontSize: 11, textTransform: "uppercase" }}>
            NO CONTENT YET.
          </p>
        )}
      </section>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="sk-blog-related">
          <div className="sk-section-tag sk-mono">
            <span>MORE ARTICLES</span>
            <span className="sk-line" />
            <span>{related.length} POSTS</span>
          </div>
          <div className="sk-blog-grid">
            {related.map((r, i) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className={`sk-blog-card rv${i === 0 ? " feat" : " tilt-r"}`}
                data-cursor="hover"
                data-cursor-label="↗ read"
              >
                <header>
                  <span className="b-tag sk-mono">{r.tag}</span>
                  <span className="b-date sk-mono">{r.date}</span>
                </header>
                <h3 className="b-title">{r.title.toUpperCase()}</h3>
                <p className="b-excerpt sk-serif">{r.excerpt}</p>
                <footer>
                  <span className="b-time sk-mono">{r.readTime}</span>
                  <span className="b-go">→</span>
                </footer>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 32, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <Link href="/blog" className="sk-btn-ghost sk-mono">
              ← ALL POSTS <span></span>
            </Link>
          </div>
        </section>
      )}

      <BackToTop />
    </div>
  );
}
