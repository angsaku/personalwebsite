import { getServices } from "@/lib/services";

export default async function Services() {
  const services = await getServices();

  return (
    <section className="sk-section" id="services">
      <div className="sk-section-tag sk-mono">
        <span className="num">04</span>
        <span>SERVICES / WHAT I DO FOR MONEY</span>
        <span className="sk-line" />
        <span>OPEN FOR PROJECTS ●</span>
      </div>

      <div className="sk-services-grid">
        {services.map((s, i) => (
          <article
            key={s.id}
            className="sk-service-card rv"
            data-cursor="hover"
            data-cursor-label="✷ inquire"
          >
            <div className="s-head sk-mono">
              <span className="s-num">{s.number} ↗</span>
            </div>
            <h3 className="s-title">{s.title}</h3>
            <p className="s-blurb sk-serif">{s.description}</p>
            <ul className="s-list sk-mono">
              {s.tags.map((tag) => (
                <li key={tag}>— {tag}</li>
              ))}
            </ul>
            <div className="s-foot sk-mono">
              <span>PROJECT-BASED</span>
              <span className="s-cta">START PROJECT →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
