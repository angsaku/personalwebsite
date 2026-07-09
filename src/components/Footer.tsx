import { getCtaContent } from "@/lib/cta";

/** Strip protocol + www, keep path so "https://github.com/satriya-k" → "github.com/satriya-k" */
function display(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default async function Footer() {
  const year = new Date().getFullYear();
  const cta = await getCtaContent();

  /** Build the list of social links from whatever has a value */
  const socials: { label: string; icon: string; href: string; text: string }[] = [];

  if (cta.linkedin_url)
    socials.push({ label: "LINKEDIN", icon: "↗", href: cta.linkedin_url, text: display(cta.linkedin_url) });
  if (cta.twitter_url)
    socials.push({ label: "X / TWITTER", icon: "↗", href: cta.twitter_url, text: display(cta.twitter_url) });
  if (cta.instagram_url)
    socials.push({ label: "INSTAGRAM", icon: "↗", href: cta.instagram_url, text: display(cta.instagram_url) });
  if (cta.github_url)
    socials.push({ label: "GITHUB", icon: "▶", href: cta.github_url, text: display(cta.github_url) });
  if (cta.behance_url)
    socials.push({ label: "BEHANCE", icon: "↗", href: cta.behance_url, text: display(cta.behance_url) });
  if (cta.dribbble_url)
    socials.push({ label: "DRIBBBLE", icon: "↗", href: cta.dribbble_url, text: display(cta.dribbble_url) });
  if (cta.youtube_url)
    socials.push({ label: "YOUTUBE", icon: "▶", href: cta.youtube_url, text: display(cta.youtube_url) });
  if (cta.tiktok_url)
    socials.push({ label: "TIKTOK", icon: "↗", href: cta.tiktok_url, text: display(cta.tiktok_url) });
  if (cta.whatsapp_number) {
    // The stored value may be "628xxx?text=…" — use as-is for the link,
    // but show only the leading digits as the display label.
    const waNumber = cta.whatsapp_number.split("?")[0].replace(/\D/g, "");
    socials.push({
      label: "WHATSAPP",
      icon: "✦",
      href: `https://wa.me/${cta.whatsapp_number}`,
      text: `+${waNumber}`,
    });
  }

  return (
    <section className="sk-contact" id="contact">
      <div className="sk-section-tag sk-mono">
        <span className="num">08</span>
        <span>CONTACT / SAY SOMETHING</span>
        <span className="sk-line" />
        <span>END OF FILE</span>
      </div>

      <h2 className="sk-contact-h rv">
        <span className="block sk-glitch sk-shake" data-text="LET'S">LET&apos;S</span>
        <span className="block sk-glitch" data-text="MAKE SOMETHING">
          <span className="out">MAKE</span> <span className="acc">SOMETHING</span>
        </span>
        <span className="block sk-glitch sk-shake" data-text="WEIRD.">WEIRD.</span>
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
              <div className="lbl sk-mono">
                {s.icon} {s.label}
              </div>
              <div className="v">
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
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

      <div className="sk-foot sk-mono" suppressHydrationWarning>
        © {year} Satriya Kurniawan. All rights reserved.
      </div>
    </section>
  );
}
