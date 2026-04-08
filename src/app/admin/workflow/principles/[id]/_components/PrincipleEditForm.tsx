"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { updateWorkflowPrinciple } from "@/app/admin/actions";

type Principle = { id: string; title: string; description: string; sort_order: number };

export default function PrincipleEditForm({ principle }: { principle: Principle }) {
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const result = await updateWorkflowPrinciple(principle.id, new FormData(e.currentTarget));
      if (result?.error) { setError(result.error); setSaving(false); }
    } catch (err: unknown) {
      if ((err as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) throw err;
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setSaving(false);
    }
  }

  const inputCls = "w-full bg-[#020618] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#E5212E]/50 transition-colors";
  const labelCls = "block text-xs text-gray-500 mb-1.5 tracking-wide";

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/workflow" className="p-2 text-gray-500 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Principle</h1>
      </div>
      <form onSubmit={handleSubmit} className="bg-[#0a1128] border border-white/[0.06] rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Title *</label>
            <input name="title" defaultValue={principle.title} required className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Sort Order</label>
            <input name="sort_order" type="number" defaultValue={principle.sort_order} className={inputCls} />
          </div>
        </div>
        <div>
          <label className={labelCls}>Description *</label>
          <textarea name="description" defaultValue={principle.description} required rows={3} className={`${inputCls} resize-none`} />
        </div>
        {error && <p className="text-xs text-[#E5212E]">{error}</p>}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="bg-[#E5212E] text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#c41a25] transition-colors disabled:opacity-50">
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin/workflow" className="text-sm text-gray-500 hover:text-white transition-colors">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
