export const revalidate = 0;

import Image from "next/image";
import Link from "next/link";
import { getAboutContent } from "@/lib/about";
import { getBeyondWork } from "@/lib/beyond-work";
import { getCommunities } from "@/lib/communities";
import { getCtaContent } from "@/lib/cta";
import { ICON_MAP } from "@/lib/icon-map";
import RevealInit from "@/components/RevealInit";
import ScrollToTop from "@/components/ScrollToTop";
import BackToTop from "@/app/work/[slug]/_components/BackToTop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me — Satriya Kurniawan",
  description: "A little more about who I am beyond the portfolio — hobbies, interests, and what drives me.",
};

/** Build display text from a social URL */
function display(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default async function AboutPage() {
  const [about, beyondWork, communities, cta] = await Promise.all([
    getAboutContent(),
    getBeyondWork(),
    getCommunities(),
    getCtaContent(),
  ]);

  const year = new Date().getFullYear();

  /* Build social list same logic as Footer */
  const socials: { label: string; icon: string; href: string; text: string }[] = [];
  if (cta.linkedin_url)  socials.push({ label: "LINKEDIN",   icon: "↗", href: cta.linkedin_url,  text: display(cta.linkedin_url) });
  if (cta.twitter_url)   socials.push({ label: "X / TWITTER",icon: "↗", href: cta.twitter_url,   text: display(cta.twitter_url) });
  if (cta.instagram_url) socials.push({ label: "INSTAGRAM",  icon: "↗", href: cta.instagram_url, text: display(cta.instagram_url) });
  if (cta.github_url)    socials.push({ label: "GITHUB",     icon: "▶", href: cta.github_url,    text: display(cta.github_url) });
  if (cta.behance_url)   socials.push({ label: "BEHANCE",    icon: "↗", href: cta.behance_url,   text: display(cta.behance_url) });
  if (cta.dribbble_url)  socials.push({ label: "DRIBBBLE",   icon: "↗", href: cta.dribbble_url,  text: display(cta.dribbble_url) });
  if (cta.youtube_url)   socials.push({ label: "YOUTUBE",    icon: "▶", href: cta.youtube_url,   text: display(cta.youtube_url) });
  if (cta.tiktok_url)    socials.push({ label: "TIKTOK",     icon: "↗", href: cta.tiktok_url,    text: display(cta.tiktok_url) });
  if (cta.whatsapp_number) {
    const waNumber = cta.whatsapp_number.split("?")[0].replace(/\D/g, "");
    socials.push({ label: "WHATSAPP", icon: "✦", href: `https://wa.me/${cta.whatsapp_number}`, text: `+${waNumber}` });
  }

  return (
    <div className="sk-wd">
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
        <Link href="/" className="sk-wd-back sk-mono">← HOME</Link>
        <div className="sk-wd-topbar-title sk-mono">ABOUT / MORE ABOUT ME</div>
        <div className="sk-wd-topbar-meta sk-mono">FILE / 02</div>
      </div>

      {/* ── Hero — photo + bio ── */}
      <section className="sk-section sk-about-page-hero">
        <div className="sk-section-tag sk-mono">
          <span className="num">02</span>
          <span>ABOUT / FRAGMENTS</span>
          <span className="sk-line" />
          <span>PRODUCT DESIGNER</span>
        </div>

        <div className="sk-about-grid">
          {/* Photo */}
          <div className="sk-about-photo rv rv-l">
            <div className="ph-frame">
              {about.photoUrl ? (
                <>
                  <Image
                    src={about.photoUrl}
                    alt="Satriya Kurniawan"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                  <div className="ph-corner tl sk-mono" style={{ zIndex: 1 }}>+</div>
                  <div className="ph-corner tr sk-mono" style={{ zIndex: 1 }}>+</div>
                  <div className="ph-corner bl sk-mono" style={{ zIndex: 1 }}>+</div>
                  <div className="ph-corner br sk-mono" style={{ zIndex: 1 }}>+</div>
                </>
              ) : (
                <>
                  <div className="ph-corner tl sk-mono">+</div>
                  <div className="ph-corner tr sk-mono">+</div>
                  <div className="ph-corner bl sk-mono">+</div>
                  <div className="ph-corner br sk-mono">+</div>
                  <div className="ph-inner">
                    <div className="ph-cross" />
                    <div className="ph-label sk-mono">PHOTO / SATRIYA K.<br />↳ DROP IMAGE HERE</div>
                  </div>
                </>
              )}
            </div>
            <div className="ph-tape t1 sk-mono">★ ME</div>
            <div className="ph-tape t2 sk-mono">2026</div>
          </div>

          {/* Bio + skills + CTAs */}
          <div className="sk-about-quote rv">
            <em>PRODUCT DESIGNER</em>
            <br />
            {about.bioParagraph1}
            {about.bioParagraph2 && (
              <>
                <br /><br />
                {about.bioParagraph2}
              </>
            )}

            {about.skills.length > 0 && (
              <div className="sk-skill-tags">
                {about.skills.map((s) => (
                  <span key={s} className="sk-skill-tag sk-mono">{s}</span>
                ))}
              </div>
            )}

            <div className="sk-about-ctas">
              {about.resumeUrl && (
                <a
                  href={about.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sk-btn-primary sk-mono"
                  data-cursor="hover"
                  data-cursor-label="↗ open"
                >
                  VIEW RESUME <span>↗</span>
                </a>
              )}
              <a
                href="#contact"
                className="sk-btn-ghost sk-mono"
                data-cursor="hover"
                data-cursor-label="→ go"
              >
                CONTACT <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Beyond Work ── */}
      {beyondWork.length > 0 && (
        <section className="sk-section">
          <div className="sk-section-tag sk-mono">
            <span>BEYOND WORK</span>
            <span className="sk-line" />
            <span>OUTSIDE THE DESK</span>
          </div>
          <div className="sk-about-beyond-grid">
            {beyondWork.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <div key={item.id} className="sk-about-beyond-card rv">
                  <div className="sk-about-beyond-num sk-mono">
                    {String(i + 1).padStart(2, "0")}
                    {Icon && (
                      <span style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 6 }}>
                        <Icon size={11} />
                      </span>
                    )}
                  </div>
                  <h3 className="sk-about-beyond-title">{item.title.toUpperCase()}</h3>
                  <p className="sk-about-beyond-desc sk-serif">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Community ── */}
      {communities.length > 0 && (
        <section className="sk-section">
          <div className="sk-section-tag sk-mono">
            <span>COMMUNITY</span>
            <span className="sk-line" />
            <span>GIVING BACK</span>
          </div>
          <div className="sk-about-community">
            {communities.map((c) => (
              <div key={c.id} className="sk-about-community-item rv">
                <div className="sk-about-community-period sk-mono">{c.period}</div>
                <div className="sk-about-community-content">
                  <div className="sk-about-community-head">
                    {c.logo_url && (
                      <div className="sk-about-community-logo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={c.logo_url} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      </div>
                    )}
                    <div>
                      <div className="sk-about-community-name">{c.name.toUpperCase()}</div>
                      <div className="sk-about-community-role sk-mono">{c.role}</div>
                    </div>
                  </div>
                  <p className="sk-about-community-desc sk-serif">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Contact ── */}
      <section className="sk-contact" id="contact">
        <div className="sk-section-tag sk-mono">
          <span className="num">07</span>
          <span>CONTACT / SAY SOMETHING</span>
          <span className="sk-line" />
          <span>END OF FILE</span>
        </div>

        <h2 className="sk-contact-h rv">
          LET&apos;S
          <br />
          <span className="out">MAKE</span> <span className="acc">SOMETHING</span>
          <br />
          WEIRD.
        </h2>

        {cta.email && (
          <div style={{ marginTop: 40 }}>
            <a
              className="sk-btn-primary sk-mono"
              href={`mailto:${cta.email}`}
              data-cursor="hover"
              data-cursor-label="✷ email"
            >
              {cta.email} <span>→</span>
            </a>
          </div>
        )}

        {socials.length > 0 && (
          <div className="sk-contact-grid rv">
            {socials.map((s) => (
              <div key={s.label}>
                <div className="lbl sk-mono">{s.icon} {s.label}</div>
                <div className="v">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    data-cursor-label="↗ open"
                  >
                    {s.text}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="sk-foot sk-mono">
          © {year} Satriya Kurniawan. All rights reserved.
        </div>
      </section>

      <BackToTop />
    </div>
  );
}
