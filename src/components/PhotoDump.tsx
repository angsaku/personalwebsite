import { getVisualExplorations } from "@/lib/visual-explorations";
import PhotoDumpClient from "@/components/PhotoDumpClient";

export default async function PhotoDump() {
  const items = await getVisualExplorations();

  return (
    <section className="sk-section" id="dump">
      <div className="sk-section-tag sk-mono">
        <span className="num">05</span>
        <span>PHOTO DUMP / DRAG ME</span>
        <span className="sk-line" />
        <span>{items.length} ITEMS</span>
      </div>

      {items.length > 0 ? (
        <PhotoDumpClient items={items} />
      ) : (
        <div
          className="sk-dump-stage sk-mono"
          style={{
            minHeight: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--dim)",
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
          }}
        >
          NO IMAGES YET — ADD THEM IN THE ADMIN DASHBOARD
        </div>
      )}
    </section>
  );
}
