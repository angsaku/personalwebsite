import Image from "next/image";
import Link from "next/link";
import { getAboutContent } from "@/lib/about";

export default async function About() {
  const about = await getAboutContent();

  return (
    <section className="sk-section" id="about">
      <div className="sk-section-tag sk-mono">
        <span className="num">02</span>
        <span>ABOUT / FRAGMENTS</span>
        <span className="sk-line" />
        <span>SAVED ↘</span>
      </div>

      <div className="sk-about-grid">
        {/* Photo */}
        <div className="sk-about-photo rv rv-l">
          <div className="ph-frame">
            {about.photoUrl ? (
              /* Real photo — image sits behind corner marks */
              <>
                <Image
                  src={about.photoUrl}
                  alt="Satriya Kurniawan"
                  fill
                  unoptimized
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                {/* Corner marks on top of photo */}
                <div className="ph-corner tl sk-mono" style={{ zIndex: 1 }}>+</div>
                <div className="ph-corner tr sk-mono" style={{ zIndex: 1 }}>+</div>
                <div className="ph-corner bl sk-mono" style={{ zIndex: 1 }}>+</div>
                <div className="ph-corner br sk-mono" style={{ zIndex: 1 }}>+</div>
              </>
            ) : (
              /* Placeholder frame */
              <>
                <div className="ph-corner tl sk-mono">+</div>
                <div className="ph-corner tr sk-mono">+</div>
                <div className="ph-corner bl sk-mono">+</div>
                <div className="ph-corner br sk-mono">+</div>
                <div className="ph-inner">
                  <div className="ph-cross" />
                  <div className="ph-label sk-mono">
                    PHOTO / SATRIYA K.
                    <br />↳ DROP IMAGE HERE
                  </div>
                  <div className="ph-meta sk-mono">FILE_001.JPG · 4:5 · B&amp;W PREFERRED</div>
                </div>
              </>
            )}
          </div>
          <div className="ph-tape t1 sk-mono">★ ME</div>
          <div className="ph-tape t2 sk-mono">2026</div>
        </div>

        {/* Quote + CTAs */}
        <div className="sk-about-quote rv">
          <em>PRODUCT DESIGNER</em>
          <br />
          {about.bioParagraph1}
          {about.bioParagraph2 && (
            <>
              <br />
              <br />
              {about.bioParagraph2}
            </>
          )}

          {/* Core Skills */}
          {about.skills && about.skills.length > 0 && (
            <div className="sk-skill-tags">
              {about.skills.map((s) => (
                <span key={s} className="sk-skill-tag sk-mono">
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="sk-about-ctas">
            <a
              href={about.resumeUrl ?? "#"}
              target={about.resumeUrl ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="sk-btn-primary sk-mono"
              data-cursor="hover"
              data-cursor-label="↗ open"
            >
              VIEW RESUME <span>↗</span>
            </a>
            <Link
              href="/about"
              className="sk-btn-ghost sk-mono"
              data-cursor="hover"
              data-cursor-label="↗ read"
            >
              MORE ABOUT ME <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
