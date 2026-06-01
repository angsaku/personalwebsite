import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export default async function Blog() {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 4);
  const showCta = allPosts.length >= 5;

  return (
    <section className="sk-section" id="blog">
      <div className="sk-section-tag sk-mono">
        <span className="num">06</span>
        <span>BLOG / RECENT WRITING</span>
        <span className="sk-line" />
        <Link href="/blog" className="hover:text-[var(--accent)]">
          {allPosts.length} POSTS · ALL ↗
        </Link>
      </div>

      {posts.length > 0 && (
        <div className="sk-blog-grid">
          {posts.map((p, i) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className={[
                "sk-blog-card rv",
                i === 0 ? "feat" : "",
                i % 3 === 1 ? "tilt-r" : i % 3 === 2 ? "tilt-l" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              data-cursor="hover"
              data-cursor-label="↘ read"
            >
              <header>
                <span className="b-date sk-mono">{p.date}</span>
                <span className="b-tag sk-mono">{p.tag}</span>
              </header>
              <h3 className="b-title">{p.title.toUpperCase()}</h3>
              <p className="b-excerpt sk-serif">{p.excerpt}</p>
              <footer>
                <span className="b-time sk-mono">↳ {p.readTime}</span>
                <span className="b-go">→</span>
              </footer>
            </Link>
          ))}
        </div>
      )}

      {showCta && (
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <Link
            href="/blog"
            className="sk-mono"
            data-cursor="hover"
            data-cursor-label="↘ all posts"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid var(--line)",
              padding: "12px 28px",
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              transition: "border-color .2s, color .2s",
            }}
          >
            ALL {allPosts.length} POSTS ↗
          </Link>
        </div>
      )}

      {posts.length === 0 && (
        <div
          style={{
            padding: "80px 0",
            textAlign: "center",
            border: "1px solid var(--line)",
          }}
          className="sk-mono"
        >
          No posts published yet.
        </div>
      )}
    </section>
  );
}
