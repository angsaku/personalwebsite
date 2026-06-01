import Link from "next/link";
import { getSelectedWork } from "@/lib/selected-work";
import WorkList from "@/components/WorkList";

export default async function SelectedWork() {
  const projects = await getSelectedWork();
  const top5 = projects.slice(0, 5);

  return (
    <section className="sk-section" id="work" style={{ paddingLeft: 0, paddingRight: 0 }}>
      <div style={{ padding: "0 40px" }}>
        <div className="sk-section-tag sk-mono">
          <span className="num">01</span>
          <span>SELECTED WORK</span>
          <span className="sk-line" />
          <span>{projects.length} ENTRIES ↓</span>
        </div>
      </div>
      <WorkList projects={top5} />
      {projects.length > 5 && (
        <div
          style={{
            padding: "24px 40px 0",
            marginTop: 24,
            borderTop: "1px solid var(--line)",
          }}
        >
          <Link
            href="/work"
            className="sk-btn-ghost sk-mono"
            data-cursor="hover"
            data-cursor-label="↗ all work"
          >
            VIEW ALL WORK ({projects.length}) <span>→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
