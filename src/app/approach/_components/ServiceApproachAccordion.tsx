"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { WorkflowService } from "@/lib/workflow";

export default function ServiceApproachAccordion({ services }: { services: WorkflowService[] }) {
  const [open, setOpen] = useState<string | null>(services[0]?.id ?? null);

  return (
    <div className="divide-y divide-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
      {services.map((s) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id}>
            <button
              onClick={() => setOpen(isOpen ? null : s.id)}
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <span className={`text-base font-semibold transition-colors ${isOpen ? "text-[#E5212E]" : "text-white"}`}>
                {s.service_name}
              </span>
              <ChevronDown
                size={16}
                className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#E5212E]" : ""}`}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? "800px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <div
                className="blog-content px-6 pb-6 text-gray-400 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: s.content }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
