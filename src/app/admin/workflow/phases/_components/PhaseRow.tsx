"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteWorkflowPhase } from "@/app/admin/actions";

type Phase = { id: string; number: string; title: string; description: string };

export default function PhaseRow({ phase }: { phase: Phase }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-5 py-4 border-t border-white/[0.06] hover:bg-white/[0.02] transition-colors items-center">
      <div className="col-span-1">
        <span className="text-xs text-[#E5212E]/50 font-mono">{phase.number}</span>
      </div>
      <div className="col-span-4">
        <p className="text-sm text-white font-medium">{phase.title}</p>
      </div>
      <div className="col-span-5">
        <p className="text-xs text-gray-600 truncate">{phase.description}</p>
      </div>
      <div className="col-span-2 flex items-center justify-end gap-2">
        <Link href={`/admin/workflow/phases/${phase.id}`} className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
          <Pencil size={14} />
        </Link>
        <form action={deleteWorkflowPhase.bind(null, phase.id)}>
          <button type="submit" className="p-2 text-gray-500 hover:text-[#E5212E] hover:bg-[#E5212E]/10 rounded-lg transition-colors"
            onClick={(e) => { if (!confirm("Delete this phase?")) e.preventDefault(); }}>
            <Trash2 size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
