import Image from "next/image";
import { getClientLogos } from "@/lib/client-logos";

const IMAGE_EXTS = /\.(jpe?g|png|gif|webp|avif|svg)(\?|$)/i;
function isImageUrl(url: string | null): url is string {
  if (!url) return false;
  return IMAGE_EXTS.test(url);
}

export default async function ClientLogos() {
  const clients = await getClientLogos();

  return (
    <section className="sk-clients">
      <div className="sk-clients-head sk-mono">
        <span>★ TRUSTED BY / CLIENTS &amp; COLLABORATORS</span>
        <span className="sk-clients-line" />
        <span>{clients.length} CLIENTS · &amp; COUNTING</span>
      </div>

      <div className="sk-clients-row">
        {clients.map((c) => (
          <div
            key={c.id}
            className="sk-client sk-client-logo-wrap"
            data-cursor="hover"
            data-cursor-label="↘ client"
            title={c.name}
          >
            {isImageUrl(c.logo_url) ? (
              <div className="sk-client-img-box">
                <Image
                  src={c.logo_url}
                  alt={c.name}
                  width={80}
                  height={40}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    filter: "grayscale(1) brightness(0.6)",
                    transition: "filter .2s",
                  }}
                  className="sk-client-logo-img"
                />
              </div>
            ) : (
              /* text wordmark fallback */
              <span className="sk-client-mono">{c.name}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
