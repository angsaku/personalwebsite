import { getAllTemplates } from "@/lib/templates";
import TemplatesSlider from "./TemplatesSlider";

export default async function Templates() {
  const templates = await getAllTemplates();

  return (
    <section className="sk-section sk-section--no-overflow" id="templates">
      <div className="sk-section-tag sk-mono">
        <span className="num">07</span>
        <span>TEMPLATES / RESOURCES</span>
        <span className="sk-line" />
        <span>{templates.length} TEMPLATES</span>
      </div>

      {templates.length > 0 ? (
        <TemplatesSlider templates={templates} />
      ) : (
        <div
          style={{
            padding: "80px 0",
            textAlign: "center",
            border: "1px solid var(--line)",
          }}
          className="sk-mono"
        >
          No templates published yet.
        </div>
      )}
    </section>
  );
}
