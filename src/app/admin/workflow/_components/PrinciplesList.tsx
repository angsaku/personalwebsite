"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import { deleteWorkflowPrinciple } from "@/app/admin/actions";

type Principle = { id: string; title: string; description: string };

export default function PrinciplesList({ principles }: { principles: Principle[] }) {
  if (principles.length === 0) {
    return <p className="px-5 py-8 text-center text-xs text-gray-600">No principles yet.</p>;
  }

  return (
    <>
      {principles.map((p) => (
        <div key={p.id} className="flex items-start justify-between gap-4 px-5 py-4 border-t border-white/[0.06] first:border-0">
          <div className="min-w-0">
            <p className="text-sm text-white font-medium">{p.title}</p>
            <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{p.description}</p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Link
              href={`/admin/workflow/principles/${p.id}`}
              className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <Pencil size={13} />
            </Link>
            <form action={deleteWorkflowPrinciple.bind(null, p.id)}>
              <button
                type="submit"
                className="p-2 text-gray-500 hover:text-[#E5212E] hover:bg-[#E5212E]/10 rounded-lg transition-colors"
                onClick={(e) => { if (!confirm("Delete this principle?")) e.preventDefault(); }}
              >
                <Trash2 size={13} />
              </button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
}
