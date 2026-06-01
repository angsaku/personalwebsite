"use client";
import { useState } from "react";
import type { Experience } from "@/lib/experience";

export default function ExperienceAccordion({ experiences }: { experiences: Experience[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="sk-exp">
      {experiences.map((exp, i) => {
        const isOpen = open === i;
        return (
          <div
            key={exp.id}
            className={`sk-exp-row${isOpen ? " open" : ""}`}
            data-cursor="hover"
            data-cursor-label={isOpen ? "● open" : "↓ expand"}
            onClick={() => setOpen(i)}
          >
            <div className="sk-exp-head">
              <span className="sk-exp-y sk-mono">{exp.period}</span>
              <span className="sk-exp-role">{exp.role}</span>
              <span className="sk-exp-place sk-mono">{exp.company}</span>
              <span className="sk-exp-meta sk-mono">{exp.location}</span>
              <span className="sk-exp-toggle">{isOpen ? "−" : "+"}</span>
            </div>
            <div className="sk-exp-body">
              <div className="sk-exp-body-inner">
                <div className="sk-exp-loc sk-mono">↳ {exp.location}</div>
                <div
                  className="sk-exp-text sk-rich-text"
                  dangerouslySetInnerHTML={{ __html: exp.description }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
