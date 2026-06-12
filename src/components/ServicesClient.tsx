"use client";

import { useState, useEffect } from "react";
import InquiryForm from "@/components/InquiryForm";
import type { Service } from "@/lib/services";

export default function ServicesClient({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<Service | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <>
      <div className="sk-services-grid">
        {services.map((s) => (
          <article
            key={s.id}
            className="sk-service-card rv"
            data-cursor="hover"
            data-cursor-label="✷ inquire"
            onClick={() => setSelected(s)}
            style={{ cursor: "pointer" }}
          >
            <div className="s-head sk-mono">
              <span className="s-num">{s.number} ↗</span>
            </div>
            <h3 className="s-title">{s.title}</h3>
            <p className="s-blurb sk-serif">{s.description}</p>
            <ul className="s-list sk-mono">
              {s.tags.map((tag) => (
                <li key={tag}>• {tag}</li>
              ))}
            </ul>
            <div className="s-foot sk-mono">
              <span>PROJECT-BASED</span>
              <span className="s-cta">START PROJECT →</span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg, #020618)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 16,
              padding: "32px",
              width: "100%",
              maxWidth: 520,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <p className="sk-mono" style={{ fontSize: 10, color: "#E5212E", letterSpacing: "0.2em" }}>
                  ✷ START PROJECT
                </p>
                <button
                  onClick={() => setSelected(null)}
                  className="sk-mono"
                  style={{ fontSize: 11, color: "var(--dim)", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer" }}
                >
                  ESC ✕
                </button>
              </div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "white", lineHeight: 1.2 }}>
                {selected.title}
              </h2>
            </div>

            <InquiryForm defaultService={selected.title} />
          </div>
        </div>
      )}
    </>
  );
}
