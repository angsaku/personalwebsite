import Navbar from "@/components/Navbar";

export default function Hero() {
  return (
    <section className="sk-hero">
      <Navbar />

      <h1 className="sk-hero-name">
        <span className="row sk-glitch sk-shake" data-text="SATRIYA">SATRIYA</span>
        <span className="row right outlined sk-glitch" data-text="KURNIA">
          KURNIA<span className="accent">—</span>
        </span>
        <span className="row indent sk-shake sk-glitch" data-text="WAN.">
          WAN<span className="accent">.</span>
        </span>
      </h1>

      <div className="sk-hero-meta tl sk-mono">
        <b>FILE/01</b>
        <br />
        product designer—
        <br />
        shaping interfaces &amp; products
        <br />
        people actually use.
      </div>

      <div
        className="sk-hero-stamp sk-mono"
        style={{ top: "12vh", right: "22vw" }}
      >
        ★ FILE_NOT_FOUND ★
      </div>
      <div
        className="sk-hero-stamp sk-mono"
        style={{
          top: "44vh",
          left: "8vw",
          transform: "rotate(8deg)",
        }}
      >
        SCROLL ↓ AT OWN RISK
      </div>

      <div className="sk-hero-tag">
        <span className="ar">¶</span>
        <span>
          I design products, brands, and the occasional bad pun. Sharp, specific,
          &amp; shaped by hand not a template.
        </span>
      </div>
    </section>
  );
}
